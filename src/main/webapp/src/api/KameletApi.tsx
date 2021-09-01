import {Kamelet} from "../model/KameletModels";
import {EventBus, KaravanEvent} from "./EventBus";
import * as yaml from 'js-yaml';
import axios from "axios";
import {KaravanApi} from "./KaravanApi";

export const Kamelets: Kamelet[] = [];

export const KameletApi = {

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
            console.log(repos)
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