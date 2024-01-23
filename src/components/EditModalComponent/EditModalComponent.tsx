import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { editTaskForm } from "../redux/taskFormReducer";

interface WeekFormTask{
    value:string; 
    checkded:boolean;  
}
interface FormTask{
    taskId:string;
    name:string;
    email:string;
    contactNo:string;
    calendar:string;
    gender:string;
    weekday:WeekFormTask[];
}
interface EditModalComponentProps{
    sendData:any;
    setSendData:any;
}
function EditModalComponent({sendData,setSendData}:EditModalComponentProps) {
  const dispatch = useDispatch();
  const myContext = useContext(AuthContext);
  const [formTask, setFormTask] = useState<FormTask>({
      taskId:'',
      name:'',
      email:'',
      contactNo:'',
      calendar:'',
      gender:'',
      weekday:[
          { value:'Monday', checkded:false },
          { value:'Tuesday', checkded:false },
          { value:'Wednesday', checkded:false },
          { value:'Thursday', checkded:false },
          { value:'Friday', checkded:false },
      ]
  });
  const handleFormTaskOnchange = (text: string, input: string) => {
      setFormTask((prevState: any) => ({ ...prevState, [input]: text }));
  };
  const handleFormTaskWeekDayOnchange = (text: string, checkded:boolean, input: string) => {
      setFormTask((prevState: any) => ({ ...prevState, [input]: prevState.weekday.map((dt:any)=>{ if(dt.value === text){ return { ...dt, checkded:checkded } }else{ return dt;}   }) }));
  };

  const handleClear=()=>{
      handleFormTaskOnchange('', "taskId");
      handleFormTaskOnchange('', "name");
      handleFormTaskOnchange('', "email");
      handleFormTaskOnchange('', "contactNo");
      handleFormTaskOnchange('', "calendar"); 
      handleFormTaskOnchange('', "gender"); 
      handleFormTaskWeekDayOnchange("Monday", false, "weekday");
      handleFormTaskWeekDayOnchange("Tuesday", false, "weekday");
      handleFormTaskWeekDayOnchange("Wednesday", false, "weekday");
      handleFormTaskWeekDayOnchange("Thursday", false, "weekday");
      handleFormTaskWeekDayOnchange("Friday", false, "weekday");
      setSendData('');
  }

  const handleSubmit=(e:any)=>{
      e.preventDefault();
      if(formTask.weekday.filter((dt:any)=> dt.checkded === true).length === 0){
          myContext.showToast("Atleast one day should be selected","failure");
      }else if(formTask.contactNo.length > 10 || formTask.contactNo.length < 10){
          myContext.showToast("contact no must be 10 digits","failure");
      }else{
        dispatch(editTaskForm(formTask));
        handleClear();
        let showModalOpen: any = document.querySelector('#btn-close');
        if (showModalOpen) {
            showModalOpen.click();
        }
      }
  }

const handleEdit=()=>{
    handleFormTaskOnchange(sendData.taskId, "taskId");
    handleFormTaskOnchange(sendData.name, "name");
    handleFormTaskOnchange(sendData.email, "email");
    handleFormTaskOnchange(sendData.contactNo, "contactNo");
    handleFormTaskOnchange(sendData.calendar, "calendar"); 
    handleFormTaskOnchange(sendData.gender, "gender"); 
    sendData.weekday.map((dt:any)=>{
        handleFormTaskWeekDayOnchange(dt.value, dt.checkded, "weekday");
    });
}

  useEffect(()=>{
    if(sendData !== ''){
        handleEdit();
    }
  },[sendData])
  
  return (
    <div className="modal fade" id="editFormModal" tabIndex={-1} aria-labelledby="editFormModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title form-title" id="editFormModalLabel">Edit Form</h1>
            <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClear}></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mb-4">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input type="text" className="form-control custom-form-control" id="inputName" aria-describedby="nameHelp" required value={formTask.name} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "name");}}  />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-4">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control custom-form-control" id="inputEmail" aria-describedby="emailHelp" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={formTask.email} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "email");}}  />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-4">
                            <label htmlFor="inputContact" className="form-label">Contact No</label>
                            <input type="number" className="form-control custom-form-control" id="inputContact" aria-describedby="contactHelp" required  pattern="[0-9]{6}" value={formTask.contactNo} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "contactNo");}} />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-4">
                            <label htmlFor="inputCalendar" className="form-label">Calendar</label>
                            <input type="date" className="form-control custom-form-control" id="inputCalendar" aria-describedby="calendarHelp" required value={formTask.calendar} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "calendar");}} />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="gender">Gender</label>
                        <div className="mb-4 alignHorizontal">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="genderGrp" id="maleGender" required value="Male" checked={formTask.gender === "Male" ? true : false} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "gender");}} />
                                <label className="form-check-label" htmlFor="maleGender">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="genderGrp" id="femalegender" value="Female" checked={formTask.gender === "Female" ? true : false} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "gender");}} />
                                <label className="form-check-label" htmlFor="femalegender">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">                    
                        <label htmlFor="weekday">Weekday</label>
                        <div className="mb-4 alignHorizontal">
                            {
                                formTask.weekday.map((dt:any,index:number)=>(
                                    <div className="form-check" key={index}>
                                        <input className="form-check-input" type="checkbox" id={`${dt.value}Checkbox`} value={dt.value} checked={dt.checkded} onChange={(e: any) => {handleFormTaskWeekDayOnchange(e.target.value, e.target.checked, "weekday"); }} />
                                        <label className="form-check-label" htmlFor="mondayCheckbox">
                                            {dt.value}
                                        </label>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="endContent">
                            <button type="button" className="btn custom-btn btn-secondary" data-bs-dismiss="modal" onClick={handleClear}>Close</button>
                            <button type="submit" value="submit" className="btn ms-2 custom-btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModalComponent;
