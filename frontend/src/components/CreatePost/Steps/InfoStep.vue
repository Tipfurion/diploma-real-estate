<template>
    <div>
        <n-form
            ref="formRef"
            :label-width="150"
            :model="createPostStore.post"
            label-placement="left"
            :style="{ width: '400px' }"
        >
            <n-form-item label="Кол-во комнат" path="createPostStore.post.rooms" required>
                <n-select
                    v-model:value="createPostStore.post.rooms"
                    :options="roomsOptions"
                    :placeholder="placeholder"
                />
            </n-form-item>
            <n-form-item label="Общая площадь" path="createPostStore.post.square" required>
                <n-input v-model:value="createPostStore.post.square" :placeholder="placeholder" />
                <div :style="{ marginLeft: '12px' }">
                    <span>м<sup>2</sup></span>
                </div>
            </n-form-item>
            <n-form-item label="Этаж" path="createPostStore.post.floor" required>
                <n-input-number v-model:value="createPostStore.post.floor" :placeholder="placeholder" :min="1" />
            </n-form-item>
            <n-form-item label="Всего этажей в доме" path="createPostStore.post.maxFloor" required>
                <n-input-number v-model:value="createPostStore.post.maxFloor" :placeholder="placeholder" :min="1" />
            </n-form-item>
        </n-form>
        <n-upload @change="fileLoaded" :default-file-list="fileList" list-type="image-card"> Click to Upload </n-upload>
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
        const fileList = ref()
        const fileLoaded = (e: any) => {
            console.log(e)
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
        return { createPostStore, roomsOptions, placeholder, fileList, fileLoaded }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
</style>
