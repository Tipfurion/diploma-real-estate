<template>
    <div>
        <n-image-group>
            <div class="gallery-container">
                <n-image class="gallery-container__item" :src="firstThreeMedia[0].url" width="400" height="312" />
                <n-image class="gallery-container__item" width="200" height="150" :src="firstThreeMedia[1].url" />
                <span class="gallery-container__item" :style="{ width: '200px', height: '150px' }">
                    <n-image :style="{ opacity: '0.3' }" width="200" height="150" :src="firstThreeMedia[2].url" />
                    <div class="more-plug">SHOW MORE</div>
                </span>
                <n-image v-for="media in otherMedia" v-show="false" class="gallery-container__item" :src="media.url" />
            </div>
        </n-image-group>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs, onMounted, PropType } from 'vue'
import { PersonOutlineFilled, DoorBackFilled, SettingsRound } from '@vicons/material'
import { NSpace, NImage, NImageGroup } from 'naive-ui'
import { Media } from '../../types'
export default defineComponent({
    props: {
        media: {
            type: Array as PropType<Media[]>,
            required: true,
        },
    },
    components: {
        NSpace,
        NImage,
        NImageGroup,
    },
    setup(props) {
        const firstThreeMedia = computed(() => props.media.slice(0, 3))
        const otherMedia = computed(() => props.media.slice(3))
        console.log('otherMedia', otherMedia)
        return { firstThreeMedia, otherMedia }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.gallery-container
    width: 620px
    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: repeat(2, 1fr)
    grid-column-gap: 0px
    grid-row-gap: 0px
    grid-column-gap: 12px
    grid-row-gap: 12px
    &__item
        &:nth-child(1)
            grid-area: 1 / 1 / 3 / 2
        &:nth-child(2)
            grid-area: 1 / 2 / 2 / 3
        &:nth-child(3)
            grid-area: 2 / 2 / 3 / 3
.more-plug
    position: relative
    top: -50%
    left: 25%
    pointer-events: none
</style>
