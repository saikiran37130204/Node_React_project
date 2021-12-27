import {Modal,Button} from 'react-bootstrap';
import axios from "axios";
import { useState } from 'react';

 const PopupModal=(props:any)=>{
   const[text,Settext]=useState("");
   function handlechange(event:any){

    const textarea = event.target.value;
   

    Settext(textarea)
   }
  async function UpdateEmployee() {
    try
     {
        const response = await axios.put("http://localhost:8000/manager/updateemployees",{ employeeid : parseInt(props.id)});
        if(response.status === 200){

          const res = await axios.post("http://localhost:8000/manager/insertsoftlock",
  
          { employeeid: parseInt(props.id),manager: localStorage.getItem("username"),responsemessage: text});
        }
    } 
    catch (e) 
    {
      console.log("Error")
    }
  }
    return(      
        <div className="modal">
           <Modal show={props.show} onHide={props.toggle}>
             <Modal.Header closeButton>
                 <Modal.Title style={{color:'blue'}}>Soft Lock Request Confirmation</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div>
                   <h6 style={{color:'blue'}}>Please confirm the lock request for {props.id}</h6>
                   <h6>Request Message</h6>
                   <textarea value={text} onChange={handlechange}   rows={5} cols={50}  />
                 </div>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={props.toggle}> Cancel </Button>
               <Button variant="primary" onClick={()=>{UpdateEmployee();props.toggle();}}>Send Request </Button>
             </Modal.Footer>
            </Modal>
        </div>     
    )
}


export default PopupModal;