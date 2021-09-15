import {v4 as uuidv4} from 'uuid'

export class Metadata {
    name: string = '';

    public constructor(init?: Partial<Metadata>) {
        Object.assign(this, init);
    }
}

export class Spec {
    flows: FromStep[] = [];

    public constructor(init?: Partial<Spec>) {
        Object.assign(this, init);
    }
}

export class Integration {
    apiVersion: string = 'camel.apache.org/v1';
    kind: string = 'Integration';
    metadata: Metadata = new Metadata();
    spec: Spec = new Spec();

    public constructor(init?: Partial<Integration>) {
        Object.assign(this, init);
    }

    static createNew(): Integration {
        return new Integration({spec: new Spec({flows: []})})
    }
}

export class CamelElement {
   uuid: string = ''
   dslName: string = ''
   constructor(dslName: string) {
       this.uuid = uuidv4()
       this.dslName = dslName
   }
}

export class ProcessorStep extends CamelElement {
}
export class Policy extends CamelElement { 
    inheritErrorHandler?: boolean
    ref?: string
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Policy>) { 
        super('policy')
        Object.assign(this, init)
    }
}
export class PolicyStep extends ProcessorStep {
    policy: Policy = new Policy()

    public constructor(init?: Partial<Policy>) {
        super('policyStep')
        Object.assign(this, {policy: new Policy({...init})})
    }
}

export class ThrowException extends CamelElement { 
    exceptionType?: string
    inheritErrorHandler?: boolean
    message?: string
    ref?: string

    public constructor(init?: Partial<ThrowException>) { 
        super('throwException')
        Object.assign(this, init)
    }
}
export class ThrowExceptionStep extends ProcessorStep {
    throwException: ThrowException = new ThrowException()

    public constructor(init?: Partial<ThrowException>) {
        super('throwExceptionStep')
        Object.assign(this, {throwException: new ThrowException({...init})})
    }
}

export class Choice extends CamelElement { 
    inheritErrorHandler?: boolean
    otherwise?: Otherwise
    when?: WhenStep [] = []

    public constructor(init?: Partial<Choice>) { 
        super('choice')
        Object.assign(this, init)
    }
}
export class ChoiceStep extends ProcessorStep {
    choice: Choice = new Choice()

    public constructor(init?: Partial<Choice>) {
        super('choiceStep')
        Object.assign(this, {choice: new Choice({...init})})
    }
}

export class PollEnrich extends CamelElement { 
    aggregateOnException?: boolean
    cacheSize?: number
    expression?: Expression
    ignoreInvalidEndpoint?: number
    inheritErrorHandler?: boolean
    strategyMethodAllowNull?: boolean
    strategyMethodName?: string
    strategyRef?: string
    timeout?: string

    public constructor(init?: Partial<PollEnrich>) { 
        super('pollEnrich')
        Object.assign(this, init)
    }
}
export class PollEnrichStep extends ProcessorStep {
    pollEnrich: PollEnrich = new PollEnrich()

    public constructor(init?: Partial<PollEnrich>) {
        super('pollEnrichStep')
        Object.assign(this, {pollEnrich: new PollEnrich({...init})})
    }
}

export class SetBody extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<SetBody>) { 
        super('setBody')
        Object.assign(this, init)
    }
}
export class SetBodyStep extends ProcessorStep {
    setBody: SetBody = new SetBody()

    public constructor(init?: Partial<SetBody>) {
        super('setBodyStep')
        Object.assign(this, {setBody: new SetBody({...init})})
    }
}

export class Stop extends CamelElement { 
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<Stop>) { 
        super('stop')
        Object.assign(this, init)
    }
}
export class StopStep extends ProcessorStep {
    stop: Stop = new Stop()

    public constructor(init?: Partial<Stop>) {
        super('stopStep')
        Object.assign(this, {stop: new Stop({...init})})
    }
}

export class ToD extends CamelElement { 
    allowOptimisedComponents?: boolean
    autoStartComponents?: boolean
    cacheSize?: number
    ignoreInvalidEndpoint?: boolean
    inheritErrorHandler?: boolean
    parameters?: any
    pattern?: string
    uri?: string

    public constructor(init?: Partial<ToD>) { 
        super('toD')
        Object.assign(this, init)
    }
}
export class ToDStep extends ProcessorStep {
    toD: ToD = new ToD()

    public constructor(init?: Partial<ToD>) {
        super('toDStep')
        Object.assign(this, {toD: new ToD({...init})})
    }
}

export class Process extends CamelElement { 
    inheritErrorHandler?: boolean
    ref?: string

    public constructor(init?: Partial<Process>) { 
        super('process')
        Object.assign(this, init)
    }
}
export class ProcessStep extends ProcessorStep {
    process: Process = new Process()

