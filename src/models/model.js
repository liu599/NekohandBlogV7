import model from '@symph/joy/model';
import dynamic from "@symph/joy/dynamic";
import {
    getServerInfo,
    postsFetch,
    postsFetchByCategory,
    postsFetchByTime,
    postFetch
} from '../services/post'
import {
    categoriesFetch,
    chronologyFetch
} from '../services/categories'
import {
    FavoritesFetch,
    FriendsFetch
} from '../services/others'
import {
    commentsFetch,
    commentSubmit
} from "../services/comments";
// import utils from '../utils';
import React from "react";


@model()

export default class AppModel {
    namespace = 'nekoblog';
    initState = {
        status: {},
        user: '',
        ip: '',
        token: '',
        loading: false,
        chronology: [
            {
                title: '2018',
                count: 10,
                data: []
            },
        ],
        series: [
            {
                title: '未完成的系列',
                count: 0,
                link: '/blog-create',
            },
        ],
        friendLinks: [
            {
                title: '科技类',
                data: [
                    {
                        title: 'dtysky',
                        link: 'http://dtysky.moe/',
                    },
                    {
                        title: 'acgtofe',
                        link: 'http://acgtofe.com/',
                    },
                    {
                        title: '卡瓦邦噶！',
                        link: 'https://www.kawabangga.com/',
                    },
                    {
                        title: 'FieldOfHope',
                        link: 'https://reishin.me/',
                    },
                    {
                        title: 'Jartto',
                        link: 'http://jartto.wang',
                    },
                    {
                        title: '吕大豹',
                        link: 'https://www.cnblogs.com/lvdabao/',
                    },
                    {
                        title: 'laike9m',
                        link: 'https://laike9m.com/',
                    },
                    {
                        title: 'Timothy',
                        link: 'https://xiaozhou.net/',
                    },
                    {
                        title: 'Sonic853',
                        link: 'https://blog.853lab.com/'
                    }
                ],
            },
        ],
        favorites: [],
        posts: [],
        post: {
            id: '-1',
            title: '网络不佳无法连线',
            category: '公告',
            createdAt: 0,
            slug: 'this is a created post',
            status: 'public',
            body: '电波无法到达哦~',
        },
        currentComments: [],
        categories: [],
        files: [],
    };

    async fetchServerInfo() {
        let serverInfo = await getServerInfo();
        let serverData = await serverInfo.json();
        let {status} = this.getState();
        this.setState({
            status: {
                ...status,
                ...serverData.data
            }
        })
    }

    async fetchPostList({data}) {
        this.setState({
            loading: true,
        });
        let postData = await postsFetch(data);
        // let postData = await postInfo.json();
        let {posts} = this.getState();
        this.setState({
            posts: [
                ...posts,
                ...postData.data
            ],
            loading: false,
        })
    }

    async fetchPostListByCategory({data}) {
        this.setState({
            loading: true,
        });
        let postData = await postsFetchByCategory(data);
        // let postData = await postInfo.json();
        let {posts} = this.getState();
        this.setState({
            posts: [
                ...postData.data
            ],
            loading: false,
        })
    }

    async fetchPostListByTime({data}) {
        this.setState({
            loading: true,
        });
        let postData = await postsFetchByTime(data);
        // let postData = await postInfo.json();
        let {posts} = this.getState();
        this.setState({
            posts: [
                ...postData.data
            ],
            loading: false,
        })
    }



    async fetchCategories() {
        let response = await categoriesFetch();
        this.setState({
            categories: response.data,
            ip: response.headers["x-real-ip"],
        });
        // utils.cache.set(response.headers["x-real-ip"]);
        // console.log('response is', response.data);
    }

    async fetchChronology() {
        let response = await chronologyFetch();
        let tempMap = {};
        let chrono = [];
        response.data.sort().forEach(sed => {
            let yr = sed.substring(0, 4);
            let index;
            if (tempMap[yr]) {
                index = chrono.findIndex(x => x.title === yr);
                // console.log(index, 'sadfasd')
            } else {
                index = chrono.push({
                    title: yr,
                    count: 0,
                    data: []
                }) - 1;
                tempMap[yr] = true;
            }
            let mn = sed.substring(4, 6);
            // console.log(mn)
            // new Date(2018, 12, 1) => 实际上是2019.1 差一个月
            let cv = {
                title: `${yr}年${mn}月`,
                count: sed.split('(')[1].split(')')[0],
                link: `/timeline/${sed.split('(')[0]}`,
                query: `${new Date(yr, mn, 0).getTime() - 3600000 * 24 * 30}`
            };
            chrono[index].data.push(cv);
        });
        this.setState({
            chronology: chrono.reverse(),
        })
    }

    async fetchFriendsInfo() {
        let response = await FriendsFetch();
        // console.log('friend', response);
        this.setState({
            friendLinks: response.data.data
        })
    }

    async fetchFaviorites() {
        let response = await FavoritesFetch();
        console.log('favorite', response);
        this.setState({
            favorites: response.data.data
        })
    }

    async fetchComments({id}) {
        let response = await commentsFetch(id);
        let responseData = await response.json();
        this.setState({
            currentComments: responseData.data
        });
    }

    async submitComment({data}) {
        let response = await commentSubmit(data);
        if (response.success) {
            response = await commentsFetch(data.pid);
            let responseData = await response.json();
            this.setState({
                currentComments: responseData.data
            });
        }
    }

    async fetchPost({id}) {
        let response = await postFetch(id);
        let responseData = await response.json();
        this.setState({
            post: responseData.data
        });
    }


}