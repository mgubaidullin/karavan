import * as yaml from 'js-yaml';
import {Integration} from "../model/IntegrationModels";
import {
    ChoiceStep,
    ComponentStep,
    ExpressionStep, FilterStep,
    FromStep,
    OtherwiseStep,
    RouteStep,
    ToStep, WhenStep
} from "../model/RouteModels";
import {Property} from "../model/KameletModels";
import {KameletApi} from "./KameletApi";
import {RouteStepApi} from "./RouteStepApi";


export class IntegrationGenerator {

    static yamlToIntegration = (code: string): Integration => {
        const obj: any = yaml.load(code);
        const i: Integration = IntegrationGenerator.objToIntegration(obj)
        return i;
    }

    static objToIntegration = (obj: any): Integration => {
        const i = new Integration(obj);
        const steps = IntegrationGenerator.convertObjectsToSteps(i.spec.flows);
        i.spec.flows = RouteStepApi.addEmptyStepsIfRequired(steps, undefined);
        return i;
    }

    static convertObjectsToSteps = (steps: any[]): RouteStep[] => {
        const result: RouteStep[] = [];
        steps?.forEach(s => {
            if (s.hasOwnProperty('from')) {
                const fromSteps: RouteStep[] = IntegrationGenerator.convertObjectsToSteps(s.steps);
                const from: FromStep = IntegrationGenerator.objToComponentStep(s['from'], 'from', fromSteps);
                result.push(from);
            } else if (s.hasOwnProperty('to')) {
                const toSteps: RouteStep[] = IntegrationGenerator.convertObjectsToSteps(s.steps);
                const to: ToStep = IntegrationGenerator.objToComponentStep(s['to'], 'to', toSteps);
                result.push(to);
            } else if (s.hasOwnProperty('choice')) {
                const choiceSteps = IntegrationGenerator.convertObjectsToSteps(s.steps);
                const choice: any = IntegrationGenerator.objToChoiceStep(s as ChoiceStep, s.type, choiceSteps);
                result.push(choice);
            } else if (s.hasOwnProperty('filter')) {
                const filterSteps = IntegrationGenerator.convertObjectsToSteps(s.steps);
                const filter: any = IntegrationGenerator.objToExpressionStep(s as ExpressionStep, s.type, filterSteps);
                result.push(filter);
            } else if (s.hasOwnProperty('when')) {
                const whenSteps = IntegrationGenerator.convertObjectsToSteps(s.steps);
                const when: any = IntegrationGenerator.objToExpressionStep(s as ExpressionStep, s.type, whenSteps);
                result.push(when);
            } else if (s.hasOwnProperty('otherwise')) {
                const otherwiseSteps = IntegrationGenerator.convertObjectsToSteps(s.steps);
                const otherwise: any = IntegrationGenerator.objToExpressionStep(s as ExpressionStep, s.type, otherwiseSteps);
                result.push(otherwise);
            }
        });
        return result;
    }

    static objToComponentStep = (obj: any, type: string, steps: RouteStep[]): ComponentStep => {
        const uri: string = obj.hasOwnProperty('uri') ? obj['uri'] : undefined;
        const component = uri ? uri.split(":")[0] : '';
        const path = uri ? uri.split(":")[1] : '';
        const properties: Property[] = [];
        if (component === 'kamelet') {
            if (obj.hasOwnProperty('parameters')) {
                const props = KameletApi.getKameletProperties(path);
                const values: Map<string, any> = new Map(Object.entries(obj['parameters']));
                props.forEach(p => {
                    p.value = values.has(p.id) ? values.get(p.id) : p.value;
                    properties.push(p)
                });
            } else {
                properties.push(...KameletApi.getKameletProperties(component));
            }
        }
        return type === 'to'
            ? new ToStep({component: component, path: path, properties: properties})
            : new FromStep({component: component, path: path, properties: properties});
    }

    static objToExpressionStep = (obj: any, type: string, steps: RouteStep[]): ExpressionStep | undefined => {
        if (type === 'otherwise') {
            return new OtherwiseStep({steps: steps});
        } else {
            if (obj.hasOwnProperty('simple')) {
                if (type === 'filter') {
                    return new FilterStep({simple: obj['simple'], steps: steps})
                } else if (type === 'when') {
                    return new WhenStep({simple: obj['simple'], steps: steps})
                }
            }
        }
    }

    static objToChoiceStep = (obj: any, type: string, steps: RouteStep[]): ChoiceStep => {
        return new ChoiceStep({steps: steps});
    }
}
