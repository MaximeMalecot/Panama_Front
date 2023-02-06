import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import jwt_decode from "jwt-decode";
import { TOKEN_STORAGE_KEY } from "../constants/storage_keys";
import AuthService from "../services/auth.service";

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
    roles: null,
    token: null,
};

export const useAuthStore = defineStore("auth", () => {
    const userData = ref(emptyUserData);
    const isConnected = computed(() => !!userData.value.token);

    function tryLogin() {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!token) return;
        const decoded = checkToken(token);
        if( !decoded ) return;
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
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        userData.value = emptyUserData;
    }

    return { userData, tryLogin, isConnected, login, signup, logout };
});
