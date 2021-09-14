
export class Metadata {
    name: string = '';

    public constructor(init?: Partial<Metadata>) {
        Object.assign(this, init);
    }
}

export class Spec {
    flows: any[] = [];

    public constructor(init?: Partial<Spec>) {
        Object.assign(this, init);
    }
}

export class Integration {
    apiVersion: string = 'camel.apache.org/v1';
    kind: string = 'Integration';
    metadata: Metadata = new Metadata();
    spec: Spec = new Spec();

    public constructor(init?: Partial<Integration>) {
        Object.assign(this, init);
    }

    static createNew(): Integration {
        return new Integration({spec: new Spec({flows: []})})
    }
}
