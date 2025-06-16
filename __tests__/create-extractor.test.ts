import createExtractor, { extractorArgumentSeparator } from "../src/create-extractor"

describe("createExtractor", () => {
    const mockExtractorA = jest.fn(() => "A")
    const mockExtractorB = jest.fn((a: string, b: string) => "B")

    const allowedExtractors = {
        extractorA: mockExtractorA,
        extractorB: (...args: [string, string]) => () => mockExtractorB(...args)
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should throw error for not allowed extractor", () => {
        expect(() =>
            createExtractor({
                extractorText: "notAllowed",
                config: { allowedExtractors }
            })
        ).toThrow("'notAllowed' is not a allowed extractor!")
    })

    it("should support custom argument separator", () => {
        const extractor = createExtractor({
            extractorText: "extractorB|foo|bar",
            config: { allowedExtractors, argumentSeparator: "|" }
        })

        expect(extractor).toBeDefined()
    })
})