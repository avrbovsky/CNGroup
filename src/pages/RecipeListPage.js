import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';
import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import { ImSpoonKnife } from 'react-icons/im';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const filterredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    setLoading(true);

    api
      .get('/recipes')
      .then((res) => {
        var array = res.data;
        array.sort((recipe1, recipe2) => {
          if (!recipe1.preparationTime) return -1;
          if (recipe1.preparationTime < recipe2.preparationTime) return -1;
          else if (recipe1.preparationTime > recipe2.preparationTime) return 1;
          else return 0;
        });
        setRecipes(array);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
        <h1 style={{ flex: '1' }}>Recepty</h1>
        <div
          style={{
            backgroundColor: '#f0f0f5',
            height: '40px',
            border: '1px solid lightgray',
            borderRadius: '15px',
            padding: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/new')}
        >
          <ImSpoonKnife /> Nový recept
        </div>
      </div>
      <SearchInput
        className="mb-4"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {isLoading && <Spinner className="mb-4" />}
      {error && (
        <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>
      )}
      <RecipesList recipes={filterredRecipes} />
    </Container>
  );
}
