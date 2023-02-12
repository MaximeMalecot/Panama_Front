<script setup>
import Btn from "@/components/common/Btn.vue";
import { watch, ref, computed, onMounted } from "vue";
import ProjectService from "@/services/project.service.js";
import ReviewService from "@/services/review.service.js";
import { PROJECT_STATUS } from "@/constants/status.js";
import InputWithCounter from "@/components/common/InputWithCounter.vue";

const MAX_COMMENT_LENGTH = 255;

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    freelancer: {
        type: Object,
        required: true,
    },
    close: {
        type: Function,
        required: true,
    },
});

const loading = ref(false);
const reviewForm = ref({
    rating: 0,
    comment: "",
});

const publishReview = async () => {
    loading.value = true;
    if (reviewForm.value.rating < 0 || reviewForm.value.rating > 10) {
        alert("La note doit être comprise entre 0 et 10");
        return;
    }

    if (reviewForm.value.comment.length > MAX_COMMENT_LENGTH) {
        alert(
            `Le commentaire ne doit pas dépasser ${MAX_COMMENT_LENGTH} caractères`
        );
        return;
    }

    const res = await ReviewService.publishReview(props.freelancer.id, {
        mark: reviewForm.value.rating,
        content: reviewForm.value.comment,
    });
    if (res) {
        props.close();
    }
    loading.value = false;
};
</script>

<template>
    <div @click="close" class="review_modal">
        <div @click="(e) => e.stopPropagation()" class="modal_container">
            <section class="modal_header">
                <h2>Laissez un avis concernant votre prestataire</h2>
                <svg
                    @click="close"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 21C16.5 21 21 16.5 21 11C21 5.5 16.5 1 11 1C5.5 1 1 5.5 1 11C1 16.5 5.5 21 11 21Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <g opacity="0.4">
                        <path
                            d="M8.17 13.832L13.83 8.172M13.83 13.832L8.17 8.172"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                </svg>
            </section>
            <p>
                Laissez une note et un commentaire concernant
                <b>{{ freelancer?.surname }}</b
                >. Comment avez-vous vécu votre expérience avec lui ?
            </p>
            <div class="freelancer_part">
                <div class="freelancer_part__img">
                    <img :src="freelancer?.avatar" alt="freelancer avatar" />
                </div>
                <span>{{ freelancer?.surname }} {{ freelancer?.name }}</span>
            </div>
            <form class="review_form" @submit.prevent="publishReview">
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="0"
                    max="10"
                    placeholder="Note sur 5"
                    step="any"
                    v-model="reviewForm.rating"
                />
                <InputWithCounter
                    :type="'textarea'"
                    :maxLength="MAX_COMMENT_LENGTH"
                    v-model="reviewForm.comment"
                />
                <Btn :type="'submit'" value="Envoyer">Envoyer</Btn>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@keyframes slideIn {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
}

.review_modal {
    background: rgba(0, 0, 0, 0.282);
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .modal_container {
        animation: slideIn 0.2s ease-in-out;
        display: flex;
        flex-direction: column;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        width: 60%;
        padding: 1rem;
        background-color: white;

        .modal_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            svg{
                cursor: pointer;
            }
        }

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
}
</style>
