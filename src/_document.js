// /src/_document.js
import Document, { Head, Main, JoyScript } from '@symph/joy/document'

export default class MyDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                {/* add custom style */}
                <link rel='stylesheet' href='/static/font/css/fontello.css' />
            </Head>
            <body>
                <Main />
                <JoyScript />
            </body>
            </html>
        )
    }
}