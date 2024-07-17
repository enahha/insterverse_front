<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_import') }}
      </div>
    </div>
    <div class="row q-pl-md justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_import_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-xl">
    </div>

    <div style="" class="">
      <q-list>

        <q-item clickable v-ripple @click="goRegister('instagram')">
          <q-item-section avatar>
            <q-img src="logo/logo_instagram_square.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_instagram') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goRegister('x')">
          <q-item-section avatar>
            <q-img src="logo/logo_x.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_x') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goRegister('meta')">
          <q-item-section avatar>
            <q-img src="logo/logo_meta.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_meta') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goRegister('devianart')">
          <q-item-section avatar>
            <q-img src="logo/logo_devianart.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_devianart') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goRegister('artstation')">
          <q-item-section avatar>
            <q-img src="logo/logo_artstation.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_artstation') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goRegister('behance')">
          <q-item-section avatar>
            <q-img src="logo/logo_behance.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_behance') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goRegister('dribbble')">
          <q-item-section avatar>
            <q-img src="logo/logo_dribbble.png" width="70px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('import_from_dribbble') }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </div>

    <!-- 하단 버튼 -->
    <div class="row q-pt-xl">
      <div class="col-12">
        <span @click="goBack" style="cursor: pointer;">
          <q-icon name="arrow_back" size="md" />
          {{ $t('go_back') }}
        </span>
      </div>
    </div>

    <!-- 테스트용 버튼 -->
    <div class="row q-pt-xl">
      <div class="col-12">
        <span @click="goTest" style="cursor: pointer;">
          <q-icon name="arrow_right" size="md" />
          {{ $t('go_register_from_instagram') }}
        </span>
      </div>
    </div>




    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <TokenDetailModal ref="refTokenDetailModal"/> -->
  <WalletModal ref="refWalletModal" />
  <IframeModal ref="refIframeModal" />
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'InstagramList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      refresherDone: '',
    }
  },
  components: {
  },
  watch: {
    // getUid (newValue) {
    //   // console.log('newValue: : ' + newValue)
    //   // this.loadMore(1, null)
    //   this.refresher(null)
    //   // if (!newValue) {
    //   //   this.$router.push('/')
    //   // } else {
    //   //   this.loadMore(1, null)
    //   // }
    // },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    getKeyword () {
      return this.$store.getters.getKeyword
    },
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    goRegister(type) {
      
      if (type == 'instagram') { // 인스타그램에서 가져오기
        this.$q.loading.show() // 로딩 표시
        // this.$router.push('/project/registerProjectInstagram')

        // 인스타그램 앱 시크릿 코드 : 492e1d70cad605c96a6d52eb9220ad62
        // 인스타그램 앱 클라이언트 아이디 : 681042560396956

        let currentLocale = this.locale
        if (!this.locale) {
          currentLocale = this.$cookie.get('LOCALE')
          if (!this.locale) {
            currentLocale = localStorage.getItem('LOCALE')
          }
        }
        let adcd = this.$cookie.get('ADCD')
        if (!adcd) {
          adcd = localStorage.getItem('ADCD')
        }

        const stateParam = '/project/registerProjectInstagram' + '|' + currentLocale + '|' + adcd
        const scope = 'user_profile,user_media'
        const response_type = 'code'

        const url = 'https://api.instagram.com/oauth/authorize' + '?'
                  + 'client_id=' + this.$instagramClientId
                  + '&redirect_uri=' + this.$instagramLoginRedirectUri
                  + '&scope=' + scope
                  + '&response_type=' + response_type
                  + '&state=' + stateParam
        // window.open(url)
        // this.$refs.refIframeModal.url = url
        // this.$refs.refIframeModal.show()
        window.location.href = url
      } else {
        this.$noti(this.$q, this.$t('coming_soon'))
      }
    },
    goBack() {
      // 페이지 이동
      this.$router.go(-1)
    },
    goTest() {
      const token = 'IGQWRQVl8wdjhuT0c4U2J4YTlRSDlLV3Y0WXlNczRzQS1ycWR4Mzg4eU83TVVTRGdCY0loY3pqRERnYmZAVcTFDRHRaQjRON2N5eUIzeUc4QzdGVk9TZADdGM21yQWVSM2h3bm4xNm05dkd1eVB2dlI0VjdhQW5LRmlSd240emxlbkZAhTlUZD'
      this.$router.push('/project/registerProjectInstagram' + '?token=' + token)
    },

  },
})
</script>

<style scoped>
</style>
