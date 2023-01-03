<template>
    <div>
        <n-image-group>
            <div class="gallery-container" v-if="firstThreeMedia.length">
                <span
                    class="gallery-container__item"
                    :style="{ width: '400px', height: '312px' }"
                    :class="{ 'no-img': !firstThreeMedia[0] }"
                >
                    <n-image v-if="firstThreeMedia[0]" :src="firstThreeMedia[0].url" width="400" height="312" />
                </span>
                <span
                    class="gallery-container__item"
                    :style="{ width: '200px', height: '150px' }"
                    :class="{ 'no-img': !firstThreeMedia[1] }"
                >
                    <n-image v-if="firstThreeMedia[1]" width="200" height="150" :src="firstThreeMedia[1].url" />
                </span>
                <span
                    class="gallery-container__item"
                    :style="{ width: '200px', height: '150px' }"
                    :class="{ 'no-img': !firstThreeMedia[2] }"
                >
                    <span v-if="firstThreeMedia[2]">
                        <n-image
                            :style="{ filter: otherMedia.length ? 'brightness(0.3)' : '' }"
                            width="200"
                            height="150"
                            :src="firstThreeMedia[2].url"
                        />
                        <div v-if="otherMedia.length" class="more-plug">+{{ otherMedia.length }} фото</div>
                    </span>
                </span>
                <n-image v-for="media in otherMedia" v-show="false" class="gallery-container__item" :src="media.url" />
            </div>
            <div v-else>
                <NoImage :width="596" :height="288" />
            </div>
        </n-image-group>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs, onMounted, PropType } from 'vue'
import { PersonOutlineFilled, DoorBackFilled, SettingsRound } from '@vicons/material'
import { NSpace, NImage, NImageGroup, NEmpty } from 'naive-ui'
import { Media } from '../../types'
import NoImage from '../NoImage.vue'
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
        NEmpty,
        NoImage,
    },
    setup(props) {
        const firstThreeMedia = computed(() => props.media.slice(0, 3))
        const otherMedia = computed(() => props.media.slice(3))
        return { firstThreeMedia, otherMedia }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.gallery-container

    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: repeat(2, 1fr)
    grid-column-gap: 0px
    grid-row-gap: 0px
    grid-column-gap: 12px
    grid-row-gap: 12px
    &__item
        &.no-img
            background-color: $light-gray-2
        &:nth-child(1)
            grid-area: 1 / 1 / 3 / 2
        &:nth-child(2)
            grid-area: 1 / 2 / 2 / 3
        &:nth-child(3)
            grid-area: 2 / 2 / 3 / 3
.more-plug
    color: white
    font-size: 24px
    position: relative
    top: -65%
    left: 25%
    pointer-events: none
</style>
