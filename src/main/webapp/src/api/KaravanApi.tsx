import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ConfigOpenshift} from "../model/ConfigModels";
import {StorageApi} from "./StorageApi";

export const KaravanApi = {

    getConfiguration: async (after: (config: {}) => void) => {
        axios.get( '/configuration',
            {headers: {'Accept': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    after(res.data);
                }
            }).catch(err => {
                console.log(err);
        });
    },

    getIntegrations: async (after: (integrations: []) => void) => {
        axios.get( '/integration',
            {headers: {'Accept': 'application/json'}})
            .then(res => {
                if (res.status === 200) {
                    after(res.data);
                }
            }).catch(err => {
            console.log(err);
        });
    }
}