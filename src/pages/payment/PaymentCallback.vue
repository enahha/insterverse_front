<template>
  <q-page class="q-pa-md page-default">
    <!--
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        resultApiCode: {{ resultApiCode }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        resultCode: {{ resultCode }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        resultMsg: {{ resultMsg }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        redirectUrl: {{ redirectUrl }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 doc-heading doc-h2">
        key: {{ key }}
      </div>
    </div>
    -->

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { QSpinnerGears } from 'quasar'
// import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      // locale,
      itemSeq: '',
      resultApiCode: '', // FAIL, SUCCESS
      resultCode: '',
      redirectUrl: '',
      payCode: '',
      key: '',
      orderId: '',
      resultMsg: '',
    }
  },
  components: {},
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
  },
  created: function () {
    // alert(JSON.stringify(this.$route.query))
    this.resultApiCode = this.$route.query.resultApiCode
    this.resultCode = this.$route.query.resultCode
    this.redirectUrl = this.$route.query.redirectUrl
    this.payCode = this.$route.query.payCode
    this.orderId = this.$route.query.orderId
    this.key = this.$route.query.key
    this.resultMsg = this.$route.query.resultMsg
    

    // 결제 성공 여부 분기
    if (this.resultApiCode === 'SUCCESS') {

      // 메일 알림
      try {
        this.sendMail()
      } catch(e) {
        console.log(e)
      }

      if (this.payCode === this.$PAY_CODE_HALL) { // 'PAY_CODE_HALL' 결제코드가 전시회 구매인경우
        // user item 테이블에 등록
        const params = {
          uid: this.getUid,
          item_seq: this.key,
        }
        this.$axios.post('/api/userItem/insertUserItem', params)          // 결제완료!! 유저 아이템에 등록
          .then((result) => {
            // console.log(result.data)
            if (result && result.data && result.data.resultCd === 'SUCCESS') {
              // this.$noti(this.$q, this.$t('process_success')) // '처리되었습니다.'
            } else {
              this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
            }

            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl })
          })
          .catch((err) => {
            console.log(err)
            // 2. 결제창 호출시 상점 파라미터(merchantData)에 설정한 처리 화면으로 이동
            this.$router.replace({ path: this.redirectUrl })
          })


      } else if (this.payCode === this.$PAY_CODE_PLAN) { // 'PAY_CODE_PLAN' 결제코드가 구독인 경우
        alert("PAY_CODE_PLAN 결제 성공")
      
      } else {
        alert('Process failed. payCode is not Invalid')
        console.log('Process failed. payCode is not Invalid')
        this.$router.replace(this.redirectUrl)
      }

    } else {
      this.$noti(this.$q, this.$t('payment_failed'))
      this.$noti(this.$q, this.resultCode + ': ' + this.resultMsg) // '결제 실패 원인'
      this.$router.replace(this.redirectUrl)
    }
  },
  mounted: function () {},
  // setup () {
  //   const { locale } = useI18n({ useScope: 'global' })
  //   return {
  //     locale,
  //   }
  // },
  methods: {
    // send email
    sendMail() {
      const title = '[ ' + this.payCode + ' ]'
      let contents = 'ID: ' + this.getUid + '<br>'
      contents += 'JOB: ' + this.payCode + '<br>'
      contents += 'SEQ: ' + this.key + '<br>'
      contents += 'redirectUrl: ' + this.redirectUrl + '<br>'
      contents += '<br>'
      contents += 'https://galleryx.io'

      const params = {
        subject: title,
        text: contents,
        email_from: this.$systemMailFrom,
        email_to: this.$systemMailFrom,
      }
      this.$axios.post('/api/common/sendMail', params)
        .then((result) => {
          // console.log(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
})
</script>
