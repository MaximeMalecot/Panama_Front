import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class ReviewsService {
    async getReviews(){
        try{
            const res = await fetch(`${API_URL}/filters`, {
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

export default new ReviewsService();