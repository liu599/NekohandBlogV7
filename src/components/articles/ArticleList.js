import React, {Component} from 'react';
import Head from '@symph/joy/head';
import {Link} from '@symph/joy/router';
import NekoModel from '../../models/model';
import controller, {requireModel} from '@symph/joy/controller';
import articleStyles from '../../common/styles/article/articlelist.less';
import utils from '../../utils'

@requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})

export default class ArticleList extends Component {

    data = [
        {
            author: "5bc4cf825c964c0d20c5bff3",
            category: "前端开发",
            cid: "5bcafcac421aa96bb3b9b788",
            comment: 0,
            createdAt: 1543427777,
            id: "5bfed6c4421aa92dac0d68d1",
            modifiedAt: 1543427931,
            password: "******",
            pid: 25,
            plink: "",
            slug: "FEND, 动态加载",
            status: "",
            template: 0,
            title: "使用动态引入组件功能解决富文本编辑器加载问题",
            body: 'ajdkflajsdf'
        }
    ];

    render() {
        return (
            <>
                <Head>
                    <title>Article Title</title>
                </Head>
                <div>
                    {
                        this.props.model.posts && this.props.model.posts.map((ar, index) => {
                            return (
                                <article className={articleStyles.articleContainer} key={`${index}-arr`}>
                                    <div className="article-imageWrapper" />
                                    <p className={articleStyles.articleTitle}>{ar.title}</p>
                                    <div className={articleStyles.articleAux}>
                                        {/*<span className={articleStyles.articleDate}>修改于 {utils.timeFormat(parseInt(ar.modifiedAt, 10))}</span>*/}
                                        <span className={articleStyles.articleDate}>分类: {ar.category} | Tokei 发布于 {utils.timeFormat(parseInt(ar.createdAt, 10))}</span>
                                        <span className={articleStyles.articleComment}>共有 {ar.comment ? ar.comment : "0"} 条评论</span>
                                        <Link to={`/post/${ar.id}`} className={articleStyles.moreBtn}>
                                            <i className={"demo-icon icon-star"} /> Read more
                                        </Link>
                                    </div>
                                </article>
                            )
                        })
                    }
                </div>
            </>
        );
    }
}