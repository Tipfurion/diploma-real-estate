<template>
    <div class="post-type-buttons">
        <n-button
            class="post-type-button"
            strong
            secondary
            type="primary"
            v-for="postType in postTypes"
            :key="postType.value"
            size="large"
            @click="setPostType"
        >
            {{ postType.label }}
        </n-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NButton } from 'naive-ui'
import { CloseFilled } from '@vicons/material'
import theme from '../../../theme'
import { useCreatePostStore } from '../../../stores/createPostStore'

export default defineComponent({
    components: { NButton },
    props: {
        showModal: {
            type: Boolean,
        },
    },
    setup(props, { emit }) {
        const postTypes = ref([
            { label: 'Продажа', value: 'sell' },
            { label: 'Аренда', value: 'rent' },
        ])
        const createPostStore = useCreatePostStore()
        const setPostType = (val: 'sell' | 'rent') => {
            createPostStore.setPostProps({ type: val })
            createPostStore.nextStep()
        }
        return { postTypes, theme, setPostType }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
.post-type-buttons
    display: flex
    gap: 24px
.post-type-button
    width: 240px
    height: 120px
</style>
