import React from 'react';
import { Head } from '@symph/joy/document'

export default class _Error extends React.Component {
    render () {
        const { statusCode, message } = this.props;
        const title = statusCode === 404
            ? 'This page could not be found'
            : 'An unexpected error has occurred';

        return
        (
            <div>
                <Head>
                    <title>{statusCode}: {title}</title>
                </Head>

                <h1>{statusCode}</h1>
                <div>{message}</div>
            </div>
        );
    }
}