export class DslMetaModel {
    name:string = ''
    title:string = ''
    description:string = ''
    label:string = ''
    javaType:string = ''

    public constructor(init?: Partial<DslMetaModel>) {
        Object.assign(this, init);
    }
}

export class DslConstraints {
    constraints:DslConstraint[] = []

    public constructor(init?: Partial<DslConstraints>) {
        Object.assign(this, init);
    }
}

export class DslConstraint {
    name:string = ''
    steps: string[] = []

    public constructor(init?: Partial<DslConstraint>) {
        Object.assign(this, init);
    }
}