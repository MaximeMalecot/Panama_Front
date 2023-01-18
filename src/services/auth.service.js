import { API_URL } from '../constants/urls';

class AuthService {
    async login(){
        try{

        }catch(e){
            console.log(e);
            return false;
        }
    }

    async signup(payload){
        try{
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if(res.status === 201){
                return true;
            }else{
                return false;
            }
        }catch(e){
            console.log(e);
            return false;
        }
    }

}

export default new AuthService();