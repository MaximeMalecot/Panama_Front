import { API_URL } from '../constants/urls';
import authHeader from './auth.header';

class SubscriptionService {

    async createProposition(projectId){
        try{
            const res = await fetch(`${API_URL}/projects/${projectId}/propositions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader()
                },
                body: JSON.stringify({})
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

    async getSelfPropositions(userId){
        try{
            const res = await fetch(`${API_URL}/users/${userId}/propositions`, {
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

    async getSelfPropositionOfProject(projectId, projectStatus = null, propositionStatus = null){
        try{
            let url = `${API_URL}/projects/${projectId}/own`;
            const params = [];
            if(projectStatus) params.push(`status=${projectStatus}`);
            if(propositionStatus) params.push(`propositionStatus=${propositionStatus}`);
            url += params.join('&');

            const res = await fetch(url, {
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

    async getProjectPropositions(projectId){
        try{
            const res = await fetch(`${API_URL}/projects/${projectId}/propositions`, {
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

    async respondToProposition(propositionId, status){
        try{
            const res = await fetch(`${API_URL}/propositions/${propositionId}/accept-or-refuse`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    ...authHeader()
                },
                body: JSON.stringify({status})
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