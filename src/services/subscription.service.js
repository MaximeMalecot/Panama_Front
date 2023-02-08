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


    async subscribe(subscriptionPlanId){
        // const { subscriptionPlanId } = payload;
        // if(!subscriptionPlanId){
        //     throw new Error("Subscription plan id is required");
        // }
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


}

export default new SubscriptionService();