import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class UserService {

    async getUsers(){
        try{
            const res = await fetch(`${API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                }
            });
            if(res.status === 200){
                return await res.json();
            }else{
                return false;
            }
        }catch(e){
            console.error(e.message);
            return false;
        }
    }

    async getUserAdmin(id){
        try{
            const res = await fetch(`${API_URL}/users/${id}/admin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                }
            });
            if(res.status === 200){
                return await res.json();
            }else{
                return false;
            }
        }catch(e){
            console.error(e.message);
            return false;
        }
    }


}

export default new UserService();