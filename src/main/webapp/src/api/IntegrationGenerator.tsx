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
                const from = IntegrationGenerator.convert(s, 'from', IntegrationGenerator.objToComponentStep);
                result.push(from);
            } else if (s.hasOwnProperty('to')) {
                const to = IntegrationGenerator.convert(s, 'to', IntegrationGenerator.objToComponentStep);
                result.push(to);
            } else if (s.hasOwnProperty('choice')) {
                const choice = IntegrationGenerator.convert(s, 'choice', IntegrationGenerator.objToChoiceStep);
                result.push(choice);
            } else if (s.hasOwnProperty('filter')) {
                const filter = IntegrationGenerator.convert(s, 'filter', IntegrationGenerator.objToExpressionStep);
                result.push(filter);
            } else if (s.hasOwnProperty('when')) {
                const when = IntegrationGenerator.convert(s, 'when', IntegrationGenerator.objToExpressionStep);
                result.push(when);
            } else if (s.hasOwnProperty('otherwise')) {
                const otherwise = IntegrationGenerator.convert(s, 'otherwise', IntegrationGenerator.objToExpressionStep);
                result.push(otherwise);
            }
        });
        return result;
    }

    static convert = (obj: any, type:string, convert: (obj: any, type: string) => RouteStep): RouteStep => {
        const source = obj[type];
        const sourceSteps = source['steps'];
        const routeSteps = IntegrationGenerator.convertObjectsToSteps(sourceSteps);
        const routeStep = convert(source, type);
        routeStep.steps.unshift(...routeSteps);
        return routeStep;
    }

    static objToComponentStep = (obj: any, type: string): ComponentStep => {
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

    static objToExpressionStep = (obj: any, type: string): ExpressionStep => {
        if (type === 'otherwise') {
            return new OtherwiseStep();
        } else {
            if (obj.hasOwnProperty('simple')) {
                if (type === 'filter') {
                    return new FilterStep({simple: obj['simple']})
                } else if (type === 'when') {
                    return new WhenStep({simple: obj['simple']})
                }
            }
        }
        return new ExpressionStep();
    }

    static objToChoiceStep = (obj: any, type: string): ChoiceStep => {
        return new ChoiceStep();
    }
}
