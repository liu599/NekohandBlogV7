import React, {Component} from 'react';
import NekoModel from '../../models/model';
import { Link } from '@symph/joy/router';
import controller, {requireModel} from '@symph/joy/controller';
import ListWidgetStyles from '../../common/styles/widgets/listwidget.less';

@requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})
export default class WidgetList extends Component {

    async componentPrepare() {
        let {dispatch} = this.props;
        await dispatch({
            type: 'nekoblog/fetchCategories'
        });
        await dispatch({
            type: 'nekoblog/fetchFriendsInfo'
        });
        await dispatch({
            type: 'nekoblog/fetchChronology'
        });
    }

    render() {
        let data = [{
            title: "文章分类",
            data: this.props.model.categories
        }, {
            title: "文章归档",
            data: this.props.model.chronology
        }, {
            title: "友情链接",
            data: this.props.model.friendLinks
        }];

        return (
            <div>
                {
                    data.map((item, indx) => {
                        return (
                            <div className={ListWidgetStyles.widget} key={`${indx}-sf`}>
                                <div className={ListWidgetStyles.widgetHead}  key={`${indx}-sfh`}>
                                    <h2>{item.title}</h2>
                                </div>
                                <div className={ListWidgetStyles.widgetContent} key={`${indx}-sfc`}>
                                    {
                                        item.data && item.data.map((sd, index) => {
                                            if (sd.data && sd.data.length > 0) {
                                                return (
                                                    <div key={`${index}-sk`}>
                                                        <div className={ListWidgetStyles.widgetListHead}>
                                                            <h3>{sd.title}</h3>
                                                        </div>
                                                        <ul>
                                                            {
                                                                sd.data && sd.data.map((si, ind) => {
                                                                    return (
                                                                        <li key={`${ind}-es`}>
                                                                            <Link to={{
                                                                                pathname: si.link,
                                                                                query: {
                                                                                    t: si.query ? si.query : ''
                                                                                }
                                                                            }} title={si.htitle} target={si.link && si.link.includes('http') ? '_blank' : ''}>
                                                                                {si.title}{si.count ? `(${si.count})`: ``}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <li key={`${index}-sk2345`}>
                                                        <Link
                                                            to={{
                                                                pathname: `/category/${sd.clink}`,
                                                                state: sd
                                                            }}
                                                            title={sd.cinfo}
                                                            target={sd.clink && sd.clink.includes('http') ? '_blank' : ''}>
                                                            {sd.cname}
                                                        </Link>
                                                    </li>
                                                )
                                            }

                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}