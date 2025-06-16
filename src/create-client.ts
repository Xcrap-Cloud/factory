export type ClientConstructor<T> = new (options: any) => T

export type CreateClientConfig<
    TClients extends Record<string, ClientConstructor<any>>
> = {
    allowedClients: TClients
}

export type CreateClientOptions<TClients extends Record<string, ClientConstructor<any>>> = {
    config: CreateClientConfig<TClients>
    type: keyof TClients
    options: ConstructorParameters<TClients[keyof TClients]>[0]
}

export function createClient<
    TClients extends Record<string, ClientConstructor<any>>
>(
    {
        config: { allowedClients },
        type,
        options
    }: CreateClientOptions<TClients>
): InstanceType<TClients[typeof type]> {
    if (!(type in allowedClients)) {
        throw new Error(`'${type.toString()}' is not a valid type of client!`)
    }

    const clientClass = allowedClients[type]
    const clientInstance = new clientClass(options)

    return clientInstance
}

export default createClient