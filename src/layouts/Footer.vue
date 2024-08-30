<template>
    <footer>
      <div class="footer">
        <div class="footer-info">
          <br /><br /><br /><br/><br /><br />
          <!-- links -->
          <div class="text-h5 text-bold flex flex-center q-pt-xs">
            <span class="footer-title">INSTARVERSE</span>
            <br /><br /><br /><br /><br /><br/>
          </div>
          <br />

          <div class="text-caption flex flex-center q-pt-xs">
            <span class="text-white">ⓒ 2024 Star Inc. all rights reserved.</span>
          </div>

          <!-- 사업자정보 -->
          <div class="text-caption flex flex-center">
            <div class="row">
              <div class="col-12 text-white">
                {{ $t('company_name') }}
                | {{ $t('company_representive') }} : {{ $t('company_representive_value') }}
                | {{ $t('company_address') }} : {{ $t('company_address_value') }}
                | {{ $t('company_business_number') }} : 139-87-02383
                <a @click="openUrl('http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1398702383')" style="cursor: pointer;"><b>{{ $t('company_verification') }}</b></a>
                | {{ $t('company_mail_order_sales_registration_number') }} : {{ $t('company_mail_order_sales_registration_number_value') }}
                | {{ $t('company_email') }} : contact@starinc.io
                | {{ $t('company_cs') }} : 02-717-0401
                &nbsp;<a style="cursor: pointer;" @click="showTerms">{{ $t('company_show_terms') }}</a>
                &nbsp;<a style="cursor: pointer;" @click="showPrivacy">{{ $t('company_show_privacy') }}</a>
              </div>
            </div>
          </div>

        <!-- <div class="col-12 q-pa-md"> -->
        <!-- </div> -->
        </div>
      </div>

    </footer>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
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
  }
})
</script>

<style scoped>
.footer-title {
  margin: 100px;
  padding-left: 50px;
  color: #FEFEFE;
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
