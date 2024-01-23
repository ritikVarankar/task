import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTaskForm } from "../redux/taskFormReducer";
import EditModalComponent from "../EditModalComponent/EditModalComponent";


function TableComponent() {
  const dispatch=useDispatch();
  const [sendData,setSendData]= useState<any>('');
  const taskData = useSelector((state:any)=> state.taskform.taskform);
  return (
    <div className="container">
      <div className="card form-card">        
          <h2 className="form-title">Form List</h2>
          <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Email</th>
                <th scope="col">Weekday</th>
                <th scope="col">Gender</th>
                <th scope="col">DOB</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {
              taskData.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={8} className="text-center">No data found</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {
                    taskData.map((dt:any,index:number)=>(
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{dt.name}</td>
                        <td>{dt.contactNo}</td>
                        <td>{dt.email}</td>
                        <td>{dt.weekday.filter((obj:any)=> obj.checkded === true).map((vl:any)=>(vl.value )).join(',')}</td>
                        <td>{dt.gender}</td>
                        <td>{dt.calendar}</td>
                        <td>
                          <div className="iconContainer">
                            <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editFormModal" onClick={()=>setSendData(dt)}></i>
                            <i className="fa-solid fa-trash-can" onClick={()=>{dispatch(removeTaskForm(dt.taskId))}}></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              )
            }
            
          </table>
          </div>
      </div>
      
      <EditModalComponent sendData={sendData} setSendData={setSendData} />
    </div>
  );
}

export default TableComponent;
