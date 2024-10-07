<template>
  <q-page class="justify justify-center introduction">
    <div class="image-container">
      <q-img src="images/main_exhibition.png" class="main-image" />
    </div>

    <div>
      <div class="q-pt-lg">
        <div class="row title-row">
          <div class="underline"></div>
          <span class="subtitle">About Us</span>
        </div>
        <div class="center q-pt-lg">
          <!-- <div class="content-text" style="white-space: pre-line !important;">  - 줄바꿈 -->
          <div class="content-text">
            {{ $t('introduction_content_aboutus') }}
          </div>
        </div>
      </div>

      <div class="q-pt-lg interval-between">
        <div class="row title-row">
          <div class="underline"></div>
          <span class="subtitle">Our Value</span>
        </div>
        <div class="center q-pt-lg">
          <div class="content-text">
            <ul style="padding-left: 25px;">
              <li>{{ $t('introduction_content_ourvalue_1') }}</li>
              <br>
              <li>{{ $t('introduction_content_ourvalue_2') }}</li>
              <br>
              <li>{{ $t('introduction_content_ourvalue_3') }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="q-pt-lg interval-between">
        <div class="row" style="display: flex; align-items: center;">
          <div class="underline" style="margin-right: 10px;"></div>
          <span class="subtitle">Why Instarverse?</span>
        </div>
        <div class="center interval-between" style="padding: 50px;">
          <q-img src="images/instarverse_aboutus_1.png" class="mobile-margin" style="max-width: 900px; margin-right: 20px;" />
          <div class="content-block">
            <h4 style="font-weight: bold;">
              {{ $t('introduction_content_why_subtitle_1') }}
            </h4>
            <span style="font-size: 16px; line-height: 1.6;">
              {{ $t('introduction_content_why_1') }}
            </span>
          </div>
        </div>

        <div class="center" style="background-color: #90B2D8; padding: 50px;">
          <div class="content-block">
            <h4 style="font-weight: bold; color: white;">
              {{ $t('introduction_content_why_subtitle_2') }}
            </h4>
            <span style="font-size: 16px; line-height: 1.6; color: white;">
              {{ $t('introduction_content_why_2') }}
            </span>
          </div>
          <q-img src="images/instarverse_aboutus_2.png" class="mobile-margin" style="max-width: 900px; margin-right: 20px;" />
        </div>

        <div class="center" style="padding: 50px;">
          <q-img src="images/instarverse_aboutus_3.png" class="mobile-margin" style="max-width: 900px; margin-right: 20px;" />
          <div class="content-block">
            <h4 style="font-weight: bold;">
              {{ $t('introduction_content_why_subtitle_3') }}
            </h4>
            <span style="font-size: 16px; line-height: 1.6;">
              {{ $t('introduction_content_why_3') }}
            </span>
          </div>
        </div>

        <div class="center" style="background-color: #0C2C69; padding: 50px;">
          <div class="content-block">
            <h4 style="font-weight: bold; color: white;">
              {{ $t('introduction_content_why_subtitle_4') }}
            </h4>
            <span style="font-size: 16px; line-height: 1.6; color: white;">
              {{ $t('introduction_content_why_4') }}
            </span>
          </div>
          <q-img src="images/instarverse_aboutus_4.png" class="mobile-margin" style="max-width: 900px; margin-right: 20px;" />
        </div>

        <div class="center" style="padding: 50px;">
          <q-img src="images/instarverse_aboutus_5.png" class="mobile-margin" style="max-width: 900px; margin-right: 20px;" />
          <div class="content-block">
            <h4 style="font-weight: bold;">
              {{ $t('introduction_content_why_subtitle_5') }}
            </h4>
            <span style="font-size: 16px; line-height: 1.6;">
              {{ $t('introduction_content_why_5') }}
            </span>
          </div>
        </div>

        <div class="center" style="background-color: #90B2D8; padding: 50px;">
          <div class="content-block">
            <h4 style="font-weight: bold; color: white;">
              {{ $t('introduction_content_why_subtitle_6') }}
            </h4>
            <span style="font-size: 16px; line-height: 1.6; color: white;">
              {{ $t('introduction_content_why_6') }}
            </span>
          </div>
          <q-img src="images/instarverse_aboutus_6.png" class="mobile-margin" style="max-width: 900px; margin-right: 20px;" />
        </div>
      </div>
      
      <div class="q-pt-lg explore-section interval-between">
        <div class="row title-row">
          <div class="underline"></div>
          <span class="subtitle">Explore</span>
        </div>
        <div class="center q-pt-lg">
          <div class="gallery-list">
            <ul>
              <li class="gallery-item">
                <img src="images/explore_1.png" class="gallery-image">
                <div class="gallery-description">
                  <p>{{ $t('introduction_content_explore_1') }}</p>
                  <a href="url_for_gallery_1" target="_blank" class="gallery-button" @click="insertActionLog('100800100', 'explore', null)">전시관 체험하기</a>
                </div>
              </li>
              <li class="gallery-item">
                <img src="images/explore_2.png" class="gallery-image">
                <div class="gallery-description">
                  <p>{{ $t('introduction_content_explore_2') }}</p>
                  <a href="url_for_gallery_2" target="_blank" class="gallery-button" @click="insertActionLog('100800100', 'explore', null)">전시관 체험하기</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
  </q-page>

<TermsModal ref="refTermsModal" />
<PrivacyModal ref="refPrivacyModal" />
<IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {

    }
  },
  components: {
  },
  created: function () {
    // console.log(this.$q.platform.is.mobile)

    // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
    if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
    ) {
      this.$router.push('/app/loginApp')
    }

  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    insertActionLog(actionNo, actionCd, params) {
      // 액션 로그 등록 처리
      const param = {
        uid: this.getUid,
        action_no: actionNo,
        action_cd: actionCd,
        params: params,
      }
      this.$axios.post('/api/log/insertKpiLog', param)
        .catch((err) => {
          console.log(err)
        })
    },
    // // WEB으로 이동
    // moveToWeb () {
    //   // let targetPath = this.$cookie.get('LOGIN_REDIRECT_URL')
    //   // // APP이면 WEB으로 이동, WEB이면 Push
    //   // if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우 - 푸시 토큰 저장
    //   //   location.href = this.$store.state.DOMAIN + '/#' + targetPath + '?uid=' + uid + '&auth_key=' + authKey
    //   // } else {
    //   //   this.$router.push(targetPath)
    //   // }
    //   location.href = this.$domain
    // },
    // 토큰 등록으로 이동
    goRegisterToken() {
      this.$router.push('/token/register')
    },
    // 이용약관 모달 표시
    showTerms() {
      this.$refs.refTermsModal.show()
    },
    // 개인정보처리방침 모달 표시
    showPrivacy() {
      this.$refs.refPrivacyModal.show()
    },
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {
        window.open(url, '_system')
      // }
    },
    showConstructionMessage() {
      this.$noti(this.$q, this.$t('coming_soon'))
    },
    downloadIpa() {
      window.open('https://nftpy.io/files/ipa/klaystar.ipa')
    }
  }
})
</script>
