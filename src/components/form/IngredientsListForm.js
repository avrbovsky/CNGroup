import { useState } from 'react';
import { List } from 'reactstrap';
import { IngredientCard } from './IngredientCard';

export function IngredientsListForm({ dispatch, ingredients }) {
  const [updated, setUpdated] = useState(false);

  const handleDelete = (index) => {
    var array = ingredients;
    array.splice(index, 1);
    dispatch('ingredients', array);
    setUpdated(!updated);
  };

  return (
    <List type="unstyled">
      {ingredients?.map((ingredient, index) => (
        <IngredientCard
          key={index}
          ingredient={ingredient}
          onDelete={handleDelete}
          index={index}
        />
      ))}
    </List>
  );
}
