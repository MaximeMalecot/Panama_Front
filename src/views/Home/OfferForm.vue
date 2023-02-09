<script setup>
import { ref, onMounted, computed } from "vue";
import SelectField from "@/components/common/SelectField.vue";
import Btn from "@/components/common/Btn.vue";
import { useRouter } from "vue-router";
import FiltersService from "@/services/filters.service";
import { useAuthStore } from "../../stores/auth";
import { ROLES } from "@/constants/roles";

const authStore = useAuthStore();
const router = useRouter();
const technos = ref("");
const maxPrice = ref(0);

const technoChoices = ref([]);

const canPostOffer = computed(() => {
    const { roles, isVerified } = authStore.userData;
    return (
        authStore.isConnected &&
        roles.includes(ROLES.CLIENT) &&
        isVerified
    );
});

const handleClick = () => {
    const query = {};
    if (technos.value) query.technos = technos.value;
    if (maxPrice.value) query.maxPrice = maxPrice.value;

    router.push({
        name: "offers",
        query,
    });
};

onMounted(async () => {
    const res = await FiltersService.getFilters();
    if (!res) return;
    if (res["hydra:member"]?.length > 0) {
        technoChoices.value = res["hydra:member"].filter(
            (c) => c.type === "techno"
        );
    } else {
        technoChoices.value = [];
    }
});
</script>

<template>
    <div class="offer-form">
        <div class="offer-form__fields">
            <SelectField
                v-model="technos"
                placeholder="🧑‍💻 Technologie"
                :values="[
                    ...technoChoices.map((c) => ({
                        name: c.name,
                        value: c.name,
                    })),
                ]"
            />

            <SelectField
                v-model="maxPrice"
                placeholder="💵 Prix maximum"
                :values="[
                    { name: '5.000€', value: '5000' },
                    { name: '10.000€', value: '10000' },
                    { name: '100.000€', value: '100000' },
                ]"
            />
        </div>
        <div class="offer-form__footer">
            <RouterLink v-if="canPostOffer" class="offer-form__footer__link" :to="{ name: 'new_project' }"
                >Déposer une offre</RouterLink
            >
            <Btn @click="handleClick">Chercher parmis nos offres</Btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.offer-form {
    width: 450px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius-1);
    padding: 1rem;

    &__fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;

        &__link {
            color: var(--text-gray);
            text-decoration: none;
        }
    }
}
</style>
