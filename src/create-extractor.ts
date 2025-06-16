import { ExtractorFunction } from "@xcrap/parser"

export type CreateExtractorConfig = {
    allowedExtractors: Record<string, Function>
    argumentSeparator?: string
}

type GetExtractorOptions = {
    extractorKey: string,
    extractorArguments?: any[],
    allowedExtractors: Record<string, Function>
}

export type CreateExtractorOptions = {
    extractorText: string,
    config: CreateExtractorConfig
}

export const extractorArgumentSeparator = ":"

function getExtractor({
    allowedExtractors,
    extractorArguments,
    extractorKey
}: GetExtractorOptions) {
    if (!(extractorKey in allowedExtractors)) {
        throw new Error(`'${extractorKey}' is not a allowed extractor!`)
    }

    if (extractorArguments && extractorArguments.length > 0) {
        const extractorGenerator = allowedExtractors[extractorKey]
        const extractor = extractorGenerator(...extractorArguments)
        return extractor
    }

    const extractor = allowedExtractors[extractorKey]

    return extractor
}

function createExtractor(
    {
        extractorText,
        config: {
            allowedExtractors,
            argumentSeparator
        }
    }: CreateExtractorOptions
): ExtractorFunction {
    if (argumentSeparator && extractorText.includes(argumentSeparator)) {
        const [extractorKey, ...extractorArguments] = extractorText.split(argumentSeparator)

        return getExtractor({
            extractorKey: extractorKey,
            extractorArguments: extractorArguments,
            allowedExtractors: allowedExtractors
        })
    }

    return getExtractor({
        extractorKey: extractorText,
        allowedExtractors: allowedExtractors
    })
}

export default createExtractor