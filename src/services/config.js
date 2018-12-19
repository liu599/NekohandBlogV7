export default {
    rootUrl: 'https://www.blog.nekohand.moe',
    fileUrl: 'https://bandori.nekohand.moe',
    filemodules: {
        upload: 'upload',
        nekofile: 'nekofile'
    },
    relativePath: '/api/nekohand/v2/',
    frontend: 'frontend',
    backend: 'backend',
    modules: {
        frontend: {
            categories: 'categories',
            status: 'status',
            post: 'post',
            posts: 'posts',
            postByTime: 'po/t',
            postChronology: 'posts-chronology',
            comments: 'comments',
            commentCreation: 'c2a5cc3b070',
            filelist: 'filelist',
        },
        backend: {
            token: 'token.v2.get',
            postEdit: 'auth/post.edit',
            postDelete: 'auth/post.delete',
            categoryEdit: 'auth/category.edit',
            categoryDelete: 'auth/category.delete',
        },
        others: {
            friends: 'https://mltd.nekohand.moe/service/friends',
            favorites: 'https://mltd.nekohand.moe/service/favorites',
        }
    },
    genUrl: function (module, name) {
        return `${this.rootUrl}${this.relativePath}${module}/${name}`
    },
    genFileUrl: function(module, name) {
        return `${this.fileUrl}/${module}/${name}`
    }
}