    public constructor(init?: Partial<Process>) {
        super('processStep')
        Object.assign(this, {process: new Process({...init})})
    }
}

export class RemoveHeaders extends CamelElement { 
    excludePattern?: string
    inheritErrorHandler?: boolean
    pattern?: string

    public constructor(init?: Partial<RemoveHeaders>) { 
        super('removeHeaders')
        Object.assign(this, init)
    }
}
export class RemoveHeadersStep extends ProcessorStep {
    removeHeaders: RemoveHeaders = new RemoveHeaders()

    public constructor(init?: Partial<RemoveHeaders>) {
        super('removeHeadersStep')
        Object.assign(this, {removeHeaders: new RemoveHeaders({...init})})
    }
}

export class Delay extends CamelElement { 
    asyncDelayed?: boolean
    callerRunsWhenRejected?: boolean
    executorServiceRef?: string
    expression?: Expression
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<Delay>) { 
        super('delay')
        Object.assign(this, init)
    }
}
export class DelayStep extends ProcessorStep {
    delay: Delay = new Delay()

    public constructor(init?: Partial<Delay>) {
        super('delayStep')
        Object.assign(this, {delay: new Delay({...init})})
    }
}

export class Throttle extends CamelElement { 
    asyncDelayed?: boolean
    callerRunsWhenRejected?: boolean
    correlationExpression?: Expression
    executorServiceRef?: string
    expression?: Expression
    inheritErrorHandler?: boolean
    rejectExecution?: boolean
    timePeriodMillis?: string

    public constructor(init?: Partial<Throttle>) { 
        super('throttle')
        Object.assign(this, init)
    }
}
export class ThrottleStep extends ProcessorStep {
    throttle: Throttle = new Throttle()

    public constructor(init?: Partial<Throttle>) {
        super('throttleStep')
        Object.assign(this, {throttle: new Throttle({...init})})
    }
}

export class Otherwise extends CamelElement { 
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Otherwise>) { 
        super('otherwise')
        Object.assign(this, init)
    }
}
export class OtherwiseStep extends ProcessorStep {
    otherwise: Otherwise = new Otherwise()

    public constructor(init?: Partial<Otherwise>) {
        super('otherwiseStep')
        Object.assign(this, {otherwise: new Otherwise({...init})})
    }
}

export class RemoveProperty extends CamelElement { 
    inheritErrorHandler?: boolean
    propertyName?: string

    public constructor(init?: Partial<RemoveProperty>) { 
        super('removeProperty')
        Object.assign(this, init)
    }
}
export class RemovePropertyStep extends ProcessorStep {
    removeProperty: RemoveProperty = new RemoveProperty()

    public constructor(init?: Partial<RemoveProperty>) {
        super('removePropertyStep')
        Object.assign(this, {removeProperty: new RemoveProperty({...init})})
    }
}

export class Validate extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<Validate>) { 
        super('validate')
        Object.assign(this, init)
    }
}
export class ValidateStep extends ProcessorStep {
    validate: Validate = new Validate()

    public constructor(init?: Partial<Validate>) {
        super('validateStep')
        Object.assign(this, {validate: new Validate({...init})})
    }
}

export class Sort extends CamelElement { 
    comparatorRef?: string
    expression?: Expression
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<Sort>) { 
        super('sort')
        Object.assign(this, init)
    }
}
export class SortStep extends ProcessorStep {
    sort: Sort = new Sort()

    public constructor(init?: Partial<Sort>) {
        super('sortStep')
        Object.assign(this, {sort: new Sort({...init})})
    }
}

export class From extends CamelElement { 
    parameters?: any
    steps?: ProcessorStep [] = []
    uri?: string

    public constructor(init?: Partial<From>) { 
        super('from')
        Object.assign(this, init)
    }
}
export class FromStep extends ProcessorStep {
    from: From = new From()

    public constructor(init?: Partial<From>) {
        super('fromStep')
        Object.assign(this, {from: new From({...init})})
    }
}

export class To extends CamelElement { 
    inheritErrorHandler?: boolean
    parameters?: any
    pattern?: string
    uri?: string

    public constructor(init?: Partial<To>) { 
        super('to')
        Object.assign(this, init)
    }
}
export class ToStep extends ProcessorStep {
    to: To = new To()

    public constructor(init?: Partial<To>) {
        super('toStep')
        Object.assign(this, {to: new To({...init})})
    }
}

export class SetHeader extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean
    name?: string

    public constructor(init?: Partial<SetHeader>) { 
        super('setHeader')
        Object.assign(this, init)
    }
}
export class SetHeaderStep extends ProcessorStep {
    setHeader: SetHeader = new SetHeader()

    public constructor(init?: Partial<SetHeader>) {
        super('setHeaderStep')
        Object.assign(this, {setHeader: new SetHeader({...init})})
    }
}

