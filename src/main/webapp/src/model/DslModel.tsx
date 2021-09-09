// To parse this data:
//
//   import { Convert } from "./file";
//
//   const dslModel = Convert.toDslModel(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface DslModelObject {
    beans?:         DslYamlDeserializersNamedBeanDefinition[];
    errorHandler?:  BuilderErrorHandlerBuilderRef;
    from?:          DslYamlDeserializersRouteFromDefinitionDeserializer;
    onException?:   ModelOnExceptionDefinition;
    rest?:          ModelRestRestDefinition;
    route?:         ModelRouteDefinition;
    routeTemplate?: ModelRouteTemplateDefinition;
    template?:      ModelRouteTemplateDefinition;
}

export interface DslYamlDeserializersNamedBeanDefinition {
    name:        string;
    properties?: { [key: string]: any };
    type:        string;
}

export interface BuilderErrorHandlerBuilderRef {
    deadLetterChannel?: BuilderDeadLetterChannelBuilderObject | string;
    log?:               BuilderDefaultErrorHandlerBuilder;
    none?:              { [key: string]: any };
    ref?:               string;
}

export interface BuilderDeadLetterChannelBuilderObject {
    asyncDelayedRedelivery?:       boolean;
    deadLetterHandleNewException?: boolean;
    useOriginalBody?:              boolean;
    useOriginalMessage?:           boolean;
}

export interface BuilderDefaultErrorHandlerBuilder {
    asyncDelayedRedelivery?:       boolean;
    deadLetterHandleNewException?: boolean;
    useOriginalBody?:              boolean;
    useOriginalMessage?:           boolean;
}

export interface DslYamlDeserializersRouteFromDefinitionDeserializer {
    parameters?: { [key: string]: any };
    steps:       ModelProcessorDefinition[];
    uri:         string;
}

