import React, {Component} from 'react';
import {requireModel} from "@symph/joy/controller";
import NekoModel from "../../models/model";
import controller from "@symph/joy/controller";
import {autowire} from '@symph/joy/autowire';


// @requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})

class AppController extends Component {

    // constructor () {
    //     super(...arguments);
    //     this.state = {
    //         isLoading: false
    //     }
    // }
    @autowire()
    nekoModel: NekoModel

    async componentDidUpdate(prevProps) {
        let {dispatch} = this.props;
        if (this.props.location !== prevProps.location) {
            // console.log("ROUTE CHANGED", this.props.location);
            if (this.props.location.pathname.includes('category')) {
                await dispatch({
                    type: 'nekoblog/fetchPostListByCategory',
                    data: {
                        pageNumber: '1',
                        pageSize: '20',
                        cid: this.props.location.state.id,
                    },
                });
            }
            if (this.props.location.pathname.includes('timeline')) {
                await dispatch({
                    type: 'nekoblog/fetchPostListByTime',
                    data: {
                        pageNumber: '1',
                        pageSize: '20',
                        t: Math.floor(parseInt(this.props.location.query.t, 10)/1000),
                    },
                });
            }
            if (this.props.location.pathname.includes('post')) {
                await dispatch({
                    type: 'nekoblog/fetchPost',
                    id: this.props.location.pathname.split('/')[2]
                });
            }
            if (this.props.location.pathname === '/') {
                await dispatch({
                    type: 'nekoblog/fetchPostList',
                    data: {
                        pageNumber: 1,
                        pageSize: 20,
                    }
                });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.props.children }
            </React.Fragment>
        );
    }
}

export default AppController;