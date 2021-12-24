import axios from "axios";
import { useEffect, useState } from "react";
import { WFMmanagers } from "./type";
import WFMPopupModal from "./WFMPopup";


const WFMManager = () => {
  const username = localStorage.getItem("username");

  async function GetWFMManagerTable() {
    try {
      const response = await axios.post("http://localhost:8000/manager/wfmtable",{ username: username });
      setWFMManagerData(response.data);
    } catch (e) {
      console.log("Error");
    }
  }
  
  useEffect(() => {
    GetWFMManagerTable();
  });

  function handleClick(event:any) {
    Setshow(!show)
    if(show !== true){
        const id = event.target.id;
        setId(id);
    }
}

  const [WFMManagerData, setWFMManagerData] = useState([]);
  const [show,Setshow] = useState(false);
  const [id,setId] = useState(0)

  return (
    <table className="table">
      <thead>
        <tr>
          <th>EmployeeID</th>
          <th>Requestee</th>
          <th>Req Date</th>
          <th>Req Message</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {WFMManagerData.map((x: WFMmanagers) => {
          let id = (x.EmployeeID)+','+(x.Name)+','+(x.ReqMessage)
          return (
              <tr>
                <td>{x.EmployeeID}</td>
                <td>{x.Name}</td>
                <td>{x.ReqDate}</td>
                <td>{x.ReqMessage}</td>
                <td>
                  <button id={id} className="btn btn-primary" onClick={handleClick}>{x.Status}</button>
                </td>
                <WFMPopupModal show={show} toggle={handleClick} id={id}/>
              </tr>              
          );
        })}
      </tbody>
    </table>
  );
};

export default WFMManager;