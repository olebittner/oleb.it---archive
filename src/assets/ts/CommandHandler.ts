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

}