export class OnCompletion extends CamelElement { 
    executorServiceRef?: string
    inheritErrorHandler?: boolean
    mode?: string
    onCompleteOnly?: boolean
    onFailureOnly?: boolean
    onWhen?: When
    parallelProcessing?: boolean
    steps?: ProcessorStep [] = []
    useOriginalMessage?: boolean

    public constructor(init?: Partial<OnCompletion>) { 
        super('onCompletion')
        Object.assign(this, init)
    }
}
export class OnCompletionStep extends ProcessorStep {
    onCompletion: OnCompletion = new OnCompletion()

    public constructor(init?: Partial<OnCompletion>) {
        super('onCompletionStep')
        Object.assign(this, {onCompletion: new OnCompletion({...init})})
    }
}

export class RemoveHeader extends CamelElement { 
    headerName?: string
    inheritErrorHandler?: boolean
    name?: string

    public constructor(init?: Partial<RemoveHeader>) { 
        super('removeHeader')
        Object.assign(this, init)
    }
}
export class RemoveHeaderStep extends ProcessorStep {
    removeHeader: RemoveHeader = new RemoveHeader()

    public constructor(init?: Partial<RemoveHeader>) {
        super('removeHeaderStep')
        Object.assign(this, {removeHeader: new RemoveHeader({...init})})
    }
}

export class Script extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<Script>) { 
        super('script')
        Object.assign(this, init)
    }
}
export class ScriptStep extends ProcessorStep {
    script: Script = new Script()

    public constructor(init?: Partial<Script>) {
        super('scriptStep')
        Object.assign(this, {script: new Script({...init})})
    }
}

export class Enrich extends CamelElement { 
    aggregateOnException?: boolean
    allowOptimisedComponents?: boolean
    cacheSize?: number
    expression?: Expression
    ignoreInvalidEndpoint?: boolean
    inheritErrorHandler?: boolean
    shareUnitOfWork?: boolean
    strategyMethodAllowNull?: string
    strategyMethodName?: string
    strategyRef?: string

    public constructor(init?: Partial<Enrich>) { 
        super('enrich')
        Object.assign(this, init)
    }
}
export class EnrichStep extends ProcessorStep {
    enrich: Enrich = new Enrich()

    public constructor(init?: Partial<Enrich>) {
        super('enrichStep')
        Object.assign(this, {enrich: new Enrich({...init})})
    }
}

export class Log extends CamelElement { 
    inheritErrorHandler?: boolean
    logName?: string
    loggerRef?: string
    loggingLevel?: string
    marker?: string
    message?: string

    public constructor(init?: Partial<Log>) { 
        super('log')
        Object.assign(this, init)
    }
}
export class LogStep extends ProcessorStep {
    log: Log = new Log()

    public constructor(init?: Partial<Log>) {
        super('logStep')
        Object.assign(this, {log: new Log({...init})})
    }
}

export class Tod extends CamelElement { 
    allowOptimisedComponents?: boolean
    autoStartComponents?: boolean
    cacheSize?: number
    ignoreInvalidEndpoint?: boolean
    inheritErrorHandler?: boolean
    parameters?: any
    pattern?: string
    uri?: string

    public constructor(init?: Partial<Tod>) { 
        super('tod')
        Object.assign(this, init)
    }
}
export class TodStep extends ProcessorStep {
    tod: Tod = new Tod()

    public constructor(init?: Partial<Tod>) {
        super('todStep')
        Object.assign(this, {tod: new Tod({...init})})
    }
}

export class RemoveProperties extends CamelElement { 
    excludePattern?: string
    inheritErrorHandler?: boolean
    pattern?: string

    public constructor(init?: Partial<RemoveProperties>) { 
        super('removeProperties')
        Object.assign(this, init)
    }
}
export class RemovePropertiesStep extends ProcessorStep {
    removeProperties: RemoveProperties = new RemoveProperties()

    public constructor(init?: Partial<RemoveProperties>) {
        super('removePropertiesStep')
        Object.assign(this, {removeProperties: new RemoveProperties({...init})})
    }
}

export class Marshal extends CamelElement { 
    any23?: string
    asn1?: string
    avro?: string
    csv?: string
    custom?: string
    inheritErrorHandler?: boolean
    protobuf?: string
    soapjaxb?: string
    thrift?: string
    xstream?: string

    public constructor(init?: Partial<Marshal>) { 
        super('marshal')
        Object.assign(this, init)
    }
}
export class MarshalStep extends ProcessorStep {
    marshal: Marshal = new Marshal()

    public constructor(init?: Partial<Marshal>) {
        super('marshalStep')
        Object.assign(this, {marshal: new Marshal({...init})})
    }
}

