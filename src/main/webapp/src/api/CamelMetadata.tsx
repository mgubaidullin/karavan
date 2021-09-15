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
    displayName: string = ''
    description: string = ''
    type: string = ''
    enumVals: string = ''
    required: boolean = false
    secret: boolean = false
    isArray: boolean = false
    isObject: boolean = false


    constructor(name: string, displayName: string, description: string, type: string, enumVals: string, required: boolean, secret: boolean, isArray: boolean, isObject: boolean) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.type = type;
        this.enumVals = enumVals;
        this.required = required;
        this.secret = secret;
        this.isArray = isArray;
        this.isObject = isObject;
    }
}

export class CamelMetadataApi {

    static getElementMeta = (name: string): ElementMeta | undefined => {
       return Metadata.find(value => value.name === name);
    }

    static getLanguage = (name: string): [string, string, string] | undefined => {
        return Languages.find(value => value[0] === name);
    }
}
export const Languages: [string, string, string][] = [
    ['constant','Constant',"A fixed value set only once during the route startup."],
    ['csimple','CSimple',"Evaluate a compile simple expression language."],
    ['datasonnet','DataSonnet',"To use DataSonnet scripts in Camel expressions or predicates."],
    ['exchangeProperty','ExchangeProperty',"Get the value of named Camel Exchange property."],
    ['groovy','Groovy',"Evaluate a Groovy script."],
    ['header','Header',"Get the value of the named Camel Message header."],
    ['hl7terser','HL7 Terser',"Get the value of an HL7 message field specified by terse location specification syntax."],
    ['joor','jOOR',"Evaluate a jOOR (Java compiled once at runtime) expression language."],
    ['jsonpath','JsonPath',"Evaluate a JsonPath expression against a JSON message body."],
    ['language','Language',"Evaluate the given expression using the specified language."],
    ['method','Bean method',"Call a method of the specified Java bean passing the Exchange, Body or specific headers to it."],
    ['mvel','MVEL',"Evaluate an MVEL template against the Camel Exchange."],
    ['ognl','OGNL',"Evaluate an Apache Commons Object Graph Navigation Library (OGNL) expression against the Camel Exchange."],
    ['ref','Ref',"Look up an expression in the Camel Registry and evaluate it."],
    ['simple','Simple',"Evaluate Camel's built-in Simple language expression against the Camel Exchange."],
    ['spel','SpEL',"Evaluate a Spring Expression Language (SpEL) expression against the Camel Exchange."],
    ['tokenize','Tokenize',"Tokenize text payloads using the specified delimiter patterns."],
    ['xpath','XPath',"Evaluate an XPath expression against an XML payload."],
    ['xquery','XQuery',"Evaluate an XQuery expressions against an XML payload."],
    ['xtokenize','XML Tokenize',"Tokenize XML payloads using the specified path expression."],
]
export const Metadata: ElementMeta[] = [
    new ElementMeta('policy', 'Policy', 'Defines a policy the route will use', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('ref', 'Ref', "Sets a reference to use for lookup the policy in the registry.", 'string', '', true, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('throwException', 'Throw Exception', 'Throws an exception', 'null', [
        new PropertyMeta('exceptionType', 'Exception Type', "The class of the exception to create using the message.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('message', 'Message', "To create a new exception instance and use the given message as caused message (supports simple language)", 'string', '', false, false, false, false),
        new PropertyMeta('ref', 'Ref', "Reference to the exception instance to lookup from the registry to throw", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('choice', 'Choice', 'Routes messages based on a series of predicates', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('otherwise', 'Otherwise', "Sets the otherwise node", 'Otherwise', '', false, false, false, true),
        new PropertyMeta('when', 'when', "when", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('pollEnrich', 'Poll Enrich', 'Enriches messages with data polled from a secondary resource', 'null', [
        new PropertyMeta('aggregateOnException', 'Aggregate On Exception', "If this option is false then the aggregate method is not used if there was an exception thrown while trying to retrieve the data to enrich from the resource. Setting this option to true allows end users to control what to do if there was an exception in the aggregate method. For example to suppress the exception or set a custom message body etc.", 'boolean', '', false, false, false, false),
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ConsumerCache which is used to cache and reuse consumers when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression that computes the endpoint uri to use as the resource endpoint to enrich from", 'Expression', '', true, false, false, true),
        new PropertyMeta('ignoreInvalidEndpoint', 'Ignore Invalid Endpoint', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'number', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodAllowNull', 'Strategy Method Allow Null', "If this option is false then the aggregate method is not used if there was no data to enrich. If this option is true then null values is used as the oldExchange (when no data to enrich), when using POJOs as the AggregationStrategy.", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "Refers to an AggregationStrategy to be used to merge the reply from the external service, into a single outgoing message. By default Camel will use the reply from the external service as outgoing message.", 'string', '', false, false, false, false),
        new PropertyMeta('timeout', 'Timeout', "Timeout in millis when polling from the external service. The timeout has influence about the poll enrich behavior. It basically operations in three different modes: negative value - Waits until a message is available and then returns it. Warning that this method could block indefinitely if no messages are available. 0 - Attempts to receive a message exchange immediately without waiting and returning null if a message exchange is not available yet. positive value - Attempts to receive a message exchange, waiting up to the given timeout to expire if a message is not yet available. Returns null if timed out The default value is -1 and therefore the method could block indefinitely, and therefore its recommended to use a timeout value", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('setBody', 'Set Body', 'Sets the contents of the message body', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression that returns the new body to use", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('stop', 'Stop', 'Stops the processing of the current message', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('toD', 'To D', 'Sends the message to a dynamic endpoint You can specify multiple languages in the uri separated by the plus sign, such as mock:language:xpath:/order/uri where mock: would be a prefix to a xpath expression. For more dynamic behavior use Recipient List or Dynamic Router EIP instead.', 'null', [
        new PropertyMeta('allowOptimisedComponents', 'Allow Optimised Components', "Whether to allow components to optimise toD if they are org.apache.camel.spi.SendDynamicAware .", 'boolean', '', false, false, false, false),
        new PropertyMeta('autoStartComponents', 'Auto Start Components', "Whether to auto startup components when toD is starting up.", 'boolean', '', false, false, false, false),
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ProducerCache which is used to cache and reuse producers when using this recipient list, when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('ignoreInvalidEndpoint', 'Ignore Invalid Endpoint', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('parameters', 'parameters', "parameters", 'object', '', false, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Sets the optional ExchangePattern used to invoke this endpoint", 'string', 'InOnly, InOptionalOut, InOut', false, false, false, false),
        new PropertyMeta('uri', 'Uri', "The uri of the endpoint to send to. The uri can be dynamic computed using the org.apache.camel.language.simple.SimpleLanguage expression.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('process', 'Process', 'Calls a Camel processor', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('ref', 'Ref', "Reference to the Processor to lookup in the registry to use.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('removeHeaders', 'Remove Headers', 'Removes message headers whose name matches a specified pattern', 'null', [
        new PropertyMeta('excludePattern', 'Exclude Pattern', "Name or patter of headers to not remove. The pattern is matched in the following order: 1 = exact match 2 = wildcard (pattern ends with a and the name starts with the pattern) 3 = regular expression (all of above is case in-sensitive).", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Name or pattern of headers to remove. The pattern is matched in the following order: 1 = exact match 2 = wildcard (pattern ends with a and the name starts with the pattern) 3 = regular expression (all of above is case in-sensitive).", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('delay', 'Delay', 'Delays processing for a specified length of time', 'null', [
        new PropertyMeta('asyncDelayed', 'Async Delayed', "Enables asynchronous delay which means the thread will not block while delaying.", 'boolean', '', false, false, false, false),
        new PropertyMeta('callerRunsWhenRejected', 'Caller Runs When Rejected', "Whether or not the caller should run the task when it was rejected by the thread pool. Is by default true", 'boolean', '', false, false, false, false),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "Refers to a custom Thread Pool if asyncDelay has been enabled.", 'string', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression to define how long time to wait (in millis)", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('throttle', 'Throttle', 'Controls the rate at which messages are passed to the next node in the route', 'null', [
        new PropertyMeta('asyncDelayed', 'Async Delayed', "Enables asynchronous delay which means the thread will not block while delaying.", 'boolean', '', false, false, false, false),
        new PropertyMeta('callerRunsWhenRejected', 'Caller Runs When Rejected', "Whether or not the caller should run the task when it was rejected by the thread pool. Is by default true", 'boolean', '', false, false, false, false),
        new PropertyMeta('correlationExpression', 'Correlation Expression', "The expression used to calculate the correlation key to use for throttle grouping. The Exchange which has the same correlation key is throttled together.", 'Expression', '', false, false, false, true),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "To use a custom thread pool (ScheduledExecutorService) by the throttler.", 'string', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression to configure the maximum number of messages to throttle per request", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('rejectExecution', 'Reject Execution', "Whether or not throttler throws the ThrottlerRejectedExecutionException when the exchange exceeds the request limit Is by default false", 'boolean', '', false, false, false, false),
        new PropertyMeta('timePeriodMillis', 'Time Period Millis', "Sets the time period during which the maximum request count is valid for", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('otherwise', 'Otherwise', 'Route to be executed when all other choices evaluate to false', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('removeProperty', 'Remove Property', 'Removes a named property from the message exchange', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('propertyName', 'Property Name', "Name of property to remove", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('validate', 'Validate', 'Validates a message based on an expression', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to use for validation as a predicate. The expression should return either true or false. If returning false the message is invalid and an exception is thrown.", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('sort', 'Sort', 'Sorts the contents of the message', 'null', [
        new PropertyMeta('comparatorRef', 'Comparator Ref', "Sets a reference to lookup for the comparator to use for sorting", 'string', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Optional expression to sort by something else than the message body", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('from', 'From', 'Act as a message source as input to a route', 'null', [
        new PropertyMeta('parameters', 'parameters', "parameters", 'object', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('uri', 'Uri', "Sets the URI of the endpoint to use", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('to', 'To', 'Sends the message to a static endpoint', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('parameters', 'parameters', "parameters", 'object', '', false, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Sets the optional ExchangePattern used to invoke this endpoint", 'string', 'InOnly, InOptionalOut, InOut', false, false, false, false),
        new PropertyMeta('uri', 'Uri', "Sets the uri of the endpoint to send to.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('setHeader', 'Set Header', 'Sets the value of a message header', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to return the value of the header", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('name', 'Name', "Name of message header to set a new value The simple language can be used to define a dynamic evaluated header name to be used. Otherwise a constant name will be used.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('onCompletion', 'On Completion', 'Route to be executed when normal route processing completes', 'null', [
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "Refers to a custom Thread Pool to be used for parallel processing. Notice if you set this option, then parallel processing is automatic implied, and you do not have to enable that option as well.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('mode', 'Mode', "Sets the on completion mode. The default value is AfterConsumer", 'string', 'AfterConsumer, BeforeConsumer', false, false, false, false),
        new PropertyMeta('onCompleteOnly', 'On Complete Only', "Will only synchronize when the org.apache.camel.Exchange completed successfully (no errors).", 'boolean', '', false, false, false, false),
        new PropertyMeta('onFailureOnly', 'On Failure Only', "Will only synchronize when the org.apache.camel.Exchange ended with failure (exception or FAULT message).", 'boolean', '', false, false, false, false),
        new PropertyMeta('onWhen', 'On When', "Sets an additional predicate that should be true before the onCompletion is triggered. To be used for fine grained controlling whether a completion callback should be invoked or not", 'When', '', false, false, false, true),
        new PropertyMeta('parallelProcessing', 'Parallel Processing', "If enabled then the on completion process will run asynchronously by a separate thread from a thread pool. By default this is false, meaning the on completion process will run synchronously using the same caller thread as from the route.", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('useOriginalMessage', 'Use Original Message', "Will use the original input message body when an org.apache.camel.Exchange for this on completion. By default this feature is off.", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('removeHeader', 'Remove Header', 'Removes a named header from the message', 'null', [
        new PropertyMeta('headerName', 'Header Name', "Name of header to remove (deprecated use name instead)", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('name', 'Name', "Name of header to remove", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('script', 'Script', 'Executes a script from a language which does not change the message body.', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to return the transformed message body (the new message body to use)", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('enrich', 'Enrich', 'Enriches a message with data from a secondary resource', 'null', [
        new PropertyMeta('aggregateOnException', 'Aggregate On Exception', "If this option is false then the aggregate method is not used if there was an exception thrown while trying to retrieve the data to enrich from the resource. Setting this option to true allows end users to control what to do if there was an exception in the aggregate method. For example to suppress the exception or set a custom message body etc.", 'boolean', '', false, false, false, false),
        new PropertyMeta('allowOptimisedComponents', 'Allow Optimised Components', "Whether to allow components to optimise enricher if they are org.apache.camel.spi.SendDynamicAware .", 'boolean', '', false, false, false, false),
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ProducerCache which is used to cache and reuse producer when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression that computes the endpoint uri to use as the resource endpoint to enrich from", 'Expression', '', true, false, false, true),
        new PropertyMeta('ignoreInvalidEndpoint', 'Ignore Invalid Endpoint', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('shareUnitOfWork', 'Share Unit Of Work', "Shares the org.apache.camel.spi.UnitOfWork with the parent and the resource exchange. Enrich will by default not share unit of work between the parent exchange and the resource exchange. This means the resource exchange has its own individual unit of work.", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodAllowNull', 'Strategy Method Allow Null', "If this option is false then the aggregate method is not used if there was no data to enrich. If this option is true then null values is used as the oldExchange (when no data to enrich), when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "Refers to an AggregationStrategy to be used to merge the reply from the external service, into a single outgoing message. By default Camel will use the reply from the external service as outgoing message.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('log', 'Log', 'Logs the defined message to the logger', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('logName', 'Log Name', "Sets the name of the logger", 'string', '', false, false, false, false),
        new PropertyMeta('loggerRef', 'Logger Ref', "To refer to a custom logger instance to lookup from the registry.", 'string', '', false, false, false, false),
        new PropertyMeta('loggingLevel', 'Logging Level', "Sets the logging level. The default value is INFO", 'string', 'DEBUG, ERROR, INFO, OFF, TRACE, WARN', false, false, false, false),
        new PropertyMeta('marker', 'Marker', "To use slf4j marker", 'string', '', false, false, false, false),
        new PropertyMeta('message', 'Message', "Sets the log message (uses simple language)", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('removeProperties', 'Remove Properties', 'Removes message exchange properties whose name matches a specified pattern', 'null', [
        new PropertyMeta('excludePattern', 'Exclude Pattern', "Name or pattern of properties to not remove. The pattern is matched in the following order: 1 = exact match 2 = wildcard (pattern ends with a and the name starts with the pattern) 3 = regular expression (all of above is case in-sensitive).", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Name or pattern of properties to remove. The pattern is matched in the following order: 1 = exact match 2 = wildcard (pattern ends with a and the name starts with the pattern) 3 = regular expression (all of above is case in-sensitive).", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('marshal', 'Marshal', 'Marshals data into a specified format for transmission over a transport or component', 'null', [
        new PropertyMeta('any23', 'any23', "any23", 'string', '', false, false, false, false),
        new PropertyMeta('asn1', 'asn1', "asn1", 'string', '', false, false, false, false),
        new PropertyMeta('avro', 'avro', "avro", 'string', '', false, false, false, false),
        new PropertyMeta('csv', 'csv', "csv", 'string', '', false, false, false, false),
        new PropertyMeta('custom', 'custom', "custom", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('protobuf', 'protobuf', "protobuf", 'string', '', false, false, false, false),
        new PropertyMeta('soapjaxb', 'soapjaxb', "soapjaxb", 'string', '', false, false, false, false),
        new PropertyMeta('thrift', 'thrift', "thrift", 'string', '', false, false, false, false),
        new PropertyMeta('xstream', 'xstream', "xstream", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('split', 'Split', 'Splits a single message into many sub-messages.', 'null', [
        new PropertyMeta('delimiter', 'Delimiter', "Delimiter used in splitting messages. Can be turned off using the value false. The default value is ,", 'string', '', false, false, false, false),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "Refers to a custom Thread Pool to be used for parallel processing. Notice if you set this option, then parallel processing is automatic implied, and you do not have to enable that option as well.", 'string', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression of how to split the message body, such as as-is, using a tokenizer, or using an xpath.", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('onPrepareRef', 'On Prepare Ref', "Uses the Processor when preparing the org.apache.camel.Exchange to be send. This can be used to deep-clone messages that should be send, or any custom logic needed before the exchange is send.", 'string', '', false, false, false, false),
        new PropertyMeta('parallelAggregate', 'Parallel Aggregate', "If enabled then the aggregate method on AggregationStrategy can be called concurrently. Notice that this would require the implementation of AggregationStrategy to be implemented as thread-safe. By default this is false meaning that Camel synchronizes the call to the aggregate method. Though in some use-cases this can be used to archive higher performance when the AggregationStrategy is implemented as thread-safe.", 'boolean', '', false, false, false, false),
        new PropertyMeta('parallelProcessing', 'Parallel Processing', "If enabled then processing each splitted messages occurs concurrently. Note the caller thread will still wait until all messages has been fully processed, before it continues. Its only processing the sub messages from the splitter which happens concurrently.", 'boolean', '', false, false, false, false),
        new PropertyMeta('shareUnitOfWork', 'Share Unit Of Work', "Shares the org.apache.camel.spi.UnitOfWork with the parent and each of the sub messages. Splitter will by default not share unit of work between the parent exchange and each splitted exchange. This means each splitted exchange has its own individual unit of work.", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('stopOnAggregateException', 'Stop On Aggregate Exception', "If enabled, unwind exceptions occurring at aggregation time to the error handler when parallelProcessing is used. Currently, aggregation time exceptions do not stop the route processing when parallelProcessing is used. Enabling this option allows to work around this behavior. The default value is false for the sake of backward compatibility.", 'boolean', '', false, false, false, false),
        new PropertyMeta('stopOnException', 'Stop On Exception', "Will now stop further processing if an exception or failure occurred during processing of an org.apache.camel.Exchange and the caused exception will be thrown. Will also stop if processing the exchange failed (has a fault message) or an exception was thrown and handled by the error handler (such as using onException). In all situations the splitter will stop further processing. This is the same behavior as in pipeline, which is used by the routing engine. The default behavior is to not stop but continue processing till the end", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodAllowNull', 'Strategy Method Allow Null', "If this option is false then the aggregate method is not used if there was no data to enrich. If this option is true then null values is used as the oldExchange (when no data to enrich), when using POJOs as the AggregationStrategy", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "Sets a reference to the AggregationStrategy to be used to assemble the replies from the splitted messages, into a single outgoing message from the Splitter. By default Camel will use the original incoming message to the splitter (leave it unchanged). You can also use a POJO as the AggregationStrategy", 'string', '', false, false, false, false),
        new PropertyMeta('streaming', 'Streaming', "When in streaming mode, then the splitter splits the original message on-demand, and each splitted message is processed one by one. This reduces memory usage as the splitter do not split all the messages first, but then we do not know the total size, and therefore the org.apache.camel.Exchange#SPLIT_SIZE is empty. In non-streaming mode (default) the splitter will split each message first, to know the total size, and then process each message one by one. This requires to keep all the splitted messages in memory and therefore requires more memory. The total size is provided in the org.apache.camel.Exchange#SPLIT_SIZE header. The streaming mode also affects the aggregation behavior. If enabled then Camel will process replies out-of-order, eg in the order they come back. If disabled, Camel will process replies in the same order as the messages was splitted.", 'boolean', '', false, false, false, false),
        new PropertyMeta('timeout', 'Timeout', "Sets a total timeout specified in millis, when using parallel processing. If the Splitter hasn't been able to split and process all the sub messages within the given timeframe, then the timeout triggers and the Splitter breaks out and continues. Notice if you provide a TimeoutAwareAggregationStrategy then the timeout method is invoked before breaking out. If the timeout is reached with running tasks still remaining, certain tasks for which it is difficult for Camel to shut down in a graceful manner may continue to run. So use this option with a bit of care.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('transacted', 'Transacted', 'Enables transaction on the route', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('ref', 'Ref', "Sets a reference to use for lookup the policy in the registry.", 'string', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('interceptFrom', 'Intercept From', 'Intercepts incoming messages', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('uri', 'Uri', "Intercept incoming messages from the uri or uri pattern. If this option is not configured, then all incoming messages is intercepted.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('doCatch', 'Do Catch', 'Catches exceptions as part of a try, catch, finally block', 'null', [
        new PropertyMeta('exception', 'Exception', "The exception(s) to catch.", 'array', '', false, false, true, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('onWhen', 'On When', "Sets an additional predicate that should be true before the onCatch is triggered. To be used for fine grained controlling whether a thrown exception should be intercepted by this exception type or not.", 'When', '', false, false, false, true),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('circuitBreaker', 'Circuit Breaker', 'null', 'null', [
        new PropertyMeta('configurationRef', 'Configuration Ref', "Refers to a circuit breaker configuration (such as hystrix, resillience4j, or microprofile-fault-tolerance) to use for configuring the circuit breaker EIP.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('onFallback', 'onFallback', "onFallback", 'OnFallback', '', false, false, false, true),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('convertBodyTo', 'Convert Body To', 'Converts the message body to another type', 'null', [
        new PropertyMeta('charset', 'Charset', "To use a specific charset when converting", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('mandatory', 'mandatory', "mandatory", 'boolean', '', false, false, false, false),
        new PropertyMeta('type', 'Type', "The java type to convert to", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('intercept', 'Intercept', 'Intercepts a message at each step in the route', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('unmarshal', 'Unmarshal', 'Converts the message data received from the wire into a format that Apache Camel processors can consume', 'null', [
        new PropertyMeta('any23', 'any23', "any23", 'string', '', false, false, false, false),
        new PropertyMeta('asn1', 'asn1', "asn1", 'string', '', false, false, false, false),
        new PropertyMeta('avro', 'avro', "avro", 'string', '', false, false, false, false),
        new PropertyMeta('csv', 'csv', "csv", 'string', '', false, false, false, false),
        new PropertyMeta('custom', 'custom', "custom", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('protobuf', 'protobuf', "protobuf", 'string', '', false, false, false, false),
        new PropertyMeta('soapjaxb', 'soapjaxb', "soapjaxb", 'string', '', false, false, false, false),
        new PropertyMeta('thrift', 'thrift', "thrift", 'string', '', false, false, false, false),
        new PropertyMeta('xstream', 'xstream', "xstream", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('onFallback', 'On Fallback', 'Route to be executed when Hystrix EIP executes fallback', 'null', [
        new PropertyMeta('fallbackViaNetwork', 'Fallback Via Network', "Whether the fallback goes over the network. If the fallback will go over the network it is another possible point of failure and so it also needs to be wrapped by a HystrixCommand. It is important to execute the fallback command on a separate thread-pool, otherwise if the main command were to become latent and fill the thread-pool this would prevent the fallback from running if the two commands share the same pool.", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('setExchangePattern', 'Set Exchange Pattern', 'Sets the exchange pattern on the message exchange', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Sets the new exchange pattern of the Exchange to be used from this point forward", 'string', 'InOnly, InOptionalOut, InOut', true, false, false, false),
    ]),
    new ElementMeta('recipientList', 'Recipient List', 'Routes messages to a number of dynamically specified recipients (dynamic to)', 'null', [
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ProducerCache which is used to cache and reuse producers when using this recipient list, when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('delimiter', 'Delimiter', "Delimiter used if the Expression returned multiple endpoints. Can be turned off using the value false. The default value is ,", 'string', '', false, false, false, false),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "Refers to a custom Thread Pool to be used for parallel processing. Notice if you set this option, then parallel processing is automatic implied, and you do not have to enable that option as well.", 'string', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression that returns which endpoints (url) to send the message to (the recipients). If the expression return an empty value then the message is not sent to any recipients.", 'Expression', '', true, false, false, true),
        new PropertyMeta('ignoreInvalidEndpoints', 'Ignore Invalid Endpoints', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('onPrepareRef', 'On Prepare Ref', "Uses the Processor when preparing the org.apache.camel.Exchange to be send. This can be used to deep-clone messages that should be send, or any custom logic needed before the exchange is send.", 'string', '', false, false, false, false),
        new PropertyMeta('parallelAggregate', 'Parallel Aggregate', "If enabled then the aggregate method on AggregationStrategy can be called concurrently. Notice that this would require the implementation of AggregationStrategy to be implemented as thread-safe. By default this is false meaning that Camel synchronizes the call to the aggregate method. Though in some use-cases this can be used to archive higher performance when the AggregationStrategy is implemented as thread-safe.", 'boolean', '', false, false, false, false),
        new PropertyMeta('parallelProcessing', 'Parallel Processing', "If enabled then sending messages to the recipients occurs concurrently. Note the caller thread will still wait until all messages has been fully processed, before it continues. Its only the sending and processing the replies from the recipients which happens concurrently.", 'boolean', '', false, false, false, false),
        new PropertyMeta('shareUnitOfWork', 'Share Unit Of Work', "Shares the org.apache.camel.spi.UnitOfWork with the parent and each of the sub messages. Recipient List will by default not share unit of work between the parent exchange and each recipient exchange. This means each sub exchange has its own individual unit of work.", 'boolean', '', false, false, false, false),
        new PropertyMeta('stopOnAggregateException', 'Stop On Aggregate Exception', "If enabled, unwind exceptions occurring at aggregation time to the error handler when parallelProcessing is used. Currently, aggregation time exceptions do not stop the route processing when parallelProcessing is used. Enabling this option allows to work around this behavior. The default value is false for the sake of backward compatibility.", 'boolean', '', false, false, false, false),
        new PropertyMeta('stopOnException', 'Stop On Exception', "Will now stop further processing if an exception or failure occurred during processing of an org.apache.camel.Exchange and the caused exception will be thrown. Will also stop if processing the exchange failed (has a fault message) or an exception was thrown and handled by the error handler (such as using onException). In all situations the recipient list will stop further processing. This is the same behavior as in pipeline, which is used by the routing engine. The default behavior is to not stop but continue processing till the end", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodAllowNull', 'Strategy Method Allow Null', "If this option is false then the aggregate method is not used if there was no data to enrich. If this option is true then null values is used as the oldExchange (when no data to enrich), when using POJOs as the AggregationStrategy", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "Sets a reference to the AggregationStrategy to be used to assemble the replies from the recipients, into a single outgoing message from the RecipientList. By default Camel will use the last reply as the outgoing message. You can also use a POJO as the AggregationStrategy", 'string', '', false, false, false, false),
        new PropertyMeta('streaming', 'Streaming', "If enabled then Camel will process replies out-of-order, eg in the order they come back. If disabled, Camel will process replies in the same order as defined by the recipient list.", 'boolean', '', false, false, false, false),
        new PropertyMeta('timeout', 'Timeout', "Sets a total timeout specified in millis, when using parallel processing. If the Recipient List hasn't been able to send and process all replies within the given timeframe, then the timeout triggers and the Recipient List breaks out and continues. Notice if you provide a TimeoutAwareAggregationStrategy then the timeout method is invoked before breaking out. If the timeout is reached with running tasks still remaining, certain tasks for which it is difficult for Camel to shut down in a graceful manner may continue to run. So use this option with a bit of care.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('bean', 'Bean', 'Calls a Java bean', 'null', [
        new PropertyMeta('beanType', 'Bean Type', "Sets the class name (fully qualified) of the bean to use", 'string', '', false, false, false, false),
        new PropertyMeta('cache', 'Cache', "Use singleton option instead", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('method', 'Method', "Sets the method name on the bean to use", 'string', '', false, false, false, false),
        new PropertyMeta('ref', 'Ref', "Sets a reference to an exiting bean to use, which is looked up from the registry", 'string', '', false, false, false, false),
        new PropertyMeta('scope', 'Scope', "Scope of bean. When using singleton scope (default) the bean is created or looked up only once and reused for the lifetime of the endpoint. The bean should be thread-safe in case concurrent threads is calling the bean at the same time. When using request scope the bean is created or looked up once per request (exchange). This can be used if you want to store state on a bean while processing a request and you want to call the same bean instance multiple times while processing the request. The bean does not have to be thread-safe as the instance is only called from the same request. When using prototype scope, then the bean will be looked up or created per call. However in case of lookup then this is delegated to the bean registry such as Spring or CDI (if in use), which depends on their configuration can act as either singleton or prototype scope. So when using prototype scope then this depends on the bean registry implementation.", 'string', 'Prototype, Request, Singleton', false, false, false, false),
    ]),
    new ElementMeta('multicast', 'Multicast', 'Routes the same message to multiple paths either sequentially or in parallel.', 'null', [
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "Refers to a custom Thread Pool to be used for parallel processing. Notice if you set this option, then parallel processing is automatic implied, and you do not have to enable that option as well.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('onPrepareRef', 'On Prepare Ref', "Uses the Processor when preparing the org.apache.camel.Exchange to be send. This can be used to deep-clone messages that should be send, or any custom logic needed before the exchange is send.", 'string', '', false, false, false, false),
        new PropertyMeta('parallelAggregate', 'Parallel Aggregate', "If enabled then the aggregate method on AggregationStrategy can be called concurrently. Notice that this would require the implementation of AggregationStrategy to be implemented as thread-safe. By default this is false meaning that Camel synchronizes the call to the aggregate method. Though in some use-cases this can be used to archive higher performance when the AggregationStrategy is implemented as thread-safe.", 'boolean', '', false, false, false, false),
        new PropertyMeta('parallelProcessing', 'Parallel Processing', "If enabled then sending messages to the multicasts occurs concurrently. Note the caller thread will still wait until all messages has been fully processed, before it continues. Its only the sending and processing the replies from the multicasts which happens concurrently.", 'boolean', '', false, false, false, false),
        new PropertyMeta('shareUnitOfWork', 'Share Unit Of Work', "Shares the org.apache.camel.spi.UnitOfWork with the parent and each of the sub messages. Multicast will by default not share unit of work between the parent exchange and each multicasted exchange. This means each sub exchange has its own individual unit of work.", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('stopOnAggregateException', 'Stop On Aggregate Exception', "If enabled, unwind exceptions occurring at aggregation time to the error handler when parallelProcessing is used. Currently, aggregation time exceptions do not stop the route processing when parallelProcessing is used. Enabling this option allows to work around this behavior. The default value is false for the sake of backward compatibility.", 'boolean', '', false, false, false, false),
        new PropertyMeta('stopOnException', 'Stop On Exception', "Will now stop further processing if an exception or failure occurred during processing of an org.apache.camel.Exchange and the caused exception will be thrown. Will also stop if processing the exchange failed (has a fault message) or an exception was thrown and handled by the error handler (such as using onException). In all situations the multicast will stop further processing. This is the same behavior as in pipeline, which is used by the routing engine. The default behavior is to not stop but continue processing till the end", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodAllowNull', 'Strategy Method Allow Null', "If this option is false then the aggregate method is not used if there was no data to enrich. If this option is true then null values is used as the oldExchange (when no data to enrich), when using POJOs as the AggregationStrategy", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "Refers to an AggregationStrategy to be used to assemble the replies from the multicasts, into a single outgoing message from the Multicast. By default Camel will use the last reply as the outgoing message. You can also use a POJO as the AggregationStrategy", 'string', '', false, false, false, false),
        new PropertyMeta('streaming', 'Streaming', "If enabled then Camel will process replies out-of-order, eg in the order they come back. If disabled, Camel will process replies in the same order as defined by the multicast.", 'boolean', '', false, false, false, false),
        new PropertyMeta('timeout', 'Timeout', "Sets a total timeout specified in millis, when using parallel processing. If the Multicast hasn't been able to send and process all replies within the given timeframe, then the timeout triggers and the Multicast breaks out and continues. Notice if you provide a TimeoutAwareAggregationStrategy then the timeout method is invoked before breaking out. If the timeout is reached with running tasks still remaining, certain tasks for which it is difficult for Camel to shut down in a graceful manner may continue to run. So use this option with a bit of care.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('inOnly', 'In Only', 'Marks the exchange pattern for the route to one way', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('parameters', 'parameters', "parameters", 'object', '', false, false, false, false),
        new PropertyMeta('uri', 'Uri', "Sets the uri of the endpoint to send to.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('loadBalance', 'Load Balance', 'Balances message processing among a number of nodes', 'null', [
        new PropertyMeta('customLoadBalancer', 'customLoadBalancer', "customLoadBalancer", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'Inherit Error Handler', "Sets whether or not to inherit the configured error handler. The default value is true. You can use this to disable using the inherited error handler for a given DSL such as a load balancer where you want to use a custom error handler strategy.", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('routingSlip', 'Routing Slip', 'Routes a message through a series of steps that are pre-determined (the slip)', 'null', [
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ProducerCache which is used to cache and reuse producers when using this routing slip, when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression to define the routing slip, which defines which endpoints to route the message in a pipeline style. Notice the expression is evaluated once, if you want a more dynamic style, then the dynamic router eip is a better choice.", 'Expression', '', true, false, false, true),
        new PropertyMeta('ignoreInvalidEndpoints', 'Ignore Invalid Endpoints', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('uriDelimiter', 'Uri Delimiter', "Sets the uri delimiter to use", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('rollback', 'Rollback', 'Forces a rollback by stopping routing the message', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('markRollbackOnly', 'Mark Rollback Only', "Mark the transaction for rollback only (cannot be overruled to commit)", 'boolean', '', false, false, false, false),
        new PropertyMeta('markRollbackOnlyLast', 'Mark Rollback Only Last', "Mark only last sub transaction for rollback only. When using sub transactions (if the transaction manager support this)", 'boolean', '', false, false, false, false),
        new PropertyMeta('message', 'Message', "Message to use in rollback exception", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('whenSkipSendToEndpoint', 'When Skip Send To Endpoint', 'Predicate to determine if the message should be sent or not to the endpoint, when using interceptSentToEndpoint.', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression used as the predicate to evaluate whether the message should be sent or not to the endpoint", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('wireTap', 'Wire Tap', 'Routes a copy of a message (or creates a new message) to a secondary destination while continue routing the original message.', 'null', [
        new PropertyMeta('allowOptimisedComponents', 'Allow Optimised Components', "Whether to allow components to optimise toD if they are org.apache.camel.spi.SendDynamicAware .", 'boolean', '', false, false, false, false),
        new PropertyMeta('autoStartComponents', 'Auto Start Components', "Whether to auto startup components when toD is starting up.", 'boolean', '', false, false, false, false),
        new PropertyMeta('body', 'Body', "Uses the expression for creating a new body as the message to use for wire tapping", 'Expression', '', false, false, false, true),
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ProducerCache which is used to cache and reuse producers when using this recipient list, when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('copy', 'Copy', "Uses a copy of the original exchange", 'boolean', '', false, false, false, false),
        new PropertyMeta('dynamicUri', 'Dynamic Uri', "Whether the uri is dynamic or static. If the uri is dynamic then the simple language is used to evaluate a dynamic uri to use as the wire-tap destination, for each incoming message. This works similar to how the toD EIP pattern works. If static then the uri is used as-is as the wire-tap destination.", 'boolean', '', false, false, false, false),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "Uses a custom thread pool", 'string', '', false, false, false, false),
        new PropertyMeta('ignoreInvalidEndpoint', 'Ignore Invalid Endpoint', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('onPrepareRef', 'On Prepare Ref', "Uses the Processor when preparing the org.apache.camel.Exchange to be send. This can be used to deep-clone messages that should be send, or any custom logic needed before the exchange is send.", 'string', '', false, false, false, false),
        new PropertyMeta('parameters', 'parameters', "parameters", 'object', '', false, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Sets the optional ExchangePattern used to invoke this endpoint", 'string', 'InOnly, InOptionalOut, InOut', false, false, false, false),
        new PropertyMeta('processorRef', 'Processor Ref', "Reference to a Processor to use for creating a new body as the message to use for wire tapping", 'string', '', false, false, false, false),
        new PropertyMeta('setHeader', 'setHeader', "setHeader", 'array', '', false, false, true, true),
        new PropertyMeta('uri', 'Uri', "The uri of the endpoint to send to. The uri can be dynamic computed using the org.apache.camel.language.simple.SimpleLanguage expression.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('loop', 'Loop', 'Processes a message multiple times', 'null', [
        new PropertyMeta('breakOnShutdown', 'Break On Shutdown', "If the breakOnShutdown attribute is true, then the loop will not iterate until it reaches the end when Camel is shut down.", 'boolean', '', false, false, false, false),
        new PropertyMeta('copy', 'Copy', "If the copy attribute is true, a copy of the input Exchange is used for each iteration. That means each iteration will start from a copy of the same message. By default loop will loop the same exchange all over, so each iteration may have different message content.", 'boolean', '', false, false, false, false),
        new PropertyMeta('doWhile', 'Do While', "Enables the while loop that loops until the predicate evaluates to false or null.", 'boolean', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression to define how many times we should loop. Notice the expression is only evaluated once, and should return a number as how many times to loop. A value of zero or negative means no looping. The loop is like a for-loop fashion, if you want a while loop, then the dynamic router may be a better choice.", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('interceptSendToEndpoint', 'Intercept Send To Endpoint', 'Intercepts messages being sent to an endpoint', 'null', [
        new PropertyMeta('afterUri', 'After Uri', "After sending to the endpoint then send the message to this uri which allows to process its result.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('skipSendToOriginalEndpoint', 'Skip Send To Original Endpoint', "If set to true then the message is not sent to the original endpoint. By default (false) the message is both intercepted and then sent to the original endpoint.", 'string', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('uri', 'Uri', "Intercept sending to the uri or uri pattern.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('doTry', 'Do Try', 'Marks the beginning of a try, catch, finally block', 'null', [
        new PropertyMeta('doCatch', 'doCatch', "doCatch", 'array', '', false, false, true, true),
        new PropertyMeta('doFinally', 'doFinally', "doFinally", 'DoFinally', '', false, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('resequence', 'Resequence', 'Resequences (re-order) messages based on an expression', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to use for re-ordering the messages, such as a header with a sequence number", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('expression', 'Expression', 'A useful base class for an expression', 'null', [
        new PropertyMeta('constant', 'constant', "constant", 'string', '', false, false, false, false),
        new PropertyMeta('csimple', 'csimple', "csimple", 'string', '', false, false, false, false),
        new PropertyMeta('datasonnet', 'datasonnet', "datasonnet", 'string', '', false, false, false, false),
        new PropertyMeta('exchangeProperty', 'exchangeProperty', "exchangeProperty", 'string', '', false, false, false, false),
        new PropertyMeta('groovy', 'groovy', "groovy", 'string', '', false, false, false, false),
        new PropertyMeta('header', 'header', "header", 'string', '', false, false, false, false),
        new PropertyMeta('hl7terser', 'hl7terser', "hl7terser", 'string', '', false, false, false, false),
        new PropertyMeta('joor', 'joor', "joor", 'string', '', false, false, false, false),
        new PropertyMeta('jsonpath', 'jsonpath', "jsonpath", 'string', '', false, false, false, false),
        new PropertyMeta('language', 'language', "language", 'string', '', false, false, false, false),
        new PropertyMeta('method', 'method', "method", 'string', '', false, false, false, false),
        new PropertyMeta('mvel', 'mvel', "mvel", 'string', '', false, false, false, false),
        new PropertyMeta('ognl', 'ognl', "ognl", 'string', '', false, false, false, false),
        new PropertyMeta('ref', 'ref', "ref", 'string', '', false, false, false, false),
        new PropertyMeta('simple', 'simple', "simple", 'string', '', false, false, false, false),
        new PropertyMeta('spel', 'spel', "spel", 'string', '', false, false, false, false),
        new PropertyMeta('tokenize', 'tokenize', "tokenize", 'string', '', false, false, false, false),
        new PropertyMeta('xpath', 'xpath', "xpath", 'string', '', false, false, false, false),
        new PropertyMeta('xquery', 'xquery', "xquery", 'string', '', false, false, false, false),
        new PropertyMeta('xtokenize', 'xtokenize', "xtokenize", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('serviceCall', 'Service Call', 'To call remote services', 'null', [
        new PropertyMeta('component', 'Component', "The component to use.", 'string', '', false, false, false, false),
        new PropertyMeta('configurationRef', 'Configuration Ref', "Refers to a ServiceCall configuration to use", 'string', '', false, false, false, false),
        new PropertyMeta('expressionRef', 'Expression Ref', "Set a reference to a custom Expression to use.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('loadBalancerRef', 'Load Balancer Ref', "Sets a reference to a custom ServiceLoadBalancer to use.", 'string', '', false, false, false, false),
        new PropertyMeta('name', 'Name', "Sets the name of the service to use", 'string', '', true, false, false, false),
        new PropertyMeta('pattern', 'Pattern', "Sets the optional ExchangePattern used to invoke this endpoint", 'string', 'InOnly, InOptionalOut, InOut', false, false, false, false),
        new PropertyMeta('serviceChooserRef', 'Service Chooser Ref', "Sets a reference to a custom ServiceChooser to use.", 'string', '', false, false, false, false),
        new PropertyMeta('serviceDiscoveryRef', 'Service Discovery Ref', "Sets a reference to a custom ServiceDiscovery to use.", 'string', '', false, false, false, false),
        new PropertyMeta('serviceFilterRef', 'Service Filter Ref', "Sets a reference to a custom ServiceFilter to use.", 'string', '', false, false, false, false),
        new PropertyMeta('uri', 'Uri', "The uri of the endpoint to send to. The uri can be dynamic computed using the org.apache.camel.language.simple.SimpleLanguage expression.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('sample', 'Sample', 'Extract a sample of the messages passing through a route', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('messageFrequency', 'Message Frequency', "Sets the sample message count which only a single Exchange will pass through after this many received.", 'number', '', false, false, false, false),
        new PropertyMeta('samplePeriod', 'Sample Period', "Sets the sample period during which only a single Exchange will pass through.", 'string', '', false, false, false, false),
        new PropertyMeta('units', 'Units', "Sets the time units for the sample period, defaulting to seconds.", 'string', 'DAYS, HOURS, MICROSECONDS, MILLISECONDS, MINUTES, NANOSECONDS, SECONDS', false, false, false, false),
    ]),
    new ElementMeta('dynamicRouter', 'Dynamic Router', 'Routes messages based on dynamic rules', 'null', [
        new PropertyMeta('cacheSize', 'Cache Size', "Sets the maximum size used by the org.apache.camel.spi.ProducerCache which is used to cache and reuse producers when using this dynamic router, when uris are reused. Beware that when using dynamic endpoints then it affects how well the cache can be utilized. If each dynamic endpoint is unique then its best to turn of caching by setting this to -1, which allows Camel to not cache both the producers and endpoints; they are regarded as prototype scoped and will be stopped and discarded after use. This reduces memory usage as otherwise producers/endpoints are stored in memory in the caches. However if there are a high degree of dynamic endpoints that have been used before, then it can benefit to use the cache to reuse both producers and endpoints and therefore the cache size can be set accordingly or rely on the default size (1000). If there is a mix of unique and used before dynamic endpoints, then setting a reasonable cache size can help reduce memory usage to avoid storing too many non frequent used producers.", 'number', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression to call that returns the endpoint(s) to route to in the dynamic routing. Important: The expression will be called in a while loop fashion, until the expression returns null which means the dynamic router is finished.", 'Expression', '', true, false, false, true),
        new PropertyMeta('ignoreInvalidEndpoints', 'Ignore Invalid Endpoints', "Ignore the invalidate endpoint exception when try to create a producer with that endpoint", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('uriDelimiter', 'Uri Delimiter', "Sets the uri delimiter to use", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('pipeline', 'Pipeline', 'Routes the message to a sequence of processors.', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('saga', 'Saga', 'Enables sagas on the route', 'null', [
        new PropertyMeta('compensation', 'Compensation', "The compensation endpoint URI that must be called to compensate all changes done in the route. The route corresponding to the compensation URI must perform compensation and complete without error. If errors occur during compensation, the saga service may call again the compensation URI to retry.", 'string', '', false, false, false, false),
        new PropertyMeta('completion', 'Completion', "The completion endpoint URI that will be called when the Saga is completed successfully. The route corresponding to the completion URI must perform completion tasks and terminate without error. If errors occur during completion, the saga service may call again the completion URI to retry.", 'string', '', false, false, false, false),
        new PropertyMeta('completionMode', 'Completion Mode', "Determine how the saga should be considered complete. When set to AUTO, the saga is completed when the exchange that initiates the saga is processed successfully, or compensated when it completes exceptionally. When set to MANUAL, the user must complete or compensate the saga using the saga:complete or saga:compensate endpoints.", 'string', 'AUTO, MANUAL', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('propagation', 'Propagation', "Set the Saga propagation mode (REQUIRED, REQUIRES_NEW, MANDATORY, SUPPORTS, NOT_SUPPORTED, NEVER).", 'string', 'MANDATORY, NEVER, NOT_SUPPORTED, REQUIRED, REQUIRES_NEW, SUPPORTS', false, false, false, false),
        new PropertyMeta('sagaServiceRef', 'Saga Service Ref', "Refers to the id to lookup in the registry for the specific CamelSagaService to use.", 'string', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('timeout', 'Timeout', "Set the maximum amount of time for the Saga. After the timeout is expired, the saga will be compensated automatically (unless a different decision has been taken in the meantime).", 'string', '', false, false, false, false),
        new PropertyMeta('timeoutInMilliseconds', 'Timeout In Milliseconds', "Set the maximum amount of time for the Saga. After the timeout is expired, the saga will be compensated automatically (unless a different decision has been taken in the meantime).", 'number', '', false, false, false, false),
    ]),
    new ElementMeta('threads', 'Threads', 'Specifies that all steps after this node are processed asynchronously', 'null', [
        new PropertyMeta('allowCoreThreadTimeOut', 'Allow Core Thread Time Out', "Whether idle core threads are allowed to timeout and therefore can shrink the pool size below the core pool size Is by default false", 'boolean', '', false, false, false, false),
        new PropertyMeta('callerRunsWhenRejected', 'Caller Runs When Rejected', "Whether or not to use as caller runs as fallback when a task is rejected being added to the thread pool (when its full). This is only used as fallback if no rejectedPolicy has been configured, or the thread pool has no configured rejection handler. Is by default true", 'string', '', false, false, false, false),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "To refer to a custom thread pool or use a thread pool profile (as overlay)", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('keepAliveTime', 'Keep Alive Time', "Sets the keep alive time for idle threads", 'number', '', false, false, false, false),
        new PropertyMeta('maxPoolSize', 'Max Pool Size', "Sets the maximum pool size", 'number', '', false, false, false, false),
        new PropertyMeta('maxQueueSize', 'Max Queue Size', "Sets the maximum number of tasks in the work queue. Use -1 or Integer.MAX_VALUE for an unbounded queue", 'number', '', false, false, false, false),
        new PropertyMeta('poolSize', 'Pool Size', "Sets the core pool size", 'number', '', false, false, false, false),
        new PropertyMeta('rejectedPolicy', 'Rejected Policy', "Sets the handler for tasks which cannot be executed by the thread pool.", 'string', 'Abort, CallerRuns, Discard, DiscardOldest', false, false, false, false),
        new PropertyMeta('threadName', 'Thread Name', "Sets the thread name to use.", 'string', '', false, false, false, false),
        new PropertyMeta('timeUnit', 'Time Unit', "Sets the keep alive time unit. By default SECONDS is used.", 'string', 'DAYS, HOURS, MICROSECONDS, MILLISECONDS, MINUTES, NANOSECONDS, SECONDS', false, false, false, false),
    ]),
    new ElementMeta('when', 'When', 'Triggers a route when an expression evaluates to true', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression used as the predicate to evaluate whether this when should trigger and route the message or not.", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('claimCheck', 'Claim Check', 'The Claim Check EIP allows you to replace message content with a claim check (a unique key), which can be used to retrieve the message content at a later time.', 'null', [
        new PropertyMeta('filter', 'Filter', "Specified a filter to control what data gets merging data back from the claim check repository. The following syntax is supported: body - to aggregate the message body attachments - to aggregate all the message attachments headers - to aggregate all the message headers header:pattern - to aggregate all the message headers that matches the pattern. The pattern uses the following rules are applied in this order: exact match, returns true wildcard match (pattern ends with a and the name starts with the pattern), returns true regular expression match, returns true otherwise returns false You can specify multiple rules separated by comma. For example to include the message body and all headers starting with foo body,header:foo. The syntax supports the following prefixes which can be used to specify include,exclude, or remove - to include (which is the default mode) - - to exclude (exclude takes precedence over include) -- - to remove (remove takes precedence) For example to exclude a header name foo, and remove all headers starting with bar -header:foo,--headers:bar Note you cannot have both include and exclude header:pattern at the same time.", 'string', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('key', 'Key', "To use a specific key for claim check id (for dynamic keys use simple language syntax as the key).", 'string', '', false, false, false, false),
        new PropertyMeta('operation', 'Operation', "The claim check operation to use. The following operations is supported: Get - Gets (does not remove) the claim check by the given key. GetAndRemove - Gets and remove the claim check by the given key. Set - Sets a new (will override if key already exists) claim check with the given key. Push - Sets a new claim check on the stack (does not use key). Pop - Gets the latest claim check from the stack (does not use key).", 'string', 'Get, GetAndRemove, Pop, Push, Set', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "To use a custom AggregationStrategy instead of the default implementation. Notice you cannot use both custom aggregation strategy and configure data at the same time.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('doFinally', 'Do Finally', 'Path traversed when a try, catch, finally block exits', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('filter', 'Filter', 'Filter out messages based using a predicate', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to determine if the message should be filtered or not. If the expression returns an empty value or false then the message is filtered (dropped), otherwise the message is continued being routed.", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('aggregate', 'Aggregate', 'Aggregates many messages into a single message', 'null', [
        new PropertyMeta('aggregateControllerRef', 'Aggregate Controller Ref', "To use a org.apache.camel.processor.aggregate.AggregateController to allow external sources to control this aggregator.", 'string', '', false, false, false, false),
        new PropertyMeta('aggregationRepositoryRef', 'Aggregation Repository Ref', "Sets the custom aggregate repository to use. Will by default use org.apache.camel.processor.aggregate.MemoryAggregationRepository", 'string', '', false, false, false, false),
        new PropertyMeta('closeCorrelationKeyOnCompletion', 'Close Correlation Key On Completion', "Closes a correlation key when its complete. Any late received exchanges which has a correlation key that has been closed, it will be defined and a ClosedCorrelationKeyException is thrown.", 'number', '', false, false, false, false),
        new PropertyMeta('completeAllOnStop', 'Complete All On Stop', "Indicates to wait to complete all current and partial (pending) aggregated exchanges when the context is stopped. This also means that we will wait for all pending exchanges which are stored in the aggregation repository to complete so the repository is empty before we can stop. You may want to enable this when using the memory based aggregation repository that is memory based only, and do not store data on disk. When this option is enabled, then the aggregator is waiting to complete all those exchanges before its stopped, when stopping CamelContext or the route using it.", 'boolean', '', false, false, false, false),
        new PropertyMeta('completionFromBatchConsumer', 'Completion From Batch Consumer', "Enables the batch completion mode where we aggregate from a org.apache.camel.BatchConsumer and aggregate the total number of exchanges the org.apache.camel.BatchConsumer has reported as total by checking the exchange property org.apache.camel.Exchange#BATCH_COMPLETE when its complete. This option cannot be used together with discardOnAggregationFailure.", 'boolean', '', false, false, false, false),
        new PropertyMeta('completionInterval', 'Completion Interval', "A repeating period in millis by which the aggregator will complete all current aggregated exchanges. Camel has a background task which is triggered every period. You cannot use this option together with completionTimeout, only one of them can be used.", 'string', '', false, false, false, false),
        new PropertyMeta('completionOnNewCorrelationGroup', 'Completion On New Correlation Group', "Enables completion on all previous groups when a new incoming correlation group. This can for example be used to complete groups with same correlation keys when they are in consecutive order. Notice when this is enabled then only 1 correlation group can be in progress as when a new correlation group starts, then the previous groups is forced completed.", 'boolean', '', false, false, false, false),
        new PropertyMeta('completionPredicate', 'Completion Predicate', "A Predicate to indicate when an aggregated exchange is complete. If this is not specified and the AggregationStrategy object implements Predicate, the aggregationStrategy object will be used as the completionPredicate.", 'Expression', '', false, false, false, true),
        new PropertyMeta('completionSize', 'Completion Size', "Number of messages aggregated before the aggregation is complete. This option can be set as either a fixed value or using an Expression which allows you to evaluate a size dynamically - will use Integer as result. If both are set Camel will fallback to use the fixed value if the Expression result was null or 0.", 'number', '', false, false, false, false),
        new PropertyMeta('completionSizeExpression', 'Completion Size Expression', "Number of messages aggregated before the aggregation is complete. This option can be set as either a fixed value or using an Expression which allows you to evaluate a size dynamically - will use Integer as result. If both are set Camel will fallback to use the fixed value if the Expression result was null or 0.", 'Expression', '', false, false, false, true),
        new PropertyMeta('completionTimeout', 'Completion Timeout', "Time in millis that an aggregated exchange should be inactive before its complete (timeout). This option can be set as either a fixed value or using an Expression which allows you to evaluate a timeout dynamically - will use Long as result. If both are set Camel will fallback to use the fixed value if the Expression result was null or 0. You cannot use this option together with completionInterval, only one of the two can be used. By default the timeout checker runs every second, you can use the completionTimeoutCheckerInterval option to configure how frequently to run the checker. The timeout is an approximation and there is no guarantee that the a timeout is triggered exactly after the timeout value. It is not recommended to use very low timeout values or checker intervals.", 'string', '', false, false, false, false),
        new PropertyMeta('completionTimeoutCheckerInterval', 'Completion Timeout Checker Interval', "Interval in millis that is used by the background task that checks for timeouts ( org.apache.camel.TimeoutMap ). By default the timeout checker runs every second. The timeout is an approximation and there is no guarantee that the a timeout is triggered exactly after the timeout value. It is not recommended to use very low timeout values or checker intervals.", 'string', '', false, false, false, false),
        new PropertyMeta('completionTimeoutExpression', 'Completion Timeout Expression', "Time in millis that an aggregated exchange should be inactive before its complete (timeout). This option can be set as either a fixed value or using an Expression which allows you to evaluate a timeout dynamically - will use Long as result. If both are set Camel will fallback to use the fixed value if the Expression result was null or 0. You cannot use this option together with completionInterval, only one of the two can be used. By default the timeout checker runs every second, you can use the completionTimeoutCheckerInterval option to configure how frequently to run the checker. The timeout is an approximation and there is no guarantee that the a timeout is triggered exactly after the timeout value. It is not recommended to use very low timeout values or checker intervals.", 'Expression', '', false, false, false, true),
        new PropertyMeta('correlationExpression', 'Correlation Expression', "The expression used to calculate the correlation key to use for aggregation. The Exchange which has the same correlation key is aggregated together. If the correlation key could not be evaluated an Exception is thrown. You can disable this by using the ignoreBadCorrelationKeys option.", 'Expression', '', true, false, false, true),
        new PropertyMeta('discardOnAggregationFailure', 'Discard On Aggregation Failure', "Discards the aggregated message when aggregation failed (an exception was thrown from AggregationStrategy . This means the partly aggregated message is dropped and not sent out of the aggregator. This option cannot be used together with completionFromBatchConsumer.", 'boolean', '', false, false, false, false),
        new PropertyMeta('discardOnCompletionTimeout', 'Discard On Completion Timeout', "Discards the aggregated message on completion timeout. This means on timeout the aggregated message is dropped and not sent out of the aggregator.", 'boolean', '', false, false, false, false),
        new PropertyMeta('eagerCheckCompletion', 'Eager Check Completion', "Use eager completion checking which means that the completionPredicate will use the incoming Exchange. As opposed to without eager completion checking the completionPredicate will use the aggregated Exchange.", 'boolean', '', false, false, false, false),
        new PropertyMeta('executorServiceRef', 'Executor Service Ref', "If using parallelProcessing you can specify a custom thread pool to be used. In fact also if you are not using parallelProcessing this custom thread pool is used to send out aggregated exchanges as well.", 'string', '', false, false, false, false),
        new PropertyMeta('forceCompletionOnStop', 'Force Completion On Stop', "Indicates to complete all current aggregated exchanges when the context is stopped", 'boolean', '', false, false, false, false),
        new PropertyMeta('ignoreInvalidCorrelationKeys', 'Ignore Invalid Correlation Keys', "If a correlation key cannot be successfully evaluated it will be ignored by logging a DEBUG and then just ignore the incoming Exchange.", 'boolean', '', false, false, false, false),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('optimisticLocking', 'Optimistic Locking', "Turns on using optimistic locking, which requires the aggregationRepository being used, is supporting this by implementing org.apache.camel.spi.OptimisticLockingAggregationRepository .", 'boolean', '', false, false, false, false),
        new PropertyMeta('parallelProcessing', 'Parallel Processing', "When aggregated are completed they are being send out of the aggregator. This option indicates whether or not Camel should use a thread pool with multiple threads for concurrency. If no custom thread pool has been specified then Camel creates a default pool with 10 concurrent threads.", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
        new PropertyMeta('strategyMethodAllowNull', 'Strategy Method Allow Null', "If this option is false then the aggregate method is not used for the very first aggregation. If this option is true then null values is used as the oldExchange (at the very first aggregation), when using POJOs as the AggregationStrategy.", 'boolean', '', false, false, false, false),
        new PropertyMeta('strategyMethodName', 'Strategy Method Name', "This option can be used to explicit declare the method name to use, when using POJOs as the AggregationStrategy.", 'string', '', false, false, false, false),
        new PropertyMeta('strategyRef', 'Strategy Ref', "A reference to lookup the AggregationStrategy in the Registry. Configuring an AggregationStrategy is required, and is used to merge the incoming Exchange with the existing already merged exchanges. At first call the oldExchange parameter is null. On subsequent invocations the oldExchange contains the merged exchanges and newExchange is of course the new incoming Exchange.", 'string', '', false, false, false, false),
        new PropertyMeta('timeoutCheckerExecutorServiceRef', 'Timeout Checker Executor Service Ref', "If using either of the completionTimeout, completionTimeoutExpression, or completionInterval options a background thread is created to check for the completion for every aggregator. Set this option to provide a custom thread pool to be used rather than creating a new thread for every aggregator.", 'string', '', false, false, false, false),
    ]),
    new ElementMeta('transform', 'Transform', 'Transforms the message body based on an expression', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to return the transformed message body (the new message body to use)", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
    ]),
    new ElementMeta('idempotentConsumer', 'Idempotent Consumer', 'Filters out duplicate messages', 'null', [
        new PropertyMeta('completionEager', 'Completion Eager', "Sets whether to complete the idempotent consumer eager or when the exchange is done. If this option is true to complete eager, then the idempotent consumer will trigger its completion when the exchange reached the end of the block of the idempotent consumer pattern. So if the exchange is continued routed after the block ends, then whatever happens there does not affect the state. If this option is false (default) to not complete eager, then the idempotent consumer will complete when the exchange is done being routed. So if the exchange is continued routed after the block ends, then whatever happens there also affect the state. For example if the exchange failed due to an exception, then the state of the idempotent consumer will be a rollback.", 'string', '', false, false, false, false),
        new PropertyMeta('eager', 'Eager', "Sets whether to eagerly add the key to the idempotent repository or wait until the exchange is complete. Eager is default enabled.", 'boolean', '', false, false, false, false),
        new PropertyMeta('expression', 'Expression', "Expression used to calculate the correlation key to use for duplicate check. The Exchange which has the same correlation key is regarded as a duplicate and will be rejected.", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('messageIdRepositoryRef', 'Message Id Repository Ref', "Sets the reference name of the message id repository", 'string', '', true, false, false, false),
        new PropertyMeta('removeOnFailure', 'Remove On Failure', "Sets whether to remove or keep the key on failure. The default behavior is to remove the key on failure.", 'boolean', '', false, false, false, false),
        new PropertyMeta('skipDuplicate', 'Skip Duplicate', "Sets whether to skip duplicates or not. The default behavior is to skip duplicates. A duplicate message would have the Exchange property org.apache.camel.Exchange#DUPLICATE_MESSAGE set to a Boolean#TRUE value. A none duplicate message will not have this property set.", 'boolean', '', false, false, false, false),
        new PropertyMeta('steps', 'steps', "steps", 'array', '', false, false, true, true),
    ]),
    new ElementMeta('setProperty', 'Set Property', 'Sets a named property on the message exchange', 'null', [
        new PropertyMeta('expression', 'Expression', "Expression to return the value of the message exchange property", 'Expression', '', true, false, false, true),
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('name', 'Name', "Name of exchange property to set a new value. The simple language can be used to define a dynamic evaluated exchange property name to be used. Otherwise a constant name will be used.", 'string', '', true, false, false, false),
    ]),
    new ElementMeta('inOut', 'In Out', 'Marks the exchange pattern for the route to request/reply', 'null', [
        new PropertyMeta('inheritErrorHandler', 'inheritErrorHandler', "inheritErrorHandler", 'boolean', '', false, false, false, false),
        new PropertyMeta('parameters', 'parameters', "parameters", 'object', '', false, false, false, false),
        new PropertyMeta('uri', 'Uri', "Sets the uri of the endpoint to send to.", 'string', '', true, false, false, false),
    ]),
]
