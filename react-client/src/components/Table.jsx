import React from 'react';
import ListItem from './TableItem.jsx';

const Table = (props) => (
  <table>
    <tbody>
      <tr> 
        <th>Victim ID</th>
        <th>Victim Country</th>
        <th>Actor Country</th>
        <th>Actor Motive</th>
        <th>Actor Variety</th>
        <th>MM/DD/YYY</th>
      </tr>
      { props.items.map((item, idx) => <ListItem item={item} key={idx}/>)}
    </tbody>
  </table>
);

export default Table;