export class Split extends CamelElement { 
    delimiter?: string
    executorServiceRef?: string
    expression?: Expression
    inheritErrorHandler?: boolean
    onPrepareRef?: string
    parallelAggregate?: boolean
    parallelProcessing?: boolean
    shareUnitOfWork?: boolean
    steps?: ProcessorStep [] = []
    stopOnAggregateException?: boolean
    stopOnException?: boolean
    strategyMethodAllowNull?: boolean
    strategyMethodName?: string
    strategyRef?: string
    streaming?: boolean
    timeout?: string

    public constructor(init?: Partial<Split>) { 
        super('split')
        Object.assign(this, init)
    }
}
export class SplitStep extends ProcessorStep {
    split: Split = new Split()

    public constructor(init?: Partial<Split>) {
        super('splitStep')
        Object.assign(this, {split: new Split({...init})})
    }
}

export class Transacted extends CamelElement { 
    inheritErrorHandler?: boolean
    ref?: string
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Transacted>) { 
        super('transacted')
        Object.assign(this, init)
    }
}
export class TransactedStep extends ProcessorStep {
    transacted: Transacted = new Transacted()

    public constructor(init?: Partial<Transacted>) {
        super('transactedStep')
        Object.assign(this, {transacted: new Transacted({...init})})
    }
}

export class InterceptFrom extends CamelElement { 
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []
    uri?: string

    public constructor(init?: Partial<InterceptFrom>) { 
        super('interceptFrom')
        Object.assign(this, init)
    }
}
export class InterceptFromStep extends ProcessorStep {
    interceptFrom: InterceptFrom = new InterceptFrom()

    public constructor(init?: Partial<InterceptFrom>) {
        super('interceptFromStep')
        Object.assign(this, {interceptFrom: new InterceptFrom({...init})})
    }
}

export class DoCatch extends CamelElement { 
    exception?: string [] = []
    inheritErrorHandler?: boolean
    onWhen?: When
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<DoCatch>) { 
        super('doCatch')
        Object.assign(this, init)
    }
}
export class DoCatchStep extends ProcessorStep {
    doCatch: DoCatch = new DoCatch()

    public constructor(init?: Partial<DoCatch>) {
        super('doCatchStep')
        Object.assign(this, {doCatch: new DoCatch({...init})})
    }
}

export class CircuitBreaker extends CamelElement { 
    configurationRef?: string
    inheritErrorHandler?: boolean
    onFallback?: OnFallback
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<CircuitBreaker>) { 
        super('circuitBreaker')
        Object.assign(this, init)
    }
}
export class CircuitBreakerStep extends ProcessorStep {
    circuitBreaker: CircuitBreaker = new CircuitBreaker()

    public constructor(init?: Partial<CircuitBreaker>) {
        super('circuitBreakerStep')
        Object.assign(this, {circuitBreaker: new CircuitBreaker({...init})})
    }
}

export class ConvertBodyTo extends CamelElement { 
    charset?: string
    inheritErrorHandler?: boolean
    mandatory?: boolean
    type?: string

    public constructor(init?: Partial<ConvertBodyTo>) { 
        super('convertBodyTo')
        Object.assign(this, init)
    }
}
export class ConvertBodyToStep extends ProcessorStep {
    convertBodyTo: ConvertBodyTo = new ConvertBodyTo()

    public constructor(init?: Partial<ConvertBodyTo>) {
        super('convertBodyToStep')
        Object.assign(this, {convertBodyTo: new ConvertBodyTo({...init})})
    }
}

export class Intercept extends CamelElement { 
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Intercept>) { 
        super('intercept')
        Object.assign(this, init)
    }
}
export class InterceptStep extends ProcessorStep {
    intercept: Intercept = new Intercept()

    public constructor(init?: Partial<Intercept>) {
        super('interceptStep')
        Object.assign(this, {intercept: new Intercept({...init})})
    }
}

export class Unmarshal extends CamelElement { 
    any23?: string
    asn1?: string
    avro?: string
    csv?: string
    custom?: string
    inheritErrorHandler?: boolean
    protobuf?: string
    soapjaxb?: string
    thrift?: string
    xstream?: string

    public constructor(init?: Partial<Unmarshal>) { 
        super('unmarshal')
        Object.assign(this, init)
    }
}
export class UnmarshalStep extends ProcessorStep {
    unmarshal: Unmarshal = new Unmarshal()

    public constructor(init?: Partial<Unmarshal>) {
        super('unmarshalStep')
        Object.assign(this, {unmarshal: new Unmarshal({...init})})
    }
}

export class OnFallback extends CamelElement { 
    fallbackViaNetwork?: boolean
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<OnFallback>) { 
        super('onFallback')
        Object.assign(this, init)
    }
}
export class OnFallbackStep extends ProcessorStep {
    onFallback: OnFallback = new OnFallback()

    public constructor(init?: Partial<OnFallback>) {
        super('onFallbackStep')
        Object.assign(this, {onFallback: new OnFallback({...init})})
    }
}

