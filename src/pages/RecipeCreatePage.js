import { useNavigate } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { useState, useReducer, useEffect } from 'react';
import { api } from '../api';
import { RecipeForm } from '../components/form/RecipeForm';
import { AiOutlineSave } from 'react-icons/ai';

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'preparationTime':
      return { ...state, preparationTime: action.payload };
    case 'servingCount':
      return { ...state, servingCount: action.payload };
    case 'sideDish':
      return { ...state, sideDish: action.payload };
    case 'ingredients':
      return { ...state, ingredients: action.payload };
    case 'directions':
      return { ...state, directions: action.payload };
    default:
      return state;
  }
};

export function RecipeCreatePage() {
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    title: '',
    preparationTime: '',
    servingCount: '',
    sideDish: '',
    ingredients: [],
    directions: '',
  });

  const handleSave = () => {
    api
      .post('/recipes', state)
      .then((res) => navigate(`/recipe/${res.data.slug}`))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    api
      .get('/recipes/ingredients')
      .then((res) => {
        setIngredientOptions(res.data);
      })
      .catch();
  }, []);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2 style={{ flex: '1' }}>
          {state.title ? state.title : 'Nový recept'}
        </h2>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: '#00b300',
              height: '40px',
              border: '1px solid black',
              borderRadius: '15px',
              padding: '5px',
              margin: '5px',
              opacity: state.title ? '100%' : '50%',
              cursor: state.title ? 'pointer' : '',
            }}
            onClick={() => {
              if (state.title) handleSave();
            }}
          >
            <AiOutlineSave /> Uložiť
          </div>
          <div
            style={{
              backgroundColor: '#f0f0f5',
              height: '40px',
              border: '1px solid lightgray',
              borderRadius: '15px',
              padding: '5px',
              margin: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Zrušiť
          </div>
        </div>
      </div>
      {error && <Alert color="danger">Názov už existuje</Alert>}
      <RecipeForm
        dispatch={dispatch}
        data={state}
        ingredientOptions={ingredientOptions}
      />
    </>
  );
}
