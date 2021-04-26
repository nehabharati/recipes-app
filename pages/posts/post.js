import Link from 'next/link'
import Layout from '../../components/layout'

// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=356a897f1b5040989b48e27575b27a3f')
    const recipes = await res.json()

    // By returning { props: { recipes } }, the Blog component
    // will receive `recipes` as a prop at build time
    return {
        props: {
            recipes,
        },
    }
}

export default function Post({ recipes }) {
    return (
        <Layout>
            <div className="px-6 py-32 pb-16">
                <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                    {recipes.results.map(i => (
                        <div key={i.id} className="bg-white md:pb-4 pb-16 p-4 mx-5 my-10 relative rounded-3xl shadow-md text-yellow-900" style={{ backgroundColor: "#ffd589" }}>
                            {/* md:w-24 md:h-24 w-32 h-32 -top-1/2 relative md:-top-1/2 transform translate-y-1/2 translate-x-1/2 rounded-full object-cover shadow-2xl */}
                            <div className="w-full m-auto -top-1/3 relative flex justify-center" >
                                <div className="md:w-24 md:h-24 w-32 h-32 ">
                                    <img src={i.image} className="w-full h-full rounded-full object-cover shadow-2xl" />
                                </div>
                            </div>
                            <div className="flex flex-col h-1/2 items-start justify-between my-0">
                                <p className="text-sm mt-2 text-center w-full font-bold px-4">{i.title}</p>
                                <div className="text-xxs font-bold py-2 float-right text-center w-full uppercase">
                                    <Link href="/recipes/[id]" as={`/recipes/${i.id}`} >
                                        <span className="cursor-pointer">Know more &rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}