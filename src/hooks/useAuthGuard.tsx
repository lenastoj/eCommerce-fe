import UserContext from "../context/User.context";
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/static";

type Props = {
    authProtection: boolean;
}

const useAuthGuard = ({authProtection}: Props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user && authProtection) { //for protection routes where customer must be authentificated
            navigate(ROUTES.HOME)
        } 
        else if(user && !authProtection) { // for protection routes like login/register where customer is already authentificated
            navigate(ROUTES.HOME)
        }
    }, [])
}

export default useAuthGuard;