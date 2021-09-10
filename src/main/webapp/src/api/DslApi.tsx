import {
    ModelProcessorDefinition, ModelWhenDefinition, typeMap
} from "../model/DslModel";
import {DslModelObject} from "../model/DslModel";
import {DslYamlDeserializersRouteFromDefinitionDeserializer} from "../model/DslModel";
import {DslMetaModel} from "../model/DslMetaModel";
import {v4 as uuidv4} from "uuid";
import {DslMetaApi} from "./DslMetaApi";

export class DslApi {

    static createChildElement = (dsl: DslMetaModel): any => {
        if (dsl.name === 'choice') {
            const element: {} = {choice: {uid: uuidv4(), dsl: 'choice', when: []}}
            return element
        } else {
            const proto: any = {}
            proto[dsl.name] = {}
            proto[dsl.name].uid = uuidv4()
            proto[dsl.name].dsl = dsl.name
            if (DslMetaApi.isDslModelHasSteps(dsl.name)) {
                proto[dsl.name].steps = []
            }
            const element = {...proto}
            return element;
        }
    }

    static genFlowId = (index: number): string => {
        return "flow" + index;
    }

    static getUid = (element: any): string => {
        const name = DslApi.getName(element);
        return element[name].uid
    }
    static getName = (element: any): string => {
        let result: string = '';
        Object.entries(element).forEach((proc: any) => {
            const name: any = Object.entries(proc)[0][1];
            const step: any = Object.entries(proc)[1][1];
            if (step) {
                result = name;
            }
        })
        return result;
    }

    static processorHasSteps = (processor: ModelProcessorDefinition): boolean => {
        let result: boolean = false;
        Object.entries(processor).forEach((proc: any) => {
            const name: any = Object.entries(proc)[0][1];
            const step: any = Object.entries(proc)[1][1];
            result = step.hasOwnProperty('steps')
        })
        return result;
    }

    static getFromElements = (from: DslYamlDeserializersRouteFromDefinitionDeserializer | undefined): any[] => {
        const result: any[] = []
        if (from)
            result.push(...from.steps)
        return result;
    }

    static getElements = (element: any): ModelProcessorDefinition[] => {
        const result: ModelProcessorDefinition[] = []
        Object.entries(element).forEach((proc: any) => {
            const name: any = Object.entries(proc)[0][1];
            const step: any = Object.entries(proc)[1][1];
            if (step.hasOwnProperty('steps')) {
                result.push(...step.steps);
            }
        })
        return result;
    }

    static getWhens = (processor: ModelProcessorDefinition): ModelWhenDefinition[] => {
        const result: ModelWhenDefinition[] = []
        if (processor.choice) {
            result.push(...processor.choice.when || [])
        }
        return result;
    }

    static getAvailableSteps = (): string[] => {
        const result: string[] = []
        typeMap.ModelProcessorDefinition.props.forEach((p: any) => {
            result.push(p.js.toString())
        })
        return result;
    }

    static updateFlows = (flows: DslModelObject[], uid: string, element: any): DslModelObject[] => {
        const result: DslModelObject[] = []
        flows.forEach(flow => {
            const newFlow = DslApi.updateOneFlow(flow, uid, element);
            result.push(newFlow);
        })
        return result
    }

    static updateOneFlow = (flow: DslModelObject, uid: string, element: any): DslModelObject => {
        const result: ModelProcessorDefinition[] = []
        flow.from?.steps.forEach(step => {
            const newStep = DslApi.updateElement(step, uid, element)
            result.push(newStep);
        })
        if (flow.from) flow.from.steps = result
        return flow
    }

    static updateElement = (oldElement: any, uid: string, newElement: any): any => {
        if (DslApi.getUid(oldElement) === uid) {
            return newElement;
        } else {
            if (DslApi.getName(oldElement) === 'choice') {
                if (oldElement.choice.otherwise !== undefined) {
                    if (oldElement.choice.otherwise.uid === uid) {
                        oldElement.choice.otherwise = newElement
                    } else {
                        const newSteps = DslApi.getElements(oldElement.choice.otherwise).map((step: any) => DslApi.updateElement(step, uid, newElement));
                        oldElement.choice.otherwise.steps = newSteps;
                    }
                }
                // const newWhen = DslApi.getWhens(oldElement).map((step: any) => DslApi.updateElement(step, uid, newElement));
                // oldElement.choice.when = newWhen
            } else if (DslMetaApi.isDslModelHasSteps(DslApi.getName(oldElement))) {
                const newSteps = DslApi.getElements(oldElement).map((step: any) => DslApi.updateElement(step, uid, newElement));
                oldElement = DslApi.setElementSteps(oldElement, newSteps);
            }
        }
        return oldElement;
    }

