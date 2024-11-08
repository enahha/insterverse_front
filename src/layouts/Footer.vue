<template>
    <footer>
      <div class="footer">
        <div class="footer-info">
          <div class="text-caption text-bold flex q-pt-md">
            <q-img class="logo-small" src="logo/galleryx_logo.png" width="40px" height="40px" />
            &nbsp; &nbsp;
            <span class="text-black text-bold text-h4">GALLERY X</span>
          </div>
          <br>
          <div class="text-caption flex q-pt-xs">
            <span class="text-black">ⓒ 2024 Star Inc. all rights reserved.</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a style="cursor: pointer;" @click="showTerms">{{ $t('company_show_terms') }}</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a style="cursor: pointer;" @click="showPrivacy">{{ $t('company_show_privacy') }}</a>
          </div>
          <div style="padding: 2px;"></div>
          <!-- 사업자정보 -->
          <div class="text-caption flex">
            <div class="row">
              <div class="col-12 text-black">
                <span class="text-bold">{{ $t('company_name') }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{ $t('company_representive') }} : {{ $t('company_representive_value') }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{ $t('company_business_number') }} : 139-87-02383</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{ $t('company_mail_order_sales_registration_number') }} : {{ $t('company_mail_order_sales_registration_number_value') }}</span>
                <br v-if="!smallSize"><div v-if="!smallSize" style="padding: 1px;"></div>
                <span>{{ $t('company_cs') }} : 02-717-0401</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{ $t('company_email') }} : contact@starinc.io</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{ $t('company_address') }} : {{ $t('company_address_value') }}</span>
              </div>
            </div>
          </div>

        <!-- <div class="col-12 q-pa-md"> -->
        <!-- </div> -->
        </div>
      </div>

    </footer>
    <TermsModal ref="refTermsModal"/>
    <PrivacyModal ref="refPrivacyModal"/>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Main',
  data () {
    return {
      smallSize: false,
    }
  },
  created: function() {
    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }
  },
  methods: {
    // 이용약관 모달 표시
    showTerms() {
      this.$refs.refTermsModal.requiredCheck = false
      this.$refs.refTermsModal.show()
    },
    // 개인정보처리방침 모달 표시
    showPrivacy() {
      this.$refs.refPrivacyModal.requiredCheck = false
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
    resizeEventHandler() {
      // console.log('resizeEventHandler')
      // console.log(document.body.offsetWidth)
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
    },
  }
})
</script>

<style scoped>
.footer-title {


  color: #000000;
}
.text-caption{
  padding-left: 50px;
}

@media (max-width: 1023px) {
    .text-caption {
        padding: 0;
        font-size: 8px;
        text-align: center;
    }
    .footer-title {
      padding: 0;
    }
}
</style>
