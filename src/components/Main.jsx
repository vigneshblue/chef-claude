import React from 'react'
import IngredientList from './IngredientList'
import ClaudeRecipe from './ClaudeRecipe'
export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipeShown, setRecipeShown] = React.useState(false)

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  function toggleRecipeShown() {
    setRecipeShown(prev => !prev)
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
      { ingredients.length > 0 && <IngredientList ingredients={ingredients} toggleRecipeShown={toggleRecipeShown} /> }
      { recipeShown && <ClaudeRecipe /> }
    </main>
  )
}