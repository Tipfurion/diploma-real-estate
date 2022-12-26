<template>
    <div>
        <div class="form-wrapper">
            <div>
                <n-form
                    ref="formRef"
                    :label-width="150"
                    :model="info"
                    label-placement="left"
                    :style="{ width: '450px' }"
                >
                    <n-form-item label="Квартира" path="info.flat">
                        <n-input-number
                            class="input"
                            v-model:value="info.flat"
                            :placeholder="placeholder"
                            :min="1"
                            :show-button="false"
                        />
                    </n-form-item>
                    <n-form-item label="Кол-во комнат" path="info.rooms" required>
                        <n-select
                            class="input"
                            v-model:value="info.rooms"
                            :options="roomsOptions"
                            :placeholder="placeholder"
                        />
                    </n-form-item>
                    <n-form-item label="Общая площадь" path="info.square" required>
                        <n-input-number class="input" v-model:value="info.square" :placeholder="placeholder" />
                        <div :style="{ marginLeft: '12px' }">
                            <span>м<sup>2</sup></span>
                        </div>
                    </n-form-item>
                    <n-form-item label="Всего этажей в доме" path="info.maxFloor" required>
                        <n-input-number
                            class="input"
                            v-model:value="info.maxFloor"
                            :placeholder="placeholder"
                            :min="1"
                        />
                    </n-form-item>
                    <n-form-item label="Этаж" path="info.floor" required>
                        <n-input-number
                            class="input"
                            v-model:value="info.floor"
                            :placeholder="placeholder"
                            :min="1"
                            :max="info.maxFloor ?? Number.MAX_SAFE_INTEGER"
                        />
                    </n-form-item>
                </n-form>
            </div>
            <div class="form-wrapper__next-btn-wrapper">
                <n-button @click="nextStep" :disabled="!formValid" type="primary" class="next-step-button"
                    >Далее</n-button
                >
            </div>
        </div>
        <h3>Изображения</h3>
        <n-upload :multiple="true" @change="fileLoaded" list-type="image-card"> Загрузить изображение </n-upload>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import {
    NButton,
    NSelect,
    NFormItem,
    NForm,
    NInput,
    NInputGroup,
    NInputGroupLabel,
    NInputNumber,
    NUpload,
    NText,
    NUploadDragger,
    NIcon,
} from 'naive-ui'
import { ArchiveOutlined } from '@vicons/material'
import theme from '../../../theme'
import { useCreatePostStore } from '../../../stores/createPostStore'
import api from '../../../api'
import * as _ from 'lodash'
export default defineComponent({
    components: {
        NButton,
        NSelect,
        NFormItem,
        NForm,
        NInput,
        NInputGroup,
        NInputGroupLabel,
        NInputNumber,
        NUpload,
        NText,
        NUploadDragger,
        ArchiveOutlined,
        NIcon,
    },
    props: {},
    setup(props, { emit }) {
        const createPostStore = useCreatePostStore()
        const placeholder = ref('Не выбрано')
        const notRequiredFields = ['flat']
        const info = ref<any>({
            flat: null,
            rooms: null,
            square: null,
            floor: null,
            maxFloor: null,
            fileList: [],
        })
        const fileLoaded = (e: any) => {
            info.value.fileList = e.fileList
        }
        const formValid = computed(() =>
            Object.keys(info.value)
                .filter((key) => !notRequiredFields.includes(key))
                .every((key: string) => !_.isNil(info.value[key]))
        )
        const nextStep = () => {
            createPostStore.setPostProps({
                flat: info.value.flat,
                rooms: info.value.rooms,
                square: info.value.square,
                floor: info.value.floor,
                maxFloor: info.value.maxFloor,
                fileList: info.value.fileList,
            })
            createPostStore.nextStep()
        }
        const roomsOptions = ref([
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6+', label: '6+' },
            { value: 'studio', label: 'Студия' },
        ])
        return {
            createPostStore,
            roomsOptions,
            placeholder,
            fileLoaded,
            nextStep,
            info,
            formValid,
        }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
.input
    width: 270px
.form-wrapper
    display: flex
    &__next-btn-wrapper
        width: 100%
        display: flex
        justify-content:  flex-end
.next-step-button
    width: 160px
:deep .n-upload-trigger.n-upload-trigger--image-card
    width: 124px
    height: 124px
:deep .n-upload-file-list .n-upload-file.n-upload-file--image-card-type
    width: 124px
    height: 124px
:deep .n-upload-file-list.n-upload-file-list--grid
    grid-template-columns: repeat(auto-fill, 124px)
</style>
