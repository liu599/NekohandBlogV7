import React, {Component} from 'react';
import NekoModel from '../../models/model';
import controller from '@symph/joy/controller';
import {autowire} from '@symph/joy/autowire';
import utils from '../../utils'
import commentStyles from '../../common/styles/comment/commentlist.less';

function renderComment(cm) {
    return (
        <div className="comment-body">
            <div className={commentStyles.thumbNail}>
                <img src={require('../widgets/icon.jpg')} alt="banner" className="cm"/>
            </div>
            <div className={commentStyles.commentBodyMain}>
                <div className={commentStyles.commentBodyHead}>
                    <span className={commentStyles.commentAuthorName}>{cm.author}</span>
                    <span className={commentStyles.commentAuthorDate}>{utils.timeFormat(parseInt(cm.modifiedAt, 10))}</span>
                </div>
                <div className="comment-body-main-content">
                    <p dangerouslySetInnerHTML={{
                        __html: cm.body
                    }} />
                </div>
            </div>
        </div>
    )
}

function assignData(data, key, e) {
    data[key] = e.target.value;
}

function check(val) {
    let sanitizeHtml = require('sanitize-html');
    // return val.replace(/<[^>]+>|&[^>]+;/g,"").trim();
    return sanitizeHtml(val, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
        allowedAttributes: {
            'a': [ 'href' ]
        },
        allowedIframeHostnames: ['www.youtube.com'],
    });
    // return val.replace(/<[^>]+>|&[^>]+;/g,"").trim();
}

// @requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})

export default class CommentList extends Component {

    @autowire()
    nekoModel: NekoModel
    
    data = [
        {
            author: "Tokei",
            body: "测试评论系统",
            comid: 1,
            commentid: "5b6c3ff45c964c0688c566c7",
            created: 1539108482,
            ip: "103.29.70.243",
            mail: "460512944@qq.com",
            modifiedAt: 1539108482,
            pid: "5bbcee82421aa96cc86a82d1",
            prid: "0",
            url: "460512944@qq.com",
        }
    ];

    comment = {
        author: '',
        mail: '',
        code: '',
        body: ''
    };

    submitComment = (data, pid, e) => {
        e.persist();
        if (check(data.body) === '' || check(data.author) === '' || check(data.mail) === '') {
            alert('请填入必填项目');
            return;
        }
        if (data.code !== 'kasumi') {
            alert('您是机器人嘛, 请在验证码中输入指定字符。');
        } else {
            data.body = check(data.body);
            data.prid = "0";
            data.ip = this.props.model.ip;
            data.url = data.mail;
            data.pid = pid;
            delete data.code;
            console.log(data, 'to backend');
            this.props.dispatch({
                type: "nekoblog/submitComment",
                data: data
            });
            //     .then(() => {
            //     data = {};
            //     let inputs = e.target.parentElement.parentElement.querySelectorAll("input");
            //     let tinput = e.target.parentElement.parentElement.querySelectorAll("textarea");
            //     inputs.forEach(input => {
            //         input.value = '';
            //     });
            //     tinput[0].value = '';
            //     dispatch({
            //         type: "nekoblog/fetchComments",
            //         id:  pid
            //     });
            // });
        }
    };

    render() {
        const data = this.props.data;
        let renderData;

        if (data && data.length) {
            renderData = utils.arrayToTree(data, 'pid', 'prid');
        } else {
            renderData = undefined
        }

        return (
            <>
                <div className={commentStyles.container}>
                    <div className="comment-head">
                        <div className="comment-title">
                            <h2>{data && data.length} 条评论</h2>
                            <span>评论排序</span>
                        </div>
                        <div className={commentStyles.commentDialog}>
                            <div className={commentStyles.thumbNail}>
                                <img src={require('../widgets/icon.jpg')} alt="banner" className="cm"/>
                            </div>
                            <div className={commentStyles.commentBox}>
                                <div className={commentStyles.textAreaContainer}>
                                    <input type="text" placeholder="*昵称" title="昵称"
                                           maxLength="30"
                                           defaultValue={this.comment.author}
                                           required
                                           onChange={(e) => {assignData(this.comment, 'author', e)}} />
                                    <input type="text" placeholder="*网站/邮箱" title="网站/邮箱"
                                           defaultValue={this.comment.mail}
                                           maxLength="30" required
                                           onChange={(e) => {assignData(this.comment, 'mail', e)}} />
                                    <input type="text" placeholder="*验证码为kasumi" title="验证码"
                                           defaultValue={this.comment.code}
                                           maxLength="30" required
                                           onChange={(e) => {assignData(this.comment, 'code', e)}} />
                                    <textarea id="textarea" rows="1" autoComplete="off" maxLength="1000" required
                                              placeholder="*在这里评论"  defaultValue={this.comment.body}
                                              onFocusCapture={(e) => {console.log('focus captured')}}
                                              onChange={(e) => {assignData(this.comment, 'body', e)}} />
                                </div>
                                <div className={commentStyles.textAreaReplyBtns}>
                                    <button className={commentStyles.commentBtn} title="提交评论/Submit" onClick={(e) => {
                                        this.submitComment(this.comment, this.props.pid, e);
                                    }}>提交评论</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={commentStyles.commentContents}>
                        <div className="comment-thread">
                            {
                                renderData && renderData.reverse().map((cm, index) => {
                                    return (
                                        <div key={`${index}-comment-nh`}>
                                            { renderComment(cm) }
                                            <div className={commentStyles.replies} key={`${index}-reply-nh`}>
                                                {
                                                    cm.children && cm.children.length > 0 ?
                                                        cm.children.reverse().map((ch, idx) => {
                                                            return (
                                                                <div key={`${idx}-replies-children`}>
                                                                    { renderComment(ch) }
                                                                </div>
                                                            )
                                                        })
                                                        : ``
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}