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
            <div class="modal__content">
                <div v-if="state === 'login'" class="auth login">
                    <div class="form">
                        <div class="title-wrapper">
                            <n-h1>
                                <n-text> Войти </n-text>
                            </n-h1>
                        </div>
                        <n-input
                            class="auth__input"
                            v-model:value="phone"
                            type="text"
                            placeholder="Номер телефона"
                            v-maska="'+7 (###) ###-##-##'"
                            size="large"
                        ></n-input>
                        <n-input
                            class="auth__input"
                            v-model:value="password"
                            type="password"
                            placeholder="Пароль"
                            size="large"
                        ></n-input>
                        <div class="change-state-wrapper">
                            <n-button class="auth-btn" type="primary" size="large">Войти </n-button>
                            <n-text class="change-state-text" type="primary" underline @click="changeState('register')">
                                Зарегистрироваться
                            </n-text>
                        </div>
                    </div>
                </div>
                <div v-if="state === 'register'" class="auth register">
                    <div class="form">
                        <div class="title-wrapper">
                            <n-h1>
                                <n-text> Зарегистрироваться </n-text>
                            </n-h1>
                        </div>
                        <n-input
                            class="auth__input"
                            v-model:value="phone"
                            type="text"
                            placeholder="Номер телефона"
                            v-maska="'+7 (###) ###-##-##'"
                            size="large"
                        ></n-input>
                        <n-input
                            class="auth__input"
                            v-model:value="password"
                            type="password"
                            placeholder="Пароль"
                            size="large"
                        ></n-input>
                        <n-input
                            class="auth__input"
                            v-model:value="repetedPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            size="large"
                        ></n-input>
                        <div class="change-state-wrapper">
                            <n-button @click="register" class="auth-btn" type="primary" size="large"
                                >Зарегистрироваться
                            </n-button>
                            <n-text class="change-state-text" type="primary" underline @click="changeState('login')">
                                Войти
                            </n-text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NModal, NCard, NButton, NIcon, NInput, NText, NH1 } from 'naive-ui'
import api from '@/api/index'
type authState = 'login' | 'register'
import { CloseFilled } from '@vicons/material'
export default defineComponent({
    components: {
        NModal,
        NCard,
        NButton,
        NIcon,
        CloseFilled,
        NInput,
        NText,
        NH1,
    },
    props: {
        showModal: {
            type: Boolean,
        },
    },
    setup(props, { emit }) {
        const state = ref<authState>('login')
        const phone = ref('')
        const password = ref('')
        const repetedPassword = ref('')
        const error = ref('')
        const updateShow = (val: boolean) => {
            emit('update:showModal', val)
        }
        const changeState = (val: authState) => {
            phone.value = ''
            password.value = ''
            repetedPassword.value = ''
            state.value = val
        }
        const register = async () => {
            const { data, error } = await api.register({
                phone: phone.value,
                password: password.value,
                repeatedPassword: repetedPassword.value,
            })
            if (error) {
                error.value = error
            }
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
        return { updateShow, changeState, register, phone, password, repetedPassword, state }
    },
})
</script>
<style scoped lang="sass">
.modal
    border-radius: 4px
    background-color: white
    width: 500px
    height: 400px
    &__header
        display: flex
        justify-content: flex-end

.close-btn
    font-size: 24px
    padding: 12px
.auth
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    &__input
        margin-top: 16px
.form
    width: 400px
    height: 100%
.title-wrapper
    text-align: center
.change-state-wrapper
    margin-top: 24px
    display: flex
    justify-content: space-between
    align-items: flex-end
.change-state-text
    cursor: pointer
    font-size: 16px
.auth-btn
    min-width: 150px
</style>