export interface ModelWhenSkipSendToEndpointDefinition {
    expression?:                                            ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                                   boolean;
    steps?:                                                 ModelProcessorDefinition[];
    constant?:                                              ModelLanguageConstantExpressionObject | string;
    csimple?:                                               ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                            ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                                      ModelLanguageExchangePropertyExpressionObject | string;
    modelWhenSkipSendToEndpointDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                                ModelLanguageGroovyExpressionObject | string;
    header?:                                                ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                             ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                                  ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                              ModelLanguageJsonPathExpressionObject | string;
    language?:                                              ModelLanguageLanguageExpression;
    method?:                                                ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                                  ModelLanguageMvelExpressionObject | string;
    ognl?:                                                  ModelLanguageOgnlExpressionObject | string;
    ref?:                                                   ModelLanguageRefExpressionObject | string;
    simple?:                                                ModelLanguageSimpleExpressionObject | string;
    spel?:                                                  ModelLanguageSpElExpressionObject | string;
    tokenize?:                                              ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                                 ModelLanguageXPathExpressionObject | string;
    xquery?:                                                ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                             ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelTransactedDefinition {
    inheritErrorHandler?: boolean;
    ref?:                 string;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelStepDefinition {
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelSplitDefinition {
    delimiter?:                            string;
    executorServiceRef?:                   string;
    expression?:                           ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                  boolean;
    onPrepareRef?:                         string;
    parallelAggregate?:                    boolean;
    parallelProcessing?:                   boolean;
    shareUnitOfWork?:                      boolean;
    steps?:                                ModelProcessorDefinition[];
    stopOnAggregateException?:             boolean;
    stopOnException?:                      boolean;
    strategyMethodAllowNull?:              boolean;
    strategyMethodName?:                   string;
    strategyRef?:                          string;
    streaming?:                            boolean;
    timeout?:                              string;
    constant?:                             ModelLanguageConstantExpressionObject | string;
    csimple?:                              ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                           ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                     ModelLanguageExchangePropertyExpressionObject | string;
    modelSplitDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                               ModelLanguageGroovyExpressionObject | string;
    header?:                               ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                            ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                 ModelLanguageJoorExpressionObject | string;
    jsonpath?:                             ModelLanguageJsonPathExpressionObject | string;
    language?:                             ModelLanguageLanguageExpression;
    method?:                               ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                 ModelLanguageMvelExpressionObject | string;
    ognl?:                                 ModelLanguageOgnlExpressionObject | string;
    ref?:                                  ModelLanguageRefExpressionObject | string;
    simple?:                               ModelLanguageSimpleExpressionObject | string;
    spel?:                                 ModelLanguageSpElExpressionObject | string;
    tokenize?:                             ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                ModelLanguageXPathExpressionObject | string;
    xquery?:                               ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                            ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelSagaDefinition {
    compensation?:          ModelSagaActionUriDefinitionObject | string;
    completion?:            ModelSagaActionUriDefinitionObject | string;
    completionMode?:        string;
    inheritErrorHandler?:   boolean;
    option?:                ModelSagaOptionDefinition[];
    propagation?:           string;
    sagaServiceRef?:        string;
    steps?:                 ModelProcessorDefinition[];
    timeout?:               string;
    timeoutInMilliseconds?: number;
}

export interface ModelResequenceDefinition {
    batchConfig?:                               ModelConfigBatchResequencerConfig;
    expression:                                 ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                       boolean;
    steps?:                                     ModelProcessorDefinition[];
    streamConfig?:                              ModelConfigStreamResequencerConfig;
    constant?:                                  ModelLanguageConstantExpressionObject | string;
    csimple?:                                   ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                          ModelLanguageExchangePropertyExpressionObject | string;
    modelResequenceDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                    ModelLanguageGroovyExpressionObject | string;
    header?:                                    ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                 ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                      ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                  ModelLanguageJsonPathExpressionObject | string;
    language?:                                  ModelLanguageLanguageExpression;
    method?:                                    ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                      ModelLanguageMvelExpressionObject | string;
    ognl?:                                      ModelLanguageOgnlExpressionObject | string;
    ref?:                                       ModelLanguageRefExpressionObject | string;
    simple?:                                    ModelLanguageSimpleExpressionObject | string;
    spel?:                                      ModelLanguageSpElExpressionObject | string;
    tokenize?:                                  ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                     ModelLanguageXPathExpressionObject | string;
    xquery?:                                    ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                 ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelPolicyDefinition {
    inheritErrorHandler?: boolean;
    ref:                  string;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelPipelineDefinition {
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelOnCompletionDefinition {
    executorServiceRef?:  string;
    inheritErrorHandler?: boolean;
    mode?:                string;
    onCompleteOnly?:      boolean;
    onFailureOnly?:       boolean;
    onWhen?:              ModelWhenDefinition;
    parallelProcessing?:  boolean;
    steps?:               ModelProcessorDefinition[];
    useOriginalMessage?:  boolean;
}

export interface ModelMulticastDefinition {
    executorServiceRef?:       string;
    inheritErrorHandler?:      boolean;
    onPrepareRef?:             string;
    parallelAggregate?:        boolean;
    parallelProcessing?:       boolean;
    shareUnitOfWork?:          boolean;
    steps?:                    ModelProcessorDefinition[];
    stopOnAggregateException?: boolean;
    stopOnException?:          boolean;
    strategyMethodAllowNull?:  boolean;
    strategyMethodName?:       string;
    strategyRef?:              string;
    streaming?:                boolean;
    timeout?:                  string;
}

export interface ModelLoopDefinition {
    breakOnShutdown?:                     boolean;
    copy?:                                boolean;
    doWhile?:                             boolean;
    expression?:                          ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                 boolean;
    steps?:                               ModelProcessorDefinition[];
    constant?:                            ModelLanguageConstantExpressionObject | string;
    csimple?:                             ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                          ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                    ModelLanguageExchangePropertyExpressionObject | string;
    modelLoopDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                              ModelLanguageGroovyExpressionObject | string;
    header?:                              ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                           ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                ModelLanguageJoorExpressionObject | string;
    jsonpath?:                            ModelLanguageJsonPathExpressionObject | string;
    language?:                            ModelLanguageLanguageExpression;
    method?:                              ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                ModelLanguageMvelExpressionObject | string;
    ognl?:                                ModelLanguageOgnlExpressionObject | string;
    ref?:                                 ModelLanguageRefExpressionObject | string;
    simple?:                              ModelLanguageSimpleExpressionObject | string;
    spel?:                                ModelLanguageSpElExpressionObject | string;
    tokenize?:                            ModelLanguageTokenizerExpressionObject | string;
    xpath?:                               ModelLanguageXPathExpressionObject | string;
    xquery?:                              ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                           ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelLoadBalanceDefinition {
    customLoadBalancer?:  ModelLoadbalancerCustomLoadBalancerDefinitionObject | string;
    failover?:            ModelLoadbalancerFailoverLoadBalancerDefinition;
    inheritErrorHandler?: boolean;
    random?:              ModelLoadbalancerRandomLoadBalancerDefinition;
    roundRobin?:          ModelLoadbalancerRoundRobinLoadBalancerDefinition;
    steps?:               ModelProcessorDefinition[];
    sticky?:              ModelLoadbalancerStickyLoadBalancerDefinition;
    topic?:               ModelLoadbalancerTopicLoadBalancerDefinition;
    weighted?:            ModelLoadbalancerWeightedLoadBalancerDefinition;
}

export interface ModelKameletDefinitionObject {
    name:                 string;
    inheritErrorHandler?: boolean;
    parameters?:          { [key: string]: any };
    steps?:               ModelProcessorDefinition[];
}

export interface ModelInterceptSendToEndpointDefinitionObject {
    uri:                         string;
    afterUri?:                   string;
    inheritErrorHandler?:        boolean;
    skipSendToOriginalEndpoint?: string;
    steps?:                      ModelProcessorDefinition[];
}

export interface ModelInterceptFromDefinitionObject {
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
    uri?:                 string;
}

export interface ModelInterceptDefinition {
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelIdempotentConsumerDefinition {
    completionEager?:                                   string;
    eager?:                                             boolean;
    expression?:                                        ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                               boolean;
    messageIdRepositoryRef:                             string;
    removeOnFailure?:                                   boolean;
    skipDuplicate?:                                     boolean;
    steps?:                                             ModelProcessorDefinition[];
    constant?:                                          ModelLanguageConstantExpressionObject | string;
    csimple?:                                           ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                        ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                                  ModelLanguageExchangePropertyExpressionObject | string;
    modelIdempotentConsumerDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                            ModelLanguageGroovyExpressionObject | string;
    header?:                                            ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                         ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                              ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                          ModelLanguageJsonPathExpressionObject | string;
    language?:                                          ModelLanguageLanguageExpression;
    method?:                                            ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                              ModelLanguageMvelExpressionObject | string;
    ognl?:                                              ModelLanguageOgnlExpressionObject | string;
    ref?:                                               ModelLanguageRefExpressionObject | string;
    simple?:                                            ModelLanguageSimpleExpressionObject | string;
    spel?:                                              ModelLanguageSpElExpressionObject | string;
    tokenize?:                                          ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                             ModelLanguageXPathExpressionObject | string;
    xquery?:                                            ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                         ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelFilterDefinition {
    expression?:                            ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                   boolean;
    steps?:                                 ModelProcessorDefinition[];
    constant?:                              ModelLanguageConstantExpressionObject | string;
    csimple?:                               ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                            ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                      ModelLanguageExchangePropertyExpressionObject | string;
    modelFilterDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                ModelLanguageGroovyExpressionObject | string;
    header?:                                ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                             ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                  ModelLanguageJoorExpressionObject | string;
    jsonpath?:                              ModelLanguageJsonPathExpressionObject | string;
    language?:                              ModelLanguageLanguageExpression;
    method?:                                ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                  ModelLanguageMvelExpressionObject | string;
    ognl?:                                  ModelLanguageOgnlExpressionObject | string;
    ref?:                                   ModelLanguageRefExpressionObject | string;
    simple?:                                ModelLanguageSimpleExpressionObject | string;
    spel?:                                  ModelLanguageSpElExpressionObject | string;
    tokenize?:                              ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                 ModelLanguageXPathExpressionObject | string;
    xquery?:                                ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                             ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelTryDefinition {
    doCatch?:             ModelCatchDefinition[];
    doFinally?:           ModelFinallyDefinition;
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelFinallyDefinition {
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelCatchDefinition {
    exception?:           string[];
    inheritErrorHandler?: boolean;
    onWhen?:              ModelWhenDefinition;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelOnFallbackDefinition {
    fallbackViaNetwork?:  boolean;
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelCircuitBreakerDefinition {
    configurationRef?:            string;
    faultToleranceConfiguration?: ModelFaultToleranceConfigurationDefinition;
    hystrixConfiguration?:        ModelHystrixConfigurationDefinition;
    inheritErrorHandler?:         boolean;
    onFallback?:                  ModelOnFallbackDefinition;
    resilience4JConfiguration?:   ModelResilience4JConfigurationDefinition;
    steps?:                       ModelProcessorDefinition[];
}

export interface ModelWhenDefinition {
    expression?:                          ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                 boolean;
    steps?:                               ModelProcessorDefinition[];
    constant?:                            ModelLanguageConstantExpressionObject | string;
    csimple?:                             ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                          ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                    ModelLanguageExchangePropertyExpressionObject | string;
    modelWhenDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                              ModelLanguageGroovyExpressionObject | string;
    header?:                              ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                           ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                ModelLanguageJoorExpressionObject | string;
    jsonpath?:                            ModelLanguageJsonPathExpressionObject | string;
    language?:                            ModelLanguageLanguageExpression;
    method?:                              ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                ModelLanguageMvelExpressionObject | string;
    ognl?:                                ModelLanguageOgnlExpressionObject | string;
    ref?:                                 ModelLanguageRefExpressionObject | string;
    simple?:                              ModelLanguageSimpleExpressionObject | string;
    spel?:                                ModelLanguageSpElExpressionObject | string;
    tokenize?:                            ModelLanguageTokenizerExpressionObject | string;
    xpath?:                               ModelLanguageXPathExpressionObject | string;
    xquery?:                              ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                           ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelOtherwiseDefinition {
    inheritErrorHandler?: boolean;
    steps?:               ModelProcessorDefinition[];
}

export interface ModelChoiceDefinition {
    inheritErrorHandler?: boolean;
    otherwise?:           ModelOtherwiseDefinition;
    steps?:               ModelProcessorDefinition[];
    when?:                ModelWhenDefinition[];
}

export interface ModelAggregateDefinition {
    aggregateControllerRef?:           string;
    aggregationRepositoryRef?:         string;
    closeCorrelationKeyOnCompletion?:  number;
    completeAllOnStop?:                boolean;
    completionFromBatchConsumer?:      boolean;
    completionInterval?:               string;
    completionOnNewCorrelationGroup?:  boolean;
    completionPredicate?:              ModelExpressionSubElementDefinition;
    completionSize?:                   number;
    completionSizeExpression?:         ModelExpressionSubElementDefinition;
    completionTimeout?:                string;
    completionTimeoutCheckerInterval?: string;
    completionTimeoutExpression?:      ModelExpressionSubElementDefinition;
    correlationExpression?:            ModelExpressionSubElementDefinition;
    discardOnAggregationFailure?:      boolean;
    discardOnCompletionTimeout?:       boolean;
    eagerCheckCompletion?:             boolean;
    executorServiceRef?:               string;
    forceCompletionOnStop?:            boolean;
    ignoreInvalidCorrelationKeys?:     boolean;
    inheritErrorHandler?:              boolean;
    optimisticLockRetryPolicy?:        ModelOptimisticLockRetryPolicyDefinition;
    optimisticLocking?:                boolean;
    parallelProcessing?:               boolean;
    steps?:                            ModelProcessorDefinition[];
    strategyMethodAllowNull?:          boolean;
    strategyMethodName?:               string;
    strategyRef?:                      string;
    timeoutCheckerExecutorServiceRef?: string;
}

export interface ModelProcessorDefinition {
    aggregate?:               ModelAggregateDefinition;
    bean?:                    ModelBeanDefinitionObject | string;
    choice?:                  ModelChoiceDefinition;
    circuitBreaker?:          ModelCircuitBreakerDefinition;
    claimCheck?:              ModelClaimCheckDefinition;
    convertBodyTo?:           ModelConvertBodyDefinitionObject | string;
    delay?:                   ModelDelayDefinition;
    doCatch?:                 ModelCatchDefinition;
    doFinally?:               ModelFinallyDefinition;
    doTry?:                   ModelTryDefinition;
    dynamicRouter?:           ModelDynamicRouterDefinition;
    enrich?:                  ModelEnrichDefinition;
    filter?:                  ModelFilterDefinition;
    idempotentConsumer?:      ModelIdempotentConsumerDefinition;
    inOnly?:                  ModelInOnlyDefinitionObject | string;
    inOut?:                   ModelInOutDefinitionObject | string;
    intercept?:               ModelInterceptDefinition;
    interceptFrom?:           ModelInterceptFromDefinitionObject | string;
    interceptSendToEndpoint?: ModelInterceptSendToEndpointDefinitionObject | string;
    kamelet?:                 ModelKameletDefinitionObject | string;
    loadBalance?:             ModelLoadBalanceDefinition;
    log?:                     ModelLogDefinitionObject | string;
    loop?:                    ModelLoopDefinition;
    marshal?:                 ModelMarshalDefinition;
    multicast?:               ModelMulticastDefinition;
    onCompletion?:            ModelOnCompletionDefinition;
    onFallback?:              ModelOnFallbackDefinition;
    otherwise?:               ModelOtherwiseDefinition;
    pipeline?:                ModelPipelineDefinition;
    policy?:                  ModelPolicyDefinition;
    pollEnrich?:              ModelPollEnrichDefinition;
    process?:                 ModelProcessDefinition;
    recipientList?:           ModelRecipientListDefinition;
    removeHeader?:            ModelRemoveHeaderDefinitionObject | string;
    removeHeaders?:           ModelRemoveHeadersDefinitionObject | string;
    removeProperties?:        ModelRemovePropertiesDefinitionObject | string;
    removeProperty?:          ModelRemovePropertyDefinitionObject | string;
    resequence?:              ModelResequenceDefinition;
    rollback?:                ModelRollbackDefinitionObject | string;
    routingSlip?:             ModelRoutingSlipDefinition;
    saga?:                    ModelSagaDefinition;
    sample?:                  ModelSamplingDefinition;
    script?:                  ModelScriptDefinition;
    serviceCall?:             ModelCloudServiceCallDefinitionObject | string;
    setBody?:                 ModelSetBodyDefinition;
    setExchangePattern?:      ModelSetExchangePatternDefinitionObject | string;
    setHeader?:               ModelSetHeaderDefinition;
    setProperty?:             ModelSetPropertyDefinition;
    sort?:                    ModelSortDefinition;
    split?:                   ModelSplitDefinition;
    step?:                    ModelStepDefinition;
    stop?:                    ModelStopDefinition;
    threads?:                 ModelThreadsDefinition;
    throttle?:                ModelThrottleDefinition;
    throwException?:          ModelThrowExceptionDefinition;
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    tod?:                     ModelToDynamicDefinitionObject | string;
    transacted?:              ModelTransactedDefinition;
    transform?:               ModelTransformDefinition;
    unmarshal?:               ModelUnmarshalDefinition;
    validate?:                ModelValidateDefinition;
    when?:                    ModelWhenDefinition;
    whenSkipSendToEndpoint?:  ModelWhenSkipSendToEndpointDefinition;
    wireTap?:                 ModelWireTapDefinition;
}

export interface ModelLanguageConstantExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageCSimpleExpressionObject {
    expression:  string;
    id?:         string;
    resultType?: string;
    trim?:       boolean;
}

export interface ModelLanguageDatasonnetExpressionObject {
    expression:       string;
    bodyMediaType?:   string;
    id?:              string;
    outputMediaType?: string;
    resultType?:      string;
    trim?:            boolean;
}

export interface ModelLanguageExchangePropertyExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageExpressionDefinition {
    constant?:                                          ModelLanguageConstantExpressionObject | string;
    csimple?:                                           ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                        ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                                  ModelLanguageExchangePropertyExpressionObject | string;
    modelLanguageExpressionDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                            ModelLanguageGroovyExpressionObject | string;
    header?:                                            ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                         ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                              ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                          ModelLanguageJsonPathExpressionObject | string;
    language?:                                          ModelLanguageLanguageExpression;
    method?:                                            ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                              ModelLanguageMvelExpressionObject | string;
    ognl?:                                              ModelLanguageOgnlExpressionObject | string;
    ref?:                                               ModelLanguageRefExpressionObject | string;
    simple?:                                            ModelLanguageSimpleExpressionObject | string;
    spel?:                                              ModelLanguageSpElExpressionObject | string;
    tokenize?:                                          ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                             ModelLanguageXPathExpressionObject | string;
    xquery?:                                            ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                         ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelLanguageGroovyExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageHeaderExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageHl7TerserExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageJoorExpressionObject {
    expression:    string;
    id?:           string;
    preCompile?:   boolean;
    resultType?:   string;
    singleQuotes?: boolean;
    trim?:         boolean;
}

export interface ModelLanguageJsonPathExpressionObject {
    expression:          string;
    allowEasyPredicate?: boolean;
    allowSimple?:        boolean;
    headerName?:         string;
    id?:                 string;
    option?:             string;
    resultType?:         string;
    suppressExceptions?: boolean;
    trim?:               boolean;
    writeAsString?:      boolean;
}

export interface ModelLanguageLanguageExpression {
    expression: string;
    id?:        string;
    language:   string;
    trim?:      boolean;
}

export interface ModelLanguageMethodCallExpressionObject {
    expression: string;
    beanType?:  string;
    id?:        string;
    method?:    string;
    ref?:       string;
    scope?:     string;
    trim?:      boolean;
}

export interface ModelLanguageMvelExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageOgnlExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageRefExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageSimpleExpressionObject {
    expression:  string;
    id?:         string;
    resultType?: string;
    trim?:       boolean;
}

export interface ModelLanguageSpElExpressionObject {
    expression: string;
    id?:        string;
    trim?:      boolean;
}

export interface ModelLanguageTokenizerExpressionObject {
    expression:               string;
    token:                    string;
    endToken?:                string;
    group?:                   string;
    groupDelimiter?:          string;
    headerName?:              string;
    id?:                      string;
    includeTokens?:           boolean;
    inheritNamespaceTagName?: string;
    regex?:                   boolean;
    skipFirst?:               boolean;
    trim?:                    boolean;
    xml?:                     boolean;
}

export interface ModelLanguageXPathExpressionObject {
    expression:     string;
    documentType?:  string;
    factoryRef?:    string;
    headerName?:    string;
    id?:            string;
    logNamespaces?: boolean;
    objectModel?:   string;
    preCompile?:    boolean;
    resultType?:    string;
    saxon?:         boolean;
    threadSafety?:  boolean;
    trim?:          boolean;
}

export interface ModelLanguageXQueryExpressionObject {
    expression:        string;
    configurationRef?: string;
    headerName?:       string;
    id?:               string;
    trim?:             boolean;
    type?:             string;
}

export interface ModelLanguageXmlTokenizerExpressionObject {
    expression:  string;
    group?:      number;
    headerName?: string;
    id?:         string;
    mode?:       string;
    trim?:       boolean;
}

export interface ModelSagaActionUriDefinitionObject {
    uri:                  string;
    inheritErrorHandler?: boolean;
    parameters?:          { [key: string]: any };
}

export interface ModelSagaOptionDefinition {
    expression?:                                ModelLanguageExpressionDefinition;
    optionName:                                 string;
    constant?:                                  ModelLanguageConstantExpressionObject | string;
    csimple?:                                   ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                          ModelLanguageExchangePropertyExpressionObject | string;
    modelSagaOptionDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                    ModelLanguageGroovyExpressionObject | string;
    header?:                                    ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                 ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                      ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                  ModelLanguageJsonPathExpressionObject | string;
    language?:                                  ModelLanguageLanguageExpression;
    method?:                                    ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                      ModelLanguageMvelExpressionObject | string;
    ognl?:                                      ModelLanguageOgnlExpressionObject | string;
    ref?:                                       ModelLanguageRefExpressionObject | string;
    simple?:                                    ModelLanguageSimpleExpressionObject | string;
    spel?:                                      ModelLanguageSpElExpressionObject | string;
    tokenize?:                                  ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                     ModelLanguageXPathExpressionObject | string;
    xquery?:                                    ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                 ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelConfigBatchResequencerConfig {
    allowDuplicates?:        boolean;
    batchSize?:              number;
    batchTimeout?:           string;
    ignoreInvalidExchanges?: boolean;
    reverse?:                boolean;
}

export interface ModelConfigStreamResequencerConfig {
    capacity?:                number;
    comparatorRef?:           string;
    deliveryAttemptInterval?: string;
    ignoreInvalidExchanges?:  boolean;
    rejectOld?:               boolean;
    timeout?:                 string;
}

export interface ModelLoadbalancerCustomLoadBalancerDefinitionObject {
    ref: string;
    id?: string;
}

export interface ModelLoadbalancerFailoverLoadBalancerDefinition {
    exception?:               string[];
    id?:                      string;
    maximumFailoverAttempts?: string;
    roundRobin?:              string;
    sticky?:                  string;
}

export interface ModelLoadbalancerRandomLoadBalancerDefinition {
    id?: string;
}

export interface ModelLoadbalancerRoundRobinLoadBalancerDefinition {
    id?: string;
}

export interface ModelLoadbalancerStickyLoadBalancerDefinition {
    correlationExpression?: ModelExpressionSubElementDefinition;
    id?:                    string;
}

export interface ModelExpressionSubElementDefinition {
    constant?:                                            ModelLanguageConstantExpressionObject | string;
    csimple?:                                             ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                          ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                                    ModelLanguageExchangePropertyExpressionObject | string;
    modelExpressionSubElementDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                              ModelLanguageGroovyExpressionObject | string;
    header?:                                              ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                           ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                                ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                            ModelLanguageJsonPathExpressionObject | string;
    language?:                                            ModelLanguageLanguageExpression;
    method?:                                              ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                                ModelLanguageMvelExpressionObject | string;
    ognl?:                                                ModelLanguageOgnlExpressionObject | string;
    ref?:                                                 ModelLanguageRefExpressionObject | string;
    simple?:                                              ModelLanguageSimpleExpressionObject | string;
    spel?:                                                ModelLanguageSpElExpressionObject | string;
    tokenize?:                                            ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                               ModelLanguageXPathExpressionObject | string;
    xquery?:                                              ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                           ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelLoadbalancerTopicLoadBalancerDefinition {
    id?: string;
}

export interface ModelLoadbalancerWeightedLoadBalancerDefinition {
    distributionRatio:           string;
    distributionRatioDelimiter?: string;
    id?:                         string;
    roundRobin?:                 string;
}

export interface ModelFaultToleranceConfigurationDefinition {
    bulkheadEnabled?:                    boolean;
    bulkheadExecutorServiceRef?:         string;
    bulkheadMaxConcurrentCalls?:         number;
    bulkheadWaitingTaskQueue?:           number;
    circuitBreakerRef?:                  string;
    delay?:                              string;
    failureRatio?:                       number;
    id?:                                 string;
    requestVolumeThreshold?:             number;
    successThreshold?:                   number;
    timeoutDuration?:                    string;
    timeoutEnabled?:                     boolean;
    timeoutPoolSize?:                    number;
    timeoutScheduledExecutorServiceRef?: string;
}

export interface ModelHystrixConfigurationDefinition {
    allowMaximumSizeToDivergeFromCoreSize?:                  boolean;
    circuitBreakerEnabled?:                                  boolean;
    circuitBreakerErrorThresholdPercentage?:                 number;
    circuitBreakerForceClosed?:                              boolean;
    circuitBreakerForceOpen?:                                boolean;
    circuitBreakerRequestVolumeThreshold?:                   number;
    circuitBreakerSleepWindowInMilliseconds?:                number;
    corePoolSize?:                                           number;
    executionIsolationSemaphoreMaxConcurrentRequests?:       number;
    executionIsolationStrategy?:                             string;
    executionIsolationThreadInterruptOnTimeout?:             boolean;
    executionTimeoutEnabled?:                                boolean;
    executionTimeoutInMilliseconds?:                         number;
    fallbackEnabled?:                                        boolean;
    fallbackIsolationSemaphoreMaxConcurrentRequests?:        number;
    groupKey?:                                               string;
    id?:                                                     string;
    keepAliveTime?:                                          number;
    maxQueueSize?:                                           number;
    maximumSize?:                                            number;
    metricsHealthSnapshotIntervalInMilliseconds?:            number;
    metricsRollingPercentileBucketSize?:                     number;
    metricsRollingPercentileEnabled?:                        boolean;
    metricsRollingPercentileWindowBuckets?:                  number;
    metricsRollingPercentileWindowInMilliseconds?:           number;
    metricsRollingStatisticalWindowBuckets?:                 number;
    metricsRollingStatisticalWindowInMilliseconds?:          number;
    queueSizeRejectionThreshold?:                            number;
    requestLogEnabled?:                                      boolean;
    threadPoolKey?:                                          string;
    threadPoolRollingNumberStatisticalWindowBuckets?:        number;
    threadPoolRollingNumberStatisticalWindowInMilliseconds?: number;
}

export interface ModelResilience4JConfigurationDefinition {
    automaticTransitionFromOpenToHalfOpenEnabled?: boolean;
    circuitBreakerRef?:                            string;
    configRef?:                                    string;
    failureRateThreshold?:                         number;
    id?:                                           string;
    minimumNumberOfCalls?:                         number;
    permittedNumberOfCallsInHalfOpenState?:        number;
    slidingWindowSize?:                            number;
    slidingWindowType?:                            string;
    slowCallDurationThreshold?:                    number;
    slowCallRateThreshold?:                        number;
    waitDurationInOpenState?:                      number;
    writableStackTraceEnabled?:                    boolean;
}

export interface ModelOptimisticLockRetryPolicyDefinition {
    exponentialBackOff?: boolean;
    maximumRetries?:     number;
    maximumRetryDelay?:  string;
    randomBackOff?:      boolean;
    retryDelay?:         string;
}

export interface ModelBeanDefinitionObject {
    beanType?:            string;
    cache?:               boolean;
    inheritErrorHandler?: boolean;
    method?:              string;
    ref?:                 string;
    scope?:               string;
}

export interface ModelClaimCheckDefinition {
    filter?:              string;
    inheritErrorHandler?: boolean;
    key?:                 string;
    operation:            string;
    strategyMethodName?:  string;
    strategyRef?:         string;
}

export interface ModelConvertBodyDefinitionObject {
    type:                 string;
    charset?:             string;
    inheritErrorHandler?: boolean;
    mandatory?:           boolean;
}

export interface ModelDelayDefinition {
    asyncDelayed?:                         boolean;
    callerRunsWhenRejected?:               boolean;
    executorServiceRef?:                   string;
    expression?:                           ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                  boolean;
    constant?:                             ModelLanguageConstantExpressionObject | string;
    csimple?:                              ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                           ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                     ModelLanguageExchangePropertyExpressionObject | string;
    modelDelayDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                               ModelLanguageGroovyExpressionObject | string;
    header?:                               ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                            ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                 ModelLanguageJoorExpressionObject | string;
    jsonpath?:                             ModelLanguageJsonPathExpressionObject | string;
    language?:                             ModelLanguageLanguageExpression;
    method?:                               ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                 ModelLanguageMvelExpressionObject | string;
    ognl?:                                 ModelLanguageOgnlExpressionObject | string;
    ref?:                                  ModelLanguageRefExpressionObject | string;
    simple?:                               ModelLanguageSimpleExpressionObject | string;
    spel?:                                 ModelLanguageSpElExpressionObject | string;
    tokenize?:                             ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                ModelLanguageXPathExpressionObject | string;
    xquery?:                               ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                            ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelDynamicRouterDefinition {
    cacheSize?:                                    number;
    expression?:                                   ModelLanguageExpressionDefinition;
    ignoreInvalidEndpoints?:                       boolean;
    inheritErrorHandler?:                          boolean;
    uriDelimiter?:                                 string;
    constant?:                                     ModelLanguageConstantExpressionObject | string;
    csimple?:                                      ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                   ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                             ModelLanguageExchangePropertyExpressionObject | string;
    modelDynamicRouterDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                       ModelLanguageGroovyExpressionObject | string;
    header?:                                       ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                    ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                         ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                     ModelLanguageJsonPathExpressionObject | string;
    language?:                                     ModelLanguageLanguageExpression;
    method?:                                       ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                         ModelLanguageMvelExpressionObject | string;
    ognl?:                                         ModelLanguageOgnlExpressionObject | string;
    ref?:                                          ModelLanguageRefExpressionObject | string;
    simple?:                                       ModelLanguageSimpleExpressionObject | string;
    spel?:                                         ModelLanguageSpElExpressionObject | string;
    tokenize?:                                     ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                        ModelLanguageXPathExpressionObject | string;
    xquery?:                                       ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                    ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelEnrichDefinition {
    aggregateOnException?:                  boolean;
    allowOptimisedComponents?:              boolean;
    cacheSize?:                             number;
    expression?:                            ModelLanguageExpressionDefinition;
    ignoreInvalidEndpoint?:                 boolean;
    inheritErrorHandler?:                   boolean;
    shareUnitOfWork?:                       boolean;
    strategyMethodAllowNull?:               string;
    strategyMethodName?:                    string;
    strategyRef?:                           string;
    constant?:                              ModelLanguageConstantExpressionObject | string;
    csimple?:                               ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                            ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                      ModelLanguageExchangePropertyExpressionObject | string;
    modelEnrichDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                ModelLanguageGroovyExpressionObject | string;
    header?:                                ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                             ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                  ModelLanguageJoorExpressionObject | string;
    jsonpath?:                              ModelLanguageJsonPathExpressionObject | string;
    language?:                              ModelLanguageLanguageExpression;
    method?:                                ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                  ModelLanguageMvelExpressionObject | string;
    ognl?:                                  ModelLanguageOgnlExpressionObject | string;
    ref?:                                   ModelLanguageRefExpressionObject | string;
    simple?:                                ModelLanguageSimpleExpressionObject | string;
    spel?:                                  ModelLanguageSpElExpressionObject | string;
    tokenize?:                              ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                 ModelLanguageXPathExpressionObject | string;
    xquery?:                                ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                             ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelInOnlyDefinitionObject {
    uri:                  string;
    inheritErrorHandler?: boolean;
    parameters?:          { [key: string]: any };
}

export interface ModelInOutDefinitionObject {
    uri:                  string;
    inheritErrorHandler?: boolean;
    parameters?:          { [key: string]: any };
}

export interface ModelLogDefinitionObject {
    message:              string;
    inheritErrorHandler?: boolean;
    logName?:             string;
    loggerRef?:           string;
    loggingLevel?:        string;
    marker?:              string;
}

export interface ModelMarshalDefinition {
    any23?:               ModelDataformatAny23DataFormatObject | string;
    asn1?:                ModelDataformatAsn1DataFormatObject | string;
    avro?:                ModelDataformatAvroDataFormatObject | string;
    barcode?:             ModelDataformatBarcodeDataFormat;
    base64?:              ModelDataformatBase64DataFormat;
    beanio?:              ModelDataformatBeanioDataFormat;
    bindy?:               ModelDataformatBindyDataFormat;
    cbor?:                ModelDataformatCborDataFormat;
    crypto?:              ModelDataformatCryptoDataFormat;
    csv?:                 ModelDataformatCsvDataFormatObject | string;
    custom?:              ModelDataformatCustomDataFormatObject | string;
    fhirJson?:            ModelDataformatFhirJsonDataFormat;
    fhirXml?:             ModelDataformatFhirXmlDataFormat;
    flatpack?:            ModelDataformatFlatpackDataFormat;
    grok?:                ModelDataformatGrokDataFormat;
    gzip?:                ModelDataformatGzipDataFormat;
    hl7?:                 ModelDataformatHl7DataFormat;
    ical?:                ModelDataformatIcalDataFormat;
    inheritErrorHandler?: boolean;
    jacksonxml?:          ModelDataformatJacksonXmlDataFormat;
    jaxb?:                ModelDataformatJaxbDataFormat;
    json?:                ModelDataformatJsonDataFormat;
    jsonApi?:             ModelDataformatJsonApiDataFormat;
    lzf?:                 ModelDataformatLzfDataFormat;
    mimeMultipart?:       ModelDataformatMimeMultipartDataFormat;
    pgp?:                 ModelDataformatPgpDataFormat;
    protobuf?:            ModelDataformatProtobufDataFormatObject | string;
    rss?:                 ModelDataformatRssDataFormat;
    secureXml?:           ModelDataformatXmlSecurityDataFormat;
    soapjaxb?:            ModelDataformatSoapJaxbDataFormatObject | string;
    syslog?:              ModelDataformatSyslogDataFormat;
    tarfile?:             ModelDataformatTarFileDataFormat;
    thrift?:              ModelDataformatThriftDataFormatObject | string;
    tidyMarkup?:          ModelDataformatTidyMarkupDataFormat;
    univocityCsv?:        ModelDataformatUniVocityCsvDataFormat;
    univocityFixed?:      ModelDataformatUniVocityFixedWidthDataFormat;
    univocityTsv?:        ModelDataformatUniVocityTsvDataFormat;
    xmlrpc?:              ModelDataformatXmlRpcDataFormat;
    xstream?:             ModelDataformatXStreamDataFormatObject | string;
    yaml?:                ModelDataformatYamlDataFormat;
    zip?:                 ModelDataformatZipDeflaterDataFormat;
    zipfile?:             ModelDataformatZipFileDataFormat;
}

export interface ModelDataformatAny23DataFormatObject {
    baseUri?:       string;
    configuration?: ModelPropertyDefinition[];
    extractors?:    string[];
    id?:            string;
    outputFormat?:  string;
}

export interface ModelPropertyDefinition {
    key:   string;
    value: string;
}

export interface ModelDataformatAsn1DataFormatObject {
    id?:            string;
    unmarshalType?: string;
    usingIterator?: boolean;
}

export interface ModelDataformatAvroDataFormatObject {
    allowJmsType?:               boolean;
    allowUnmarshallType?:        boolean;
    autoDiscoverObjectMapper?:   boolean;
    autoDiscoverSchemaResolver?: boolean;
    collectionType?:             string;
    contentTypeHeader?:          boolean;
    disableFeatures?:            string;
    enableFeatures?:             string;
    id?:                         string;
    include?:                    string;
    instanceClassName?:          string;
    jsonView?:                   string;
    library?:                    ModelDataformatAvroDataFormatLibrary;
    moduleClassNames?:           string;
    moduleRefs?:                 string;
    objectMapper?:               string;
    schemaResolver?:             string;
    timezone?:                   string;
    unmarshalType?:              string;
    useDefaultObjectMapper?:     boolean;
    useList?:                    boolean;
}

export enum ModelDataformatAvroDataFormatLibrary {
    ApacheAvro = "ApacheAvro",
    DataFormatName = "dataFormatName",
    Jackson = "Jackson",
}

export interface ModelDataformatBarcodeDataFormat {
    barcodeFormat?: string;
    height?:        number;
    id?:            string;
    imageType?:     string;
    width?:         number;
}

export interface ModelDataformatBase64DataFormat {
    id?:            string;
    lineLength?:    number;
    lineSeparator?: string;
    urlSafe?:       boolean;
}

export interface ModelDataformatBeanioDataFormat {
    beanReaderErrorHandlerType?: string;
    encoding?:                   string;
    id?:                         string;
    ignoreInvalidRecords?:       boolean;
    ignoreUnexpectedRecords?:    boolean;
    ignoreUnidentifiedRecords?:  boolean;
    mapping:                     string;
    streamName:                  string;
    unmarshalSingleObject?:      boolean;
}

export interface ModelDataformatBindyDataFormat {
    allowEmptyStream?:     boolean;
    classType?:            string;
    id?:                   string;
    locale?:               string;
    type:                  string;
    unwrapSingleInstance?: boolean;
}

export interface ModelDataformatCborDataFormat {
    allowJmsType?:           boolean;
    allowUnmarshallType?:    boolean;
    collectionType?:         string;
    disableFeatures?:        string;
    enableFeatures?:         string;
    id?:                     string;
    objectMapper?:           string;
    prettyPrint?:            boolean;
    unmarshalType?:          string;
    useDefaultObjectMapper?: boolean;
    useList?:                boolean;
}

export interface ModelDataformatCryptoDataFormat {
    algorithm?:             string;
    algorithmParameterRef?: string;
    buffersize?:            number;
    cryptoProvider?:        string;
    id?:                    string;
    initVectorRef?:         string;
    inline?:                boolean;
    keyRef?:                string;
    macAlgorithm?:          string;
    shouldAppendHmac?:      boolean;
}

export interface ModelDataformatCsvDataFormatObject {
    allowMissingColumnNames?: boolean;
    captureHeaderRecord?:     boolean;
    commentMarker?:           string;
    commentMarkerDisabled?:   boolean;
    delimiter?:               string;
    escape?:                  string;
    escapeDisabled?:          boolean;
    formatName?:              string;
    formatRef?:               string;
    header?:                  string[];
    headerDisabled?:          boolean;
    id?:                      string;
    ignoreEmptyLines?:        boolean;
    ignoreHeaderCase?:        boolean;
    ignoreSurroundingSpaces?: boolean;
    lazyLoad?:                boolean;
    marshallerFactoryRef?:    string;
    nullString?:              string;
    nullStringDisabled?:      boolean;
    quote?:                   string;
    quoteDisabled?:           boolean;
    quoteMode?:               string;
    recordConverterRef?:      string;
    recordSeparator?:         string;
    recordSeparatorDisabled?: string;
    skipHeaderRecord?:        boolean;
    trailingDelimiter?:       boolean;
    trim?:                    boolean;
    useMaps?:                 boolean;
    useOrderedMaps?:          boolean;
}

export interface ModelDataformatCustomDataFormatObject {
    ref: string;
    id?: string;
}

export interface ModelDataformatFhirJsonDataFormat {
    contentTypeHeader?:                         boolean;
    dontEncodeElements?:                        string[];
    dontStripVersionsFromReferencesAtPaths?:    string[];
    encodeElements?:                            string[];
    encodeElementsAppliesToChildResourcesOnly?: boolean;
    fhirVersion?:                               string;
    id?:                                        string;
    omitResourceId?:                            boolean;
    overrideResourceIdWithBundleEntryFullUrl?:  boolean;
    prettyPrint?:                               boolean;
    serverBaseUrl?:                             string;
    stripVersionsFromReferences?:               boolean;
    summaryMode?:                               boolean;
    suppressNarratives?:                        boolean;
}

export interface ModelDataformatFhirXmlDataFormat {
    contentTypeHeader?:                         boolean;
    dontEncodeElements?:                        string[];
    dontStripVersionsFromReferencesAtPaths?:    string[];
    encodeElements?:                            string[];
    encodeElementsAppliesToChildResourcesOnly?: boolean;
    fhirVersion?:                               string;
    id?:                                        string;
    omitResourceId?:                            boolean;
    overrideResourceIdWithBundleEntryFullUrl?:  boolean;
    prettyPrint?:                               boolean;
    serverBaseUrl?:                             string;
    stripVersionsFromReferences?:               boolean;
    summaryMode?:                               boolean;
    suppressNarratives?:                        boolean;
}

export interface ModelDataformatFlatpackDataFormat {
    allowShortLines?:    boolean;
    definition?:         string;
    delimiter?:          string;
    fixed?:              boolean;
    id?:                 string;
    ignoreExtraColumns?: boolean;
    ignoreFirstRecord?:  boolean;
    parserFactoryRef?:   string;
    textQualifier?:      string;
}

export interface ModelDataformatGrokDataFormat {
    allowMultipleMatchesPerLine?: boolean;
    flattened?:                   boolean;
    id?:                          string;
    namedOnly?:                   boolean;
    pattern:                      string;
}

export interface ModelDataformatGzipDataFormat {
    id?: string;
}

export interface ModelDataformatHl7DataFormat {
    id?:       string;
    validate?: boolean;
}

export interface ModelDataformatIcalDataFormat {
    id?:         string;
    validating?: boolean;
}

export interface ModelDataformatJacksonXmlDataFormat {
    allowJmsType?:               boolean;
    allowUnmarshallType?:        boolean;
    collectionType?:             string;
    contentTypeHeader?:          boolean;
    disableFeatures?:            string;
    enableFeatures?:             string;
    enableJaxbAnnotationModule?: boolean;
    id?:                         string;
    include?:                    string;
    jsonView?:                   string;
    moduleClassNames?:           string;
    moduleRefs?:                 string;
    prettyPrint?:                boolean;
    unmarshalType?:              string;
    useList?:                    boolean;
    xmlMapper?:                  string;
}

export interface ModelDataformatJaxbDataFormat {
    contentTypeHeader?:         boolean;
    contextPath:                string;
    contextPathIsClassName?:    boolean;
    encoding?:                  string;
    filterNonXmlChars?:         boolean;
    fragment?:                  boolean;
    id?:                        string;
    ignoreJaxbElement?:         boolean;
    jaxbProviderProperties?:    string;
    mustBeJaxbElement?:         boolean;
    namespacePrefixRef?:        string;
    noNamespaceSchemaLocation?: string;
    objectFactory?:             boolean;
    partClass?:                 string;
    partNamespace?:             string;
    prettyPrint?:               boolean;
    schema?:                    string;
    schemaLocation?:            string;
    schemaSeverityLevel?:       number;
    xmlStreamWriterWrapper?:    string;
}

export interface ModelDataformatJsonDataFormat {
    allowJmsType?:               boolean;
    allowUnmarshallType?:        boolean;
    autoDiscoverObjectMapper?:   boolean;
    autoDiscoverSchemaResolver?: boolean;
    collectionType?:             string;
    contentTypeHeader?:          boolean;
    disableFeatures?:            string;
    dropRootNode?:               boolean;
    enableFeatures?:             string;
    id?:                         string;
    include?:                    string;
    jsonView?:                   string;
    library?:                    JsonLibrary;
    moduleClassNames?:           string;
    moduleRefs?:                 string;
    objectMapper?:               string;
    permissions?:                string;
    prettyPrint?:                boolean;
    schemaResolver?:             string;
    timezone?:                   string;
    unmarshalType?:              string;
    useDefaultObjectMapper?:     boolean;
    useList?:                    boolean;
}

export enum JsonLibrary {
    Fastjson = "Fastjson",
    Gson = "Gson",
    Jackson = "Jackson",
    Johnzon = "Johnzon",
    Jsonb = "Jsonb",
    XStream = "XStream",
}

export interface ModelDataformatJsonApiDataFormat {
    id?:             string;
    mainFormatType?: string;
}

export interface ModelDataformatLzfDataFormat {
    id?:                       string;
    usingParallelCompression?: boolean;
}

export interface ModelDataformatMimeMultipartDataFormat {
    binaryContent?:              boolean;
    headersInline?:              boolean;
    id?:                         string;
    includeHeaders?:             string;
    multipartSubType?:           string;
    multipartWithoutAttachment?: boolean;
}

export interface ModelDataformatPgpDataFormat {
    algorithm?:                   number;
    armored?:                     boolean;
    compressionAlgorithm?:        number;
    hashAlgorithm?:               number;
    id?:                          string;
    integrity?:                   boolean;
    keyFileName?:                 string;
    keyUserid?:                   string;
    password?:                    string;
    provider?:                    string;
    signatureKeyFileName?:        string;
    signatureKeyRing?:            string;
    signatureKeyUserid?:          string;
    signaturePassword?:           string;
    signatureVerificationOption?: string;
}

export interface ModelDataformatProtobufDataFormatObject {
    allowJmsType?:               boolean;
    allowUnmarshallType?:        boolean;
    autoDiscoverObjectMapper?:   boolean;
    autoDiscoverSchemaResolver?: boolean;
    collectionType?:             string;
    contentTypeFormat?:          string;
    contentTypeHeader?:          boolean;
    disableFeatures?:            string;
    enableFeatures?:             string;
    id?:                         string;
    include?:                    string;
    instanceClass?:              string;
    jsonView?:                   string;
    library?:                    ModelDataformatProtobufDataFormatLibrary;
    moduleClassNames?:           string;
    moduleRefs?:                 string;
    objectMapper?:               string;
    schemaResolver?:             string;
    timezone?:                   string;
    unmarshalType?:              string;
    useDefaultObjectMapper?:     boolean;
    useList?:                    boolean;
}

export enum ModelDataformatProtobufDataFormatLibrary {
    DataFormatName = "dataFormatName",
    GoogleProtobuf = "GoogleProtobuf",
    Jackson = "Jackson",
}

export interface ModelDataformatRssDataFormat {
    id?: string;
}

export interface ModelDataformatXmlSecurityDataFormat {
    addKeyValueForEncryptedKey?:   boolean;
    digestAlgorithm?:              string;
    id?:                           string;
    keyCipherAlgorithm?:           string;
    keyOrTrustStoreParametersRef?: string;
    keyPassword?:                  string;
    mgfAlgorithm?:                 string;
    passPhrase?:                   string;
    passPhraseByte?:               string;
    recipientKeyAlias?:            string;
    secureTag?:                    string;
    secureTagContents?:            boolean;
    xmlCipherAlgorithm?:           string;
}

export interface ModelDataformatSoapJaxbDataFormatObject {
    contextPath:             string;
    elementNameStrategyRef?: string;
    encoding?:               string;
    id?:                     string;
    namespacePrefixRef?:     string;
    schema?:                 string;
    version?:                string;
}

export interface ModelDataformatSyslogDataFormat {
    id?: string;
}

export interface ModelDataformatTarFileDataFormat {
    allowEmptyDirectory?:  boolean;
    id?:                   string;
    maxDecompressedSize?:  number;
    preservePathElements?: boolean;
    usingIterator?:        boolean;
}

export interface ModelDataformatThriftDataFormatObject {
    contentTypeFormat?: string;
    contentTypeHeader?: boolean;
    id?:                string;
    instanceClass?:     string;
}

export interface ModelDataformatTidyMarkupDataFormat {
    dataObjectType?:     string;
    id?:                 string;
    omitXmlDeclaration?: boolean;
}

export interface ModelDataformatUniVocityCsvDataFormat {
    asMap?:                     boolean;
    comment?:                   string;
    delimiter?:                 string;
    emptyValue?:                string;
    headerExtractionEnabled?:   boolean;
    headersDisabled?:           boolean;
    id?:                        string;
    ignoreLeadingWhitespaces?:  boolean;
    ignoreTrailingWhitespaces?: boolean;
    lazyLoad?:                  boolean;
    lineSeparator?:             string;
    normalizedLineSeparator?:   string;
    nullValue?:                 string;
    numberOfRecordsToRead?:     number;
    quote?:                     string;
    quoteAllFields?:            boolean;
    quoteEscape?:               string;
    skipEmptyLines?:            boolean;
    univocityHeader?:           ModelDataformatUniVocityHeader[];
}

export interface ModelDataformatUniVocityHeader {
    length?: string;
    name?:   string;
}

export interface ModelDataformatUniVocityFixedWidthDataFormat {
    asMap?:                         boolean;
    comment?:                       string;
    emptyValue?:                    string;
    headerExtractionEnabled?:       boolean;
    headersDisabled?:               boolean;
    id?:                            string;
    ignoreLeadingWhitespaces?:      boolean;
    ignoreTrailingWhitespaces?:     boolean;
    lazyLoad?:                      boolean;
    lineSeparator?:                 string;
    normalizedLineSeparator?:       string;
    nullValue?:                     string;
    numberOfRecordsToRead?:         number;
    padding?:                       string;
    recordEndsOnNewline?:           boolean;
    skipEmptyLines?:                boolean;
    skipTrailingCharsUntilNewline?: boolean;
    univocityHeader?:               ModelDataformatUniVocityHeader[];
}

export interface ModelDataformatUniVocityTsvDataFormat {
    asMap?:                     boolean;
    comment?:                   string;
    emptyValue?:                string;
    escapeChar?:                string;
    headerExtractionEnabled?:   boolean;
    headersDisabled?:           boolean;
    id?:                        string;
    ignoreLeadingWhitespaces?:  boolean;
    ignoreTrailingWhitespaces?: boolean;
    lazyLoad?:                  boolean;
    lineSeparator?:             string;
    normalizedLineSeparator?:   string;
    nullValue?:                 string;
    numberOfRecordsToRead?:     number;
    skipEmptyLines?:            boolean;
    univocityHeader?:           ModelDataformatUniVocityHeader[];
}

export interface ModelDataformatXmlRpcDataFormat {
    id?:      string;
    request?: boolean;
}

export interface ModelDataformatXStreamDataFormatObject {
    aliases?:             ModelPropertyDefinition[];
    contentTypeHeader?:   boolean;
    converters?:          ModelPropertyDefinition[];
    driver?:              string;
    driverRef?:           string;
    encoding?:            string;
    id?:                  string;
    implicitCollections?: ModelPropertyDefinition[];
    mode?:                string;
    omitFields?:          ModelPropertyDefinition[];
    permissions?:         string;
}

export interface ModelDataformatYamlDataFormat {
    allowAnyType?:                     boolean;
    allowRecursiveKeys?:               boolean;
    constructor?:                      string;
    dumperOptions?:                    string;
    id?:                               string;
    library?:                          YamlLibrary;
    maxAliasesForCollections?:         number;
    prettyFlow?:                       boolean;
    representer?:                      string;
    resolver?:                         string;
    typeFilter?:                       ModelDataformatYamlTypeFilterDefinition[];
    unmarshalType?:                    string;
    useApplicationContextClassLoader?: boolean;
}

export enum YamlLibrary {
    SnakeYaml = "SnakeYAML",
}

export interface ModelDataformatYamlTypeFilterDefinition {
    type?:  string;
    value?: string;
}

export interface ModelDataformatZipDeflaterDataFormat {
    compressionLevel?: number;
    id?:               string;
}

export interface ModelDataformatZipFileDataFormat {
    allowEmptyDirectory?:  boolean;
    id?:                   string;
    maxDecompressedSize?:  number;
    preservePathElements?: boolean;
    usingIterator?:        boolean;
}

export interface ModelPollEnrichDefinition {
    aggregateOnException?:                      boolean;
    cacheSize?:                                 number;
    expression?:                                ModelLanguageExpressionDefinition;
    ignoreInvalidEndpoint?:                     number;
    inheritErrorHandler?:                       boolean;
    strategyMethodAllowNull?:                   boolean;
    strategyMethodName?:                        string;
    strategyRef?:                               string;
    timeout?:                                   string;
    constant?:                                  ModelLanguageConstantExpressionObject | string;
    csimple?:                                   ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                          ModelLanguageExchangePropertyExpressionObject | string;
    modelPollEnrichDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                    ModelLanguageGroovyExpressionObject | string;
    header?:                                    ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                 ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                      ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                  ModelLanguageJsonPathExpressionObject | string;
    language?:                                  ModelLanguageLanguageExpression;
    method?:                                    ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                      ModelLanguageMvelExpressionObject | string;
    ognl?:                                      ModelLanguageOgnlExpressionObject | string;
    ref?:                                       ModelLanguageRefExpressionObject | string;
    simple?:                                    ModelLanguageSimpleExpressionObject | string;
    spel?:                                      ModelLanguageSpElExpressionObject | string;
    tokenize?:                                  ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                     ModelLanguageXPathExpressionObject | string;
    xquery?:                                    ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                 ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelProcessDefinition {
    inheritErrorHandler?: boolean;
    ref:                  string;
}

export interface ModelRecipientListDefinition {
    cacheSize?:                                    number;
    delimiter?:                                    string;
    executorServiceRef?:                           string;
    expression?:                                   ModelLanguageExpressionDefinition;
    ignoreInvalidEndpoints?:                       boolean;
    inheritErrorHandler?:                          boolean;
    onPrepareRef?:                                 string;
    parallelAggregate?:                            boolean;
    parallelProcessing?:                           boolean;
    shareUnitOfWork?:                              boolean;
    stopOnAggregateException?:                     boolean;
    stopOnException?:                              boolean;
    strategyMethodAllowNull?:                      boolean;
    strategyMethodName?:                           string;
    strategyRef?:                                  string;
    streaming?:                                    boolean;
    timeout?:                                      string;
    constant?:                                     ModelLanguageConstantExpressionObject | string;
    csimple?:                                      ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                   ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                             ModelLanguageExchangePropertyExpressionObject | string;
    modelRecipientListDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                       ModelLanguageGroovyExpressionObject | string;
    header?:                                       ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                    ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                         ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                     ModelLanguageJsonPathExpressionObject | string;
    language?:                                     ModelLanguageLanguageExpression;
    method?:                                       ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                         ModelLanguageMvelExpressionObject | string;
    ognl?:                                         ModelLanguageOgnlExpressionObject | string;
    ref?:                                          ModelLanguageRefExpressionObject | string;
    simple?:                                       ModelLanguageSimpleExpressionObject | string;
    spel?:                                         ModelLanguageSpElExpressionObject | string;
    tokenize?:                                     ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                        ModelLanguageXPathExpressionObject | string;
    xquery?:                                       ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                    ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelRemoveHeaderDefinitionObject {
    headerName?:          string;
    inheritErrorHandler?: boolean;
    name?:                string;
}

export interface ModelRemoveHeadersDefinitionObject {
    pattern:              string;
    excludePattern?:      string;
    inheritErrorHandler?: boolean;
}

export interface ModelRemovePropertiesDefinitionObject {
    pattern:              string;
    excludePattern?:      string;
    inheritErrorHandler?: boolean;
}

export interface ModelRemovePropertyDefinitionObject {
    propertyName:         string;
    inheritErrorHandler?: boolean;
}

export interface ModelRollbackDefinitionObject {
    inheritErrorHandler?:  boolean;
    markRollbackOnly?:     boolean;
    markRollbackOnlyLast?: boolean;
    message?:              string;
}

export interface ModelRoutingSlipDefinition {
    cacheSize?:                                  number;
    expression?:                                 ModelLanguageExpressionDefinition;
    ignoreInvalidEndpoints?:                     boolean;
    inheritErrorHandler?:                        boolean;
    uriDelimiter?:                               string;
    constant?:                                   ModelLanguageConstantExpressionObject | string;
    csimple?:                                    ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                 ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                           ModelLanguageExchangePropertyExpressionObject | string;
    modelRoutingSlipDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                     ModelLanguageGroovyExpressionObject | string;
    header?:                                     ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                  ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                       ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                   ModelLanguageJsonPathExpressionObject | string;
    language?:                                   ModelLanguageLanguageExpression;
    method?:                                     ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                       ModelLanguageMvelExpressionObject | string;
    ognl?:                                       ModelLanguageOgnlExpressionObject | string;
    ref?:                                        ModelLanguageRefExpressionObject | string;
    simple?:                                     ModelLanguageSimpleExpressionObject | string;
    spel?:                                       ModelLanguageSpElExpressionObject | string;
    tokenize?:                                   ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                      ModelLanguageXPathExpressionObject | string;
    xquery?:                                     ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                  ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelSamplingDefinition {
    inheritErrorHandler?: boolean;
    messageFrequency?:    number;
    samplePeriod?:        string;
    units?:               string;
}

export interface ModelScriptDefinition {
    expression?:                            ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                   boolean;
    constant?:                              ModelLanguageConstantExpressionObject | string;
    csimple?:                               ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                            ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                      ModelLanguageExchangePropertyExpressionObject | string;
    modelScriptDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                ModelLanguageGroovyExpressionObject | string;
    header?:                                ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                             ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                  ModelLanguageJoorExpressionObject | string;
    jsonpath?:                              ModelLanguageJsonPathExpressionObject | string;
    language?:                              ModelLanguageLanguageExpression;
    method?:                                ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                  ModelLanguageMvelExpressionObject | string;
    ognl?:                                  ModelLanguageOgnlExpressionObject | string;
    ref?:                                   ModelLanguageRefExpressionObject | string;
    simple?:                                ModelLanguageSimpleExpressionObject | string;
    spel?:                                  ModelLanguageSpElExpressionObject | string;
    tokenize?:                              ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                 ModelLanguageXPathExpressionObject | string;
    xquery?:                                ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                             ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelCloudServiceCallDefinitionObject {
    name:                        string;
    blacklistServiceFilter?:     ModelCloudBlacklistServiceCallServiceFilterConfiguration;
    cachingServiceDiscovery?:    ModelCloudCachingServiceCallServiceDiscoveryConfiguration;
    combinedServiceDiscovery?:   ModelCloudCombinedServiceCallServiceDiscoveryConfiguration;
    combinedServiceFilter?:      ModelCloudCombinedServiceCallServiceFilterConfiguration;
    component?:                  string;
    configurationRef?:           string;
    consulServiceDiscovery?:     ModelCloudConsulServiceCallServiceDiscoveryConfiguration;
    customServiceFilter?:        ModelCloudCustomServiceCallServiceFilterConfiguration;
    defaultLoadBalancer?:        ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration;
    dnsServiceDiscovery?:        ModelCloudDnsServiceCallServiceDiscoveryConfiguration;
    etcdServiceDiscovery?:       ModelCloudEtcdServiceCallServiceDiscoveryConfiguration;
    expression?:                 ModelCloudServiceCallExpressionConfiguration;
    expressionRef?:              string;
    healthyServiceFilter?:       ModelCloudHealthyServiceCallServiceFilterConfiguration;
    inheritErrorHandler?:        boolean;
    kubernetesServiceDiscovery?: ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration;
    loadBalancerRef?:            string;
    passThroughServiceFilter?:   ModelCloudPassThroughServiceCallServiceFilterConfiguration;
    pattern?:                    string;
    ribbonLoadBalancer?:         ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration;
    serviceChooserRef?:          string;
    serviceDiscoveryRef?:        string;
    serviceFilterRef?:           string;
    staticServiceDiscovery?:     ModelCloudStaticServiceCallServiceDiscoveryConfiguration;
    uri?:                        string;
    zookeeperServiceDiscovery?:  ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration;
}

export interface ModelCloudBlacklistServiceCallServiceFilterConfiguration {
    id?:         string;
    properties?: ModelPropertyDefinition[];
    servers?:    string[];
}

export interface ModelCloudCombinedServiceCallServiceDiscoveryConfiguration {
    cachingServiceDiscovery?:    ModelCloudCachingServiceCallServiceDiscoveryConfiguration;
    consulServiceDiscovery?:     ModelCloudConsulServiceCallServiceDiscoveryConfiguration;
    dnsServiceDiscovery?:        ModelCloudDnsServiceCallServiceDiscoveryConfiguration;
    etcdServiceDiscovery?:       ModelCloudEtcdServiceCallServiceDiscoveryConfiguration;
    id?:                         string;
    kubernetesServiceDiscovery?: ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration;
    properties?:                 ModelPropertyDefinition[];
    staticServiceDiscovery?:     ModelCloudStaticServiceCallServiceDiscoveryConfiguration;
}

export interface ModelCloudCachingServiceCallServiceDiscoveryConfiguration {
    combinedServiceDiscovery?:   ModelCloudCombinedServiceCallServiceDiscoveryConfiguration;
    consulServiceDiscovery?:     ModelCloudConsulServiceCallServiceDiscoveryConfiguration;
    dnsServiceDiscovery?:        ModelCloudDnsServiceCallServiceDiscoveryConfiguration;
    etcdServiceDiscovery?:       ModelCloudEtcdServiceCallServiceDiscoveryConfiguration;
    id?:                         string;
    kubernetesServiceDiscovery?: ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration;
    properties?:                 ModelPropertyDefinition[];
    staticServiceDiscovery?:     ModelCloudStaticServiceCallServiceDiscoveryConfiguration;
    timeout?:                    number;
    units?:                      string;
}

export interface ModelCloudConsulServiceCallServiceDiscoveryConfiguration {
    aclToken?:             string;
    blockSeconds?:         number;
    connectTimeoutMillis?: number;
    datacenter?:           string;
    id?:                   string;
    password?:             string;
    properties?:           ModelPropertyDefinition[];
    readTimeoutMillis?:    number;
    url?:                  string;
    userName?:             string;
    writeTimeoutMillis?:   number;
}

export interface ModelCloudDnsServiceCallServiceDiscoveryConfiguration {
    domain?:     string;
    id?:         string;
    properties?: ModelPropertyDefinition[];
    proto?:      string;
}

export interface ModelCloudEtcdServiceCallServiceDiscoveryConfiguration {
    id?:          string;
    password?:    string;
    properties?:  ModelPropertyDefinition[];
    servicePath?: string;
    timeout?:     number;
    type?:        string;
    uris?:        string;
    userName?:    string;
}

export interface ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration {
    apiVersion?:          string;
    caCertData?:          string;
    caCertFile?:          string;
    clientCertData?:      string;
    clientCertFile?:      string;
    clientKeyAlgo?:       string;
    clientKeyData?:       string;
    clientKeyFile?:       string;
    clientKeyPassphrase?: string;
    dnsDomain?:           string;
    id?:                  string;
    lookup?:              string;
    masterUrl?:           string;
    namespace?:           string;
    oauthToken?:          string;
    password?:            string;
    portName?:            string;
    portProtocol?:        string;
    properties?:          ModelPropertyDefinition[];
    trustCerts?:          boolean;
    username?:            string;
}

export interface ModelCloudStaticServiceCallServiceDiscoveryConfiguration {
    id?:         string;
    properties?: ModelPropertyDefinition[];
    servers?:    string[];
}

export interface ModelCloudCombinedServiceCallServiceFilterConfiguration {
    blacklistServiceFilter?:   ModelCloudBlacklistServiceCallServiceFilterConfiguration;
    customServiceFilter?:      ModelCloudCustomServiceCallServiceFilterConfiguration;
    healthyServiceFilter?:     ModelCloudHealthyServiceCallServiceFilterConfiguration;
    id?:                       string;
    passThroughServiceFilter?: ModelCloudPassThroughServiceCallServiceFilterConfiguration;
    properties?:               ModelPropertyDefinition[];
}

export interface ModelCloudCustomServiceCallServiceFilterConfiguration {
    id?:         string;
    properties?: ModelPropertyDefinition[];
    ref?:        string;
}

export interface ModelCloudHealthyServiceCallServiceFilterConfiguration {
    id?:         string;
    properties?: ModelPropertyDefinition[];
}

export interface ModelCloudPassThroughServiceCallServiceFilterConfiguration {
    id?:         string;
    properties?: ModelPropertyDefinition[];
}

export interface ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration {
    id?:         string;
    properties?: ModelPropertyDefinition[];
}

export interface ModelCloudServiceCallExpressionConfiguration {
    expressionType?: ModelLanguageExpressionDefinition;
    hostHeader?:     string;
    id?:             string;
    portHeader?:     string;
    properties?:     ModelPropertyDefinition[];
}

export interface ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration {
    clientName?: string;
    id?:         string;
    namespace?:  string;
    password?:   string;
    properties?: ModelPropertyDefinition[];
    username?:   string;
}

export interface ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration {
    basePath:                string;
    connectionTimeout?:      string;
    id?:                     string;
    namespace?:              string;
    nodes:                   string;
    properties?:             ModelPropertyDefinition[];
    reconnectBaseSleepTime?: string;
    reconnectMaxRetries?:    string;
    reconnectMaxSleepTime?:  string;
    sessionTimeout?:         string;
}

export interface ModelSetBodyDefinition {
    expression?:                             ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                    boolean;
    constant?:                               ModelLanguageConstantExpressionObject | string;
    csimple?:                                ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                             ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                       ModelLanguageExchangePropertyExpressionObject | string;
    modelSetBodyDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                 ModelLanguageGroovyExpressionObject | string;
    header?:                                 ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                              ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                   ModelLanguageJoorExpressionObject | string;
    jsonpath?:                               ModelLanguageJsonPathExpressionObject | string;
    language?:                               ModelLanguageLanguageExpression;
    method?:                                 ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                   ModelLanguageMvelExpressionObject | string;
    ognl?:                                   ModelLanguageOgnlExpressionObject | string;
    ref?:                                    ModelLanguageRefExpressionObject | string;
    simple?:                                 ModelLanguageSimpleExpressionObject | string;
    spel?:                                   ModelLanguageSpElExpressionObject | string;
    tokenize?:                               ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                  ModelLanguageXPathExpressionObject | string;
    xquery?:                                 ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                              ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelSetExchangePatternDefinitionObject {
    pattern:              string;
    inheritErrorHandler?: boolean;
}

export interface ModelSetHeaderDefinition {
    expression?:                               ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                      boolean;
    name:                                      string;
    constant?:                                 ModelLanguageConstantExpressionObject | string;
    csimple?:                                  ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                               ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                         ModelLanguageExchangePropertyExpressionObject | string;
    modelSetHeaderDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                   ModelLanguageGroovyExpressionObject | string;
    header?:                                   ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                     ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                 ModelLanguageJsonPathExpressionObject | string;
    language?:                                 ModelLanguageLanguageExpression;
    method?:                                   ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                     ModelLanguageMvelExpressionObject | string;
    ognl?:                                     ModelLanguageOgnlExpressionObject | string;
    ref?:                                      ModelLanguageRefExpressionObject | string;
    simple?:                                   ModelLanguageSimpleExpressionObject | string;
    spel?:                                     ModelLanguageSpElExpressionObject | string;
    tokenize?:                                 ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                    ModelLanguageXPathExpressionObject | string;
    xquery?:                                   ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelSetPropertyDefinition {
    expression?:                                 ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                        boolean;
    name:                                        string;
    constant?:                                   ModelLanguageConstantExpressionObject | string;
    csimple?:                                    ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                                 ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                           ModelLanguageExchangePropertyExpressionObject | string;
    modelSetPropertyDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                     ModelLanguageGroovyExpressionObject | string;
    header?:                                     ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                  ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                       ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                   ModelLanguageJsonPathExpressionObject | string;
    language?:                                   ModelLanguageLanguageExpression;
    method?:                                     ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                       ModelLanguageMvelExpressionObject | string;
    ognl?:                                       ModelLanguageOgnlExpressionObject | string;
    ref?:                                        ModelLanguageRefExpressionObject | string;
    simple?:                                     ModelLanguageSimpleExpressionObject | string;
    spel?:                                       ModelLanguageSpElExpressionObject | string;
    tokenize?:                                   ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                      ModelLanguageXPathExpressionObject | string;
    xquery?:                                     ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                  ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelSortDefinition {
    comparatorRef?:                       string;
    expression?:                          ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                 boolean;
    constant?:                            ModelLanguageConstantExpressionObject | string;
    csimple?:                             ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                          ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                    ModelLanguageExchangePropertyExpressionObject | string;
    modelSortDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                              ModelLanguageGroovyExpressionObject | string;
    header?:                              ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                           ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                ModelLanguageJoorExpressionObject | string;
    jsonpath?:                            ModelLanguageJsonPathExpressionObject | string;
    language?:                            ModelLanguageLanguageExpression;
    method?:                              ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                ModelLanguageMvelExpressionObject | string;
    ognl?:                                ModelLanguageOgnlExpressionObject | string;
    ref?:                                 ModelLanguageRefExpressionObject | string;
    simple?:                              ModelLanguageSimpleExpressionObject | string;
    spel?:                                ModelLanguageSpElExpressionObject | string;
    tokenize?:                            ModelLanguageTokenizerExpressionObject | string;
    xpath?:                               ModelLanguageXPathExpressionObject | string;
    xquery?:                              ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                           ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelStopDefinition {
    inheritErrorHandler?: boolean;
}

export interface ModelThreadsDefinition {
    allowCoreThreadTimeOut?: boolean;
    callerRunsWhenRejected?: string;
    executorServiceRef?:     string;
    inheritErrorHandler?:    boolean;
    keepAliveTime?:          number;
    maxPoolSize?:            number;
    maxQueueSize?:           number;
    poolSize?:               number;
    rejectedPolicy?:         string;
    threadName?:             string;
    timeUnit?:               string;
}

export interface ModelThrottleDefinition {
    asyncDelayed?:                            boolean;
    callerRunsWhenRejected?:                  boolean;
    correlationExpression?:                   ModelExpressionSubElementDefinition;
    executorServiceRef?:                      string;
    expression?:                              ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                     boolean;
    rejectExecution?:                         boolean;
    timePeriodMillis?:                        string;
    constant?:                                ModelLanguageConstantExpressionObject | string;
    csimple?:                                 ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                              ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                        ModelLanguageExchangePropertyExpressionObject | string;
    modelThrottleDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                  ModelLanguageGroovyExpressionObject | string;
    header?:                                  ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                               ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                    ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                ModelLanguageJsonPathExpressionObject | string;
    language?:                                ModelLanguageLanguageExpression;
    method?:                                  ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                    ModelLanguageMvelExpressionObject | string;
    ognl?:                                    ModelLanguageOgnlExpressionObject | string;
    ref?:                                     ModelLanguageRefExpressionObject | string;
    simple?:                                  ModelLanguageSimpleExpressionObject | string;
    spel?:                                    ModelLanguageSpElExpressionObject | string;
    tokenize?:                                ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                   ModelLanguageXPathExpressionObject | string;
    xquery?:                                  ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                               ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelThrowExceptionDefinition {
    exceptionType?:       string;
    inheritErrorHandler?: boolean;
    message?:             string;
    ref?:                 string;
}

export interface ModelToDefinitionObject {
    uri:                  string;
    inheritErrorHandler?: boolean;
    parameters?:          { [key: string]: any };
    pattern?:             string;
}

export interface ModelToDynamicDefinitionObject {
    uri:                       string;
    allowOptimisedComponents?: boolean;
    autoStartComponents?:      boolean;
    cacheSize?:                number;
    ignoreInvalidEndpoint?:    boolean;
    inheritErrorHandler?:      boolean;
    parameters?:               { [key: string]: any };
    pattern?:                  string;
}

export interface ModelTransformDefinition {
    expression?:                               ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                      boolean;
    constant?:                                 ModelLanguageConstantExpressionObject | string;
    csimple?:                                  ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                               ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                         ModelLanguageExchangePropertyExpressionObject | string;
    modelTransformDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                   ModelLanguageGroovyExpressionObject | string;
    header?:                                   ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                                ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                     ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                 ModelLanguageJsonPathExpressionObject | string;
    language?:                                 ModelLanguageLanguageExpression;
    method?:                                   ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                     ModelLanguageMvelExpressionObject | string;
    ognl?:                                     ModelLanguageOgnlExpressionObject | string;
    ref?:                                      ModelLanguageRefExpressionObject | string;
    simple?:                                   ModelLanguageSimpleExpressionObject | string;
    spel?:                                     ModelLanguageSpElExpressionObject | string;
    tokenize?:                                 ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                    ModelLanguageXPathExpressionObject | string;
    xquery?:                                   ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                                ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelUnmarshalDefinition {
    any23?:               ModelDataformatAny23DataFormatObject | string;
    asn1?:                ModelDataformatAsn1DataFormatObject | string;
    avro?:                ModelDataformatAvroDataFormatObject | string;
    barcode?:             ModelDataformatBarcodeDataFormat;
    base64?:              ModelDataformatBase64DataFormat;
    beanio?:              ModelDataformatBeanioDataFormat;
    bindy?:               ModelDataformatBindyDataFormat;
    cbor?:                ModelDataformatCborDataFormat;
    crypto?:              ModelDataformatCryptoDataFormat;
    csv?:                 ModelDataformatCsvDataFormatObject | string;
    custom?:              ModelDataformatCustomDataFormatObject | string;
    fhirJson?:            ModelDataformatFhirJsonDataFormat;
    fhirXml?:             ModelDataformatFhirXmlDataFormat;
    flatpack?:            ModelDataformatFlatpackDataFormat;
    grok?:                ModelDataformatGrokDataFormat;
    gzip?:                ModelDataformatGzipDataFormat;
    hl7?:                 ModelDataformatHl7DataFormat;
    ical?:                ModelDataformatIcalDataFormat;
    inheritErrorHandler?: boolean;
    jacksonxml?:          ModelDataformatJacksonXmlDataFormat;
    jaxb?:                ModelDataformatJaxbDataFormat;
    json?:                ModelDataformatJsonDataFormat;
    jsonApi?:             ModelDataformatJsonApiDataFormat;
    lzf?:                 ModelDataformatLzfDataFormat;
    mimeMultipart?:       ModelDataformatMimeMultipartDataFormat;
    pgp?:                 ModelDataformatPgpDataFormat;
    protobuf?:            ModelDataformatProtobufDataFormatObject | string;
    rss?:                 ModelDataformatRssDataFormat;
    secureXml?:           ModelDataformatXmlSecurityDataFormat;
    soapjaxb?:            ModelDataformatSoapJaxbDataFormatObject | string;
    syslog?:              ModelDataformatSyslogDataFormat;
    tarfile?:             ModelDataformatTarFileDataFormat;
    thrift?:              ModelDataformatThriftDataFormatObject | string;
    tidyMarkup?:          ModelDataformatTidyMarkupDataFormat;
    univocityCsv?:        ModelDataformatUniVocityCsvDataFormat;
    univocityFixed?:      ModelDataformatUniVocityFixedWidthDataFormat;
    univocityTsv?:        ModelDataformatUniVocityTsvDataFormat;
    xmlrpc?:              ModelDataformatXmlRpcDataFormat;
    xstream?:             ModelDataformatXStreamDataFormatObject | string;
    yaml?:                ModelDataformatYamlDataFormat;
    zip?:                 ModelDataformatZipDeflaterDataFormat;
    zipfile?:             ModelDataformatZipFileDataFormat;
}

export interface ModelValidateDefinition {
    expression?:                              ModelLanguageExpressionDefinition;
    inheritErrorHandler?:                     boolean;
    constant?:                                ModelLanguageConstantExpressionObject | string;
    csimple?:                                 ModelLanguageCSimpleExpressionObject | string;
    datasonnet?:                              ModelLanguageDatasonnetExpressionObject | string;
    exchangeProperty?:                        ModelLanguageExchangePropertyExpressionObject | string;
    modelValidateDefinitionExchangeProperty?: ModelLanguageExchangePropertyExpressionObject | string;
    groovy?:                                  ModelLanguageGroovyExpressionObject | string;
    header?:                                  ModelLanguageHeaderExpressionObject | string;
    hl7Terser?:                               ModelLanguageHl7TerserExpressionObject | string;
    joor?:                                    ModelLanguageJoorExpressionObject | string;
    jsonpath?:                                ModelLanguageJsonPathExpressionObject | string;
    language?:                                ModelLanguageLanguageExpression;
    method?:                                  ModelLanguageMethodCallExpressionObject | string;
    mvel?:                                    ModelLanguageMvelExpressionObject | string;
    ognl?:                                    ModelLanguageOgnlExpressionObject | string;
    ref?:                                     ModelLanguageRefExpressionObject | string;
    simple?:                                  ModelLanguageSimpleExpressionObject | string;
    spel?:                                    ModelLanguageSpElExpressionObject | string;
    tokenize?:                                ModelLanguageTokenizerExpressionObject | string;
    xpath?:                                   ModelLanguageXPathExpressionObject | string;
    xquery?:                                  ModelLanguageXQueryExpressionObject | string;
    xtokenize?:                               ModelLanguageXmlTokenizerExpressionObject | string;
}

export interface ModelWireTapDefinition {
    allowOptimisedComponents?: boolean;
    autoStartComponents?:      boolean;
    body?:                     ModelExpressionSubElementDefinition;
    cacheSize?:                number;
    copy?:                     boolean;
    dynamicUri?:               boolean;
    executorServiceRef?:       string;
    ignoreInvalidEndpoint?:    boolean;
    inheritErrorHandler?:      boolean;
    onPrepareRef?:             string;
    parameters?:               { [key: string]: any };
    pattern?:                  string;
    processorRef?:             string;
    setHeader?:                ModelSetHeaderDefinition[];
    uri:                       string;
}

export interface ModelOnExceptionDefinition {
    continued?:              ModelExpressionSubElementDefinition;
    exception?:              string[];
    handled?:                ModelExpressionSubElementDefinition;
    inheritErrorHandler?:    boolean;
    onExceptionOccurredRef?: string;
    onRedeliveryRef?:        string;
    onWhen?:                 ModelWhenDefinition;
    redeliveryPolicy?:       ModelRedeliveryPolicyDefinition;
    redeliveryPolicyRef?:    string;
    retryWhile?:             ModelExpressionSubElementDefinition;
    steps?:                  ModelProcessorDefinition[];
    useOriginalBody?:        boolean;
    useOriginalMessage?:     boolean;
}

export interface ModelRedeliveryPolicyDefinition {
    allowRedeliveryWhileStopping?: boolean;
    asyncDelayedRedelivery?:       boolean;
    backOffMultiplier?:            number;
    collisionAvoidanceFactor?:     number;
    delayPattern?:                 string;
    disableRedelivery?:            boolean;
    exchangeFormatterRef?:         string;
    logContinued?:                 boolean;
    logExhausted?:                 boolean;
    logExhaustedMessageBody?:      boolean;
    logExhaustedMessageHistory?:   boolean;
    logHandled?:                   boolean;
    logNewException?:              boolean;
    logRetryAttempted?:            boolean;
    logRetryStackTrace?:           boolean;
    logStackTrace?:                boolean;
    maximumRedeliveries?:          number;
    maximumRedeliveryDelay?:       string;
    redeliveryDelay?:              string;
    retriesExhaustedLogLevel?:     string;
    retryAttemptedLogInterval?:    number;
    retryAttemptedLogLevel?:       string;
    useCollisionAvoidance?:        boolean;
    useExponentialBackOff?:        boolean;
}

export interface ModelRestRestDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    delete?:                  ModelRestDeleteVerbDefinition[];
    enableCors?:              string;
    get?:                     ModelRestGetVerbDefinition[];
    head?:                    ModelRestHeadVerbDefinition[];
    patch?:                   ModelRestPatchVerbDefinition[];
    path?:                    string;
    post?:                    ModelRestPostVerbDefinition[];
    produces?:                string;
    put?:                     ModelRestPutVerbDefinition[];
    securityDefinitions?:     ModelRestRestSecuritiesDefinition;
    securityRequirements?:    ModelRestRestSecuritiesRequirement;
    skipBindingOnErrorCode?:  string;
    tag?:                     string;
    verb?:                    ModelRestVerbDefinition[];
}

export interface ModelRestDeleteVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRestRestOperationParamDefinition {
    arrayType?:        string;
    collectionFormat?: CollectionFormat;
    dataFormat?:       string;
    dataType?:         string;
    defaultValue?:     string;
    description?:      string;
    examples?:         ModelRestRestPropertyDefinition[];
    name:              string;
    required?:         boolean;
    type:              Type;
    value?:            string[];
}

export enum CollectionFormat {
    Csv = "csv",
    Multi = "multi",
    Pipes = "pipes",
    Ssv = "ssv",
    Tsv = "tsv",
}

export interface ModelRestRestPropertyDefinition {
    key:   string;
    value: string;
}

export enum Type {
    Body = "body",
    FormData = "formData",
    Header = "header",
    Path = "path",
    Query = "query",
}

export interface ModelRestRestOperationResponseMsgDefinition {
    code?:          string;
    examples?:      ModelRestRestPropertyDefinition[];
    header?:        ModelRestRestOperationResponseHeaderDefinition[];
    message:        string;
    responseModel?: string;
}

export interface ModelRestRestOperationResponseHeaderDefinition {
    arrayType?:        string;
    collectionFormat?: CollectionFormat;
    dataFormat?:       string;
    dataType?:         string;
    description?:      string;
    example?:          string;
    name:              string;
    value?:            string[];
}

export interface ModelRouteDefinition {
    from:                  ModelFromDefinitionObject | string;
    group?:                string;
    id?:                   string;
    routeConfigurationId?: string;
    steps:                 ModelProcessorDefinition[];
}

export interface ModelFromDefinitionObject {
    uri:         string;
    parameters?: { [key: string]: any };
}

export interface ModelRestSecurityDefinition {
    key:     string;
    scopes?: string;
}

export interface ModelRestGetVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRestHeadVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRestPatchVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRestPostVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRestPutVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRestRestSecuritiesDefinition {
    apiKey?:        ModelRestRestSecurityApiKey;
    basicAuth?:     ModelRestRestSecurityBasicAuth;
    bearer?:        ModelRestRestSecurityBearerToken;
    mutualTls?:     ModelRestRestSecurityMutualTls;
    oauth2?:        ModelRestRestSecurityOAuth2;
    openIdConnect?: ModelRestRestSecurityOpenIdConnect;
}

export interface ModelRestRestSecurityApiKey {
    description?: string;
    inCookie?:    boolean;
    inHeader?:    boolean;
    inQuery?:     boolean;
    key:          string;
    name:         string;
}

export interface ModelRestRestSecurityBasicAuth {
    description?: string;
    key:          string;
}

export interface ModelRestRestSecurityBearerToken {
    description?: string;
    format?:      string;
    key:          string;
}

export interface ModelRestRestSecurityMutualTls {
    description?: string;
    key:          string;
}

export interface ModelRestRestSecurityOAuth2 {
    authorizationUrl?: string;
    description?:      string;
    flow?:             string;
    key:               string;
    refreshUrl?:       string;
    scopes?:           ModelRestRestPropertyDefinition[];
    tokenUrl?:         string;
}

export interface ModelRestRestSecurityOpenIdConnect {
    description?: string;
    key:          string;
    url:          string;
}

export interface ModelRestRestSecuritiesRequirement {
    securityRequirement?: ModelRestSecurityDefinition;
}

export interface ModelRestVerbDefinition {
    apiDocs?:                 string;
    bindingMode?:             string;
    clientRequestValidation?: string;
    consumes?:                string;
    deprecated?:              boolean;
    enableCors?:              string;
    method?:                  string;
    outType?:                 string;
    param?:                   ModelRestRestOperationParamDefinition[];
    produces?:                string;
    responseMessage?:         ModelRestRestOperationResponseMsgDefinition[];
    route?:                   ModelRouteDefinition;
    routeId?:                 string;
    security?:                ModelRestSecurityDefinition[];
    skipBindingOnErrorCode?:  string;
    steps?:                   ModelProcessorDefinition[];
    to?:                      ModelToDefinitionObject | string;
    toD?:                     ModelToDynamicDefinitionObject | string;
    type?:                    string;
    uri?:                     string;
}

export interface ModelRouteTemplateDefinition {
    beans?:      DslYamlDeserializersNamedBeanDefinition[];
    from:        ModelFromDefinitionObject | string;
    id:          string;
    parameters?: ModelRouteTemplateParameterDefinition[];
}

export interface ModelRouteTemplateParameterDefinition {
    defaultValue?: string;
    description?:  string;
    name:          string;
    required?:     boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDslModelObject(json: string): DslModelObject {
        return cast(JSON.parse(json), r("DslModelObject"));
    }

    public static dslModelObjectToJson(value: DslModelObject): string {
        return JSON.stringify(uncast(value, r("DslModelObject")), null, 2);
    }

    public static toDslYamlDeserializersNamedBeanDefinition(json: string): DslYamlDeserializersNamedBeanDefinition {
        return cast(JSON.parse(json), r("DslYamlDeserializersNamedBeanDefinition"));
    }

    public static dslYamlDeserializersNamedBeanDefinitionToJson(value: DslYamlDeserializersNamedBeanDefinition): string {
        return JSON.stringify(uncast(value, r("DslYamlDeserializersNamedBeanDefinition")), null, 2);
    }

    public static toBuilderErrorHandlerBuilderRef(json: string): BuilderErrorHandlerBuilderRef {
        return cast(JSON.parse(json), r("BuilderErrorHandlerBuilderRef"));
    }

    public static builderErrorHandlerBuilderRefToJson(value: BuilderErrorHandlerBuilderRef): string {
        return JSON.stringify(uncast(value, r("BuilderErrorHandlerBuilderRef")), null, 2);
    }

    public static toBuilderDeadLetterChannelBuilderObject(json: string): BuilderDeadLetterChannelBuilderObject {
        return cast(JSON.parse(json), r("BuilderDeadLetterChannelBuilderObject"));
    }

    public static builderDeadLetterChannelBuilderObjectToJson(value: BuilderDeadLetterChannelBuilderObject): string {
        return JSON.stringify(uncast(value, r("BuilderDeadLetterChannelBuilderObject")), null, 2);
    }

    public static toBuilderDefaultErrorHandlerBuilder(json: string): BuilderDefaultErrorHandlerBuilder {
        return cast(JSON.parse(json), r("BuilderDefaultErrorHandlerBuilder"));
    }

    public static builderDefaultErrorHandlerBuilderToJson(value: BuilderDefaultErrorHandlerBuilder): string {
        return JSON.stringify(uncast(value, r("BuilderDefaultErrorHandlerBuilder")), null, 2);
    }

    public static toDslYamlDeserializersRouteFromDefinitionDeserializer(json: string): DslYamlDeserializersRouteFromDefinitionDeserializer {
        return cast(JSON.parse(json), r("DslYamlDeserializersRouteFromDefinitionDeserializer"));
    }

    public static dslYamlDeserializersRouteFromDefinitionDeserializerToJson(value: DslYamlDeserializersRouteFromDefinitionDeserializer): string {
        return JSON.stringify(uncast(value, r("DslYamlDeserializersRouteFromDefinitionDeserializer")), null, 2);
    }

    public static toModelWhenSkipSendToEndpointDefinition(json: string): ModelWhenSkipSendToEndpointDefinition {
        return cast(JSON.parse(json), r("ModelWhenSkipSendToEndpointDefinition"));
    }

    public static modelWhenSkipSendToEndpointDefinitionToJson(value: ModelWhenSkipSendToEndpointDefinition): string {
        return JSON.stringify(uncast(value, r("ModelWhenSkipSendToEndpointDefinition")), null, 2);
    }

    public static toModelTransactedDefinition(json: string): ModelTransactedDefinition {
        return cast(JSON.parse(json), r("ModelTransactedDefinition"));
    }

    public static modelTransactedDefinitionToJson(value: ModelTransactedDefinition): string {
        return JSON.stringify(uncast(value, r("ModelTransactedDefinition")), null, 2);
    }

    public static toModelStepDefinition(json: string): ModelStepDefinition {
        return cast(JSON.parse(json), r("ModelStepDefinition"));
    }

    public static modelStepDefinitionToJson(value: ModelStepDefinition): string {
        return JSON.stringify(uncast(value, r("ModelStepDefinition")), null, 2);
    }

    public static toModelSplitDefinition(json: string): ModelSplitDefinition {
        return cast(JSON.parse(json), r("ModelSplitDefinition"));
    }

    public static modelSplitDefinitionToJson(value: ModelSplitDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSplitDefinition")), null, 2);
    }

    public static toModelSagaDefinition(json: string): ModelSagaDefinition {
        return cast(JSON.parse(json), r("ModelSagaDefinition"));
    }

    public static modelSagaDefinitionToJson(value: ModelSagaDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSagaDefinition")), null, 2);
    }

    public static toModelResequenceDefinition(json: string): ModelResequenceDefinition {
        return cast(JSON.parse(json), r("ModelResequenceDefinition"));
    }

    public static modelResequenceDefinitionToJson(value: ModelResequenceDefinition): string {
        return JSON.stringify(uncast(value, r("ModelResequenceDefinition")), null, 2);
    }

    public static toModelPolicyDefinition(json: string): ModelPolicyDefinition {
        return cast(JSON.parse(json), r("ModelPolicyDefinition"));
    }

    public static modelPolicyDefinitionToJson(value: ModelPolicyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelPolicyDefinition")), null, 2);
    }

    public static toModelPipelineDefinition(json: string): ModelPipelineDefinition {
        return cast(JSON.parse(json), r("ModelPipelineDefinition"));
    }

    public static modelPipelineDefinitionToJson(value: ModelPipelineDefinition): string {
        return JSON.stringify(uncast(value, r("ModelPipelineDefinition")), null, 2);
    }

    public static toModelOnCompletionDefinition(json: string): ModelOnCompletionDefinition {
        return cast(JSON.parse(json), r("ModelOnCompletionDefinition"));
    }

    public static modelOnCompletionDefinitionToJson(value: ModelOnCompletionDefinition): string {
        return JSON.stringify(uncast(value, r("ModelOnCompletionDefinition")), null, 2);
    }

    public static toModelMulticastDefinition(json: string): ModelMulticastDefinition {
        return cast(JSON.parse(json), r("ModelMulticastDefinition"));
    }

    public static modelMulticastDefinitionToJson(value: ModelMulticastDefinition): string {
        return JSON.stringify(uncast(value, r("ModelMulticastDefinition")), null, 2);
    }

    public static toModelLoopDefinition(json: string): ModelLoopDefinition {
        return cast(JSON.parse(json), r("ModelLoopDefinition"));
    }

    public static modelLoopDefinitionToJson(value: ModelLoopDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoopDefinition")), null, 2);
    }

    public static toModelLoadBalanceDefinition(json: string): ModelLoadBalanceDefinition {
        return cast(JSON.parse(json), r("ModelLoadBalanceDefinition"));
    }

    public static modelLoadBalanceDefinitionToJson(value: ModelLoadBalanceDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadBalanceDefinition")), null, 2);
    }

    public static toModelKameletDefinitionObject(json: string): ModelKameletDefinitionObject {
        return cast(JSON.parse(json), r("ModelKameletDefinitionObject"));
    }

    public static modelKameletDefinitionObjectToJson(value: ModelKameletDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelKameletDefinitionObject")), null, 2);
    }

    public static toModelInterceptSendToEndpointDefinitionObject(json: string): ModelInterceptSendToEndpointDefinitionObject {
        return cast(JSON.parse(json), r("ModelInterceptSendToEndpointDefinitionObject"));
    }

    public static modelInterceptSendToEndpointDefinitionObjectToJson(value: ModelInterceptSendToEndpointDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelInterceptSendToEndpointDefinitionObject")), null, 2);
    }

    public static toModelInterceptFromDefinitionObject(json: string): ModelInterceptFromDefinitionObject {
        return cast(JSON.parse(json), r("ModelInterceptFromDefinitionObject"));
    }

    public static modelInterceptFromDefinitionObjectToJson(value: ModelInterceptFromDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelInterceptFromDefinitionObject")), null, 2);
    }

    public static toModelInterceptDefinition(json: string): ModelInterceptDefinition {
        return cast(JSON.parse(json), r("ModelInterceptDefinition"));
    }

    public static modelInterceptDefinitionToJson(value: ModelInterceptDefinition): string {
        return JSON.stringify(uncast(value, r("ModelInterceptDefinition")), null, 2);
    }

    public static toModelIdempotentConsumerDefinition(json: string): ModelIdempotentConsumerDefinition {
        return cast(JSON.parse(json), r("ModelIdempotentConsumerDefinition"));
    }

    public static modelIdempotentConsumerDefinitionToJson(value: ModelIdempotentConsumerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelIdempotentConsumerDefinition")), null, 2);
    }

    public static toModelFilterDefinition(json: string): ModelFilterDefinition {
        return cast(JSON.parse(json), r("ModelFilterDefinition"));
    }

    public static modelFilterDefinitionToJson(value: ModelFilterDefinition): string {
        return JSON.stringify(uncast(value, r("ModelFilterDefinition")), null, 2);
    }

    public static toModelTryDefinition(json: string): ModelTryDefinition {
        return cast(JSON.parse(json), r("ModelTryDefinition"));
    }

    public static modelTryDefinitionToJson(value: ModelTryDefinition): string {
        return JSON.stringify(uncast(value, r("ModelTryDefinition")), null, 2);
    }

    public static toModelFinallyDefinition(json: string): ModelFinallyDefinition {
        return cast(JSON.parse(json), r("ModelFinallyDefinition"));
    }

    public static modelFinallyDefinitionToJson(value: ModelFinallyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelFinallyDefinition")), null, 2);
    }

    public static toModelCatchDefinition(json: string): ModelCatchDefinition {
        return cast(JSON.parse(json), r("ModelCatchDefinition"));
    }

    public static modelCatchDefinitionToJson(value: ModelCatchDefinition): string {
        return JSON.stringify(uncast(value, r("ModelCatchDefinition")), null, 2);
    }

    public static toModelOnFallbackDefinition(json: string): ModelOnFallbackDefinition {
        return cast(JSON.parse(json), r("ModelOnFallbackDefinition"));
    }

    public static modelOnFallbackDefinitionToJson(value: ModelOnFallbackDefinition): string {
        return JSON.stringify(uncast(value, r("ModelOnFallbackDefinition")), null, 2);
    }

    public static toModelCircuitBreakerDefinition(json: string): ModelCircuitBreakerDefinition {
        return cast(JSON.parse(json), r("ModelCircuitBreakerDefinition"));
    }

    public static modelCircuitBreakerDefinitionToJson(value: ModelCircuitBreakerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelCircuitBreakerDefinition")), null, 2);
    }

    public static toModelWhenDefinition(json: string): ModelWhenDefinition {
        return cast(JSON.parse(json), r("ModelWhenDefinition"));
    }

    public static modelWhenDefinitionToJson(value: ModelWhenDefinition): string {
        return JSON.stringify(uncast(value, r("ModelWhenDefinition")), null, 2);
    }

    public static toModelOtherwiseDefinition(json: string): ModelOtherwiseDefinition {
        return cast(JSON.parse(json), r("ModelOtherwiseDefinition"));
    }

    public static modelOtherwiseDefinitionToJson(value: ModelOtherwiseDefinition): string {
        return JSON.stringify(uncast(value, r("ModelOtherwiseDefinition")), null, 2);
    }

    public static toModelChoiceDefinition(json: string): ModelChoiceDefinition {
        return cast(JSON.parse(json), r("ModelChoiceDefinition"));
    }

    public static modelChoiceDefinitionToJson(value: ModelChoiceDefinition): string {
        return JSON.stringify(uncast(value, r("ModelChoiceDefinition")), null, 2);
    }

    public static toModelAggregateDefinition(json: string): ModelAggregateDefinition {
        return cast(JSON.parse(json), r("ModelAggregateDefinition"));
    }

    public static modelAggregateDefinitionToJson(value: ModelAggregateDefinition): string {
        return JSON.stringify(uncast(value, r("ModelAggregateDefinition")), null, 2);
    }

    public static toModelProcessorDefinition(json: string): ModelProcessorDefinition {
        return cast(JSON.parse(json), r("ModelProcessorDefinition"));
    }

    public static modelProcessorDefinitionToJson(value: ModelProcessorDefinition): string {
        return JSON.stringify(uncast(value, r("ModelProcessorDefinition")), null, 2);
    }

    public static toModelLanguageConstantExpressionObject(json: string): ModelLanguageConstantExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageConstantExpressionObject"));
    }

    public static modelLanguageConstantExpressionObjectToJson(value: ModelLanguageConstantExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageConstantExpressionObject")), null, 2);
    }

    public static toModelLanguageCSimpleExpressionObject(json: string): ModelLanguageCSimpleExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageCSimpleExpressionObject"));
    }

    public static modelLanguageCSimpleExpressionObjectToJson(value: ModelLanguageCSimpleExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageCSimpleExpressionObject")), null, 2);
    }

    public static toModelLanguageDatasonnetExpressionObject(json: string): ModelLanguageDatasonnetExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageDatasonnetExpressionObject"));
    }

    public static modelLanguageDatasonnetExpressionObjectToJson(value: ModelLanguageDatasonnetExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageDatasonnetExpressionObject")), null, 2);
    }

    public static toModelLanguageExchangePropertyExpressionObject(json: string): ModelLanguageExchangePropertyExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageExchangePropertyExpressionObject"));
    }

    public static modelLanguageExchangePropertyExpressionObjectToJson(value: ModelLanguageExchangePropertyExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageExchangePropertyExpressionObject")), null, 2);
    }

    public static toModelLanguageExpressionDefinition(json: string): ModelLanguageExpressionDefinition {
        return cast(JSON.parse(json), r("ModelLanguageExpressionDefinition"));
    }

    public static modelLanguageExpressionDefinitionToJson(value: ModelLanguageExpressionDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLanguageExpressionDefinition")), null, 2);
    }

    public static toModelLanguageGroovyExpressionObject(json: string): ModelLanguageGroovyExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageGroovyExpressionObject"));
    }

    public static modelLanguageGroovyExpressionObjectToJson(value: ModelLanguageGroovyExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageGroovyExpressionObject")), null, 2);
    }

    public static toModelLanguageHeaderExpressionObject(json: string): ModelLanguageHeaderExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageHeaderExpressionObject"));
    }

    public static modelLanguageHeaderExpressionObjectToJson(value: ModelLanguageHeaderExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageHeaderExpressionObject")), null, 2);
    }

    public static toModelLanguageHl7TerserExpressionObject(json: string): ModelLanguageHl7TerserExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageHl7TerserExpressionObject"));
    }

    public static modelLanguageHl7TerserExpressionObjectToJson(value: ModelLanguageHl7TerserExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageHl7TerserExpressionObject")), null, 2);
    }

    public static toModelLanguageJoorExpressionObject(json: string): ModelLanguageJoorExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageJoorExpressionObject"));
    }

    public static modelLanguageJoorExpressionObjectToJson(value: ModelLanguageJoorExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageJoorExpressionObject")), null, 2);
    }

    public static toModelLanguageJsonPathExpressionObject(json: string): ModelLanguageJsonPathExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageJsonPathExpressionObject"));
    }

    public static modelLanguageJsonPathExpressionObjectToJson(value: ModelLanguageJsonPathExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageJsonPathExpressionObject")), null, 2);
    }

    public static toModelLanguageLanguageExpression(json: string): ModelLanguageLanguageExpression {
        return cast(JSON.parse(json), r("ModelLanguageLanguageExpression"));
    }

    public static modelLanguageLanguageExpressionToJson(value: ModelLanguageLanguageExpression): string {
        return JSON.stringify(uncast(value, r("ModelLanguageLanguageExpression")), null, 2);
    }

    public static toModelLanguageMethodCallExpressionObject(json: string): ModelLanguageMethodCallExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageMethodCallExpressionObject"));
    }

    public static modelLanguageMethodCallExpressionObjectToJson(value: ModelLanguageMethodCallExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageMethodCallExpressionObject")), null, 2);
    }

    public static toModelLanguageMvelExpressionObject(json: string): ModelLanguageMvelExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageMvelExpressionObject"));
    }

    public static modelLanguageMvelExpressionObjectToJson(value: ModelLanguageMvelExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageMvelExpressionObject")), null, 2);
    }

    public static toModelLanguageOgnlExpressionObject(json: string): ModelLanguageOgnlExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageOgnlExpressionObject"));
    }

    public static modelLanguageOgnlExpressionObjectToJson(value: ModelLanguageOgnlExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageOgnlExpressionObject")), null, 2);
    }

    public static toModelLanguageRefExpressionObject(json: string): ModelLanguageRefExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageRefExpressionObject"));
    }

    public static modelLanguageRefExpressionObjectToJson(value: ModelLanguageRefExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageRefExpressionObject")), null, 2);
    }

    public static toModelLanguageSimpleExpressionObject(json: string): ModelLanguageSimpleExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageSimpleExpressionObject"));
    }

    public static modelLanguageSimpleExpressionObjectToJson(value: ModelLanguageSimpleExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageSimpleExpressionObject")), null, 2);
    }

    public static toModelLanguageSpElExpressionObject(json: string): ModelLanguageSpElExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageSpElExpressionObject"));
    }

    public static modelLanguageSpElExpressionObjectToJson(value: ModelLanguageSpElExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageSpElExpressionObject")), null, 2);
    }

    public static toModelLanguageTokenizerExpressionObject(json: string): ModelLanguageTokenizerExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageTokenizerExpressionObject"));
    }

    public static modelLanguageTokenizerExpressionObjectToJson(value: ModelLanguageTokenizerExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageTokenizerExpressionObject")), null, 2);
    }

    public static toModelLanguageXPathExpressionObject(json: string): ModelLanguageXPathExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageXPathExpressionObject"));
    }

    public static modelLanguageXPathExpressionObjectToJson(value: ModelLanguageXPathExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageXPathExpressionObject")), null, 2);
    }

    public static toModelLanguageXQueryExpressionObject(json: string): ModelLanguageXQueryExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageXQueryExpressionObject"));
    }

    public static modelLanguageXQueryExpressionObjectToJson(value: ModelLanguageXQueryExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageXQueryExpressionObject")), null, 2);
    }

    public static toModelLanguageXmlTokenizerExpressionObject(json: string): ModelLanguageXmlTokenizerExpressionObject {
        return cast(JSON.parse(json), r("ModelLanguageXmlTokenizerExpressionObject"));
    }

    public static modelLanguageXmlTokenizerExpressionObjectToJson(value: ModelLanguageXmlTokenizerExpressionObject): string {
        return JSON.stringify(uncast(value, r("ModelLanguageXmlTokenizerExpressionObject")), null, 2);
    }

    public static toModelSagaActionUriDefinitionObject(json: string): ModelSagaActionUriDefinitionObject {
        return cast(JSON.parse(json), r("ModelSagaActionUriDefinitionObject"));
    }

    public static modelSagaActionUriDefinitionObjectToJson(value: ModelSagaActionUriDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelSagaActionUriDefinitionObject")), null, 2);
    }

    public static toModelSagaOptionDefinition(json: string): ModelSagaOptionDefinition {
        return cast(JSON.parse(json), r("ModelSagaOptionDefinition"));
    }

    public static modelSagaOptionDefinitionToJson(value: ModelSagaOptionDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSagaOptionDefinition")), null, 2);
    }

    public static toModelConfigBatchResequencerConfig(json: string): ModelConfigBatchResequencerConfig {
        return cast(JSON.parse(json), r("ModelConfigBatchResequencerConfig"));
    }

    public static modelConfigBatchResequencerConfigToJson(value: ModelConfigBatchResequencerConfig): string {
        return JSON.stringify(uncast(value, r("ModelConfigBatchResequencerConfig")), null, 2);
    }

    public static toModelConfigStreamResequencerConfig(json: string): ModelConfigStreamResequencerConfig {
        return cast(JSON.parse(json), r("ModelConfigStreamResequencerConfig"));
    }

    public static modelConfigStreamResequencerConfigToJson(value: ModelConfigStreamResequencerConfig): string {
        return JSON.stringify(uncast(value, r("ModelConfigStreamResequencerConfig")), null, 2);
    }

    public static toModelLoadbalancerCustomLoadBalancerDefinitionObject(json: string): ModelLoadbalancerCustomLoadBalancerDefinitionObject {
        return cast(JSON.parse(json), r("ModelLoadbalancerCustomLoadBalancerDefinitionObject"));
    }

    public static modelLoadbalancerCustomLoadBalancerDefinitionObjectToJson(value: ModelLoadbalancerCustomLoadBalancerDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerCustomLoadBalancerDefinitionObject")), null, 2);
    }

    public static toModelLoadbalancerFailoverLoadBalancerDefinition(json: string): ModelLoadbalancerFailoverLoadBalancerDefinition {
        return cast(JSON.parse(json), r("ModelLoadbalancerFailoverLoadBalancerDefinition"));
    }

    public static modelLoadbalancerFailoverLoadBalancerDefinitionToJson(value: ModelLoadbalancerFailoverLoadBalancerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerFailoverLoadBalancerDefinition")), null, 2);
    }

    public static toModelLoadbalancerRandomLoadBalancerDefinition(json: string): ModelLoadbalancerRandomLoadBalancerDefinition {
        return cast(JSON.parse(json), r("ModelLoadbalancerRandomLoadBalancerDefinition"));
    }

    public static modelLoadbalancerRandomLoadBalancerDefinitionToJson(value: ModelLoadbalancerRandomLoadBalancerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerRandomLoadBalancerDefinition")), null, 2);
    }

    public static toModelLoadbalancerRoundRobinLoadBalancerDefinition(json: string): ModelLoadbalancerRoundRobinLoadBalancerDefinition {
        return cast(JSON.parse(json), r("ModelLoadbalancerRoundRobinLoadBalancerDefinition"));
    }

    public static modelLoadbalancerRoundRobinLoadBalancerDefinitionToJson(value: ModelLoadbalancerRoundRobinLoadBalancerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerRoundRobinLoadBalancerDefinition")), null, 2);
    }

    public static toModelLoadbalancerStickyLoadBalancerDefinition(json: string): ModelLoadbalancerStickyLoadBalancerDefinition {
        return cast(JSON.parse(json), r("ModelLoadbalancerStickyLoadBalancerDefinition"));
    }

    public static modelLoadbalancerStickyLoadBalancerDefinitionToJson(value: ModelLoadbalancerStickyLoadBalancerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerStickyLoadBalancerDefinition")), null, 2);
    }

    public static toModelExpressionSubElementDefinition(json: string): ModelExpressionSubElementDefinition {
        return cast(JSON.parse(json), r("ModelExpressionSubElementDefinition"));
    }

    public static modelExpressionSubElementDefinitionToJson(value: ModelExpressionSubElementDefinition): string {
        return JSON.stringify(uncast(value, r("ModelExpressionSubElementDefinition")), null, 2);
    }

    public static toModelLoadbalancerTopicLoadBalancerDefinition(json: string): ModelLoadbalancerTopicLoadBalancerDefinition {
        return cast(JSON.parse(json), r("ModelLoadbalancerTopicLoadBalancerDefinition"));
    }

    public static modelLoadbalancerTopicLoadBalancerDefinitionToJson(value: ModelLoadbalancerTopicLoadBalancerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerTopicLoadBalancerDefinition")), null, 2);
    }

    public static toModelLoadbalancerWeightedLoadBalancerDefinition(json: string): ModelLoadbalancerWeightedLoadBalancerDefinition {
        return cast(JSON.parse(json), r("ModelLoadbalancerWeightedLoadBalancerDefinition"));
    }

    public static modelLoadbalancerWeightedLoadBalancerDefinitionToJson(value: ModelLoadbalancerWeightedLoadBalancerDefinition): string {
        return JSON.stringify(uncast(value, r("ModelLoadbalancerWeightedLoadBalancerDefinition")), null, 2);
    }

    public static toModelFaultToleranceConfigurationDefinition(json: string): ModelFaultToleranceConfigurationDefinition {
        return cast(JSON.parse(json), r("ModelFaultToleranceConfigurationDefinition"));
    }

    public static modelFaultToleranceConfigurationDefinitionToJson(value: ModelFaultToleranceConfigurationDefinition): string {
        return JSON.stringify(uncast(value, r("ModelFaultToleranceConfigurationDefinition")), null, 2);
    }

    public static toModelHystrixConfigurationDefinition(json: string): ModelHystrixConfigurationDefinition {
        return cast(JSON.parse(json), r("ModelHystrixConfigurationDefinition"));
    }

    public static modelHystrixConfigurationDefinitionToJson(value: ModelHystrixConfigurationDefinition): string {
        return JSON.stringify(uncast(value, r("ModelHystrixConfigurationDefinition")), null, 2);
    }

    public static toModelResilience4JConfigurationDefinition(json: string): ModelResilience4JConfigurationDefinition {
        return cast(JSON.parse(json), r("ModelResilience4JConfigurationDefinition"));
    }

    public static modelResilience4JConfigurationDefinitionToJson(value: ModelResilience4JConfigurationDefinition): string {
        return JSON.stringify(uncast(value, r("ModelResilience4JConfigurationDefinition")), null, 2);
    }

    public static toModelOptimisticLockRetryPolicyDefinition(json: string): ModelOptimisticLockRetryPolicyDefinition {
        return cast(JSON.parse(json), r("ModelOptimisticLockRetryPolicyDefinition"));
    }

    public static modelOptimisticLockRetryPolicyDefinitionToJson(value: ModelOptimisticLockRetryPolicyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelOptimisticLockRetryPolicyDefinition")), null, 2);
    }

    public static toModelBeanDefinitionObject(json: string): ModelBeanDefinitionObject {
        return cast(JSON.parse(json), r("ModelBeanDefinitionObject"));
    }

    public static modelBeanDefinitionObjectToJson(value: ModelBeanDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelBeanDefinitionObject")), null, 2);
    }

    public static toModelClaimCheckDefinition(json: string): ModelClaimCheckDefinition {
        return cast(JSON.parse(json), r("ModelClaimCheckDefinition"));
    }

    public static modelClaimCheckDefinitionToJson(value: ModelClaimCheckDefinition): string {
        return JSON.stringify(uncast(value, r("ModelClaimCheckDefinition")), null, 2);
    }

    public static toModelConvertBodyDefinitionObject(json: string): ModelConvertBodyDefinitionObject {
        return cast(JSON.parse(json), r("ModelConvertBodyDefinitionObject"));
    }

    public static modelConvertBodyDefinitionObjectToJson(value: ModelConvertBodyDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelConvertBodyDefinitionObject")), null, 2);
    }

    public static toModelDelayDefinition(json: string): ModelDelayDefinition {
        return cast(JSON.parse(json), r("ModelDelayDefinition"));
    }

    public static modelDelayDefinitionToJson(value: ModelDelayDefinition): string {
        return JSON.stringify(uncast(value, r("ModelDelayDefinition")), null, 2);
    }

    public static toModelDynamicRouterDefinition(json: string): ModelDynamicRouterDefinition {
        return cast(JSON.parse(json), r("ModelDynamicRouterDefinition"));
    }

    public static modelDynamicRouterDefinitionToJson(value: ModelDynamicRouterDefinition): string {
        return JSON.stringify(uncast(value, r("ModelDynamicRouterDefinition")), null, 2);
    }

    public static toModelEnrichDefinition(json: string): ModelEnrichDefinition {
        return cast(JSON.parse(json), r("ModelEnrichDefinition"));
    }

    public static modelEnrichDefinitionToJson(value: ModelEnrichDefinition): string {
        return JSON.stringify(uncast(value, r("ModelEnrichDefinition")), null, 2);
    }

    public static toModelInOnlyDefinitionObject(json: string): ModelInOnlyDefinitionObject {
        return cast(JSON.parse(json), r("ModelInOnlyDefinitionObject"));
    }

    public static modelInOnlyDefinitionObjectToJson(value: ModelInOnlyDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelInOnlyDefinitionObject")), null, 2);
    }

    public static toModelInOutDefinitionObject(json: string): ModelInOutDefinitionObject {
        return cast(JSON.parse(json), r("ModelInOutDefinitionObject"));
    }

    public static modelInOutDefinitionObjectToJson(value: ModelInOutDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelInOutDefinitionObject")), null, 2);
    }

    public static toModelLogDefinitionObject(json: string): ModelLogDefinitionObject {
        return cast(JSON.parse(json), r("ModelLogDefinitionObject"));
    }

    public static modelLogDefinitionObjectToJson(value: ModelLogDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelLogDefinitionObject")), null, 2);
    }

    public static toModelMarshalDefinition(json: string): ModelMarshalDefinition {
        return cast(JSON.parse(json), r("ModelMarshalDefinition"));
    }

    public static modelMarshalDefinitionToJson(value: ModelMarshalDefinition): string {
        return JSON.stringify(uncast(value, r("ModelMarshalDefinition")), null, 2);
    }

    public static toModelDataformatAny23DataFormatObject(json: string): ModelDataformatAny23DataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatAny23DataFormatObject"));
    }

    public static modelDataformatAny23DataFormatObjectToJson(value: ModelDataformatAny23DataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatAny23DataFormatObject")), null, 2);
    }

    public static toModelPropertyDefinition(json: string): ModelPropertyDefinition {
        return cast(JSON.parse(json), r("ModelPropertyDefinition"));
    }

    public static modelPropertyDefinitionToJson(value: ModelPropertyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelPropertyDefinition")), null, 2);
    }

    public static toModelDataformatAsn1DataFormatObject(json: string): ModelDataformatAsn1DataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatAsn1DataFormatObject"));
    }

    public static modelDataformatAsn1DataFormatObjectToJson(value: ModelDataformatAsn1DataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatAsn1DataFormatObject")), null, 2);
    }

    public static toModelDataformatAvroDataFormatObject(json: string): ModelDataformatAvroDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatAvroDataFormatObject"));
    }

    public static modelDataformatAvroDataFormatObjectToJson(value: ModelDataformatAvroDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatAvroDataFormatObject")), null, 2);
    }

    public static toModelDataformatBarcodeDataFormat(json: string): ModelDataformatBarcodeDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatBarcodeDataFormat"));
    }

    public static modelDataformatBarcodeDataFormatToJson(value: ModelDataformatBarcodeDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatBarcodeDataFormat")), null, 2);
    }

    public static toModelDataformatBase64DataFormat(json: string): ModelDataformatBase64DataFormat {
        return cast(JSON.parse(json), r("ModelDataformatBase64DataFormat"));
    }

    public static modelDataformatBase64DataFormatToJson(value: ModelDataformatBase64DataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatBase64DataFormat")), null, 2);
    }

    public static toModelDataformatBeanioDataFormat(json: string): ModelDataformatBeanioDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatBeanioDataFormat"));
    }

    public static modelDataformatBeanioDataFormatToJson(value: ModelDataformatBeanioDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatBeanioDataFormat")), null, 2);
    }

    public static toModelDataformatBindyDataFormat(json: string): ModelDataformatBindyDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatBindyDataFormat"));
    }

    public static modelDataformatBindyDataFormatToJson(value: ModelDataformatBindyDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatBindyDataFormat")), null, 2);
    }

    public static toModelDataformatCborDataFormat(json: string): ModelDataformatCborDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatCborDataFormat"));
    }

    public static modelDataformatCborDataFormatToJson(value: ModelDataformatCborDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatCborDataFormat")), null, 2);
    }

    public static toModelDataformatCryptoDataFormat(json: string): ModelDataformatCryptoDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatCryptoDataFormat"));
    }

    public static modelDataformatCryptoDataFormatToJson(value: ModelDataformatCryptoDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatCryptoDataFormat")), null, 2);
    }

    public static toModelDataformatCsvDataFormatObject(json: string): ModelDataformatCsvDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatCsvDataFormatObject"));
    }

    public static modelDataformatCsvDataFormatObjectToJson(value: ModelDataformatCsvDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatCsvDataFormatObject")), null, 2);
    }

    public static toModelDataformatCustomDataFormatObject(json: string): ModelDataformatCustomDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatCustomDataFormatObject"));
    }

    public static modelDataformatCustomDataFormatObjectToJson(value: ModelDataformatCustomDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatCustomDataFormatObject")), null, 2);
    }

    public static toModelDataformatFhirJsonDataFormat(json: string): ModelDataformatFhirJsonDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatFhirJsonDataFormat"));
    }

    public static modelDataformatFhirJsonDataFormatToJson(value: ModelDataformatFhirJsonDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatFhirJsonDataFormat")), null, 2);
    }

    public static toModelDataformatFhirXmlDataFormat(json: string): ModelDataformatFhirXmlDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatFhirXmlDataFormat"));
    }

    public static modelDataformatFhirXmlDataFormatToJson(value: ModelDataformatFhirXmlDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatFhirXmlDataFormat")), null, 2);
    }

    public static toModelDataformatFlatpackDataFormat(json: string): ModelDataformatFlatpackDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatFlatpackDataFormat"));
    }

