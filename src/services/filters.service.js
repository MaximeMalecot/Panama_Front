import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class FiltersService {
    async getFilters(type){
        let url = `${API_URL}/filters`;
        if(type){
            url += `?type=${type}`;
        }
        try{
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
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

    async deleteFilter(id){
        try{
            const res = await fetch(`${API_URL}/filters/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                }
            });
            if(res.status === 204){
                return true;
            }else{
                return false;
            }
        }catch(e){
            console.error(e.message);
            return false;
        }
    }

    async search(name){
        try{
            const res = await fetch(`${API_URL}/filters?name=${name}`, {
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

export default new FiltersService();