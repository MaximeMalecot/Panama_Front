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
            console.error(e.message);
            return false;
        }
    }

    async getProjects({filters = {}} = {}){
        try{
            const res = await fetch(`${API_URL}/projects?${new URLSearchParams(filters)}`, {
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

export default new ProjectService();