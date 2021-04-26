import '../styles/global.css'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
    return (
        <div className="">
            <Head>
                <title>Nutrify</title>
            </Head>
            <Component {...pageProps} />
        </div>)
}
