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
import AddressStep from '@/components/CreatePost/Steps/AddressStep.vue'
import InfoStep from '@/components/CreatePost/Steps/InfoStep.vue'
import PriceStep from '@/components/CreatePost/Steps/PriceStep.vue'
import NameAndDescriptionStep from '@/components/CreatePost/Steps/NameAndDescriptionStep.vue'
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
                    return AddressStep
                case 3:
                    return InfoStep
                case 4:
                    return PriceStep
                case 5:
                    return NameAndDescriptionStep
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
:deep .n-steps
    margin-top: 36px
.step
    margin-top: 56px
</style>