    public static modelDataformatFlatpackDataFormatToJson(value: ModelDataformatFlatpackDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatFlatpackDataFormat")), null, 2);
    }

    public static toModelDataformatGrokDataFormat(json: string): ModelDataformatGrokDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatGrokDataFormat"));
    }

    public static modelDataformatGrokDataFormatToJson(value: ModelDataformatGrokDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatGrokDataFormat")), null, 2);
    }

    public static toModelDataformatGzipDataFormat(json: string): ModelDataformatGzipDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatGzipDataFormat"));
    }

    public static modelDataformatGzipDataFormatToJson(value: ModelDataformatGzipDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatGzipDataFormat")), null, 2);
    }

    public static toModelDataformatHl7DataFormat(json: string): ModelDataformatHl7DataFormat {
        return cast(JSON.parse(json), r("ModelDataformatHl7DataFormat"));
    }

    public static modelDataformatHl7DataFormatToJson(value: ModelDataformatHl7DataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatHl7DataFormat")), null, 2);
    }

    public static toModelDataformatIcalDataFormat(json: string): ModelDataformatIcalDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatIcalDataFormat"));
    }

    public static modelDataformatIcalDataFormatToJson(value: ModelDataformatIcalDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatIcalDataFormat")), null, 2);
    }

    public static toModelDataformatJacksonXmlDataFormat(json: string): ModelDataformatJacksonXmlDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatJacksonXmlDataFormat"));
    }

    public static modelDataformatJacksonXmlDataFormatToJson(value: ModelDataformatJacksonXmlDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatJacksonXmlDataFormat")), null, 2);
    }

    public static toModelDataformatJaxbDataFormat(json: string): ModelDataformatJaxbDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatJaxbDataFormat"));
    }

    public static modelDataformatJaxbDataFormatToJson(value: ModelDataformatJaxbDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatJaxbDataFormat")), null, 2);
    }

    public static toModelDataformatJsonDataFormat(json: string): ModelDataformatJsonDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatJsonDataFormat"));
    }

    public static modelDataformatJsonDataFormatToJson(value: ModelDataformatJsonDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatJsonDataFormat")), null, 2);
    }

    public static toModelDataformatJsonApiDataFormat(json: string): ModelDataformatJsonApiDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatJsonApiDataFormat"));
    }

    public static modelDataformatJsonApiDataFormatToJson(value: ModelDataformatJsonApiDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatJsonApiDataFormat")), null, 2);
    }

    public static toModelDataformatLzfDataFormat(json: string): ModelDataformatLzfDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatLzfDataFormat"));
    }

    public static modelDataformatLzfDataFormatToJson(value: ModelDataformatLzfDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatLzfDataFormat")), null, 2);
    }

    public static toModelDataformatMimeMultipartDataFormat(json: string): ModelDataformatMimeMultipartDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatMimeMultipartDataFormat"));
    }

    public static modelDataformatMimeMultipartDataFormatToJson(value: ModelDataformatMimeMultipartDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatMimeMultipartDataFormat")), null, 2);
    }

    public static toModelDataformatPgpDataFormat(json: string): ModelDataformatPgpDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatPgpDataFormat"));
    }

    public static modelDataformatPgpDataFormatToJson(value: ModelDataformatPgpDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatPgpDataFormat")), null, 2);
    }

    public static toModelDataformatProtobufDataFormatObject(json: string): ModelDataformatProtobufDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatProtobufDataFormatObject"));
    }

    public static modelDataformatProtobufDataFormatObjectToJson(value: ModelDataformatProtobufDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatProtobufDataFormatObject")), null, 2);
    }

    public static toModelDataformatRssDataFormat(json: string): ModelDataformatRssDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatRssDataFormat"));
    }

    public static modelDataformatRssDataFormatToJson(value: ModelDataformatRssDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatRssDataFormat")), null, 2);
    }

    public static toModelDataformatXmlSecurityDataFormat(json: string): ModelDataformatXmlSecurityDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatXmlSecurityDataFormat"));
    }

    public static modelDataformatXmlSecurityDataFormatToJson(value: ModelDataformatXmlSecurityDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatXmlSecurityDataFormat")), null, 2);
    }

    public static toModelDataformatSoapJaxbDataFormatObject(json: string): ModelDataformatSoapJaxbDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatSoapJaxbDataFormatObject"));
    }

    public static modelDataformatSoapJaxbDataFormatObjectToJson(value: ModelDataformatSoapJaxbDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatSoapJaxbDataFormatObject")), null, 2);
    }

    public static toModelDataformatSyslogDataFormat(json: string): ModelDataformatSyslogDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatSyslogDataFormat"));
    }

    public static modelDataformatSyslogDataFormatToJson(value: ModelDataformatSyslogDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatSyslogDataFormat")), null, 2);
    }

    public static toModelDataformatTarFileDataFormat(json: string): ModelDataformatTarFileDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatTarFileDataFormat"));
    }

    public static modelDataformatTarFileDataFormatToJson(value: ModelDataformatTarFileDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatTarFileDataFormat")), null, 2);
    }

    public static toModelDataformatThriftDataFormatObject(json: string): ModelDataformatThriftDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatThriftDataFormatObject"));
    }

    public static modelDataformatThriftDataFormatObjectToJson(value: ModelDataformatThriftDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatThriftDataFormatObject")), null, 2);
    }

    public static toModelDataformatTidyMarkupDataFormat(json: string): ModelDataformatTidyMarkupDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatTidyMarkupDataFormat"));
    }

    public static modelDataformatTidyMarkupDataFormatToJson(value: ModelDataformatTidyMarkupDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatTidyMarkupDataFormat")), null, 2);
    }

    public static toModelDataformatUniVocityCsvDataFormat(json: string): ModelDataformatUniVocityCsvDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatUniVocityCsvDataFormat"));
    }

    public static modelDataformatUniVocityCsvDataFormatToJson(value: ModelDataformatUniVocityCsvDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatUniVocityCsvDataFormat")), null, 2);
    }

    public static toModelDataformatUniVocityHeader(json: string): ModelDataformatUniVocityHeader {
        return cast(JSON.parse(json), r("ModelDataformatUniVocityHeader"));
    }

    public static modelDataformatUniVocityHeaderToJson(value: ModelDataformatUniVocityHeader): string {
        return JSON.stringify(uncast(value, r("ModelDataformatUniVocityHeader")), null, 2);
    }

    public static toModelDataformatUniVocityFixedWidthDataFormat(json: string): ModelDataformatUniVocityFixedWidthDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatUniVocityFixedWidthDataFormat"));
    }

    public static modelDataformatUniVocityFixedWidthDataFormatToJson(value: ModelDataformatUniVocityFixedWidthDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatUniVocityFixedWidthDataFormat")), null, 2);
    }

    public static toModelDataformatUniVocityTsvDataFormat(json: string): ModelDataformatUniVocityTsvDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatUniVocityTsvDataFormat"));
    }

    public static modelDataformatUniVocityTsvDataFormatToJson(value: ModelDataformatUniVocityTsvDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatUniVocityTsvDataFormat")), null, 2);
    }

    public static toModelDataformatXmlRpcDataFormat(json: string): ModelDataformatXmlRpcDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatXmlRpcDataFormat"));
    }

    public static modelDataformatXmlRpcDataFormatToJson(value: ModelDataformatXmlRpcDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatXmlRpcDataFormat")), null, 2);
    }

    public static toModelDataformatXStreamDataFormatObject(json: string): ModelDataformatXStreamDataFormatObject {
        return cast(JSON.parse(json), r("ModelDataformatXStreamDataFormatObject"));
    }

    public static modelDataformatXStreamDataFormatObjectToJson(value: ModelDataformatXStreamDataFormatObject): string {
        return JSON.stringify(uncast(value, r("ModelDataformatXStreamDataFormatObject")), null, 2);
    }

    public static toModelDataformatYamlDataFormat(json: string): ModelDataformatYamlDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatYamlDataFormat"));
    }

    public static modelDataformatYamlDataFormatToJson(value: ModelDataformatYamlDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatYamlDataFormat")), null, 2);
    }

    public static toModelDataformatYamlTypeFilterDefinition(json: string): ModelDataformatYamlTypeFilterDefinition {
        return cast(JSON.parse(json), r("ModelDataformatYamlTypeFilterDefinition"));
    }

    public static modelDataformatYamlTypeFilterDefinitionToJson(value: ModelDataformatYamlTypeFilterDefinition): string {
        return JSON.stringify(uncast(value, r("ModelDataformatYamlTypeFilterDefinition")), null, 2);
    }

    public static toModelDataformatZipDeflaterDataFormat(json: string): ModelDataformatZipDeflaterDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatZipDeflaterDataFormat"));
    }

    public static modelDataformatZipDeflaterDataFormatToJson(value: ModelDataformatZipDeflaterDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatZipDeflaterDataFormat")), null, 2);
    }

    public static toModelDataformatZipFileDataFormat(json: string): ModelDataformatZipFileDataFormat {
        return cast(JSON.parse(json), r("ModelDataformatZipFileDataFormat"));
    }

    public static modelDataformatZipFileDataFormatToJson(value: ModelDataformatZipFileDataFormat): string {
        return JSON.stringify(uncast(value, r("ModelDataformatZipFileDataFormat")), null, 2);
    }

    public static toModelPollEnrichDefinition(json: string): ModelPollEnrichDefinition {
        return cast(JSON.parse(json), r("ModelPollEnrichDefinition"));
    }

    public static modelPollEnrichDefinitionToJson(value: ModelPollEnrichDefinition): string {
        return JSON.stringify(uncast(value, r("ModelPollEnrichDefinition")), null, 2);
    }

    public static toModelProcessDefinition(json: string): ModelProcessDefinition {
        return cast(JSON.parse(json), r("ModelProcessDefinition"));
    }

    public static modelProcessDefinitionToJson(value: ModelProcessDefinition): string {
        return JSON.stringify(uncast(value, r("ModelProcessDefinition")), null, 2);
    }

    public static toModelRecipientListDefinition(json: string): ModelRecipientListDefinition {
        return cast(JSON.parse(json), r("ModelRecipientListDefinition"));
    }

    public static modelRecipientListDefinitionToJson(value: ModelRecipientListDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRecipientListDefinition")), null, 2);
    }

    public static toModelRemoveHeaderDefinitionObject(json: string): ModelRemoveHeaderDefinitionObject {
        return cast(JSON.parse(json), r("ModelRemoveHeaderDefinitionObject"));
    }

    public static modelRemoveHeaderDefinitionObjectToJson(value: ModelRemoveHeaderDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelRemoveHeaderDefinitionObject")), null, 2);
    }

    public static toModelRemoveHeadersDefinitionObject(json: string): ModelRemoveHeadersDefinitionObject {
        return cast(JSON.parse(json), r("ModelRemoveHeadersDefinitionObject"));
    }

    public static modelRemoveHeadersDefinitionObjectToJson(value: ModelRemoveHeadersDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelRemoveHeadersDefinitionObject")), null, 2);
    }

    public static toModelRemovePropertiesDefinitionObject(json: string): ModelRemovePropertiesDefinitionObject {
        return cast(JSON.parse(json), r("ModelRemovePropertiesDefinitionObject"));
    }

    public static modelRemovePropertiesDefinitionObjectToJson(value: ModelRemovePropertiesDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelRemovePropertiesDefinitionObject")), null, 2);
    }

    public static toModelRemovePropertyDefinitionObject(json: string): ModelRemovePropertyDefinitionObject {
        return cast(JSON.parse(json), r("ModelRemovePropertyDefinitionObject"));
    }

    public static modelRemovePropertyDefinitionObjectToJson(value: ModelRemovePropertyDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelRemovePropertyDefinitionObject")), null, 2);
    }

    public static toModelRollbackDefinitionObject(json: string): ModelRollbackDefinitionObject {
        return cast(JSON.parse(json), r("ModelRollbackDefinitionObject"));
    }

    public static modelRollbackDefinitionObjectToJson(value: ModelRollbackDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelRollbackDefinitionObject")), null, 2);
    }

    public static toModelRoutingSlipDefinition(json: string): ModelRoutingSlipDefinition {
        return cast(JSON.parse(json), r("ModelRoutingSlipDefinition"));
    }

    public static modelRoutingSlipDefinitionToJson(value: ModelRoutingSlipDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRoutingSlipDefinition")), null, 2);
    }

    public static toModelSamplingDefinition(json: string): ModelSamplingDefinition {
        return cast(JSON.parse(json), r("ModelSamplingDefinition"));
    }

    public static modelSamplingDefinitionToJson(value: ModelSamplingDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSamplingDefinition")), null, 2);
    }

    public static toModelScriptDefinition(json: string): ModelScriptDefinition {
        return cast(JSON.parse(json), r("ModelScriptDefinition"));
    }

    public static modelScriptDefinitionToJson(value: ModelScriptDefinition): string {
        return JSON.stringify(uncast(value, r("ModelScriptDefinition")), null, 2);
    }

    public static toModelCloudServiceCallDefinitionObject(json: string): ModelCloudServiceCallDefinitionObject {
        return cast(JSON.parse(json), r("ModelCloudServiceCallDefinitionObject"));
    }

    public static modelCloudServiceCallDefinitionObjectToJson(value: ModelCloudServiceCallDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelCloudServiceCallDefinitionObject")), null, 2);
    }

    public static toModelCloudBlacklistServiceCallServiceFilterConfiguration(json: string): ModelCloudBlacklistServiceCallServiceFilterConfiguration {
        return cast(JSON.parse(json), r("ModelCloudBlacklistServiceCallServiceFilterConfiguration"));
    }

    public static modelCloudBlacklistServiceCallServiceFilterConfigurationToJson(value: ModelCloudBlacklistServiceCallServiceFilterConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudBlacklistServiceCallServiceFilterConfiguration")), null, 2);
    }

    public static toModelCloudCombinedServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudCombinedServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudCombinedServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudCombinedServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudCombinedServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudCombinedServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudCachingServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudCachingServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudCachingServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudCachingServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudCachingServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudCachingServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudConsulServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudConsulServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudConsulServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudConsulServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudConsulServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudConsulServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudDnsServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudDnsServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudDnsServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudDnsServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudDnsServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudDnsServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudEtcdServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudEtcdServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudEtcdServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudEtcdServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudEtcdServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudEtcdServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudKubernetesServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudKubernetesServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudStaticServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudStaticServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudStaticServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudStaticServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudStaticServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudStaticServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelCloudCombinedServiceCallServiceFilterConfiguration(json: string): ModelCloudCombinedServiceCallServiceFilterConfiguration {
        return cast(JSON.parse(json), r("ModelCloudCombinedServiceCallServiceFilterConfiguration"));
    }

    public static modelCloudCombinedServiceCallServiceFilterConfigurationToJson(value: ModelCloudCombinedServiceCallServiceFilterConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudCombinedServiceCallServiceFilterConfiguration")), null, 2);
    }

    public static toModelCloudCustomServiceCallServiceFilterConfiguration(json: string): ModelCloudCustomServiceCallServiceFilterConfiguration {
        return cast(JSON.parse(json), r("ModelCloudCustomServiceCallServiceFilterConfiguration"));
    }

    public static modelCloudCustomServiceCallServiceFilterConfigurationToJson(value: ModelCloudCustomServiceCallServiceFilterConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudCustomServiceCallServiceFilterConfiguration")), null, 2);
    }

    public static toModelCloudHealthyServiceCallServiceFilterConfiguration(json: string): ModelCloudHealthyServiceCallServiceFilterConfiguration {
        return cast(JSON.parse(json), r("ModelCloudHealthyServiceCallServiceFilterConfiguration"));
    }

    public static modelCloudHealthyServiceCallServiceFilterConfigurationToJson(value: ModelCloudHealthyServiceCallServiceFilterConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudHealthyServiceCallServiceFilterConfiguration")), null, 2);
    }

    public static toModelCloudPassThroughServiceCallServiceFilterConfiguration(json: string): ModelCloudPassThroughServiceCallServiceFilterConfiguration {
        return cast(JSON.parse(json), r("ModelCloudPassThroughServiceCallServiceFilterConfiguration"));
    }

    public static modelCloudPassThroughServiceCallServiceFilterConfigurationToJson(value: ModelCloudPassThroughServiceCallServiceFilterConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudPassThroughServiceCallServiceFilterConfiguration")), null, 2);
    }

    public static toModelCloudDefaultServiceCallServiceLoadBalancerConfiguration(json: string): ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration {
        return cast(JSON.parse(json), r("ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration"));
    }

    public static modelCloudDefaultServiceCallServiceLoadBalancerConfigurationToJson(value: ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration")), null, 2);
    }

    public static toModelCloudServiceCallExpressionConfiguration(json: string): ModelCloudServiceCallExpressionConfiguration {
        return cast(JSON.parse(json), r("ModelCloudServiceCallExpressionConfiguration"));
    }

    public static modelCloudServiceCallExpressionConfigurationToJson(value: ModelCloudServiceCallExpressionConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudServiceCallExpressionConfiguration")), null, 2);
    }

    public static toModelCloudRibbonServiceCallServiceLoadBalancerConfiguration(json: string): ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration {
        return cast(JSON.parse(json), r("ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration"));
    }

    public static modelCloudRibbonServiceCallServiceLoadBalancerConfigurationToJson(value: ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration")), null, 2);
    }

    public static toModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration(json: string): ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration {
        return cast(JSON.parse(json), r("ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration"));
    }

    public static modelCloudZooKeeperServiceCallServiceDiscoveryConfigurationToJson(value: ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration): string {
        return JSON.stringify(uncast(value, r("ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration")), null, 2);
    }

    public static toModelSetBodyDefinition(json: string): ModelSetBodyDefinition {
        return cast(JSON.parse(json), r("ModelSetBodyDefinition"));
    }

    public static modelSetBodyDefinitionToJson(value: ModelSetBodyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSetBodyDefinition")), null, 2);
    }

    public static toModelSetExchangePatternDefinitionObject(json: string): ModelSetExchangePatternDefinitionObject {
        return cast(JSON.parse(json), r("ModelSetExchangePatternDefinitionObject"));
    }

    public static modelSetExchangePatternDefinitionObjectToJson(value: ModelSetExchangePatternDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelSetExchangePatternDefinitionObject")), null, 2);
    }

    public static toModelSetHeaderDefinition(json: string): ModelSetHeaderDefinition {
        return cast(JSON.parse(json), r("ModelSetHeaderDefinition"));
    }

    public static modelSetHeaderDefinitionToJson(value: ModelSetHeaderDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSetHeaderDefinition")), null, 2);
    }

    public static toModelSetPropertyDefinition(json: string): ModelSetPropertyDefinition {
        return cast(JSON.parse(json), r("ModelSetPropertyDefinition"));
    }

    public static modelSetPropertyDefinitionToJson(value: ModelSetPropertyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSetPropertyDefinition")), null, 2);
    }

    public static toModelSortDefinition(json: string): ModelSortDefinition {
        return cast(JSON.parse(json), r("ModelSortDefinition"));
    }

    public static modelSortDefinitionToJson(value: ModelSortDefinition): string {
        return JSON.stringify(uncast(value, r("ModelSortDefinition")), null, 2);
    }

    public static toModelStopDefinition(json: string): ModelStopDefinition {
        return cast(JSON.parse(json), r("ModelStopDefinition"));
    }

    public static modelStopDefinitionToJson(value: ModelStopDefinition): string {
        return JSON.stringify(uncast(value, r("ModelStopDefinition")), null, 2);
    }

    public static toModelThreadsDefinition(json: string): ModelThreadsDefinition {
        return cast(JSON.parse(json), r("ModelThreadsDefinition"));
    }

    public static modelThreadsDefinitionToJson(value: ModelThreadsDefinition): string {
        return JSON.stringify(uncast(value, r("ModelThreadsDefinition")), null, 2);
    }

    public static toModelThrottleDefinition(json: string): ModelThrottleDefinition {
        return cast(JSON.parse(json), r("ModelThrottleDefinition"));
    }

    public static modelThrottleDefinitionToJson(value: ModelThrottleDefinition): string {
        return JSON.stringify(uncast(value, r("ModelThrottleDefinition")), null, 2);
    }

    public static toModelThrowExceptionDefinition(json: string): ModelThrowExceptionDefinition {
        return cast(JSON.parse(json), r("ModelThrowExceptionDefinition"));
    }

    public static modelThrowExceptionDefinitionToJson(value: ModelThrowExceptionDefinition): string {
        return JSON.stringify(uncast(value, r("ModelThrowExceptionDefinition")), null, 2);
    }

    public static toModelToDefinitionObject(json: string): ModelToDefinitionObject {
        return cast(JSON.parse(json), r("ModelToDefinitionObject"));
    }

    public static modelToDefinitionObjectToJson(value: ModelToDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelToDefinitionObject")), null, 2);
    }

    public static toModelToDynamicDefinitionObject(json: string): ModelToDynamicDefinitionObject {
        return cast(JSON.parse(json), r("ModelToDynamicDefinitionObject"));
    }

    public static modelToDynamicDefinitionObjectToJson(value: ModelToDynamicDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelToDynamicDefinitionObject")), null, 2);
    }

    public static toModelTransformDefinition(json: string): ModelTransformDefinition {
        return cast(JSON.parse(json), r("ModelTransformDefinition"));
    }

    public static modelTransformDefinitionToJson(value: ModelTransformDefinition): string {
        return JSON.stringify(uncast(value, r("ModelTransformDefinition")), null, 2);
    }

    public static toModelUnmarshalDefinition(json: string): ModelUnmarshalDefinition {
        return cast(JSON.parse(json), r("ModelUnmarshalDefinition"));
    }

    public static modelUnmarshalDefinitionToJson(value: ModelUnmarshalDefinition): string {
        return JSON.stringify(uncast(value, r("ModelUnmarshalDefinition")), null, 2);
    }

    public static toModelValidateDefinition(json: string): ModelValidateDefinition {
        return cast(JSON.parse(json), r("ModelValidateDefinition"));
    }

    public static modelValidateDefinitionToJson(value: ModelValidateDefinition): string {
        return JSON.stringify(uncast(value, r("ModelValidateDefinition")), null, 2);
    }

    public static toModelWireTapDefinition(json: string): ModelWireTapDefinition {
        return cast(JSON.parse(json), r("ModelWireTapDefinition"));
    }

    public static modelWireTapDefinitionToJson(value: ModelWireTapDefinition): string {
        return JSON.stringify(uncast(value, r("ModelWireTapDefinition")), null, 2);
    }

    public static toModelOnExceptionDefinition(json: string): ModelOnExceptionDefinition {
        return cast(JSON.parse(json), r("ModelOnExceptionDefinition"));
    }

    public static modelOnExceptionDefinitionToJson(value: ModelOnExceptionDefinition): string {
        return JSON.stringify(uncast(value, r("ModelOnExceptionDefinition")), null, 2);
    }

    public static toModelRedeliveryPolicyDefinition(json: string): ModelRedeliveryPolicyDefinition {
        return cast(JSON.parse(json), r("ModelRedeliveryPolicyDefinition"));
    }

    public static modelRedeliveryPolicyDefinitionToJson(value: ModelRedeliveryPolicyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRedeliveryPolicyDefinition")), null, 2);
    }

    public static toModelRestRestDefinition(json: string): ModelRestRestDefinition {
        return cast(JSON.parse(json), r("ModelRestRestDefinition"));
    }

    public static modelRestRestDefinitionToJson(value: ModelRestRestDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestRestDefinition")), null, 2);
    }

    public static toModelRestDeleteVerbDefinition(json: string): ModelRestDeleteVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestDeleteVerbDefinition"));
    }

    public static modelRestDeleteVerbDefinitionToJson(value: ModelRestDeleteVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestDeleteVerbDefinition")), null, 2);
    }

    public static toModelRestRestOperationParamDefinition(json: string): ModelRestRestOperationParamDefinition {
        return cast(JSON.parse(json), r("ModelRestRestOperationParamDefinition"));
    }

    public static modelRestRestOperationParamDefinitionToJson(value: ModelRestRestOperationParamDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestRestOperationParamDefinition")), null, 2);
    }

    public static toModelRestRestPropertyDefinition(json: string): ModelRestRestPropertyDefinition {
        return cast(JSON.parse(json), r("ModelRestRestPropertyDefinition"));
    }

    public static modelRestRestPropertyDefinitionToJson(value: ModelRestRestPropertyDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestRestPropertyDefinition")), null, 2);
    }

    public static toModelRestRestOperationResponseMsgDefinition(json: string): ModelRestRestOperationResponseMsgDefinition {
        return cast(JSON.parse(json), r("ModelRestRestOperationResponseMsgDefinition"));
    }

    public static modelRestRestOperationResponseMsgDefinitionToJson(value: ModelRestRestOperationResponseMsgDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestRestOperationResponseMsgDefinition")), null, 2);
    }

    public static toModelRestRestOperationResponseHeaderDefinition(json: string): ModelRestRestOperationResponseHeaderDefinition {
        return cast(JSON.parse(json), r("ModelRestRestOperationResponseHeaderDefinition"));
    }

    public static modelRestRestOperationResponseHeaderDefinitionToJson(value: ModelRestRestOperationResponseHeaderDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestRestOperationResponseHeaderDefinition")), null, 2);
    }

    public static toModelRouteDefinition(json: string): ModelRouteDefinition {
        return cast(JSON.parse(json), r("ModelRouteDefinition"));
    }

    public static modelRouteDefinitionToJson(value: ModelRouteDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRouteDefinition")), null, 2);
    }

    public static toModelFromDefinitionObject(json: string): ModelFromDefinitionObject {
        return cast(JSON.parse(json), r("ModelFromDefinitionObject"));
    }

    public static modelFromDefinitionObjectToJson(value: ModelFromDefinitionObject): string {
        return JSON.stringify(uncast(value, r("ModelFromDefinitionObject")), null, 2);
    }

    public static toModelRestSecurityDefinition(json: string): ModelRestSecurityDefinition {
        return cast(JSON.parse(json), r("ModelRestSecurityDefinition"));
    }

    public static modelRestSecurityDefinitionToJson(value: ModelRestSecurityDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestSecurityDefinition")), null, 2);
    }

    public static toModelRestGetVerbDefinition(json: string): ModelRestGetVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestGetVerbDefinition"));
    }

    public static modelRestGetVerbDefinitionToJson(value: ModelRestGetVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestGetVerbDefinition")), null, 2);
    }

    public static toModelRestHeadVerbDefinition(json: string): ModelRestHeadVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestHeadVerbDefinition"));
    }

    public static modelRestHeadVerbDefinitionToJson(value: ModelRestHeadVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestHeadVerbDefinition")), null, 2);
    }

    public static toModelRestPatchVerbDefinition(json: string): ModelRestPatchVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestPatchVerbDefinition"));
    }

    public static modelRestPatchVerbDefinitionToJson(value: ModelRestPatchVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestPatchVerbDefinition")), null, 2);
    }

    public static toModelRestPostVerbDefinition(json: string): ModelRestPostVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestPostVerbDefinition"));
    }

    public static modelRestPostVerbDefinitionToJson(value: ModelRestPostVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestPostVerbDefinition")), null, 2);
    }

    public static toModelRestPutVerbDefinition(json: string): ModelRestPutVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestPutVerbDefinition"));
    }

    public static modelRestPutVerbDefinitionToJson(value: ModelRestPutVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestPutVerbDefinition")), null, 2);
    }

    public static toModelRestRestSecuritiesDefinition(json: string): ModelRestRestSecuritiesDefinition {
        return cast(JSON.parse(json), r("ModelRestRestSecuritiesDefinition"));
    }

    public static modelRestRestSecuritiesDefinitionToJson(value: ModelRestRestSecuritiesDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecuritiesDefinition")), null, 2);
    }

    public static toModelRestRestSecurityApiKey(json: string): ModelRestRestSecurityApiKey {
        return cast(JSON.parse(json), r("ModelRestRestSecurityApiKey"));
    }

    public static modelRestRestSecurityApiKeyToJson(value: ModelRestRestSecurityApiKey): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecurityApiKey")), null, 2);
    }

    public static toModelRestRestSecurityBasicAuth(json: string): ModelRestRestSecurityBasicAuth {
        return cast(JSON.parse(json), r("ModelRestRestSecurityBasicAuth"));
    }

    public static modelRestRestSecurityBasicAuthToJson(value: ModelRestRestSecurityBasicAuth): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecurityBasicAuth")), null, 2);
    }

    public static toModelRestRestSecurityBearerToken(json: string): ModelRestRestSecurityBearerToken {
        return cast(JSON.parse(json), r("ModelRestRestSecurityBearerToken"));
    }

    public static modelRestRestSecurityBearerTokenToJson(value: ModelRestRestSecurityBearerToken): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecurityBearerToken")), null, 2);
    }

    public static toModelRestRestSecurityMutualTls(json: string): ModelRestRestSecurityMutualTls {
        return cast(JSON.parse(json), r("ModelRestRestSecurityMutualTls"));
    }

    public static modelRestRestSecurityMutualTlsToJson(value: ModelRestRestSecurityMutualTls): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecurityMutualTls")), null, 2);
    }

    public static toModelRestRestSecurityOAuth2(json: string): ModelRestRestSecurityOAuth2 {
        return cast(JSON.parse(json), r("ModelRestRestSecurityOAuth2"));
    }

    public static modelRestRestSecurityOAuth2ToJson(value: ModelRestRestSecurityOAuth2): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecurityOAuth2")), null, 2);
    }

    public static toModelRestRestSecurityOpenIdConnect(json: string): ModelRestRestSecurityOpenIdConnect {
        return cast(JSON.parse(json), r("ModelRestRestSecurityOpenIdConnect"));
    }

    public static modelRestRestSecurityOpenIdConnectToJson(value: ModelRestRestSecurityOpenIdConnect): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecurityOpenIdConnect")), null, 2);
    }

    public static toModelRestRestSecuritiesRequirement(json: string): ModelRestRestSecuritiesRequirement {
        return cast(JSON.parse(json), r("ModelRestRestSecuritiesRequirement"));
    }

    public static modelRestRestSecuritiesRequirementToJson(value: ModelRestRestSecuritiesRequirement): string {
        return JSON.stringify(uncast(value, r("ModelRestRestSecuritiesRequirement")), null, 2);
    }

    public static toModelRestVerbDefinition(json: string): ModelRestVerbDefinition {
        return cast(JSON.parse(json), r("ModelRestVerbDefinition"));
    }

    public static modelRestVerbDefinitionToJson(value: ModelRestVerbDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRestVerbDefinition")), null, 2);
    }

    public static toModelRouteTemplateDefinition(json: string): ModelRouteTemplateDefinition {
        return cast(JSON.parse(json), r("ModelRouteTemplateDefinition"));
    }

    public static modelRouteTemplateDefinitionToJson(value: ModelRouteTemplateDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRouteTemplateDefinition")), null, 2);
    }

    public static toModelRouteTemplateParameterDefinition(json: string): ModelRouteTemplateParameterDefinition {
        return cast(JSON.parse(json), r("ModelRouteTemplateParameterDefinition"));
    }

    public static modelRouteTemplateParameterDefinitionToJson(value: ModelRouteTemplateParameterDefinition): string {
        return JSON.stringify(uncast(value, r("ModelRouteTemplateParameterDefinition")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

export const typeMap: any = {
    "DslModelObject": o([
        { json: "beans", js: "beans", typ: u(undefined, a(r("DslYamlDeserializersNamedBeanDefinition"))) },
        { json: "error-handler", js: "errorHandler", typ: u(undefined, r("BuilderErrorHandlerBuilderRef")) },
        { json: "from", js: "from", typ: u(undefined, r("DslYamlDeserializersRouteFromDefinitionDeserializer")) },
        { json: "on-exception", js: "onException", typ: u(undefined, r("ModelOnExceptionDefinition")) },
        { json: "rest", js: "rest", typ: u(undefined, r("ModelRestRestDefinition")) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-template", js: "routeTemplate", typ: u(undefined, r("ModelRouteTemplateDefinition")) },
        { json: "template", js: "template", typ: u(undefined, r("ModelRouteTemplateDefinition")) },
    ], "any"),
    "DslYamlDeserializersNamedBeanDefinition": o([
        { json: "name", js: "name", typ: "" },
        { json: "properties", js: "properties", typ: u(undefined, m("any")) },
        { json: "type", js: "type", typ: "" },
    ], "any"),
    "BuilderErrorHandlerBuilderRef": o([
        { json: "dead-letter-channel", js: "deadLetterChannel", typ: u(undefined, u(r("BuilderDeadLetterChannelBuilderObject"), "")) },
        { json: "log", js: "log", typ: u(undefined, r("BuilderDefaultErrorHandlerBuilder")) },
        { json: "none", js: "none", typ: u(undefined, m("any")) },
        { json: "ref", js: "ref", typ: u(undefined, "") },
    ], "any"),
    "BuilderDeadLetterChannelBuilderObject": o([
        { json: "async-delayed-redelivery", js: "asyncDelayedRedelivery", typ: u(undefined, true) },
        { json: "dead-letter-handle-new-exception", js: "deadLetterHandleNewException", typ: u(undefined, true) },
        { json: "use-original-body", js: "useOriginalBody", typ: u(undefined, true) },
        { json: "use-original-message", js: "useOriginalMessage", typ: u(undefined, true) },
    ], "any"),
    "BuilderDefaultErrorHandlerBuilder": o([
        { json: "async-delayed-redelivery", js: "asyncDelayedRedelivery", typ: u(undefined, true) },
        { json: "dead-letter-handle-new-exception", js: "deadLetterHandleNewException", typ: u(undefined, true) },
        { json: "use-original-body", js: "useOriginalBody", typ: u(undefined, true) },
        { json: "use-original-message", js: "useOriginalMessage", typ: u(undefined, true) },
    ], "any"),
    "DslYamlDeserializersRouteFromDefinitionDeserializer": o([
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
        { json: "steps", js: "steps", typ: a(r("ModelProcessorDefinition")) },
        { json: "uri", js: "uri", typ: "" },
    ], "any"),
    "ModelWhenSkipSendToEndpointDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelWhenSkipSendToEndpointDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelTransactedDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "ref", js: "ref", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelStepDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelSplitDefinition": o([
        { json: "delimiter", js: "delimiter", typ: u(undefined, "") },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-prepare-ref", js: "onPrepareRef", typ: u(undefined, "") },
        { json: "parallel-aggregate", js: "parallelAggregate", typ: u(undefined, true) },
        { json: "parallel-processing", js: "parallelProcessing", typ: u(undefined, true) },
        { json: "share-unit-of-work", js: "shareUnitOfWork", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "stop-on-aggregate-exception", js: "stopOnAggregateException", typ: u(undefined, true) },
        { json: "stop-on-exception", js: "stopOnException", typ: u(undefined, true) },
        { json: "strategy-method-allow-null", js: "strategyMethodAllowNull", typ: u(undefined, true) },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
        { json: "streaming", js: "streaming", typ: u(undefined, true) },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelSplitDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelSagaDefinition": o([
        { json: "compensation", js: "compensation", typ: u(undefined, u(r("ModelSagaActionUriDefinitionObject"), "")) },
        { json: "completion", js: "completion", typ: u(undefined, u(r("ModelSagaActionUriDefinitionObject"), "")) },
        { json: "completion-mode", js: "completionMode", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "option", js: "option", typ: u(undefined, a(r("ModelSagaOptionDefinition"))) },
        { json: "propagation", js: "propagation", typ: u(undefined, "") },
        { json: "saga-service-ref", js: "sagaServiceRef", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
        { json: "timeout-in-milliseconds", js: "timeoutInMilliseconds", typ: u(undefined, 3.14) },
    ], "any"),
    "ModelResequenceDefinition": o([
        { json: "batch-config", js: "batchConfig", typ: u(undefined, r("ModelConfigBatchResequencerConfig")) },
        { json: "expression", js: "expression", typ: r("ModelLanguageExpressionDefinition") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "stream-config", js: "streamConfig", typ: u(undefined, r("ModelConfigStreamResequencerConfig")) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelResequenceDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelPolicyDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "ref", js: "ref", typ: "" },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelPipelineDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelOnCompletionDefinition": o([
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "mode", js: "mode", typ: u(undefined, "") },
        { json: "on-complete-only", js: "onCompleteOnly", typ: u(undefined, true) },
        { json: "on-failure-only", js: "onFailureOnly", typ: u(undefined, true) },
        { json: "on-when", js: "onWhen", typ: u(undefined, r("ModelWhenDefinition")) },
        { json: "parallel-processing", js: "parallelProcessing", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "use-original-message", js: "useOriginalMessage", typ: u(undefined, true) },
    ], "any"),
    "ModelMulticastDefinition": o([
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-prepare-ref", js: "onPrepareRef", typ: u(undefined, "") },
        { json: "parallel-aggregate", js: "parallelAggregate", typ: u(undefined, true) },
        { json: "parallel-processing", js: "parallelProcessing", typ: u(undefined, true) },
        { json: "share-unit-of-work", js: "shareUnitOfWork", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "stop-on-aggregate-exception", js: "stopOnAggregateException", typ: u(undefined, true) },
        { json: "stop-on-exception", js: "stopOnException", typ: u(undefined, true) },
        { json: "strategy-method-allow-null", js: "strategyMethodAllowNull", typ: u(undefined, true) },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
        { json: "streaming", js: "streaming", typ: u(undefined, true) },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
    ], "any"),
    "ModelLoopDefinition": o([
        { json: "break-on-shutdown", js: "breakOnShutdown", typ: u(undefined, true) },
        { json: "copy", js: "copy", typ: u(undefined, true) },
        { json: "do-while", js: "doWhile", typ: u(undefined, true) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelLoopDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelLoadBalanceDefinition": o([
        { json: "custom-load-balancer", js: "customLoadBalancer", typ: u(undefined, u(r("ModelLoadbalancerCustomLoadBalancerDefinitionObject"), "")) },
        { json: "failover", js: "failover", typ: u(undefined, r("ModelLoadbalancerFailoverLoadBalancerDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "random", js: "random", typ: u(undefined, r("ModelLoadbalancerRandomLoadBalancerDefinition")) },
        { json: "round-robin", js: "roundRobin", typ: u(undefined, r("ModelLoadbalancerRoundRobinLoadBalancerDefinition")) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "sticky", js: "sticky", typ: u(undefined, r("ModelLoadbalancerStickyLoadBalancerDefinition")) },
        { json: "topic", js: "topic", typ: u(undefined, r("ModelLoadbalancerTopicLoadBalancerDefinition")) },
        { json: "weighted", js: "weighted", typ: u(undefined, r("ModelLoadbalancerWeightedLoadBalancerDefinition")) },
    ], "any"),
    "ModelKameletDefinitionObject": o([
        { json: "name", js: "name", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelInterceptSendToEndpointDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "after-uri", js: "afterUri", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "skip-send-to-original-endpoint", js: "skipSendToOriginalEndpoint", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelInterceptFromDefinitionObject": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelInterceptDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelIdempotentConsumerDefinition": o([
        { json: "completion-eager", js: "completionEager", typ: u(undefined, "") },
        { json: "eager", js: "eager", typ: u(undefined, true) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "message-id-repository-ref", js: "messageIdRepositoryRef", typ: "" },
        { json: "remove-on-failure", js: "removeOnFailure", typ: u(undefined, true) },
        { json: "skip-duplicate", js: "skipDuplicate", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelIdempotentConsumerDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelFilterDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelFilterDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelTryDefinition": o([
        { json: "do-catch", js: "doCatch", typ: u(undefined, a(r("ModelCatchDefinition"))) },
        { json: "do-finally", js: "doFinally", typ: u(undefined, r("ModelFinallyDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelFinallyDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelCatchDefinition": o([
        { json: "exception", js: "exception", typ: u(undefined, a("")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-when", js: "onWhen", typ: u(undefined, r("ModelWhenDefinition")) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelOnFallbackDefinition": o([
        { json: "fallback-via-network", js: "fallbackViaNetwork", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelCircuitBreakerDefinition": o([
        { json: "configuration-ref", js: "configurationRef", typ: u(undefined, "") },
        { json: "fault-tolerance-configuration", js: "faultToleranceConfiguration", typ: u(undefined, r("ModelFaultToleranceConfigurationDefinition")) },
        { json: "hystrix-configuration", js: "hystrixConfiguration", typ: u(undefined, r("ModelHystrixConfigurationDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-fallback", js: "onFallback", typ: u(undefined, r("ModelOnFallbackDefinition")) },
        { json: "resilience4j-configuration", js: "resilience4JConfiguration", typ: u(undefined, r("ModelResilience4JConfigurationDefinition")) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelWhenDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelWhenDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelOtherwiseDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
    ], "any"),
    "ModelChoiceDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "otherwise", js: "otherwise", typ: u(undefined, r("ModelOtherwiseDefinition")) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "when", js: "when", typ: u(undefined, a(r("ModelWhenDefinition"))) },
    ], "any"),
    "ModelAggregateDefinition": o([
        { json: "aggregate-controller-ref", js: "aggregateControllerRef", typ: u(undefined, "") },
        { json: "aggregation-repository-ref", js: "aggregationRepositoryRef", typ: u(undefined, "") },
        { json: "close-correlation-key-on-completion", js: "closeCorrelationKeyOnCompletion", typ: u(undefined, 3.14) },
        { json: "complete-all-on-stop", js: "completeAllOnStop", typ: u(undefined, true) },
        { json: "completion-from-batch-consumer", js: "completionFromBatchConsumer", typ: u(undefined, true) },
        { json: "completion-interval", js: "completionInterval", typ: u(undefined, "") },
        { json: "completion-on-new-correlation-group", js: "completionOnNewCorrelationGroup", typ: u(undefined, true) },
        { json: "completion-predicate", js: "completionPredicate", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "completion-size", js: "completionSize", typ: u(undefined, 3.14) },
        { json: "completion-size-expression", js: "completionSizeExpression", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "completion-timeout", js: "completionTimeout", typ: u(undefined, "") },
        { json: "completion-timeout-checker-interval", js: "completionTimeoutCheckerInterval", typ: u(undefined, "") },
        { json: "completion-timeout-expression", js: "completionTimeoutExpression", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "correlation-expression", js: "correlationExpression", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "discard-on-aggregation-failure", js: "discardOnAggregationFailure", typ: u(undefined, true) },
        { json: "discard-on-completion-timeout", js: "discardOnCompletionTimeout", typ: u(undefined, true) },
        { json: "eager-check-completion", js: "eagerCheckCompletion", typ: u(undefined, true) },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "force-completion-on-stop", js: "forceCompletionOnStop", typ: u(undefined, true) },
        { json: "ignore-invalid-correlation-keys", js: "ignoreInvalidCorrelationKeys", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "optimistic-lock-retry-policy", js: "optimisticLockRetryPolicy", typ: u(undefined, r("ModelOptimisticLockRetryPolicyDefinition")) },
        { json: "optimistic-locking", js: "optimisticLocking", typ: u(undefined, true) },
        { json: "parallel-processing", js: "parallelProcessing", typ: u(undefined, true) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "strategy-method-allow-null", js: "strategyMethodAllowNull", typ: u(undefined, true) },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
        { json: "timeout-checker-executor-service-ref", js: "timeoutCheckerExecutorServiceRef", typ: u(undefined, "") },
    ], "any"),
    "ModelProcessorDefinition": o([
        { json: "aggregate", js: "aggregate", typ: u(undefined, r("ModelAggregateDefinition")) },
        { json: "bean", js: "bean", typ: u(undefined, u(r("ModelBeanDefinitionObject"), "")) },
        { json: "choice", js: "choice", typ: u(undefined, r("ModelChoiceDefinition")) },
        { json: "circuit-breaker", js: "circuitBreaker", typ: u(undefined, r("ModelCircuitBreakerDefinition")) },
        { json: "claim-check", js: "claimCheck", typ: u(undefined, r("ModelClaimCheckDefinition")) },
        { json: "convert-body-to", js: "convertBodyTo", typ: u(undefined, u(r("ModelConvertBodyDefinitionObject"), "")) },
        { json: "delay", js: "delay", typ: u(undefined, r("ModelDelayDefinition")) },
        { json: "do-catch", js: "doCatch", typ: u(undefined, r("ModelCatchDefinition")) },
        { json: "do-finally", js: "doFinally", typ: u(undefined, r("ModelFinallyDefinition")) },
        { json: "do-try", js: "doTry", typ: u(undefined, r("ModelTryDefinition")) },
        { json: "dynamic-router", js: "dynamicRouter", typ: u(undefined, r("ModelDynamicRouterDefinition")) },
        { json: "enrich", js: "enrich", typ: u(undefined, r("ModelEnrichDefinition")) },
        { json: "filter", js: "filter", typ: u(undefined, r("ModelFilterDefinition")) },
        { json: "idempotent-consumer", js: "idempotentConsumer", typ: u(undefined, r("ModelIdempotentConsumerDefinition")) },
        { json: "in-only", js: "inOnly", typ: u(undefined, u(r("ModelInOnlyDefinitionObject"), "")) },
        { json: "in-out", js: "inOut", typ: u(undefined, u(r("ModelInOutDefinitionObject"), "")) },
        { json: "intercept", js: "intercept", typ: u(undefined, r("ModelInterceptDefinition")) },
        { json: "intercept-from", js: "interceptFrom", typ: u(undefined, u(r("ModelInterceptFromDefinitionObject"), "")) },
        { json: "intercept-send-to-endpoint", js: "interceptSendToEndpoint", typ: u(undefined, u(r("ModelInterceptSendToEndpointDefinitionObject"), "")) },
        { json: "kamelet", js: "kamelet", typ: u(undefined, u(r("ModelKameletDefinitionObject"), "")) },
        { json: "load-balance", js: "loadBalance", typ: u(undefined, r("ModelLoadBalanceDefinition")) },
        { json: "log", js: "log", typ: u(undefined, u(r("ModelLogDefinitionObject"), "")) },
        { json: "loop", js: "loop", typ: u(undefined, r("ModelLoopDefinition")) },
        { json: "marshal", js: "marshal", typ: u(undefined, r("ModelMarshalDefinition")) },
        { json: "multicast", js: "multicast", typ: u(undefined, r("ModelMulticastDefinition")) },
        { json: "on-completion", js: "onCompletion", typ: u(undefined, r("ModelOnCompletionDefinition")) },
        { json: "on-fallback", js: "onFallback", typ: u(undefined, r("ModelOnFallbackDefinition")) },
        { json: "otherwise", js: "otherwise", typ: u(undefined, r("ModelOtherwiseDefinition")) },
        { json: "pipeline", js: "pipeline", typ: u(undefined, r("ModelPipelineDefinition")) },
        { json: "policy", js: "policy", typ: u(undefined, r("ModelPolicyDefinition")) },
        { json: "poll-enrich", js: "pollEnrich", typ: u(undefined, r("ModelPollEnrichDefinition")) },
        { json: "process", js: "process", typ: u(undefined, r("ModelProcessDefinition")) },
        { json: "recipient-list", js: "recipientList", typ: u(undefined, r("ModelRecipientListDefinition")) },
        { json: "remove-header", js: "removeHeader", typ: u(undefined, u(r("ModelRemoveHeaderDefinitionObject"), "")) },
        { json: "remove-headers", js: "removeHeaders", typ: u(undefined, u(r("ModelRemoveHeadersDefinitionObject"), "")) },
        { json: "remove-properties", js: "removeProperties", typ: u(undefined, u(r("ModelRemovePropertiesDefinitionObject"), "")) },
        { json: "remove-property", js: "removeProperty", typ: u(undefined, u(r("ModelRemovePropertyDefinitionObject"), "")) },
        { json: "resequence", js: "resequence", typ: u(undefined, r("ModelResequenceDefinition")) },
        { json: "rollback", js: "rollback", typ: u(undefined, u(r("ModelRollbackDefinitionObject"), "")) },
        { json: "routing-slip", js: "routingSlip", typ: u(undefined, r("ModelRoutingSlipDefinition")) },
        { json: "saga", js: "saga", typ: u(undefined, r("ModelSagaDefinition")) },
        { json: "sample", js: "sample", typ: u(undefined, r("ModelSamplingDefinition")) },
        { json: "script", js: "script", typ: u(undefined, r("ModelScriptDefinition")) },
        { json: "service-call", js: "serviceCall", typ: u(undefined, u(r("ModelCloudServiceCallDefinitionObject"), "")) },
        { json: "set-body", js: "setBody", typ: u(undefined, r("ModelSetBodyDefinition")) },
        { json: "set-exchange-pattern", js: "setExchangePattern", typ: u(undefined, u(r("ModelSetExchangePatternDefinitionObject"), "")) },
        { json: "set-header", js: "setHeader", typ: u(undefined, r("ModelSetHeaderDefinition")) },
        { json: "set-property", js: "setProperty", typ: u(undefined, r("ModelSetPropertyDefinition")) },
        { json: "sort", js: "sort", typ: u(undefined, r("ModelSortDefinition")) },
        { json: "split", js: "split", typ: u(undefined, r("ModelSplitDefinition")) },
        { json: "step", js: "step", typ: u(undefined, r("ModelStepDefinition")) },
        { json: "stop", js: "stop", typ: u(undefined, r("ModelStopDefinition")) },
        { json: "threads", js: "threads", typ: u(undefined, r("ModelThreadsDefinition")) },
        { json: "throttle", js: "throttle", typ: u(undefined, r("ModelThrottleDefinition")) },
        { json: "throw-exception", js: "throwException", typ: u(undefined, r("ModelThrowExceptionDefinition")) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "tod", js: "tod", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "transacted", js: "transacted", typ: u(undefined, r("ModelTransactedDefinition")) },
        { json: "transform", js: "transform", typ: u(undefined, r("ModelTransformDefinition")) },
        { json: "unmarshal", js: "unmarshal", typ: u(undefined, r("ModelUnmarshalDefinition")) },
        { json: "validate", js: "validate", typ: u(undefined, r("ModelValidateDefinition")) },
        { json: "when", js: "when", typ: u(undefined, r("ModelWhenDefinition")) },
        { json: "when-skip-send-to-endpoint", js: "whenSkipSendToEndpoint", typ: u(undefined, r("ModelWhenSkipSendToEndpointDefinition")) },
        { json: "wire-tap", js: "wireTap", typ: u(undefined, r("ModelWireTapDefinition")) },
    ], "any"),
    "ModelLanguageConstantExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageCSimpleExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "result-type", js: "resultType", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageDatasonnetExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "body-media-type", js: "bodyMediaType", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "output-media-type", js: "outputMediaType", typ: u(undefined, "") },
        { json: "result-type", js: "resultType", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageExchangePropertyExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageExpressionDefinition": o([
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelLanguageExpressionDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelLanguageGroovyExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageHeaderExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageHl7TerserExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageJoorExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "pre-compile", js: "preCompile", typ: u(undefined, true) },
        { json: "result-type", js: "resultType", typ: u(undefined, "") },
        { json: "single-quotes", js: "singleQuotes", typ: u(undefined, true) },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageJsonPathExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "allow-easy-predicate", js: "allowEasyPredicate", typ: u(undefined, true) },
        { json: "allow-simple", js: "allowSimple", typ: u(undefined, true) },
        { json: "header-name", js: "headerName", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "option", js: "option", typ: u(undefined, "") },
        { json: "result-type", js: "resultType", typ: u(undefined, "") },
        { json: "suppress-exceptions", js: "suppressExceptions", typ: u(undefined, true) },
        { json: "trim", js: "trim", typ: u(undefined, true) },
        { json: "write-as-string", js: "writeAsString", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageLanguageExpression": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "language", js: "language", typ: "" },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageMethodCallExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "bean-type", js: "beanType", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "ref", js: "ref", typ: u(undefined, "") },
        { json: "scope", js: "scope", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageMvelExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageOgnlExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageRefExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageSimpleExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "result-type", js: "resultType", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageSpElExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageTokenizerExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "token", js: "token", typ: "" },
        { json: "end-token", js: "endToken", typ: u(undefined, "") },
        { json: "group", js: "group", typ: u(undefined, "") },
        { json: "group-delimiter", js: "groupDelimiter", typ: u(undefined, "") },
        { json: "header-name", js: "headerName", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "include-tokens", js: "includeTokens", typ: u(undefined, true) },
        { json: "inherit-namespace-tag-name", js: "inheritNamespaceTagName", typ: u(undefined, "") },
        { json: "regex", js: "regex", typ: u(undefined, true) },
        { json: "skip-first", js: "skipFirst", typ: u(undefined, true) },
        { json: "trim", js: "trim", typ: u(undefined, true) },
        { json: "xml", js: "xml", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageXPathExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "document-type", js: "documentType", typ: u(undefined, "") },
        { json: "factory-ref", js: "factoryRef", typ: u(undefined, "") },
        { json: "header-name", js: "headerName", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "log-namespaces", js: "logNamespaces", typ: u(undefined, true) },
        { json: "object-model", js: "objectModel", typ: u(undefined, "") },
        { json: "pre-compile", js: "preCompile", typ: u(undefined, true) },
        { json: "result-type", js: "resultType", typ: u(undefined, "") },
        { json: "saxon", js: "saxon", typ: u(undefined, true) },
        { json: "thread-safety", js: "threadSafety", typ: u(undefined, true) },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelLanguageXQueryExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "configuration-ref", js: "configurationRef", typ: u(undefined, "") },
        { json: "header-name", js: "headerName", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
        { json: "type", js: "type", typ: u(undefined, "") },
    ], "any"),
    "ModelLanguageXmlTokenizerExpressionObject": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "group", js: "group", typ: u(undefined, 3.14) },
        { json: "header-name", js: "headerName", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "mode", js: "mode", typ: u(undefined, "") },
        { json: "trim", js: "trim", typ: u(undefined, true) },
    ], "any"),
    "ModelSagaActionUriDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
    ], "any"),
    "ModelSagaOptionDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "option-name", js: "optionName", typ: "" },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelSagaOptionDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelConfigBatchResequencerConfig": o([
        { json: "allow-duplicates", js: "allowDuplicates", typ: u(undefined, true) },
        { json: "batch-size", js: "batchSize", typ: u(undefined, 3.14) },
        { json: "batch-timeout", js: "batchTimeout", typ: u(undefined, "") },
        { json: "ignore-invalid-exchanges", js: "ignoreInvalidExchanges", typ: u(undefined, true) },
        { json: "reverse", js: "reverse", typ: u(undefined, true) },
    ], "any"),
    "ModelConfigStreamResequencerConfig": o([
        { json: "capacity", js: "capacity", typ: u(undefined, 3.14) },
        { json: "comparator-ref", js: "comparatorRef", typ: u(undefined, "") },
        { json: "delivery-attempt-interval", js: "deliveryAttemptInterval", typ: u(undefined, "") },
        { json: "ignore-invalid-exchanges", js: "ignoreInvalidExchanges", typ: u(undefined, true) },
        { json: "reject-old", js: "rejectOld", typ: u(undefined, true) },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
    ], "any"),
    "ModelLoadbalancerCustomLoadBalancerDefinitionObject": o([
        { json: "ref", js: "ref", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelLoadbalancerFailoverLoadBalancerDefinition": o([
        { json: "exception", js: "exception", typ: u(undefined, a("")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "maximum-failover-attempts", js: "maximumFailoverAttempts", typ: u(undefined, "") },
        { json: "round-robin", js: "roundRobin", typ: u(undefined, "") },
        { json: "sticky", js: "sticky", typ: u(undefined, "") },
    ], "any"),
    "ModelLoadbalancerRandomLoadBalancerDefinition": o([
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelLoadbalancerRoundRobinLoadBalancerDefinition": o([
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelLoadbalancerStickyLoadBalancerDefinition": o([
        { json: "correlation-expression", js: "correlationExpression", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelExpressionSubElementDefinition": o([
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelExpressionSubElementDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelLoadbalancerTopicLoadBalancerDefinition": o([
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelLoadbalancerWeightedLoadBalancerDefinition": o([
        { json: "distribution-ratio", js: "distributionRatio", typ: "" },
        { json: "distribution-ratio-delimiter", js: "distributionRatioDelimiter", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "round-robin", js: "roundRobin", typ: u(undefined, "") },
    ], "any"),
    "ModelFaultToleranceConfigurationDefinition": o([
        { json: "bulkhead-enabled", js: "bulkheadEnabled", typ: u(undefined, true) },
        { json: "bulkhead-executor-service-ref", js: "bulkheadExecutorServiceRef", typ: u(undefined, "") },
        { json: "bulkhead-max-concurrent-calls", js: "bulkheadMaxConcurrentCalls", typ: u(undefined, 3.14) },
        { json: "bulkhead-waiting-task-queue", js: "bulkheadWaitingTaskQueue", typ: u(undefined, 3.14) },
        { json: "circuit-breaker-ref", js: "circuitBreakerRef", typ: u(undefined, "") },
        { json: "delay", js: "delay", typ: u(undefined, "") },
        { json: "failure-ratio", js: "failureRatio", typ: u(undefined, 3.14) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "request-volume-threshold", js: "requestVolumeThreshold", typ: u(undefined, 3.14) },
        { json: "success-threshold", js: "successThreshold", typ: u(undefined, 3.14) },
        { json: "timeout-duration", js: "timeoutDuration", typ: u(undefined, "") },
        { json: "timeout-enabled", js: "timeoutEnabled", typ: u(undefined, true) },
        { json: "timeout-pool-size", js: "timeoutPoolSize", typ: u(undefined, 3.14) },
        { json: "timeout-scheduled-executor-service-ref", js: "timeoutScheduledExecutorServiceRef", typ: u(undefined, "") },
    ], "any"),
    "ModelHystrixConfigurationDefinition": o([
        { json: "allow-maximum-size-to-diverge-from-core-size", js: "allowMaximumSizeToDivergeFromCoreSize", typ: u(undefined, true) },
        { json: "circuit-breaker-enabled", js: "circuitBreakerEnabled", typ: u(undefined, true) },
        { json: "circuit-breaker-error-threshold-percentage", js: "circuitBreakerErrorThresholdPercentage", typ: u(undefined, 3.14) },
        { json: "circuit-breaker-force-closed", js: "circuitBreakerForceClosed", typ: u(undefined, true) },
        { json: "circuit-breaker-force-open", js: "circuitBreakerForceOpen", typ: u(undefined, true) },
        { json: "circuit-breaker-request-volume-threshold", js: "circuitBreakerRequestVolumeThreshold", typ: u(undefined, 3.14) },
        { json: "circuit-breaker-sleep-window-in-milliseconds", js: "circuitBreakerSleepWindowInMilliseconds", typ: u(undefined, 3.14) },
        { json: "core-pool-size", js: "corePoolSize", typ: u(undefined, 3.14) },
        { json: "execution-isolation-semaphore-max-concurrent-requests", js: "executionIsolationSemaphoreMaxConcurrentRequests", typ: u(undefined, 3.14) },
        { json: "execution-isolation-strategy", js: "executionIsolationStrategy", typ: u(undefined, "") },
        { json: "execution-isolation-thread-interrupt-on-timeout", js: "executionIsolationThreadInterruptOnTimeout", typ: u(undefined, true) },
        { json: "execution-timeout-enabled", js: "executionTimeoutEnabled", typ: u(undefined, true) },
        { json: "execution-timeout-in-milliseconds", js: "executionTimeoutInMilliseconds", typ: u(undefined, 3.14) },
        { json: "fallback-enabled", js: "fallbackEnabled", typ: u(undefined, true) },
        { json: "fallback-isolation-semaphore-max-concurrent-requests", js: "fallbackIsolationSemaphoreMaxConcurrentRequests", typ: u(undefined, 3.14) },
        { json: "group-key", js: "groupKey", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "keep-alive-time", js: "keepAliveTime", typ: u(undefined, 3.14) },
        { json: "max-queue-size", js: "maxQueueSize", typ: u(undefined, 3.14) },
        { json: "maximum-size", js: "maximumSize", typ: u(undefined, 3.14) },
        { json: "metrics-health-snapshot-interval-in-milliseconds", js: "metricsHealthSnapshotIntervalInMilliseconds", typ: u(undefined, 3.14) },
        { json: "metrics-rolling-percentile-bucket-size", js: "metricsRollingPercentileBucketSize", typ: u(undefined, 3.14) },
        { json: "metrics-rolling-percentile-enabled", js: "metricsRollingPercentileEnabled", typ: u(undefined, true) },
        { json: "metrics-rolling-percentile-window-buckets", js: "metricsRollingPercentileWindowBuckets", typ: u(undefined, 3.14) },
        { json: "metrics-rolling-percentile-window-in-milliseconds", js: "metricsRollingPercentileWindowInMilliseconds", typ: u(undefined, 3.14) },
        { json: "metrics-rolling-statistical-window-buckets", js: "metricsRollingStatisticalWindowBuckets", typ: u(undefined, 3.14) },
        { json: "metrics-rolling-statistical-window-in-milliseconds", js: "metricsRollingStatisticalWindowInMilliseconds", typ: u(undefined, 3.14) },
        { json: "queue-size-rejection-threshold", js: "queueSizeRejectionThreshold", typ: u(undefined, 3.14) },
        { json: "request-log-enabled", js: "requestLogEnabled", typ: u(undefined, true) },
        { json: "thread-pool-key", js: "threadPoolKey", typ: u(undefined, "") },
        { json: "thread-pool-rolling-number-statistical-window-buckets", js: "threadPoolRollingNumberStatisticalWindowBuckets", typ: u(undefined, 3.14) },
        { json: "thread-pool-rolling-number-statistical-window-in-milliseconds", js: "threadPoolRollingNumberStatisticalWindowInMilliseconds", typ: u(undefined, 3.14) },
    ], "any"),
    "ModelResilience4JConfigurationDefinition": o([
        { json: "automatic-transition-from-open-to-half-open-enabled", js: "automaticTransitionFromOpenToHalfOpenEnabled", typ: u(undefined, true) },
        { json: "circuit-breaker-ref", js: "circuitBreakerRef", typ: u(undefined, "") },
        { json: "config-ref", js: "configRef", typ: u(undefined, "") },
        { json: "failure-rate-threshold", js: "failureRateThreshold", typ: u(undefined, 3.14) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "minimum-number-of-calls", js: "minimumNumberOfCalls", typ: u(undefined, 3.14) },
        { json: "permitted-number-of-calls-in-half-open-state", js: "permittedNumberOfCallsInHalfOpenState", typ: u(undefined, 3.14) },
        { json: "sliding-window-size", js: "slidingWindowSize", typ: u(undefined, 3.14) },
        { json: "sliding-window-type", js: "slidingWindowType", typ: u(undefined, "") },
        { json: "slow-call-duration-threshold", js: "slowCallDurationThreshold", typ: u(undefined, 3.14) },
        { json: "slow-call-rate-threshold", js: "slowCallRateThreshold", typ: u(undefined, 3.14) },
        { json: "wait-duration-in-open-state", js: "waitDurationInOpenState", typ: u(undefined, 3.14) },
        { json: "writable-stack-trace-enabled", js: "writableStackTraceEnabled", typ: u(undefined, true) },
    ], "any"),
    "ModelOptimisticLockRetryPolicyDefinition": o([
        { json: "exponential-back-off", js: "exponentialBackOff", typ: u(undefined, true) },
        { json: "maximum-retries", js: "maximumRetries", typ: u(undefined, 3.14) },
        { json: "maximum-retry-delay", js: "maximumRetryDelay", typ: u(undefined, "") },
        { json: "random-back-off", js: "randomBackOff", typ: u(undefined, true) },
        { json: "retry-delay", js: "retryDelay", typ: u(undefined, "") },
    ], "any"),
    "ModelBeanDefinitionObject": o([
        { json: "bean-type", js: "beanType", typ: u(undefined, "") },
        { json: "cache", js: "cache", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "ref", js: "ref", typ: u(undefined, "") },
        { json: "scope", js: "scope", typ: u(undefined, "") },
    ], "any"),
    "ModelClaimCheckDefinition": o([
        { json: "filter", js: "filter", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "key", js: "key", typ: u(undefined, "") },
        { json: "operation", js: "operation", typ: "" },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
    ], "any"),
    "ModelConvertBodyDefinitionObject": o([
        { json: "type", js: "type", typ: "" },
        { json: "charset", js: "charset", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "mandatory", js: "mandatory", typ: u(undefined, true) },
    ], "any"),
    "ModelDelayDefinition": o([
        { json: "async-delayed", js: "asyncDelayed", typ: u(undefined, true) },
        { json: "caller-runs-when-rejected", js: "callerRunsWhenRejected", typ: u(undefined, true) },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelDelayDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelDynamicRouterDefinition": o([
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "ignore-invalid-endpoints", js: "ignoreInvalidEndpoints", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "uri-delimiter", js: "uriDelimiter", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelDynamicRouterDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelEnrichDefinition": o([
        { json: "aggregate-on-exception", js: "aggregateOnException", typ: u(undefined, true) },
        { json: "allow-optimised-components", js: "allowOptimisedComponents", typ: u(undefined, true) },
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "ignore-invalid-endpoint", js: "ignoreInvalidEndpoint", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "share-unit-of-work", js: "shareUnitOfWork", typ: u(undefined, true) },
        { json: "strategy-method-allow-null", js: "strategyMethodAllowNull", typ: u(undefined, "") },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelEnrichDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelInOnlyDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
    ], "any"),
    "ModelInOutDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
    ], "any"),
    "ModelLogDefinitionObject": o([
        { json: "message", js: "message", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "log-name", js: "logName", typ: u(undefined, "") },
        { json: "logger-ref", js: "loggerRef", typ: u(undefined, "") },
        { json: "logging-level", js: "loggingLevel", typ: u(undefined, "") },
        { json: "marker", js: "marker", typ: u(undefined, "") },
    ], "any"),
    "ModelMarshalDefinition": o([
        { json: "any23", js: "any23", typ: u(undefined, u(r("ModelDataformatAny23DataFormatObject"), "")) },
        { json: "asn1", js: "asn1", typ: u(undefined, u(r("ModelDataformatAsn1DataFormatObject"), "")) },
        { json: "avro", js: "avro", typ: u(undefined, u(r("ModelDataformatAvroDataFormatObject"), "")) },
        { json: "barcode", js: "barcode", typ: u(undefined, r("ModelDataformatBarcodeDataFormat")) },
        { json: "base64", js: "base64", typ: u(undefined, r("ModelDataformatBase64DataFormat")) },
        { json: "beanio", js: "beanio", typ: u(undefined, r("ModelDataformatBeanioDataFormat")) },
        { json: "bindy", js: "bindy", typ: u(undefined, r("ModelDataformatBindyDataFormat")) },
        { json: "cbor", js: "cbor", typ: u(undefined, r("ModelDataformatCborDataFormat")) },
        { json: "crypto", js: "crypto", typ: u(undefined, r("ModelDataformatCryptoDataFormat")) },
        { json: "csv", js: "csv", typ: u(undefined, u(r("ModelDataformatCsvDataFormatObject"), "")) },
        { json: "custom", js: "custom", typ: u(undefined, u(r("ModelDataformatCustomDataFormatObject"), "")) },
        { json: "fhir-json", js: "fhirJson", typ: u(undefined, r("ModelDataformatFhirJsonDataFormat")) },
        { json: "fhir-xml", js: "fhirXml", typ: u(undefined, r("ModelDataformatFhirXmlDataFormat")) },
        { json: "flatpack", js: "flatpack", typ: u(undefined, r("ModelDataformatFlatpackDataFormat")) },
        { json: "grok", js: "grok", typ: u(undefined, r("ModelDataformatGrokDataFormat")) },
        { json: "gzip", js: "gzip", typ: u(undefined, r("ModelDataformatGzipDataFormat")) },
        { json: "hl7", js: "hl7", typ: u(undefined, r("ModelDataformatHl7DataFormat")) },
        { json: "ical", js: "ical", typ: u(undefined, r("ModelDataformatIcalDataFormat")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "jacksonxml", js: "jacksonxml", typ: u(undefined, r("ModelDataformatJacksonXmlDataFormat")) },
        { json: "jaxb", js: "jaxb", typ: u(undefined, r("ModelDataformatJaxbDataFormat")) },
        { json: "json", js: "json", typ: u(undefined, r("ModelDataformatJsonDataFormat")) },
        { json: "json-api", js: "jsonApi", typ: u(undefined, r("ModelDataformatJsonApiDataFormat")) },
        { json: "lzf", js: "lzf", typ: u(undefined, r("ModelDataformatLzfDataFormat")) },
        { json: "mime-multipart", js: "mimeMultipart", typ: u(undefined, r("ModelDataformatMimeMultipartDataFormat")) },
        { json: "pgp", js: "pgp", typ: u(undefined, r("ModelDataformatPgpDataFormat")) },
        { json: "protobuf", js: "protobuf", typ: u(undefined, u(r("ModelDataformatProtobufDataFormatObject"), "")) },
        { json: "rss", js: "rss", typ: u(undefined, r("ModelDataformatRssDataFormat")) },
        { json: "secure-xml", js: "secureXml", typ: u(undefined, r("ModelDataformatXmlSecurityDataFormat")) },
        { json: "soapjaxb", js: "soapjaxb", typ: u(undefined, u(r("ModelDataformatSoapJaxbDataFormatObject"), "")) },
        { json: "syslog", js: "syslog", typ: u(undefined, r("ModelDataformatSyslogDataFormat")) },
        { json: "tarfile", js: "tarfile", typ: u(undefined, r("ModelDataformatTarFileDataFormat")) },
        { json: "thrift", js: "thrift", typ: u(undefined, u(r("ModelDataformatThriftDataFormatObject"), "")) },
        { json: "tidy-markup", js: "tidyMarkup", typ: u(undefined, r("ModelDataformatTidyMarkupDataFormat")) },
        { json: "univocity-csv", js: "univocityCsv", typ: u(undefined, r("ModelDataformatUniVocityCsvDataFormat")) },
        { json: "univocity-fixed", js: "univocityFixed", typ: u(undefined, r("ModelDataformatUniVocityFixedWidthDataFormat")) },
        { json: "univocity-tsv", js: "univocityTsv", typ: u(undefined, r("ModelDataformatUniVocityTsvDataFormat")) },
        { json: "xmlrpc", js: "xmlrpc", typ: u(undefined, r("ModelDataformatXmlRpcDataFormat")) },
        { json: "xstream", js: "xstream", typ: u(undefined, u(r("ModelDataformatXStreamDataFormatObject"), "")) },
        { json: "yaml", js: "yaml", typ: u(undefined, r("ModelDataformatYamlDataFormat")) },
        { json: "zip", js: "zip", typ: u(undefined, r("ModelDataformatZipDeflaterDataFormat")) },
        { json: "zipfile", js: "zipfile", typ: u(undefined, r("ModelDataformatZipFileDataFormat")) },
    ], "any"),
    "ModelDataformatAny23DataFormatObject": o([
        { json: "base-uri", js: "baseUri", typ: u(undefined, "") },
        { json: "configuration", js: "configuration", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "extractors", js: "extractors", typ: u(undefined, a("")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "output-format", js: "outputFormat", typ: u(undefined, "") },
    ], "any"),
    "ModelPropertyDefinition": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], "any"),
    "ModelDataformatAsn1DataFormatObject": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "using-iterator", js: "usingIterator", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatAvroDataFormatObject": o([
        { json: "allow-jms-type", js: "allowJmsType", typ: u(undefined, true) },
        { json: "allow-unmarshall-type", js: "allowUnmarshallType", typ: u(undefined, true) },
        { json: "auto-discover-object-mapper", js: "autoDiscoverObjectMapper", typ: u(undefined, true) },
        { json: "auto-discover-schema-resolver", js: "autoDiscoverSchemaResolver", typ: u(undefined, true) },
        { json: "collection-type", js: "collectionType", typ: u(undefined, "") },
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "disable-features", js: "disableFeatures", typ: u(undefined, "") },
        { json: "enable-features", js: "enableFeatures", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "include", js: "include", typ: u(undefined, "") },
        { json: "instance-class-name", js: "instanceClassName", typ: u(undefined, "") },
        { json: "json-view", js: "jsonView", typ: u(undefined, "") },
        { json: "library", js: "library", typ: u(undefined, r("ModelDataformatAvroDataFormatLibrary")) },
        { json: "module-class-names", js: "moduleClassNames", typ: u(undefined, "") },
        { json: "module-refs", js: "moduleRefs", typ: u(undefined, "") },
        { json: "object-mapper", js: "objectMapper", typ: u(undefined, "") },
        { json: "schema-resolver", js: "schemaResolver", typ: u(undefined, "") },
        { json: "timezone", js: "timezone", typ: u(undefined, "") },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "use-default-object-mapper", js: "useDefaultObjectMapper", typ: u(undefined, true) },
        { json: "use-list", js: "useList", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatBarcodeDataFormat": o([
        { json: "barcode-format", js: "barcodeFormat", typ: u(undefined, "") },
        { json: "height", js: "height", typ: u(undefined, 3.14) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "image-type", js: "imageType", typ: u(undefined, "") },
        { json: "width", js: "width", typ: u(undefined, 3.14) },
    ], "any"),
    "ModelDataformatBase64DataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "line-length", js: "lineLength", typ: u(undefined, 3.14) },
        { json: "line-separator", js: "lineSeparator", typ: u(undefined, "") },
        { json: "url-safe", js: "urlSafe", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatBeanioDataFormat": o([
        { json: "bean-reader-error-handler-type", js: "beanReaderErrorHandlerType", typ: u(undefined, "") },
        { json: "encoding", js: "encoding", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-invalid-records", js: "ignoreInvalidRecords", typ: u(undefined, true) },
        { json: "ignore-unexpected-records", js: "ignoreUnexpectedRecords", typ: u(undefined, true) },
        { json: "ignore-unidentified-records", js: "ignoreUnidentifiedRecords", typ: u(undefined, true) },
        { json: "mapping", js: "mapping", typ: "" },
        { json: "stream-name", js: "streamName", typ: "" },
        { json: "unmarshal-single-object", js: "unmarshalSingleObject", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatBindyDataFormat": o([
        { json: "allow-empty-stream", js: "allowEmptyStream", typ: u(undefined, true) },
        { json: "class-type", js: "classType", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "locale", js: "locale", typ: u(undefined, "") },
        { json: "type", js: "type", typ: "" },
        { json: "unwrap-single-instance", js: "unwrapSingleInstance", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatCborDataFormat": o([
        { json: "allow-jms-type", js: "allowJmsType", typ: u(undefined, true) },
        { json: "allow-unmarshall-type", js: "allowUnmarshallType", typ: u(undefined, true) },
        { json: "collection-type", js: "collectionType", typ: u(undefined, "") },
        { json: "disable-features", js: "disableFeatures", typ: u(undefined, "") },
        { json: "enable-features", js: "enableFeatures", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "object-mapper", js: "objectMapper", typ: u(undefined, "") },
        { json: "pretty-print", js: "prettyPrint", typ: u(undefined, true) },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "use-default-object-mapper", js: "useDefaultObjectMapper", typ: u(undefined, true) },
        { json: "use-list", js: "useList", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatCryptoDataFormat": o([
        { json: "algorithm", js: "algorithm", typ: u(undefined, "") },
        { json: "algorithm-parameter-ref", js: "algorithmParameterRef", typ: u(undefined, "") },
        { json: "buffersize", js: "buffersize", typ: u(undefined, 3.14) },
        { json: "crypto-provider", js: "cryptoProvider", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "init-vector-ref", js: "initVectorRef", typ: u(undefined, "") },
        { json: "inline", js: "inline", typ: u(undefined, true) },
        { json: "key-ref", js: "keyRef", typ: u(undefined, "") },
        { json: "mac-algorithm", js: "macAlgorithm", typ: u(undefined, "") },
        { json: "should-append-hmac", js: "shouldAppendHmac", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatCsvDataFormatObject": o([
        { json: "allow-missing-column-names", js: "allowMissingColumnNames", typ: u(undefined, true) },
        { json: "capture-header-record", js: "captureHeaderRecord", typ: u(undefined, true) },
        { json: "comment-marker", js: "commentMarker", typ: u(undefined, "") },
        { json: "comment-marker-disabled", js: "commentMarkerDisabled", typ: u(undefined, true) },
        { json: "delimiter", js: "delimiter", typ: u(undefined, "") },
        { json: "escape", js: "escape", typ: u(undefined, "") },
        { json: "escape-disabled", js: "escapeDisabled", typ: u(undefined, true) },
        { json: "format-name", js: "formatName", typ: u(undefined, "") },
        { json: "format-ref", js: "formatRef", typ: u(undefined, "") },
        { json: "header", js: "header", typ: u(undefined, a("")) },
        { json: "header-disabled", js: "headerDisabled", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-empty-lines", js: "ignoreEmptyLines", typ: u(undefined, true) },
        { json: "ignore-header-case", js: "ignoreHeaderCase", typ: u(undefined, true) },
        { json: "ignore-surrounding-spaces", js: "ignoreSurroundingSpaces", typ: u(undefined, true) },
        { json: "lazy-load", js: "lazyLoad", typ: u(undefined, true) },
        { json: "marshaller-factory-ref", js: "marshallerFactoryRef", typ: u(undefined, "") },
        { json: "null-string", js: "nullString", typ: u(undefined, "") },
        { json: "null-string-disabled", js: "nullStringDisabled", typ: u(undefined, true) },
        { json: "quote", js: "quote", typ: u(undefined, "") },
        { json: "quote-disabled", js: "quoteDisabled", typ: u(undefined, true) },
        { json: "quote-mode", js: "quoteMode", typ: u(undefined, "") },
        { json: "record-converter-ref", js: "recordConverterRef", typ: u(undefined, "") },
        { json: "record-separator", js: "recordSeparator", typ: u(undefined, "") },
        { json: "record-separator-disabled", js: "recordSeparatorDisabled", typ: u(undefined, "") },
        { json: "skip-header-record", js: "skipHeaderRecord", typ: u(undefined, true) },
        { json: "trailing-delimiter", js: "trailingDelimiter", typ: u(undefined, true) },
        { json: "trim", js: "trim", typ: u(undefined, true) },
        { json: "use-maps", js: "useMaps", typ: u(undefined, true) },
        { json: "use-ordered-maps", js: "useOrderedMaps", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatCustomDataFormatObject": o([
        { json: "ref", js: "ref", typ: "" },
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatFhirJsonDataFormat": o([
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "dont-encode-elements", js: "dontEncodeElements", typ: u(undefined, a("")) },
        { json: "dont-strip-versions-from-references-at-paths", js: "dontStripVersionsFromReferencesAtPaths", typ: u(undefined, a("")) },
        { json: "encode-elements", js: "encodeElements", typ: u(undefined, a("")) },
        { json: "encode-elements-applies-to-child-resources-only", js: "encodeElementsAppliesToChildResourcesOnly", typ: u(undefined, true) },
        { json: "fhir-version", js: "fhirVersion", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "omit-resource-id", js: "omitResourceId", typ: u(undefined, true) },
        { json: "override-resource-id-with-bundle-entry-full-url", js: "overrideResourceIdWithBundleEntryFullUrl", typ: u(undefined, true) },
        { json: "pretty-print", js: "prettyPrint", typ: u(undefined, true) },
        { json: "server-base-url", js: "serverBaseUrl", typ: u(undefined, "") },
        { json: "strip-versions-from-references", js: "stripVersionsFromReferences", typ: u(undefined, true) },
        { json: "summary-mode", js: "summaryMode", typ: u(undefined, true) },
        { json: "suppress-narratives", js: "suppressNarratives", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatFhirXmlDataFormat": o([
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "dont-encode-elements", js: "dontEncodeElements", typ: u(undefined, a("")) },
        { json: "dont-strip-versions-from-references-at-paths", js: "dontStripVersionsFromReferencesAtPaths", typ: u(undefined, a("")) },
        { json: "encode-elements", js: "encodeElements", typ: u(undefined, a("")) },
        { json: "encode-elements-applies-to-child-resources-only", js: "encodeElementsAppliesToChildResourcesOnly", typ: u(undefined, true) },
        { json: "fhir-version", js: "fhirVersion", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "omit-resource-id", js: "omitResourceId", typ: u(undefined, true) },
        { json: "override-resource-id-with-bundle-entry-full-url", js: "overrideResourceIdWithBundleEntryFullUrl", typ: u(undefined, true) },
        { json: "pretty-print", js: "prettyPrint", typ: u(undefined, true) },
        { json: "server-base-url", js: "serverBaseUrl", typ: u(undefined, "") },
        { json: "strip-versions-from-references", js: "stripVersionsFromReferences", typ: u(undefined, true) },
        { json: "summary-mode", js: "summaryMode", typ: u(undefined, true) },
        { json: "suppress-narratives", js: "suppressNarratives", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatFlatpackDataFormat": o([
        { json: "allow-short-lines", js: "allowShortLines", typ: u(undefined, true) },
        { json: "definition", js: "definition", typ: u(undefined, "") },
        { json: "delimiter", js: "delimiter", typ: u(undefined, "") },
        { json: "fixed", js: "fixed", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-extra-columns", js: "ignoreExtraColumns", typ: u(undefined, true) },
        { json: "ignore-first-record", js: "ignoreFirstRecord", typ: u(undefined, true) },
        { json: "parser-factory-ref", js: "parserFactoryRef", typ: u(undefined, "") },
        { json: "text-qualifier", js: "textQualifier", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatGrokDataFormat": o([
        { json: "allow-multiple-matches-per-line", js: "allowMultipleMatchesPerLine", typ: u(undefined, true) },
        { json: "flattened", js: "flattened", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "named-only", js: "namedOnly", typ: u(undefined, true) },
        { json: "pattern", js: "pattern", typ: "" },
    ], "any"),
    "ModelDataformatGzipDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatHl7DataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "validate", js: "validate", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatIcalDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "validating", js: "validating", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatJacksonXmlDataFormat": o([
        { json: "allow-jms-type", js: "allowJmsType", typ: u(undefined, true) },
        { json: "allow-unmarshall-type", js: "allowUnmarshallType", typ: u(undefined, true) },
        { json: "collection-type", js: "collectionType", typ: u(undefined, "") },
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "disable-features", js: "disableFeatures", typ: u(undefined, "") },
        { json: "enable-features", js: "enableFeatures", typ: u(undefined, "") },
        { json: "enable-jaxb-annotation-module", js: "enableJaxbAnnotationModule", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "include", js: "include", typ: u(undefined, "") },
        { json: "json-view", js: "jsonView", typ: u(undefined, "") },
        { json: "module-class-names", js: "moduleClassNames", typ: u(undefined, "") },
        { json: "module-refs", js: "moduleRefs", typ: u(undefined, "") },
        { json: "pretty-print", js: "prettyPrint", typ: u(undefined, true) },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "use-list", js: "useList", typ: u(undefined, true) },
        { json: "xml-mapper", js: "xmlMapper", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatJaxbDataFormat": o([
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "context-path", js: "contextPath", typ: "" },
        { json: "context-path-is-class-name", js: "contextPathIsClassName", typ: u(undefined, true) },
        { json: "encoding", js: "encoding", typ: u(undefined, "") },
        { json: "filter-non-xml-chars", js: "filterNonXmlChars", typ: u(undefined, true) },
        { json: "fragment", js: "fragment", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-jaxb-element", js: "ignoreJaxbElement", typ: u(undefined, true) },
        { json: "jaxb-provider-properties", js: "jaxbProviderProperties", typ: u(undefined, "") },
        { json: "must-be-jaxb-element", js: "mustBeJaxbElement", typ: u(undefined, true) },
        { json: "namespace-prefix-ref", js: "namespacePrefixRef", typ: u(undefined, "") },
        { json: "no-namespace-schema-location", js: "noNamespaceSchemaLocation", typ: u(undefined, "") },
        { json: "object-factory", js: "objectFactory", typ: u(undefined, true) },
        { json: "part-class", js: "partClass", typ: u(undefined, "") },
        { json: "part-namespace", js: "partNamespace", typ: u(undefined, "") },
        { json: "pretty-print", js: "prettyPrint", typ: u(undefined, true) },
        { json: "schema", js: "schema", typ: u(undefined, "") },
        { json: "schema-location", js: "schemaLocation", typ: u(undefined, "") },
        { json: "schema-severity-level", js: "schemaSeverityLevel", typ: u(undefined, 3.14) },
        { json: "xml-stream-writer-wrapper", js: "xmlStreamWriterWrapper", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatJsonDataFormat": o([
        { json: "allow-jms-type", js: "allowJmsType", typ: u(undefined, true) },
        { json: "allow-unmarshall-type", js: "allowUnmarshallType", typ: u(undefined, true) },
        { json: "auto-discover-object-mapper", js: "autoDiscoverObjectMapper", typ: u(undefined, true) },
        { json: "auto-discover-schema-resolver", js: "autoDiscoverSchemaResolver", typ: u(undefined, true) },
        { json: "collection-type", js: "collectionType", typ: u(undefined, "") },
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "disable-features", js: "disableFeatures", typ: u(undefined, "") },
        { json: "drop-root-node", js: "dropRootNode", typ: u(undefined, true) },
        { json: "enable-features", js: "enableFeatures", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "include", js: "include", typ: u(undefined, "") },
        { json: "json-view", js: "jsonView", typ: u(undefined, "") },
        { json: "library", js: "library", typ: u(undefined, r("JsonLibrary")) },
        { json: "module-class-names", js: "moduleClassNames", typ: u(undefined, "") },
        { json: "module-refs", js: "moduleRefs", typ: u(undefined, "") },
        { json: "object-mapper", js: "objectMapper", typ: u(undefined, "") },
        { json: "permissions", js: "permissions", typ: u(undefined, "") },
        { json: "pretty-print", js: "prettyPrint", typ: u(undefined, true) },
        { json: "schema-resolver", js: "schemaResolver", typ: u(undefined, "") },
        { json: "timezone", js: "timezone", typ: u(undefined, "") },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "use-default-object-mapper", js: "useDefaultObjectMapper", typ: u(undefined, true) },
        { json: "use-list", js: "useList", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatJsonApiDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "main-format-type", js: "mainFormatType", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatLzfDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "using-parallel-compression", js: "usingParallelCompression", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatMimeMultipartDataFormat": o([
        { json: "binary-content", js: "binaryContent", typ: u(undefined, true) },
        { json: "headers-inline", js: "headersInline", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "include-headers", js: "includeHeaders", typ: u(undefined, "") },
        { json: "multipart-sub-type", js: "multipartSubType", typ: u(undefined, "") },
        { json: "multipart-without-attachment", js: "multipartWithoutAttachment", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatPgpDataFormat": o([
        { json: "algorithm", js: "algorithm", typ: u(undefined, 3.14) },
        { json: "armored", js: "armored", typ: u(undefined, true) },
        { json: "compression-algorithm", js: "compressionAlgorithm", typ: u(undefined, 3.14) },
        { json: "hash-algorithm", js: "hashAlgorithm", typ: u(undefined, 3.14) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "integrity", js: "integrity", typ: u(undefined, true) },
        { json: "key-file-name", js: "keyFileName", typ: u(undefined, "") },
        { json: "key-userid", js: "keyUserid", typ: u(undefined, "") },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "provider", js: "provider", typ: u(undefined, "") },
        { json: "signature-key-file-name", js: "signatureKeyFileName", typ: u(undefined, "") },
        { json: "signature-key-ring", js: "signatureKeyRing", typ: u(undefined, "") },
        { json: "signature-key-userid", js: "signatureKeyUserid", typ: u(undefined, "") },
        { json: "signature-password", js: "signaturePassword", typ: u(undefined, "") },
        { json: "signature-verification-option", js: "signatureVerificationOption", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatProtobufDataFormatObject": o([
        { json: "allow-jms-type", js: "allowJmsType", typ: u(undefined, true) },
        { json: "allow-unmarshall-type", js: "allowUnmarshallType", typ: u(undefined, true) },
        { json: "auto-discover-object-mapper", js: "autoDiscoverObjectMapper", typ: u(undefined, true) },
        { json: "auto-discover-schema-resolver", js: "autoDiscoverSchemaResolver", typ: u(undefined, true) },
        { json: "collection-type", js: "collectionType", typ: u(undefined, "") },
        { json: "content-type-format", js: "contentTypeFormat", typ: u(undefined, "") },
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "disable-features", js: "disableFeatures", typ: u(undefined, "") },
        { json: "enable-features", js: "enableFeatures", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "include", js: "include", typ: u(undefined, "") },
        { json: "instance-class", js: "instanceClass", typ: u(undefined, "") },
        { json: "json-view", js: "jsonView", typ: u(undefined, "") },
        { json: "library", js: "library", typ: u(undefined, r("ModelDataformatProtobufDataFormatLibrary")) },
        { json: "module-class-names", js: "moduleClassNames", typ: u(undefined, "") },
        { json: "module-refs", js: "moduleRefs", typ: u(undefined, "") },
        { json: "object-mapper", js: "objectMapper", typ: u(undefined, "") },
        { json: "schema-resolver", js: "schemaResolver", typ: u(undefined, "") },
        { json: "timezone", js: "timezone", typ: u(undefined, "") },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "use-default-object-mapper", js: "useDefaultObjectMapper", typ: u(undefined, true) },
        { json: "use-list", js: "useList", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatRssDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatXmlSecurityDataFormat": o([
        { json: "add-key-value-for-encrypted-key", js: "addKeyValueForEncryptedKey", typ: u(undefined, true) },
        { json: "digest-algorithm", js: "digestAlgorithm", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "key-cipher-algorithm", js: "keyCipherAlgorithm", typ: u(undefined, "") },
        { json: "key-or-trust-store-parameters-ref", js: "keyOrTrustStoreParametersRef", typ: u(undefined, "") },
        { json: "key-password", js: "keyPassword", typ: u(undefined, "") },
        { json: "mgf-algorithm", js: "mgfAlgorithm", typ: u(undefined, "") },
        { json: "pass-phrase", js: "passPhrase", typ: u(undefined, "") },
        { json: "pass-phrase-byte", js: "passPhraseByte", typ: u(undefined, "") },
        { json: "recipient-key-alias", js: "recipientKeyAlias", typ: u(undefined, "") },
        { json: "secure-tag", js: "secureTag", typ: u(undefined, "") },
        { json: "secure-tag-contents", js: "secureTagContents", typ: u(undefined, true) },
        { json: "xml-cipher-algorithm", js: "xmlCipherAlgorithm", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatSoapJaxbDataFormatObject": o([
        { json: "context-path", js: "contextPath", typ: "" },
        { json: "element-name-strategy-ref", js: "elementNameStrategyRef", typ: u(undefined, "") },
        { json: "encoding", js: "encoding", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "namespace-prefix-ref", js: "namespacePrefixRef", typ: u(undefined, "") },
        { json: "schema", js: "schema", typ: u(undefined, "") },
        { json: "version", js: "version", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatSyslogDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatTarFileDataFormat": o([
        { json: "allow-empty-directory", js: "allowEmptyDirectory", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "max-decompressed-size", js: "maxDecompressedSize", typ: u(undefined, 3.14) },
        { json: "preserve-path-elements", js: "preservePathElements", typ: u(undefined, true) },
        { json: "using-iterator", js: "usingIterator", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatThriftDataFormatObject": o([
        { json: "content-type-format", js: "contentTypeFormat", typ: u(undefined, "") },
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "instance-class", js: "instanceClass", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatTidyMarkupDataFormat": o([
        { json: "data-object-type", js: "dataObjectType", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "omit-xml-declaration", js: "omitXmlDeclaration", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatUniVocityCsvDataFormat": o([
        { json: "as-map", js: "asMap", typ: u(undefined, true) },
        { json: "comment", js: "comment", typ: u(undefined, "") },
        { json: "delimiter", js: "delimiter", typ: u(undefined, "") },
        { json: "empty-value", js: "emptyValue", typ: u(undefined, "") },
        { json: "header-extraction-enabled", js: "headerExtractionEnabled", typ: u(undefined, true) },
        { json: "headers-disabled", js: "headersDisabled", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-leading-whitespaces", js: "ignoreLeadingWhitespaces", typ: u(undefined, true) },
        { json: "ignore-trailing-whitespaces", js: "ignoreTrailingWhitespaces", typ: u(undefined, true) },
        { json: "lazy-load", js: "lazyLoad", typ: u(undefined, true) },
        { json: "line-separator", js: "lineSeparator", typ: u(undefined, "") },
        { json: "normalized-line-separator", js: "normalizedLineSeparator", typ: u(undefined, "") },
        { json: "null-value", js: "nullValue", typ: u(undefined, "") },
        { json: "number-of-records-to-read", js: "numberOfRecordsToRead", typ: u(undefined, 3.14) },
        { json: "quote", js: "quote", typ: u(undefined, "") },
        { json: "quote-all-fields", js: "quoteAllFields", typ: u(undefined, true) },
        { json: "quote-escape", js: "quoteEscape", typ: u(undefined, "") },
        { json: "skip-empty-lines", js: "skipEmptyLines", typ: u(undefined, true) },
        { json: "univocity-header", js: "univocityHeader", typ: u(undefined, a(r("ModelDataformatUniVocityHeader"))) },
    ], "any"),
    "ModelDataformatUniVocityHeader": o([
        { json: "length", js: "length", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatUniVocityFixedWidthDataFormat": o([
        { json: "as-map", js: "asMap", typ: u(undefined, true) },
        { json: "comment", js: "comment", typ: u(undefined, "") },
        { json: "empty-value", js: "emptyValue", typ: u(undefined, "") },
        { json: "header-extraction-enabled", js: "headerExtractionEnabled", typ: u(undefined, true) },
        { json: "headers-disabled", js: "headersDisabled", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-leading-whitespaces", js: "ignoreLeadingWhitespaces", typ: u(undefined, true) },
        { json: "ignore-trailing-whitespaces", js: "ignoreTrailingWhitespaces", typ: u(undefined, true) },
        { json: "lazy-load", js: "lazyLoad", typ: u(undefined, true) },
        { json: "line-separator", js: "lineSeparator", typ: u(undefined, "") },
        { json: "normalized-line-separator", js: "normalizedLineSeparator", typ: u(undefined, "") },
        { json: "null-value", js: "nullValue", typ: u(undefined, "") },
        { json: "number-of-records-to-read", js: "numberOfRecordsToRead", typ: u(undefined, 3.14) },
        { json: "padding", js: "padding", typ: u(undefined, "") },
        { json: "record-ends-on-newline", js: "recordEndsOnNewline", typ: u(undefined, true) },
        { json: "skip-empty-lines", js: "skipEmptyLines", typ: u(undefined, true) },
        { json: "skip-trailing-chars-until-newline", js: "skipTrailingCharsUntilNewline", typ: u(undefined, true) },
        { json: "univocity-header", js: "univocityHeader", typ: u(undefined, a(r("ModelDataformatUniVocityHeader"))) },
    ], "any"),
    "ModelDataformatUniVocityTsvDataFormat": o([
        { json: "as-map", js: "asMap", typ: u(undefined, true) },
        { json: "comment", js: "comment", typ: u(undefined, "") },
        { json: "empty-value", js: "emptyValue", typ: u(undefined, "") },
        { json: "escape-char", js: "escapeChar", typ: u(undefined, "") },
        { json: "header-extraction-enabled", js: "headerExtractionEnabled", typ: u(undefined, true) },
        { json: "headers-disabled", js: "headersDisabled", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "ignore-leading-whitespaces", js: "ignoreLeadingWhitespaces", typ: u(undefined, true) },
        { json: "ignore-trailing-whitespaces", js: "ignoreTrailingWhitespaces", typ: u(undefined, true) },
        { json: "lazy-load", js: "lazyLoad", typ: u(undefined, true) },
        { json: "line-separator", js: "lineSeparator", typ: u(undefined, "") },
        { json: "normalized-line-separator", js: "normalizedLineSeparator", typ: u(undefined, "") },
        { json: "null-value", js: "nullValue", typ: u(undefined, "") },
        { json: "number-of-records-to-read", js: "numberOfRecordsToRead", typ: u(undefined, 3.14) },
        { json: "skip-empty-lines", js: "skipEmptyLines", typ: u(undefined, true) },
        { json: "univocity-header", js: "univocityHeader", typ: u(undefined, a(r("ModelDataformatUniVocityHeader"))) },
    ], "any"),
    "ModelDataformatXmlRpcDataFormat": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "request", js: "request", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatXStreamDataFormatObject": o([
        { json: "aliases", js: "aliases", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "content-type-header", js: "contentTypeHeader", typ: u(undefined, true) },
        { json: "converters", js: "converters", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "driver", js: "driver", typ: u(undefined, "") },
        { json: "driver-ref", js: "driverRef", typ: u(undefined, "") },
        { json: "encoding", js: "encoding", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "implicit-collections", js: "implicitCollections", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "mode", js: "mode", typ: u(undefined, "") },
        { json: "omit-fields", js: "omitFields", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "permissions", js: "permissions", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatYamlDataFormat": o([
        { json: "allow-any-type", js: "allowAnyType", typ: u(undefined, true) },
        { json: "allow-recursive-keys", js: "allowRecursiveKeys", typ: u(undefined, true) },
        { json: "constructor", js: "constructor", typ: u(undefined, "") },
        { json: "dumper-options", js: "dumperOptions", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "library", js: "library", typ: u(undefined, r("YamlLibrary")) },
        { json: "max-aliases-for-collections", js: "maxAliasesForCollections", typ: u(undefined, 3.14) },
        { json: "pretty-flow", js: "prettyFlow", typ: u(undefined, true) },
        { json: "representer", js: "representer", typ: u(undefined, "") },
        { json: "resolver", js: "resolver", typ: u(undefined, "") },
        { json: "type-filter", js: "typeFilter", typ: u(undefined, a(r("ModelDataformatYamlTypeFilterDefinition"))) },
        { json: "unmarshal-type", js: "unmarshalType", typ: u(undefined, "") },
        { json: "use-application-context-class-loader", js: "useApplicationContextClassLoader", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatYamlTypeFilterDefinition": o([
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "value", js: "value", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatZipDeflaterDataFormat": o([
        { json: "compression-level", js: "compressionLevel", typ: u(undefined, 3.14) },
        { json: "id", js: "id", typ: u(undefined, "") },
    ], "any"),
    "ModelDataformatZipFileDataFormat": o([
        { json: "allow-empty-directory", js: "allowEmptyDirectory", typ: u(undefined, true) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "max-decompressed-size", js: "maxDecompressedSize", typ: u(undefined, 3.14) },
        { json: "preserve-path-elements", js: "preservePathElements", typ: u(undefined, true) },
        { json: "using-iterator", js: "usingIterator", typ: u(undefined, true) },
    ], "any"),
    "ModelPollEnrichDefinition": o([
        { json: "aggregate-on-exception", js: "aggregateOnException", typ: u(undefined, true) },
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "ignore-invalid-endpoint", js: "ignoreInvalidEndpoint", typ: u(undefined, 3.14) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "strategy-method-allow-null", js: "strategyMethodAllowNull", typ: u(undefined, true) },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelPollEnrichDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelProcessDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "ref", js: "ref", typ: "" },
    ], "any"),
    "ModelRecipientListDefinition": o([
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "delimiter", js: "delimiter", typ: u(undefined, "") },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "ignore-invalid-endpoints", js: "ignoreInvalidEndpoints", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-prepare-ref", js: "onPrepareRef", typ: u(undefined, "") },
        { json: "parallel-aggregate", js: "parallelAggregate", typ: u(undefined, true) },
        { json: "parallel-processing", js: "parallelProcessing", typ: u(undefined, true) },
        { json: "share-unit-of-work", js: "shareUnitOfWork", typ: u(undefined, true) },
        { json: "stop-on-aggregate-exception", js: "stopOnAggregateException", typ: u(undefined, true) },
        { json: "stop-on-exception", js: "stopOnException", typ: u(undefined, true) },
        { json: "strategy-method-allow-null", js: "strategyMethodAllowNull", typ: u(undefined, true) },
        { json: "strategy-method-name", js: "strategyMethodName", typ: u(undefined, "") },
        { json: "strategy-ref", js: "strategyRef", typ: u(undefined, "") },
        { json: "streaming", js: "streaming", typ: u(undefined, true) },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelRecipientListDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelRemoveHeaderDefinitionObject": o([
        { json: "header-name", js: "headerName", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "ModelRemoveHeadersDefinitionObject": o([
        { json: "pattern", js: "pattern", typ: "" },
        { json: "exclude-pattern", js: "excludePattern", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
    ], "any"),
    "ModelRemovePropertiesDefinitionObject": o([
        { json: "pattern", js: "pattern", typ: "" },
        { json: "exclude-pattern", js: "excludePattern", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
    ], "any"),
    "ModelRemovePropertyDefinitionObject": o([
        { json: "property-name", js: "propertyName", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
    ], "any"),
    "ModelRollbackDefinitionObject": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "mark-rollback-only", js: "markRollbackOnly", typ: u(undefined, true) },
        { json: "mark-rollback-only-last", js: "markRollbackOnlyLast", typ: u(undefined, true) },
        { json: "message", js: "message", typ: u(undefined, "") },
    ], "any"),
    "ModelRoutingSlipDefinition": o([
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "ignore-invalid-endpoints", js: "ignoreInvalidEndpoints", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "uri-delimiter", js: "uriDelimiter", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelRoutingSlipDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelSamplingDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "message-frequency", js: "messageFrequency", typ: u(undefined, 3.14) },
        { json: "sample-period", js: "samplePeriod", typ: u(undefined, "") },
        { json: "units", js: "units", typ: u(undefined, "") },
    ], "any"),
    "ModelScriptDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelScriptDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelCloudServiceCallDefinitionObject": o([
        { json: "name", js: "name", typ: "" },
        { json: "blacklist-service-filter", js: "blacklistServiceFilter", typ: u(undefined, r("ModelCloudBlacklistServiceCallServiceFilterConfiguration")) },
        { json: "caching-service-discovery", js: "cachingServiceDiscovery", typ: u(undefined, r("ModelCloudCachingServiceCallServiceDiscoveryConfiguration")) },
        { json: "combined-service-discovery", js: "combinedServiceDiscovery", typ: u(undefined, r("ModelCloudCombinedServiceCallServiceDiscoveryConfiguration")) },
        { json: "combined-service-filter", js: "combinedServiceFilter", typ: u(undefined, r("ModelCloudCombinedServiceCallServiceFilterConfiguration")) },
        { json: "component", js: "component", typ: u(undefined, "") },
        { json: "configuration-ref", js: "configurationRef", typ: u(undefined, "") },
        { json: "consul-service-discovery", js: "consulServiceDiscovery", typ: u(undefined, r("ModelCloudConsulServiceCallServiceDiscoveryConfiguration")) },
        { json: "custom-service-filter", js: "customServiceFilter", typ: u(undefined, r("ModelCloudCustomServiceCallServiceFilterConfiguration")) },
        { json: "default-load-balancer", js: "defaultLoadBalancer", typ: u(undefined, r("ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration")) },
        { json: "dns-service-discovery", js: "dnsServiceDiscovery", typ: u(undefined, r("ModelCloudDnsServiceCallServiceDiscoveryConfiguration")) },
        { json: "etcd-service-discovery", js: "etcdServiceDiscovery", typ: u(undefined, r("ModelCloudEtcdServiceCallServiceDiscoveryConfiguration")) },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelCloudServiceCallExpressionConfiguration")) },
        { json: "expression-ref", js: "expressionRef", typ: u(undefined, "") },
        { json: "healthy-service-filter", js: "healthyServiceFilter", typ: u(undefined, r("ModelCloudHealthyServiceCallServiceFilterConfiguration")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "kubernetes-service-discovery", js: "kubernetesServiceDiscovery", typ: u(undefined, r("ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration")) },
        { json: "load-balancer-ref", js: "loadBalancerRef", typ: u(undefined, "") },
        { json: "pass-through-service-filter", js: "passThroughServiceFilter", typ: u(undefined, r("ModelCloudPassThroughServiceCallServiceFilterConfiguration")) },
        { json: "pattern", js: "pattern", typ: u(undefined, "") },
        { json: "ribbon-load-balancer", js: "ribbonLoadBalancer", typ: u(undefined, r("ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration")) },
        { json: "service-chooser-ref", js: "serviceChooserRef", typ: u(undefined, "") },
        { json: "service-discovery-ref", js: "serviceDiscoveryRef", typ: u(undefined, "") },
        { json: "service-filter-ref", js: "serviceFilterRef", typ: u(undefined, "") },
        { json: "static-service-discovery", js: "staticServiceDiscovery", typ: u(undefined, r("ModelCloudStaticServiceCallServiceDiscoveryConfiguration")) },
        { json: "uri", js: "uri", typ: u(undefined, "") },
        { json: "zookeeper-service-discovery", js: "zookeeperServiceDiscovery", typ: u(undefined, r("ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration")) },
    ], "any"),
    "ModelCloudBlacklistServiceCallServiceFilterConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "servers", js: "servers", typ: u(undefined, a("")) },
    ], "any"),
    "ModelCloudCombinedServiceCallServiceDiscoveryConfiguration": o([
        { json: "caching-service-discovery", js: "cachingServiceDiscovery", typ: u(undefined, r("ModelCloudCachingServiceCallServiceDiscoveryConfiguration")) },
        { json: "consul-service-discovery", js: "consulServiceDiscovery", typ: u(undefined, r("ModelCloudConsulServiceCallServiceDiscoveryConfiguration")) },
        { json: "dns-service-discovery", js: "dnsServiceDiscovery", typ: u(undefined, r("ModelCloudDnsServiceCallServiceDiscoveryConfiguration")) },
        { json: "etcd-service-discovery", js: "etcdServiceDiscovery", typ: u(undefined, r("ModelCloudEtcdServiceCallServiceDiscoveryConfiguration")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "kubernetes-service-discovery", js: "kubernetesServiceDiscovery", typ: u(undefined, r("ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration")) },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "static-service-discovery", js: "staticServiceDiscovery", typ: u(undefined, r("ModelCloudStaticServiceCallServiceDiscoveryConfiguration")) },
    ], "any"),
    "ModelCloudCachingServiceCallServiceDiscoveryConfiguration": o([
        { json: "combined-service-discovery", js: "combinedServiceDiscovery", typ: u(undefined, r("ModelCloudCombinedServiceCallServiceDiscoveryConfiguration")) },
        { json: "consul-service-discovery", js: "consulServiceDiscovery", typ: u(undefined, r("ModelCloudConsulServiceCallServiceDiscoveryConfiguration")) },
        { json: "dns-service-discovery", js: "dnsServiceDiscovery", typ: u(undefined, r("ModelCloudDnsServiceCallServiceDiscoveryConfiguration")) },
        { json: "etcd-service-discovery", js: "etcdServiceDiscovery", typ: u(undefined, r("ModelCloudEtcdServiceCallServiceDiscoveryConfiguration")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "kubernetes-service-discovery", js: "kubernetesServiceDiscovery", typ: u(undefined, r("ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration")) },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "static-service-discovery", js: "staticServiceDiscovery", typ: u(undefined, r("ModelCloudStaticServiceCallServiceDiscoveryConfiguration")) },
        { json: "timeout", js: "timeout", typ: u(undefined, 3.14) },
        { json: "units", js: "units", typ: u(undefined, "") },
    ], "any"),
    "ModelCloudConsulServiceCallServiceDiscoveryConfiguration": o([
        { json: "acl-token", js: "aclToken", typ: u(undefined, "") },
        { json: "block-seconds", js: "blockSeconds", typ: u(undefined, 3.14) },
        { json: "connect-timeout-millis", js: "connectTimeoutMillis", typ: u(undefined, 3.14) },
        { json: "datacenter", js: "datacenter", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "read-timeout-millis", js: "readTimeoutMillis", typ: u(undefined, 3.14) },
        { json: "url", js: "url", typ: u(undefined, "") },
        { json: "user-name", js: "userName", typ: u(undefined, "") },
        { json: "write-timeout-millis", js: "writeTimeoutMillis", typ: u(undefined, 3.14) },
    ], "any"),
    "ModelCloudDnsServiceCallServiceDiscoveryConfiguration": o([
        { json: "domain", js: "domain", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "proto", js: "proto", typ: u(undefined, "") },
    ], "any"),
    "ModelCloudEtcdServiceCallServiceDiscoveryConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "service-path", js: "servicePath", typ: u(undefined, "") },
        { json: "timeout", js: "timeout", typ: u(undefined, 3.14) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uris", js: "uris", typ: u(undefined, "") },
        { json: "user-name", js: "userName", typ: u(undefined, "") },
    ], "any"),
    "ModelCloudKubernetesServiceCallServiceDiscoveryConfiguration": o([
        { json: "api-version", js: "apiVersion", typ: u(undefined, "") },
        { json: "ca-cert-data", js: "caCertData", typ: u(undefined, "") },
        { json: "ca-cert-file", js: "caCertFile", typ: u(undefined, "") },
        { json: "client-cert-data", js: "clientCertData", typ: u(undefined, "") },
        { json: "client-cert-file", js: "clientCertFile", typ: u(undefined, "") },
        { json: "client-key-algo", js: "clientKeyAlgo", typ: u(undefined, "") },
        { json: "client-key-data", js: "clientKeyData", typ: u(undefined, "") },
        { json: "client-key-file", js: "clientKeyFile", typ: u(undefined, "") },
        { json: "client-key-passphrase", js: "clientKeyPassphrase", typ: u(undefined, "") },
        { json: "dns-domain", js: "dnsDomain", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "lookup", js: "lookup", typ: u(undefined, "") },
        { json: "master-url", js: "masterUrl", typ: u(undefined, "") },
        { json: "namespace", js: "namespace", typ: u(undefined, "") },
        { json: "oauth-token", js: "oauthToken", typ: u(undefined, "") },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "port-name", js: "portName", typ: u(undefined, "") },
        { json: "port-protocol", js: "portProtocol", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "trust-certs", js: "trustCerts", typ: u(undefined, true) },
        { json: "username", js: "username", typ: u(undefined, "") },
    ], "any"),
    "ModelCloudStaticServiceCallServiceDiscoveryConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "servers", js: "servers", typ: u(undefined, a("")) },
    ], "any"),
    "ModelCloudCombinedServiceCallServiceFilterConfiguration": o([
        { json: "blacklist-service-filter", js: "blacklistServiceFilter", typ: u(undefined, r("ModelCloudBlacklistServiceCallServiceFilterConfiguration")) },
        { json: "custom-service-filter", js: "customServiceFilter", typ: u(undefined, r("ModelCloudCustomServiceCallServiceFilterConfiguration")) },
        { json: "healthy-service-filter", js: "healthyServiceFilter", typ: u(undefined, r("ModelCloudHealthyServiceCallServiceFilterConfiguration")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "pass-through-service-filter", js: "passThroughServiceFilter", typ: u(undefined, r("ModelCloudPassThroughServiceCallServiceFilterConfiguration")) },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
    ], "any"),
    "ModelCloudCustomServiceCallServiceFilterConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "ref", js: "ref", typ: u(undefined, "") },
    ], "any"),
    "ModelCloudHealthyServiceCallServiceFilterConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
    ], "any"),
    "ModelCloudPassThroughServiceCallServiceFilterConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
    ], "any"),
    "ModelCloudDefaultServiceCallServiceLoadBalancerConfiguration": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
    ], "any"),
    "ModelCloudServiceCallExpressionConfiguration": o([
        { json: "expression-type", js: "expressionType", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "host-header", js: "hostHeader", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "port-header", js: "portHeader", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
    ], "any"),
    "ModelCloudRibbonServiceCallServiceLoadBalancerConfiguration": o([
        { json: "client-name", js: "clientName", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "namespace", js: "namespace", typ: u(undefined, "") },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "username", js: "username", typ: u(undefined, "") },
    ], "any"),
    "ModelCloudZooKeeperServiceCallServiceDiscoveryConfiguration": o([
        { json: "base-path", js: "basePath", typ: "" },
        { json: "connection-timeout", js: "connectionTimeout", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "namespace", js: "namespace", typ: u(undefined, "") },
        { json: "nodes", js: "nodes", typ: "" },
        { json: "properties", js: "properties", typ: u(undefined, a(r("ModelPropertyDefinition"))) },
        { json: "reconnect-base-sleep-time", js: "reconnectBaseSleepTime", typ: u(undefined, "") },
        { json: "reconnect-max-retries", js: "reconnectMaxRetries", typ: u(undefined, "") },
        { json: "reconnect-max-sleep-time", js: "reconnectMaxSleepTime", typ: u(undefined, "") },
        { json: "session-timeout", js: "sessionTimeout", typ: u(undefined, "") },
    ], "any"),
    "ModelSetBodyDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelSetBodyDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelSetExchangePatternDefinitionObject": o([
        { json: "pattern", js: "pattern", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
    ], "any"),
    "ModelSetHeaderDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "name", js: "name", typ: "" },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelSetHeaderDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelSetPropertyDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "name", js: "name", typ: "" },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelSetPropertyDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelSortDefinition": o([
        { json: "comparator-ref", js: "comparatorRef", typ: u(undefined, "") },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelSortDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelStopDefinition": o([
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
    ], "any"),
    "ModelThreadsDefinition": o([
        { json: "allow-core-thread-time-out", js: "allowCoreThreadTimeOut", typ: u(undefined, true) },
        { json: "caller-runs-when-rejected", js: "callerRunsWhenRejected", typ: u(undefined, "") },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "keep-alive-time", js: "keepAliveTime", typ: u(undefined, 3.14) },
        { json: "max-pool-size", js: "maxPoolSize", typ: u(undefined, 3.14) },
        { json: "max-queue-size", js: "maxQueueSize", typ: u(undefined, 3.14) },
        { json: "pool-size", js: "poolSize", typ: u(undefined, 3.14) },
        { json: "rejected-policy", js: "rejectedPolicy", typ: u(undefined, "") },
        { json: "thread-name", js: "threadName", typ: u(undefined, "") },
        { json: "time-unit", js: "timeUnit", typ: u(undefined, "") },
    ], "any"),
    "ModelThrottleDefinition": o([
        { json: "async-delayed", js: "asyncDelayed", typ: u(undefined, true) },
        { json: "caller-runs-when-rejected", js: "callerRunsWhenRejected", typ: u(undefined, true) },
        { json: "correlation-expression", js: "correlationExpression", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "reject-execution", js: "rejectExecution", typ: u(undefined, true) },
        { json: "time-period-millis", js: "timePeriodMillis", typ: u(undefined, "") },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelThrottleDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelThrowExceptionDefinition": o([
        { json: "exception-type", js: "exceptionType", typ: u(undefined, "") },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "message", js: "message", typ: u(undefined, "") },
        { json: "ref", js: "ref", typ: u(undefined, "") },
    ], "any"),
    "ModelToDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
        { json: "pattern", js: "pattern", typ: u(undefined, "") },
    ], "any"),
    "ModelToDynamicDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "allow-optimised-components", js: "allowOptimisedComponents", typ: u(undefined, true) },
        { json: "auto-start-components", js: "autoStartComponents", typ: u(undefined, true) },
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "ignore-invalid-endpoint", js: "ignoreInvalidEndpoint", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
        { json: "pattern", js: "pattern", typ: u(undefined, "") },
    ], "any"),
    "ModelTransformDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelTransformDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelUnmarshalDefinition": o([
        { json: "any23", js: "any23", typ: u(undefined, u(r("ModelDataformatAny23DataFormatObject"), "")) },
        { json: "asn1", js: "asn1", typ: u(undefined, u(r("ModelDataformatAsn1DataFormatObject"), "")) },
        { json: "avro", js: "avro", typ: u(undefined, u(r("ModelDataformatAvroDataFormatObject"), "")) },
        { json: "barcode", js: "barcode", typ: u(undefined, r("ModelDataformatBarcodeDataFormat")) },
        { json: "base64", js: "base64", typ: u(undefined, r("ModelDataformatBase64DataFormat")) },
        { json: "beanio", js: "beanio", typ: u(undefined, r("ModelDataformatBeanioDataFormat")) },
        { json: "bindy", js: "bindy", typ: u(undefined, r("ModelDataformatBindyDataFormat")) },
        { json: "cbor", js: "cbor", typ: u(undefined, r("ModelDataformatCborDataFormat")) },
        { json: "crypto", js: "crypto", typ: u(undefined, r("ModelDataformatCryptoDataFormat")) },
        { json: "csv", js: "csv", typ: u(undefined, u(r("ModelDataformatCsvDataFormatObject"), "")) },
        { json: "custom", js: "custom", typ: u(undefined, u(r("ModelDataformatCustomDataFormatObject"), "")) },
        { json: "fhir-json", js: "fhirJson", typ: u(undefined, r("ModelDataformatFhirJsonDataFormat")) },
        { json: "fhir-xml", js: "fhirXml", typ: u(undefined, r("ModelDataformatFhirXmlDataFormat")) },
        { json: "flatpack", js: "flatpack", typ: u(undefined, r("ModelDataformatFlatpackDataFormat")) },
        { json: "grok", js: "grok", typ: u(undefined, r("ModelDataformatGrokDataFormat")) },
        { json: "gzip", js: "gzip", typ: u(undefined, r("ModelDataformatGzipDataFormat")) },
        { json: "hl7", js: "hl7", typ: u(undefined, r("ModelDataformatHl7DataFormat")) },
        { json: "ical", js: "ical", typ: u(undefined, r("ModelDataformatIcalDataFormat")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "jacksonxml", js: "jacksonxml", typ: u(undefined, r("ModelDataformatJacksonXmlDataFormat")) },
        { json: "jaxb", js: "jaxb", typ: u(undefined, r("ModelDataformatJaxbDataFormat")) },
        { json: "json", js: "json", typ: u(undefined, r("ModelDataformatJsonDataFormat")) },
        { json: "json-api", js: "jsonApi", typ: u(undefined, r("ModelDataformatJsonApiDataFormat")) },
        { json: "lzf", js: "lzf", typ: u(undefined, r("ModelDataformatLzfDataFormat")) },
        { json: "mime-multipart", js: "mimeMultipart", typ: u(undefined, r("ModelDataformatMimeMultipartDataFormat")) },
        { json: "pgp", js: "pgp", typ: u(undefined, r("ModelDataformatPgpDataFormat")) },
        { json: "protobuf", js: "protobuf", typ: u(undefined, u(r("ModelDataformatProtobufDataFormatObject"), "")) },
        { json: "rss", js: "rss", typ: u(undefined, r("ModelDataformatRssDataFormat")) },
        { json: "secure-xml", js: "secureXml", typ: u(undefined, r("ModelDataformatXmlSecurityDataFormat")) },
        { json: "soapjaxb", js: "soapjaxb", typ: u(undefined, u(r("ModelDataformatSoapJaxbDataFormatObject"), "")) },
        { json: "syslog", js: "syslog", typ: u(undefined, r("ModelDataformatSyslogDataFormat")) },
        { json: "tarfile", js: "tarfile", typ: u(undefined, r("ModelDataformatTarFileDataFormat")) },
        { json: "thrift", js: "thrift", typ: u(undefined, u(r("ModelDataformatThriftDataFormatObject"), "")) },
        { json: "tidy-markup", js: "tidyMarkup", typ: u(undefined, r("ModelDataformatTidyMarkupDataFormat")) },
        { json: "univocity-csv", js: "univocityCsv", typ: u(undefined, r("ModelDataformatUniVocityCsvDataFormat")) },
        { json: "univocity-fixed", js: "univocityFixed", typ: u(undefined, r("ModelDataformatUniVocityFixedWidthDataFormat")) },
        { json: "univocity-tsv", js: "univocityTsv", typ: u(undefined, r("ModelDataformatUniVocityTsvDataFormat")) },
        { json: "xmlrpc", js: "xmlrpc", typ: u(undefined, r("ModelDataformatXmlRpcDataFormat")) },
        { json: "xstream", js: "xstream", typ: u(undefined, u(r("ModelDataformatXStreamDataFormatObject"), "")) },
        { json: "yaml", js: "yaml", typ: u(undefined, r("ModelDataformatYamlDataFormat")) },
        { json: "zip", js: "zip", typ: u(undefined, r("ModelDataformatZipDeflaterDataFormat")) },
        { json: "zipfile", js: "zipfile", typ: u(undefined, r("ModelDataformatZipFileDataFormat")) },
    ], "any"),
    "ModelValidateDefinition": o([
        { json: "expression", js: "expression", typ: u(undefined, r("ModelLanguageExpressionDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "constant", js: "constant", typ: u(undefined, u(r("ModelLanguageConstantExpressionObject"), "")) },
        { json: "csimple", js: "csimple", typ: u(undefined, u(r("ModelLanguageCSimpleExpressionObject"), "")) },
        { json: "datasonnet", js: "datasonnet", typ: u(undefined, u(r("ModelLanguageDatasonnetExpressionObject"), "")) },
        { json: "exchange-property", js: "exchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "exchangeProperty", js: "modelValidateDefinitionExchangeProperty", typ: u(undefined, u(r("ModelLanguageExchangePropertyExpressionObject"), "")) },
        { json: "groovy", js: "groovy", typ: u(undefined, u(r("ModelLanguageGroovyExpressionObject"), "")) },
        { json: "header", js: "header", typ: u(undefined, u(r("ModelLanguageHeaderExpressionObject"), "")) },
        { json: "hl7terser", js: "hl7Terser", typ: u(undefined, u(r("ModelLanguageHl7TerserExpressionObject"), "")) },
        { json: "joor", js: "joor", typ: u(undefined, u(r("ModelLanguageJoorExpressionObject"), "")) },
        { json: "jsonpath", js: "jsonpath", typ: u(undefined, u(r("ModelLanguageJsonPathExpressionObject"), "")) },
        { json: "language", js: "language", typ: u(undefined, r("ModelLanguageLanguageExpression")) },
        { json: "method", js: "method", typ: u(undefined, u(r("ModelLanguageMethodCallExpressionObject"), "")) },
        { json: "mvel", js: "mvel", typ: u(undefined, u(r("ModelLanguageMvelExpressionObject"), "")) },
        { json: "ognl", js: "ognl", typ: u(undefined, u(r("ModelLanguageOgnlExpressionObject"), "")) },
        { json: "ref", js: "ref", typ: u(undefined, u(r("ModelLanguageRefExpressionObject"), "")) },
        { json: "simple", js: "simple", typ: u(undefined, u(r("ModelLanguageSimpleExpressionObject"), "")) },
        { json: "spel", js: "spel", typ: u(undefined, u(r("ModelLanguageSpElExpressionObject"), "")) },
        { json: "tokenize", js: "tokenize", typ: u(undefined, u(r("ModelLanguageTokenizerExpressionObject"), "")) },
        { json: "xpath", js: "xpath", typ: u(undefined, u(r("ModelLanguageXPathExpressionObject"), "")) },
        { json: "xquery", js: "xquery", typ: u(undefined, u(r("ModelLanguageXQueryExpressionObject"), "")) },
        { json: "xtokenize", js: "xtokenize", typ: u(undefined, u(r("ModelLanguageXmlTokenizerExpressionObject"), "")) },
    ], "any"),
    "ModelWireTapDefinition": o([
        { json: "allow-optimised-components", js: "allowOptimisedComponents", typ: u(undefined, true) },
        { json: "auto-start-components", js: "autoStartComponents", typ: u(undefined, true) },
        { json: "body", js: "body", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "cache-size", js: "cacheSize", typ: u(undefined, 3.14) },
        { json: "copy", js: "copy", typ: u(undefined, true) },
        { json: "dynamic-uri", js: "dynamicUri", typ: u(undefined, true) },
        { json: "executor-service-ref", js: "executorServiceRef", typ: u(undefined, "") },
        { json: "ignore-invalid-endpoint", js: "ignoreInvalidEndpoint", typ: u(undefined, true) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-prepare-ref", js: "onPrepareRef", typ: u(undefined, "") },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
        { json: "pattern", js: "pattern", typ: u(undefined, "") },
        { json: "processor-ref", js: "processorRef", typ: u(undefined, "") },
        { json: "set-header", js: "setHeader", typ: u(undefined, a(r("ModelSetHeaderDefinition"))) },
        { json: "uri", js: "uri", typ: "" },
    ], "any"),
    "ModelOnExceptionDefinition": o([
        { json: "continued", js: "continued", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "exception", js: "exception", typ: u(undefined, a("")) },
        { json: "handled", js: "handled", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "inherit-error-handler", js: "inheritErrorHandler", typ: u(undefined, true) },
        { json: "on-exception-occurred-ref", js: "onExceptionOccurredRef", typ: u(undefined, "") },
        { json: "on-redelivery-ref", js: "onRedeliveryRef", typ: u(undefined, "") },
        { json: "on-when", js: "onWhen", typ: u(undefined, r("ModelWhenDefinition")) },
        { json: "redelivery-policy", js: "redeliveryPolicy", typ: u(undefined, r("ModelRedeliveryPolicyDefinition")) },
        { json: "redelivery-policy-ref", js: "redeliveryPolicyRef", typ: u(undefined, "") },
        { json: "retry-while", js: "retryWhile", typ: u(undefined, r("ModelExpressionSubElementDefinition")) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "use-original-body", js: "useOriginalBody", typ: u(undefined, true) },
        { json: "use-original-message", js: "useOriginalMessage", typ: u(undefined, true) },
    ], "any"),
    "ModelRedeliveryPolicyDefinition": o([
        { json: "allow-redelivery-while-stopping", js: "allowRedeliveryWhileStopping", typ: u(undefined, true) },
        { json: "async-delayed-redelivery", js: "asyncDelayedRedelivery", typ: u(undefined, true) },
        { json: "back-off-multiplier", js: "backOffMultiplier", typ: u(undefined, 3.14) },
        { json: "collision-avoidance-factor", js: "collisionAvoidanceFactor", typ: u(undefined, 3.14) },
        { json: "delay-pattern", js: "delayPattern", typ: u(undefined, "") },
        { json: "disable-redelivery", js: "disableRedelivery", typ: u(undefined, true) },
        { json: "exchange-formatter-ref", js: "exchangeFormatterRef", typ: u(undefined, "") },
        { json: "log-continued", js: "logContinued", typ: u(undefined, true) },
        { json: "log-exhausted", js: "logExhausted", typ: u(undefined, true) },
        { json: "log-exhausted-message-body", js: "logExhaustedMessageBody", typ: u(undefined, true) },
        { json: "log-exhausted-message-history", js: "logExhaustedMessageHistory", typ: u(undefined, true) },
        { json: "log-handled", js: "logHandled", typ: u(undefined, true) },
        { json: "log-new-exception", js: "logNewException", typ: u(undefined, true) },
        { json: "log-retry-attempted", js: "logRetryAttempted", typ: u(undefined, true) },
        { json: "log-retry-stack-trace", js: "logRetryStackTrace", typ: u(undefined, true) },
        { json: "log-stack-trace", js: "logStackTrace", typ: u(undefined, true) },
        { json: "maximum-redeliveries", js: "maximumRedeliveries", typ: u(undefined, 3.14) },
        { json: "maximum-redelivery-delay", js: "maximumRedeliveryDelay", typ: u(undefined, "") },
        { json: "redelivery-delay", js: "redeliveryDelay", typ: u(undefined, "") },
        { json: "retries-exhausted-log-level", js: "retriesExhaustedLogLevel", typ: u(undefined, "") },
        { json: "retry-attempted-log-interval", js: "retryAttemptedLogInterval", typ: u(undefined, 3.14) },
        { json: "retry-attempted-log-level", js: "retryAttemptedLogLevel", typ: u(undefined, "") },
        { json: "use-collision-avoidance", js: "useCollisionAvoidance", typ: u(undefined, true) },
        { json: "use-exponential-back-off", js: "useExponentialBackOff", typ: u(undefined, true) },
    ], "any"),
    "ModelRestRestDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "delete", js: "delete", typ: u(undefined, a(r("ModelRestDeleteVerbDefinition"))) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "get", js: "get", typ: u(undefined, a(r("ModelRestGetVerbDefinition"))) },
        { json: "head", js: "head", typ: u(undefined, a(r("ModelRestHeadVerbDefinition"))) },
        { json: "patch", js: "patch", typ: u(undefined, a(r("ModelRestPatchVerbDefinition"))) },
        { json: "path", js: "path", typ: u(undefined, "") },
        { json: "post", js: "post", typ: u(undefined, a(r("ModelRestPostVerbDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "put", js: "put", typ: u(undefined, a(r("ModelRestPutVerbDefinition"))) },
        { json: "security-definitions", js: "securityDefinitions", typ: u(undefined, r("ModelRestRestSecuritiesDefinition")) },
        { json: "security-requirements", js: "securityRequirements", typ: u(undefined, r("ModelRestRestSecuritiesRequirement")) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "tag", js: "tag", typ: u(undefined, "") },
        { json: "verb", js: "verb", typ: u(undefined, a(r("ModelRestVerbDefinition"))) },
    ], "any"),
    "ModelRestDeleteVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRestRestOperationParamDefinition": o([
        { json: "array-type", js: "arrayType", typ: u(undefined, "") },
        { json: "collection-format", js: "collectionFormat", typ: u(undefined, r("CollectionFormat")) },
        { json: "data-format", js: "dataFormat", typ: u(undefined, "") },
        { json: "data-type", js: "dataType", typ: u(undefined, "") },
        { json: "default-value", js: "defaultValue", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "examples", js: "examples", typ: u(undefined, a(r("ModelRestRestPropertyDefinition"))) },
        { json: "name", js: "name", typ: "" },
        { json: "required", js: "required", typ: u(undefined, true) },
        { json: "type", js: "type", typ: r("Type") },
        { json: "value", js: "value", typ: u(undefined, a("")) },
    ], "any"),
    "ModelRestRestPropertyDefinition": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], "any"),
    "ModelRestRestOperationResponseMsgDefinition": o([
        { json: "code", js: "code", typ: u(undefined, "") },
        { json: "examples", js: "examples", typ: u(undefined, a(r("ModelRestRestPropertyDefinition"))) },
        { json: "header", js: "header", typ: u(undefined, a(r("ModelRestRestOperationResponseHeaderDefinition"))) },
        { json: "message", js: "message", typ: "" },
        { json: "response-model", js: "responseModel", typ: u(undefined, "") },
    ], "any"),
    "ModelRestRestOperationResponseHeaderDefinition": o([
        { json: "array-type", js: "arrayType", typ: u(undefined, "") },
        { json: "collection-format", js: "collectionFormat", typ: u(undefined, r("CollectionFormat")) },
        { json: "data-format", js: "dataFormat", typ: u(undefined, "") },
        { json: "data-type", js: "dataType", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "example", js: "example", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "value", js: "value", typ: u(undefined, a("")) },
    ], "any"),
    "ModelRouteDefinition": o([
        { json: "from", js: "from", typ: u(r("ModelFromDefinitionObject"), "") },
        { json: "group", js: "group", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "route-configuration-id", js: "routeConfigurationId", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: a(r("ModelProcessorDefinition")) },
    ], "any"),
    "ModelFromDefinitionObject": o([
        { json: "uri", js: "uri", typ: "" },
        { json: "parameters", js: "parameters", typ: u(undefined, m("any")) },
    ], "any"),
    "ModelRestSecurityDefinition": o([
        { json: "key", js: "key", typ: "" },
        { json: "scopes", js: "scopes", typ: u(undefined, "") },
    ], "any"),
    "ModelRestGetVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRestHeadVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRestPatchVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRestPostVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRestPutVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRestRestSecuritiesDefinition": o([
        { json: "api-key", js: "apiKey", typ: u(undefined, r("ModelRestRestSecurityApiKey")) },
        { json: "basic-auth", js: "basicAuth", typ: u(undefined, r("ModelRestRestSecurityBasicAuth")) },
        { json: "bearer", js: "bearer", typ: u(undefined, r("ModelRestRestSecurityBearerToken")) },
        { json: "mutual-tls", js: "mutualTls", typ: u(undefined, r("ModelRestRestSecurityMutualTls")) },
        { json: "oauth2", js: "oauth2", typ: u(undefined, r("ModelRestRestSecurityOAuth2")) },
        { json: "open-id-connect", js: "openIdConnect", typ: u(undefined, r("ModelRestRestSecurityOpenIdConnect")) },
    ], "any"),
    "ModelRestRestSecurityApiKey": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "in-cookie", js: "inCookie", typ: u(undefined, true) },
        { json: "in-header", js: "inHeader", typ: u(undefined, true) },
        { json: "in-query", js: "inQuery", typ: u(undefined, true) },
        { json: "key", js: "key", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "ModelRestRestSecurityBasicAuth": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "key", js: "key", typ: "" },
    ], "any"),
    "ModelRestRestSecurityBearerToken": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "format", js: "format", typ: u(undefined, "") },
        { json: "key", js: "key", typ: "" },
    ], "any"),
    "ModelRestRestSecurityMutualTls": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "key", js: "key", typ: "" },
    ], "any"),
    "ModelRestRestSecurityOAuth2": o([
        { json: "authorization-url", js: "authorizationUrl", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "flow", js: "flow", typ: u(undefined, "") },
        { json: "key", js: "key", typ: "" },
        { json: "refresh-url", js: "refreshUrl", typ: u(undefined, "") },
        { json: "scopes", js: "scopes", typ: u(undefined, a(r("ModelRestRestPropertyDefinition"))) },
        { json: "token-url", js: "tokenUrl", typ: u(undefined, "") },
    ], "any"),
    "ModelRestRestSecurityOpenIdConnect": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "key", js: "key", typ: "" },
        { json: "url", js: "url", typ: "" },
    ], "any"),
    "ModelRestRestSecuritiesRequirement": o([
        { json: "security-requirement", js: "securityRequirement", typ: u(undefined, r("ModelRestSecurityDefinition")) },
    ], "any"),
    "ModelRestVerbDefinition": o([
        { json: "api-docs", js: "apiDocs", typ: u(undefined, "") },
        { json: "binding-mode", js: "bindingMode", typ: u(undefined, "") },
        { json: "client-request-validation", js: "clientRequestValidation", typ: u(undefined, "") },
        { json: "consumes", js: "consumes", typ: u(undefined, "") },
        { json: "deprecated", js: "deprecated", typ: u(undefined, true) },
        { json: "enable-cors", js: "enableCors", typ: u(undefined, "") },
        { json: "method", js: "method", typ: u(undefined, "") },
        { json: "out-type", js: "outType", typ: u(undefined, "") },
        { json: "param", js: "param", typ: u(undefined, a(r("ModelRestRestOperationParamDefinition"))) },
        { json: "produces", js: "produces", typ: u(undefined, "") },
        { json: "response-message", js: "responseMessage", typ: u(undefined, a(r("ModelRestRestOperationResponseMsgDefinition"))) },
        { json: "route", js: "route", typ: u(undefined, r("ModelRouteDefinition")) },
        { json: "route-id", js: "routeId", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("ModelRestSecurityDefinition"))) },
        { json: "skip-binding-on-error-code", js: "skipBindingOnErrorCode", typ: u(undefined, "") },
        { json: "steps", js: "steps", typ: u(undefined, a(r("ModelProcessorDefinition"))) },
        { json: "to", js: "to", typ: u(undefined, u(r("ModelToDefinitionObject"), "")) },
        { json: "to-d", js: "toD", typ: u(undefined, u(r("ModelToDynamicDefinitionObject"), "")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], "any"),
    "ModelRouteTemplateDefinition": o([
        { json: "beans", js: "beans", typ: u(undefined, a(r("DslYamlDeserializersNamedBeanDefinition"))) },
        { json: "from", js: "from", typ: u(r("ModelFromDefinitionObject"), "") },
        { json: "id", js: "id", typ: "" },
        { json: "parameters", js: "parameters", typ: u(undefined, a(r("ModelRouteTemplateParameterDefinition"))) },
    ], "any"),
    "ModelRouteTemplateParameterDefinition": o([
        { json: "default-value", js: "defaultValue", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "required", js: "required", typ: u(undefined, true) },
    ], "any"),
    "ModelDataformatAvroDataFormatLibrary": [
        "ApacheAvro",
        "dataFormatName",
        "Jackson",
    ],
    "JsonLibrary": [
        "Fastjson",
        "Gson",
        "Jackson",
        "Johnzon",
        "Jsonb",
        "XStream",
    ],
    "ModelDataformatProtobufDataFormatLibrary": [
        "dataFormatName",
        "GoogleProtobuf",
        "Jackson",
    ],
    "YamlLibrary": [
        "SnakeYAML",
    ],
    "CollectionFormat": [
        "csv",
        "multi",
        "pipes",
        "ssv",
        "tsv",
    ],
    "Type": [
        "body",
        "formData",
        "header",
        "path",
        "query",
    ],
};
