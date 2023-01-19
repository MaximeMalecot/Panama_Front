<script setup>
import { ref, watch } from "vue";
import ToggleBtn from "../../../components/common/ToggleBtn.vue";

const props = defineProps({
    formData: Object
});

const enablePriceRange = ref(false);
const priceRange = ref({
    minPrice: props.formData.price_range.minPrice,
    maxPrice: props.formData.price_range.maxPrice
});

const enableDuration = ref(false);
const duration = ref({
    value: props.formData.duration.value,
    unit: props.formData.duration.unit
});

</script>

<template>
    <div class="step_3">
        <div class="header">
            <h3>Détails</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit obcaecati accusamus vero fugiat, animi
                facere
                odio, sequi dignissimos earum, dicta incidunt nostrum deserunt atque mollitia! Quia neque consequuntur
                accusantium rem?</p>
        </div>
        <div class="content">
            <div class="selector">
                <div class="toggle">
                    <div class="checkbox">
                        <input type="checkbox" @click="enablePriceRange = !enablePriceRange" />
                        <p>Specifier une gamme de prix</p>
                    </div>
                    <p class="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam est mollitia soluta, nostrum
                        quis
                        nulla animi facilis, rerum ex repellat eligendi maiores dolor sequi laborum, ullam aliquid
                        adipisci eum. Illo!</p>
                </div>
                <div class="sub_content" v-show="enablePriceRange">

                </div>
            </div>
            <div class="selector">
                <div class="toggle">
                    <div class="checkbox">
                        <input type="checkbox" @click="enableDuration = !enableDuration" />
                        <p>Specifier une durée pour la mission</p>
                    </div>
                    <p class="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam est mollitia soluta, nostrum
                        quis
                        nulla animi facilis, rerum ex repellat eligendi maiores dolor sequi laborum, ullam aliquid
                        adipisci eum. Illo!</p>
                </div>
                <div class="sub_content" v-show="enableDuration">
                    here
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.step_3 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 10px;

    .header {
        h3 {
            margin: 0;
            padding: 0;
        }
    }

    .content {
        display: flex;
        flex-direction: column;

        .selector {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border);
            
            .toggle {
                width: 100%;
                display: flex;
                flex-direction: column;

                .checkbox {
                    width: 100%;
                    display: flex;
                    p {
                        margin: 0;
                        padding: 0;
                    }
                }

            }

            .description{
                font-size: 14px;
            }
        }
    }
}
</style>