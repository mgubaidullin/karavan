import {    CamelElement, 
    ProcessorStep, 
    FromStep, 
    Expression, 
    PolicyStep, 
    SetPropertyStep, 
    SagaStep, 
    TodStep, 
    ThreadsStep, 
    InterceptSendToEndpointStep, 
    LogStep, 
    LoopStep, 
    DelayStep, 
    SampleStep, 
    DoFinallyStep, 
    LoadBalanceStep, 
    ValidateStep, 
    TransformStep, 
    RemoveHeadersStep, 
    IdempotentConsumerStep, 
    InterceptStep, 
    WhenStep, 
    ProcessStep, 
    OnFallbackStep, 
    MarshalStep, 
    OnCompletionStep, 
    ClaimCheckStep, 
    DoCatchStep, 
    InOnlyStep, 
    ConvertBodyToStep, 
    CircuitBreakerStep, 
    PollEnrichStep, 
    OtherwiseStep, 
    ResequenceStep, 
    RoutingSlipStep, 
    BeanStep, 
    RecipientListStep, 
    DynamicRouterStep, 
    RollbackStep, 
    EnrichStep, 
    InOutStep, 
    SplitStep, 
    WireTapStep, 
    MulticastStep, 
    StopStep, 
    SetBodyStep, 
    SortStep, 
    InterceptFromStep, 
    ThrowExceptionStep, 
    ToStep, 
    FilterStep, 
    ServiceCallStep, 
    ThrottleStep, 
    WhenSkipSendToEndpointStep, 
    RemovePropertiesStep, 
    SetHeaderStep, 
    ChoiceStep, 
    AggregateStep, 
    RemovePropertyStep, 
    RemoveHeaderStep, 
    ScriptStep, 
    DoTryStep, 
    SetExchangePatternStep, 
    TransactedStep, 
    PipelineStep, 
    UnmarshalStep, 
} from '../model/CamelModel' 

export class CamelApi { 

