import React from 'react';
import authorStyles from '../../common/styles/author.less';

export default () => {
  return (
    <div className={authorStyles.author}>
        <p className={authorStyles.authorContact}>
            →
            <a href="https://space.bilibili.com/57189/" target={`_blank`}  title="Bilibili">
                <img src={require("./bilibili.png")} alt="Bilibili" style={{width: 30}} />
            </a>
            <a href="https://github.com/liu599/" target={`_blank`} title="Github">
                <i className={"demo-icon icon-github-circled"} />
            </a>
            ←
        </p>
    </div>
  )
}
