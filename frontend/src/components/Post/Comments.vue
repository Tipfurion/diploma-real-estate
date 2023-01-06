<template>
    <div>
        <div class="comments__label">Вопросы и комментарии ({{ commentsCount }})</div>
        <div class="create-comment-input">
            <n-input
                @focus="activeReplyComment = null"
                :disabled="!authStore.logged"
                :title="authStore.logged ? '' : 'Войдите чтобы оставить комментарий'"
                placeholder="Задайте вопрос или оставьте комментарий"
                v-model:value="createCommentText"
                ref="replyInput"
                type="textarea"
                :autosize="{
                    minRows: 1,
                    maxRows: 5,
                }"
            ></n-input>
            <n-button
                class="create-comment-input__send-btn"
                type="primary"
                :title="authStore.logged ? '' : 'Войдите чтобы оставить комментарий'"
                :disabled="!createCommentText && !authStore.logged"
                @click="createComment({ text: createCommentText, replyToId: null })"
            >
                <template #icon>
                    <n-icon><send-filled /></n-icon>
                </template>
            </n-button>
        </div>
        <div v-for="comment in orderedComments" :key="comment.id">
            <Comment
                :comment="comment"
                @click="commentClick(comment)"
                :activeReplyComment="activeReplyComment"
                @create-comment="createComment"
            />
            <div class="comments__replies">
                <Comment
                    v-for="reply in comment.replies"
                    :key="reply.id"
                    :comment="reply"
                    :activeReplyComment="activeReplyComment"
                    @click="commentClick(reply)"
                    @create-comment="createComment"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs, onMounted, PropType } from 'vue'
import { SendFilled } from '@vicons/material'
import { NInput, NButton, NIcon } from 'naive-ui'
import Comment from '@/components/Post/Comment.vue'
import { useAuthStore } from '@/stores/authStore'
import api from '../../api'
const commentDateSortDesc = (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
const commentDateSortAsc = (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
export default defineComponent({
    components: { Comment, NInput, NButton, NIcon, SendFilled },
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const loading = ref(true)
        const createCommentText = ref('')
        const activeReplyComment = ref<any>(null)
        const comments = ref<any[]>([])
        const authStore = useAuthStore()
        const orderedComments = computed(() =>
            comments.value
                .sort(commentDateSortDesc)
                .map((el) => Object.assign({}, el, el.replies.sort(commentDateSortAsc)))
        )
        const commentsCount = computed(() => comments.value.reduce((a, v) => a + 1 + v.replies.length, 0))
        onMounted(async () => {
            loading.value = true
            comments.value = await api.getPostComments({ postId: props.postId }).then((res) => res.data)
            loading.value = false
        })
        const commentClick = (comment: any) => {
            activeReplyComment.value = comment
        }
        const createComment = async (params: { text: string; replyToId: number | null }) => {
            const createdComment = await api.createComment({ ...params, postId: props.postId }).then((res) => res.data)
            if (createdComment.replyToId) {
                const commentToReply = comments.value.find((el) => el.id === createdComment.replyToId)
                commentToReply.replies.push(createdComment)
            } else {
                comments.value.push({ ...createdComment, replies: [] })
            }
            activeReplyComment.value = null
            createCommentText.value = ''
        }
        return {
            loading,
            comments,
            commentsCount,
            activeReplyComment,
            orderedComments,
            authStore,
            createCommentText,
            commentClick,
            createComment,
        }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.comments
    &__label
        font-size: 16px
        font-weight: 600
        margin-bottom: 12px
.create-comment-input
    margin-bottom: 12px
    display: flex
    &__send-btn
        margin-left: 12px
</style>
