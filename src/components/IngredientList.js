import { Table } from 'reactstrap';

export function IngredientList({
  ingredients,
  servingCount,
  alteredServingCount,
}) {
  return (
    <Table>
      <tbody>
        {ingredients?.map((ingredient) => (
          <tr
            key={ingredient._id}
            style={{
              backgroundColor: ingredient.isGroup ? 'lightgray' : '',
              fontWeight: ingredient.isGroup ? 'bold' : '',
            }}
          >
            <td>
              {ingredient.amount && servingCount
                ? Math.round(
                    ((ingredient.amount / servingCount) * alteredServingCount +
                      Number.EPSILON) *
                      100,
                  ) / 100
                : ingredient.amount}
            </td>
            <td>{ingredient.amountUnit}</td>
            <td>{ingredient.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
