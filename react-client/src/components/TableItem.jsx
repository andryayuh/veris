import React from 'react';

const TableItem = (props) => {
  var yearA = props.item.timeline.incident.year;
  var monthA = props.item.timeline.incident.month ? props.item.timeline.incident.month.toString() + '/' : '';
  var dayA = props.item.timeline.incident.day ? props.item.timeline.incident.day.toString() + '/' : ''; 
  var date = monthA + dayA + `${yearA}`;  

  return (

    <tr>
      <td>{ props.item.victim.victim_id }</td>
      <td>{ props.item.victim.country[0]}</td>
      <td>{ props.item.actor.external.country[0] }</td>
      <td>{ props.item.actor.external.motive[0] }</td>
      <td>{ props.item.actor.external.variety[0] }</td>
      <td>{ date }</td>
    </tr>
  );
};

export default TableItem;