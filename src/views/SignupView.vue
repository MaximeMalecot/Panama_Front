<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';
import { ROLES } from "@/constants/roles";
import { checkMail } from "@/utils";
import { displayMsg } from "@/utils/toast";

const handledRoles = {
    CLIENT: 'client',
    FREELANCER: 'freelancer',
};

const route = useRoute();

onMounted(() => {
    if (!route.query.role || !Object.values(handledRoles).includes(route.query.role)) {
        //todo redirect to home
    }
});

const role = computed(() => {
    if (!route.query.role || !Object.values(handledRoles).includes(route.query.role)) {
        return null;
    }
    if (route.query.role === handledRoles.CLIENT) {
        return ROLES.CLIENT;
    } else if (route.query.role === handledRoles.FREELANCER) {
        return ROLES.FREELANCER;
    }
});

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: '',
    surname: '',
    name: '',
    passwordConfirmation: '',
    tosAgreed: false,
});

const onSubmit = () => {
    const { surname, name, email, password, passwordConfirmation, tosAgreed } = formData;
    if (!role.value) {
        console.error("Invalid signin type");
        displayMsg({ msg: "Une erreur est survenue avec le type d'inscription", type: "error" });
        return;
    }

    if (!checkMail(email)) {
        displayMsg({ msg: "Veuillez saisir une adresse e-mail valide", type: "error" });
        return;
    }

    if (name === '' || surname === '') {
        displayMsg({ msg: "Veuillez saisir un nom et un prénom", type: "error" });
        console.error("Name or surname is empty");
        return;
    }

    if (password.length < 1) {
        displayMsg({ msg: "Veuillez saisir un mot de passe", type: "error" });
        console.error("Password is too short");
        return;
    }

    if (password !== passwordConfirmation) {
        displayMsg({ msg: "Les mots de passe ne correspondent pas", type: "error" });
        console.error("Password confirmation doesn't match")
        return;
    }

    if (!tosAgreed) {
        console.error("You must agree to the ToS");
        displayMsg({ msg: "Vous devez accepter les conditions d'utilisation", type: "error" });
        return;
    }
    store.signup({ ...formData, role: role.value });
}

</script>

<template>
    <template v-if="role">
        <div class="container auth">
            <div class="left_section">

            </div>
            <div class="right_section">
                <h3>CREATE A {{ role === ROLES.CLIENT ? "CLIENT" : "FREELANCER" }} ACCOUNT</h3>
                <form @submit.prevent="onSubmit">
                    <input name="name" placeholder="Nom" type="text" v-model="formData.name" />
                    <input name="surname" placeholder="Prénom" type="text" v-model="formData.surname" />
                    <input name="email" placeholder="Addresse e-mail" type="text" v-model="formData.email" />
                    <input name="password" placeholder="Mot de passe" type="password" v-model="formData.password" />
                    <input name="passwordConfirmation" placeholder="Confirmation du mot de passe" type="password"
                        v-model="formData.passwordConfirmation" />
                    <span class="tos_section">
                        <input type="checkbox" v-model="formData.tosAgreed" />
                        <label for="tosAgreed">J'accepte les CGU</label>
                    </span>
                    <button type="submit">S'inscrire dès maintenant</button>
                </form>
                <div>
                    <a href="">Déjà inscrit? Se connecter</a>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div>Invalid role</div>
    </template>
</template>

<style scoped lang="scss" >
.auth {
    display: flex;
    width: 100%;
    padding: 2em 1em;
    gap: 10px;

    .right_section {
        width: 60%;
        background-color: #f9f9f9;
        border: 1px solid var(--border);
        padding: 4em 1em;
        display: flex;
        flex-direction: column;
        gap: 0.8em;

        h3{
            color: var(--text-dark);
            padding: 0;
            margin: 0;
        }

        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            border-bottom: 1px solid rgb(183, 183, 183);
            padding: 1em 0;

            .tos_section{
                display: flex;
                align-items: center;
            }
        }
    }

    .left_section {
        width: 40%;
        background-image: url('@/assets/images/panama-city.webp');

    }
}
</style>