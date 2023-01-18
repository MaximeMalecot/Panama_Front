<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';
import { ROLES } from "@/constants/roles";
import { checkMail } from "@/utils";

const handledRoles = {
    CLIENT: 'client',
    FREELANCE: 'freelance',
};

const route = useRoute();

onMounted(() => {
    console.log(route.query);
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
    } else if (route.query.role === handledRoles.FREELANCE) {
        return ROLES.FREELANCE;
    }
});

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: '',
    passwordConfirmation: '',
    tosAgreed: false,
});

const onSubmit = () => {
    const { email, password, passwordConfirmation, tosAgreed } = formData;
    if (!role.value) {
        console.error("Invalid signin type")
        return;
    }

    if (!checkMail(email)) {
        //todo show error
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

    store.login(email, password, role.value);
}

</script>

<template>
    <div class="auth">
        <form @submit.prevent="onSubmit">
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