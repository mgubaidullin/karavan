import {RouteStep} from "./RouteModels";

export class Annotations {
    'camel.apache.org/integration.title': string | any = '';

    public constructor(init?: Partial<Annotations>) {
        Object.assign(this, init);
    }
}

export class Metadata {
    name: string = '';
    annotations: Annotations = new Annotations();

    public constructor(init?: Partial<Metadata>) {
        Object.assign(this, init);
    }
}

export class Spec {
    flows: RouteStep[] = [];

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
}
