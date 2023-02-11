import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class ReviewService {
    async getReviews(freelancerId){
        try{
            const res = await fetch(`${API_URL}/users/${freelancerId}/reviews`, {
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

    async publishReview(freelancerId, review){
        try{
            const res = await fetch(`${API_URL}/users/${freelancerId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
                body: JSON.stringify(review)
            });
            if(res.status === 201){
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

export default new ReviewService();