<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { CONTACT_MAIL } from "@/constants/contact";

const route = useRoute();
const authStore = useAuthStore();

const isSuccessful = computed(() => {
    return route.query.success === "true";
});

onMounted(() => {
    if (isSuccessful.value) {
        authStore.logout(false);
    }
});
</script>

<template>
    <div v-if="isSuccessful">
        <div class="container content">
            <div class="icon">
                <svg
                    width="202"
                    height="202"
                    viewBox="0 0 202 202"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M86.86 119.18L64.8925 97.2125C63.0408 95.3608 60.7279 94.4788 57.9538 94.5663C55.1729 94.6471 52.8567 95.6133 51.005 97.465C49.1533 99.3167 48.2275 101.673 48.2275 104.535C48.2275 107.397 49.1533 109.753 51.005 111.605L79.79 140.39C81.6417 142.242 83.9983 143.167 86.86 143.167C89.7217 143.167 92.0783 142.242 93.93 140.39L151.248 83.0725C153.099 81.2208 153.985 78.9046 153.904 76.1237C153.816 73.3496 152.847 71.0367 150.995 69.185C149.143 67.3333 146.787 66.4075 143.925 66.4075C141.063 66.4075 138.707 67.3333 136.855 69.185L86.86 119.18ZM101 202C87.0283 202 73.8983 199.347 61.61 194.041C49.3217 188.742 38.6325 181.548 29.5425 172.458C20.4525 163.368 13.2579 152.678 7.9588 140.39C2.65293 128.102 0 114.972 0 101C0 87.0283 2.65293 73.8983 7.9588 61.61C13.2579 49.3217 20.4525 38.6325 29.5425 29.5425C38.6325 20.4525 49.3217 13.2546 61.61 7.9487C73.8983 2.64957 87.0283 0 101 0C114.972 0 128.102 2.64957 140.39 7.9487C152.678 13.2546 163.368 20.4525 172.458 29.5425C181.548 38.6325 188.742 49.3217 194.041 61.61C199.347 73.8983 202 87.0283 202 101C202 114.972 199.347 128.102 194.041 140.39C188.742 152.678 181.548 163.368 172.458 172.458C163.368 181.548 152.678 188.742 140.39 194.041C128.102 199.347 114.972 202 101 202ZM101 181.8C123.388 181.8 142.454 173.932 158.196 158.196C173.932 142.454 181.8 123.388 181.8 101C181.8 78.6117 173.932 59.5462 158.196 43.8037C142.454 28.0679 123.388 20.2 101 20.2C78.6117 20.2 59.5496 28.0679 43.8138 43.8037C28.0713 59.5462 20.2 78.6117 20.2 101C20.2 123.388 28.0713 142.454 43.8138 158.196C59.5496 173.932 78.6117 181.8 101 181.8Z"
                        fill="#EA4E4E"
                    />
                </svg>
            </div>
            <div class="text">
                <h1>Abonnement réussi !</h1>
                <div>
                    <p>
                        Votre abonnement a bien été pris en compte, votre compte
                        devrait passer en <b>FREELANCER PREMIUM</b> d'ici
                        quelques instants.
                    </p>
                    <p>
                        Pour profiter de ce changement, vous allez devoir vous
                        reconnecter.
                    </p>
                    <p>
                        Si après plusieurs minutes ce n'est toujours pas le cas,
                        contactez-nous.
                    </p>
                </div>
                <div class="contact_link_container">
                    <a :href="`mailto:${CONTACT_MAIL}`">Nous contacter</a>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="container content">
            <div class="icon">
                <svg
                    width="170"
                    height="207"
                    viewBox="0 0 170 207"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M52.1875 131.875H117.812M52.1875 160H85M66.25 89.6875L103.75 52.1875M103.75 89.6875L66.25 52.1875M150.625 10H19.375C16.8886 10 14.504 10.9877 12.7459 12.7459C10.9877 14.504 10 16.8886 10 19.375V188.125C10 190.611 10.9877 192.996 12.7459 194.754C14.504 196.512 16.8886 197.5 19.375 197.5H150.625C153.111 197.5 155.496 196.512 157.254 194.754C159.012 192.996 160 190.611 160 188.125V19.375C160 16.8886 159.012 14.504 157.254 12.7459C155.496 10.9877 153.111 10 150.625 10Z"
                        stroke="#EA4E4E"
                        stroke-width="18.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="text">
                <h1>Abonnement échoué</h1>
                <div>
                    <p>
                        Une erreur est survenue durant l'abonnement de votre
                        compte.
                    </p>
                    <p>Attendez quelques minutes avant de recommencer.</p>
                    <p>
                        En cas de problèmes persistant, contactez votre banque.
                    </p>
                </div>
                <div class="contact_link_container">
                    <a :href="`mailto:${CONTACT_MAIL}`">Nous contacter</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 1rem 0;

    * {
        margin: 0;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 10px;

        p {
            font-size: 14px;
        }

        .contact_link_container {
            width: fit-content;

            a {
                color: #ea4e4e;
                font-weight: 600;
                font-size: 14px;
            }
        }
    }
}
</style>
