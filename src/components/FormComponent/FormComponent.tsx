import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { addTaskForm } from "../redux/taskFormReducer";

interface WeekFormTask{
    value:string; 
    checkded:boolean;  
}
interface FormTask{
    name:string;
    email:string;
    contactNo:string;
    calendar:string;
    gender:string;
    weekday:WeekFormTask[];
}

function FormComponent() {
    const dispatch = useDispatch();
    const myContext = useContext(AuthContext);
    const [formTask, setFormTask] = useState<FormTask>({
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
    }

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        if(formTask.weekday.filter((dt:any)=> dt.checkded === true).length === 0){
            myContext.showToast("Atleast one day should be selected","failure");
        }else if(formTask.contactNo.length > 10 || formTask.contactNo.length < 10){
            myContext.showToast("contact no must be 10 digits","failure");
        }else{
            dispatch(addTaskForm(formTask));
            handleClear();
        }
    }
  return (
    <div className="container">
        <div className="card form-card">        
            <h2 className="form-title">Form Component</h2>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="mb-4">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="text" className="form-control custom-form-control" id="inputName" aria-describedby="nameHelp" required value={formTask.name} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "name");}}  />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="mb-4">
                                <label htmlFor="inputEmail" className="form-label">Email</label>
                                <input type="email" className="form-control custom-form-control" id="inputEmail" aria-describedby="emailHelp" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={formTask.email} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "email");}}  />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="mb-4">
                                <label htmlFor="inputContact" className="form-label">Contact No</label>
                                <input type="number" className="form-control custom-form-control" id="inputContact" aria-describedby="contactHelp" required  pattern="[0-9]{6}" value={formTask.contactNo} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "contactNo");}} />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="mb-4">
                                <label htmlFor="inputCalendar" className="form-label">Calendar</label>
                                <input type="date" className="form-control custom-form-control" id="inputCalendar" aria-describedby="calendarHelp" required value={formTask.calendar} onChange={(e: any) => {handleFormTaskOnchange(e.target.value, "calendar");}} />
                            </div>
                        </div>
                        <div className="col-sm-3">
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
                        <div className="col-sm-6">                    
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
                            <div className="centerContent">
                                <button type="submit" value="submit" className="btn custom-btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default FormComponent;
