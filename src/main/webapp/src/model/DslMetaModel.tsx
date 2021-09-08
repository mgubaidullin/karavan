export class DslMetaModel {
    name:string = ''
    title:string = ''
    description:string = ''
    label:string = ''

    public constructor(init?: Partial<DslMetaModel>) {
        Object.assign(this, init);
    }
}