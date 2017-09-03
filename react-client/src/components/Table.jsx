import React from 'react';
import ListItem from './TableItem.jsx';

const Table = (props) => (
  <div>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem item={item} key={item}/>)}
  </div>
);

export default Table;