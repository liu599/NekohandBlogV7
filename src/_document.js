// /src/_document.js
import React from 'react'
import Document, { Head, Main, JoyScript } from '@symph/joy/document'

export default class MyDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                {/* add custom style */}
                <link rel='stylesheet' href='/static/font/css/fontello.css' />
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
            </Head>
            <body>
                <Main />
                <JoyScript />
            </body>
            </html>
        )
    }
}