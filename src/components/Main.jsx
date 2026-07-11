import React from 'react'

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const ingredientsElements = ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }
  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input 
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
        <ul>
          {ingredientsElements}
        </ul>
    </main>
  )
}