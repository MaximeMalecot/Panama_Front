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

    async getProjects(queryParams = {}){
        const { page, name, filters, minPrice, maxPrice, length } = queryParams;
        
        try{
            const url = `${API_URL}/projects?status=ACTIVE&`;
            const params = [];
            // if( filters && JSON.stringify(filters) != JSON.stringify({}) ){
            //     // url += `?${Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&')}`;
            //     params.push(`filters.name=${filters}`);
            // }

            // if( minPrice ){
            //     params.push(`minPrice=${minPrice}`);
            // }

            // if( maxPrice ){
            //     params.push(`maxPrice=${maxPrice}`);
            // }

            // if( length ){
            //     params.push(`length=${length}`);
            // }

            // if( name ){
            //     params.push(`name=${name}`);
            // }

            Object.entries(queryParams).forEach(([key, value]) => {
                if(value){
                    params.push(`${key}=${value}`);
                }
            });

            const res = await fetch(`${url}${params.join('&')}`, {
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

    async getProject(id){
        try{
            const res = await fetch(`${API_URL}/projects/${id}`, {
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
    };

}

export default new ProjectService();