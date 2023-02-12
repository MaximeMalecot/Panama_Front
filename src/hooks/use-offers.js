import { ref, watch, computed } from 'vue';
import ProjectService from '@/services/project.service';

const useOffers = () => {
    const offers = ref([]);
    const offersLoading = ref(false);
    const offersError = ref(null);
    const count = computed(() => offers.value.length);

    const fetchOffers = async (queryParams = {}) => {
        offersLoading.value = true;
        offersError.value = null;
        try {
            const res = await ProjectService.getProjects(queryParams);
            if(!res) throw new Error('No offers found');
            offers.value = res["hydra:member"];
        } catch (e) {
            console.error(e.message);
            offersError.value = e.message;
        }
        offersLoading.value = false;
    };

    watch(offers, (val) => {
        console.log(val);
    })

    return {
        offers,
        offersLoading,
        offersError,
        fetchOffers,
        offersCount: count
    };
};

export default useOffers;