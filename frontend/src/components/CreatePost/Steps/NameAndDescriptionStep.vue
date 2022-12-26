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
                    @click="createPostStore.createPost"
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

        return {
            createPostStore,
            placeholder,
            info,
            formValid,
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
