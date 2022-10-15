<template>
    <div class="app-bar">
        <div class="app-bar__content-wrapper">
            <div>1</div>
            <div>2</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {}
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.app-bar
    z-index: 10000
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
</style>
