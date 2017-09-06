import React from 'react';
import TableItem from './TableItem.jsx';

const Table = (props) => (
  <table>
    <tbody>
      <tr> 
        <th>No.</th>
        <th>Victim ID</th>
        <th>Victim Country</th>
        <th>Actor Country</th>
        <th>Actor Motive</th>
        <th>Actor Variety</th>
        <th>MM/DD/YYY</th>
      </tr>
      { props.items.map((item, idx) => <TableItem item={item} key={idx} idx={idx + 1}/>) }
    </tbody>
  </table>
);

export default Table;