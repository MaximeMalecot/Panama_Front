<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';
import { ROLES } from "@/constants/roles";
import { checkMail } from "@/utils";

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
        console.error("Invalid signin type")
        return;
    }

    if (!checkMail(email)) {
        //todo show error
        return;
    }

    if(name === '' || surname === '') {
        //todo show error
        console.error("Name or surname is empty");
        return;
    }

    if (password.length < 1) {
        //todo show error
        console.error("Password is too short");
        return;
    }

    if (password !== passwordConfirmation) {
        //todo show error
        console.error("Password confirmation doesn't match")
        return;
    }

    if (!tosAgreed) {
        console.error("You must agree to the ToS")
        //todo show error
        return;
    }
    store.signup({...formData, role: role.value});
}

</script>

<template>
    <div class="auth">
        <form @submit.prevent="onSubmit">
            <input name="name" placeholder="Nom" type="text" v-model="formData.name" />
            <input name="surname" placeholder="Prénom" type="text" v-model="formData.surname" />
            <input name="email" placeholder="Addresse e-mail" type="text" v-model="formData.email" />
            <input name="password" placeholder="Mot de passe" type="password" v-model="formData.password" />
            <input name="passwordConfirmation" placeholder="Confirmation du mot de passe" type="password"
                v-model="formData.passwordConfirmation" />
            <input type="checkbox" v-model="formData.tosAgreed" />
            <label for="tosAgreed">J'accepte les CGU</label>
            <button type="submit">S'inscrire dès maintenant'</button>
        </form>
        <div>
            <a href="">Déjà inscrit? Se connecter</a>
        </div>
    </div>
</template>

<style scoped>

</style>