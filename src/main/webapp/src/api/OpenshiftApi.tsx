import axios, {AxiosResponse} from "axios";
import {ConfigOpenshift} from "../model/ConfigModels";
import {StorageApi} from "./StorageApi";

export const OpenshiftApi = {

    getBindingFiles: async (config: ConfigOpenshift): Promise<AxiosResponse<any>> => {
        StorageApi.saveOpenshiftConfig(config);
        return axios.get(config.server + '/apis/camel.apache.org/v1alpha1/namespaces/' + config.namespace + '/kameletbindings/',
            {headers: {Authorization: 'Bearer ' + config.token, 'Accept': 'application/json'}});
    },

    openFile: async (config: ConfigOpenshift, path: string): Promise<AxiosResponse<any>> => {
        return axios.get(config.server + path,
            {headers: {Authorization: 'Bearer ' + config.token, 'Accept': 'application/json'}});
    },

    applyObj: async (config: ConfigOpenshift, name: string, obj: {}, after: (ok: boolean, text: string) => void) => {
        await OpenshiftApi.applyJson(config, name, JSON.stringify(obj), after);
    },

    applyJson: async (config: ConfigOpenshift, name: string, json: string, after: (ok: boolean, text: string) => void) => {
        axios.get(config.server + '/apis/camel.apache.org/v1alpha1/namespaces/'
            + config.namespace + '/kameletbindings/' + name,
            {headers: {Authorization: 'Bearer ' + config.token, 'Accept': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    axios.patch(config.server + '/apis/camel.apache.org/v1alpha1/namespaces/' + config.namespace +
                        '/kameletbindings/' + name + '??fieldManager=kubectl-client-side-apply',
                        json, {
                            headers: {
                                Authorization: 'Bearer ' + config.token,
                                'Content-Type': 'application/merge-patch+json',
                                'Accept': 'application/json'
                            }
                        }).then(value => after(value.status === 200, value.statusText))
                        .catch(err1 => after(false, err1.toString()));
                }
            }).catch(err => {
                console.log(err);
            if (err.response.status === 404) {
                axios.post(config.server + '/apis/camel.apache.org/v1alpha1/namespaces/' + config.namespace + '/kameletbindings',
                    json, {
                        headers: {
                            Authorization: 'Bearer ' + config.token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }).then(value => after(value.status === 201, "Applied"))
                    .catch(err2 => after(false, err2.toString()));
            } else {
                after(false, err.toString())
            }
        });
    }
}