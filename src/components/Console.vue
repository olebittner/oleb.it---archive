<template>
  <div class="console" @click.once="focusConsoleInput">
    <div class="cmd-history" v-html="cmd"></div>
    <ConsoleInput v-if="showInput" ref="consoleInput" v-bind:prompt="prompt"
                  v-bind:history="history" v-on:cmd-send="handleCmd"></ConsoleInput>
  </div>
</template>

<script>
import axios from 'axios'
import ConsoleInput from '@/components/ConsoleInput'
import * as CmdLib from '@/assets/js/cmds.js'
export default {
  name: 'Console',
  components: {ConsoleInput},
  data () {
    return {
      showInput: true,
      cmd: '',
      delay: 50,
      speed: 3,
      prompt: '<span class="a"><span class="b">anonymous@oleb.it</span> <span class="c">~</span>$&nbsp;</span>',
      history: [],
      cmdHandler: undefined
    }
  },
  methods: {
    focusConsoleInput: function () {
      if (this.showInput) {
        this.$refs.consoleInput.gainFocus()
      }
    },

    printToConsole: function (text, callback) {
      if (this.showInput) {
        this.showInput = false
      }
      this.cmd += text.substring(0, this.speed)
      window.scrollBy(0, 50)
      if (text.length > this.speed) {
        setTimeout(() => this.printToConsole(text.substring(this.speed, text.length), callback), this.delay)
      } else {
        if (callback !== undefined) {
          callback()
        }
        this.showInput = true
      }
    },

    handleCmd: function (cmd, argString, appendToHistory = true) {
      let output = ''
      output += cmd
      if (argString !== undefined) {
        output += ' ' + argString
      }
      this.cmd += this.prompt + output + '<br>'
      this.cmdHandler.execCmd(cmd, argString)
      if (appendToHistory) {
        if (this.history[this.history.length - 1] !== output) {
          this.history.push(output)
        }
      }
    },

    printLn: function (output, callback) {
      this.printToConsole(output + '<br>', callback)
    },

    clearCmd: function () {
      this.cmd = ''
    }
  },
  created () {
    this.cmdHandler = new CmdLib.CmdHandler(axios, this)
  },

  mounted () {
    let cmd = this.$route.params.cmd
    let argString = this.$route.params.args
    if (argString !== undefined) {
      argString = decodeURI(argString)
    }
    this.handleCmd(cmd, argString)
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
</style>
