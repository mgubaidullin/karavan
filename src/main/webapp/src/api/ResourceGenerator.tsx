import * as yaml from 'js-yaml';
import {Integration} from "../model/CamelModel";
import {DslApi} from "./DslApi";
import {
    CamelElement,
    ChoiceStep,
    Expression,
    FilterStep,
    FromStep,
    Otherwise, ProcessorStep,
    ToStep,
    When, WhenStep
} from "../model/CamelModel";
import {CamelApi} from "./CamelApi";
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
        ResourceGenerator.test(y)
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
        return new Integration();
    }

    static integrationToObj = (integration: Integration): {} => {
        const i = JSON.parse(JSON.stringify(integration, null, 3)); // fix undefined in string attributes
        // const steps = RouteStepApi.deleteEmptySteps(i.spec.flows);
        // i.spec.flows = ResourceGenerator.convertStepsToObjects(steps);
        return i;
    }

    static test =(y: string)=>{
        // console.log(y)
        // const i:{} = yaml.load(y) as {};
        // const int:Integration = new Integration({...i})
        // int.spec.flows.forEach(from => {
        //     // console.log(from)
        //     // const t: string = JSON.stringify(from);
        //     // console.log(Convert.toDslModelObject(t));
        //     ResourceGenerator.prepareElement(from)
        // })
        const to1 = new ToStep({uri:'log:demo1'});
        const to2 = new ToStep({uri:'log:demo2'});
        const to3 = new ToStep({uri:'log:demo3'});

        const otherwise = new Otherwise({steps:[to3]})
        const expression1 = new Expression({simple:'${body} == "hello"'});
        const when1 = new WhenStep({steps:[to1], expression: expression1})
        const expression2 = new Expression({simple:'${body} == "hello"'});
        const when2 = new WhenStep({steps:[to2], expression: expression2})

        const choice = new ChoiceStep({otherwise:otherwise, when:[when1,when2]})

        const expression = new Expression({simple:'${body} == "hello"'});
        const filter = new FilterStep({expression: expression})
        const from = new FromStep({uri:'direct1', steps:[filter, choice]});
        // const from = new FromStep({uri:'direct1', steps:[to1]});
        console.log(from)
        const cleanFrom = ResourceGenerator.cleanupElement(from);
        const flows:FromStep[] = [cleanFrom as FromStep];
        const result = JSON.parse(JSON.stringify(flows, null, 3));
        const yamlText = yaml.dump(result);
        console.log(yamlText)

        const fromYaml:[] = yaml.load(yamlText) as [];
       fromYaml.forEach(f => {
           console.log(ResourceGenerator.createFrom(f))
       })
    }

    static createFrom = (element: any): FromStep => {
        const fromStep =  new FromStep({...element.from})
        fromStep.from.steps = CamelApi.createSteps(element?.from?.steps);

        return fromStep
    }

    // static createElement = (element: any): CamelElement => {
    //     console.log(element.name)
    //     console.log(element.from)
    //     console.log(element.from.from)
    //     Object.keys(element).forEach(key => {
    //         console.log("   " + key)
    //         if (CamelElements.includes(key)){
    //             if (element.hasOwnProperty(key) && element[key] && element[key].hasOwnProperty(key)){
    //                 console.log("    is Step")
    //                 return  CamelApi.createStep(key, element[key][key])
    //             } else if (element.hasOwnProperty(key) && element[key]){
    //                 console.log("    is Element")
    //             }
    //         }
    //     })
    //
    //     if (element){
    //
    //     }
    //     return new CamelElement('xxx');
    // }



    static cleanupElement = (element: CamelElement): CamelElement => {
        const result:any = Object.assign({}, element)
        delete result.uuid
        delete result.dslName
        Object.keys(result).forEach(key => {
            if (result[key] instanceof CamelElement){
                result[key] = ResourceGenerator.cleanupElement(result[key])
            } else if (Array.isArray(result[key])){
                result[key] = ResourceGenerator.cleanupElements(result[key])
            }
        })
        return result as CamelElement
    }

    static cleanupElements = (elements: CamelElement[]): CamelElement[] => {
        const result:any[] = []
        elements.forEach(element => {
            const newElement = ResourceGenerator.cleanupElement(element)
            result.push(newElement)
        })
        return result
    }

    static prepareElement = (element: any): any => {
        console.log("--------");
        console.log(element);
        if (Array.isArray(element)){
            console.log("array")
            return (element as []).map(e => ResourceGenerator.prepareElement(e));
        } else if (typeof element === 'object'){
            console.log("object " + Object.keys(element).length)
            // const result = {uid: uu}
            Object.entries(element).forEach((props: [string, any]) => {

            });
            // console.log(result)
            return element
        } else {
            console.log("property " + Object.keys(element).length)
            return Object.keys(element).length === 0 ? undefined : element;
        }
    }
}

