import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function useAuth(){
    const {user,setUser}=useContext(AuthContext);
    return{
        user,
        setUser
    }
}

export default useAuth;