import React, {Component} from 'react';
import NekoModel from '../../models/model';
import controller, {requireModel} from '@symph/joy/controller';
import utils from '../../utils'
import ListWidgetStyles from '../../common/styles/widgets/listwidget.less';

@requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})
export default class WidgetList extends Component {

    converseData = [{
       title: "友情链接",
       data: this.props.model.friendLinks
    }];

    render() {
        let data = this.converseData;
        if (data.length === 0) {
            return (<div>sadf</div>);
        }
        if (data[0].data) {
            return (
                <div className={ListWidgetStyles.widget}>
                    <div className={ListWidgetStyles.widgetHead}>
                        <h2>{data[0].title}</h2>
                    </div>
                    <div className={ListWidgetStyles.widgetContent}>
                        {
                            data[0].data.map((sd, index) => {
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
                                                            <a to={{
                                                                pathname: si.link,
                                                                query: {
                                                                    t: si.query ? si.query : ''
                                                                }
                                                            }} title={si.htitle} target={si.link && si.link.includes('http') ? '_blank' : ''}>
                                                                {si.title}{si.count ? `(${si.count})`: ``}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className={ListWidgetStyles.widget}>
                    <div className={ListWidgetStyles.widgetHead}>
                        <h2>{title}</h2>
                    </div>
                    <div className={ListWidgetStyles.widgetContent}>
                        <ul>
                            {
                                data.map((sd, index) => {
                                    return (
                                        <li key={index}>
                                            <a to={{
                                                pathname: sd.link,
                                                state: sd
                                            }} title={sd.htitle} target={sd.link && sd.link.includes('http') ? '_blank' : ''}>
                                                {sd.title}{sd.count ? `(${sd.count})`: ``}
                                            </a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            );
        }
    }
}