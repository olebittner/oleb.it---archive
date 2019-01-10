import 'jest'
import {shallowMount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'
import axios from 'axios'
import CommandHandler from '@/assets/ts/CommandHandler'
import Console from '@/views/Console.vue'

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

//mocking
global.scroll = jest.fn();
jest.mock('axios');

describe("CommandHandler testing", () => {
    const wrapper = shallowMount(Console, {localVue, router});
    const printlnMock = jest.fn();
    (wrapper.vm as any).println = printlnMock;
    let cmdHandler:CommandHandler;

    beforeEach(() => {
       cmdHandler = new CommandHandler(axios, wrapper.vm);
       printlnMock.mockClear();
    });

    test("constructor", () => {
        expect(cmdHandler.console).toEqual(wrapper.vm);
        expect(cmdHandler.axios).toEqual(axios);
    });

    describe("openFile function", () => {
        const path = '/path/to/file.html';
        const error = 'Error-Test';

        test("openFile reads file content", async () => {
            const resp = {data: 'Hello'};
            (axios.get as any).mockResolvedValue(resp);
            await cmdHandler["openFile"](path, error);
            expect(axios.get).toBeCalledWith(path);
            expect(printlnMock).toBeCalledWith(resp.data);
        });

        test("openFile cannot read file", async () => {
            const resp = undefined;
            (axios.get as any).mockResolvedValue(resp);
            await cmdHandler["openFile"](path, error);
            expect(axios.get).toBeCalledWith(path);
            expect(printlnMock).toBeCalledWith(error);
        });
    });

    describe("exec function", () => {
        const mockCmd = jest.fn();
        const cmd = 'command';

        beforeEach(() => {
            cmdHandler.commands.length = 0;
            cmdHandler.commands.push({
                name: cmd,
                alias: ['alias'],
                cmdHndlr: cmdHandler,

                exec: mockCmd
            });
            mockCmd.mockClear();
        });

        test("exec test cmd without args", () => {
            cmdHandler.exec(cmd, '');
            expect(mockCmd).toBeCalledWith([]);
        });

        test("exec test cmd with whitespace arg", () => {
            cmdHandler.exec(cmd, ' ');
            expect(mockCmd).toBeCalledWith([]);
        });

        test("exec test cmd with one arg", () => {
            let arg = 'first';
            cmdHandler.exec(cmd, arg);
            expect(mockCmd).toBeCalledWith([arg]);
        });

        test("exec test cmd with five arg", () => {
            let args = ['first', 'second', 'third', 'fourth', 'fifth'];
            cmdHandler.exec(cmd, args.join(' '));
            expect(mockCmd).toBeCalledWith(args);
        });

        test("exec test cmd with simple grouped args", () => {
            let args = ['"first second"', 'third', "'fourth fifth'"];
            cmdHandler.exec(cmd, args.join(' '));
            expect(mockCmd).toBeCalledWith(["first second", "third", "fourth fifth"]);
        });

        test("exec test cmd with double grouped args", () => {
            let args = ['"first \'second third\'"', "'\"fourth fifth\" sixth'"];
            cmdHandler.exec(cmd, args.join(' '));
            expect(mockCmd).toBeCalledWith(["first 'second third'", "\"fourth fifth\" sixth"]);
        });

        test("exec non existent cmd", () => {
            cmdHandler.exec('cheese', '');
            expect(mockCmd).not.toBeCalled();
            expect(printlnMock).toBeCalled();
        });

        test("exec test cmd via alias", () => {
            cmdHandler.exec('alias', '');
            expect(mockCmd).toBeCalledWith([]);
        });
    })
});

test("failing test", () => {
    expect(false).toBeTruthy();
});
