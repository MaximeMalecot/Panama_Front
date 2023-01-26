import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class ProjectService {
    async createProject(payload){
        try{
            const res = await fetch(`${API_URL}/payment/create_checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
                body: JSON.stringify(payload)
            });
            if(res.status === 200){
                return await res.json();
            }else{
                return false;
            }
        }catch(e){
            console.log(e);
            return false;
        }
    }
}

export default new ProjectService();