import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';
import { api } from '../api';
import { Alert, Spinner } from 'reactstrap';
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

export function RecipeEditPage() {
  const { slug } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState();
  const [error, setError] = useState();
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [state, dispatch] = useReducer(reducer, {});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => {
        setRecipe(res.data);
        dispatch({ type: 'title', payload: res.data.title });
        dispatch({
          type: 'preparationTime',
          payload: res.data.preparationTime ? res.data.preparationTime : '',
        });
        dispatch({
          type: 'servingCount',
          payload: res.data.servingCount ? res.data.servingCount : '',
        });
        dispatch({
          type: 'sideDish',
          payload: res.data.sideDish ? res.data.sideDish : '',
        });
        dispatch({
          type: 'ingredients',
          payload: res.data.ingredients ? res.data.ingredients : [],
        });
        dispatch({
          type: 'directions',
          payload: res.data.directions ? res.data.directions : '',
        });
      })
      .catch((error) => setError(error));

    api
      .get('/recipes/ingredients')
      .then((res) => setIngredientOptions(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSave = () => {
    api
      .post(`/recipes/${recipe._id}`, state)
      .then((res) => navigate(`/recipe/${res.data.slug}`))
      .catch((error) => setError(error));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h1 style={{ flex: '1' }}>
          {state.title ? state.title : 'Nový recept'}
        </h1>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: '#00b300',
              height: '40px',
              border: '1px solid lightgray',
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
            onClick={() => navigate(`/recipe/${recipe.slug}`)}
          >
            Zrušiť
          </div>
        </div>
      </div>
      {error && <Alert color="danger">Názov už existuje</Alert>}
      <RecipeForm
        data={state}
        dispatch={dispatch}
        ingredientOptions={ingredientOptions}
      />
    </>
  );
}
