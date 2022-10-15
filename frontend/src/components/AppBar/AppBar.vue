<template>
    <div class="app-bar">
        <div class="app-bar__content-wrapper">
            <div>1</div>
            <div>2</div>
            <n-avatar round size="large" @click="() => {}">
                <n-icon>
                    <person-16-regular />
                </n-icon>
            </n-avatar>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Person16Regular } from '@vicons/fluent'
import { NAvatar, NIcon } from 'naive-ui'
export default defineComponent({
    components: { NAvatar, NIcon, Person16Regular },
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
