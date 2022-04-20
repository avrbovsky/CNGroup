import { MdDelete } from 'react-icons/md';

export function IngredientCard({ index, onDelete, ingredient }) {
  return (
    <li
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: ingredient.isGroup ? 'lightgray' : '',
      }}
    >
      <MdDelete
        onClick={() => {
          onDelete(index);
        }}
        color="red"
        size={20}
        style={{ margin: '5px', cursor: 'pointer' }}
      />
      {ingredient.isGroup ? (
        <div
          style={{
            flex: '1',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {ingredient.name}
        </div>
      ) : (
        <>
          <div style={{ flex: '1' }}>{ingredient.amount}</div>
          <div style={{ flex: '2' }}>{ingredient.amountUnit}</div>
          <div style={{ flex: '5' }}>{ingredient.name}</div>
        </>
      )}
    </li>
  );
}
