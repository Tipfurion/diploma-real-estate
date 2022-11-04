<template>
    <n-dropdown
        placement="bottom-start"
        size="large"
        trigger="click"
        :options="actions"
        @select="handleActionSelect"
        :width="160"
    >
        <div class="profile">
            <span class="profile__phone">{{ maskedPhone }}</span>
            <n-avatar
                class="profile__avatar"
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
    </n-dropdown>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed } from 'vue'
import { PersonOutlineFilled, DoorBackFilled, SettingsRound } from '@vicons/material'
import { NAvatar, NIcon, NButton, NSpin, NDropdown } from 'naive-ui'
import parsePhoneNumber from 'libphonenumber-js'
import theme from '@/theme'
import { useAuthStore } from '../stores/authStore'
const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon),
        })
    }
}
export default defineComponent({
    components: { NAvatar, NIcon, NDropdown, PersonOutlineFilled, NButton, NSpin },
    setup() {
        const authStore = useAuthStore()
        const maskedPhone = computed(() =>
            authStore.logged ? parsePhoneNumber(authStore.user!.phoneNumber)?.formatInternational() : ''
        )
        const actions = [
            {
                label: 'Настройки',
                key: 'settings',
                disabled: true,
                icon: renderIcon(SettingsRound),
            },
            {
                label: 'Выход',
                key: 'logout',
                icon: renderIcon(DoorBackFilled),
            },
        ]
        const handleActionSelect = (action: string) => {
            switch (action) {
                case 'logout':
                    authStore.logout()
                    break
                default:
                    break
            }
        }
        return { theme, actions, handleActionSelect, authStore, parsePhoneNumber, maskedPhone }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.profile
    cursor: pointer
    display: flex
    align-items: center
    &__phone
        margin-right: 12px
</style>
