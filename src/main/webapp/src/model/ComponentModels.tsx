// Properties binding Connection model

export class Header {
  kind: string = '';
  name: string = '';
  title: string = '';
  description: string = '';
  deprecated: boolean = false;
  firstVersion: string = '';
  label: string = '';
  javaType: string = '';
  supportLevel: string = '';
  groupId: string = '';
  artifactId: string = '';
  version: string = '';
  scheme: string = '';
  extendsScheme: string = '';
  syntax: string = '';
  async: boolean = false;
  api: boolean = false;
  consumerOnly: boolean = false;
  producerOnly: boolean = false;
  lenientProperties: boolean = false;
  componentProperties: any;

  public constructor(init?: Partial<Header>) {
    Object.assign(this, init);
  }
}

export class Component {
  component: Header = new Header();
  componentProperties: any;
  properties: any;

  public constructor(init?: Partial<Component>) {
    Object.assign(this, init);
  }
}

export class ComponentProperty {
  name: string = '';
  deprecated: boolean = false;
  description: string = '';
  displayName: string = '';
  group: string = '';
  kind: string = '';
  label: string = '';
  type: string = '';
  enum: string[] = [];
  required: boolean = false;
  defaultValue: string | number | boolean | any;
  value: string | any;

  public constructor(init?: Partial<ComponentProperty>) {
    Object.assign(this, init);
  }
}