    static createStep = (name: string, body: any): CamelElement => {
       switch (name){
            case 'from': return CamelApi.createFrom(body)
            case 'expression': return CamelApi.createExpression(body)
            case 'policy': return CamelApi.createPolicy(body)
            case 'setProperty': return CamelApi.createSetProperty(body)
            case 'saga': return CamelApi.createSaga(body)
            case 'tod': return CamelApi.createTod(body)
            case 'threads': return CamelApi.createThreads(body)
            case 'interceptSendToEndpoint': return CamelApi.createInterceptSendToEndpoint(body)
            case 'log': return CamelApi.createLog(body)
            case 'loop': return CamelApi.createLoop(body)
            case 'delay': return CamelApi.createDelay(body)
            case 'sample': return CamelApi.createSample(body)
            case 'doFinally': return CamelApi.createDoFinally(body)
            case 'loadBalance': return CamelApi.createLoadBalance(body)
            case 'validate': return CamelApi.createValidate(body)
            case 'transform': return CamelApi.createTransform(body)
            case 'removeHeaders': return CamelApi.createRemoveHeaders(body)
            case 'idempotentConsumer': return CamelApi.createIdempotentConsumer(body)
            case 'intercept': return CamelApi.createIntercept(body)
            case 'when': return CamelApi.createWhen(body)
            case 'process': return CamelApi.createProcess(body)
            case 'onFallback': return CamelApi.createOnFallback(body)
            case 'marshal': return CamelApi.createMarshal(body)
            case 'onCompletion': return CamelApi.createOnCompletion(body)
            case 'claimCheck': return CamelApi.createClaimCheck(body)
            case 'doCatch': return CamelApi.createDoCatch(body)
            case 'inOnly': return CamelApi.createInOnly(body)
            case 'convertBodyTo': return CamelApi.createConvertBodyTo(body)
            case 'circuitBreaker': return CamelApi.createCircuitBreaker(body)
            case 'pollEnrich': return CamelApi.createPollEnrich(body)
            case 'otherwise': return CamelApi.createOtherwise(body)
            case 'resequence': return CamelApi.createResequence(body)
            case 'routingSlip': return CamelApi.createRoutingSlip(body)
            case 'bean': return CamelApi.createBean(body)
            case 'recipientList': return CamelApi.createRecipientList(body)
            case 'dynamicRouter': return CamelApi.createDynamicRouter(body)
            case 'rollback': return CamelApi.createRollback(body)
            case 'enrich': return CamelApi.createEnrich(body)
            case 'inOut': return CamelApi.createInOut(body)
            case 'split': return CamelApi.createSplit(body)
            case 'wireTap': return CamelApi.createWireTap(body)
            case 'multicast': return CamelApi.createMulticast(body)
            case 'stop': return CamelApi.createStop(body)
            case 'setBody': return CamelApi.createSetBody(body)
            case 'sort': return CamelApi.createSort(body)
            case 'interceptFrom': return CamelApi.createInterceptFrom(body)
            case 'throwException': return CamelApi.createThrowException(body)
            case 'to': return CamelApi.createTo(body)
            case 'filter': return CamelApi.createFilter(body)
            case 'serviceCall': return CamelApi.createServiceCall(body)
            case 'throttle': return CamelApi.createThrottle(body)
            case 'whenSkipSendToEndpoint': return CamelApi.createWhenSkipSendToEndpoint(body)
            case 'removeProperties': return CamelApi.createRemoveProperties(body)
            case 'setHeader': return CamelApi.createSetHeader(body)
            case 'choice': return CamelApi.createChoice(body)
            case 'aggregate': return CamelApi.createAggregate(body)
            case 'removeProperty': return CamelApi.createRemoveProperty(body)
            case 'removeHeader': return CamelApi.createRemoveHeader(body)
            case 'script': return CamelApi.createScript(body)
            case 'doTry': return CamelApi.createDoTry(body)
            case 'setExchangePattern': return CamelApi.createSetExchangePattern(body)
            case 'transacted': return CamelApi.createTransacted(body)
            case 'pipeline': return CamelApi.createPipeline(body)
            case 'unmarshal': return CamelApi.createUnmarshal(body)
            default: return new ProcessorStep('') 
        }
    }
    static createExpression = (element: any): Expression => {
        return new Expression({...element.expression})
    }
    static createFrom = (element: any): FromStep => {
        const fromStep = new FromStep({...element.from})
        fromStep.from.steps = CamelApi.createSteps(element?.from?.steps)
        fromStep.uuid = element?.uuid ? element.uuid : fromStep.uuid
        return fromStep
    }

    static createPolicy = (element: any): PolicyStep => {
        const policyStep = new PolicyStep({...element.policy})
        policyStep.policy.steps = CamelApi.createSteps(element?.policy?.steps)
        policyStep.uuid = element?.uuid ? element.uuid : policyStep.uuid
        return policyStep
    }

    static createSetProperty = (element: any): SetPropertyStep => {
        const setPropertyStep = new SetPropertyStep({...element.setProperty})
        setPropertyStep.setProperty.expression = CamelApi.createExpression(element?.setProperty?.expression)
        setPropertyStep.uuid = element?.uuid ? element.uuid : setPropertyStep.uuid
        return setPropertyStep
    }

    static createSaga = (element: any): SagaStep => {
        const sagaStep = new SagaStep({...element.saga})
        sagaStep.saga.steps = CamelApi.createSteps(element?.saga?.steps)
        sagaStep.uuid = element?.uuid ? element.uuid : sagaStep.uuid
        return sagaStep
    }

    static createTod = (element: any): TodStep => {
        const todStep = new TodStep({...element.tod})
        todStep.uuid = element?.uuid ? element.uuid : todStep.uuid
        return todStep
    }

    static createThreads = (element: any): ThreadsStep => {
        const threadsStep = new ThreadsStep({...element.threads})
        threadsStep.uuid = element?.uuid ? element.uuid : threadsStep.uuid
        return threadsStep
    }

    static createInterceptSendToEndpoint = (element: any): InterceptSendToEndpointStep => {
        const interceptSendToEndpointStep = new InterceptSendToEndpointStep({...element.interceptSendToEndpoint})
        interceptSendToEndpointStep.interceptSendToEndpoint.steps = CamelApi.createSteps(element?.interceptSendToEndpoint?.steps)
        interceptSendToEndpointStep.uuid = element?.uuid ? element.uuid : interceptSendToEndpointStep.uuid
        return interceptSendToEndpointStep
    }