export class SetExchangePattern extends CamelElement { 
    inheritErrorHandler?: boolean
    pattern?: string

    public constructor(init?: Partial<SetExchangePattern>) { 
        super('setExchangePattern')
        Object.assign(this, init)
    }
}
export class SetExchangePatternStep extends ProcessorStep {
    setExchangePattern: SetExchangePattern = new SetExchangePattern()

    public constructor(init?: Partial<SetExchangePattern>) {
        super('setExchangePatternStep')
        Object.assign(this, {setExchangePattern: new SetExchangePattern({...init})})
    }
}

export class RecipientList extends CamelElement { 
    cacheSize?: number
    delimiter?: string
    executorServiceRef?: string
    expression?: Expression
    ignoreInvalidEndpoints?: boolean
    inheritErrorHandler?: boolean
    onPrepareRef?: string
    parallelAggregate?: boolean
    parallelProcessing?: boolean
    shareUnitOfWork?: boolean
    stopOnAggregateException?: boolean
    stopOnException?: boolean
    strategyMethodAllowNull?: boolean
    strategyMethodName?: string
    strategyRef?: string
    streaming?: boolean
    timeout?: string

    public constructor(init?: Partial<RecipientList>) { 
        super('recipientList')
        Object.assign(this, init)
    }
}
export class RecipientListStep extends ProcessorStep {
    recipientList: RecipientList = new RecipientList()

    public constructor(init?: Partial<RecipientList>) {
        super('recipientListStep')
        Object.assign(this, {recipientList: new RecipientList({...init})})
    }
}

export class Step extends CamelElement { 
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Step>) { 
        super('step')
        Object.assign(this, init)
    }
}
export class StepStep extends ProcessorStep {
    step: Step = new Step()

    public constructor(init?: Partial<Step>) {
        super('stepStep')
        Object.assign(this, {step: new Step({...init})})
    }
}

export class Bean extends CamelElement { 
    beanType?: string
    cache?: boolean
    inheritErrorHandler?: boolean
    method?: string
    ref?: string
    scope?: string

    public constructor(init?: Partial<Bean>) { 
        super('bean')
        Object.assign(this, init)
    }
}
export class BeanStep extends ProcessorStep {
    bean: Bean = new Bean()

    public constructor(init?: Partial<Bean>) {
        super('beanStep')
        Object.assign(this, {bean: new Bean({...init})})
    }
}

export class Multicast extends CamelElement { 
    executorServiceRef?: string
    inheritErrorHandler?: boolean
    onPrepareRef?: string
    parallelAggregate?: boolean
    parallelProcessing?: boolean
    shareUnitOfWork?: boolean
    steps?: ProcessorStep [] = []
    stopOnAggregateException?: boolean
    stopOnException?: boolean
    strategyMethodAllowNull?: boolean
    strategyMethodName?: string
    strategyRef?: string
    streaming?: boolean
    timeout?: string

    public constructor(init?: Partial<Multicast>) { 
        super('multicast')
        Object.assign(this, init)
    }
}
export class MulticastStep extends ProcessorStep {
    multicast: Multicast = new Multicast()

    public constructor(init?: Partial<Multicast>) {
        super('multicastStep')
        Object.assign(this, {multicast: new Multicast({...init})})
    }
}

export class InOnly extends CamelElement { 
    inheritErrorHandler?: boolean
    parameters?: any
    uri?: string

    public constructor(init?: Partial<InOnly>) { 
        super('inOnly')
        Object.assign(this, init)
    }
}
export class InOnlyStep extends ProcessorStep {
    inOnly: InOnly = new InOnly()

    public constructor(init?: Partial<InOnly>) {
        super('inOnlyStep')
        Object.assign(this, {inOnly: new InOnly({...init})})
    }
}

export class LoadBalance extends CamelElement { 
    customLoadBalancer?: string
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<LoadBalance>) { 
        super('loadBalance')
        Object.assign(this, init)
    }
}
export class LoadBalanceStep extends ProcessorStep {
    loadBalance: LoadBalance = new LoadBalance()

    public constructor(init?: Partial<LoadBalance>) {
        super('loadBalanceStep')
        Object.assign(this, {loadBalance: new LoadBalance({...init})})
    }
}

export class RoutingSlip extends CamelElement { 
    cacheSize?: number
    expression?: Expression
    ignoreInvalidEndpoints?: boolean
    inheritErrorHandler?: boolean
    uriDelimiter?: string

    public constructor(init?: Partial<RoutingSlip>) { 
        super('routingSlip')
        Object.assign(this, init)
    }
}
export class RoutingSlipStep extends ProcessorStep {
    routingSlip: RoutingSlip = new RoutingSlip()

    public constructor(init?: Partial<RoutingSlip>) {
        super('routingSlipStep')
        Object.assign(this, {routingSlip: new RoutingSlip({...init})})
    }
}

