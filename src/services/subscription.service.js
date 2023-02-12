import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class SubscriptionService {

    async getPlans(){
        try{
            const res = await fetch(`${API_URL}/subscription_plans`, {
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

    async getPlan(id){
        try{
            const res = await fetch(`${API_URL}/subscription_plans/${id}`, {
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

    async updatePlan(id, payload){
        try{
            const res = await fetch(`${API_URL}/subscription_plans/${id}`, {
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


    async subscribe(subscriptionPlanId){
        try{
            const res = await fetch(`${API_URL}/payment/create_subscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
                body: JSON.stringify({subscriptionPlan: subscriptionPlanId})
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

    async cancel(){
        try{
            const res = await fetch(`${API_URL}/subscriptions/cancel`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
                body: JSON.stringify({})
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

    async createPlan(payload){
        try{
            const res = await fetch(`${API_URL}/subscription_plans`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
                body: JSON.stringify(payload)
            });
            return res;
        }catch(e){
            console.error(e.message);
            return false;
        }
    }


}

export default new SubscriptionService();