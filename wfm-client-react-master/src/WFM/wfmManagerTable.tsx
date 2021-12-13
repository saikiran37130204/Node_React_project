import axios from "axios";

import { useEffect, useState } from "react";

import { wfmmanagers } from "./type";



const Manager = () => {

  const username = localStorage.getItem("username");

  async function GetManagerTable() {

    try {

      const response = await axios.post("http://localhost:8000/manager/wfmmanager",{ username: username });

      setManagerData(response.data);

      console.log(response.data);

    } catch (e) {

      console.log("Error");

    }

  }


 function buttonClick(){
     Setshow(!show)

  }

  useEffect(() => {
    GetManagerTable();

  });
  const [ManagerData, setManagerData] = useState([]);

  // const [show,Setshow] = useState(false)

  const [show,Setshow] = useState(true)



  return (

    <table className="table">

      <thead>

        <tr>

          <th>EmployeeID</th>

          <th>Requestee</th>

          <th>EmployeeManager</th>

          <th>Status</th>

        </tr>

      </thead>

      <tbody>

{ManagerData.map((x: wfmmanagers) => {

  return (
      <tr key={x.EmployeeID}>
          <td>{x.EmployeeID}</td>
          <td>{x.Requestee}</td>
           <td>{x.EmployeeManager}</td>
           <td>
              <button className="btn btn-primary" onClick={buttonClick}>View Details</button>
          </td>
      </tr>
  );

})}

</tbody>

</table>

);

};



export default Manager;