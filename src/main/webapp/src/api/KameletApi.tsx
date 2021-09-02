import {Kamelet, Property} from "../model/KameletModels";
import {EventBus, KaravanEvent} from "./EventBus";
import * as yaml from 'js-yaml';
import axios from "axios";
import {KaravanApi} from "./KaravanApi";

export const Kamelets: Kamelet[] = [];

export const KameletApi = {

    getKameletProperties: (kameletName: string): Property[] => {
        const kamelet: Kamelet = KameletApi.findKameletByName(kameletName);
        const properties: Property[] = [];
        try {
            const map: Map<string, any> = kamelet.spec.definition.properties ? new Map(Object.entries(kamelet.spec.definition.properties)) : new Map();
            map.forEach((value, key, map) => {
                const prop = new Property();
                prop.id = key;
                prop.title = value.title;
                prop.default = value.default;
                prop.description = value.description;
                prop.format = value.format;
                prop.example = value.example;
                prop.type = value.type;
                if (value.default) prop.value = value.default
                prop["x-descriptors"] = value["x-descriptors"];
                properties.push(prop);
            })
        } finally {
            return properties;
        }
    },

    getKamelets: (): Kamelet[] => {
        return Kamelets;
    },

    jsonToKamelet: (json: string) => {
        const fromJson: Kamelet = JSON.parse(json) as Kamelet;
        const k: Kamelet = new Kamelet(fromJson);
        return k;
    },


    findKameletByName: (name: string): Kamelet | any => {
        return Kamelets.find((k: Kamelet) => k.metadata.name === name);
    },

    uriSource: (): Kamelet | any => {
        return Kamelet.default().find((k: Kamelet) => k.metadata.name === 'uri-source');
    },

    uriSink: (): Kamelet | any => {
        return Kamelet.default().find((k: Kamelet) => k.metadata.name === 'uri-sink');
    },

    requestKameletList: async (repo: string): Promise<string[]> => {
        const res = await axios(repo);
        const list: [] = await res.data;
        return list.map((x: any) => x.download_url);
    },

    requestKamelet: async (url: string): Promise<Kamelet> => {
        const res = await axios(url);
        const text: string = await res.data;
        const fromYaml = yaml.load(text);
        return KameletApi.jsonToKamelet(JSON.stringify(fromYaml));
    },

    prepareKamelets: () => {
        Kamelets.splice(0, Kamelets.length);
        KaravanApi.getConfiguration((config: any) => {
            const repos: string[] = config?.['karavan.catalogs'] as [];
            KameletApi.loadKamelets(repos);
        })
    },

    loadKamelets: (repos: string[]) => {
        repos.forEach((repo: string) => {
            KameletApi.requestKameletList(repo).then((list: string[]) => {
                const promises = list.map((url: string) => KameletApi.requestKamelet(url));
                Promise.all(promises).then(function (list) {
                    const result: Kamelet[] = list as Kamelet[];
                    Kamelets.push(...result);
                    Kamelets.push(...Kamelet.default());
                    EventBus.sendEvent(KaravanEvent.KAMELETS_PREPARED);
                });
            })
        });
    }
}