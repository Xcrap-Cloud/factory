import createParsingModel from "../src/create-parsing-model"

describe("createParsingModel", () => {
    class DummyModel {
        public model: any
        constructor(model: any) {
            this.model = model
        }
    }

    const allowedExtractors = {
        mock: () => "extracted"
    }
    
    const allowedModels = {
        dummy: DummyModel
    }

    it("cria um modelo de parsing simples com extractor", () => {
        const model = {
            type: "dummy",
            model: {
                field1: {
                    query: ".selector",
                    extractor: "mock",
                    default: "valor"
                }
            }
        }

        const instance = createParsingModel({
            config: { allowedExtractors, allowedModels },
            model
        })

        expect(instance).toBeInstanceOf(DummyModel)
        expect(instance.model.field1.query).toBe(".selector")
        expect(instance.model.field1.default).toBe("valor")
        expect(typeof instance.model.field1.extractor).toBe("function")
        expect(instance.model.field1.extractor()).toBe("extracted")
    })

    it("cria modelo de parsing aninhado (nested)", () => {
        const model = {
            type: "dummy",
            model: {
                parent: {
                    query: ".parent",
                    nested: {
                        type: "dummy",
                        model: {
                            child: {
                                query: ".child",
                                extractor: "mock"
                            }
                        }
                    }
                }
            }
        }

        const instance = createParsingModel({
            config: { allowedExtractors, allowedModels },
            model
        })

        expect(instance).toBeInstanceOf(DummyModel)
        expect(instance.model.parent.nested).toBeInstanceOf(DummyModel)
        expect(instance.model.parent.nested.model.child.query).toBe(".child")
        expect(typeof instance.model.parent.nested.model.child.extractor).toBe("function")
    })

    it("lança erro para tipo de modelo não permitido", () => {
        const model = {
            type: "not-allowed",
            model: {}
        }
        expect(() =>
            createParsingModel({
                config: { allowedExtractors, allowedModels },
                model
            })
        ).toThrow('Unsupported model type: "not-allowed"')
    })

    it("lança erro se nested não tem query", () => {
        const model = {
            type: "dummy",
            model: {
                parent: {
                    nested: {
                        type: "dummy",
                        model: {}
                    }
                }
            }
        }
        expect(() =>
            createParsingModel({
                config: { allowedExtractors, allowedModels },
                model
            })
        ).toThrow(/`query` is required when `nested` is present/)
    })

    it("usa separador customizado para argumentos do extractor", () => {
        const extractorWithArgs = jest.fn((arg1, arg2) => () => [arg1, arg2])
        const allowedExtractorsWithArgs = {
            custom: extractorWithArgs
        }
        const model = {
            type: "dummy",
            model: {
                field: {
                    extractor: "custom|foo|bar"
                }
            }
        }
        const instance = createParsingModel({
            config: {
                allowedExtractors: allowedExtractorsWithArgs,
                allowedModels,
                extractorArgumentSeparator: "|"
            },
            model
        })
        expect(typeof instance.model.field.extractor).toBe("function")
        expect(instance.model.field.extractor()).toEqual(["foo", "bar"])
        expect(extractorWithArgs).toHaveBeenCalledWith("foo", "bar")
    })
})