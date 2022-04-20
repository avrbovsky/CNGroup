import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { FiClock } from 'react-icons/fi';
import { FaUtensilSpoon } from 'react-icons/fa';

import placeholder from '../images/food-placeholder.png';

export function RecipeCard({ title, preparationTime, sideDish }) {
  return (
    <Card className="h-100">
      <CardImg src={placeholder} alt="Preview" top />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>
          {preparationTime ? <FiClock style={{ marginBottom: '0.2em' }} /> : ''}
          {Math.floor(preparationTime / 60) > 0
            ? ' ' + Math.floor(preparationTime / 60) + ' hod '
            : ''}
          {preparationTime % 60 > 0
            ? ' ' + (preparationTime % 60) + ' min '
            : ''}
          {sideDish ? <FaUtensilSpoon style={{ marginBottom: '0.2em' }} /> : ''}
          {sideDish ? ' ' + sideDish : ''}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}