    static createLog = (element: any): LogStep => {
        const logStep = new LogStep({...element.log})
        logStep.uuid = element?.uuid ? element.uuid : logStep.uuid
        return logStep
    }

    static createLoop = (element: any): LoopStep => {
        const loopStep = new LoopStep({...element.loop})
        loopStep.loop.expression = CamelApi.createExpression(element?.loop?.expression)
        loopStep.loop.steps = CamelApi.createSteps(element?.loop?.steps)
        loopStep.uuid = element?.uuid ? element.uuid : loopStep.uuid
        return loopStep
    }

    static createDelay = (element: any): DelayStep => {
        const delayStep = new DelayStep({...element.delay})
        delayStep.delay.expression = CamelApi.createExpression(element?.delay?.expression)
        delayStep.uuid = element?.uuid ? element.uuid : delayStep.uuid
        return delayStep
    }

    static createSample = (element: any): SampleStep => {
        const sampleStep = new SampleStep({...element.sample})
        sampleStep.uuid = element?.uuid ? element.uuid : sampleStep.uuid
        return sampleStep
    }

    static createDoFinally = (element: any): DoFinallyStep => {
        const doFinallyStep = new DoFinallyStep({...element.doFinally})
        doFinallyStep.doFinally.steps = CamelApi.createSteps(element?.doFinally?.steps)
        doFinallyStep.uuid = element?.uuid ? element.uuid : doFinallyStep.uuid
        return doFinallyStep
    }

    static createLoadBalance = (element: any): LoadBalanceStep => {
        const loadBalanceStep = new LoadBalanceStep({...element.loadBalance})
        loadBalanceStep.loadBalance.steps = CamelApi.createSteps(element?.loadBalance?.steps)
        loadBalanceStep.uuid = element?.uuid ? element.uuid : loadBalanceStep.uuid
        return loadBalanceStep
    }

    static createValidate = (element: any): ValidateStep => {
        const validateStep = new ValidateStep({...element.validate})
        validateStep.validate.expression = CamelApi.createExpression(element?.validate?.expression)
        validateStep.uuid = element?.uuid ? element.uuid : validateStep.uuid
        return validateStep
    }

    static createTransform = (element: any): TransformStep => {
        const transformStep = new TransformStep({...element.transform})
        transformStep.transform.expression = CamelApi.createExpression(element?.transform?.expression)
        transformStep.uuid = element?.uuid ? element.uuid : transformStep.uuid
        return transformStep
    }

    static createRemoveHeaders = (element: any): RemoveHeadersStep => {
        const removeHeadersStep = new RemoveHeadersStep({...element.removeHeaders})
        removeHeadersStep.uuid = element?.uuid ? element.uuid : removeHeadersStep.uuid
        return removeHeadersStep
    }

    static createIdempotentConsumer = (element: any): IdempotentConsumerStep => {
        const idempotentConsumerStep = new IdempotentConsumerStep({...element.idempotentConsumer})
        idempotentConsumerStep.idempotentConsumer.expression = CamelApi.createExpression(element?.idempotentConsumer?.expression)
        idempotentConsumerStep.idempotentConsumer.steps = CamelApi.createSteps(element?.idempotentConsumer?.steps)
        idempotentConsumerStep.uuid = element?.uuid ? element.uuid : idempotentConsumerStep.uuid
        return idempotentConsumerStep
    }

    static createIntercept = (element: any): InterceptStep => {
        const interceptStep = new InterceptStep({...element.intercept})
        interceptStep.intercept.steps = CamelApi.createSteps(element?.intercept?.steps)
        interceptStep.uuid = element?.uuid ? element.uuid : interceptStep.uuid
        return interceptStep
    }

    static createWhen = (element: any): WhenStep => {
        const whenStep = new WhenStep({...element.when})
        whenStep.when.expression = CamelApi.createExpression(element?.when?.expression)
        whenStep.when.steps = CamelApi.createSteps(element?.when?.steps)
        whenStep.uuid = element?.uuid ? element.uuid : whenStep.uuid
        return whenStep
    }

