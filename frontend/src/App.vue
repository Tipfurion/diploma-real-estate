<template>
    <n-config-provider :theme-overrides="theme">
        <app-bar />
        <n-divider v-show="false" />
        <div class="content-wrapper">
            <div class="content">
                <n-button></n-button>
                <router-view></router-view>
            </div>
        </div>
    </n-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NConfigProvider, NDivider } from 'naive-ui'
import AppBar from '@/components/AppBar/AppBar.vue'
import theme from './theme'
export default defineComponent({
    components: {
        NConfigProvider,
        NDivider,
        AppBar,
    },
    setup() {
        return { theme }
    },
})
</script>
<style scoped lang="sass">
.content
    max-width: 1016px
    flex-grow: 1
    padding-top: 56px
.content-wrapper
    flex-grow: 1
    display: flex
    justify-content: center
</style>
