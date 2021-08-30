import {ConfigOpenshift} from "../model/ConfigModels";

const STORAGE_GITHUB_CONFIG: string = "STORAGE_GITHUB_CONFIG";
const STORAGE_OPENSHIFT_CONFIG: string = "STORAGE_OPENSHIFT_CONFIG";

const storage: Storage = window.localStorage;

export const StorageApi = {

    saveOpenshiftConfig: (config: ConfigOpenshift) => {
        const c = new ConfigOpenshift({namespace:config.namespace, server: config.server})
        storage.setItem(STORAGE_OPENSHIFT_CONFIG, JSON.stringify(c));
    },

    retrieveOpenshiftConfig: () => {
        const text = storage.getItem(STORAGE_OPENSHIFT_CONFIG);
        return text ? new ConfigOpenshift(JSON.parse(text)) : new ConfigOpenshift();
    },


}