    static createProcess = (element: any): ProcessStep => {
        const processStep = new ProcessStep({...element.process})
        processStep.uuid = element?.uuid ? element.uuid : processStep.uuid
        return processStep
    }

    static createOnFallback = (element: any): OnFallbackStep => {
        const onFallbackStep = new OnFallbackStep({...element.onFallback})
        onFallbackStep.onFallback.steps = CamelApi.createSteps(element?.onFallback?.steps)
        onFallbackStep.uuid = element?.uuid ? element.uuid : onFallbackStep.uuid
        return onFallbackStep
    }

    static createMarshal = (element: any): MarshalStep => {
        const marshalStep = new MarshalStep({...element.marshal})
        marshalStep.uuid = element?.uuid ? element.uuid : marshalStep.uuid
        return marshalStep
    }

    static createOnCompletion = (element: any): OnCompletionStep => {
        const onCompletionStep = new OnCompletionStep({...element.onCompletion})
        onCompletionStep.onCompletion.onWhen = CamelApi.createWhen(element?.onCompletion?.onWhen)
        onCompletionStep.onCompletion.steps = CamelApi.createSteps(element?.onCompletion?.steps)
        onCompletionStep.uuid = element?.uuid ? element.uuid : onCompletionStep.uuid
        return onCompletionStep
    }

    static createClaimCheck = (element: any): ClaimCheckStep => {
        const claimCheckStep = new ClaimCheckStep({...element.claimCheck})
        claimCheckStep.uuid = element?.uuid ? element.uuid : claimCheckStep.uuid
        return claimCheckStep
    }

    static createDoCatch = (element: any): DoCatchStep => {
        const doCatchStep = new DoCatchStep({...element.doCatch})
        doCatchStep.doCatch.onWhen = CamelApi.createWhen(element?.doCatch?.onWhen)
        doCatchStep.doCatch.steps = CamelApi.createSteps(element?.doCatch?.steps)
        doCatchStep.uuid = element?.uuid ? element.uuid : doCatchStep.uuid
        return doCatchStep
    }

    static createInOnly = (element: any): InOnlyStep => {
        const inOnlyStep = new InOnlyStep({...element.inOnly})
        inOnlyStep.uuid = element?.uuid ? element.uuid : inOnlyStep.uuid
        return inOnlyStep
    }

    static createConvertBodyTo = (element: any): ConvertBodyToStep => {
        const convertBodyToStep = new ConvertBodyToStep({...element.convertBodyTo})
        convertBodyToStep.uuid = element?.uuid ? element.uuid : convertBodyToStep.uuid
        return convertBodyToStep
    }

    static createCircuitBreaker = (element: any): CircuitBreakerStep => {
        const circuitBreakerStep = new CircuitBreakerStep({...element.circuitBreaker})
        circuitBreakerStep.circuitBreaker.onFallback = CamelApi.createOnFallback(element?.circuitBreaker?.onFallback)
        circuitBreakerStep.circuitBreaker.steps = CamelApi.createSteps(element?.circuitBreaker?.steps)
        circuitBreakerStep.uuid = element?.uuid ? element.uuid : circuitBreakerStep.uuid
        return circuitBreakerStep
    }

    static createPollEnrich = (element: any): PollEnrichStep => {
        const pollEnrichStep = new PollEnrichStep({...element.pollEnrich})
        pollEnrichStep.pollEnrich.expression = CamelApi.createExpression(element?.pollEnrich?.expression)
        pollEnrichStep.uuid = element?.uuid ? element.uuid : pollEnrichStep.uuid
        return pollEnrichStep
    }

    static createOtherwise = (element: any): OtherwiseStep => {
        const otherwiseStep = new OtherwiseStep({...element.otherwise})
        otherwiseStep.otherwise.steps = CamelApi.createSteps(element?.otherwise?.steps)
        otherwiseStep.uuid = element?.uuid ? element.uuid : otherwiseStep.uuid
        return otherwiseStep
    }

    static createResequence = (element: any): ResequenceStep => {
        const resequenceStep = new ResequenceStep({...element.resequence})
        resequenceStep.resequence.expression = CamelApi.createExpression(element?.resequence?.expression)
        resequenceStep.resequence.steps = CamelApi.createSteps(element?.resequence?.steps)
        resequenceStep.uuid = element?.uuid ? element.uuid : resequenceStep.uuid
        return resequenceStep
    }

