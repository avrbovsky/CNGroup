import { Row, Col } from 'reactstrap';

import { RecipeCard } from './RecipeCard';
import { Link } from 'react-router-dom';

export function RecipesList({ recipes }) {
  return (
    <Row className="gy-4">
      {recipes.map((recipe) => (
        <Col key={recipe._id} lg={3} md={4} sm={6} xs={12}>
          <Link
            to={`/recipe/${recipe.slug}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            <RecipeCard
              title={recipe.title}
              preparationTime={recipe.preparationTime}
              sideDish={recipe.sideDish}
            />
          </Link>
        </Col>
      ))}
    </Row>
  );
}
