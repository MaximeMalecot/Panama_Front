<script setup>
const props = defineProps({
    currentStep: {
        type: Number,
        required: true,
    },
    steps: {
        type: Array,
        required: true,
    }
});

</script>

<template>
    <div class="container">
        <section class="timeline">
            <span v-for="step, idx in steps.map(s => s.title)" class="step_item">
                <p :class="currentStep === idx && 'current'">{{ step }}</p>
            </span>
            <!-- <hr class="line" /> -->
        </section>
    </div>
</template>

<style scoped lang="scss">
.timeline {
    width: 100%;
    height: 80px;
    border: 1px solid gray;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    .line {}

    .step_item {
        width: 60px;
        //height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            font-size: 1rem;
            font-weight: 500;

            &.current {
                font-weight: bolder;
            }
        }

        .icon {
            width: 30px;
            height: 30px;
            background: gray;
        }


    }
}
</style>