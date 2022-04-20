import { Input, Label } from 'reactstrap';
import { useState } from 'react';
import { IngredientList } from './IngredientList';

export function Ingredients({ recipe }) {
  const [servingCount, setServingCount] = useState(recipe.servingCount);

  const handleServingCountChange = (value) => {
    if (value >= 1) {
      setServingCount(value);
    }
  };

  return (
    <>
      {recipe.servingCount && recipe.ingredients.length > 0 ? (
        <>
          <Label for="servingCount">Počet porcií</Label>
          <Input
            type="number"
            name="servingCount"
            value={servingCount}
            onChange={(event) => handleServingCountChange(event.target.value)}
          />
        </>
      ) : (
        ''
      )}
      <IngredientList
        ingredients={recipe.ingredients}
        servingCount={recipe.servingCount}
        alteredServingCount={servingCount}
      />
    </>
  );
}
