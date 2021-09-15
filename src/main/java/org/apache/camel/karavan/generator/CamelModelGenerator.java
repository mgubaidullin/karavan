package org.apache.camel.karavan.generator;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public final class CamelModelGenerator {

    public static void main(String[] args) throws Exception {
        CamelModelGenerator.generate();
    }

    public static void generate() throws Exception {
        CamelModelGenerator g = new CamelModelGenerator();
        g.createModels(
                "src/main/resources/camel-yaml-dsl.json",
                "src/main/webapp/src/model/CamelModel.tsx",
                "src/main/webapp/src/api/CamelApi.tsx");
    }

    private void createModels(String source, String targetModel, String targetApi) throws Exception {
        Vertx vertx = Vertx.vertx();

        Buffer buffer = vertx.fileSystem().readFileBlocking(source);
        JsonObject definitions = new JsonObject(buffer).getJsonObject("items").getJsonObject("definitions");

        StringBuilder camelModel = new StringBuilder();
        camelModel.append("import {v4 as uuidv4} from 'uuid' \n\n");

        camelModel.append(
                "export class CamelElement { \n" +
                "   uuid: string = ''\n" +
                "   dslName: string = ''\n" +
                "   constructor(dslName: string) {\n" +
                "       this.uuid = uuidv4()\n" +
                "       this.dslName = dslName\n" +
                "   }\n" +
                "}\n\n");

        camelModel.append(
                "export class ProcessorStep extends CamelElement {\n" +
                "}\n\n");

        // generate properties for elements
        Map<String, List<ElementProp>> models = new HashMap<>();
        // from
        JsonObject fromList = getProperties(definitions, "org.apache.camel.dsl.yaml.deserializers.RouteFromDefinitionDeserializer");
        List<ElementProp> fProps = generateElementProp("from", fromList, definitions, Map.of());
        models.put("from", fProps);
        // expression
        JsonObject expression = getProperties(definitions, "org.apache.camel.model.language.ExpressionDefinition");
        List<ElementProp> eProps = generateElementProp("expression", expression, definitions, Map.of());
        models.put("expression", eProps);
        // processors
        JsonObject procList = getProperties(definitions, "org.apache.camel.model.ProcessorDefinition");
        // fill processors name + class
        Map<String, String> processors = new HashMap();
        procList.getMap().entrySet().stream()
                .filter(e -> !e.getKey().equals("step"))
                .collect(Collectors.toMap(
                        e -> e.getKey(),
                        e -> e.getValue()
                )).forEach((s, o) -> {
                    String name = camelize(s, "-");
                    String className = classNameFromRef(procList.getJsonObject(s).getString("$ref"));
                    processors.put(className, name);
                });
        procList.getMap().forEach((s, o) -> {
            String name = camelize(s, "-");
            String className = classNameFromRef(procList.getJsonObject(s).getString("$ref"));
            JsonObject props = getProperties(definitions, className);
            List<ElementProp> elProps = generateElementProp(name, props, definitions, processors);
            models.put(name, elProps);
        });

        // generate models code
        models.forEach((name, elementProps) -> {
            String pcode = generateElementCode(name, elementProps);
            camelModel.append(pcode).append(System.lineSeparator());
            camelModel.append(generateStepCode(name)).append(System.lineSeparator());
        });

        vertx.fileSystem().writeFileBlocking(targetModel, Buffer.buffer(camelModel.toString()));


        //  generate API
        StringBuilder camelApi = new StringBuilder();
        camelApi.append("import {");
        camelApi.append("    CamelElement, \n");
        camelApi.append("    ProcessorStep, \n");
        camelApi.append("    FromStep, \n");
        camelApi.append("    Expression, \n");
        processors.values().forEach(s -> camelApi.append("    ").append(s).append("Step, \n"));
        camelApi.append("} from '../model/CamelModel' \n\n");

        camelApi.append("export class CamelApi { \n\n");

        camelApi.append(
                "    static createStep = (name: string, body: any): CamelElement => {\n" +
                        "       switch (name){\n" +
                        "            case 'from': return CamelApi.createFrom(body)\n" +
                        "            case 'expression': return CamelApi.createExpression(body)\n" );
        processors.values().forEach(s ->
                camelApi.append("            case '").append(deCapitalize(s)).append("': return CamelApi.create").append(capitalize(s)).append("(body)\n"));
        camelApi.append("            default: return new ProcessorStep('') \n");
        camelApi.append("        }\n");
        camelApi.append("    }\n");


        camelApi.append(
                "    static createExpression = (element: any): Expression => {\n" +
                "        return new Expression({...element.expression})\n" +
                "    }\n");
        camelApi.append(createCreateFunction("from", models.get("from")));
        processors.values().forEach((model) -> camelApi.append(createCreateFunction(model, models.get(model))));


        camelApi.append(
                "    static createSteps = (elements: any[] | undefined): ProcessorStep[] => {\n" +
                        "        const result: ProcessorStep[] = []\n" +
                        "        if (elements !== undefined){\n" +
                        "            elements.forEach(e => {\n" +
                        "                const stepName = Object.keys(e)[0];\n" +
                        "                result.push(CamelApi.createStep(stepName, e));\n" +
                        "            })\n" +
                        "        }\n" +
                        "        return result\n" +
                        "    }\n");

        camelApi.append("}").append(System.lineSeparator());

        vertx.fileSystem().writeFileBlocking(targetApi, Buffer.buffer(camelApi.toString()));
    }

    private String createCreateFunction(String name, List<ElementProp> elProps) {
        String stepClass = capitalize(name).concat("Step");
        String stepField = deCapitalize(name).concat("Step");
        String elementName = deCapitalize(name);
        String funcName = "create".concat(capitalize(name));
        StringBuilder f = new StringBuilder();
        f.append(String.format("    static %s = (element: any): %s => {\n", funcName, stepClass));
        f.append(String.format("        const %s = new %s({...element.%s})\n", stepField, stepClass, elementName));
        elProps.stream().forEach(e ->{
            if (e.name.equals("steps")){
                f.append(String.format("        %s.%s.steps = CamelApi.createSteps(element?.%s?.steps)\n", stepField, elementName, elementName));
            } else if (e.isArray && e.isArrayTypeClass){
                f.append(String.format("        %s.%s.%s =  [...element?.%s?.%s].map(x => CamelApi.create%s(x))\n", stepField, elementName, e.name, elementName, e.name, e.arrayType));
            } else if (e.isObject){
                f.append(String.format("        %s.%s.%s = CamelApi.create%s(element?.%s?.%s)\n", stepField, elementName, e.name, e.type, elementName, e.name));
            }
        });
        f.append(String.format("        return %s\n", stepField));
        f.append("    }\n");
        return f.toString();
    }

    private String createCamelElements(Map<String, String> processors) {
        StringBuilder camelElements = new StringBuilder();
        camelElements.append("export const CamelElements: string[] = [").append(System.lineSeparator());
        camelElements.append("'").append("from").append("',").append(System.lineSeparator());
        camelElements.append("'").append("expression").append("',").append(System.lineSeparator());
        processors.values().stream().forEach(s -> {
            camelElements.append("'").append(deCapitalize(s)).append("',").append(System.lineSeparator());
        });
        camelElements.append("]").append(System.lineSeparator());
        return camelElements.toString();
    }

    private JsonObject getProperties(JsonObject definitions, String classname) {
        JsonObject props = definitions.getJsonObject(classname).getJsonObject("properties");
        JsonArray oneOf = definitions.getJsonObject(classname).getJsonArray("oneOf");
        if (props != null) {
            return props;
        } else {
            return oneOf.getJsonObject(1).getJsonObject("properties");
        }
    }

    private List<ElementProp> generateElementProp(String name, JsonObject properties, JsonObject definitions, Map<String, String> processors) {
        List<ElementProp> props = new ArrayList<>();
        Set<String> keys = new HashSet<>();
        properties.getMap().forEach((s, o) -> {
            String propName = deCapitalize(camelize(s, "-"));
            if (!keys.contains(propName) && !(name.equals("Choice") && propName.equals("steps"))) {
                String type = properties.getJsonObject(s).getString("type");
                String ref = properties.getJsonObject(s).getString("$ref");
                if (type != null) {
                    if (type.equals("array") && isArrayTypeIsClass(properties.getJsonObject(s))) {
                        String arrayTypeClass = getArrayTypeClass(properties.getJsonObject(s));
                        String arrayType = processors.get(arrayTypeClass);
                        if (arrayType != null) {
                            props.add(new ElementProp(propName, type, false, true, true, arrayType, false, getTypeCode(type, arrayType.concat("Step"))));
                        } else if (arrayTypeClass.equals("org.apache.camel.model.ProcessorDefinition")) {
                            props.add(new ElementProp(propName, type, false, true, true, arrayType, true, getTypeCode(type, "ProcessorStep")));
                        }
                    } else if (type.equals("array") && !isArrayTypeIsClass(properties.getJsonObject(s))) {
                        String arrayType = getArrayType(properties.getJsonObject(s));
                        props.add(new ElementProp(propName, type, false, true, false, arrayType, false, getTypeCode(type, arrayType)));
                    } else {
                        props.add(new ElementProp(propName, type, false, false, false, null, false, getTypeCode(type, null)));
                    }
                } else if (ref != null) {
                    String className = classNameFromRef(ref);
                    String processorName = processors.get(className);
                    if (processorName != null) {
                        props.add(new ElementProp(propName, processorName, true, false, false, null, false, capitalize(processorName)));
                    } else if (isClassOneOfString(className, definitions)) {
                        props.add(new ElementProp(propName, "string", false, false, false, null, false, "string"));
                    } else if ("org.apache.camel.model.language.ExpressionDefinition".equals(className)
                            || "org.apache.camel.model.ExpressionSubElementDefinition".equals(className)) {
                        props.add(new ElementProp(propName, "Expression", true, false, false, null, false, "Expression"));
                    }
                }
            }
            keys.add(propName);
        });
        return props;
    }

    private String generateStepCode(String name) {
        StringBuilder element = new StringBuilder();
        element.append("export class ").append(capitalize(name)).append("Step extends ProcessorStep {").append(System.lineSeparator());
        element.append(getTabs(1)).append(deCapitalize(name)).append(": ").append(capitalize(name)).append(" = new ").append(capitalize(name)).append("()").append(System.lineSeparator());
        element.append(System.lineSeparator());
        element.append(getTabs(1)).append("public constructor(init?: Partial<").append(capitalize(name)).append(">) {").append(System.lineSeparator());
        element.append(getTabs(2)).append("super('").append(deCapitalize(name)).append("Step')").append(System.lineSeparator());
        element.append(getTabs(2)).append("Object.assign(this, {").append(deCapitalize(name)).append(": new ").append(capitalize(name)).append("({...init})})").append(System.lineSeparator());
        element.append(getTabs(1)).append("}").append(System.lineSeparator());
        element.append("}").append(System.lineSeparator());
        return element.toString();
    }

    private String generateElementCode(String name, List<ElementProp> elementProps) {
        StringBuilder element = new StringBuilder();
        element.append("export class ").append(capitalize(name)).append(" extends CamelElement { \n");
        Set<String> keys = new HashSet<>();
        elementProps.forEach((e) -> {
            element.append(getTabs(1)).append(e.name).append("?: ").append(e.typeCode).append(System.lineSeparator());
            keys.add(e.name);
        });
        element.append("\n");
        element.append("    public constructor(init?: Partial<").append(capitalize(name)).append(">) { \n");
        element.append("        super('").append(deCapitalize(name)).append("')\n");
        element.append("        Object.assign(this, init)\n");
        element.append("    }\n");
        element.append("}");
        return element.toString();
    }


    private boolean isClassOneOfString(String classname, JsonObject definitions) {
        return definitions.getJsonObject(classname).containsKey("oneOf") && definitions.getJsonObject(classname).getJsonArray("oneOf").getJsonObject(0).getString("type").equals("string");
    }


    private String camelize(String name, String separator) {
        return Arrays.stream(name.split(separator)).map(s -> capitalize(s)).collect(Collectors.joining());
    }

    private String capitalize(String str) {
        return str.length() == 0 ? str
                : str.length() == 1 ? str.toUpperCase()
                : str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    private String deCapitalize(String str) {
        return str.length() == 0 ? str
                : str.length() == 1 ? str.toLowerCase()
                : str.substring(0, 1).toLowerCase() + str.substring(1);
    }

    private String getTabs(int n) {
        return IntStream.range(0, n).mapToObj(value -> "    ").collect(Collectors.joining());
    }

    private boolean isArrayTypeIsClass(JsonObject obj) {
        return obj.getJsonObject("items").containsKey("$ref");
    }

    private String getArrayTypeClass(JsonObject obj) {
        return classNameFromRef(obj.getJsonObject("items").getString("$ref"));
    }

    private String getArrayType(JsonObject obj) {
        return classNameFromRef(obj.getJsonObject("items").getString("type"));
    }

    private String classNameFromRef(String ref) {
        return ref.replace("#/items/definitions/", "");
    }

    private String getTypeCode(String type, String arrayClassName) {
        switch (type) {
            case "object":
                return "any";
            case "number":
                return "number";
            case "boolean":
                return "boolean";
            case "array":
                return arrayClassName + " [] = []";
            default:
                return "string";
        }
    }
}
