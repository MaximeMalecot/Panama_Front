import { ref, watch, computed } from 'vue';
import ProjectService from '@/services/project.service';
import { useAuthStore } from '@/stores/auth';
import { PROPOSITION_STATUS } from '@/constants/status';

const useFreelancerProjects = () => {
    const authStore = useAuthStore();
    const projects = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const count = computed(() => propositions.value.length);

    const fetchAllProjects = async () => {
        loading.value = true;
        error.value = null;
        try {
            const userId = authStore.userData.userId;
            const res = await ProjectService.getFreelancerProjects(userId);
            if(!res) throw new Error('An error occured');
            if(!res?.propositions || res.propositions.length == 0) throw new Error('No propositions found');
            projects.value = res.propositions
        } catch (e) {
            console.error(e.message);
            error.value = e.message;
        }
        loading.value = false;
    };


    watch(projects, (val) => {
        console.log(val);
    })

    return {
        projects,
        loading,
        error,
        count,
        fetchAllProjects
    }
};

export default useFreelancerProjects;