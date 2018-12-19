import fetch from '@symph/joy/fetch'
import request from '../utils/request'
import configs from './config';

export async function getServerInfo() {
    return fetch(
        'https://www.blog.nekohand.moe/api/nekohand/v2/frontend/status',
        {
            method: 'GET',
            mode: 'cors',
        }
    )
}

// export async function postsFetch(data) {
//     console.log('data', data, `${configs.genUrl(configs.frontend, configs.modules.frontend.posts)}`, qs.stringify(data));
//     return  fetch(
//         `${configs.genUrl(configs.frontend, configs.modules.frontend.posts)}`,
//         {
//             method: 'POST',
//             mode: 'cors',
//             credentials: 'omit',
//             headers: {
//                 contentType: 'application/x-www-form-urlencoded',
//             },
//             body: qs.stringify(data),
//         }
//     )
// }

export async function postsFetch(data) {
    return  request({
        url: `${configs.genUrl(configs.frontend, configs.modules.frontend.posts)}`,
        method: 'post-form-without-token',
        data,
    })
}

export async function postsFetchByCategory({cid, ...data}) {

    return  request({
        url: `${configs.genUrl(configs.frontend, configs.modules.frontend.posts)}/${cid}`,
        method: 'post-form-without-token',
        data
    })
}

export async function postFetch(id) {
    return  request({
        url: `${configs.genUrl(configs.frontend, configs.modules.frontend.post)}/${id}`,
        method: 'post-form-without-token',
    })
}

export async function postCreation(data) {
    return request({
        url: `${configs.genUrl(configs.backend, configs.modules.backend.postEdit)}`,
        method: 'post',
        data,
    })
}

export async function postDelete(data) {

    return request({
        url: `${configs.genUrl(configs.backend, configs.modules.backend.postDelete)}`,
        method: 'post-form',
        data,
    })
}



