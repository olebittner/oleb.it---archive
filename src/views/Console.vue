<template>
    <div class="console" @click.once="focusConsoleInput">
        <div class="cmd-history" v-html="cmd"></div>
        <ConsoleInput v-if="showInput" ref="consoleInput" v-bind:prompt="prompt"
                      v-bind:history="history" v-on:send-cmd="handleCmd"></ConsoleInput>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CommandHandler from "@/assets/ts/CommandHandler";
    import ConsoleInput from "@/components/ConsoleInput.vue";
    import axios from 'axios';

    @Component({
        components: {
            ConsoleInput,
        },
    })
    export default class Console extends Vue{
        showInput: boolean = true;
        cmd: string = '';
        delay: number = 50;
        speed: number = 3;
        speedMultiplier: number = 65;
        prompt: string =
            '<span class="a"><span class="b">anonymous@oleb.it</span> <span class="c">~</span>$&nbsp;</span>';
        history: string[] = [];
        cmdHandler?: CommandHandler = undefined;

        focusConsoleInput(){
            if (this.showInput) {
                (<ConsoleInput>this.$refs.consoleInput).gainFocus();
            }
        }

        printToConsole(text:string, callback?:() => void, speed:number=-1):void {
            if (this.showInput) {
                this.showInput = false;
            }
            if (speed <= 0) {
                speed = this.speed + Math.floor(this.speed * (text.length / this.speedMultiplier))
            }
            this.cmd += text.substr(0, speed);
            window.scroll(0,50);
            if (text.length > speed) {
                setTimeout(() => this.printToConsole(text.substr(speed), callback, speed), this.delay);
            } else {
                if (callback !== undefined)
                    callback();
                this.showInput = true;
            }
        }

        handleCmd(cmd:string, arg:string = '', appendToHistory:boolean = true){
            let output:string = cmd;
            if (arg != undefined) {
                output += ' ' + arg;
            }
            this.cmd += this.prompt + output + '<br>';
            if (this.cmdHandler !== undefined)
                this.cmdHandler.exec(cmd, arg);
            else
                this.println('<span class="error">Kernel panic - not syncing: CommandHandler undefined</span>');
            if (appendToHistory) {
                if (this.history[this.history.length-1] !== output) {
                    this.history.push(output);
                }
            }
        }

        public println(text:string, callback?:() => void):void {
            this.printToConsole(text + '<br>', callback);
        }

        public clearCmd():void {
            this.cmd = '';
        }

        created() {
            this.cmdHandler = new CommandHandler(axios, this);
        }

        mounted() {
            let cmd:string = this.$route.params.cmd;
            let argString:string = this.$route.params.args;
            if (argString !== undefined) {
                argString = decodeURI(argString);
            }
            this.handleCmd(cmd, argString);

        }
    }
</script>

<style scoped>
    .console {
        width: 65%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 25px;
    }
</style>

<style>
    a {
        color: #0bc;
        text-decoration: none;
    }
    .a {
        color: gray;
    }
    .b {
        color: magenta;
    }
    .c {
        color: royalblue;
    }
    .error {
        color: red;
    }

    .indent {
        margin-left: 40px;
    }

    h1, h2{
        color: #ff5f5f;
        font-size: 14px;
        margin: 0;
        padding: 0;
        font-weight: normal;
    }

    h1 {
        text-transform: uppercase;
        #text-decoration: underline;
    }

    h2 {
        margin-left: 20px;
    }

    p {
        margin-top: 0;
        padding-top: 0;
    }
</style>
