// import { data } from "autoprefixer"
import axios from "axios"

function pieChart(id) {
    return new Promise((resolve, reject) => {

        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=356a897f1b5040989b48e27575b27a3f&includeNutrition=true`)
            .then(res => {
                console.log(res.data.nutrition.caloricBreakdown)
                let data = [
                    {
                        "id": "carbs",
                        "label": "carbs",
                        "value": res.data.nutrition.caloricBreakdown.percentCarbs,
                        "color": "hsl(137, 70%, 50%)"
                    },
                    {
                        "id": "fat",
                        "label": "fat",
                        "value": res.data.nutrition.caloricBreakdown.percentFat,
                        "color": "hsl(108, 70%, 50%)"
                    },
                    {
                        "id": "protein",
                        "label": "protein",
                        "value": res.data.nutrition.caloricBreakdown.percentProtein,
                        "color": "hsl(315, 70%, 50%)"
                    }]
                console.log(data)
                resolve(data)
            })
    })
}

export default pieChart