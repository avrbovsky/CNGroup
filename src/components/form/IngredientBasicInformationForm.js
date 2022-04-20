import { FormGroup, Input, Label } from 'reactstrap';

export function IngredientBasicInformationForm({ dispatch, data }) {
  const handlePreparationTimeChange = (preparationTime) => {
    if (preparationTime > 0) {
      dispatch({
        type: 'preparationTime',
        payload: Math.floor(preparationTime),
      });
    } else if (!preparationTime) {
      dispatch({
        type: 'preparationTime',
        payload: preparationTime,
      });
    }
  };

  const handleServingCountChange = (servingCount) => {
    if (servingCount > 0) {
      dispatch({
        type: 'servingCount',
        payload: Math.floor(servingCount),
      });
    } else if (!servingCount) {
      dispatch({
        type: 'servingCount',
        payload: servingCount,
      });
    }
  };
  return (
    <>
      <h3>Základné údaje</h3>
      <FormGroup>
        <Label for="preparationTime">Doba prípravy</Label>
        <Input
          id="preparationTime"
          name="preparationTime"
          type="number"
          value={data.preparationTime}
          onChange={(event) => {
            handlePreparationTimeChange(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="portions">Počet porcií</Label>
        <Input
          id="portions"
          name="portions"
          type="number"
          value={data.servingCount}
          onChange={(event) => {
            handleServingCountChange(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="sideDish">Príloha</Label>
        <Input
          name="sideDish"
          type="text"
          value={data.sideDish}
          onChange={(event) => {
            dispatch({ type: 'sideDish', payload: event.target.value });
          }}
        />
      </FormGroup>
    </>
  );
}
