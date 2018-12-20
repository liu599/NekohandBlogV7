import fetch from '@symph/joy/fetch'
import configs from './config';

export async function commentsFetch(coid) {
    // return  request({
    //     url: `${configs.genUrl(configs.frontend, configs.modules.frontend.comments)}/${coid}`,
    //     method: 'post',
    // })

    return  fetch(`${configs.genUrl(configs.frontend, configs.modules.frontend.comments)}/${coid}`,
        {
            body: null,
            method: 'POST',
            mode: 'cors'
       });
}

export async function commentSubmit(data) {
    return  request({
        url: `${configs.genUrl(configs.frontend, configs.modules.frontend.commentCreation)}`,
        method: 'post',
        data
    })
}