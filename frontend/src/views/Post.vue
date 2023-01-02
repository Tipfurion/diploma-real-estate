<template>
    <div>
        <div v-if="!loading" :style="{ display: 'flex' }">
            <MediaGallery :media="post.media" />
            <div>1</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs, onMounted } from 'vue'
import { PersonOutlineFilled, DoorBackFilled, SettingsRound } from '@vicons/material'
import { NSpace, NImage, NImageGroup } from 'naive-ui'
import theme from '@/theme'
import api from '../api'
import { useRoute } from 'vue-router'
import { Post } from '../types'
import MediaGallery from '@/components/Post/MediaGallery.vue'
export default defineComponent({
    components: {
        NSpace,
        NImage,
        NImageGroup,
        MediaGallery,
    },
    setup() {
        const loading = ref(true)
        const post = ref<Post | null>(null)
        const route = useRoute()
        onMounted(async () => {
            loading.value = true
            post.value = await api.getOnePost({ id: Number(route.params.postId) }).then((res) => res.data as Post)
            loading.value = false
        })

        return {
            loading,
            post,
        }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.parent
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-template-rows: repeat(5, 1fr)
    grid-column-gap: 0px
    grid-row-gap: 0px
    grid-column-gap: 12px
    grid-row-gap: 12px
.div1
     grid-area: 1 / 1 / 3 / 2
.div2
    grid-area: 1 / 2 / 2 / 3
.div3
    grid-area: 2 / 2 / 3 / 3
</style>
