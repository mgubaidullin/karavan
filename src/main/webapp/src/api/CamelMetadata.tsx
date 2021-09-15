export class ElementMeta {
    name: string = ''
    title: string = ''
    description: string = ''
    labels: string = ''
    properties: PropertyMeta[] = []


    constructor(name: string, title: string, description: string, labels: string, properties: PropertyMeta[]) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.labels = labels;
        this.properties = properties;
    }
}

export class PropertyMeta {
    name: string = ''
    kind: string = ''
    displayName: string = ''
    description: string = ''
    type: string = ''
    enumVals: string = ''
    required: boolean = false
    secret: boolean = false


    constructor(name: string, kind: string, displayName: string, description: string, type: string, enumVals: string, required: boolean, secret: boolean) {
        this.name = name;
        this.kind = kind;
        this.displayName = displayName;
        this.description = description;
        this.type = type;
        this.enumVals = enumVals;
        this.required = required;
        this.secret = secret;
    }
}

export class CamelMetadataApi {

    static getElementMeta = (name: string): ElementMeta | undefined => {
       return Metadata.find(value => value.name === name);
    }
}
const Metadata: ElementMeta[] = [
    new ElementMeta('policy', 'Policy', 'Defines a policy the route will use', 'null', [
        new PropertyMeta('ref', 'attribute', 'Ref', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('throwException', 'Throw Exception', 'Throws an exception', 'null', [
        new PropertyMeta('ref', 'attribute', 'Ref', 'null', 'string', '', false, false),
        new PropertyMeta('message', 'attribute', 'Message', 'null', 'string', '', false, false),
        new PropertyMeta('exceptionType', 'attribute', 'Exception Type', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('choice', 'Choice', 'Routes messages based on a series of predicates', 'null', [
        new PropertyMeta('whenClauses', 'element', 'When Clauses', 'null', 'array', '', false, false),
        new PropertyMeta('otherwise', 'element', 'Otherwise', 'null', 'object', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('pollEnrich', 'Poll Enrich', 'Enriches messages with data polled from a secondary resource', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('timeout', 'attribute', 'Timeout', 'null', 'duration', '', false, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodAllowNull', 'attribute', 'Strategy Method Allow Null', 'null', 'boolean', '', false, false),
        new PropertyMeta('aggregateOnException', 'attribute', 'Aggregate On Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoint', 'attribute', 'Ignore Invalid Endpoint', 'null', 'integer', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('setBody', 'Set Body', 'Sets the contents of the message body', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('stop', 'Stop', 'Stops the processing of the current message', 'null', [
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('toD', 'To D', 'Sends the message to a dynamic endpoint You can specify multiple languages in the uri separated by the plus sign, such as mock:language:xpath:/order/uri where mock: would be a prefix to a xpath expression. For more dynamic behavior use Recipient List or Dynamic Router EIP instead.', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'enum', '[InOnly, InOptionalOut, InOut]', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoint', 'attribute', 'Ignore Invalid Endpoint', 'null', 'boolean', '', false, false),
        new PropertyMeta('allowOptimisedComponents', 'attribute', 'Allow Optimised Components', 'null', 'boolean', '', false, false),
        new PropertyMeta('autoStartComponents', 'attribute', 'Auto Start Components', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('process', 'Process', 'Calls a Camel processor', 'null', [
        new PropertyMeta('ref', 'attribute', 'Ref', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('removeHeaders', 'Remove Headers', 'Removes message headers whose name matches a specified pattern', 'null', [
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'string', '', true, false),
        new PropertyMeta('excludePattern', 'attribute', 'Exclude Pattern', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('delay', 'Delay', 'Delays processing for a specified length of time', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('asyncDelayed', 'attribute', 'Async Delayed', 'null', 'boolean', '', false, false),
        new PropertyMeta('callerRunsWhenRejected', 'attribute', 'Caller Runs When Rejected', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('throttle', 'Throttle', 'Controls the rate at which messages are passed to the next node in the route', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('correlationExpression', 'expression', 'Correlation Expression', 'null', 'object', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('timePeriodMillis', 'attribute', 'Time Period Millis', 'null', 'duration', '', false, false),
        new PropertyMeta('asyncDelayed', 'attribute', 'Async Delayed', 'null', 'boolean', '', false, false),
        new PropertyMeta('callerRunsWhenRejected', 'attribute', 'Caller Runs When Rejected', 'null', 'boolean', '', false, false),
        new PropertyMeta('rejectExecution', 'attribute', 'Reject Execution', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('otherwise', 'Otherwise', 'Route to be executed when all other choices evaluate to false', 'null', [
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('removeProperty', 'Remove Property', 'Removes a named property from the message exchange', 'null', [
        new PropertyMeta('propertyName', 'attribute', 'Property Name', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('validate', 'Validate', 'Validates a message based on an expression', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('sort', 'Sort', 'Sorts the contents of the message', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('comparatorRef', 'attribute', 'Comparator Ref', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('from', 'From', 'Act as a message source as input to a route', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('to', 'To', 'Sends the message to a static endpoint', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'enum', '[InOnly, InOptionalOut, InOut]', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('setHeader', 'Set Header', 'Sets the value of a message header', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('name', 'attribute', 'Name', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('onCompletion', 'On Completion', 'Route to be executed when normal route processing completes', 'null', [
        new PropertyMeta('mode', 'attribute', 'Mode', 'null', 'enum', '[AfterConsumer, BeforeConsumer]', false, false),
        new PropertyMeta('onCompleteOnly', 'attribute', 'On Complete Only', 'null', 'boolean', '', false, false),
        new PropertyMeta('onFailureOnly', 'attribute', 'On Failure Only', 'null', 'boolean', '', false, false),
        new PropertyMeta('onWhen', 'element', 'On When', 'null', 'object', '', false, false),
        new PropertyMeta('parallelProcessing', 'attribute', 'Parallel Processing', 'null', 'boolean', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('useOriginalMessage', 'attribute', 'Use Original Message', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('removeHeader', 'Remove Header', 'Removes a named header from the message', 'null', [
        new PropertyMeta('name', 'attribute', 'Name', 'null', 'string', '', false, false),
        new PropertyMeta('headerName', 'attribute', 'Header Name', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('script', 'Script', 'Executes a script from a language which does not change the message body.', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('enrich', 'Enrich', 'Enriches a message with data from a secondary resource', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodAllowNull', 'attribute', 'Strategy Method Allow Null', 'null', 'string', '', false, false),
        new PropertyMeta('aggregateOnException', 'attribute', 'Aggregate On Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('shareUnitOfWork', 'attribute', 'Share Unit Of Work', 'null', 'boolean', '', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoint', 'attribute', 'Ignore Invalid Endpoint', 'null', 'boolean', '', false, false),
        new PropertyMeta('allowOptimisedComponents', 'attribute', 'Allow Optimised Components', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('log', 'Log', 'Logs the defined message to the logger', 'null', [
        new PropertyMeta('message', 'attribute', 'Message', 'null', 'string', '', true, false),
        new PropertyMeta('loggingLevel', 'attribute', 'Logging Level', 'null', 'enum', '[DEBUG, ERROR, INFO, OFF, TRACE, WARN]', false, false),
        new PropertyMeta('logName', 'attribute', 'Log Name', 'null', 'string', '', false, false),
        new PropertyMeta('marker', 'attribute', 'Marker', 'null', 'string', '', false, false),
        new PropertyMeta('loggerRef', 'attribute', 'Logger Ref', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('removeProperties', 'Remove Properties', 'Removes message exchange properties whose name matches a specified pattern', 'null', [
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'string', '', true, false),
        new PropertyMeta('excludePattern', 'attribute', 'Exclude Pattern', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('marshal', 'Marshal', 'Marshals data into a specified format for transmission over a transport or component', 'null', [
        new PropertyMeta('dataFormatType', 'element', 'Data Format Type', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('split', 'Split', 'Splits a single message into many sub-messages.', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('delimiter', 'attribute', 'Delimiter', 'null', 'string', '', false, false),
        new PropertyMeta('parallelProcessing', 'attribute', 'Parallel Processing', 'null', 'boolean', '', false, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodAllowNull', 'attribute', 'Strategy Method Allow Null', 'null', 'boolean', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('streaming', 'attribute', 'Streaming', 'null', 'boolean', '', false, false),
        new PropertyMeta('stopOnException', 'attribute', 'Stop On Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('timeout', 'attribute', 'Timeout', 'null', 'duration', '', false, false),
        new PropertyMeta('onPrepareRef', 'attribute', 'On Prepare Ref', 'null', 'string', '', false, false),
        new PropertyMeta('shareUnitOfWork', 'attribute', 'Share Unit Of Work', 'null', 'boolean', '', false, false),
        new PropertyMeta('parallelAggregate', 'attribute', 'Parallel Aggregate', 'null', 'boolean', '', false, false),
        new PropertyMeta('stopOnAggregateException', 'attribute', 'Stop On Aggregate Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('transacted', 'Transacted', 'Enables transaction on the route', 'null', [
        new PropertyMeta('ref', 'attribute', 'Ref', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('interceptFrom', 'Intercept From', 'Intercepts incoming messages', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('doCatch', 'Do Catch', 'Catches exceptions as part of a try, catch, finally block', 'null', [
        new PropertyMeta('exception', 'element', 'Exception', 'null', 'array', '', false, false),
        new PropertyMeta('onWhen', 'element', 'On When', 'null', 'object', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('circuitBreaker', 'Circuit Breaker', 'null', 'null', [
        new PropertyMeta('hystrixConfiguration', 'element', 'Hystrix Configuration', 'null', 'object', '', false, false),
        new PropertyMeta('resilience4jConfiguration', 'element', 'Resilience4j Configuration', 'null', 'object', '', false, false),
        new PropertyMeta('faultToleranceConfiguration', 'element', 'Fault Tolerance Configuration', 'null', 'object', '', false, false),
        new PropertyMeta('configurationRef', 'attribute', 'Configuration Ref', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('convertBodyTo', 'Convert Body To', 'Converts the message body to another type', 'null', [
        new PropertyMeta('type', 'attribute', 'Type', 'null', 'string', '', true, false),
        new PropertyMeta('charset', 'attribute', 'Charset', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('intercept', 'Intercept', 'Intercepts a message at each step in the route', 'null', [
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('unmarshal', 'Unmarshal', 'Converts the message data received from the wire into a format that Apache Camel processors can consume', 'null', [
        new PropertyMeta('dataFormatType', 'element', 'Data Format Type', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('onFallback', 'On Fallback', 'Route to be executed when Hystrix EIP executes fallback', 'null', [
        new PropertyMeta('fallbackViaNetwork', 'attribute', 'Fallback Via Network', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('setExchangePattern', 'Set Exchange Pattern', 'Sets the exchange pattern on the message exchange', 'null', [
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'enum', '[InOnly, InOptionalOut, InOut]', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('recipientList', 'Recipient List', 'Routes messages to a number of dynamically specified recipients (dynamic to)', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('delimiter', 'attribute', 'Delimiter', 'null', 'string', '', false, false),
        new PropertyMeta('parallelProcessing', 'attribute', 'Parallel Processing', 'null', 'boolean', '', false, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodAllowNull', 'attribute', 'Strategy Method Allow Null', 'null', 'boolean', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('stopOnException', 'attribute', 'Stop On Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoints', 'attribute', 'Ignore Invalid Endpoints', 'null', 'boolean', '', false, false),
        new PropertyMeta('streaming', 'attribute', 'Streaming', 'null', 'boolean', '', false, false),
        new PropertyMeta('timeout', 'attribute', 'Timeout', 'null', 'duration', '', false, false),
        new PropertyMeta('onPrepareRef', 'attribute', 'On Prepare Ref', 'null', 'string', '', false, false),
        new PropertyMeta('shareUnitOfWork', 'attribute', 'Share Unit Of Work', 'null', 'boolean', '', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('parallelAggregate', 'attribute', 'Parallel Aggregate', 'null', 'boolean', '', false, false),
        new PropertyMeta('stopOnAggregateException', 'attribute', 'Stop On Aggregate Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('bean', 'Bean', 'Calls a Java bean', 'null', [
        new PropertyMeta('ref', 'attribute', 'Ref', 'null', 'string', '', false, false),
        new PropertyMeta('method', 'attribute', 'Method', 'null', 'string', '', false, false),
        new PropertyMeta('beanType', 'attribute', 'Bean Type', 'null', 'string', '', false, false),
        new PropertyMeta('cache', 'attribute', 'Cache', 'null', 'boolean', '', false, false),
        new PropertyMeta('scope', 'attribute', 'Scope', 'null', 'enum', '[Prototype, Request, Singleton]', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('multicast', 'Multicast', 'Routes the same message to multiple paths either sequentially or in parallel.', 'null', [
        new PropertyMeta('parallelProcessing', 'attribute', 'Parallel Processing', 'null', 'boolean', '', false, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodAllowNull', 'attribute', 'Strategy Method Allow Null', 'null', 'boolean', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('streaming', 'attribute', 'Streaming', 'null', 'boolean', '', false, false),
        new PropertyMeta('stopOnException', 'attribute', 'Stop On Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('timeout', 'attribute', 'Timeout', 'null', 'duration', '', false, false),
        new PropertyMeta('onPrepareRef', 'attribute', 'On Prepare Ref', 'null', 'string', '', false, false),
        new PropertyMeta('shareUnitOfWork', 'attribute', 'Share Unit Of Work', 'null', 'boolean', '', false, false),
        new PropertyMeta('parallelAggregate', 'attribute', 'Parallel Aggregate', 'null', 'boolean', '', false, false),
        new PropertyMeta('stopOnAggregateException', 'attribute', 'Stop On Aggregate Exception', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('inOnly', 'In Only', 'Marks the exchange pattern for the route to one way', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('loadBalance', 'Load Balance', 'Balances message processing among a number of nodes', 'null', [
        new PropertyMeta('loadBalancerType', 'element', 'Load Balancer Type', 'null', 'object', '', true, false),
        new PropertyMeta('inheritErrorHandler', 'attribute', 'Inherit Error Handler', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('routingSlip', 'Routing Slip', 'Routes a message through a series of steps that are pre-determined (the slip)', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('uriDelimiter', 'attribute', 'Uri Delimiter', 'null', 'string', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoints', 'attribute', 'Ignore Invalid Endpoints', 'null', 'boolean', '', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('rollback', 'Rollback', 'Forces a rollback by stopping routing the message', 'null', [
        new PropertyMeta('markRollbackOnly', 'attribute', 'Mark Rollback Only', 'null', 'boolean', '', false, false),
        new PropertyMeta('markRollbackOnlyLast', 'attribute', 'Mark Rollback Only Last', 'null', 'boolean', '', false, false),
        new PropertyMeta('message', 'attribute', 'Message', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('whenSkipSendToEndpoint', 'When Skip Send To Endpoint', 'Predicate to determine if the message should be sent or not to the endpoint, when using interceptSentToEndpoint.', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('wireTap', 'Wire Tap', 'Routes a copy of a message (or creates a new message) to a secondary destination while continue routing the original message.', 'null', [
        new PropertyMeta('processorRef', 'attribute', 'Processor Ref', 'null', 'string', '', false, false),
        new PropertyMeta('body', 'expression', 'Body', 'null', 'object', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('copy', 'attribute', 'Copy', 'null', 'boolean', '', false, false),
        new PropertyMeta('dynamicUri', 'attribute', 'Dynamic Uri', 'null', 'boolean', '', false, false),
        new PropertyMeta('onPrepareRef', 'attribute', 'On Prepare Ref', 'null', 'string', '', false, false),
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'enum', '[InOnly, InOptionalOut, InOut]', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoint', 'attribute', 'Ignore Invalid Endpoint', 'null', 'boolean', '', false, false),
        new PropertyMeta('allowOptimisedComponents', 'attribute', 'Allow Optimised Components', 'null', 'boolean', '', false, false),
        new PropertyMeta('autoStartComponents', 'attribute', 'Auto Start Components', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('loop', 'Loop', 'Processes a message multiple times', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('copy', 'attribute', 'Copy', 'null', 'boolean', '', false, false),
        new PropertyMeta('doWhile', 'attribute', 'Do While', 'null', 'boolean', '', false, false),
        new PropertyMeta('breakOnShutdown', 'attribute', 'Break On Shutdown', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('interceptSendToEndpoint', 'Intercept Send To Endpoint', 'Intercepts messages being sent to an endpoint', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('skipSendToOriginalEndpoint', 'attribute', 'Skip Send To Original Endpoint', 'null', 'string', '', false, false),
        new PropertyMeta('afterUri', 'attribute', 'After Uri', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('doTry', 'Do Try', 'Marks the beginning of a try, catch, finally block', 'null', [
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('resequence', 'Resequence', 'Resequences (re-order) messages based on an expression', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('resequencerConfig', 'element', 'Resequencer Config', 'null', 'object', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('expression', 'Expression', 'A useful base class for an expression', 'null', [
        new PropertyMeta('expression', 'value', 'Expression', 'null', 'string', '', true, false),
        new PropertyMeta('trim', 'attribute', 'Trim', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
    ]),
    new ElementMeta('serviceCall', 'Service Call', 'To call remote services', 'null', [
        new PropertyMeta('expression', 'element', 'Expression', 'null', 'object', '', false, false),
        new PropertyMeta('name', 'attribute', 'Name', 'null', 'string', '', true, false),
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', false, false),
        new PropertyMeta('component', 'attribute', 'Component', 'null', 'string', '', false, false),
        new PropertyMeta('pattern', 'attribute', 'Pattern', 'null', 'enum', '[InOnly, InOptionalOut, InOut]', false, false),
        new PropertyMeta('configurationRef', 'attribute', 'Configuration Ref', 'null', 'string', '', false, false),
        new PropertyMeta('serviceDiscoveryRef', 'attribute', 'Service Discovery Ref', 'null', 'string', '', false, false),
        new PropertyMeta('serviceFilterRef', 'attribute', 'Service Filter Ref', 'null', 'string', '', false, false),
        new PropertyMeta('serviceChooserRef', 'attribute', 'Service Chooser Ref', 'null', 'string', '', false, false),
        new PropertyMeta('loadBalancerRef', 'attribute', 'Load Balancer Ref', 'null', 'string', '', false, false),
        new PropertyMeta('expressionRef', 'attribute', 'Expression Ref', 'null', 'string', '', false, false),
        new PropertyMeta('serviceDiscoveryConfiguration', 'element', 'Service Discovery Configuration', 'null', 'object', '', true, false),
        new PropertyMeta('serviceFilterConfiguration', 'element', 'Service Filter Configuration', 'null', 'object', '', true, false),
        new PropertyMeta('loadBalancerConfiguration', 'element', 'Load Balancer Configuration', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('sample', 'Sample', 'Extract a sample of the messages passing through a route', 'null', [
        new PropertyMeta('samplePeriod', 'attribute', 'Sample Period', 'null', 'duration', '', false, false),
        new PropertyMeta('messageFrequency', 'attribute', 'Message Frequency', 'null', 'integer', '', false, false),
        new PropertyMeta('units', 'attribute', 'Units', 'null', 'enum', '[DAYS, HOURS, MICROSECONDS, MILLISECONDS, MINUTES, NANOSECONDS, SECONDS]', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('dynamicRouter', 'Dynamic Router', 'Routes messages based on dynamic rules', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('uriDelimiter', 'attribute', 'Uri Delimiter', 'null', 'string', '', false, false),
        new PropertyMeta('ignoreInvalidEndpoints', 'attribute', 'Ignore Invalid Endpoints', 'null', 'string', '', false, false),
        new PropertyMeta('cacheSize', 'attribute', 'Cache Size', 'null', 'integer', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('pipeline', 'Pipeline', 'Routes the message to a sequence of processors.', 'null', [
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('saga', 'Saga', 'Enables sagas on the route', 'null', [
        new PropertyMeta('propagation', 'attribute', 'Propagation', 'null', 'enum', '[MANDATORY, NEVER, NOT_SUPPORTED, REQUIRED, REQUIRES_NEW, SUPPORTS]', false, false),
        new PropertyMeta('completionMode', 'attribute', 'Completion Mode', 'null', 'enum', '[AUTO, MANUAL]', false, false),
        new PropertyMeta('timeoutInMilliseconds', 'attribute', 'Timeout In Milliseconds', 'null', 'integer', '', false, false),
        new PropertyMeta('timeout', 'attribute', 'Timeout', 'null', 'duration', '', false, false),
        new PropertyMeta('compensation', 'element', 'Compensation', 'null', 'object', '', false, false),
        new PropertyMeta('completion', 'element', 'Completion', 'null', 'object', '', false, false),
        new PropertyMeta('option', 'element', 'Option', 'null', 'array', '', false, false),
        new PropertyMeta('sagaServiceRef', 'attribute', 'Saga Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('threads', 'Threads', 'Specifies that all steps after this node are processed asynchronously', 'null', [
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('poolSize', 'attribute', 'Pool Size', 'null', 'integer', '', false, false),
        new PropertyMeta('maxPoolSize', 'attribute', 'Max Pool Size', 'null', 'integer', '', false, false),
        new PropertyMeta('keepAliveTime', 'attribute', 'Keep Alive Time', 'null', 'integer', '', false, false),
        new PropertyMeta('timeUnit', 'attribute', 'Time Unit', 'null', 'enum', '[DAYS, HOURS, MICROSECONDS, MILLISECONDS, MINUTES, NANOSECONDS, SECONDS]', false, false),
        new PropertyMeta('maxQueueSize', 'attribute', 'Max Queue Size', 'null', 'integer', '', false, false),
        new PropertyMeta('allowCoreThreadTimeOut', 'attribute', 'Allow Core Thread Time Out', 'null', 'boolean', '', false, false),
        new PropertyMeta('threadName', 'attribute', 'Thread Name', 'null', 'string', '', false, false),
        new PropertyMeta('rejectedPolicy', 'attribute', 'Rejected Policy', 'null', 'enum', '[Abort, CallerRuns, Discard, DiscardOldest]', false, false),
        new PropertyMeta('callerRunsWhenRejected', 'attribute', 'Caller Runs When Rejected', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('when', 'When', 'Triggers a route when an expression evaluates to true', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('claimCheck', 'Claim Check', 'The Claim Check EIP allows you to replace message content with a claim check (a unique key), which can be used to retrieve the message content at a later time.', 'null', [
        new PropertyMeta('operation', 'attribute', 'Operation', 'null', 'enum', '[Get, GetAndRemove, Pop, Push, Set]', false, false),
        new PropertyMeta('key', 'attribute', 'Key', 'null', 'string', '', false, false),
        new PropertyMeta('filter', 'attribute', 'Filter', 'null', 'string', '', false, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('doFinally', 'Do Finally', 'Path traversed when a try, catch, finally block exits', 'null', [
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('filter', 'Filter', 'Filter out messages based using a predicate', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('aggregate', 'Aggregate', 'Aggregates many messages into a single message', 'null', [
        new PropertyMeta('correlationExpression', 'expression', 'Correlation Expression', 'null', 'object', '', true, false),
        new PropertyMeta('completionPredicate', 'expression', 'Completion Predicate', 'null', 'object', '', false, false),
        new PropertyMeta('completionTimeoutExpression', 'expression', 'Completion Timeout Expression', 'null', 'object', '', false, false),
        new PropertyMeta('completionSizeExpression', 'expression', 'Completion Size Expression', 'null', 'object', '', false, false),
        new PropertyMeta('optimisticLockRetryPolicy', 'element', 'Optimistic Lock Retry Policy', 'null', 'object', '', false, false),
        new PropertyMeta('parallelProcessing', 'attribute', 'Parallel Processing', 'null', 'boolean', '', false, false),
        new PropertyMeta('optimisticLocking', 'attribute', 'Optimistic Locking', 'null', 'boolean', '', false, false),
        new PropertyMeta('executorServiceRef', 'attribute', 'Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('timeoutCheckerExecutorServiceRef', 'attribute', 'Timeout Checker Executor Service Ref', 'null', 'string', '', false, false),
        new PropertyMeta('aggregationRepositoryRef', 'attribute', 'Aggregation Repository Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyRef', 'attribute', 'Strategy Ref', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodName', 'attribute', 'Strategy Method Name', 'null', 'string', '', false, false),
        new PropertyMeta('strategyMethodAllowNull', 'attribute', 'Strategy Method Allow Null', 'null', 'boolean', '', false, false),
        new PropertyMeta('completionSize', 'attribute', 'Completion Size', 'null', 'integer', '', false, false),
        new PropertyMeta('completionInterval', 'attribute', 'Completion Interval', 'null', 'duration', '', false, false),
        new PropertyMeta('completionTimeout', 'attribute', 'Completion Timeout', 'null', 'duration', '', false, false),
        new PropertyMeta('completionTimeoutCheckerInterval', 'attribute', 'Completion Timeout Checker Interval', 'null', 'duration', '', false, false),
        new PropertyMeta('completionFromBatchConsumer', 'attribute', 'Completion From Batch Consumer', 'null', 'boolean', '', false, false),
        new PropertyMeta('completionOnNewCorrelationGroup', 'attribute', 'Completion On New Correlation Group', 'null', 'boolean', '', false, false),
        new PropertyMeta('eagerCheckCompletion', 'attribute', 'Eager Check Completion', 'null', 'boolean', '', false, false),
        new PropertyMeta('ignoreInvalidCorrelationKeys', 'attribute', 'Ignore Invalid Correlation Keys', 'null', 'boolean', '', false, false),
        new PropertyMeta('closeCorrelationKeyOnCompletion', 'attribute', 'Close Correlation Key On Completion', 'null', 'integer', '', false, false),
        new PropertyMeta('discardOnCompletionTimeout', 'attribute', 'Discard On Completion Timeout', 'null', 'boolean', '', false, false),
        new PropertyMeta('discardOnAggregationFailure', 'attribute', 'Discard On Aggregation Failure', 'null', 'boolean', '', false, false),
        new PropertyMeta('forceCompletionOnStop', 'attribute', 'Force Completion On Stop', 'null', 'boolean', '', false, false),
        new PropertyMeta('completeAllOnStop', 'attribute', 'Complete All On Stop', 'null', 'boolean', '', false, false),
        new PropertyMeta('aggregateControllerRef', 'attribute', 'Aggregate Controller Ref', 'null', 'string', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('transform', 'Transform', 'Transforms the message body based on an expression', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('idempotentConsumer', 'Idempotent Consumer', 'Filters out duplicate messages', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('messageIdRepositoryRef', 'attribute', 'Message Id Repository Ref', 'null', 'string', '', true, false),
        new PropertyMeta('eager', 'attribute', 'Eager', 'null', 'boolean', '', false, false),
        new PropertyMeta('completionEager', 'attribute', 'Completion Eager', 'null', 'string', '', false, false),
        new PropertyMeta('skipDuplicate', 'attribute', 'Skip Duplicate', 'null', 'boolean', '', false, false),
        new PropertyMeta('removeOnFailure', 'attribute', 'Remove On Failure', 'null', 'boolean', '', false, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('setProperty', 'Set Property', 'Sets a named property on the message exchange', 'null', [
        new PropertyMeta('expression', 'expression', 'Expression', 'null', 'object', '', true, false),
        new PropertyMeta('name', 'attribute', 'Name', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
    new ElementMeta('inOut', 'In Out', 'Marks the exchange pattern for the route to request/reply', 'null', [
        new PropertyMeta('uri', 'attribute', 'Uri', 'null', 'string', '', true, false),
        new PropertyMeta('id', 'attribute', 'Id', 'null', 'string', '', false, false),
        new PropertyMeta('description', 'element', 'Description', 'null', 'object', '', false, false),
    ]),
]
