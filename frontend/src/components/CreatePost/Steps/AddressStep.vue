<template>
    <div>
        <n-form-item :feedback="'fesfdsfdsfds'" :validation-status="'error'">
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
            <n-button type="primary" class="next-step-button">Далее</n-button>
        </n-form-item>
        <yandex-map
            v-if="coords?.length"
            class="map"
            v-show="address"
            :controls="mapSettings.controls"
            :coordinates="coords"
            :zoom="17"
        >
        </yandex-map>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NButton, NSelect, NFormItem, NForm } from 'naive-ui'
import { CloseFilled } from '@vicons/material'
import theme from '../../../theme'
import { useCreatePostStore } from '../../../stores/createPostStore'
import api from '../../../api'
import * as _ from 'lodash'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default defineComponent({
    components: { NButton, NSelect, NFormItem, NForm, yandexMap },
    props: {},
    setup(props, { emit }) {
        const formValue = ref()
        const mapSettings = ref({ controls: [] })
        const suggestionsLoading = ref(false)
        const address = ref()
        const suggestions = ref<any[]>([])
        const createPostStore = useCreatePostStore()
        const addressData = computed(() =>
            address.value ? suggestions.value.find((el: any) => el.value === address.value)?.data : null
        )

        const coords = computed(() => (addressData.value ? [addressData.value.geo_lat, addressData.value.geo_lon] : []))
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
        return { suggestions, suggestionsLoading, address, handleSearch, coords, mapSettings, addressData, formValue }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
.map
    width: 1016px
    height: 424px
    margin-top: 56px
.empty-text
    opacity: 0.5
.next-step-button
    margin-left: 24px
    width:  112px
</style>
