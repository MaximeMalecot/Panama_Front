<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { ROLES } from "@/constants/roles";
import { checkMail } from "@/utils";
import { displayMsg } from "@/utils/toast";
import Btn from '@/components/common/Btn.vue';
import Input from '@/components/common/InputField.vue';

const handledRoles = {
    CLIENT: 'client',
    FREELANCER: 'freelancer',
};

const route = useRoute();
const router = useRouter();

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

const changeAccountType = type => {
    if (!type || !Object.values(handledRoles).includes(type)) {
        return;
    }

    if (type === handledRoles.CLIENT) {
        router.push({ path: 'signup', query: { role: handledRoles.CLIENT } })

    } else if (type === handledRoles.FREELANCER) {
        router.push({ path: 'signup', query: { role: handledRoles.FREELANCER } })
    }
}

const store = useAuthStore();
const formData = reactive({
    email: '',
    password: '',
    surname: '',
    name: '',
    passwordConfirmation: '',
    tosAgreed: false,
});
const loading = ref(false);

const onSubmit = async () => {
    loading.value = true;
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

    const res = await store.signup({ ...formData, role: role.value });
    if (res) {
        displayMsg({ msg: "Inscription réussie", type: "success" });
        //todo redirect to home
    }
    loading.value = false;
}

</script>

<template>
    <div class="container auth">
        <div class="left_section">

        </div>
        <div class="right_section">
            <template v-if="role">
                <h3>Inscription en tant que {{ role === ROLES.CLIENT ? "CLIENT" : "FREELANCER" }}</h3>
                <form @submit.prevent="onSubmit">
                    <Input name="name" placeholder="Nom" type="text" v-model="formData.name" />
                    <Input name="surname" placeholder="Prénom" type="text" v-model="formData.surname" />
                    <Input name="email" placeholder="Addresse e-mail" type="text" v-model="formData.email" />
                    <Input name="password" placeholder="Mot de passe" type="password" v-model="formData.password" />
                    <Input name="passwordConfirmation" placeholder="Confirmation du mot de passe" type="password"
                        v-model="formData.passwordConfirmation" />
                    <span class="tos_section">
                        <Input type="checkbox" v-model="formData.tosAgreed" />
                        <label for="tosAgreed">J'accepte les CGU</label>
                    </span>
                    <Btn v-if="!loading" type="submit">S'inscrire dès maintenant</Btn>
                    <Btn v-else type="button">Chargement...</Btn>
                </form>
                <div>
                    <Btn type="link" :to="{ name: 'login' }">Déjà inscrit? Se connecter </Btn>
                </div>
            </template>
            <template v-else>
                <div class="prompt_type">
                    <p>Vous souhaitez vous inscrire en tant que:</p>
                    <div class="options">
                        <Btn type="button" @click="() => changeAccountType('client')">Client</Btn>
                        <Btn type="button" @click="() => changeAccountType('freelancer')" outline>Freelancer</Btn>
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>

<style scoped lang="scss" >
.auth {
    display: flex;
    width: 100%;
    padding: 2em 1em;
    gap: 10px;
    height: 80vh;

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
            margin-bottom: 1em;

            .tos_section {
                display: flex;
                align-items: center;
                align-content: center;
            }
        }

        .prompt_type {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            justify-content: center;

            .options{
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
    }

    .left_section {
        width: 40%;
        background-image: url('@/assets/images/panama-city.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }
}
</style>