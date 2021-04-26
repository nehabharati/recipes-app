import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="flex md:flex-row flex-col h-screen">
        <div className="md:w-2/3 md:py-32 py-32 w-full px-10">
          <h2 className="text-4xl font-bold text-center md:text-left justify-between w-full">Find your favorite recipes here</h2>
          <h2 className="text-xl  md:my-4 text-center md:text-left  justify-between md:w-1/2 w-full">Choose from a whole list of declicious recipes and try them for yourself</h2>
          <Link href="/posts/post">
            <button className="bg-yellow-900 text-white p-2 md:mt-24 md:w-auto mt-8 w-full rounded-md">Check our recipes</button>
          </Link>
        </div>
        <div className="md:w-1/3 md:h-screen md:flex md:items-center h-auto p-0 m-0" style={{ backgroundColor: "#ffc862" }}>
          <img src="/images/burger.jpg" className="rounded-full md:w-96 md:h-96 md:relative md:top-auto m-auto md:-left-1/3 -top-1/3 relative p-8 w-96 h-96" />
        </div>
      </section>

    </Layout>
  )
}
