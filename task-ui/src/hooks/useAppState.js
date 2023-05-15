import { useState } from "react";


const initialState = {
    isLogin:false,
    apdateListTask:false,
    idNumber:0,
    firstName:'',
    lastName:"" 
};

export function useAppState () {
    const [state , setState] = useState(initialState);

  return {
      state,
      setState
  }
}