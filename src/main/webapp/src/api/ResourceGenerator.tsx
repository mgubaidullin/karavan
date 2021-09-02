import * as yaml from 'js-yaml';
import {Integration} from "../model/IntegrationModels";
import {RouteStepApi} from "./RouteStepApi";
import {ChoiceStep, ComponentStep, ExpressionStep, RouteStep} from "../model/RouteModels";

export class ResourceGenerator {

    static integrationToYaml = (integration: Integration): string => {
        const i = ResourceGenerator.integrationToObj(integration);
        const text = yaml.dump(i);
        return text;
    }

    static integrationToObj = (integration: Integration): {} => {
        const i = JSON.parse(JSON.stringify(integration, null, 3)); // fix undefined in string attributes
        const steps = RouteStepApi.deleteEmptySteps(i.spec.flows);
        i.spec.flows = ResourceGenerator.convertStepsToObjects(steps);
        return i;
    }

    static convertStepsToObjects = (steps: RouteStep[]): any[] => {
        const result: any[] = [];
        steps.forEach(s => {
            switch (s.type) {
                case "from":
                    const fromSteps: any[] = ResourceGenerator.convertStepsToObjects(s.steps);
                    const from: any = ResourceGenerator.componentStepToObj(s as ComponentStep, s.type, fromSteps);
                    result.push(from);
                    break;
                case "to":
                    const toSteps: any[] = ResourceGenerator.convertStepsToObjects(s.steps);
                    const to: any = ResourceGenerator.componentStepToObj(s as ComponentStep, s.type, toSteps);
                    result.push(to);
                    break;
                case "choice":
                    const choiceSteps = ResourceGenerator.convertStepsToObjects(s.steps);
                    const choice: any = ResourceGenerator.choiceStepToObj(s as ChoiceStep, s.type, choiceSteps);
                    result.push(choice);
                    break;
                case "filter":
                    const filterSteps = ResourceGenerator.convertStepsToObjects(s.steps);
                    const filter: any = ResourceGenerator.expressionStepToObj(s as ExpressionStep, s.type, filterSteps);
                    result.push(filter);
                    break;
                case "when":
                    const whenSteps = ResourceGenerator.convertStepsToObjects(s.steps);
                    const when: any = ResourceGenerator.expressionStepToObj(s as ExpressionStep, s.type, whenSteps);
                    result.push(when);
                    break;
                case "otherwise":
                    const otherwiseSteps = ResourceGenerator.convertStepsToObjects(s.steps);
                    const otherwise: any = ResourceGenerator.expressionStepToObj(s as ExpressionStep, s.type, otherwiseSteps);
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
