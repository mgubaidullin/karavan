import {EventBus, KaravanEvent} from "./EventBus";
import axios from "axios";
import {DslMetaModel} from "../model/DslMetaModel";
import {DslApi} from "./DslApi";

export const DslMetaModels: DslMetaModel[] = [];

export const DslMetaApi = {

    getDslMetaModels: (label: string): DslMetaModel[] => {
        return DslMetaModels.filter(value => value.label.includes(label));
    },

    getDslMetaModelLabels: (): string[] => {
        const array =  DslMetaModels.map(value => value.label.split(',')).flat(2);
        const uniqueSet = new Set(array);
        return Array.from(uniqueSet)
    },

    jsonToDslMetaModel: (json: string): DslMetaModel => {
        const fromJson: any = JSON.parse(json);
        return new DslMetaModel({...fromJson?.model});
    },

    findDslMetaModelByName: (name: string): DslMetaModel | any => {
        return DslMetaModels.find((k: DslMetaModel) => k.name === name);
    },

    requestDslMetaModel: async (name: string): Promise<DslMetaModel | undefined> => {
        try {
            const res = await axios("/dsl/model/" + name);
            const text: string = await res.data;
            return DslMetaApi.jsonToDslMetaModel(JSON.stringify(text));
        } catch (e) {
            return Promise.any([undefined]);
        }
    },

    prepareDslMetaModels: () => {
        DslMetaModels.splice(0, DslMetaModels.length);
        const names = DslApi.getAvailableSteps();
        DslMetaApi.loadDslMetaModels(names)
    },

    loadDslMetaModels: (names: string[]) => {
        const promises = names.map((name: string) => DslMetaApi.requestDslMetaModel(name));
        Promise.all(promises).then(function (metas) {
            const result: DslMetaModel[] = metas.filter(value => value).map(value => new DslMetaModel({...value}))
            DslMetaModels.push(...result.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                return a.name > b.name ? 1 : 0;
            }));
            EventBus.sendEvent(KaravanEvent.MODELS_PREPARED);
            // console.log(DslMetaApi.getDslMetaModels())
        }).catch(reason => {

        });
    }
}