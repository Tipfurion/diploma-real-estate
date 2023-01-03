<template>
    <div class="no-image" :style="{ width: `${width}px`, height: `${height}px` }">
        <n-empty size="large" description="Нет фотографий"> </n-empty>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NEmpty } from 'naive-ui'
export default defineComponent({
    props: {
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
    },
    components: {
        NEmpty,
    },
    setup(props) {},
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.no-image
    display: flex
    justify-content: center
    align-items: center
    padding: 12px
    border: 1px solid $light-gray-2
</style>
