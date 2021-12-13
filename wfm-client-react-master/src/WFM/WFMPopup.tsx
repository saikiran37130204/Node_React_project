import {Modal,Button} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

const WFMPopupModal = (props:any)=> {

    const [accepted,setaccepted]=useState("Accepted");

    async function UpdateEmployee() {
        try {
          const response = await axios.put("http://localhost:8000/manager/updateEmployee",{ employeeid : parseInt(Array[0]),status:accepted});
          if(response.status === 200){
            const res = await axios.put("http://localhost:8000/manager/updateSoftlock",{ employeeid: parseInt(Array[0]),status:accepted});
          }      
        } 
        catch (e) {
          console.log("Error");
        }
       }

    function handlechange(event:any){
        const textarea = event.target.value;
        setaccepted(textarea)
      }

    let Array = (props.id).split(",");
    return(      
        <div className="modal">
           <Modal show={props.show} onHide={props.toggle}>
             <Modal.Header closeButton>
                 <Modal.Title>Soft Lock Request Confirmation</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div>
                    <h6>Status Update For Request Lock</h6> 
                    <h5>Employee ID: {Array[0]}</h5> 
                    <h5>Requestee: {Array[1]} </h5>
                    <h5>Request Description: {Array[2]}</h5>
                    <h5>Status:</h5>
                   <select name="res" id="res" onChange={handlechange}>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                   </select>
                 </div>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={props.toggle}> Cancel </Button>
               <Button variant="primary" onClick={()=>{UpdateEmployee();props.toggle();}}>Send Request</Button>
             </Modal.Footer>
            </Modal>
        </div>     
    )
}
export default WFMPopupModal;