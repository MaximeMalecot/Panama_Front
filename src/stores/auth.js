import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import jwt_decode from "jwt-decode";
import { TOKEN_STORAGE_KEY } from "../constants/storage_keys";

const checkToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        if (decoded.exp > Date.now() / 1000) {
            return decoded;
        }else{
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
};

const emptyUserData = {
    id: null,
    username: null,
    email: null,
    role: null,
    token: null,
};

export const useAuthStore = defineStore('auth', () => {
    const userData = ref(emptyUserData);
    const isConnected = computed(() => !!userData.value.token);

    function tryLogin(){
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if( token ){
            const decoded = checkToken(token);
            if( decoded ){
                userData.value = {...decoded, token};
            }
        }
    }

    function login(email, password){
        if( !email || !password ){
            return;
        }
        //userData.value = {...emptyUserData, token: ''};
    }

    function signup(email, password, accountType){
        if( !email || !password || !accountType ){
            return;
        }
        //userData.value = {...emptyUserData, token: ''};
    }

    return { userData, tryLogin, isConnected, login };
  })