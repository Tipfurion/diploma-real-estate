<template>
    <div class="app-bar">
        <AuthModal v-model:showModal="showAuthModal" />
        <div class="app-bar__content-wrapper">
            <div class="app-bar__content">
                <div class="element-group left">1</div>
                <div class="element-group right">
                    <n-button v-if="!logged" type="primary" strong :focusable="false" @click="showAuthModal = true"
                        >ВОЙТИ</n-button
                    >
                    <n-avatar
                        v-if="logged"
                        round
                        size="large"
                        @click="() => {}"
                        :style="{
                            backgroundColor: theme.common.primaryColor,
                        }"
                    >
                        <n-icon>
                            <person-outline-filled />
                        </n-icon>
                    </n-avatar>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { PersonOutlineFilled } from '@vicons/material'
import { NAvatar, NIcon, NButton } from 'naive-ui'
import theme from '@/theme'
import { useAuthStore } from '../../stores/authStore'
import AuthModal from '../AuthModal.vue'
export default defineComponent({
    components: { NAvatar, NIcon, PersonOutlineFilled, NButton, AuthModal },
    setup() {
        const authStore = useAuthStore()
        const { logged } = toRefs(authStore)
        const showAuthModal = ref(true)
        return { theme, logged, showAuthModal }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.app-bar
    z-index: 1999
    position: fixed
    height: 56px
    width: 100%
    background-color: white
    border-bottom: 1px solid $light-gray-1
    flex-grow: 1
    display: flex
    justify-content: center
    &__content-wrapper
        max-width: 1016px
        flex-grow: 1
    &__content
        height: 100%
        display: flex
        justify-content: space-between
        align-items: center
.element-group
    display: flex
    justify-content: space-between
    align-items: center
</style>
