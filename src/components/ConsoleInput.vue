<template>
    <div class="console-input">
        <span class="prompt" v-html="prompt"></span>
        <input class="cmd-input" ref="cmdInput" v-model="input" placeholder="type here" autocomplete="off" maxlength="80" @keyup.enter="returnLine" autofocus>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Emit, Prop, Provide} from 'vue-property-decorator';

    @Component
    export default class ConsoleInput extends Vue{
        @Prop({ required: true }) prompt!: string; /*  */
        @Prop() history: string[]|undefined;

        @Provide() input: string = '';

        historyIndex!: number;
        cmdInput?: HTMLInputElement;

        returnLine(): void {
            let inputStartsWithSpace: boolean = this.input.startsWith(' ');
            let input: string = this.input.trim();
            let cmd: string = '';
            let args: string = '';
            let firstSpace: number = input.indexOf(' ');
            if (firstSpace > -1) {
                cmd = input.substring(0, firstSpace);
                args = input.substring(firstSpace + 1);
            } else {
                cmd = input
            }
            if (input !== null && input.length > 0) {
                let argURI = encodeURI(args);
                if (argURI.length > 0)
                    this.$router.push({name: 'ConsoleWithArgs', params: {cmd: cmd, args: argURI}});
                else
                    this.$router.push({name: 'Console', params: {cmd: cmd}});
                this.sendCmd(cmd, args, !inputStartsWithSpace);
                this.input = '';
                this.historyIndex = 0;
            }
        }

        gainFocus() {
            if (this.cmdInput !== undefined)
            this.cmdInput.focus();
        }

        @Emit()
        sendCmd(cmd:string, args:string, appendToHistory:boolean = true) {}

        mounted() {
            this.cmdInput = this.$refs.cmdInput as HTMLInputElement;

            window.addEventListener('keyup', (event) => {
                if (event.keyCode !== 17 && event.keyCode !== 18) {
                    this.gainFocus()
                }
            })
        }


    }
</script>

<style scoped>
    .console-input {
        display: flex;
        align-items: baseline;
        /* margin-top: 1.5em; */
    }
    .cmd-input {
        flex: 2;
        font-family: monospace;
        color: white;
        border: 0;
        background: transparent;
        font-size: inherit;
    }
    ::placeholder {
        color: gray;
    }
</style>
