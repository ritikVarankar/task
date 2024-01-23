export const generateID = (length:number) => {
    const digits = '0123456789';
    let ID = '';
    for (let i = 0; i < length; i++) {
      ID += digits[Math.floor(Math.random() * 10)];
    }
    return ID;
  };