import * as yaml from 'js-yaml';
import {Integration} from "../model/IntegrationModels";
import {RouteStepApi} from "./RouteStepApi";
import {ChoiceStep, ComponentStep, ExpressionStep, FromStep, RouteStep, ToStep} from "../model/RouteModels";

const x:string = "apiVersion: camel.apache.org/v1\n" +
    "kind: Integration\n" +
    "metadata:\n" +
    "  name: demo-timer\n" +
    "spec:\n" +
    "  flows:\n" +
    "    - from:\n" +
    "        uri: kamelet:timer-source\n" +
    "        parameters:\n" +
    "          payload: \"Hello World\"\n" +
    "        steps:\n" +
    "          - log: \"${body}\""


export class IntegrationGenerator {

    static yamlToIntegration = (code: String): string => {
        const obj:any = yaml.load(x);
        const i:Integration = IntegrationGenerator.objToIntegration(obj)
        console.log("----");
        console.log(obj);
        console.log(i);
        return 'text';
    }

    static objToIntegration = (obj: any): Integration => {
        const i = new Integration(obj);
        i.spec.flows = IntegrationGenerator.convertObjectsToSteps(i.spec.flows);
        return i;
    }

    static convertObjectsToSteps = (steps: any[]): RouteStep[] => {
        const result: RouteStep[] = [];

        return result;
    }
    static convertStepsToObjects = (steps: RouteStep[]): any[] => {
        const result: any[] = [];
        steps.forEach(s => {
            switch (s.type) {
                case "from":
                    const fromSteps: any[] = IntegrationGenerator.convertStepsToObjects(s.steps);
                    const from: any = IntegrationGenerator.componentStepToObj(s as ComponentStep, s.type, fromSteps);
                    result.push(from);
                    break;
                case "to":
                    const toSteps: any[] = IntegrationGenerator.convertStepsToObjects(s.steps);
                    const to: any = IntegrationGenerator.componentStepToObj(s as ComponentStep, s.type, toSteps);
                    result.push(to);
                    break;
                case "choice":
                    const choiceSteps = IntegrationGenerator.convertStepsToObjects(s.steps);
                    const choice: any = IntegrationGenerator.choiceStepToObj(s as ChoiceStep, s.type, choiceSteps);
                    result.push(choice);
                    break;
                case "filter":
                    const filterSteps = IntegrationGenerator.convertStepsToObjects(s.steps);
                    const filter: any = IntegrationGenerator.expressionStepToObj(s as ExpressionStep, s.type, filterSteps);
                    result.push(filter);
                    break;
                case "when":
                    const whenSteps = IntegrationGenerator.convertStepsToObjects(s.steps);
                    const when: any = IntegrationGenerator.expressionStepToObj(s as ExpressionStep, s.type, whenSteps);
                    result.push(when);
                    break;
                case "otherwise":
                    const otherwiseSteps = IntegrationGenerator.convertStepsToObjects(s.steps);
                    const otherwise: any = IntegrationGenerator.expressionStepToObj(s as ExpressionStep, s.type, otherwiseSteps);
                    result.push(otherwise);
                    break;
            }
        })
        return result;
    }

    static componentStepToObj = (step: ComponentStep, type: string, steps: any[]): {} => {
        const parameters: any = {};
        step.properties.forEach(p => {
            if (p.value && (p.value as string).length > 0) {
                parameters[p.id] = p.value;
            }
        })
        return type === 'to'
            ? {
                [type]: {
                    uri: step.component + ":" + step.path,
                    parameters: parameters
                }
            }
            : {
                [type]: {
                    uri: step.component + ":" + step.path,
                    parameters: parameters,
                    steps: steps
                }
            };
    }

    static expressionStepToObj = (step: ExpressionStep, type: string, steps: any[]): {} => {
        return type === 'otherwise'
            ? {[type]: {steps: steps}}
            : {
                [type]: {
                    simple: step.simple,
                    steps: steps
                }
            };
    }
    static choiceStepToObj = (step: ChoiceStep, type: string, steps: any[]): {} => {
        return {
            [type]: {
                steps: steps
            }
        };
    }
}
