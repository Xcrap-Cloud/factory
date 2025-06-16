"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_extractor_1 = __importDefault(require("../src/create-extractor"));
describe("createExtractor", () => {
    const mockExtractorA = jest.fn(() => "A");
    const mockExtractorB = jest.fn((a, b) => "B");
    const allowedExtractors = {
        extractorA: mockExtractorA,
        extractorB: (...args) => () => mockExtractorB(...args)
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should throw error for not allowed extractor", () => {
        expect(() => (0, create_extractor_1.default)({
            extractorText: "notAllowed",
            config: { allowedExtractors }
        })).toThrow("'notAllowed' is not a allowed extractor!");
    });
    it("should support custom argument separator", () => {
        const extractor = (0, create_extractor_1.default)({
            extractorText: "extractorB|foo|bar",
            config: { allowedExtractors, argumentSeparator: "|" }
        });
        expect(extractor).toBeDefined();
    });
});
