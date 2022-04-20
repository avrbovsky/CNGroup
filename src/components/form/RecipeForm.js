import { Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { IngredientsForm } from './IngredientsForm';
import { IngredientBasicInformationForm } from './IngredientBasicInformationForm';

export function RecipeForm({ dispatch, data, ingredientOptions }) {
  return (
    <>
      <Form>
        <Row>
          <FormGroup>
            <Input
              type="text"
              placeholder="Názov receptu"
              invalid={!data.title}
              onChange={(event) =>
                dispatch({ type: 'title', payload: event.target.value })
              }
              value={data.title}
            />
            {!data.title ? (
              <p style={{ marginLeft: '10px', color: 'red' }}>
                Názov je povinný
              </p>
            ) : (
              ''
            )}
          </FormGroup>
        </Row>
        <Row xs={1} sm={1} md={4}>
          <Col lg={2}>
            <IngredientBasicInformationForm dispatch={dispatch} data={data} />
          </Col>
          <Col lg={4} md={4}>
            <IngredientsForm
              dispatch={dispatch}
              ingredients={data.ingredients}
              ingredientOptions={ingredientOptions}
            />
          </Col>
          <Col lg={6} md={5}>
            <h3>Postup</h3>
            <Input
              type="textarea"
              rows="15"
              value={data.directions}
              onChange={(event) => {
                dispatch({ type: 'directions', payload: event.target.value });
              }}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
}
