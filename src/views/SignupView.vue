<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, onMounted, watch, computed, ref } from "vue";
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
    try {
        const { surname, name, email, password, passwordConfirmation, tosAgreed } = formData;
        if (!role.value) {
            throw new Error("Une erreur est survenue avec le type d'inscription");
        }

        if (!checkMail(email)) {
            throw new Error("Veuillez saisir une adresse e-mail valide");
        }

        if (name === '' || surname === '') {
            throw new Error("Veuillez saisir un nom et un prénom")
        }

        if (password.length < 1) {
            throw new Error("Veuillez saisir un mot de passe");
        }

        if (password !== passwordConfirmation) {
            throw new Error("Les mots de passe ne correspondent pas");
        }

        if (!tosAgreed) {
            throw new Error("Vous devez accepter les conditions d'utilisation");
        }

        const res = await store.signup({ ...formData, role: role.value });
        if (res) {
            displayMsg({ msg: "Inscription réussie", type: "success" });
            //todo redirect to home
            setTimeout(() => {
                router.push({ name: 'login' });
            }, 2000);
        }else{
            throw new Error("Une erreur est survenue lors de l'inscription");
        }
    } catch (e) {
        console.log(e.message);
        displayMsg({ msg: e.message, type: "error" });

    }
    loading.value = false;
}

// onMounted(() => {
//     console.log(role)
//     if(role.value){
//         document.title = `Panama Agency - Inscription en tant que ${role.value === ROLES.CLIENT ? 'client' : 'freelancer'}`;
//     }else{
//         document.title = `Panama Agency - Inscription`;
//     }
// });

watch(role, val => {
    console.log(val)
    if(val){
        document.title = `Panama Agency - Inscription en tant que ${val === ROLES.CLIENT ? 'client' : 'freelancer'}`;
    }else{
        document.title = `Panama Agency - Inscription`;
    }
});

onMounted(() => {
    console.log(role)
    if(role.value){
        document.title = `Panama Agency - Inscription en tant que ${role.value === ROLES.CLIENT ? 'client' : 'freelancer'}`;
    }else{
        document.title = `Panama Agency - Inscription`;
    }
});

</script>

<template>
    <div class="container auth">
        <div class="left_section">

        </div>
        <div class="right_section">
            <template v-if="role">
                <h3>Inscription en tant que {{ role === ROLES.CLIENT ? "client" : "freelancer" }}</h3>
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
            gap: 10px;
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

            .options {
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