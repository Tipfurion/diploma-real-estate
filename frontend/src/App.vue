<template>
    <n-config-provider :theme-overrides="theme">
        <n-notification-provider>
            <app-bar />
            <n-divider v-show="false" />
            <div class="content-wrapper">
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </n-notification-provider>
    </n-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NConfigProvider, NDivider, NNotificationProvider } from 'naive-ui'
import AppBar from '@/components/AppBar/AppBar.vue'
import theme from './theme'
import { useAuthStore } from './stores/authStore'
export default defineComponent({
    components: {
        NConfigProvider,
        NDivider,
        AppBar,
        NNotificationProvider,
    },
    setup() {
        const authStore = useAuthStore()
        const created = async () => {
            await authStore.checkAndLoadUser()
        }
        created()
        return { theme }
    },
})
</script>
<style lang="sass">
.content
    max-width: 1016px
    flex-grow: 1
    padding-top: 56px
    margin-top: 32px
    margin-bottom: 146px
.content-wrapper
    flex-grow: 1
    display: flex
    justify-content: center
h1, h2, h3, h4, h5, h6
    font-weight: 500 !important
</style>
