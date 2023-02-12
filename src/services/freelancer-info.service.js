import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class FreelancerInfoService {

    async getInfo(id){
        try{
            const res = await fetch(`${API_URL}/freelancer_infos/${id}`, {
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

    async updateInfo(id, payload){
        try{
            const res = await fetch(`${API_URL}/freelancer_infos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
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

    async getFreelancerInfo(id){
        try{
            const res = await fetch(`${API_URL}/users/freelancer/${id}`, {
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

export default new FreelancerInfoService();