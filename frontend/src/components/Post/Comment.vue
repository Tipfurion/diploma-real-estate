<template>
    <div class="comment" :class="{ reply: isReply }">
        <div class="comment__user" @mouseover="hover = true" @mouseleave="hover = false">
            <div class="comment__info__wrapper">
                <n-avatar
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
                <div class="comment__info">
                    <span class="comment__info__user-name">{{ comment.owner.name }}</span>
                    <span class="comment__info__time">{{
                        new Date(comment.createdAt).toLocaleString().slice(0, -3)
                    }}</span>
                </div>
            </div>
            <div class="comment__reply-action" v-show="hover && authStore.logged">
                <n-icon>
                    <reply-filled />
                </n-icon>
                <span class="comment__reply-action__label">Ответить</span>
            </div>
        </div>
        <div class="comment__text">{{ comment.text }}</div>
        <div class="reply-input" v-show="showInput && authStore.logged">
            <n-input
                placeholder="Ответить"
                v-model:value="replyText"
                ref="replyInput"
                type="textarea"
                :autosize="{
                    minRows: 1,
                    maxRows: 5,
                }"
            ></n-input>
            <n-button :disabled="!replyText" class="reply-input__send-btn" type="primary" @click="createComment">
                <template #icon>
                    <n-icon><send-filled /></n-icon>
                </template>
            </n-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs, onMounted, PropType, watch, nextTick } from 'vue'
import { PersonOutlineFilled, ReplyFilled, SendFilled } from '@vicons/material'
import { NAvatar, NIcon, NInput, NButton } from 'naive-ui'
import { useAuthStore } from '@/stores/authStore'
import { Media } from '../../types'
import NoImage from '../NoImage.vue'
import theme from '@/theme'
import api from '../../api'
export default defineComponent({
    components: { NAvatar, NIcon, PersonOutlineFilled, NInput, ReplyFilled, SendFilled, NButton },
    props: {
        comment: {
            type: null,
            required: true,
        },
        activeReplyComment: {
            type: null,
        },
    },
    setup(props, { emit }) {
        const replyInput = ref<any>(null)
        const authStore = useAuthStore()
        const replyText = ref('')
        const hover = ref(false)
        const isReply = computed(() => props.comment.replyToId)
        const showInput = computed(() => props.activeReplyComment?.id == props.comment.id)
        watch(showInput, async (val) => {
            if (val) {
                await nextTick()
                replyInput.value.focus()
                replyText.value = props.activeReplyComment.owner.name + ', '
            }
        })
        const createComment = () => {
            emit('create-comment', {
                text: replyText.value,
                replyToId: props.activeReplyComment.replyToId ?? props.activeReplyComment.id,
            })
        }
        return { theme, isReply, hover, showInput, replyInput, replyText, createComment, authStore }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.comment

    border-bottom: 1px solid $light-gray-1
    margin-top: 8px
    margin-bottom: 8px
    &.reply
        padding-left: 48px
    &__reply-action
        display: flex
        justify-content: center
        align-items: center
    &__user
        cursor: pointer
        display: flex
        align-items: center
        justify-content: space-between
    &__info
        display: flex
        flex-direction: column
        &__user-name
            font-weight: 600
            font-size: 16px
            margin-left: 8px
        &__time
            margin-left: 8px
            font-size: 12px
        &__wrapper
            display: flex
    &__text
        margin-left: 40px
        padding: 8px
.reply-input
    margin-bottom: 12px
    display: flex
    &__send-btn
        margin-left: 12px
</style>
