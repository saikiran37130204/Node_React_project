import Login from "../Login";
import WFMManager from "./WFMtable";

const WFMHome=()=>{
    const username = localStorage.getItem("username");
    return (
        <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <a className="navbar-brand" >WFM Manger Home</a>
            <form className="form-inline my-2 my-lg-0">
                <a className="navbar-brand"><i>{username}</i></a>
                <button className="btn btn-danger" onClick={()=>
                {
                  if(username)
                    return  [localStorage.clear(),Login]
                }}>Logout</button>  
            </form>
        </nav>
        <WFMManager/>
      </div>
    )
}

export default WFMHome