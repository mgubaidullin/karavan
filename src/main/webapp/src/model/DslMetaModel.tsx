export class DslMetaModel {
    name: string = ''
    uri?: string
    title: string = ''
    description: string = ''
    label: string = ''
    javaType: string = ''
    properties: any;

    public constructor(init?: Partial<DslMetaModel>) {
        Object.assign(this, init);
    }
}

export class DslProperty {
    name: string = ''
    type: string = ''
    title: string = ''
    description: string = ''
    required: boolean = false;
    secret: boolean = false
    enum: any[] = []

    public constructor(init?: Partial<DslProperty>) {
        Object.assign(this, init);
    }
}

export class DslConstraints {
    constraints: DslConstraint[] = []

    public constructor(init?: Partial<DslConstraints>) {
        Object.assign(this, init);
    }
}

export class DslConstraint {
    name: string = ''
    steps: string[] = []

    public constructor(init?: Partial<DslConstraint>) {
        Object.assign(this, init);
    }
}