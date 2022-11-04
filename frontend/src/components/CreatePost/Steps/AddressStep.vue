<template>
    <div>
        <n-select
            v-model:value="address"
            filterable
            placeholder="Введите адрес..."
            :options="suggestions"
            :loading="suggestionsLoading"
            clearable
            remote
            @search="handleSearch"
        >
            <template #empty> <span class="empty-text">Нет данных.</span> </template>
        </n-select>
        <yandex-map :style="{ width: '500px', height: '500px' }" :mapSettings :coordinates="coords"> </yandex-map>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NButton, NSelect } from 'naive-ui'
import { CloseFilled } from '@vicons/material'
import theme from '../../../theme'
import { useCreatePostStore } from '../../../stores/createPostStore'
import api from '../../../api'
import * as _ from 'lodash'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default defineComponent({
    components: { NButton, NSelect, yandexMap },
    props: {},
    setup(props, { emit }) {
        const coords = ref([51.74705765822873, 36.080401897901915])
        const mapSettings = ref({ controls: 'smallMapDefaultSet' })
        const suggestionsLoading = ref(false)
        const address = ref()
        const suggestions = ref([])
        const createPostStore = useCreatePostStore()
        const handleSearch = _.debounce(async (query: string) => {
            if (!query.length) {
                suggestions.value = []
                return
            }
            suggestionsLoading.value = true
            suggestions.value = await api
                .getAdressSuggestions({ query })
                .then((res) => res.data.map((el: any) => ({ ...el, label: el.value })))
            suggestionsLoading.value = false
        }, 150)
        return { suggestions, suggestionsLoading, address, handleSearch, coords, mapSettings }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
.empty-text
    scolor: var(--n-action-text-color)
    opacity: 0.5
</style>
