import React from 'react'
import IngredientList from './IngredientList'
import ClaudeRecipe from './ClaudeRecipe'
// import { getRecipeFromMistral } from '../ai'

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipeMarkdown, setRecipeMarkdown] = React.useState("")
  const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if (recipeMarkdown !== "" && recipeSection !== null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  },[recipeMarkdown])

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  async function getRecipe() {
    // const recipeMarkdown = await getRecipeFromMistral(ingredients)
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientsString:  ingredients.join(", "),
      }),
    });
    const data = await response.json();
    console.log(data.recipe);

    setRecipeMarkdown(data.recipe)
    console.log('ai call completed')
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input 
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      { ingredients.length > 0 && <IngredientList ref={recipeSection} ingredients={ingredients} getRecipe={getRecipe} /> }
      { recipeMarkdown.length > 0 && <ClaudeRecipe recipeMarkdown={recipeMarkdown}/> }
    </main>
  )
}