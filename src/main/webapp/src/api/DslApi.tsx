import {
    ModelProcessorDefinition, ModelWhenDefinition, typeMap
} from "../model/DslModel";
import {DslModelObject} from "../model/DslModel";
import {DslYamlDeserializersRouteFromDefinitionDeserializer} from "../model/DslModel";
import {DslMetaModel} from "../model/DslMetaModel";

export class DslApi {

    static createChildElement = (dsl: DslMetaModel): any => {
        if (dsl.name === 'choice') {
            const processor: ModelProcessorDefinition = {choice: {when: [], otherwise: {steps: []}}}
            return processor
        } else {
            const interfaceName = typeMap.ModelProcessorDefinition.props.find((p: any) => p.js === dsl.name).typ.unionMembers[1].ref;
            const listNames: string[] = typeMap[interfaceName].props.filter((p: any) => p.typ.unionMembers[1].arrayItems).map((p: any) => p.json);
            const proto: any = {}
            proto[dsl.name] = {}
            listNames.forEach(value => proto[dsl.name][value] = []);
            const processor: ModelProcessorDefinition = {...proto}
            return processor;
        }
    }

    static genStepId = (parentId: string, index: number, processor: ModelProcessorDefinition): string => {
        return parentId + ".step" + index + '.' + DslApi.getName(processor);
    }

    static genFlowId = (index: number): string => {
        return "flow" + index;
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

    static getSteps = (processor: ModelProcessorDefinition): ModelProcessorDefinition[] => {
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
            console.log(processor.choice)
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

    static deleteStep = (flows: DslModelObject[], idToDelete: string): DslModelObject[] => {
        console.log("DslApi.delete " + idToDelete)
        const result: DslModelObject[] = []
        flows.forEach((flow, index) => {
            if (flow.from?.steps && flow.from?.steps.length > 0) {
                const steps = DslApi.deleteOneStep(flow.from?.steps || [], idToDelete, DslApi.genFlowId(index))
                flow.from.steps = steps
            }
            result.push(flow);
        })
        console.log(result)
        return result
    }

    static deleteOneStep = (steps: ModelProcessorDefinition[], idToDelete: string, parentId: string): ModelProcessorDefinition[] => {
        const result: ModelProcessorDefinition[] = []
        steps.forEach((step, index) => {
            const sid = DslApi.genStepId(parentId, index, step)
            console.log("trying " + sid)
            if (sid !== idToDelete) {
                if (DslApi.processorHasSteps(step)) {
                    const steps = DslApi.deleteOneStep(DslApi.getSteps(step), idToDelete, sid);
                    const newStep = DslApi.setProcessorSteps(step, steps);
                    result.push(newStep);
                } else {
                    result.push(step);
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


    static create = (): DslModelObject[] => {

        const filter: ModelProcessorDefinition = {
            filter: {
                simple: "${body} != null",
                steps: [{to: "log:demo1"}, {to: "log:demo2"}]
            }
        }
        const choice: ModelProcessorDefinition = {choice: {when: [], otherwise: {steps: []}}}
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

        const model2: DslModelObject = {from: {uri: "direct1", steps: []}};
        return [model1, model2];
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


