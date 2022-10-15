<template>
    <n-space>
        <n-button :focusable="false">Default</n-button>
        <n-button type="tertiary" ghost> Tertiary </n-button>
        <n-button type="primary"> Primary </n-button>
        <n-button type="info"> Info </n-button>
        <n-button type="success"> Success </n-button>
        <n-button type="warning"> Warning </n-button>
        <n-button type="error"> Error </n-button>
        <n-auto-complete
            v-model:value="value"
            :input-props="{
                autocomplete: 'disabled',
            }"
            :options="options"
            placeholder="Email"
        />
    </n-space>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { NButton, NAutoComplete } from 'naive-ui'

export default defineComponent({
    components: {
        NButton,
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
