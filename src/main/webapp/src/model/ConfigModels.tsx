

export class ConfigOpenshift {
    server: string = '';
    namespace: string = '';
    token: string = '';

    public constructor(init?: Partial<ConfigOpenshift>) {
        Object.assign(this, init);
    }
}

export class ConfigBinding {
    name: string = '';
    title: string = '';

    public constructor(init?: Partial<ConfigBinding>) {
        Object.assign(this, init);
    }
}