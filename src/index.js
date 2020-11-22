import React, { Component } from 'react'
import { Switch, Route, Link } from '@symph/joy/router'
import AppController from './controllers/AppController'
import './common/styles/normalize.css';
import './common/styles/nprogress.css';
import './common/styles/main.less';
import headerStyles from './common/styles/header.less';
import footerStyles from './common/styles/footer.less';
import bodyStyles from './common/styles/body.less';
import Author from './components/widgets/Author';
// import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
import ArticleComponents from './components/articles';
import Loading from './components/loading';
import dynamic from '@symph/joy/dynamic';
import component404 from './_error.js';

const DynamicComponent = dynamic({
    loader: () => import('./components/widgets/WidgetList'),
    ssr: false,
    loading:() => <Loading.Loading />
});
const DynamicList = dynamic({
    loader: () => import('./components/articles/ArticleList'),
    ssr: false,
    loading:() => <Loading.Loading />
});
const DynamicPage = dynamic({
    loader: () => import('./components/articles/ArticlePage'),
    ssr: true,
    loading:() => <Loading.Loading />
});
const dictChs = ['首页', '关于'];
const dictEn = ['HOME', 'ABOUT'];
const dictLink = ['/', '/post/5b72f09a5c964c32f078402c'];

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
                                        <Link to={{
                                                pathname: dictLink[index]
                                            }}
                                           target={dictLink[index] && dictLink[index].includes("http") ? "_blank" : ""}
                                           className={headerStyles.menuItemLink}
                                        >
                                            <span className={headerStyles.fontChs}>{di}</span>
                                            <span className={headerStyles.fontEn}>{dictEn[index]}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                            <li className={headerStyles.menuItem}>
                                <a href={'https://apps.nekohand.moe/'}
                                      target={'_blank'}
                                      className={headerStyles.menuItemLink}
                                >
                                    <span className={headerStyles.fontChs}>应用</span>
                                    <span className={headerStyles.fontEn}>APP</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <header className={headerStyles.nhHeader}>
                        <img className={"lazy"}
                             src="https://blog.ecs32.top/static/bangdreampromote.354e8124.png"
                             alt="banner"
                        />
                        <div className={headerStyles.banner}>
                            <div className={headerStyles.bannerTxt}>
                                {/*<h1 className={headerStyles.siteTitle}>Welcome to Nekohand Blog</h1>*/}
                                {/*<h3 className={headerStyles.siteSlogan}>ポジションゼロ</h3>*/}
                            </div>
                        </div>
                    </header>
                    <main className={bodyStyles.main}>
                        <div className={bodyStyles.wrapper}>
                            <section className={bodyStyles.left}>
                                <Switch>
                                    <Route exact path="/category/:catname" component={DynamicList}/>
                                    <Route exact path="/timeline/:time" component={DynamicList}/>
                                    <Route exact path="/post/:pid" component={DynamicPage}/>
                                    <Route exact path="/" component={DynamicList}/>
                                    <Route component={component404} />
                                </Switch>
                            </section>
                            <section className={bodyStyles.right}>
                                <Author />
                                <DynamicComponent />
                            </section>
                        </div>
                    </main>
                    <footer className={footerStyles.footer}>
                        <div className={footerStyles.footerInfo}>
                            <p>Copyrights © 2014-2019 Nekohand 公式サイト委員會<i style={{verticalAlign: 'super'}} className={"demo-icon icon-trademark"} />. </p>
                            <p>All Rights Reserved: Tokei / eddie32.</p>
                            <p>Version: 7.2.0 <a href={`https://lnlfps.github.io/symph-joy`} target={`_blank`} title={`Minimalistic framework for React applications, inspiration comes from Next.js and Dva`} >Kasumi-SymphJoy</a>
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