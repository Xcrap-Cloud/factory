import createClient from "../src/create-client"

class MockClientA {
    options: any
    constructor(options: any) {
        this.options = options
    }
}
class MockClientB {
    options: any
    constructor(options: any) {
        this.options = options
    }
}

const allowedClients = {
    clientA: MockClientA,
    clientB: MockClientB
}

describe("createClient", () => {
    it("should create a client instance of the correct type", () => {
        const options = { foo: "bar" }
        const client = createClient({
            config: { allowedClients },
            type: "clientA",
            options
        })
        expect(client).toBeInstanceOf(MockClientA)
        expect(client.options).toEqual(options)
    })

    it("should create another client instance of a different type", () => {
        const options = { baz: 123 }
        const client = createClient({
            config: { allowedClients },
            type: "clientB",
            options
        })
        expect(client).toBeInstanceOf(MockClientB)
        expect(client.options).toEqual(options)
    })

    it("should throw an error if type is not allowed", () => {
        expect(() =>
            createClient({
                config: { allowedClients },
                // @ts-expect-error
                type: "notAllowed",
                options: {}
            })
        ).toThrow("'notAllowed' is not a valid type of client!")
    })

    it("should pass options correctly to the client constructor", () => {
        const options = { test: true }
        const client = createClient({
            config: { allowedClients },
            type: "clientA",
            options
        })
        expect(client.options).toBe(options)
    })
})