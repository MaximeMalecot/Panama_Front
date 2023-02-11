import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import jwt_decode from "jwt-decode";
import { TOKEN_STORAGE_KEY } from "../constants/storage_keys";
import { ROLES } from "../constants/roles";
import AuthService from "../services/auth.service";
import { useRouter } from "vue-router";

const checkToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        const current_time = Date.now() / 1000;
        const hasExpired = decoded.exp < current_time;
        if(!!hasExpired) throw new Error("Token has expired");
        return decoded;
    } catch (e) {
        console.error(e.message);
        return null;
    }
};

const emptyUserData = {
    id: null,
    username: null,
    email: null,
    roles: [],
    token: null,
};

export const useAuthStore = defineStore("auth", () => {
    const router = useRouter();
    const userData = ref(emptyUserData);
    const isConnected = computed(() => !!userData.value.token);
    const isSubscribed = computed(() => !!(userData.value?.roles).includes(ROLES.FREELANCER_PREMIUM));

    function tryLogin() {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!token) return;
        const decoded = checkToken(token);
        if( !decoded ){
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            userData.value = emptyUserData;
            return;
        }
        userData.value = { ...decoded, token };
    }

    async function login(email, password) {
        if (!email || !password) {
            return;
        }
        const res = await AuthService.login(email, password);
        if (res && res?.token) {
            const decoded = checkToken(res.token);
            if (decoded) {
                localStorage.setItem(TOKEN_STORAGE_KEY, res.token);
                userData.value = { ...decoded, token: res.token };
                return true;
            }
        }
        return false;
    }

    async function signup(payload) {
        const { name, surname, email, password: plainPassword, role } = payload;
        if (!email || !plainPassword || !role) {
            return;
        }
        const res = await AuthService.signup({
            name,
            surname,
            email,
            plainPassword,
            roles: [role],
        });
        return res;
    }

    function logout() {
        router.push({ name: "home" });
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        userData.value = emptyUserData;
    }

    return { userData, tryLogin, isConnected, isSubscribed, login, signup, logout };
});
