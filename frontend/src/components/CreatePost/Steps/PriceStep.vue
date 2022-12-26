<template>
    <div>
        <div class="form-wrapper">
            <div>
                <n-form
                    ref="formRef"
                    :label-width="150"
                    :model="priceInfo"
                    label-placement="left"
                    :style="{ width: '450px' }"
                >
                    <n-form-item
                        v-if="createPostStore.post.type === 'rent'"
                        label="Период оплаты"
                        path="priceInfo.pricePeriod"
                        required
                    >
                        <n-select
                            class="input"
                            v-model:value="priceInfo.pricePeriod"
                            :options="pricePeriodOptions"
                            :placeholder="placeholder"
                        />
                    </n-form-item>
                    <n-form-item label="Цена" path="priceInfo.price" required>
                        <n-input-number
                            class="input"
                            v-model:value="priceInfo.price"
                            :placeholder="placeholder"
                            :min="1"
                            :show-button="false"
                            :parse="parseCurrency"
                            :format="formatCurrency"
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
        const priceInfo = ref<any>({
            pricePeriod: null,
            price: null,
        })
        const formatCurrency = (value: number | null) => {
            if (value === null) return ''
            return `${value.toLocaleString('ru-RU')} ₽`
        }
        const parseCurrency = (input: string) => {
            const nums = input.replace(/(,|\₽|\s)/g, '').trim()
            if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
            return nums === '' ? null : Number.NaN
        }
        const formValid = computed(() => {
            const requiredKeys = createPostStore.post.type === 'rent' ? ['pricePeriod', 'price'] : ['price']
            return requiredKeys.every((key: string) => !_.isNil(priceInfo.value[key]))
        })
        const nextStep = () => {
            createPostStore.setPostProps({
                price: priceInfo.value.price,
                pricePeriod: priceInfo.value.pricePeriod,
            })
            createPostStore.nextStep()
        }
        const pricePeriodOptions = ref([
            { value: 'day', label: 'День' },
            { value: 'month', label: 'Месяц' },
        ])
        return {
            createPostStore,
            placeholder,
            nextStep,
            priceInfo,
            pricePeriodOptions,
            formValid,
            formatCurrency,
            parseCurrency,
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
</style>
