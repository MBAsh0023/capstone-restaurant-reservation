import React, { useState } from "react";
import { unassignTable } from "../utils/api";
import { useHistory } from "react-router";
//import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";

function TableList({ table, loadDashboard, error, date }) {
  //const [error, setError] = useState(null);
  const status = table.reservation_id? "occupied" : "free"
  
  const history = useHistory();


  function finishButton(){
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
      const abortController = new AbortController();

      unassignTable(table.table_id, abortController.signal).then(loadDashboard)
    }

  }


// async function handleClick(){
//    if(window.confirm(
//           "Is this table ready to seat new guests? This cannot be undone."
//       ) ){
//         finishHandler();
//       }
// }

// async function finishHandler(){
//   const { signal } = new AbortController();
//   await  unassignTable(table.table_id, signal)
//     //.then(loadDashboard);
//     history.push("/dashboard")
//       //return () => abort();
// }



   
  

  

  return (
    <div>
        {/* <ErrorAlert error={error}/> */}
      <h5>Name:{table.table_name}</h5>
      <h6>Capacity:{table.capacity}</h6>
      <p>Table ID:{table.table_id}</p>
      <p data-table-id-status={table.table_id}>Status:{table.status}</p>
      {table.status === "occupied" && (
        <button
         data-table-id-finish={table.table_id}
         onClick={finishButton} 
         type='button'>
          Finish
        </button>
      )}
    </div>
  );
}

export default TableList;
