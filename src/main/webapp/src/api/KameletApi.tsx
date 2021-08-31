import {Kamelet} from "../model/KameletModels";
import {EventBus, KaravanEvent} from "./EventBus";
import * as yaml from 'js-yaml';
import axios from "axios";

const STORAGE_KAMELET_REPOSITORIES: string = "STORAGE_KAMELET_REPOSITORIES";
const STORAGE_KAMELETS: string = "STORAGE_KAMELETS";
const URL_KAMELETS = "https://api.github.com/repos/apache/camel-kamelets/contents/library/camel-kamelets/src/main/resources/kamelets";

const storage: Storage = window.localStorage;
export const Kamelets: Kamelet[] = [];

export const KameletApi = {

    jsonToKamelet: (json: string) => {
        const fromJson: Kamelet = JSON.parse(json) as Kamelet;
        const k: Kamelet = new Kamelet(fromJson);
        return k;
    },

    saveKameletsToStorage: () => {
        storage.setItem(STORAGE_KAMELETS, JSON.stringify(Kamelets));
    },

    getKameletRepositories: (): string[] => {
        const result: string[] = [];
        const reps = storage.getItem(STORAGE_KAMELET_REPOSITORIES);
        if (reps && reps.length > 0) {
            const list: string[] = JSON.parse(reps);
            result.push(...list);
        }
        return result.length > 0 ? result : [URL_KAMELETS];
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
        const k = storage.getItem(STORAGE_KAMELETS);
        if (k && k.length > 0){
            const list:[] = JSON.parse(k);
            Kamelets.push(...list.map(x => new Kamelet(x)));
            // EventBus.sendEvent(KaravanEvent.KAMELETS_PREPARED);
        } else {
            const repos: string[] = KameletApi.getKameletRepositories();
            storage.setItem(STORAGE_KAMELET_REPOSITORIES, JSON.stringify(repos));
            KameletApi.loadKamelets(repos);
        }
    },

    loadKamelets: (repos: string[]) => {
        repos.forEach((repo: string) => {
            KameletApi.requestKameletList(repo).then((list: string[]) => {
                const promises = list.map((url: string) => KameletApi.requestKamelet(url));
                Promise.all(promises).then(function (list) {
                    const result: Kamelet[] = list as Kamelet[];
                    Kamelets.push(...result);
                    Kamelets.push(...Kamelet.default());
                    KameletApi.saveKameletsToStorage();
                    // EventBus.sendEvent(KaravanEvent.KAMELETS_PREPARED);
                });
            })
        });
    }
}