    static createRoutingSlip = (element: any): RoutingSlipStep => {
        const routingSlipStep = new RoutingSlipStep({...element.routingSlip})
        routingSlipStep.routingSlip.expression = CamelApi.createExpression(element?.routingSlip?.expression)
        routingSlipStep.uuid = element?.uuid ? element.uuid : routingSlipStep.uuid
        return routingSlipStep
    }

    static createBean = (element: any): BeanStep => {
        const beanStep = new BeanStep({...element.bean})
        beanStep.uuid = element?.uuid ? element.uuid : beanStep.uuid
        return beanStep
    }

    static createRecipientList = (element: any): RecipientListStep => {
        const recipientListStep = new RecipientListStep({...element.recipientList})
        recipientListStep.recipientList.expression = CamelApi.createExpression(element?.recipientList?.expression)
        recipientListStep.uuid = element?.uuid ? element.uuid : recipientListStep.uuid
        return recipientListStep
    }

    static createDynamicRouter = (element: any): DynamicRouterStep => {
        const dynamicRouterStep = new DynamicRouterStep({...element.dynamicRouter})
        dynamicRouterStep.dynamicRouter.expression = CamelApi.createExpression(element?.dynamicRouter?.expression)
        dynamicRouterStep.uuid = element?.uuid ? element.uuid : dynamicRouterStep.uuid
        return dynamicRouterStep
    }

    static createRollback = (element: any): RollbackStep => {
        const rollbackStep = new RollbackStep({...element.rollback})
        rollbackStep.uuid = element?.uuid ? element.uuid : rollbackStep.uuid
        return rollbackStep
    }

    static createEnrich = (element: any): EnrichStep => {
        const enrichStep = new EnrichStep({...element.enrich})
        enrichStep.enrich.expression = CamelApi.createExpression(element?.enrich?.expression)
        enrichStep.uuid = element?.uuid ? element.uuid : enrichStep.uuid
        return enrichStep
    }

    static createInOut = (element: any): InOutStep => {
        const inOutStep = new InOutStep({...element.inOut})
        inOutStep.uuid = element?.uuid ? element.uuid : inOutStep.uuid
        return inOutStep
    }

    static createSplit = (element: any): SplitStep => {
        const splitStep = new SplitStep({...element.split})
        splitStep.split.expression = CamelApi.createExpression(element?.split?.expression)
        splitStep.split.steps = CamelApi.createSteps(element?.split?.steps)
        splitStep.uuid = element?.uuid ? element.uuid : splitStep.uuid
        return splitStep
    }

    static createWireTap = (element: any): WireTapStep => {
        const wireTapStep = new WireTapStep({...element.wireTap})
        wireTapStep.wireTap.body = CamelApi.createExpression(element?.wireTap?.body)
        wireTapStep.wireTap.setHeader =  [...element?.wireTap?.setHeader].map(x => CamelApi.createSetHeader(x))
        wireTapStep.uuid = element?.uuid ? element.uuid : wireTapStep.uuid
        return wireTapStep
    }

    static createMulticast = (element: any): MulticastStep => {
        const multicastStep = new MulticastStep({...element.multicast})
        multicastStep.multicast.steps = CamelApi.createSteps(element?.multicast?.steps)
        multicastStep.uuid = element?.uuid ? element.uuid : multicastStep.uuid
        return multicastStep
    }

    static createStop = (element: any): StopStep => {
        const stopStep = new StopStep({...element.stop})
        stopStep.uuid = element?.uuid ? element.uuid : stopStep.uuid
        return stopStep
    }

    static createSetBody = (element: any): SetBodyStep => {
        const setBodyStep = new SetBodyStep({...element.setBody})
        setBodyStep.setBody.expression = CamelApi.createExpression(element?.setBody?.expression)
        setBodyStep.uuid = element?.uuid ? element.uuid : setBodyStep.uuid
        return setBodyStep
    }

