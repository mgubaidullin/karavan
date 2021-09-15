import {DslLanguage, DslMetaModel, DslProperty} from "../model/DslMetaModel";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslApi} from "../api/DslApi";
import {Property} from "../model/KameletModels";
import {KameletApi} from "../api/KameletApi";
import {CamelElement, From} from "../model/CamelModel";
import {PropertyMeta} from "../api/CamelMetadata";

export const DslPropertiesUtil = {

    getExpressionLanguages: (): DslLanguage[] => {
        const array: DslLanguage[] = []
        const classname = DslMetaApi.getDslClassByName('expression');
        if (classname) {
            const params: any[] = DslMetaApi.getClassProperties(classname);
            params.forEach(value => {
                const model:DslMetaModel = DslMetaApi.findDslMetaModelByName(value[0]);
                if (array.findIndex(a => a.name === value[0]) === -1){
                    array.push(new DslLanguage({name: value[0], title: model.title, description: model.description}));
                }
            });
        }
        const uniqueSet = new Set(array);
        return Array.from(uniqueSet)
    },



    getKameletProperties: (element: any): Property[] => {
        const uri = DslApi.getUri(element)
        const kamelet = KameletApi.findKameletByUri(uri)
        return kamelet ? KameletApi.getKameletProperties(kamelet?.metadata.name) : []
    },

    isKameletComponent: (element: any): boolean => {
        const uri = DslApi.getUri(element)
        return (uri !== undefined && uri.startsWith("kamelet"))
    }
}