export class Rollback extends CamelElement { 
    inheritErrorHandler?: boolean
    markRollbackOnly?: boolean
    markRollbackOnlyLast?: boolean
    message?: string

    public constructor(init?: Partial<Rollback>) { 
        super('rollback')
        Object.assign(this, init)
    }
}
export class RollbackStep extends ProcessorStep {
    rollback: Rollback = new Rollback()

    public constructor(init?: Partial<Rollback>) {
        super('rollbackStep')
        Object.assign(this, {rollback: new Rollback({...init})})
    }
}

export class WhenSkipSendToEndpoint extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<WhenSkipSendToEndpoint>) { 
        super('whenSkipSendToEndpoint')
        Object.assign(this, init)
    }
}
export class WhenSkipSendToEndpointStep extends ProcessorStep {
    whenSkipSendToEndpoint: WhenSkipSendToEndpoint = new WhenSkipSendToEndpoint()

    public constructor(init?: Partial<WhenSkipSendToEndpoint>) {
        super('whenSkipSendToEndpointStep')
        Object.assign(this, {whenSkipSendToEndpoint: new WhenSkipSendToEndpoint({...init})})
    }
}

export class WireTap extends CamelElement { 
    allowOptimisedComponents?: boolean
    autoStartComponents?: boolean
    body?: Expression
    cacheSize?: number
    copy?: boolean
    dynamicUri?: boolean
    executorServiceRef?: string
    ignoreInvalidEndpoint?: boolean
    inheritErrorHandler?: boolean
    onPrepareRef?: string
    parameters?: any
    pattern?: string
    processorRef?: string
    setHeader?: SetHeaderStep [] = []
    uri?: string

    public constructor(init?: Partial<WireTap>) { 
        super('wireTap')
        Object.assign(this, init)
    }
}
export class WireTapStep extends ProcessorStep {
    wireTap: WireTap = new WireTap()

    public constructor(init?: Partial<WireTap>) {
        super('wireTapStep')
        Object.assign(this, {wireTap: new WireTap({...init})})
    }
}

export class Loop extends CamelElement { 
    breakOnShutdown?: boolean
    copy?: boolean
    doWhile?: boolean
    expression?: Expression
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Loop>) { 
        super('loop')
        Object.assign(this, init)
    }
}
export class LoopStep extends ProcessorStep {
    loop: Loop = new Loop()

    public constructor(init?: Partial<Loop>) {
        super('loopStep')
        Object.assign(this, {loop: new Loop({...init})})
    }
}

export class InterceptSendToEndpoint extends CamelElement { 
    afterUri?: string
    inheritErrorHandler?: boolean
    skipSendToOriginalEndpoint?: string
    steps?: ProcessorStep [] = []
    uri?: string

    public constructor(init?: Partial<InterceptSendToEndpoint>) { 
        super('interceptSendToEndpoint')
        Object.assign(this, init)
    }
}
export class InterceptSendToEndpointStep extends ProcessorStep {
    interceptSendToEndpoint: InterceptSendToEndpoint = new InterceptSendToEndpoint()

    public constructor(init?: Partial<InterceptSendToEndpoint>) {
        super('interceptSendToEndpointStep')
        Object.assign(this, {interceptSendToEndpoint: new InterceptSendToEndpoint({...init})})
    }
}

export class DoTry extends CamelElement { 
    doCatch?: DoCatchStep [] = []
    doFinally?: DoFinally
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<DoTry>) { 
        super('doTry')
        Object.assign(this, init)
    }
}
export class DoTryStep extends ProcessorStep {
    doTry: DoTry = new DoTry()

    public constructor(init?: Partial<DoTry>) {
        super('doTryStep')
        Object.assign(this, {doTry: new DoTry({...init})})
    }
}

export class Resequence extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Resequence>) { 
        super('resequence')
        Object.assign(this, init)
    }
}
export class ResequenceStep extends ProcessorStep {
    resequence: Resequence = new Resequence()

    public constructor(init?: Partial<Resequence>) {
        super('resequenceStep')
        Object.assign(this, {resequence: new Resequence({...init})})
    }
}

export class Expression extends CamelElement { 
    constant?: string
    csimple?: string
    datasonnet?: string
    exchangeProperty?: string
    groovy?: string
    header?: string
    hl7terser?: string
    joor?: string
    jsonpath?: string
    method?: string
    mvel?: string
    ognl?: string
    ref?: string
    simple?: string
    spel?: string
    tokenize?: string
    xpath?: string
    xquery?: string
    xtokenize?: string

    public constructor(init?: Partial<Expression>) { 
        super('expression')
        Object.assign(this, init)
    }
}
export class ExpressionStep extends ProcessorStep {
    expression: Expression = new Expression()

