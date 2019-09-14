import React from 'react';
import authorStyles from '../../common/styles/author.less';

export default () => {
  return (
    <div className={authorStyles.author}>
        <img className={authorStyles.authorLogo} src={require('./author.jpg')} alt=""/>
        <h3 className={authorStyles.authorName}>
            <a href="https://www.blog.nekohand.moe/" className="author_name">Tokei</a>
        </h3>
        <p className={authorStyles.authorIntro}>Entertainment & Technical Blog</p>
        {/*<span className={authorStyles.authorReading}>Technical Note (60%), Life (30%), Entertainment (10%)</span>*/}
        <p style={{textAlign: "center"}}>
            <a href="https://space.bilibili.com/57189/" target={`_blank`}  title="Bilibili">
                Bilibili
            </a> | &nbsp;
            <a href="https://github.com/liu599/" target={`_blank`} title="Github">
                Github
            </a>
        </p>
        {/*<p className={authorStyles.authorContact}>*/}
            {/*→*/}
            {/*<a href="https://space.bilibili.com/57189/" target={`_blank`}  title="Bilibili">*/}
                {/*<img src={require("./bilibili.png")} alt="Bilibili" style={{width: 30}} />*/}
            {/*</a>*/}
            {/*<a href="https://github.com/liu599/" target={`_blank`} title="Github">*/}
                {/*/!*<i className={"demo-icon icon-github-circled"} />*!/*/}
                {/*Front-End Engineer*/}
            {/*</a>*/}
            {/*←*/}
        {/*</p>*/}
    </div>
  )
}
