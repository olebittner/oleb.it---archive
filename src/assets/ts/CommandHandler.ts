interface ICommand {
    readonly name: string;
    readonly alias: string[];
    readonly description?: string;

    exec(args:string[]):void;

    readonly cmdHndlr:CommandHandler;
}

export default class CommandHandler {
    axios:any;
    console:any;

    readonly commands:ICommand[] = [
        {
            name: 'echo',
            alias: [],
            cmdHndlr: this,

            exec(args: string[]):void {
                let output = args.join(' ');
                this.cmdHndlr.console.println(output);
            }
        },
        {
            name: 'whois',
            alias: [],
            cmdHndlr: this,

            exec(args: string[]): void {
                let who = args.find((arg:string) => /^[^-]*$/.test(arg));
                if (who !== undefined) {
                    let file = who.replace(' ', '').toLowerCase();
                    this.cmdHndlr.openFile(`/cmd_data/whois/${file}.html`, `'${who}' is unknown!`)
                } else {
                    this.cmdHndlr.console.println('Usage: ' + this.name)
                }

            }
        },
        {
            name: 'cat',
            alias: [],
            cmdHndlr: this,

            exec(args: string[]): void {
                let file = args.find((arg:string) => /^[^-]*$/.test(arg));
                if (file !== undefined) {
                    let path = file.replace(' ', '').toLowerCase();
                    this.cmdHndlr.openFile(`/cmd_data/cat/${path}.html`, `cat: ${file}: No such file or directory`)
                } else {
                    this.cmdHndlr.console.println('Usage: ' + this.name)
                }

            }
        },
        {
            name: 'exit',
            alias: ['shutdown', 'logout'],
            cmdHndlr: this,

            exec(args: string[]): void {
                this.cmdHndlr.console.println('<span>Bye Bye<!--<><><><><><><><><><><><><><><><><><><><><><><><><><><>--></span>',function () {
                    window.close();
                    window.location.href ='about:blank';
                });
            }
        }
    ];

    constructor (axios:any, console:any) {
        this.axios = axios;
        this.console = console;
    }

    public exec(cmd:string, argString:string):void {
        for (let command of this.commands) {
            if (command.name === cmd || command.alias.indexOf(cmd) > -1){
                let args:string[] = [];
                let regex = /(?:([^\s"']+)|(?:["]([^"]*)["]|[']([^']*)[']))+/g;
                let match;
                while ((match = regex.exec(argString)) !== null) {
                    match.shift();
                    for (let arg of match) {
                        if (arg !== undefined) {
                            args.push(arg);
                        }
                    }
                }
                command.exec(args);
                return;
            }
        }
        this.console.println(`<span>Command '${cmd}' not found</span><br>`)
    }

    protected openFile(path:string, error:string) {
        this.axios.get(path).then((resp:any) => self.console.log(resp))
            .catch((resp:any) => this.console.println(error))
    }


}
