import React, {Component} from 'react';
import {EventBus} from '../api/EventBus';
import {
    Modal,
    FileUpload,
    ActionGroup,
    Button,
    AlertGroup,
    Alert,
    getUniqueId, AlertActionCloseButton
} from '@patternfly/react-core';
import {TableComposable, Thead, Tbody, Tr, Th, Td, Caption} from '@patternfly/react-table';
import {ConfigOpenshift} from "../model/ConfigModels";
import {ConfigOpenshiftPanel} from "../components/ConfigOpenshiftPanel";
import {OpenshiftApi} from "../api/OpenshiftApi";
import '../karavan.css';

interface Props {
    onMounted: any;
}

interface State {
    isOpen: boolean;
    source: string,
    filename: string;
    value?: string | File;
    configOpenshift: ConfigOpenshift;
    alert?: string;
}

export class OpenFileModal extends Component<Props, State> {

    public state: State = {
        isOpen: false,
        source: 'file',
        filename: '',
        configOpenshift: new ConfigOpenshift(),
    };

    setModalOpen = (open: boolean) => {
        this.setState({isOpen: open});
    }

    handleFileChange = (value: string | File, filename: string) => {
        this.setState({...this.state, value: value, filename: filename});
    };

    onChangeOpenshiftConfig = (config: ConfigOpenshift) => {
        this.setState({...this.state, configOpenshift: config})
    };

    OpenshiftPanel = (
        <ConfigOpenshiftPanel config={this.state.configOpenshift} onChange={this.onChangeOpenshiftConfig}/>);


    retrieveFileList = (event: any) => {
        if (this.state.source === 'openshift') {
            OpenshiftApi.getBindingFiles(this.state.configOpenshift).then(res => {
                if (res.status === 200){
                    // const b:BindingFile[] = res.data.items.map( (i:any) => new BindingFile({id: i.metadata.uid, name: i.metadata.name, url: i.metadata.selfLink}))
                    // this.setState({...this.state, bindingFiles: b})
                } else {
                    this.setState({...this.state, alert: res.statusText});
                }
            }).catch(reason => this.setState({...this.state, alert: reason.toString()}));
        }
    }

    openFile = (path: string) => {
        if (this.state.source === 'openshift') {
            OpenshiftApi.openFile(this.state.configOpenshift, path).then(res => {
                if (res.status === 200) {
                    // EventBus.sendUploadedJson(res.data);
                } else {
                    this.setState({...this.state, alert: res.statusText});
                }
            });
            this.setModalOpen(false);
        }
    }

    render() {
        return (
            <Modal
                width={'75%'}
                title="Open Binding"
                isOpen={this.state.isOpen}
                onClose={() => this.setModalOpen(false)}
                className="open-file"
            >
                {this.state.source === 'openshift' && this.OpenshiftPanel}
                {this.state.source === 'file' && <FileUpload
                    id="yaml-file"
                    type="text"
                    value={this.state.value}
                    filename={this.state.filename}
                    dropzoneProps={{
                        accept: '.yaml',
                        maxSize: 10240,
                    }}
                    onChange={this.handleFileChange}
                />}
                {/*{this.state.bindingFiles && this.state.bindingFiles.length > 0 &&*/}
                {/*<TableComposable className="table" aria-label="Bindings" variant='compact' borders={false}>*/}
                {/*    <Thead>*/}
                {/*        <Tr>*/}
                {/*            <Th key='sha' width={30}>Id</Th>*/}
                {/*            <Th key='path'>Path</Th>*/}
                {/*        </Tr>*/}
                {/*    </Thead>*/}
                {/*    <Tbody>*/}
                {/*        {this.state.bindingFiles.map((row, rowIndex) => (*/}
                {/*            <Tr key={rowIndex}>*/}
                {/*                <Td key={`${rowIndex}-sha`} dataLabel={row.id}>*/}
                {/*                    {row.id.substr(0, 7)}*/}
                {/*                </Td>*/}
                {/*                <Td key={`${rowIndex}-path`} dataLabel={row.name}>*/}
                {/*                    <Button variant="link" isInline*/}
                {/*                            onClick={e => this.openFile(row.url)}>{row.name}</Button>*/}
                {/*                </Td>*/}
                {/*            </Tr>*/}
                {/*        ))}*/}
                {/*    </Tbody>*/}
                {/*</TableComposable>*/}
                {/*}*/}
                <ActionGroup className="action-buttons">
                    {this.state.source === 'file'
                        ? <Button variant="primary" key="open"
                                  onClick={e => this.openFile(this.state.filename)}>Open</Button>
                        : <Button variant="primary" key="retrieve" onClick={this.retrieveFileList}>Retrieve</Button>
                    }
                </ActionGroup>
                {this.state.alert &&
                <AlertGroup isLiveRegion aria-live="polite" aria-relevant="additions text" aria-atomic="false">
                    <Alert isInline variant="danger" title={this.state.alert} key={getUniqueId()}
                           actionClose={<AlertActionCloseButton
                               onClose={() => this.setState({...this.state, alert: undefined})}/>}
                    />
                </AlertGroup>
                }
            </Modal>
        );
    }
}
