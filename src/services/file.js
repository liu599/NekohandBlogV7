import fetch from '@symph/joy/fetch'

export async function getFileList() {
    return fetch(
        `${configs.genUrl(configs.frontend, configs.modules.frontend.filelist)}`,
        {
            method: 'GET',
            mode: 'cors',
        }
    );
}