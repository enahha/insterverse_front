<template>
  <!-- <q-page class="justify justify-center" style="background-image: url(images/star1.jpg)"> -->
  <q-page class="justify justify-center">
    <div class="page-default" style="word-break: keep-all;">

      <!-- <div class="text-center">
        <q-img src="images/fundsafe_bm.png" style="max-width: 1024px;" />
      </div> -->

      <!-- 플랫폼 설명 -->
      <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
        <div class="text-h3 text-bold">
          FundSafe
          <br />
        </div>
        <div class="text-h5 text-bold q-pt-md">
          <div v-if="locale === 'en-US'">
            Blockchain Escrow Service
          </div>
          <div v-else-if="locale === 'ko-KR'">
            블록체인 에스크로 서비스
          </div>
          <br />
        </div>
        <!-- <q-separator /> -->
        <br />
        <!-- <q-img src="images/platform.png" style="max-width: 600px;" /> -->
        <!-- <q-img v-if="locale === 'en-US'" src="images/fundsafe_bm_en.png" style="max-width: 1024px; border-radius: 1%;" />
        <q-img v-else-if="locale === 'ko-KR'" src="images/fundsafe_bm_ko.png" style="max-width: 1024px; border-radius: 1%;" /> -->

        <iframe
          v-if="smallSize"
          width="100%"
          height="320"
          src="https://www.youtube.com/embed/0ZqtiUd1f-U"
          title="FundSafe - Blockchain Escrow Service"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <iframe
          v-else
          width="100%"
          style="max-width: 1280px;"
          height="720"
          src="https://www.youtube.com/embed/0ZqtiUd1f-U"
          title="FundSafe - Blockchain Escrow Service"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
<!--
        <iframe
          v-if="smallSize"
          width="100%"
          height="320"
          src="https://www.youtube.com/embed/jUA9tzPjM2E?cc_load_policy=1"
          title="FundSafe DEMO - Anti-Rug Pull Solution"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <iframe
          v-else
          width="100%"
          style="max-width: 1280px;"
          height="704"
          src="https://www.youtube.com/embed/jUA9tzPjM2E?cc_load_policy=1"
          title="FundSafe DEMO - Anti-Rug Pull Solution"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
