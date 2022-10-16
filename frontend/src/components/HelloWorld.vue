<template>
    <n-space>
        <n-auto-complete
            v-model:value="value"
            :input-props="{
                autocomplete: 'disabled',
            }"
            :options="options"
            placeholder="Email"
        />
        <div v-for="i in Array.from({ length: 1000 })">1</div>
    </n-space>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { NAutoComplete } from 'naive-ui'

export default defineComponent({
    components: {
        NAutoComplete,
    },
    setup(props) {
        const valueRef = ref('')
        return {
            value: valueRef,
            options: computed(() => {
                return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
                    const prefix = valueRef.value.split('@')[0]
                    return {
                        label: prefix + suffix,
                        value: prefix + suffix,
                    }
                })
            }),
        }
    },
})
</script>
