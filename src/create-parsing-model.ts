import { z } from "zod"

import createExtractor from "./create-extractor"

export type ParsingModelConstructor = new (options: any) => any

const parsingModelSchema: z.ZodType<ParsingModel> = z.lazy(() =>
    z.object({
        type: z.string(),
        model: z.record(z.lazy(() => parsingModelFieldSchema)),
    })
)

const parsingModelFieldSchema: z.ZodType<ParsingModelField> = z.lazy(() =>
    z.object({
        query: z.string().optional(),
        extractor: z.string().optional(),
        multiple: z.boolean().optional(),
        default: z.union([z.string(), z.number()]).optional(),
        nested: parsingModelSchema.optional(),
    }).superRefine((field, ctx) => {
        if (field.nested && !field.query) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`query` is required when `nested` is present.",
                path: ["query"],
            })
        }
    })
)

export type ParsingModelField = {
    query?: string
    extractor?: string
    nested?: ParsingModel
    multiple?: boolean
    default?: string | number
}

export type ParsingModelFields = Record<string, ParsingModelField>

export type ParsingModel = {
    type: string
    model: ParsingModelFields
}

export type CreateParsingModelConfig = {
    allowedExtractors: Record<string, Function>,
    extractorArgumentSeparator?: string
    allowedModels: Record<string, ParsingModelConstructor>
}

export type CreateParsingModelOptions = {
    model: ParsingModel
    config: CreateParsingModelConfig
}

function validateModelType(type: string, allowedModels: Record<string, ParsingModelConstructor>) {
    if (!(type in allowedModels)) {
        throw new Error(`Unsupported model type: "${type}"`)
    }
}

function createParsingModel({
    config: { allowedExtractors, allowedModels, extractorArgumentSeparator },
    model: root,
}: CreateParsingModelOptions) {
    root = parsingModelSchema.parse(root)

    const { type, model } = root

    validateModelType(type, allowedModels)

    const parsedModel: Record<string, any> = {}

    for (const [fieldName, field] of Object.entries(model)) {
        const extractorText = field.extractor

        const extractor = extractorText ? createExtractor({
            extractorText: extractorText,
            config: {
                allowedExtractors: allowedExtractors,
                argumentSeparator: extractorArgumentSeparator
            }
        }) : undefined

        parsedModel[fieldName] = {
            ...(field.query && { query: field.query }),
            ...(extractor && { extractor }),
            ...(field.multiple && { multiple: true }),
            ...(field.default !== undefined && { default: field.default }),
            ...(field.nested && {
                nested: createParsingModel({
                    model: field.nested,
                    config: {
                        allowedExtractors: allowedExtractors,
                        allowedModels: allowedModels,
                        extractorArgumentSeparator: extractorArgumentSeparator
                    }
                })
            })
        }
    }

    return new allowedModels[type](parsedModel)
}

export default createParsingModel