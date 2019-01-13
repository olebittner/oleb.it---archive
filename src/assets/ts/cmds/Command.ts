import Console from '@/views/Console.vue';

export abstract class Command {
    abstract readonly name:string;
    abstract alias:string[];
    abstract readonly short?:string;
    abstract readonly description?:string;
    abstract readonly usage?:string;

    readonly console:Console;

    constructor(console: Console) {
        this.console = console;
    }

    abstract exec(args:any[]):string;
}