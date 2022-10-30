<template>
    <n-modal :show="showModal" @update-show="updateShowModal">
        <div class="modal">
            <div class="modal__header">
                <n-button class="close-btn" text :focusable="false" @click="updateShowModal(false)">
                    <n-icon color="$light-gray-1">
                        <close-filled />
                    </n-icon>
                </n-button>
            </div>
            <div class="modal__content">
                <form @submit.prevent="login" v-if="state === 'login'" class="auth login">
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
                            :status="isError"
                            @input="resetErrorMessage"
                        ></n-input>
                        <n-input
                            class="auth__input"
                            v-model:value="password"
                            type="password"
                            show-password-on="click"
                            placeholder="Пароль"
                            size="large"
                            :status="isError"
                            @input="resetErrorMessage"
                        ></n-input>
                        <div class="error-text__wrapper" :class="{ 'error-text__wrapper--hidden': !isError }">
                            <span class="error-text__text">{{ errorMessage || '__' }}</span>
                        </div>
                        <div class="spacer"></div>
                        <div class="change-state-wrapper">
                            <n-button
                                :loading="loading"
                                attr-type="submit"
                                @click="login"
                                class="auth-btn"
                                type="primary"
                                size="large"
                                >Войти
                            </n-button>
                            <n-text class="change-state-text" type="primary" underline @click="changeState('register')">
                                Зарегистрироваться
                            </n-text>
                        </div>
                    </div>
                </form>
                <form @submit.prevent="register" v-if="state === 'register'" class="auth register">
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
                            :status="isError"
                            @input="resetErrorMessage"
                        ></n-input>
                        <n-input
                            class="auth__input"
                            v-model:value="password"
                            type="password"
                            show-password-on="click"
                            placeholder="Пароль"
                            size="large"
                            :status="isError"
                            @input="resetErrorMessage"
                        ></n-input>
                        <n-input
                            class="auth__input"
                            v-model:value="repetedPassword"
                            type="password"
                            show-password-on="click"
                            placeholder="Повторите пароль"
                            size="large"
                            :status="isError"
                            @input="resetErrorMessage"
                        ></n-input>
                        <div class="error-text__wrapper" :class="{ 'error-text__wrapper--hidden': !isError }">
                            <span class="error-text__text">{{ errorMessage || '__' }}</span>
                        </div>
                        <div class="change-state-wrapper">
                            <n-button
                                :loading="loading"
                                attr-type="submit"
                                @click="register"
                                class="auth-btn"
                                type="primary"
                                size="large"
                                >Зарегистрироваться
                            </n-button>
                            <n-text class="change-state-text" type="primary" underline @click="changeState('login')">
                                Войти
                            </n-text>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { NModal, NCard, NButton, NIcon, NInput, NText, NH1, NForm } from 'naive-ui'
import { sanitizePhone } from '@/services/utils'
import api from '@/api/index'
type authState = 'login' | 'register'
import { CloseFilled } from '@vicons/material'
import { useAuthStore } from '../stores/authStore'
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
        const authStore = useAuthStore()
        const state = ref<authState>('login')
        const phone = ref('')
        const password = ref('')
        const repetedPassword = ref('')
        const errorMessage = ref('')
        const loading = ref(false)
        const isError = computed(() => (errorMessage.value ? 'error' : undefined))
        const updateShowModal = (val: boolean) => {
            emit('update:showModal', val)
        }
        const changeState = (val: authState) => {
            errorMessage.value = ''
            phone.value = ''
            password.value = ''
            repetedPassword.value = ''
            state.value = val
        }
        watch(
            () => props.showModal,
            () => changeState('login')
        )
        const resetErrorMessage = () => {
            if (errorMessage.value) errorMessage.value = ''
        }
        const register = async () => {
            loading.value = true
            const { data, error } = await api.register({
                phone: sanitizePhone(phone.value),
                password: password.value,
                repeatedPassword: repetedPassword.value,
            })
            if (error) {
                errorMessage.value = error.message
            } else {
                authStore.loadUser(data.token)
                updateShowModal(false)
            }
            loading.value = false
        }
        const login = async () => {
            loading.value = true
            const { data, error } = await api.login({
                phone: sanitizePhone(phone.value),
                password: password.value,
            })
            if (error) {
                errorMessage.value = error.message
            } else {
                await authStore.loadUser(data.token)
                updateShowModal(false)
            }
            loading.value = false
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
        return {
            updateShowModal,
            changeState,
            register,
            login,
            resetErrorMessage,
            loading,
            phone,
            password,
            repetedPassword,
            state,
            isError,
            errorMessage,
        }
    },
})
</script>
<style scoped lang="sass">
@import '@/vars.sass'
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
.error-text
    &__wrapper
        margin-top: 4px
        text-align: end
        &--hidden
            visibility: hidden
    &__text
        color: $error-color
.spacer
    height: 56px
</style>
