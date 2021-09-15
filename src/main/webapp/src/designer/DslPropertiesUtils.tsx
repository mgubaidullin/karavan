import {DslLanguage, DslMetaModel, DslProperty} from "../model/DslMetaModel";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslApi} from "../api/DslApi";
import {Property} from "../model/KameletModels";
import {KameletApi} from "../api/KameletApi";
import {CamelElement, From} from "../model/CamelModel";
import {PropertyMeta} from "../api/CamelMetadata";

export const DslPropertiesUtil = {

    sortElementProperties: (properties: DslProperty[]): DslProperty[] => {
        const result = properties.filter(p => !['uri', 'parameters', 'expression'].includes(p.name))
        const uri = properties.find(p => p.name === 'uri');
        const expression = properties.find(p => p.name === 'expression');
        const parameters = properties.find(p => p.name === 'parameters');
        if (parameters) result.push(parameters)
        if (expression) result.unshift(expression)
        if (uri) result.unshift(uri)
        return result
    },

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

    getDslModelProperties: (element: any): DslProperty[] => {
        const name = DslApi.getName(element);
        const model = DslMetaApi.findDslMetaModelByName(name);
        return Object.entries(model.properties)
            .map((p: [string, any]) => {
                const props = p[1];
                return new DslProperty({
                    name: p[0],
                    type: props.type,
                    title: props.displayName,
                    description: props.description,
                    secret: props.secret,
                    enum: props.enum
                });
            });
    },

    getElementProperties: (element: CamelElement): PropertyMeta[] => {
        console.log(element);
        Object.entries(element).forEach((v: [string, any]) => {
            console.log(v[0])
            console.log(v[1])
        })
        return []
        // DslPropertiesUtil.getExpressionLanguages()
        // const properties: DslProperty[] = []
        // const modelProperties: DslProperty[] = DslPropertiesUtil.getDslModelProperties(element);
        // const name = DslApi.getName(element);
        // const classname = DslMetaApi.getDslClassByName(name);
        // if (classname) {
        //     const params: any[] = DslMetaApi.getClassProperties(classname);
        //     // console.log(params)
        //     params.forEach((param: [string, any]) => {
        //         const name: string = param[0];
        //         const type: string = param[1].type;
        //         const modelProperty = modelProperties.find(mp => mp.name === name);
        //         // console.log(modelProperty)
        //         if (modelProperty && type && type !== 'array') {
        //             properties.push(modelProperty);
        //         } else if (name === 'parameters' && type === 'object') {
        //             const dslProperty = new DslProperty({
        //                 name: name,
        //                 type: type,
        //                 title: "Parameters",
        //             });
        //             properties.push(dslProperty);
        //         } else if (modelProperty && name === 'expression') {
        //             properties.push(modelProperty);
        //         }
        //     });
        // }
        // return DslPropertiesUtil.sortElementProperties(properties);
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