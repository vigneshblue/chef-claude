import { ThreeDots } from "react-loader-spinner";

export default function IngredientList(props) {
  const ingredientsElements = props.ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))
  return (
    <main>
      <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">{ingredientsElements}</ul>
        {props.ingredients.length > 3 && <div className="get-recipe-container">
            <div ref={props.ref}>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={(props.getRecipe)}>{props.loading ? (
              <ThreeDots
                height={20}
                width={40}
                color="#ffffff"
              />
              ) : "Get Recipe"
             }</button>
        </div>}
      </section>
    </main>
  )
}