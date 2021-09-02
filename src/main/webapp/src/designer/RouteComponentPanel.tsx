import React, { DragEvent, useState, useEffect } from 'react';
import {
  Title,
  TextInput,
  AccordionContent,
  AccordionToggle, AccordionItem, Accordion
} from '@patternfly/react-core';
import { Kamelet } from "../model/KameletModels";
import { Kamelets } from "../api/KameletApi";
import '../karavan.css';
import "@patternfly/patternfly/patternfly.css";
import {RouteStepApi} from "../api/RouteStepApi";

class Filter {
  filter: string = '';
  group: string = '';
  public constructor(init?: Partial<Filter>) {
    Object.assign(this, init);
  }
}

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.setData('karavan/offsetX', event.nativeEvent.offsetX.toString());
  event.dataTransfer.setData('karavan/offsetY', event.nativeEvent.offsetY.toString());
  event.dataTransfer.effectAllowed = 'move';
};

const RouteComponentPanel = () => {
  const [filter, setFilter] = useState<Filter>(new Filter({ group: '' }));
  const [filtered, setFiltered] = useState<Kamelet[]>([]);

  // const selectGroup = (isSelected: any, event: any) => {
  //   setFilter(new Filter({ filter: filter.filter, group: event.currentTarget.id }));
  // };
  const search = (event: string) => {
    setFilter(new Filter({ filter: event, group: filter.group }));
  };
  const refine = () => {
    const map = Kamelets
      .filter((kamelet: Kamelet) => {
        return !filter.filter ? kamelet.type() === filter.group : kamelet.type() === filter.group && kamelet.spec.definition.title.toLowerCase().includes(filter.filter.toLowerCase());
      })
      .sort((a, b) => {
        if (a.spec.definition.title < b.spec.definition.title) { return -1; }
        return a.spec.definition.title > b.spec.definition.title ? 1 : 0;
      });
    setFiltered(map);
  };

  useEffect(() => refine(), [filter]);

  const onToggle = (id: string) => {
    if (id === filter.group) {
      setFilter({...filter, group: '' });
    } else {
      setFilter({...filter, group: id });
    }
  };

  return (
    <div className="components" key="components">
      <Title headingLevel="h1" size="md">Components</Title>
      <TextInput className="text-field" type="search" id="search" name="search" value={filter.filter || ''} onChange={search} autoComplete="off" placeholder="Search by name" />
        <Accordion asDefinitionList={false} style={{height:"86%", background: "transparent"}}>
          {['source', 'action', 'sink'].map(x =>
              <AccordionItem key={x}>
                <AccordionToggle
                    onClick={() => onToggle(x)}
                    isExpanded={filter.group === x}
                    id={x} >
                  {x[0].toUpperCase() + x.substring(1)}
                </AccordionToggle>
                <AccordionContent id="source" isHidden={filter.group !== x} style={{height:"100%", maxHeight:"100%"}} >
                  <div className="inner">
                    {
                      filtered && filtered.length > 0 && filtered.map((kamelet) =>
                          <div key={kamelet.metadata.name} className="node react-flow__node-kamelet"
                               onDragStart={(event: DragEvent) => { event.dataTransfer.setData('kamelet', JSON.stringify(kamelet)); onDragStart(event, "") }} draggable>
                            <img draggable="false" src={kamelet.icon()} className="kamelet-icon" alt=""></img>
                            <p className="kamelet-title">{kamelet.spec.definition.title}</p>
                          </div>
                      )
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
          )}
          <AccordionItem>
            <AccordionToggle
                onClick={() => onToggle('routing')}
                isExpanded={filter.group === 'routing'}
                id={"routing"} >
              Routing
            </AccordionToggle>
            <AccordionContent id="source" isHidden={filter.group !== 'routing'} style={{height:"100%", maxHeight:"100%"}} >
              <div className="inner">
                {
                  RouteStepApi.getRoutingSteps().map((step) =>
                      <div key={step.type} className="node react-flow__node-kamelet"
                           onDragStart={(event: DragEvent) => { event.dataTransfer.setData('route-step', JSON.stringify(step)); onDragStart(event, "") }} draggable>
                        <img draggable="false" src={step.icon} className="kamelet-icon" alt=""></img>
                        <p className="kamelet-title">{RouteStepApi.getStepCaption(step)}</p>
                      </div>
                  )
                }
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  );
};

export default RouteComponentPanel;