    static createSort = (element: any): SortStep => {
        const sortStep = new SortStep({...element.sort})
        sortStep.sort.expression = CamelApi.createExpression(element?.sort?.expression)
        sortStep.uuid = element?.uuid ? element.uuid : sortStep.uuid
        return sortStep
    }

    static createInterceptFrom = (element: any): InterceptFromStep => {
        const interceptFromStep = new InterceptFromStep({...element.interceptFrom})
        interceptFromStep.interceptFrom.steps = CamelApi.createSteps(element?.interceptFrom?.steps)
        interceptFromStep.uuid = element?.uuid ? element.uuid : interceptFromStep.uuid
        return interceptFromStep
    }

    static createThrowException = (element: any): ThrowExceptionStep => {
        const throwExceptionStep = new ThrowExceptionStep({...element.throwException})
        throwExceptionStep.uuid = element?.uuid ? element.uuid : throwExceptionStep.uuid
        return throwExceptionStep
    }

    static createTo = (element: any): ToStep => {
        const toStep = new ToStep({...element.to})
        toStep.uuid = element?.uuid ? element.uuid : toStep.uuid
        return toStep
    }

    static createFilter = (element: any): FilterStep => {
        const filterStep = new FilterStep({...element.filter})
        filterStep.filter.expression = CamelApi.createExpression(element?.filter?.expression)
        filterStep.filter.steps = CamelApi.createSteps(element?.filter?.steps)
        filterStep.uuid = element?.uuid ? element.uuid : filterStep.uuid
        return filterStep
    }

    static createServiceCall = (element: any): ServiceCallStep => {
        const serviceCallStep = new ServiceCallStep({...element.serviceCall})
        serviceCallStep.uuid = element?.uuid ? element.uuid : serviceCallStep.uuid
        return serviceCallStep
    }

    static createThrottle = (element: any): ThrottleStep => {
        const throttleStep = new ThrottleStep({...element.throttle})
        throttleStep.throttle.correlationExpression = CamelApi.createExpression(element?.throttle?.correlationExpression)
        throttleStep.throttle.expression = CamelApi.createExpression(element?.throttle?.expression)
        throttleStep.uuid = element?.uuid ? element.uuid : throttleStep.uuid
        return throttleStep
    }

    static createWhenSkipSendToEndpoint = (element: any): WhenSkipSendToEndpointStep => {
        const whenSkipSendToEndpointStep = new WhenSkipSendToEndpointStep({...element.whenSkipSendToEndpoint})
        whenSkipSendToEndpointStep.whenSkipSendToEndpoint.expression = CamelApi.createExpression(element?.whenSkipSendToEndpoint?.expression)
        whenSkipSendToEndpointStep.whenSkipSendToEndpoint.steps = CamelApi.createSteps(element?.whenSkipSendToEndpoint?.steps)
        whenSkipSendToEndpointStep.uuid = element?.uuid ? element.uuid : whenSkipSendToEndpointStep.uuid
        return whenSkipSendToEndpointStep
    }

    static createRemoveProperties = (element: any): RemovePropertiesStep => {
        const removePropertiesStep = new RemovePropertiesStep({...element.removeProperties})
        removePropertiesStep.uuid = element?.uuid ? element.uuid : removePropertiesStep.uuid
        return removePropertiesStep
    }

    static createSetHeader = (element: any): SetHeaderStep => {
        const setHeaderStep = new SetHeaderStep({...element.setHeader})
        setHeaderStep.setHeader.expression = CamelApi.createExpression(element?.setHeader?.expression)
        setHeaderStep.uuid = element?.uuid ? element.uuid : setHeaderStep.uuid
        return setHeaderStep
    }

    static createChoice = (element: any): ChoiceStep => {
        const choiceStep = new ChoiceStep({...element.choice})
        choiceStep.choice.otherwise = CamelApi.createOtherwise(element?.choice?.otherwise)
        choiceStep.choice.when =  [...element?.choice?.when].map(x => CamelApi.createWhen(x))
        choiceStep.uuid = element?.uuid ? element.uuid : choiceStep.uuid
        return choiceStep
    }

