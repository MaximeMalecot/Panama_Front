<script setup>
import { watch, ref, computed, onMounted } from "vue";
import FreelancerInfoService from "@/services/freelancer-info.service.js";

const props = defineProps({
    freelancerId: {
        type: Number,
        required: true,
    },
    close: {
        type: Function,
        required: true,
    },
});

const loading = ref(false);
const freelancerData = ref({});

onMounted(async () => {
    loading.value = true;
    if (!props.freelancerId) return;
    const res = await FreelancerInfoService.getFreelancerInfo(
        props.freelancerId
    );
    if(!res) return;
    freelancerData.value = {...res, id: res['@id']};
    loading.value = false;
});

</script>

<template>
    <div @click="close" class="profile_modal">
        <div @click="(e) => e.stopPropagation()" class="modal_container">
            <template v-if="loading">
                <section class="modal_header">
                    <h2>Profil Freelancer</h2>
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
                <p>Loading...</p>
            </template>
            <template v-else-if="freelancerData?.id">
                <section class="modal_header">
                    <h2>{{ freelancerData.name}} {{ freelancerData.surname}}</h2>
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
                <section class="freelancer_infos">
                    <div class="profile_image">
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="freelancer image"
                        />
                        </div>
                    <div class="infos">
                        <p>Mail: <b>{{ freelancerData.email }}</b></p>
                        <hr/>
                        <label>A propos de ce freelancer:</label>
                        <p>{{ freelancerData.freelancerInfo.description }}</p>
                        <p>Ville: <b>{{ freelancerData.freelancerInfo.city }}</b></p>
                        <p>Téléphone: <b>{{ freelancerData.freelancerInfo.phoneNb??"unset" }}</b></p>
                    </div>
                </section>
            </template>
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

.profile_modal {
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

    *{
        margin: 0;
    }

    .modal_container {
        animation: slideIn 0.2s ease-in-out;
        display: flex;
        flex-direction: column;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        width: 40%;
        padding: 1.4rem 2rem;
        background-color: white;
        gap: 1rem;

        .modal_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            svg {
                cursor: pointer;
            }
        }

        .freelancer_infos{
            display: flex;
            align-items: center;
            justify-content: space-around;

            .profile_image{
                height: 150px;
                width: 150px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 1rem;
                border: 1px solid gray;

                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .infos{
                max-width: 60%;
                padding: 1rem;
                border-radius: 3px;
                display: flex;
                flex-direction: column;
                border: 1px solid rgb(219, 219, 219);
                gap: 5px;
            }


        }
    }
}
</style>
