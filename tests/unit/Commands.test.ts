import 'jest'
import {shallowMount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'
import axios from 'axios'
import {ICommand} from "@/assets/ts/CommandHandler";
import CommandHandler from '@/assets/ts/CommandHandler'
import Console from '@/views/Console.vue'

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

//mocking
global.scroll = jest.fn();
jest.mock('axios');

describe("Command testing", () => {
    const wrapper = shallowMount(Console, {localVue, router});
    const printlnMock = jest.fn();

    const cmdHandler:CommandHandler = new CommandHandler(axios, wrapper.vm);
    const openFileMock = jest.fn();

    function getCommand(cmd:string):ICommand|undefined {
        return cmdHandler.commands.find((c) => c.name === cmd);
    }

    beforeAll(() => {
        (wrapper.vm as any).println = printlnMock;
        cmdHandler["openFile"] = openFileMock;
    });

    beforeEach(() => {
        printlnMock.mockClear();
        openFileMock.mockClear();
    });

    describe("echo command", () => {
        let echo:ICommand;

        beforeEach(() => {
            // @ts-ignore
            echo = getCommand('echo');
        });

        test("echo command is defined", () => {
            expect(echo).toBeDefined();
        });

        test("echo has CommandHandler", () => {
            expect(echo.cmdHndlr).toEqual(cmdHandler);
        });

        test("echo has name and alias", () => {
            expect(echo.name).toBeDefined();
            expect(echo.name.length).toBeGreaterThan(0);

            expect(echo.alias).toBeDefined();
        });

        test("echo cmd without args", () => {
            echo.exec([]);
            expect(printlnMock).toBeCalledWith('');
        });

        test("echo cmd with one arg", () => {
            echo.exec(['first']);
            expect(printlnMock).toBeCalledWith('first');
        });

        test("echo cmd with five arg", () => {
            let args = ['first', 'second', 'third', 'fourth', 'fifth'];
            echo.exec(args);
            expect(printlnMock).toBeCalledWith(args.join(' '));
        });
    });
});