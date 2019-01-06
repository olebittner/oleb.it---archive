<template>
  <div class="console-input">
    <span class="prompt" v-html="prompt"></span>
    <input class="cmd-input" ref="cmdInput" v-model="input" placeholder="type here" autocomplete="off" maxlength="80" @keyup.enter="returnLine" autofocus>
  </div>
</template>

<script>
export default {
  name: 'ConsoleInput',
  data () {
    return {
      input: '',
      historyIndex: 0,
      cmdInput: undefined
    }
  },
  props: ['prompt', 'history'],
  methods: {
    returnLine: function () {
      let inputStartsWithSpace = this.input.startsWith(' ')
      let input = this.input.trim()
      let cmd = ''
      let args = ''
      let firstSpace = input.indexOf(' ')
      if (firstSpace > -1) {
        cmd = input.substring(0, firstSpace)
        args = input.substring(firstSpace + 1)
      } else {
        cmd = input
      }
      if (input !== null && input.length > 0) {
        let argURI = encodeURI(args)
        this.$router.push({name: 'ConsoleWithArgs', params: {cmd: cmd, args: argURI}})
        this.$emit('cmd-send', cmd, args, !inputStartsWithSpace)
        this.input = ''
        this.historyIndex = 0
      }
    },

    gainFocus: function () {
      this.cmdInput.focus()
    }
  },

  mounted () {
    this.cmdInput = this.$refs.cmdInput
    window.addEventListener('keyup', (event) => {
      if (event.keyCode !== 17 && event.keyCode !== 18) {
        this.gainFocus()
      } /* else if (event.keyCode === 38) {
        this.input = this.props.history[this.historyIndex]
        if (this.historyIndex < this.props.history.length) {
          this.historyIndex++
        }
      } */
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
