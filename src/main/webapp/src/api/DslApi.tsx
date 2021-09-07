import {
    Convert,
    ModelProcessorDefinition
} from "../model/DslModel";
import * as yaml from 'js-yaml';
import {DslModelObject} from "../model/DslModel";
import {DslYamlDeserializersRouteFromDefinitionDeserializer} from "../model/DslModel";
import {KameletApi} from "./KameletApi";

export class DslApi {

    static genStepId = (parentId:string, index: number, processor:ModelProcessorDefinition): string => {
        return parentId + ".step" + index +'.' + DslApi.getName(processor);
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

    static hasSteps = (processor: ModelProcessorDefinition): boolean => {
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

    static updateStep = (flows: DslModelObject[], id:string, p: ModelProcessorDefinition):DslModelObject[] => {
        const result:DslModelObject[] = []
        flows.forEach(flow => {
            result.push(flow);
        })
        return result
    }

    static deleteStep = (flows: DslModelObject[], idToDelete:string):DslModelObject[] => {
        console.log("DslApi.delete " + idToDelete)
        const result:DslModelObject[] = []
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

    static deleteOneStep = (steps: ModelProcessorDefinition[], idToDelete:string, parentId:string):ModelProcessorDefinition[] => {
        const result:ModelProcessorDefinition[] = []
        steps.forEach((step,index) => {
            const sid = DslApi.genStepId(parentId, index, step)
            console.log("trying " + sid)
            if (sid !== idToDelete){
                if (DslApi.hasSteps(step)){
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

    static setProcessorSteps = (processor: ModelProcessorDefinition, steps: ModelProcessorDefinition[]):ModelProcessorDefinition => {
        const name:string = DslApi.getName(processor);
        const clone:any = {...processor};
        clone[name].steps = steps;
        return clone as ModelProcessorDefinition;
    }

    static getIcon = (name: string, uri?: string): string => {
        const defaultIcon = "data:image/svg+xml,%3Csvg viewBox='0 0 130.21 130.01' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='333.48' x2='477' y1='702.6' y2='563.73' gradientTransform='translate(94.038 276.06) scale(.99206)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F69923' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.11'/%3E%3Cstop stop-color='%23E97826' offset='.945'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='333.48' x2='477' y1='702.6' y2='563.73' gradientTransform='translate(94.038 276.06) scale(.99206)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F69923' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.08'/%3E%3Cstop stop-color='%23E97826' offset='.419'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='633.55' x2='566.47' y1='814.6' y2='909.12' gradientTransform='translate(-85.421 56.236)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23f6e423' offset='0'/%3E%3Cstop stop-color='%23F79A23' offset='.412'/%3E%3Cstop stop-color='%23E97826' offset='.733'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(-437.89 -835.29)'%3E%3Ccircle cx='503.1' cy='900.29' r='62.52' fill='url(%23a)' stroke='url(%23b)' stroke-linejoin='round' stroke-width='4.96'/%3E%3Cpath d='M487.89 873.64a89.53 89.53 0 0 0-2.688.031c-1.043.031-2.445.362-4.062.906 27.309 20.737 37.127 58.146 20.25 90.656.573.015 1.142.063 1.719.063 30.844 0 56.62-21.493 63.28-50.312-19.572-22.943-46.117-41.294-78.5-41.344z' fill='url(%23c)' opacity='.75'/%3E%3Cpath d='M481.14 874.58c-9.068 3.052-26.368 13.802-43 28.156 1.263 34.195 28.961 61.607 63.25 62.5 16.877-32.51 7.06-69.919-20.25-90.656z' fill='%2328170b' opacity='.75'/%3E%3Cpath d='M504.889 862.546c-.472-.032-.932.028-1.375.25-5.6 2.801 0 14 0 14-16.807 14.009-13.236 37.938-32.844 37.938-10.689 0-21.322-12.293-32.531-19.812-.144 1.773-.25 3.564-.25 5.375 0 24.515 13.51 45.863 33.469 57.063 5.583-.703 11.158-2.114 15.344-4.906 21.992-14.662 27.452-42.557 36.438-56.031 5.596-8.407 31.824-7.677 33.594-11.22 2.804-5.601-5.602-14-8.406-14h-22.406c-1.566 0-4.025-2.78-5.594-2.78h-8.406s-3.725-5.65-7.031-5.875z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E"
        switch (name){
            case 'filter':
                return "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='filter' class='svg-inline--fa fa-filter fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z'%3E%3C/path%3E%3C/svg%3E"
            case 'choice':
                return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='1em' width='1em' viewBox='0 0 384 512' aria-hidden='true' role='img' style='vertical-align: -0.125em;'%3E%3Cpath d='M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z'%3E%3C/path%3E%3C/svg%3E"
            case 'when':
                return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='1em' width='1em' viewBox='0 0 384 512' aria-hidden='true' role='img' style='vertical-align: -0.125em;'%3E%3Cpath d='M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z'%3E%3C/path%3E%3C/svg%3E"
            case 'loop':
                return "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='filter' class='svg-inline--fa fa-filter fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z'%3E%3C/path%3E%3C/svg%3E"
            case 'from':
                const f = KameletApi.findKameletByName(uri?.split(":")[1] || '')
                return f?.icon() || defaultIcon;
            case 'to':
                const t = KameletApi.findKameletByName(uri?.split(":")[1] || '')
                return t?.icon() || defaultIcon;
            default:
                return defaultIcon;
        }
    }


    static create = (): DslModelObject[] => {

        const filter: ModelProcessorDefinition = {filter: {simple:"${body} != null", steps:[{to:"log:demo1"}, {to:"log:demo2"}]}}
        const choice: ModelProcessorDefinition = {choice:{when:[], otherwise:{steps:[]}}}
        const saga: ModelProcessorDefinition = {saga:{steps:[], completion: {uri:"direct0"}, compensation:{uri:"direct1"}}}

        const from: DslYamlDeserializersRouteFromDefinitionDeserializer = {uri:"kamelet:timer-source", steps:[filter, choice, saga]}
        const model1: DslModelObject = {from: from};

        const model2: DslModelObject = {from: {uri:"direct1", steps:[]}};
        return [model1, model2];
    }

    static create1 = (): DslModelObject => {

        const filter: ModelProcessorDefinition = {filter: {simple:"${body} != null"}}
        const choice: ModelProcessorDefinition = {choice:{when:[{simple:"condition", steps:[]}], otherwise:{steps:[]}}}
        const saga: ModelProcessorDefinition = {saga:{steps:[], completion: {uri:"direct0"}, compensation:{uri:"direct1"}}}

        const from: DslYamlDeserializersRouteFromDefinitionDeserializer = {uri:"kamelet:timer-source", steps:[filter, choice, saga]}
        const model1: DslModelObject = {from: from};

        return model1;
    }

    static test =()=>{
        const y = " - from: \n" +
            "    uri: \"direct:start\"\n" +
            "    steps: \n" +
            "      - filter:\n" +
            "          expression:\n" +
            "            simple: \"${in.header.continue} == true\"\n" +
            "          steps: \n" +
            "            - to:\n" +
            "                uri: \"log:filtered\"\n" +
            "      - to:\n" +
            "          uri: \"log:original\""

        const o: [] = yaml.load(y) as [];
        o.forEach(value => {
            console.log(value)
            const t: string = JSON.stringify(value);
            console.log(Convert.toDslModelObject(t));
        })

        // const json: { } = JSON.parse(t);

        // console.log(Convert.toDslModelObject("{\"from\":{\"uri\":\"kamelet:timer-source\",\"steps\":[{\"filter\":{\"simple\":\"${body} != null\"}},{\"choice\":{\"when\":[],\"otherwise\":{\"steps\":[]}}},{\"saga\":{\"steps\":[],\"completion\":{\"uri\":\"direct0\"},\"compensation\":{\"uri\":\"direct1\"}}}]}}"));

// console.log((DslApi.create()))
    }
}


