import React, { DragEvent, useState, useEffect } from 'react';
import {
  Title,
  TextInput,
  AccordionContent,
  AccordionToggle, AccordionItem, Accordion, Card, CardHeader, Text, CardBody
} from '@patternfly/react-core';
import { Kamelet } from "../model/KameletModels";
import { Kamelets } from "../api/KameletApi";
import '../karavan.css';
import "@patternfly/patternfly/patternfly.css";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslApi} from "../api/DslApi";
import {DslMetaModel} from "../model/DslMetaModel";

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

  const getFilteredDsl = (label:string):DslMetaModel[] => {
    return DslMetaApi.getDslMetaModels(label)
        .filter(model => model.title.toLowerCase().includes(filter.filter.toLowerCase()))
  }

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
                          <div key={kamelet.metadata.name} className="node"
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
          { ['routing', 'transformation', 'error', 'configuration'].map((label, index) =>
              <AccordionItem>
                <AccordionToggle
                    onClick={() => onToggle(label)}
                    isExpanded={filter.group === label}
                    id={label} >
                  {label}
                </AccordionToggle>
                <AccordionContent id={label} isHidden={filter.group !== label} style={{height:"100%", maxHeight:"100%"}} >
                  <div className="inner">
                    {getFilteredDsl(label).map((model, index) => (
                        <div key={model.name} className="node"
                             onDragStart={(event: DragEvent) => { event.dataTransfer.setData('route-step', JSON.stringify(model)); onDragStart(event, "") }} draggable>
                          <img draggable="false" src={DslApi.getIcon(model.name)} className="kamelet-icon" alt=""></img>
                          <p className="kamelet-title">{model.title}</p>
                        </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
          )}
        </Accordion>
    </div>
  );
};

export default RouteComponentPanel;