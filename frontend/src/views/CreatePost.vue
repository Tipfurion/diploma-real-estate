<template>
    <div>
        <h1>Новое объявление</h1>
        <n-steps v-model:current="currentStepId" :status="currentStepStatus">
            <n-step v-for="step in steps" :title="step.title" :key="step.id" :disabled="step.disabled" />
        </n-steps>
        <component class="step" :is="currentStepComponent" />
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs } from 'vue'
import { PersonOutlineFilled, DoorBackFilled, SettingsRound } from '@vicons/material'
import {
    NAvatar,
    NIcon,
    NButton,
    NSpin,
    NDropdown,
    NForm,
    NFormItem,
    NInput,
    NRadioButton,
    NRadioGroup,
    NStep,
    NSteps,
} from 'naive-ui'
import theme from '@/theme'
import { useCreatePostStore } from '../stores/createPostStore'
import PostTypeStep from '@/components/CreatePost/Steps/PostTypeStep.vue'
import AdressStep from '@/components/CreatePost/Steps/AddressStep.vue'
export default defineComponent({
    components: {
        NAvatar,
        NIcon,
        NDropdown,
        PersonOutlineFilled,
        NButton,
        NSpin,
        NFormItem,
        NInput,
        NRadioButton,
        NRadioGroup,
        NStep,
        NSteps,
    },
    setup() {
        const createPostStore = useCreatePostStore()
        const { steps, currentStepId, currentStepStatus } = toRefs(createPostStore)
        const currentStepComponent = computed(() => {
            switch (currentStepId.value) {
                case 1:
                    return PostTypeStep
                case 2:
                    return AdressStep
                default:
                    break
            }
        })
        return { theme, currentStepStatus, currentStepId, steps, currentStepComponent }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
::v-deep .n-steps
    margin-top: 36px
.step
    margin-top: 56px
</style>
