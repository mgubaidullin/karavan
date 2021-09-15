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
        g.run("src/main/resources/camel-yaml-dsl.json", "src/main/webapp/src/model/CamelModel.tsx");
    }

    private void run(String source, String target) throws Exception {
        Vertx vertx = Vertx.vertx();

        Buffer buffer = vertx.fileSystem().readFileBlocking(source);
        JsonObject definitions = new JsonObject(buffer).getJsonObject("items").getJsonObject("definitions");

        StringBuilder code = new StringBuilder();
        code.append("import {v4 as uuidv4} from 'uuid'").append(System.lineSeparator());
        code.append(System.lineSeparator());

        code.append("export class Element {").append(System.lineSeparator());
        code.append(getTabs(1)).append("uuid: string = ''").append(System.lineSeparator());
        code.append(getTabs(1)).append("dslName: string = ''").append(System.lineSeparator());
        code.append(getTabs(1)).append("constructor(dslName: string) {").append(System.lineSeparator());
        code.append(getTabs(2)).append("this.uuid = uuidv4()").append(System.lineSeparator());
        code.append(getTabs(2)).append("this.dslName = dslName").append(System.lineSeparator());
        code.append(getTabs(1)).append("}").append(System.lineSeparator());
        code.append("}").append(System.lineSeparator());
        code.append(System.lineSeparator());

        code.append("export class ProcessorStep extends Element {").append(System.lineSeparator());
        code.append("}").append(System.lineSeparator());
        code.append(System.lineSeparator());

        // from
        JsonObject fromList = getProperties(definitions, "org.apache.camel.dsl.yaml.deserializers.RouteFromDefinitionDeserializer");
        code.append(generateElementCode("from", fromList, definitions, Map.of())).append(System.lineSeparator());
        code.append(generateStepCode("from")).append(System.lineSeparator());

        // from
        JsonObject expression = getProperties(definitions, "org.apache.camel.model.language.ExpressionDefinition");
        code.append(generateElementCode("expression", expression, definitions, Map.of())).append(System.lineSeparator());

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
        // generate processors code
        procList.getMap().forEach((s, o) -> {
            String name = camelize(s, "-");
            String className = classNameFromRef(procList.getJsonObject(s).getString("$ref"));
            JsonObject props = getProperties(definitions, className);
            String pcode = generateElementCode(name, props, definitions, processors);
            code.append(pcode).append(System.lineSeparator());
            code.append(generateStepCode(name)).append(System.lineSeparator());
        });

        vertx.fileSystem().writeFileBlocking(target, Buffer.buffer(code.toString()));
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

    private String generateElementCode(String name, JsonObject properties, JsonObject definitions, Map<String, String> processors) {
        StringBuilder element = new StringBuilder();
        element.append("export class ").append(capitalize(name)).append(" extends Element {").append(System.lineSeparator());
        Set<String> keys = new HashSet<>();
        properties.getMap().forEach((s, o) -> {
            String propName = deCapitalize(camelize(s, "-"));
            if (!keys.contains(propName) && !(name.equals("Choice") && propName.equals("steps"))) {
                String type = properties.getJsonObject(s).getString("type");
                String ref = properties.getJsonObject(s).getString("$ref");
                if (type != null) {
                    if (type.equals("array") && isArrayTypeIsClass(properties.getJsonObject(s))) {
                        String arrayTypeClass =  getArrayTypeClass(properties.getJsonObject(s));
                        String arrayType = processors.get(arrayTypeClass);
                        if (arrayType != null) {
                            element.append(getTabs(1)).append(propName).append("?: ").append(getTypeCode(type, arrayType.concat("Step"))).append(System.lineSeparator());
                        } else if (arrayTypeClass.equals("org.apache.camel.model.ProcessorDefinition")){
                            element.append(getTabs(1)).append(propName).append("?: ").append(getTypeCode(type, "ProcessorStep")).append(System.lineSeparator());
                        }
                    } else if (type.equals("array") && !isArrayTypeIsClass(properties.getJsonObject(s))) {
                        String arrayType = getArrayType(properties.getJsonObject(s));
                        element.append(getTabs(1)).append(propName).append("?: ").append(getTypeCode(type, arrayType)).append(System.lineSeparator());
                    } else {
                        element.append(getTabs(1)).append(propName).append("?: ").append(getTypeCode(type, null)).append(System.lineSeparator());
                    }
                } else if (ref != null) {
                    String className = classNameFromRef(ref);
                    String processorName = processors.get(className);
                    if (processorName != null){
                        element.append(getTabs(1)).append(propName).append("?: ").append(capitalize(processorName)).append(System.lineSeparator());
                    } else if (isClassOneOfString(className, definitions)) {
                        element.append(getTabs(1)).append(propName).append("?: ").append("string").append(System.lineSeparator());
                    } else if ("org.apache.camel.model.language.ExpressionDefinition".equals(className)
                            || "org.apache.camel.model.ExpressionSubElementDefinition".equals(className)) {
                        element.append(getTabs(1)).append(propName).append("?: ").append("Expression").append(System.lineSeparator());
                    }
                }
            }
            keys.add(propName);
        });
        element.append(System.lineSeparator());
        element.append(getTabs(1)).append("public constructor(init?: Partial<").append(capitalize(name)).append(">) {").append(System.lineSeparator());
        element.append(getTabs(2)).append("super('").append(deCapitalize(name)).append("')").append(System.lineSeparator());
        element.append(getTabs(2)).append("Object.assign(this, init)").append(System.lineSeparator());
        element.append(getTabs(1)).append("}").append(System.lineSeparator());
        element.append("}").append(System.lineSeparator());
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
