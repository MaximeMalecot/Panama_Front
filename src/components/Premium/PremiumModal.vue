<script setup>
import { ref, defineProps } from "vue";
import Btn from "../common/Btn.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
    close: {
        type: Function,
        required: true,
    },
});

const handleBecomePremium = () => {
    router.push({ name: "plans" });
};

const handleSubscriptions = () => {
    router.push({ name: "subscriptions" });
};

</script>

<template>
    <div @click="close" class="premium_modal">
        <div @click="(e) => e.stopPropagation()" class="modal_container">
            <section class="modal_header">
                <h2>Ne ratez pas une opportunité!</h2>
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
            <section class="modal_description">
                <p>
                    Devenez <strong>Freelance Premium</strong> et postulez à n'importe quelle
                    offre présente sur la plateforme.
                </p>
                <h3>Seulement 9.99€/mois.</h3>
            </section>
            <section class="modal_actions">
                <Btn @click="handleBecomePremium">voir les abonnements</Btn>
            </section>
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

.premium_modal {
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

    p,
    h2,
    h3 {
        margin: 0;
    }

    .modal_container {
        animation: slideIn 0.2s ease-in-out;
        width: 500px;
        height: 280px;
        background: white;
        border-radius: 8px;
        padding: 2.5rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .modal_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            svg{
                cursor: pointer;
            }
        }

        .modal_actions{
            width: 100%;
            display: flex;
            gap: 1rem;
        }
    }
}
</style>
