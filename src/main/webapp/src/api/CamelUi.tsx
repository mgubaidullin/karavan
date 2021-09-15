import * as yaml from 'js-yaml';
import {Integration, CamelElement} from "../model/CamelModel";
import {CamelApi} from "./CamelApi";

export class CamelYaml {

    static integrationToYaml = (integration: Integration): string => {
        const clone: any = Object.assign({}, integration);
        const flows = integration.spec.flows
        clone.spec.flows = flows.map((f: any) => CamelYaml.cleanupElement(f));
        const i = JSON.parse(JSON.stringify(clone, null, 3)); // fix undefined in string attributes
        const text = yaml.dump(i);
        return text;
    }

    static cleanupElement = (element: CamelElement): CamelElement => {
        const result:any = Object.assign({}, element)
        delete result.uuid
        delete result.dslName
        Object.keys(result).forEach(key => {
            if (result[key] instanceof CamelElement){
                result[key] = CamelYaml.cleanupElement(result[key])
            } else if (Array.isArray(result[key])){
                result[key] = CamelYaml.cleanupElements(result[key])
            }
        })
        return result as CamelElement
    }

    static cleanupElements = (elements: CamelElement[]): CamelElement[] => {
        const result:any[] = []
        elements.forEach(element => {
            const newElement = CamelYaml.cleanupElement(element)
            result.push(newElement)
        })
        return result
    }

    static yamlToIntegration = (text: string): Integration => {
        const fromYaml: any = yaml.load(text);
        const int: Integration = new Integration({...fromYaml});
        const flows = int.spec.flows.map(f => CamelApi.createFrom(f))
        int.spec.flows = flows;
        return int;
    }
}

