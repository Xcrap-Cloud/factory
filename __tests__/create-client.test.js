"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_client_1 = __importDefault(require("../src/create-client"));
class MockClientA {
    constructor(options) {
        this.options = options;
    }
}
class MockClientB {
    constructor(options) {
        this.options = options;
    }
}
const allowedClients = {
    clientA: MockClientA,
    clientB: MockClientB
};
describe("createClient", () => {
    it("should create a client instance of the correct type", () => {
        const options = { foo: "bar" };
        const client = (0, create_client_1.default)({
            config: { allowedClients },
            type: "clientA",
            options
        });
        expect(client).toBeInstanceOf(MockClientA);
        expect(client.options).toEqual(options);
    });
    it("should create another client instance of a different type", () => {
        const options = { baz: 123 };
        const client = (0, create_client_1.default)({
            config: { allowedClients },
            type: "clientB",
            options
        });
        expect(client).toBeInstanceOf(MockClientB);
        expect(client.options).toEqual(options);
    });
    it("should throw an error if type is not allowed", () => {
        expect(() => (0, create_client_1.default)({
            config: { allowedClients },
            // @ts-expect-error
            type: "notAllowed",
            options: {}
        })).toThrow("'notAllowed' is not a valid type of client!");
    });
    it("should pass options correctly to the client constructor", () => {
        const options = { test: true };
        const client = (0, create_client_1.default)({
            config: { allowedClients },
            type: "clientA",
            options
        });
        expect(client.options).toBe(options);
    });
});