    public constructor(init?: Partial<Expression>) {
        super('expressionStep')
        Object.assign(this, {expression: new Expression({...init})})
    }
}

export class ServiceCall extends CamelElement { 
    component?: string
    configurationRef?: string
    expressionRef?: string
    inheritErrorHandler?: boolean
    loadBalancerRef?: string
    name?: string
    pattern?: string
    serviceChooserRef?: string
    serviceDiscoveryRef?: string
    serviceFilterRef?: string
    uri?: string

    public constructor(init?: Partial<ServiceCall>) { 
        super('serviceCall')
        Object.assign(this, init)
    }
}
export class ServiceCallStep extends ProcessorStep {
    serviceCall: ServiceCall = new ServiceCall()

    public constructor(init?: Partial<ServiceCall>) {
        super('serviceCallStep')
        Object.assign(this, {serviceCall: new ServiceCall({...init})})
    }
}

export class Kamelet extends CamelElement { 
    inheritErrorHandler?: boolean
    name?: string
    parameters?: any
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Kamelet>) { 
        super('kamelet')
        Object.assign(this, init)
    }
}
export class KameletStep extends ProcessorStep {
    kamelet: Kamelet = new Kamelet()

    public constructor(init?: Partial<Kamelet>) {
        super('kameletStep')
        Object.assign(this, {kamelet: new Kamelet({...init})})
    }
}

export class Sample extends CamelElement { 
    inheritErrorHandler?: boolean
    messageFrequency?: number
    samplePeriod?: string
    units?: string

    public constructor(init?: Partial<Sample>) { 
        super('sample')
        Object.assign(this, init)
    }
}
export class SampleStep extends ProcessorStep {
    sample: Sample = new Sample()

    public constructor(init?: Partial<Sample>) {
        super('sampleStep')
        Object.assign(this, {sample: new Sample({...init})})
    }
}

export class DynamicRouter extends CamelElement { 
    cacheSize?: number
    expression?: Expression
    ignoreInvalidEndpoints?: boolean
    inheritErrorHandler?: boolean
    uriDelimiter?: string

    public constructor(init?: Partial<DynamicRouter>) { 
        super('dynamicRouter')
        Object.assign(this, init)
    }
}
export class DynamicRouterStep extends ProcessorStep {
    dynamicRouter: DynamicRouter = new DynamicRouter()

    public constructor(init?: Partial<DynamicRouter>) {
        super('dynamicRouterStep')
        Object.assign(this, {dynamicRouter: new DynamicRouter({...init})})
    }
}

export class Pipeline extends CamelElement { 
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Pipeline>) { 
        super('pipeline')
        Object.assign(this, init)
    }
}
export class PipelineStep extends ProcessorStep {
    pipeline: Pipeline = new Pipeline()

    public constructor(init?: Partial<Pipeline>) {
        super('pipelineStep')
        Object.assign(this, {pipeline: new Pipeline({...init})})
    }
}

export class Saga extends CamelElement { 
    compensation?: string
    completion?: string
    completionMode?: string
    inheritErrorHandler?: boolean
    propagation?: string
    sagaServiceRef?: string
    steps?: ProcessorStep [] = []
    timeout?: string
    timeoutInMilliseconds?: number

    public constructor(init?: Partial<Saga>) { 
        super('saga')
        Object.assign(this, init)
    }
}
export class SagaStep extends ProcessorStep {
    saga: Saga = new Saga()

    public constructor(init?: Partial<Saga>) {
        super('sagaStep')
        Object.assign(this, {saga: new Saga({...init})})
    }
}

export class Threads extends CamelElement { 
    allowCoreThreadTimeOut?: boolean
    callerRunsWhenRejected?: string
    executorServiceRef?: string
    inheritErrorHandler?: boolean
    keepAliveTime?: number
    maxPoolSize?: number
    maxQueueSize?: number
    poolSize?: number
    rejectedPolicy?: string
    threadName?: string
    timeUnit?: string

    public constructor(init?: Partial<Threads>) { 
        super('threads')
        Object.assign(this, init)
    }
}
export class ThreadsStep extends ProcessorStep {
    threads: Threads = new Threads()

    public constructor(init?: Partial<Threads>) {
        super('threadsStep')
        Object.assign(this, {threads: new Threads({...init})})
    }
}

export class When extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<When>) { 
        super('when')
        Object.assign(this, init)
    }
}
export class WhenStep extends ProcessorStep {
    when: When = new When()

    public constructor(init?: Partial<When>) {
        super('whenStep')
        Object.assign(this, {when: new When({...init})})
    }
}

export class ClaimCheck extends CamelElement { 
    filter?: string
    inheritErrorHandler?: boolean
    key?: string
    operation?: string
    strategyMethodName?: string
    strategyRef?: string