    static deleteElement = (flows: DslModelObject[], idToDelete: string): DslModelObject[] => {
        console.log("DslApi.delete " + idToDelete)
        const result: DslModelObject[] = []
        flows.forEach((flow, index) => {
            if (flow.from?.steps && flow.from?.steps.length > 0) {
                const steps = DslApi.deleteOneElement(flow.from?.steps || [], idToDelete)
                flow.from.steps = steps
            }
            result.push(flow);
        })
        // console.log(result)
        return result
    }

    static deleteOneElement = (elements: any[], idToDelete: string): any [] => {
        const result: any [] = []
        elements.forEach((element, index) => {
            const el: any = Object.entries(element)[0][1];
            const elName = Object.entries(element)[0][0];
            if (el.uid !== idToDelete) {
                if (elName === 'choice') {
                    element.choice.when = DslApi.deleteOneWhenElement(element.choice.when, idToDelete);
                    result.push(element);
                } else if (DslApi.processorHasSteps(element)) {
                    const steps = DslApi.deleteOneElement(DslApi.getElements(element), idToDelete);
                    const newElement = DslApi.setElementSteps(element, steps);
                    result.push(newElement);
                } else {
                    result.push(element);
                }
            } else {
                console.log("deleted element:")
                console.log(element)
            }
        })
        return result
    }

    static deleteOneWhenElement = (elements: any[], idToDelete: string): any [] => {
        const result: any [] = []
        elements.forEach((element, index) => {
            if (element.when.uid !== idToDelete) {
                if (DslApi.processorHasSteps(element)) {
                    const steps = DslApi.deleteOneElement(DslApi.getElements(element), idToDelete);
                    const newElement = DslApi.setElementSteps(element, steps);
                    result.push(newElement);
                } else {
                    result.push(element);
                }
            }
        })
        return result
    }


    static setElementSteps = (element: any, steps: any[]): any => {
        const name: string = DslApi.getName(element);
        const clone: any = {...element};
        clone[name].steps = steps;
        return clone;
    }


    static create = (): any [] => {
        const to1: any = {...DslApi.createChildElement(DslMetaApi.findDslMetaModelByName("to"))}
        const to2: any = {...DslApi.createChildElement(DslMetaApi.findDslMetaModelByName("to"))}
        const filter: any = {...DslApi.createChildElement(DslMetaApi.findDslMetaModelByName("filter"))}
        const when1: any = {...DslApi.createChildElement(DslMetaApi.findDslMetaModelByName("when"))}
        when1.when.steps.push(filter)
        const when2: any = {...DslApi.createChildElement(DslMetaApi.findDslMetaModelByName("when"))}
        when2.when.steps.push(to1, to2)
        const choice: any = {...DslApi.createChildElement(DslMetaApi.findDslMetaModelByName("choice"))}
        choice.choice.when.push(when1, when2);

        // const saga: any = {
        //     saga: {
        //         uid: uuidv4(),
        //         steps: [],
        //         completion: {uri: "direct0"},
        //         compensation: {uri: "direct1"}
        //     }
        // }

        const from: any = {
            uid: uuidv4(),
            uri: "kamelet:timer-source",
            steps: [choice]
        }
        const model1: DslModelObject = {from: from};

        const model2: {} = {from: {uid: uuidv4(), uri: "direct1", steps: []}};
        return [model2, model1];
    }

    // static test =()=>{
    //     const y = " - from: \n" +
    //         "    uri: \"direct:start\"\n" +
    //         "    steps: \n" +
    //         "      - filter:\n" +
    //         "          expression:\n" +
    //         "            simple: \"${in.header.continue} == true\"\n" +
    //         "          steps: \n" +
    //         "            - to:\n" +
    //         "                uri: \"log:filtered\"\n" +
    //         "      - to:\n" +
    //         "          uri: \"log:original\""
    //
    //     const o: [] = yaml.load(y) as [];
    //     o.forEach(value => {
    //         console.log(value)
    //         const t: string = JSON.stringify(value);
    //         console.log(Convert.toDslModelObject(t));
    //     })

    // const json: { } = JSON.parse(t);

    // console.log(Convert.toDslModelObject("{\"from\":{\"uri\":\"kamelet:timer-source\",\"steps\":[{\"filter\":{\"simple\":\"${body} != null\"}},{\"choice\":{\"when\":[],\"otherwise\":{\"steps\":[]}}},{\"saga\":{\"steps\":[],\"completion\":{\"uri\":\"direct0\"},\"compensation\":{\"uri\":\"direct1\"}}}]}}"));

// console.log((DslApi.create()))
//     }
}


