import * as yaml from 'js-yaml';
import {Integration, Metadata} from "../model/IntegrationModels";
import {DslApi} from "./DslApi";
import {Convert, DslModelObject} from "../model/DslModel";

export class ResourceGenerator {

    static flowsToYaml = (name:string, flows: any[]): string => {
        const integration:Integration = new Integration();
        integration.metadata.name = name;
        integration.spec.flows = flows;
        const i = ResourceGenerator.integrationToObject(integration);
        const text = yaml.dump(i);
        return text;
    }
    static integrationToObject = (integration: Integration): {} => {
        const i = JSON.parse(JSON.stringify(integration, null, 3)); // fix undefined in string attributes
        i.spec.flows = ResourceGenerator.convertElementToObjects(i.spec.flows);
        return i;
    }

    static convertElementToObjects = (elements: any[]): any[] => {
        const result: any[] = [];
        elements.forEach(e => {
            const name = DslApi.getName(e);
            if (e[name] !== undefined) {
                delete e[name].uid
                delete e[name].dsl
                if (name === 'choice'){
                    if (e[name].when !== undefined && e[name].when.length >0){
                        e[name].when = ResourceGenerator.convertElementToObjects(e[name].when);
                    } else {
                        delete e[name].when
                    }
                    if (e[name].otherwise !== undefined){
                        delete e[name].otherwise.otherwise.uid
                        delete e[name].otherwise.otherwise.dsl
                        e[name].otherwise = e[name].otherwise.otherwise
                        e[name].otherwise.steps = ResourceGenerator.convertElementToObjects(e[name].otherwise.steps)
                    }
                } else if (e[name].hasOwnProperty('steps')){
                    if (e[name].steps !== undefined && e[name].steps.length >0){
                        e[name].steps = ResourceGenerator.convertElementToObjects(e[name].steps);
                    } else {
                        delete e[name].steps
                    }
                }
            }
            result.push(e)
        })
        return result;
    }

    static yamlToIntegration = (y: string): Integration => {
        console.log(y)
        const i: any = yaml.load(y);
        const integration: Integration = new Integration({...i})
        // const flows: any[] = integration.spec.flows.map(f => {
        //     const json = JSON.stringify(f);
        //     console.log(json)
        //     const flow: DslModelObject = Convert.toDslModelObject(json);
        //     console.log(flow)
        //     return flow;
        // })
        // integration.spec.flows = flows;
        console.log(integration);
        return new Integration();
    }

    static integrationToObj = (integration: Integration): {} => {
        const i = JSON.parse(JSON.stringify(integration, null, 3)); // fix undefined in string attributes
        // const steps = RouteStepApi.deleteEmptySteps(i.spec.flows);
        // i.spec.flows = ResourceGenerator.convertStepsToObjects(steps);
        return i;
    }

}
