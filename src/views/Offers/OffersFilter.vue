<script setup>
import { ref, defineProps, reactive, watch, computed, onMounted } from "vue";
import SelectField from "@/components/common/SelectField.vue";
import Btn from "@/components/common/Btn.vue";
import InputField from "../../components/common/InputField.vue";
import FiltersService from "@/services/filters.service";

const props = defineProps({
    filters: {
        type: Object,
        required: true,
    },
    onClick: {
        type: Function,
        required: true,
    },
    reset: {
        type: Function,
        required: true,
    },
});

const priceMaxOptions = [
    { name: "5.000€", value: "5000" },
    { name: "10.000€", value: "10000" },
    { name: "100.000€", value: "100000" },
];

const choices = ref([]);
const clearable = computed(() => {
    return (
        props.filters.technos ||
        props.filters.maxPrice ||
        props.filters.minPrice ||
        props.filters.length ||
        props.filters.name
    );
});

onMounted(async () => {
    const res = await FiltersService.getFilters();
    if (!res) return;
    choices.value = res["hydra:member"];
});
</script>

<template>
    <div class="offers-filter">
        <div class="offers-filter__fields">
            <InputField
                v-model="filters.name"
                placeholder="📋 Titre de l'offre"
            />
            <select v-model="filters.technos" placeholder="🧑‍💻 Technologie">
                <option value="" disabled default="true">🧑‍💻 Technologie</option>
                <option
                    v-for="choice in choices.filter((c) => c.type === 'techno')"
                    :value="choice.name"
                >
                    {{ choice.name }}
                </option>
            </select>
            <select v-model="filters.minPrice" placeholder="💵 Prix">
                <option value="" disabled default="true">💵 Prix minimum</option>
                <option 
                    v-for="option in priceMaxOptions"
                    :value="option.value">
                    {{ option.name }}
                </option>
            </select>
            <select v-model="filters.maxPrice" placeholder="💵 Prix">
                <option value="" disabled default="true">💵 Prix maximum</option>
                <option 
                    v-for="option in priceMaxOptions"
                    :value="option.value">
                    {{ option.name }}
                </option>
            </select>
            <select v-model="filters.length" placeholder="⌛ Durée">
                <option value="" disabled default="true">⌛ Durée</option>
                <option value="lt1">Moins d'un mois</option>
                <option value="1">1 mois</option>
                <option value="2">2 mois</option>
                <option value="3">3 mois</option>
                <option value="4">4 mois</option>
                <option value="5">5 mois</option>
                <option value="6">6 mois</option>
                <option value="gt6">Plus de 6 mois</option>
            </select>
        </div>
        <div class="offers-filter__footer">
            <Btn v-if="clearable" :outline="true" @click="() => reset()"
                >Reinitialiser</Btn
            >
            <Btn @click="() => onClick()">Chercher parmis nos offres</Btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
select {
    background: var(--background);
    border: none;
    border-radius: var(--radius-2);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    min-width: 200px;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: "";
    font-size: 1rem;
    color: var(--text-dark);

    &::-ms-expand {
        display: none;
    }
    option:not(:checked) {
        color: var(--text-dark);
        font-size: 1rem;
    }

    option:checked,
    option:active {
        border: 1px solid red;
        color: var(--text-gray) !important;
        font-size: 1rem;
    }

    &::after {
        background-color: red;
    }
}
.offers-filter {
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
