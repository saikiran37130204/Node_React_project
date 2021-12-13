import {Modal,Button} from 'react-bootstrap';
import axios from "axios";

export default function PopupModal(props:any){
  async function UpdateEmployee() {
    try
     {
        const response = await axios.put("http://localhost:8000/manager/updateemployees",{ employeeid : parseInt(props.id)});
        console.log(response);
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
                 <Modal.Title>Soft Lock Request Confirmation</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div>
                   <h6>Please confirm the lock request for {props.id}</h6>
                   <h6>Request Message</h6>
                   <textarea    rows={5} cols={50}  />
                 </div>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={props.toggle}> Cancel </Button>
               <Button variant="primary" onClick={UpdateEmployee}>Send Request </Button>
             </Modal.Footer>
            </Modal>
        </div>     
    )
}
