import { useState } from 'react';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { IngredientsListForm } from './IngredientsListForm';
import { Autocomplete, TextField } from '@mui/material';

export function IngredientsForm({ dispatch, ingredients, ingredientOptions }) {
  const [amount, setAmount] = useState('');
  const [amountUnit, setAmountUnit] = useState('');
  const [name, setName] = useState('');
  const [groupName, setGroupName] = useState('');

  const handleAddIngredient = () => {
    dispatch({
      type: 'ingredients',
      payload: [...ingredients, { name, amount, amountUnit }],
    });
    setAmount('');
    setAmountUnit('');
    setName('');
  };

  const handleAddGroup = () => {
    dispatch({
      type: 'ingredients',
      payload: [...ingredients, { name: groupName, isGroup: true }],
    });
    setGroupName('');
  };

  return (
    <>
      <h3>Ingrediencie</h3>
      <IngredientsListForm dispatch={dispatch} ingredients={ingredients} />
      <p>Pridať ingredienciu</p>
      <Row>
        <Col>
          <FormGroup>
            <Input
              type="number"
              placeholder="Množstvo"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            ></Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              type="text"
              placeholder="Jednotka"
              value={amountUnit}
              onChange={(event) => setAmountUnit(event.target.value)}
            ></Input>
          </FormGroup>
        </Col>
      </Row>
      <div style={{ display: 'flex' }}>
        <FormGroup style={{ flex: '1' }}>
          <Autocomplete
            freeSolo
            options={ingredientOptions}
            renderInput={(name) => (
              <TextField
                {...name}
                label="Názov ingrediencie"
                onChange={(event) => setName(event.target.value)}
                onSelect={(event) => setName(event.target.value)}
                onClick={(event) => setName(event.target.value)}
              />
            )}
          />
        </FormGroup>
        <Button
          color="success"
          onClick={handleAddIngredient}
          disabled={!name}
          style={{ height: '55px' }}
        >
          Pridať
        </Button>
      </div>
      <p>Pridať skupinu</p>
      <div style={{ display: 'flex' }}>
        <FormGroup style={{ flex: '1' }}>
          <Input
            type="text"
            placeholder="Názov skupiny"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          ></Input>
        </FormGroup>
        <Button
          color="success"
          onClick={handleAddGroup}
          disabled={!groupName}
          style={{ height: '40px' }}
        >
          Pridať
        </Button>
      </div>
    </>
  );
}
