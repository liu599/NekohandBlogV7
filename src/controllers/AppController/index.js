import React, {Component} from 'react';
import Head from '@symph/joy/head';
import {requireModel} from "@symph/joy/controller";
import NekoModel from "../../models/model";
import controller from "@symph/joy/controller";


@requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})

class AppController extends Component {

    constructor () {
        super(...arguments);
        this.state = {
            isLoading: false
        }
    }

    async componentPrepare() {
        let {dispatch} = this.props;
        // call model's effect method
        await dispatch({
            type: 'nekoblog/fetchServerInfo',
        });
        await dispatch({
            type: 'nekoblog/fetchPostList',
            data: {
                pageNumber: 1,
                pageSize: 20,
            }
        });
        await dispatch({
            type: 'nekoblog/fetchCategories'
        });
        await dispatch({
            type: 'nekoblog/fetchFriendsInfo'
        });
        await dispatch({
            type: 'nekoblog/fetchFaviorites'
        });
        await dispatch({
            type: 'nekoblog/fetchChronology'
        })
    }

    componentDidMount() {
        console.log(this.props);
    }


    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Nekohand Blog</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                </Head>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default AppController;