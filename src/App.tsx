
import { Provider } from 'react-redux';
import './App.css';
import FormComponent from './components/FormComponent/FormComponent';
import TableComponent from './components/TableComponent/TableComponent';
import { store } from './components/redux/store';
import { useState } from 'react';
import { generateID } from './components/Reusable/Data';
import ToastList from './components/Reusable/Toastreusbale/ToastList/ToastList';
import AuthContext from './components/context/AuthContext';

function App() {

  const [position, setPosition] = useState('top-right');
  const [toasts, setToasts] = useState<any>([]);
  const [autoClose, setAutoClose] = useState<boolean>(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState<number>(4);
  const handlePositionMethod=(method:string)=>{
    setPosition(method);
  }
  const removeAllToasts = () => {
    setToasts([]);
  };
  const handleDurationChange = (number:number) => {
    setAutoCloseDuration(number);
  };
  const handleAutoCloseChange = () => {
    setAutoClose((prevAutoClose) => !prevAutoClose);
    removeAllToasts();
  };

  const showToast = (message:string, type:string) => {
    const toast = {
      id: generateID(3),
      message,
      type,
    };

    setToasts((prevToasts:any) => [...prevToasts, toast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  };

  const removeToast = (id:any) => {
    setToasts((prevToasts:any) => prevToasts.filter((toast:any) => toast.id !== id));
  };
  
  return (
    <AuthContext.Provider value={{
      position:position,
      handlePositionMethod:handlePositionMethod,
      removeAllToasts:removeAllToasts,
      showToast:showToast,
      handleDurationChange:handleDurationChange,
      handleAutoCloseChange:handleAutoCloseChange
    }}>
      <Provider store={store}>
        <div className="App">
          <FormComponent />
          <TableComponent />
          <ToastList data={toasts} position={position} removeToast={removeToast} />
        </div>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
