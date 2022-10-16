<template>
    <n-modal :show="showModal" @update-show="updateShow">
        <div class="modal">
            <div class="modal__header">
                <n-button class="close-btn" text :focusable="false" @click="updateShow(false)">
                    <n-icon color="$light-gray-1">
                        <close-filled />
                    </n-icon>
                </n-button>
            </div>
        </div>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NModal, NCard, NButton, NIcon } from 'naive-ui'
import { CloseFilled } from '@vicons/material'
export default defineComponent({
    components: {
        NModal,
        NCard,
        NButton,
        NIcon,
        CloseFilled,
    },
    props: {
        showModal: {
            type: Boolean,
        },
    },
    setup(props, { emit }) {
        const updateShow = (val: boolean) => {
            console.log('upd')

            emit('update:showModal', val)
        }
        const cl = (e: any) => {
            console.log('click', e)
        }
        watch(
            () => props.showModal,
            () => {
                setTimeout(() => {
                    //@ts-ignore
                    document.activeElement.blur()
                })
            }
        )
        return { updateShow, cl }
    },
})
</script>
<style scoped lang="sass">
.modal
    border-radius: 4px
    background-color: white
    width: 500px
    height: 500px
    &__header
        display: flex
        justify-content: flex-end
.close-btn
    font-size: 24px
    padding: 12px
</style>
