import React, {Component} from 'react';
import Head from '@symph/joy/head';
import {routerRedux} from '@symph/joy/router'
import NekoModel from '../../models/model';
import controller, {requireModel} from '@symph/joy/controller';
import articleStyles from '../../common/styles/article/articlelist.less';
import articlePageStyles from '../../common/styles/article/articlepage.less';
import utils from '../../utils'
import Comments from '../comments';

@requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})

export default class ArticlePage extends Component {

    async componentPrepare() {
        let {dispatch} = this.props;
        // call model's effect method
        await dispatch({
            type: 'nekoblog/fetchComments',
            id: this.props.location.pathname.split('/')[2]
        });
        await  dispatch({
            type: 'nekoblog/fetchPost',
            id: this.props.location.pathname.split('/')[2]
        })
    }

    data = {
            author: "5b",
            category: "前端开发",
            cid: "5bcafca",
            comment: 0,
            createdAt: 1543427777,
            id: "5bfed6c",
            modifiedAt: 1543427931,
            password: "******",
            pid: 25,
            plink: "",
            slug: "离线文件",
            status: "",
            template: 0,
            title: "离线状态",
            body: 'ajdkflajsdf'
    };

    render() {
        let data = this.props.model.currentComments;
        this.data = this.props.model.post;
        return (

            <div>
                <Head>
                    <title>{this.data.title}</title>
                </Head>
                <article className={articleStyles.articleContainer}
                         style={{marginBottom: 1 + 'em', boxShadow: 'unset'}}
                >
                    <div className="article-imageWrapper" />
                    <h2 className={articleStyles.articleTitle}>{this.data.title}</h2>
                    <div className={articleStyles.articleAux}>
                        <span className={articleStyles.articleDate}>Tokei 发布于 {utils.timeFormat(this.data.createdAt)}</span>
                        <span className={articleStyles.articleComment}>共有 {this.data.comment ? this.data.comment : "0"} 条评论</span>
                        <span>Categories: {this.data.category} | <a onClick={() => {this.props.dispatch(routerRedux.push('/'));}}>
                            <i className={"demo-icon  icon-left-open"} />点此返回</a>
                        </span>
                    </div>
                    <div className={articlePageStyles.articleBody}
                         dangerouslySetInnerHTML={{ __html: this.data.body }}
                    />
                </article>
                <div className="nh-comments">
                    <Comments.CommentList data={data} pid={this.props.location.pathname.split('/')[2]} />
                </div>
            </div>
        );
    }
}