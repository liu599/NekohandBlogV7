import React, {Component} from 'react';
import Head from '@symph/joy/head';
import NekoModel from '../../models/model';
import controller, {requireModel} from '@symph/joy/controller';
import articleStyles from '../../common/styles/article/articlelist.less';
import articlePageStyles from '../../common/styles/article/articlepage.less';
import utils from '../../utils'
import Comments from '../comments';

@requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.model // bind model's state to props
    }
})

export default class ArticlePage extends Component {

    data = {
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
    };

    render() {
        return (
            <div>
                <article className={articleStyles.articleContainer}
                         style={{marginBottom: 1 + 'em', boxShadow: 'unset'}}
                >
                    <div className="article-imageWrapper" />
                    <h2 className={articleStyles.articleTitle}>{this.data.title}</h2>
                    <div className={articleStyles.articleAux}>
                        <span className={articleStyles.articleDate}>Tokei 发布于 {utils.timeFormat(this.data.createdAt)}</span>
                        <span className={articleStyles.articleComment}>共有 {this.data.comment ? this.data.comment : "0"} 条评论</span>
                        <span>Categories: {this.data.category} | <a onClick={() => {console.log(2);}}>
                            <i className={"demo-icon  icon-left-open"} />点此返回</a>
                        </span>
                    </div>
                    <div className={articlePageStyles.articleBody}
                         dangerouslySetInnerHTML={{ __html: this.data.body }}
                    />
                </article>
                <div className="nh-comments">
                    <Comments.CommentList />
                </div>
            </div>
        );
    }
}