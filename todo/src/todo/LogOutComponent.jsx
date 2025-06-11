import {useAuth} from "./security/AuthContext";

export default function LogOutComponent(){
    const auth = useAuth();
    auth.logout()
    return(
        <div  className="LogOut">

            You are logged Out!
            Thanks for using our application!
        </div>
    )
}