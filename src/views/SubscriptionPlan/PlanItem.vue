<script setup>
import { ref, onMounted, defineProps } from "vue";
import Btn from "@/components/common/Btn.vue";

const props = defineProps({
    plan: {
        type: Object,
        required: true,
    },
    onClick: {
        type: Function,
        required: true,
    },
    showBtn: {
        type: Array,
        default: [true, ""],
        required: false,
    },
});
</script>

<template>
    <article class="plan_item">
        <div class="header">
            <h3>{{ plan.name }}</h3>
            <div class="price">
                <span class="amount">{{ plan.price }}$</span>
                <span class="details">Prix TTC</span>
            </div>
        </div>
        <div class="content">
            <div class="description">
                <p>{{ plan.description }}</p>
            </div>
            <!-- <p class="description">{{ plan.description }}</p> -->
            <div class="action">
                <Btn v-if="showBtn[0]" @click="() => onClick(plan.id)"
                    >COMMENCER</Btn
                >
                <template v-else>
                    <Btn :outline="true">Action indisponible</Btn>
                    <span>{{ showBtn[1] }}</span>
                </template>
            </div>
        </div>
        <div class="footer">
            <span> Offre soumise aux Conditions générales. </span>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.plan_item {
    margin: 1rem;
    background: #ffffff;
    box-shadow: 2px 7px 22px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    height: 500px;
    animation: fadeIn 0.5s ease-in-out;

    .header {
        padding: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(64.17deg, #ea4e4e 3.33%, #ff2e00 97.32%);

        * {
            color: white;
        }

        h3 {
            font-size: 1.5rem;
        }

        .price {
            display: flex;
            flex-direction: column;
            .amount {
                font-weight: bold;
                font-size: 2.3rem;
            }

            .details {
                font-size: 0.8rem;
            }
        }
    }

    .content {
        padding: 0 1.4rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 100%;

        .description {
            max-height: 60%;
            overflow: auto;
        }

        .action {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            gap: 5px;

            span {
                ///font-size: 0.8rem;
            }
        }
    }

    .footer {
        padding: 1.4rem;
        font-size: 0.8rem;
    }
}
</style>
