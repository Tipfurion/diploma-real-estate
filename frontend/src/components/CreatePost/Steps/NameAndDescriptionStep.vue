<template>
    <div>
        <div class="form-wrapper">
            <div>
                <n-form
                    ref="formRef"
                    :label-width="150"
                    :model="info"
                    label-placement="left"
                    :style="{ width: '650px' }"
                >
                    <n-form-item label="Название объявления" path="info.name" required>
                        <n-input class="input" v-model:value="info.name" :placeholder="placeholder" />
                    </n-form-item>
                    <n-form-item label="Описание" path="info.description" required>
                        <n-input
                            class="input"
                            type="textarea"
                            v-model:value="info.description"
                            :placeholder="placeholder"
                            :autosize="{
                                minRows: 5,
                                maxRows: 15,
                            }"
                        />
                    </n-form-item>
                </n-form>
            </div>
            <div class="form-wrapper__next-btn-wrapper">
                <n-button
                    :loading="loading"
                    @click="createPost"
                    :disabled="!formValid"
                    type="primary"
                    class="next-step-button"
                    >Завершить</n-button
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NButton, NSelect, NFormItem, NForm, NInput, NInputNumber, NText, NIcon } from 'naive-ui'
import theme from '../../../theme'
import { useCreatePostStore } from '../../../stores/createPostStore'
import { useNotification } from 'naive-ui'
import * as _ from 'lodash'
export default defineComponent({
    components: {
        NButton,
        NSelect,
        NFormItem,
        NForm,
        NInput,
        NInputNumber,
        NText,
        NIcon,
    },
    props: {},
    setup(props, { emit }) {
        const loading = ref(false)
        const notification = useNotification()
        const createPostStore = useCreatePostStore()
        const placeholder = ref('Не выбрано')
        const info = ref<any>({
            name: '',
            description: '',
        })

        const formValid = computed(() => {
            const requiredKeys = ['name']
            return requiredKeys.every((key: string) => info.value[key])
        })
        const createPost = async () => {
            loading.value = true
            createPostStore.setPostProps({
                name: info.value.name,
                description: info.value.description,
            })
            const { data, error } = await createPostStore.createPost()
            const notificationText = error ? 'Ошибка при создании объявления' : 'Обьявление создано!'
            const notificationType = error ? 'error' : 'success'
            notification[notificationType]({
                content: notificationText,
                duration: 3500,
                keepAliveOnHover: true,
            })
            loading.value = false
        }

        return {
            createPostStore,
            placeholder,
            info,
            formValid,
            loading,
            createPost,
        }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
.input
    width: 470px
.form-wrapper
    display: flex
    &__next-btn-wrapper
        width: 100%
        display: flex
        justify-content:  flex-end
.next-step-button
    width: 160px
</style>
