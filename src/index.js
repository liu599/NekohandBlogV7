import React, { Component } from 'react'
import { Switch, Route, Redirect } from '@symph/joy/router'
import AppController from './controllers/AppController'
import './common/styles/normalize.css';
import './common/styles/nprogress.css';
import './common/styles/main.less';
import headerStyles from './common/styles/header.less';
import footerStyles from './common/styles/footer.less';
import bodyStyles from './common/styles/body.less';
import Widgets from './components/widgets'
import ArticleComponents from './components/articles'

const Author = Widgets.Author;
const WidgetList = Widgets.WidgetList;
const dictChs = ['首页', '关于', '应用'];
const dictEn = ['HOME', 'ABOUT', 'APP'];
const dictLink = ['/', '/post/5b72f09a5c964c32f078402c', 'https://apps.nekohand.moe/'];

export default class Main extends Component {

    render () {
        return (
            <>
                <AppController path="/">
                    <nav className={headerStyles.nhNavigation}>
                        <div className={headerStyles.logoContainer}>
                            <h1 className={headerStyles.logo}>
                                <a href="https://blog.nekohand.moe" rel="home" title="猫">Nekohand</a>
                            </h1>
                        </div>
                        <ul className={headerStyles.menu}>
                            {
                                dictChs.map((di, index) => (
                                    <li className={headerStyles.menuItem} key={index}>
                                        <a href={{pathname: dictLink[index]}}
                                           target={dictLink[index].includes("http") ? "_blank" : ""}
                                           className={headerStyles.menuItemLink}
                                        >
                                            <span className={headerStyles.fontChs}>{di}</span>
                                            <span className={headerStyles.fontEn}>{dictEn[index]}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <header className={headerStyles.nhHeader}>
                        <img className={"lazy"}
                             src="http://bandori.nekohand.moe/nekofile/5bf962fe421aa941eefd50fe/"
                             alt="banner"
                        />
                        <div className={headerStyles.banner}>
                            <div className={headerStyles.bannerTxt}>
                                <h1 className={headerStyles.siteTitle}>Welcome to Nekohand Blog</h1>
                                <h3 className={headerStyles.siteSlogan}>ポジションゼロ</h3>
                            </div>
                        </div>
                    </header>
                    <main className={bodyStyles.main}>
                        <div className={bodyStyles.wrapper}>
                            <section className={bodyStyles.left}>
                                <Switch>
                                    <Route exact path="/post/:pid" component={ArticleComponents.ArticlePage}/>
                                    <Route exact path="/" component={ArticleComponents.ArticleList}/>
                                    <Route component={() => (<div>Waiting for the development..</div>)}/>
                                </Switch>
                            </section>
                            <section className={bodyStyles.right}>
                                <Author />
                                <WidgetList />
                            </section>
                        </div>
                    </main>
                    <footer className={footerStyles.footer}>
                        <div className={footerStyles.footerInfo}>
                            <p>Copyrights © 2014-2018 Nekohand 公式サイト委員會<i className={"demo-icon icon-trademark"} />. </p>
                            <p>All Rights Reserved: Tokei. Thanks to <a href={`https://umijs.org/`} target={`_blank`} title={`A Pluggable enterprise-level react application framework`}>UmiJs</a> and <a href={`https://lnlfps.github.io/symph-joy`} target={`_blank`} title={`Minimalistic framework for React applications, inspiration comes from Next.js and Dva`} >symph-joy</a>.</p>
                            <p>Current Version: 7.0.0 Kasumi
                                <a href="https://tae.nekohand.moe" target={`_blank`} className="author_name" title={`文章管理`}>
                                    <i className={"demo-icon icon-star"} />
                                </a>.</p>
                            <p style={{display: "none"}}>沪ICP备17006741号 - ecs32.top</p>
                        </div>
                    </footer>
                </AppController>
            </>
        )
    }
}