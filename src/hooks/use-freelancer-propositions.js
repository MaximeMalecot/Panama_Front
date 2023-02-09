import { ref, watch, computed } from 'vue';
import PropositionService from '@/services/proposition.service';
import { useAuthStore } from '@/stores/auth';
import { PROPOSITION_STATUS } from '@/constants/status';

const useFreelancerPropositions = () => {
    const authStore = useAuthStore();
    const propositions = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const count = computed(() => propositions.value.length);

    const fetchAllPropositions = async () => {
        loading.value = true;
        error.value = null;
        try {
            const userId = authStore.userData.userId;
            const res = await PropositionService.getSelfPropositions(userId);
            if(!res) throw new Error('An error occured');
            if(!res?.propositions || res.propositions.length == 0) throw new Error('No propositions found');
            propositions.value = res.propositions
        } catch (e) {
            console.error(e.message);
            error.value = e.message;
        }
        loading.value = false;
    };

    const fetchAllPropositionsWithStatus = async (status) => {
        loading.value = true;
        error.value = null;
        try {
            const userId = authStore.userData.userId;
            const res = await PropositionService.getSelfPropositions(userId);
            if(!res) throw new Error('An error occured');
            if(!res?.propositions || res.propositions.length == 0) throw new Error('No propositions found');
            propositions.value = res.propositions
        } catch (e) {
            console.error(e.message);
            error.value = e.message;
        }
        loading.value = false;
    }

    watch(propositions, (val) => {
        console.log(val);
    })

    return {
        propositions,
        loading,
        error,
        count,
        fetchAllPropositions,
        fetchAllPropositionsWithStatus
    }
};

export default useFreelancerPropositions;