import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col } from 'reactstrap';
import { api } from '../api';
import { Ingredients } from '../components/Ingredients';
import { Directions } from '../components/Directions';
import { FiClock } from 'react-icons/fi';
import { FaEdit, FaUtensilSpoon } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleDeleteRecipe = () => {
    api
      .delete(`/recipes/${recipe._id}`)
      .then(() => navigate('/'))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => setRecipe(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [slug]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
        <h1 style={{ flex: '1' }}>{recipe.title}</h1>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: '#f0f0f5',
              height: '40px',
              border: '1px solid lightgray',
              borderRadius: '15px',
              padding: '5px',
              margin: '5px',
            }}
            onClick={() => navigate(`/edit/${recipe.slug}`)}
          >
            <FaEdit /> Upraviť
          </div>
          <div
            style={{
              backgroundColor: '#ff3333',
              height: '40px',
              border: '1px solid lightgray',
              borderRadius: '15px',
              padding: '5px',
              margin: '5px',
              cursor: 'pointer',
            }}
            onClick={handleDeleteRecipe}
          >
            <IoTrashOutline /> Odstrániť
          </div>
        </div>
      </div>
      <h5>
        {recipe.preparationTime ? (
          <FiClock style={{ marginBottom: '0.2em', marginRight: '0.5em' }} />
        ) : (
          ''
        )}
        {Math.floor(recipe.preparationTime / 60) > 0
          ? Math.floor(recipe.preparationTime / 60) + ' hod '
          : ''}
        {recipe.preparationTime % 60 > 0
          ? (recipe.preparationTime % 60) + ' min'
          : ''}
        {recipe.sideDish ? (
          <FaUtensilSpoon
            style={{ marginBottom: '0.2em', marginRight: '0.5em' }}
          />
        ) : (
          ''
        )}
        {recipe.sideDish ? recipe.sideDish : ''}
      </h5>
      <Row>
        <Col lg={4}>
          <Ingredients recipe={recipe} />
        </Col>
        <Col lg={8}>
          {recipe.directions ? <h5>Postup</h5> : ''}
          <Directions directions={recipe.directions} />
        </Col>
      </Row>
    </Container>
  );
}
