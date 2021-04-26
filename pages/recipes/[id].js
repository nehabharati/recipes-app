import parse from 'html-react-parser'
import Image from 'next/image'
import 'chart.js'
import Layout from '../../components/layout'
import Link from 'next/link'

export async function getServerSideProps({ query }) {
    const [recipe, similar] = await Promise.all([
        fetch(`https://api.spoonacular.com/recipes/${query.id}/information?apiKey=356a897f1b5040989b48e27575b27a3f&includeNutrition=true`).then(r => r.json()),
        fetch(`https://api.spoonacular.com/recipes/${query.id}/similar?apiKey=356a897f1b5040989b48e27575b27a3f`).then(r => r.json())
    ]);
    return { props: { recipe, similar } };
}


export default function Recipe({ recipe, similar }) {
    return (
        <Layout>
            <div className="md:h-screen grid md:grid-rows-1 md:grid-cols-3 grid-rows-3 grid-cols-1 content-center">
                <div className="p-8 relative align-middle  flex justify-center flex-col max-h-screen overflow-scroll" style={{ backgroundColor: "#ffd589" }}>
                    <Link href="/posts/post">
                        <h2 className="text-yellow-900 py-4  cursor-pointer"> &larr; Back</h2>
                    </Link>
                    <div className="max-h-96 overflow-scroll">
                        <h2 className="mx-8 align-middle text-2xl font-bold text-yellow-900">{recipe.title}</h2>
                        <p className="mx-8 align-middle text-sm text-yellow-900">{recipe.nutrition.weightPerServing.amount}{recipe.nutrition.weightPerServing.unit}</p>
                        <div className="m-8">
                            <h3 className="text-yellow-900 font-bold">
                                Ingredients
                            </h3>
                            <div className="flex flex-wrap">
                                {recipe.nutrition.ingredients.map((i, index) => (
                                    <div>
                                        <p className="text-sm text-yellow-900 flex capitalize">{(index ? ', ' : '') + i.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mx-8 my-4">
                            <h3 className="text-yellow-900 font-bold">
                                Nutritional value
                            </h3>
                            <div className="flex">
                                <p className="text-xs text-yellow-900">
                                    Carbohydrates - {recipe.nutrition.caloricBreakdown.percentCarbs}, Fat - {recipe.nutrition.caloricBreakdown.percentFat}, Protein - {recipe.nutrition.caloricBreakdown.percentProtein}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 px-8 py-0">
                            <div className="text-xs rounded-md my-2 justify-around p-2 flex items-center bg-white">
                                <div className="flex items-center">
                                    <Image src="/images/clock.svg" height={20} width={20} />
                                    <span className="text-yellow-900 ml-2 font-bold">Prep</span>
                                </div>
                                <div className="text-yellow-900 mx-0 text-center">{recipe.readyInMinutes} M</div>
                            </div>
                            <div className="text-xs rounded-md my-2 justify-around p-2 flex bg-white items-center">
                                <div className="flex items-center">
                                    <Image src="/images/bowl.svg" height={20} width={20} />
                                    <span className="text-yellow-900 ml-2 font-bold">Serving</span>
                                </div>
                                <div className="text-yellow-900 mx-0 text-center">{recipe.servings}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 h-screen flex justify-center flex-col" style={{ backgroundColor: "#ffc862" }}>
                    <img src={recipe.image} className="rounded-full md:w-80 md:h-80 w-96 h-96 object-cover m-auto md:-left-10 relative" />
                </div>
                <div className="bg-gray-900 py-20 pr-4 h-screen flex justify-center flex-col overflow-scroll max-h-screen" style={{ backgroundColor: "#ffba3b" }}>
                    <div className="max-h-screen overflow-scroll my-4">
                        <h2 className="text-yellow-900 mx-8 border-b border-gray-600 text-xl pb-2">Similar recipes</h2>
                        {similar.map(j => (
                            <div className="mx-8 my-4 border-b border-gray-600 p-4">
                                <p className="text-yellow-900 capitalize">{j.title}</p>
                                <div className="grid grid-cols-2 gap-2 py-0">
                                    <div className="text-xs rounded-md my-2 justify-around p-2 flex items-center bg-white">
                                        <div className="flex items-center">
                                            <Image src="/images/clock.svg" height={20} width={20} />
                                            <span className="text-yellow-900 ml-2 font-bold capi">Prep</span>
                                        </div>
                                        <div className="text-yellow-900 mx-0 text-center">{j.readyInMinutes} M</div>
                                    </div>
                                    <div className="text-xs rounded-md my-2 justify-around p-2 flex bg-white items-center">
                                        <div className="flex items-center">
                                            <Image src="/images/bowl.svg" height={20} width={20} />
                                            <span className="text-yellow-900 ml-2 font-bold">Serving</span>
                                        </div>
                                        <div className="text-yellow-900 mx-0 text-center">{j.servings}</div>
                                    </div>
                                </div>
                                <Link href={j.sourceUrl}>
                                    <a target="_blank">
                                        <span className="text-yellow-900 text-xs cursor-pointer">Know more &rarr;</span>
                                    </a>
                                </Link>
                            </div>
                        ))}
                        {/* <div className="flex flex-wrap mx-8">
                    {recipe.diets.map(diet => (
                        <div key={diet} className="text-gray-900 capitalize m-2">
                            <div className="shadow-lg w-auto py-2 rounded-full bg-white">
                                <p className="mx-2 text-xs flex items-center">
                                    <span className="text-yellow-900 font-bold">{diet}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div> */}
                    </div>
                </div>

                {/* <div style={{ width: "400px" }} className="flex bar-chart m-16">
                <Doughnut data={data} options={calorieOptions} />
                <Doughnut data={nutrients} options={nutrientOptions} />
            </div>

            <div className="m-8 my-16">
                <h2 className="font-bold">Recipe</h2>
                <p className="text-gray-400 text-xs">{recipe.instructions ? parse(recipe.instructions) : ""}</p>
            </div> */}
            </div>
        </Layout>
    )
}
