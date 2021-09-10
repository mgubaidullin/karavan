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
            const processor: {} = {choice: {uid: uuidv4(), when: []}}
            return processor
        } else {
            const proto: any = {}
            proto[dsl.name] = {}
            proto[dsl.name].uid = uuidv4()
            if (DslMetaApi.isDslModelHasSteps(dsl.name)) {
                proto[dsl.name].steps = []
            }
            const processor: ModelProcessorDefinition = {...proto}
            return processor;
        }
    }

    static genFlowId = (index: number): string => {
        return "flow" + index;
    }

    static getUid = (element: any): string => {
        return element[DslApi.getName(element)].uid
    }
    static getName = (processor: ModelProcessorDefinition): string => {
        let result: string = '';
        Object.entries(processor).forEach((proc: any) => {
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

    static getElements = (processor: ModelProcessorDefinition): ModelProcessorDefinition[] => {
        const result: ModelProcessorDefinition[] = []
        Object.entries(processor).forEach((proc: any) => {
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

    static updateStep = (flows: DslModelObject[], id: string, p: ModelProcessorDefinition): DslModelObject[] => {
        const result: DslModelObject[] = []
        flows.forEach(flow => {
            result.push(flow);
        })
        return result
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
                    const newElement = DslApi.setProcessorSteps(element, steps);
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
                    const newElement = DslApi.setProcessorSteps(element, steps);
                    result.push(newElement);
                } else {
                    result.push(element);
                }
            }
        })
        return result
    }


    static setProcessorSteps = (processor: ModelProcessorDefinition, steps: ModelProcessorDefinition[]): ModelProcessorDefinition => {
        const name: string = DslApi.getName(processor);
        const clone: any = {...processor};
        clone[name].steps = steps;
        return clone as ModelProcessorDefinition;
    }


    static create = (): any [] => {
        const to1: any = {
            to: {
                uid: uuidv4(),
                uri: "log:demo1",
            }
        }
        const to2: any = {
            to: {
                uid: uuidv4(),
                uri: "log:demo2",
            }
        }


        const filter: any = {
            filter: {
                uid: uuidv4(),
                simple: "${body} != null",
                steps: []
            }
        }
        const choice: any = {
            choice: {
                uid: uuidv4(),
                when: [
                    {when: {uid: uuidv4(), steps: []}},
                    {when: {uid: uuidv4(), steps: [to1, to2]}}
                ],
                // otherwise: {uid: uuidv4(), steps: []}
            }
        }
        const saga: any = {
            saga: {
                uid: uuidv4(),
                steps: [],
                completion: {uri: "direct0"},
                compensation: {uri: "direct1"}
            }
        }

        const from: any = {
            uid: uuidv4(),
            uri: "kamelet:timer-source",
            steps: [choice]
        }
        const model1: DslModelObject = {from: from};

        const model2: {} = {from: {uid: uuidv4(), uri: "direct1", steps: []}};
        return [model2, model1];
    }

    static create1 = (): DslModelObject => {

        const filter: ModelProcessorDefinition = {filter: {simple: "${body} != null"}}
        const choice: ModelProcessorDefinition = {
            choice: {
                when: [{simple: "condition", steps: []}],
                otherwise: {steps: []}
            }
        }
        const saga: ModelProcessorDefinition = {
            saga: {
                steps: [],
                completion: {uri: "direct0"},
                compensation: {uri: "direct1"}
            }
        }

        const from: DslYamlDeserializersRouteFromDefinitionDeserializer = {
            uri: "kamelet:timer-source",
            steps: [filter, choice, saga]
        }
        const model1: DslModelObject = {from: from};

        return model1;
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


