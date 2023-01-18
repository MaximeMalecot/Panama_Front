<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { displayMsg } from "@/utils/toast";
import Btn from '@/components/common/Btn.vue';
import Input from '@/components/common/InputField.vue';

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: ''
});
const loading = ref(false);

const onSubmit = async () => {
    loading.value = true;
    const { email, password } = formData;
    try {
        if (!email)     throw new Error("Veuillez saisir une adresse e-mail");
        if (!password)  throw new Error("Veuillez saisir un mot de passe");

        const res = await store.login(formData.email, formData.password);
        if (res === true) {
            displayMsg({ msg: "Connexion réussie", type: "success" });
        } else {
            throw new Error("Une erreur est survenue")
        }
    } catch (e) {
        console.error(e);
        displayMsg({ msg: e.message, type: "error" });
    }
    loading.value = false;
}

</script>

<template>
    <div class="container auth">
        <div class="left_section">

        </div>
        <div class="right_section">
            <h3>Login</h3>
            <form @submit.prevent="onSubmit">
                <Input name="email" placeholder="Addresse e-mail" type="text" v-model="formData.email" />
                <Input name="password" placeholder="Mot de passe" type="password" v-model="formData.password" />
                <Btn v-if="!loading" type="submit">Se connecter</Btn>
                <Btn v-else type="button" disabled>Chargement...</Btn>
            </form>
            <div class="links">
                <a href="">Mot de passe oublié</a>
                <RouterLink :to="{ name: 'signup'}">Pas de compte ? S'inscrire</RouterLink>
                <!-- <a href="">Pas de compte? S'inscrire</a> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss" >
.auth {
    display: flex;
    width: 100%;
    height: 80vh;
    padding: 2em 1em;
    gap: 10px;

    .right_section {
        width: 60%;
        background-color: #ffffff;
        border: 1px solid var(--border);
        padding: 4em 1em;
        display: flex;
        flex-direction: column;
        gap: 0.8em;
        
        h3 {
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

            .tos_section {
                display: flex;
                align-items: center;
            }
        }

        .links{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }

    .left_section {
        width: 40%;
        background-image: url('@/assets/images/panama-city.webp');
        background-image: url('@/assets/images/panama-city.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
}
</style>