    static createAggregate = (element: any): AggregateStep => {
        const aggregateStep = new AggregateStep({...element.aggregate})
        aggregateStep.aggregate.completionPredicate = CamelApi.createExpression(element?.aggregate?.completionPredicate)
        aggregateStep.aggregate.completionSizeExpression = CamelApi.createExpression(element?.aggregate?.completionSizeExpression)
        aggregateStep.aggregate.completionTimeoutExpression = CamelApi.createExpression(element?.aggregate?.completionTimeoutExpression)
        aggregateStep.aggregate.correlationExpression = CamelApi.createExpression(element?.aggregate?.correlationExpression)
        aggregateStep.aggregate.steps = CamelApi.createSteps(element?.aggregate?.steps)
        aggregateStep.uuid = element?.uuid ? element.uuid : aggregateStep.uuid
        return aggregateStep
    }

    static createRemoveProperty = (element: any): RemovePropertyStep => {
        const removePropertyStep = new RemovePropertyStep({...element.removeProperty})
        removePropertyStep.uuid = element?.uuid ? element.uuid : removePropertyStep.uuid
        return removePropertyStep
    }

    static createRemoveHeader = (element: any): RemoveHeaderStep => {
        const removeHeaderStep = new RemoveHeaderStep({...element.removeHeader})
        removeHeaderStep.uuid = element?.uuid ? element.uuid : removeHeaderStep.uuid
        return removeHeaderStep
    }

    static createScript = (element: any): ScriptStep => {
        const scriptStep = new ScriptStep({...element.script})
        scriptStep.script.expression = CamelApi.createExpression(element?.script?.expression)
        scriptStep.uuid = element?.uuid ? element.uuid : scriptStep.uuid
        return scriptStep
    }

    static createDoTry = (element: any): DoTryStep => {
        const doTryStep = new DoTryStep({...element.doTry})
        doTryStep.doTry.doCatch =  [...element?.doTry?.doCatch].map(x => CamelApi.createDoCatch(x))
        doTryStep.doTry.doFinally = CamelApi.createDoFinally(element?.doTry?.doFinally)
        doTryStep.doTry.steps = CamelApi.createSteps(element?.doTry?.steps)
        doTryStep.uuid = element?.uuid ? element.uuid : doTryStep.uuid
        return doTryStep
    }

    static createSetExchangePattern = (element: any): SetExchangePatternStep => {
        const setExchangePatternStep = new SetExchangePatternStep({...element.setExchangePattern})
        setExchangePatternStep.uuid = element?.uuid ? element.uuid : setExchangePatternStep.uuid
        return setExchangePatternStep
    }

    static createTransacted = (element: any): TransactedStep => {
        const transactedStep = new TransactedStep({...element.transacted})
        transactedStep.transacted.steps = CamelApi.createSteps(element?.transacted?.steps)
        transactedStep.uuid = element?.uuid ? element.uuid : transactedStep.uuid
        return transactedStep
    }

    static createPipeline = (element: any): PipelineStep => {
        const pipelineStep = new PipelineStep({...element.pipeline})
        pipelineStep.pipeline.steps = CamelApi.createSteps(element?.pipeline?.steps)
        pipelineStep.uuid = element?.uuid ? element.uuid : pipelineStep.uuid
        return pipelineStep
    }

    static createUnmarshal = (element: any): UnmarshalStep => {
        const unmarshalStep = new UnmarshalStep({...element.unmarshal})
        unmarshalStep.uuid = element?.uuid ? element.uuid : unmarshalStep.uuid
        return unmarshalStep
    }

    static createSteps = (elements: any[] | undefined): ProcessorStep[] => {
        const result: ProcessorStep[] = []
        if (elements !== undefined){
            elements.forEach(e => {
                const stepName = Object.keys(e).filter(key => !['uuid', 'dslName'].includes(key))[0];
                result.push(CamelApi.createStep(stepName, e));
            })
        }
        return result
    }

