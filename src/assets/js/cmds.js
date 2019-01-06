export class CmdHandler {
  constructor (http, console) {
    this.http = http
    this.parent = console
    this.test = 'hi'

    this.commandsAvailable = {}
    this.initCmds()
  }

  execCmd (cmd, argString) {
    if (this.commandsAvailable[cmd] !== undefined) {
      let args = []
      if (argString !== undefined) {
        let regex = /(?:([^\s"']+)|(?:["]([^"]*)["]|[']([^']*)[']))+/g
        let match
        while ((match = regex.exec(argString)) !== null) {
          match.shift()
          match.forEach(function (arg) {
            if (arg !== undefined) {
              args.push(arg)
            }
          })
        }
      }
      this.commandsAvailable[cmd].exec(args)
    } else {
      this.parent.printLn(`<span>Command '${cmd}' not found</span><br>`)
    }
  }

  openFile(path, error) {
    this.http.get(path).then(resp => this.parent.printLn(resp.data))
      .catch(resp => this.parent.printLn(error))
  }

  initCmds () {
    var self = this
    this.commandsAvailable['echo'] = {
      exec: function (args) {
        let output = args.join(' ')
        self.parent.printLn(output)
      },
      usage: 'echo [STRING]...'
    }

    this.commandsAvailable['whois'] = {
      exec: function (args) {
        let who = args.find(arg => /^[^-]*$/.test(arg)).trim()
        if (who !== undefined) {
          let file = who.replace(' ', '').toLowerCase()
          self.openFile(`/static/text/whois/${file}.html`, `'${who}' is unknown!`)
        } else {
          self.parent.printLn('Usage: ' + this.usage)
        }
      },
      usage: 'whois FULLNAME'
    }

    this.commandsAvailable['clear'] = {
      exec: function (args) {
        console.log('clear')
        self.parent.clearCmd()
      },
      usage: 'clear'
    }

    this.commandsAvailable['exit'] = {
      exec: function (args) {
        self.parent.printLn('<span>Bye Bye<!--<><><><><><><><><><><><><><><><><><><><><><><><><><><>--></span>', function () {
          console.log('Bye')
          window.close()
          window.location.href ='about:blank'
        })
      },
      usage: 'exit'
    }
  }
}
