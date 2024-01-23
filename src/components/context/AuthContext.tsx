import React from 'react';

export default React.createContext({
    position:'',
    handlePositionMethod:(method:string) => {
        return;
    },
    removeAllToasts:() => {
        return;
    },
    showToast:(message:string, type:string) => {
        return;
    },
    handleDurationChange:(number:number) => {
        return;
    },
    handleAutoCloseChange:() => {
        return;
    },
});