-->
        <br />
        <br />
        <!-- <q-separator /> -->

        <div v-if="locale === 'en-US'">
          <br />
          <br />FundSafe is a solution for transparent management of project funds.
          <br />
          <br />Often the project team embezzles funds or uses them somewhere unrelated to the project.
          <br />We present a new paradigm to solve these problems.
          <br />
          <br />
          <br />[ Workflow ]
          <br />
          <br />1. Register the project in FundSafe for ICO / INO.
          <br />
          <br />2. ICO / INO funds are deposited in FundSafe.
          <br />
          <br />3. The project team registers a fund use plan.
          <br />
          <br />4. The DAO take a vote.
          <br />
          <br />5.1 Requests for withdrawal of funds that have not been approved cannot be withdrawn.
          <br />
          <br />5.2 Request for withdrawal of funds approved can be withdrawn by the amount requested amount.
          <br />
          <br />
          <br /><img src="logo/logo_fundsafe_mark_bg_white.png" style="max-width: 150px; cursor: pointer;" @click="goProjectDetail" />
          <br />
          <br />◦ Projects that use FundSafe display a FundSafe certification mark.
          <br />◦ Users can check on the FundSafe website to see if the project actually uses FundSafe.
          <br />
          <br />※ Projects that have already been funded can also be managed by keeping funds in FundSafe.
          <br />Only when holders strongly demand that the project team use FundSafe can eradicate the rug pull.
          <br />
          <br />
          <br />
        </div>

        <div v-else-if="locale === 'ko-KR'">
          <br />
          <br />펀드세이프는 프로젝트 자금의 투명한 관리를 위한 솔루션입니다.
          <br />
          <br />프로젝트 팀은 종종 자금을 횡령하거나 프로젝트와 관련이 없는 곳에 자금을 사용합니다.
          <br />우리는 이러한 문제를 해결하기 위해 새로운 패러다임을 제시합니다.
          <br />
          <br />
          <br />[ Workflow ]
          <br />
          <br />1. ICO/INO를 위해 FundSafe에 프로젝트를 등록합니다.
          <br />
          <br />2. ICO/INO 자금은 FundSafe에 입금됩니다.
          <br />
          <br />3. 프로젝트 팀은 자금 사용 계획을 등록합니다.
          <br />
          <br />4. DAO가 찬반투표를 진행합니다.
          <br />
          <br />5.1 승인되지 않은 자금의 인출 요청은 출금될 수 없습니다.
          <br />
          <br />5.2 승인받은 자금의 인출 요청은 요청 금액만큼만 인출할 수 있습니다.
          <br />
          <br />
          <br /><img src="logo/logo_fundsafe_mark_bg_white.png" style="max-width: 150px; cursor: pointer;" @click="goProjectDetail" />
          <br />
          <br />◦ FundSafe를 사용하는 프로젝트에는 FundSafe 인증 마크가 표시됩니다.
          <br />◦ 사용자는 FundSafe 웹사이트에서 이 프로젝트가 실제로 FundSafe를 사용하는지 확인할 수 있습니다.
          <br />
          <br />※ 이미 운영중인 프로젝트 또한 자금을 FundSafe에 보관하여 관리할 수 있습니다.
          <br />홀더분들이 프로젝트 팀에게 FundSafe를 사용할 것을 강력히 요구할 때 비로소 러그풀을 근절할 수 있습니다.
          <br />
          <br />
          <br />
        </div>
      </div>

      <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
        <br />
        <br />
        <br />
        <q-img src="images/idea.png" style="max-width: 600px;" />

        <div v-if="locale === 'en-US'">
          <br />
          <br />We are researching and developing various ways to protect investors.
          <br />We're trying to discover a possible vulnerability in WEB 3.0 and develop a new solution for it.
          <br />First, we are developing FundSafe to solve the risks arising from humans.
          <br />
          <br /><br /><br /><br /><br /><br /><br />
        </div>

        <div v-else-if="locale === 'ko-KR'">
          <br />
          <br />투자자를 보호하기 위한 다양한 방법을 연구하고 개발하고 있습니다.
          <br />WEB 3.0에서 발생할 수 있는 취약성을 발견하고 이에 대한 솔루션을 찾기 위해 노력합니다.
          <br />먼저, 사람으로부터 발생하는 위험을 없애기 위해 FundSafe를 개발하였습니다.
          <br />
          <br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>

    </div>

    <!-- links -->
    <div class="text-caption text-white flex flex-center" style="background: rgb(29, 29, 29);">
      <div class="row flex flex-center q-pt-md">
        <div class="q-pl-md q-pr-md q-pb-sm flex flex-center">
          <q-img src="logo/icons-social-gitbook.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://docs.fundsafe.io')" title="Docs" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <q-img src="logo/icons-social-twitter.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://twitter.com/Fundsafe_io')" title="Twitter" />
          &nbsp;&nbsp;&nbsp;
          <q-img src="logo/icons-social-medium.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://medium.com/@fundsafe')" title="Medium" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <q-img src="logo/icons-social-discord.svg" style="width: 27px; cursor: pointer;" @click="openUrl('https://discord.gg/mqDEH4Du69')" title="Discord" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <q-img src="logo/icons-social-telegram.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://t.me/fundsafeio')" title="Telegram" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <q-img src="logo/icons-apartment.svg" style="width: 25px; cursor: pointer;" @click="openUrl('https://www.klaystar.com')" title="Company" />
        </div>
      </div>
    </div>

    <div class="text-caption text-white flex flex-center q-pt-sm" style="background: rgb(29, 29, 29);">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="text-center">
        <tr>
          <td>Copyright ⓒ 2022 FundSafe all rights reserved.</td>
        </tr>
        <tr>
          <td>fundsafe.io@gmail.com</td>
        </tr>
      </table>
    </div>

    <!-- 사업자정보 -->
    <!-- OneOn Inc. | Representive : Youngdae Ahn | Address : 1707, 196, Mapo-daero, Mapo-gu, Seoul | Business Number : 863-87-01186 Verification | Mail-order-sales registration number : 2019-서울마포-0979 | E-mail : nftpy.contact@gmail.com  Terms  Privacy Policy -->
    <div class="text-caption text-white flex flex-center" style="background: rgb(29, 29, 29);">
      <!-- <div class="row">
        <div class="col-12 q-pa-md">
          {{ $t('company_name') }}
          | {{ $t('company_representive') }} : {{ $t('company_representive_value') }}
          | {{ $t('company_address') }} : {{ $t('company_address_value') }}
          | {{ $t('company_business_number') }} : 139-87-02383
          <a @click="openUrl('http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1398702383')" style="cursor: pointer;"><b>{{ $t('company_verification') }}</b></a>
          | {{ $t('company_mail_order_sales_registration_number') }} : {{ $t('company_mail_order_sales_registration_number_value') }}
          | {{ $t('company_email') }} : nftpy.contact@gmail.com
          &nbsp;<a style="cursor: pointer;" @click="showTerms">{{ $t('company_show_terms') }}</a>
          &nbsp;<a style="cursor: pointer;" @click="showPrivacy">{{ $t('company_show_privacy') }}</a>
        </div>
      </div> -->
      <div class="row">
        <div class="col-12 q-pa-xs">
        </div>
      </div>
    </div>

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
      smallSize: false,
      // msgBox: false,
    }
  },
  components: {
  },
  created: function () {
    // console.log(this.$q.platform.is.mobile)

    // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
    if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
      // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
    ) {
      this.$router.push('/app/loginApp')
      // https://nftpy.io WEB으로 이동
      // alert('move to https://nftpy.io')
      // if (location.origin !== this.$domain) {
      //   location.href = this.$domain
      // }
    }

    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }

  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
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
    resizeEventHandler() {
      // console.log('resizeEventHandler')
      // console.log(document.body.offsetWidth)
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
    },
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
    },
    goProjectDetail() {
      this.$router.push({ path: '/project/projectDetail', query: { s: 1 }})
    },
  }
})
</script>
