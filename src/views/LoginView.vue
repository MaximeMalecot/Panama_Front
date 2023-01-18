<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { displayMsg } from "@/utils/toast";

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: ''
});

const onSubmit = async () => {
    const { email, password } = formData;
    if (!email) {
        console.error("Missing email");
        displayMsg({ msg: "Veuillez saisir une adresse e-mail", type: "error" });
        return;
    }

    if (!password) {
        console.error("Missing password");
        displayMsg({ msg: "Veuillez saisir un mot de passe", type: "error" });
        return;
    }

    const res = await store.login(formData.email, formData.password);
    if (res === true) {
        displayMsg({ msg: "Connexion réussie", type: "success" });
    } else {
        displayMsg({ msg: "Une erreur est survenue", type: "error" });
    }
}

</script>

<template>
    <div class="container auth">
        <div class="left_section">

        </div>
        <div class="right_section">
            <h3>Login</h3>
            <form @submit.prevent="onSubmit">
                <input name="email" placeholder="Addresse e-mail" type="text" v-model="formData.email" />
                <input name="password" placeholder="Mot de passe" type="password" v-model="formData.password" />
                <button type="submit">Se connecter</button>
            </form>
            <div>
                <a href="">Mot de passe oublié</a>
                <a href="">Pas de compte? S'inscrire</a>
            </div>
        </div>
    </div>
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
    }

    .left_section {
        width: 40%;
        background-image: url('@/assets/images/panama-city.webp');

    }
}
</style>