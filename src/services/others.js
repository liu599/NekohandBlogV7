import request from '../utils/request';
import configs from './config';

export async function FriendsFetch() {
    return  request({
        url: configs.modules.others.friends,
        method: 'get',
    })
}

export async function FavoritesFetch() {
    return  request({
        url: configs.modules.others.favorites,
        method: 'get',
    })
}