<template>
    <div class="app-bar">
        <AuthModal v-model:showModal="showAuthModal" />
        <div class="app-bar__content-wrapper">
            <div class="app-bar__content">
                <div class="element-group left">1</div>
                <div class="element-group right">
                    <div class="element-group__menu">
                        <NButton secondary type="primary" :disabled="!logged" :title="controlHoverText">
                            <template #icon>
                                <n-icon>
                                    <favorite-filled />
                                </n-icon>
                            </template>
                            Избранное
                        </NButton>
                        <NButton
                            type="primary"
                            @click="router.push('/create-post')"
                            :disabled="!logged"
                            :title="controlHoverText"
                        >
                            <template #icon>
                                <n-icon>
                                    <plus-filled />
                                </n-icon>
                            </template>
                            Разместить обьявление
                        </NButton>
                    </div>
                    <div class="element-group__auth">
                        <n-spin v-if="authStore.loading" size="medium" />
                        <n-button
                            v-else-if="!logged"
                            type="primary"
                            strong
                            :focusable="false"
                            @click="showAuthModal = true"
                            >ВОЙТИ</n-button
                        >
                        <profile v-else-if="logged" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { PersonOutlineFilled, PlusFilled, FavoriteFilled } from '@vicons/material'
import { NAvatar, NIcon, NButton, NSpin } from 'naive-ui'
import theme from '@/theme'
import { useAuthStore } from '../../stores/authStore'
import AuthModal from '../AuthModal.vue'
import Profile from '../Profile.vue'
import router from '../../routes'
export default defineComponent({
    components: { Profile, NAvatar, NIcon, PersonOutlineFilled, PlusFilled, FavoriteFilled, NButton, AuthModal, NSpin },
    setup() {
        const authStore = useAuthStore()
        const { logged } = toRefs(authStore)
        const showAuthModal = ref(false)
        const controlHoverText = computed(() => (logged.value ? '' : 'Войдите в аккаунт'))
        return { theme, logged, showAuthModal, authStore, router, controlHoverText }
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
    &__menu
        button
            margin-left: 8px
            margin-right: 8px
            &:last-child
                margin-right: 36px
</style>
