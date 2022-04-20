import { Fragment } from 'react';
import { List } from 'reactstrap';

export function Directions({ directions }) {
  const formatText = (text) => {
    if (text.match('#')) {
      return <h3>{text.replace(text.match('#') + ' ', '')}</h3>;
    } else {
      return text.replace(text.match('[0-9]+.'), '');
    }
  };

  return (
    <>
      <List type="unstyled">
        {directions?.split('\n').map((item, index) => {
          if (item) return <li key={index}>{formatText(item)}</li>;
          return <Fragment key={index}></Fragment>;
        })}
      </List>
    </>
  );
}
