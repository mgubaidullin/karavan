import { Component, ComponentProperty } from "../model/ComponentModels";
import {Kamelet} from "../model/KameletModels";
import axios from "axios";
import * as yaml from "js-yaml";
import {EventBus, KaravanEvent} from "./EventBus";

const STORAGE_KAMELET_REPOSITORIES: string = "STORAGE_COMPONENTS_REPOSITORIES";
const STORAGE_COMPONENTS: string = "STORAGE_COMPONENTS";
const URL_COMPONENTS = "https://api.github.com/repos/apache/camel-Components/contents/library/camel-Components/src/main/resources/Components";

const storage: Storage = window.localStorage;
export const Components: Component[] = [];


export const ComponentsApi = {


    jsonToComponent: (json: string) => {
        const fromJson: Component = JSON.parse(json) as Component;
        const k: Component = new Component(fromJson);
        return k;
    },

    saveComponentsToStorage: () => {
        storage.setItem(STORAGE_COMPONENTS, JSON.stringify(Components));
    },

    getKameletRepositories: (): string[] => {
        const result: string[] = [];
        const reps = storage.getItem(STORAGE_KAMELET_REPOSITORIES);
        if (reps && reps.length > 0) {
            const list: string[] = JSON.parse(reps);
            result.push(...list);
        }
        return result.length > 0 ? result : [URL_COMPONENTS];
    },
    //
    // findKameletByName: (name: string): Kamelet | any => {
    //     return Components.find((k: Kamelet) => k.metadata.name === name);
    // },
    //
    // uriSource: (): Kamelet | any => {
    //     return Kamelet.default().find((k: Kamelet) => k.metadata.name === 'uri-source');
    // },
    //
    // uriSink: (): Kamelet | any => {
    //     return Kamelet.default().find((k: Kamelet) => k.metadata.name === 'uri-sink');
    // },
    //
    requestComponentList: async (repo: string): Promise<string[]> => {
        const res = await axios(repo);
        const list: [] = await res.data;
        return list.map((x: any) => x.download_url);
    },

    requestComponent: async (url: string): Promise<Component> => {
        const res = await axios(url);
        const json: string = await res.data;
        return ComponentsApi.jsonToComponent(JSON.stringify(json));
    },

    prepareComponents: () => {
        Components.splice(0, Components.length);
        const k = storage.getItem(STORAGE_COMPONENTS);
        if (k && k.length > 0) {
            const list: [] = JSON.parse(k);
            Components.push(...list.map(x => new Component(x)));
            // EventBus.sendEvent(KaravanEvent.Components_PREPARED);
        } else {
            const repos: string[] = ComponentsApi.getKameletRepositories();
            storage.setItem(STORAGE_KAMELET_REPOSITORIES, JSON.stringify(repos));
            ComponentsApi.loadComponents(repos);
        }
    },

    loadComponents: (repos: string[]) => {
        repos.forEach((repo: string) => {
            ComponentsApi.requestComponentList(repo).then((list: string[]) => {
                const promises = list.map((url: string) => ComponentsApi.requestComponent(url));
                Promise.all(promises).then(function (list) {
                    const result: Component[] = list as Component[];
                    Components.push(...result);
                    ComponentsApi.saveComponentsToStorage();
                    // EventBus.sendEvent(KaravanEvent.Components_PREPARED);
                });
            })
        });
    }
}

//sdasdasasdasdasdasdasd

// const createComponentProperties = (c: Component): Component => {
//     const props: any[] = Object.entries(c.properties);
//     const allProps: ComponentProperty[] = props
//         .map((e: any[]) =>
//             new ComponentProperty({
//                 name: e[0], displayName: e[1].displayName, description: e[1].description, type: e[1].type, deprecated: e[1].deprecated,
//                 required: e[1].required, group: e[1].group, defaultValue: e[1].defaultValue, enum: e[1].enum
//             }))
//         .filter((cp: ComponentProperty) => !cp.deprecated && !cp.group.includes('advanced') && cp.type !== 'object');
//     const required = allProps.filter((cp: ComponentProperty) => cp.required);
//     const common = allProps.filter((cp: ComponentProperty) => cp.group === 'common');
//     const consumer = allProps.filter((cp: ComponentProperty) => cp.group === 'consumer');
//     const producer = allProps.filter((cp: ComponentProperty) => cp.group === 'producer');
//
//     required.push(...common);
//     required.push(...consumer);
//     required.push(...producer);
//    
//     c.componentProperties = Array.from(new Map<string, ComponentProperty>(required.map(i => [i.name, i])).values());
//     return c;
// }
//
// const request = async (name: string) => {
//     const response = await fetch('components/' + name);
//     const json = await response.json();
//     return json;
// }
//
// export const prepareComponents = () => {
//     fetch('components.properties')
//         .then(function (response) {
//             return response.text();
//         })
//         .then(function (text) {
//             const comps = text.trim().split("\n").map((component: any) => {
//                 const name = component + '.json';
//                 const json: any = request(name);
//                 return json;
//             });
//             Promise.all(comps).then(function (list) {
//                 const result: Component[] = list.map((x: any) => x as Component);
//                 result
//                     .filter((comp: Component) => !comp.component.deprecated)
//                     .forEach((comp: Component) => Components.push(createComponentProperties(comp))
//                     );
//             });
//         });
// }