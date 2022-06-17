import { createContext, useState ,useEffect} from "react";

const getLocalValue = (key, initValue) => {
  //SSR Next.js 
  if (typeof window === 'undefined') return initValue;

  // if a value is already store 
  if(localStorage.getItem(key) === 'undefined') return initValue;
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;
  
  // return result of a function 
  if (initValue instanceof Function) return initValue();

  return initValue;
}

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getLocalValue('user', null));

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(user))
  },[user])
  
  return (
    <AuthContext.Provider
      value={{user,setUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};