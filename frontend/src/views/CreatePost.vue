<template>
    <div>Create post</div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed } from 'vue'
import { PersonOutlineFilled, DoorBackFilled, SettingsRound } from '@vicons/material'
import { NAvatar, NIcon, NButton, NSpin, NDropdown } from 'naive-ui'
import theme from '@/theme'
import { useAuthStore } from '../stores/authStore'

export default defineComponent({
    components: { NAvatar, NIcon, NDropdown, PersonOutlineFilled, NButton, NSpin },
    setup() {
        return { theme }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
</style>