    static elementFromStep = (step: CamelElement): CamelElement => {
        switch (step.dslName){
            case 'fromStep' : return (step as FromStep).from
            case 'policyStep': return (step as PolicyStep).policy
            case 'setPropertyStep': return (step as SetPropertyStep).setProperty
            case 'sagaStep': return (step as SagaStep).saga
            case 'todStep': return (step as TodStep).tod
            case 'threadsStep': return (step as ThreadsStep).threads
            case 'interceptSendToEndpointStep': return (step as InterceptSendToEndpointStep).interceptSendToEndpoint
            case 'logStep': return (step as LogStep).log
            case 'loopStep': return (step as LoopStep).loop
            case 'delayStep': return (step as DelayStep).delay
            case 'sampleStep': return (step as SampleStep).sample
            case 'doFinallyStep': return (step as DoFinallyStep).doFinally
            case 'loadBalanceStep': return (step as LoadBalanceStep).loadBalance
            case 'validateStep': return (step as ValidateStep).validate
            case 'transformStep': return (step as TransformStep).transform
            case 'removeHeadersStep': return (step as RemoveHeadersStep).removeHeaders
            case 'idempotentConsumerStep': return (step as IdempotentConsumerStep).idempotentConsumer
            case 'interceptStep': return (step as InterceptStep).intercept
            case 'whenStep': return (step as WhenStep).when
            case 'processStep': return (step as ProcessStep).process
            case 'onFallbackStep': return (step as OnFallbackStep).onFallback
            case 'marshalStep': return (step as MarshalStep).marshal
            case 'onCompletionStep': return (step as OnCompletionStep).onCompletion
            case 'claimCheckStep': return (step as ClaimCheckStep).claimCheck
            case 'doCatchStep': return (step as DoCatchStep).doCatch
            case 'inOnlyStep': return (step as InOnlyStep).inOnly
            case 'convertBodyToStep': return (step as ConvertBodyToStep).convertBodyTo
            case 'circuitBreakerStep': return (step as CircuitBreakerStep).circuitBreaker
            case 'pollEnrichStep': return (step as PollEnrichStep).pollEnrich
            case 'otherwiseStep': return (step as OtherwiseStep).otherwise
            case 'resequenceStep': return (step as ResequenceStep).resequence
            case 'routingSlipStep': return (step as RoutingSlipStep).routingSlip
            case 'beanStep': return (step as BeanStep).bean
            case 'recipientListStep': return (step as RecipientListStep).recipientList
            case 'dynamicRouterStep': return (step as DynamicRouterStep).dynamicRouter
            case 'rollbackStep': return (step as RollbackStep).rollback
            case 'enrichStep': return (step as EnrichStep).enrich
            case 'inOutStep': return (step as InOutStep).inOut
            case 'splitStep': return (step as SplitStep).split
            case 'wireTapStep': return (step as WireTapStep).wireTap
            case 'multicastStep': return (step as MulticastStep).multicast
            case 'stopStep': return (step as StopStep).stop
            case 'setBodyStep': return (step as SetBodyStep).setBody
            case 'sortStep': return (step as SortStep).sort
            case 'interceptFromStep': return (step as InterceptFromStep).interceptFrom
            case 'throwExceptionStep': return (step as ThrowExceptionStep).throwException
            case 'toStep': return (step as ToStep).to
            case 'filterStep': return (step as FilterStep).filter
            case 'serviceCallStep': return (step as ServiceCallStep).serviceCall
            case 'throttleStep': return (step as ThrottleStep).throttle
            case 'whenSkipSendToEndpointStep': return (step as WhenSkipSendToEndpointStep).whenSkipSendToEndpoint
            case 'removePropertiesStep': return (step as RemovePropertiesStep).removeProperties
            case 'setHeaderStep': return (step as SetHeaderStep).setHeader
            case 'choiceStep': return (step as ChoiceStep).choice
            case 'aggregateStep': return (step as AggregateStep).aggregate
            case 'removePropertyStep': return (step as RemovePropertyStep).removeProperty
            case 'removeHeaderStep': return (step as RemoveHeaderStep).removeHeader
            case 'scriptStep': return (step as ScriptStep).script
            case 'doTryStep': return (step as DoTryStep).doTry
            case 'setExchangePatternStep': return (step as SetExchangePatternStep).setExchangePattern
            case 'transactedStep': return (step as TransactedStep).transacted
            case 'pipelineStep': return (step as PipelineStep).pipeline
            case 'unmarshalStep': return (step as UnmarshalStep).unmarshal
            default : return new CamelElement('')
        }
    }
}