    public constructor(init?: Partial<ClaimCheck>) { 
        super('claimCheck')
        Object.assign(this, init)
    }
}
export class ClaimCheckStep extends ProcessorStep {
    claimCheck: ClaimCheck = new ClaimCheck()

    public constructor(init?: Partial<ClaimCheck>) {
        super('claimCheckStep')
        Object.assign(this, {claimCheck: new ClaimCheck({...init})})
    }
}

export class DoFinally extends CamelElement { 
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<DoFinally>) { 
        super('doFinally')
        Object.assign(this, init)
    }
}
export class DoFinallyStep extends ProcessorStep {
    doFinally: DoFinally = new DoFinally()

    public constructor(init?: Partial<DoFinally>) {
        super('doFinallyStep')
        Object.assign(this, {doFinally: new DoFinally({...init})})
    }
}

export class Filter extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<Filter>) { 
        super('filter')
        Object.assign(this, init)
    }
}
export class FilterStep extends ProcessorStep {
    filter: Filter = new Filter()

    public constructor(init?: Partial<Filter>) {
        super('filterStep')
        Object.assign(this, {filter: new Filter({...init})})
    }
}

export class Aggregate extends CamelElement { 
    aggregateControllerRef?: string
    aggregationRepositoryRef?: string
    closeCorrelationKeyOnCompletion?: number
    completeAllOnStop?: boolean
    completionFromBatchConsumer?: boolean
    completionInterval?: string
    completionOnNewCorrelationGroup?: boolean
    completionPredicate?: Expression
    completionSize?: number
    completionSizeExpression?: Expression
    completionTimeout?: string
    completionTimeoutCheckerInterval?: string
    completionTimeoutExpression?: Expression
    correlationExpression?: Expression
    discardOnAggregationFailure?: boolean
    discardOnCompletionTimeout?: boolean
    eagerCheckCompletion?: boolean
    executorServiceRef?: string
    forceCompletionOnStop?: boolean
    ignoreInvalidCorrelationKeys?: boolean
    inheritErrorHandler?: boolean
    optimisticLocking?: boolean
    parallelProcessing?: boolean
    steps?: ProcessorStep [] = []
    strategyMethodAllowNull?: boolean
    strategyMethodName?: string
    strategyRef?: string
    timeoutCheckerExecutorServiceRef?: string

    public constructor(init?: Partial<Aggregate>) { 
        super('aggregate')
        Object.assign(this, init)
    }
}
export class AggregateStep extends ProcessorStep {
    aggregate: Aggregate = new Aggregate()

    public constructor(init?: Partial<Aggregate>) {
        super('aggregateStep')
        Object.assign(this, {aggregate: new Aggregate({...init})})
    }
}

export class Transform extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean

    public constructor(init?: Partial<Transform>) { 
        super('transform')
        Object.assign(this, init)
    }
}
export class TransformStep extends ProcessorStep {
    transform: Transform = new Transform()

    public constructor(init?: Partial<Transform>) {
        super('transformStep')
        Object.assign(this, {transform: new Transform({...init})})
    }
}

export class IdempotentConsumer extends CamelElement { 
    completionEager?: string
    eager?: boolean
    expression?: Expression
    inheritErrorHandler?: boolean
    messageIdRepositoryRef?: string
    removeOnFailure?: boolean
    skipDuplicate?: boolean
    steps?: ProcessorStep [] = []

    public constructor(init?: Partial<IdempotentConsumer>) { 
        super('idempotentConsumer')
        Object.assign(this, init)
    }
}
export class IdempotentConsumerStep extends ProcessorStep {
    idempotentConsumer: IdempotentConsumer = new IdempotentConsumer()

    public constructor(init?: Partial<IdempotentConsumer>) {
        super('idempotentConsumerStep')
        Object.assign(this, {idempotentConsumer: new IdempotentConsumer({...init})})
    }
}

export class SetProperty extends CamelElement { 
    expression?: Expression
    inheritErrorHandler?: boolean
    name?: string

    public constructor(init?: Partial<SetProperty>) { 
        super('setProperty')
        Object.assign(this, init)
    }
}
export class SetPropertyStep extends ProcessorStep {
    setProperty: SetProperty = new SetProperty()

    public constructor(init?: Partial<SetProperty>) {
        super('setPropertyStep')
        Object.assign(this, {setProperty: new SetProperty({...init})})
    }
}

export class InOut extends CamelElement { 
    inheritErrorHandler?: boolean
    parameters?: any
    uri?: string

    public constructor(init?: Partial<InOut>) { 
        super('inOut')
        Object.assign(this, init)
    }
}
export class InOutStep extends ProcessorStep {
    inOut: InOut = new InOut()

    public constructor(init?: Partial<InOut>) {
        super('inOutStep')
        Object.assign(this, {inOut: new InOut({...init})})
    }
}

