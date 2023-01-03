<template>
    <div>
        <div v-if="!loading && post">
            <div class="grid">
                <div class="grid-item">
                    <div class="post__name">{{ post.name }}</div>
                    <div class="post__address">{{ post.address }}</div>
                    <MediaGallery :media="post.media" />

                    <div class="post__home-info">
                        <div class="post__home-info__item">
                            <div class="post__home-info__item__value">
                                <span>{{ post.square }}</span>
                                <span> м<sup>2</sup></span>
                            </div>
                            <div class="post__home-info__item__title">Площадь</div>
                        </div>
                        <div class="post__home-info__item">
                            <div class="post__home-info__item__value">
                                <span>{{ post.floor }}</span>
                                <span> из </span>
                                <span>{{ post.maxFloor }}</span>
                            </div>
                            <div class="post__home-info__item__title">Этаж</div>
                        </div>
                        <div class="post__home-info__item">
                            <div class="post__home-info__item__value">
                                <span>{{ rooms }}</span>
                            </div>
                            <div class="post__home-info__item__title">Комнат</div>
                        </div>
                        <div class="post__home-info__item"></div>
                        <div class="post__home-info__item"></div>
                    </div>
                    <div class="post__description">
                        <span class="post__description__label">Описание:</span>
                        <div class="post__description__text">
                            <span>{{ post.description }}</span>
                        </div>
                    </div>
                    <div class="post__map">
                        <span class="post__map__label">На карте:</span>
                        <yandex-map class="map" :controls="mapSettings.controls" :coordinates="coords" :zoom="16">
                            <yandex-marker
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
                </div>
                <div class="grid-item">
                    <div class="post__price">
                        <span>{{ Intl.NumberFormat('ru').format(post.price) }} ₽</span>
                        <span v-if="post.pricePeriod">/{{ getPricePeriodText(post.pricePeriod) }} </span>
                    </div>
                    <div class="post__owner">
                        <n-avatar
                            class="profile__avatar"
                            round
                            size="large"
                            @click="() => {}"
                            :style="{
                                backgroundColor: theme.common.primaryColor,
                            }"
                        >
                            <n-icon>
                                <person-outline-filled />
                            </n-icon>
                        </n-avatar>
                        <div class="post__owner__info">
                            <div class="post__owner__info__name">{{ post.owner.name }}</div>
                            <div class="post__owner__info__phone">
                                <span>{{ ownerPhoneNumber }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="post__contact">
                        <a
                            class="post__contact__link"
                            :href="ownerWhatsappLink"
                            :style="{ color: theme.common.primaryColor }"
                        >
                            <span>Написать в whatsapp</span>
                            <n-icon class="post__contact__link__icon" size="20">
                                <whatsapp-filled />
                            </n-icon>
                        </a>
                        <a
                            class="post__contact__link"
                            :href="ownerTelegramLink"
                            :style="{ color: theme.common.primaryColor }"
                        >
                            <span>Написать в telegram</span>
                            <n-icon class="post__contact__link__icon" size="20">
                                <telegram-filled />
                            </n-icon>
                        </a>
                    </div>
                    <div class="post__views">
                        <div class="post__views__title">Просмотров обьявления:</div>
                        <div>Всего - 666</div>
                        <div>Сегодня - 6</div>
                    </div>
                    <div class="post__favorites">
                        <div class="post__favorites__title">Добавлено в избранное:</div>
                        <div>Всего - 666</div>
                        <div>Сегодня - 6</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, defineComponent, h, computed, ref, toRefs, onMounted } from 'vue'
import { PersonOutlineFilled, WhatsappFilled, TelegramFilled } from '@vicons/material'
import { NSpace, NImage, NImageGroup, NAvatar, NIcon } from 'naive-ui'
import parsePhoneNumber from 'libphonenumber-js'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import theme from '@/theme'
import api from '../api'
import { useRoute } from 'vue-router'
import { Post } from '../types'
import MediaGallery from '@/components/Post/MediaGallery.vue'
export default defineComponent({
    components: {
        NSpace,
        NImage,
        NImageGroup,
        MediaGallery,
        PersonOutlineFilled,
        NAvatar,
        NIcon,
        WhatsappFilled,
        TelegramFilled,
        yandexMap,
        ymapMarker,
    },
    setup() {
        const loading = ref(true)
        const post = ref<Post | null>(null)
        const route = useRoute()
        const ownerWhatsappLink = computed(() => `https://wa.me/${post.value?.owner.phoneNumber.replace('+', '')}`)
        const ownerTelegramLink = computed(() => `https://t.me/${post.value?.owner.phoneNumber}`)
        const ownerPhoneNumber = computed(() => parsePhoneNumber(post.value?.owner.phoneNumber!)?.formatInternational())
        const rooms = computed(() => (post.value?.rooms === 'studio' ? 'Студия' : post.value?.rooms))
        const mapSettings = ref({ controls: [] })
        const coords = computed(() => (post.value ? [post.value.geoLat, post.value.geoLon] : []))
        const getPricePeriodText = (pricePeriod: 'day' | 'month') => (pricePeriod === 'day' ? 'день' : 'месяц')
        onMounted(async () => {
            loading.value = true
            post.value = await api.getOnePost({ id: Number(route.params.postId) }).then((res) => res.data as Post)
            loading.value = false
        })

        return {
            loading,
            post,
            getPricePeriodText,
            theme,
            ownerWhatsappLink,
            ownerTelegramLink,
            ownerPhoneNumber,
            rooms,
            mapSettings,
            coords,
        }
    },
})
</script>

<style scoped lang="sass">
@import '@/vars.sass'
.post
    &__name
        font-size: 24px
        font-weight: 500
    &__address
        font-size: 16px
        margin-bottom: 24px
    &__price
        font-size: 24px
        font-weight: 500
    &__views
        margin-top: 40px
        &__title
            font-weight: 600
            font-size: 16px
    &__favorites
        margin-top: 24px
        &__title
            font-weight: 600
            font-size: 16px
    &__owner
        margin-top: 46px
        display: flex
        align-items: center
        &__info
            margin-left: 12px
            &__name
                font-size: 16px
                font-weight: 600
    &__contact
        margin-top: 8px
        &__link
            padding-top: 4px
            padding-bottom: 4px
            display: flex
            align-items: center
            text-decoration: none
            &__icon
                margin-left: 8px
    &__home-info
        display: flex
        flex-direction: row
        justify-content: space-between
        margin-top: 12px
        &__item
            display: flex
            flex-direction: column
            justify-content: center
            white-space: pre-wrap
            &__value
                display: flex
                align-items: flex-end
                height: 45px
                font-size: 24px
                font-weight: 600
                text-align: end
            &__title
    &__description
        margin-top: 24px
        &__label
            font-size: 16px
            font-weight: 600
        &__text
            margin-top: 8px
            white-space: pre-line
    &__map
        margin-top: 24px
        &__label
            font-size: 16px
            font-weight: 600

.map
    width: 100%
    height: 312px
    margin-top: 12px


.grid
    display: flex
    gap: 36px
.grid-item
    flex: 1
    padding: 12px
</style>
