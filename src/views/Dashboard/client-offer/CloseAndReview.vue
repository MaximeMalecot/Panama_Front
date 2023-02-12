<script setup>
import Btn from "@/components/common/Btn.vue";
import { watch, ref, computed, onMounted } from "vue";
import ProjectService from "@/services/project.service.js";
import ReviewService from "@/services/review.service.js";
import { PROJECT_STATUS } from "@/constants/status.js";
import ReviewModal from "@/components/ReviewModal/ReviewModal.vue";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    freelancer: {
        type: Object,
        required: true,
    },
});

const loading = ref(false);
const showModal = ref(false);

const closeProject = async () => {
    loading.value = true;
    const res = await ProjectService.closeProject(props.project.id);
    props.project.status = "CLOSED";
    if (res) {
        props.project.status = PROJECT_STATUS.ENDED;
    }
    loading.value = false;
    checkHasAlreadyReviewed();
};

const checkHasAlreadyReviewed = async () => {
    if (!(props.project.status === PROJECT_STATUS.ENDED)) return;
    const hasAlreadyReviewed = await ReviewService.clientAndFreelancerHaveReview(
        props.freelancer.id,
        store.userData.userId
    );
    if (hasAlreadyReviewed && hasAlreadyReviewed["hydra:member"].length == 0) {
        showModal.value = true;
        // props.project.status = PROJECT_STATUS.ENDED;
    }
};

onMounted(() => {
    console.log(props.freelancer);
    if(! (props.project.status === PROJECT_STATUS.ENDED)) return;
    checkHasAlreadyReviewed();
});

</script>

<template>
    <section
        class="close_project"
        v-if="project.status === PROJECT_STATUS.IN_PROGRESS"
    >
        <h2>Projet terminé?</h2>
        <p>
            Le projet est terminé ?<br />Vous pouvez maintenant le cloturer et
            le noter.
        </p>
        <Btn v-if="!loading" @click="closeProject">Cloturer le projet</Btn>
        <Btn v-else disabled>...</Btn>
    </section>
    <ReviewModal v-if="showModal" :freelancer="freelancer" :project="project" :close="() => showModal = false"/>
</template>

<style lang="scss" scoped>
.close_project {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-top: 1rem;
    h2 {
        margin-bottom: 1rem;
    }
    p {
        margin-bottom: 1rem;
        text-align: center;
    }
}

.review_part {
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    width: 70%;
    padding: 1rem;

    .freelancer_part {
        display: flex;
        align-items: center;

        .freelancer_part__img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1rem;
            background-color: gray;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .review_form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 0;
    }
}
</style>
