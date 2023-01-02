<template>
    <div>
        <n-form-item :feedback="errorText" :validation-status="selectStatus">
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
            <n-button @click="nextStep" :disabled="!addressValid" type="primary" class="next-step-button"
                >Далее</n-button
            >
        </n-form-item>
        <yandex-map
            v-if="coords?.length"
            class="map"
            v-show="address"
            :controls="mapSettings.controls"
            :coordinates="coords"
            :zoom="16"
        >
            <yandex-marker
                v-if="coords?.length"
                :coordinates="coords"
                :marker-id="'current-address'"
                :options="{
                    preset: 'islands#circleIcon',
                    iconColor: theme.common.primaryColor,
                }"
            >
            </yandex-marker>
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
declare module 'vue-yandex-maps'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default defineComponent({
    components: { NButton, NSelect, NFormItem, NForm, yandexMap, ymapMarker },
    props: {},
    setup(props, { emit }) {
        const formValue = ref()
        const mapSettings = ref({ controls: [] })
        const suggestionsLoading = ref(false)
        const address = ref()
        const suggestions = ref<any[]>([])
        const createPostStore = useCreatePostStore()
        const errorText = ref('')
        const selectStatus = computed(() => (errorText.value ? 'error' : undefined))
        const addressData = computed(() =>
            address.value ? suggestions.value.find((el: any) => el.value === address.value)?.data : null
        )
        const addressValid = computed(() => Boolean(addressData.value?.house))

        const coords = computed(() => (addressData.value ? [addressData.value.geo_lat, addressData.value.geo_lon] : []))
        const handleSearch = _.debounce(async (query: string) => {
            if (!query.length) {
                suggestions.value = []
                return
            }
            suggestionsLoading.value = true
            suggestions.value = await api
                .getAdressSuggestions({ query })
                .then((res: any) => res.data.map((el: any) => ({ ...el, label: el.value })))
            suggestionsLoading.value = false
        }, 150)
        watch(addressData, (v) => {
            if (!v) {
                errorText.value = ''
                return
            }
            if (!v.house) {
                errorText.value = 'Адрес не содержит номер дома'
            }
        })

        const nextStep = () => {
            createPostStore.setPostProps({
                address: address.value,
                country: addressData.value.country,
                city: addressData.value.city,
                house: addressData.value.house,
                geoLat: addressData.value.geo_lat,
                geoLon: addressData.value.geo_lon,
            })
            createPostStore.nextStep()
        }

        return {
            suggestions,
            suggestionsLoading,
            address,
            handleSearch,
            coords,
            mapSettings,
            addressData,
            formValue,
            errorText,
            selectStatus,
            theme,
            addressValid,
            nextStep,
        }
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
