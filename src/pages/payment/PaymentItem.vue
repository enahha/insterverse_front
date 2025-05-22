<template>
  <q-page class="q-pa-md page-1200 payment-item-warp">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('store') }}</span></div>
      </div>
    </div>

    <div class="row subtitle">
        <div class="subtitle-sec"><span>{{ $t('payment_confirm') }}</span></div>
    </div>

    
    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

    <!-- <div class="timeline">
      <div class="node"></div>
      <div class="node active"></div>
      <div class="node"></div>
    </div> -->
    
    
    <div v-if="!payInfo" class="row justify-center q-pb-md">
      <div class="row justify-left q-pb-md item-sec">
        <!-- <span>{{ $t('payment_item') }} : </span> -->

        <div class="item-container">
          <q-item >
            <q-item-section avatar>
              <q-avatar square class="media-container">
                <img v-if="itemVo.url" :src="itemVo.url"  class="media-content">
                <img v-else src="images/exhibition_poster_basic2.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row list-item">
                <q-item-label class="col-12">{{ itemVo.itemName }}</q-item-label>
                <q-item-label class="col-12">{{ itemVo.price }} $</q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <div class="text-center row list-item" style="width: 500px; height: auto; display: contents;">
        <div v-if="locale === 'ko-KR'" class="col-12">{{ itemVo.descriptionKo }}</div>
        <div v-else class="col-12">{{ itemVo.description }}</div>
      </div>

      <div style="width: 100%; display: flex; justify-content: flex-end; padding: 100px 10px;">
        <!-- <q-btn
            :label="$t('go_back')"
            @click="goBack"
            style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 150px; max-height: 30px;"
          /> -->
        <q-btn
            :label="$t('next')"
            @click="goPageNext"
            style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 100px; max-height: 30px;"
          />
      </div>
      
    </div>

    <div v-if="payInfo">
      <div class="row justify-center">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">{{ $t('buyer_name') }}</span>
        </div>
      </div>
      <div class="row justify-center q-pb-md">
        <div class="col-12">
          <q-input v-model="paymentVo.buyername" ref="refBuyerName" :rules="[required, val => minLength(val, 2), val => maxLength(val, 30)]" clearable outlined tabindex="1" />
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">{{ $t('buyer_tel') }}</span>
          <span class="text-grey">&nbsp;&nbsp;e.g. 01012345678</span>
        </div>
      </div>
      <div class="row justify-center q-pb-md">
        <div class="col-12">
          <q-input v-model="paymentVo.buyertel" ref="refBuyerTel" type="number" :rules="[required, val => minLength(val, 9), val => maxLength(val, 15)]" clearable outlined tabindex="1" />
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">{{ $t('buyer_email') }}</span>
        </div>
      </div>
      <div class="row justify-center q-pb-md">
        <div class="col-12">
          <q-input v-model="paymentVo.buyeremail" ref="refBuyerEmail" standout readonly />
        </div>
      </div>
      <div class="row justify-center q-pb-md">
        <div class="col-12">
          &nbsp;
        </div>
      </div>
      <div style="width: 100%; display: flex; justify-content: flex-end; padding: 100px 50px;">
        <!-- <q-btn
            :label="$t('go_back')"
            @click="goPageBack"
            style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 150px; max-height: 30px;"
          /> -->
        <q-btn
            :label="$t('next')"
            @click="doPayment"
            style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 100px; max-height: 30px;"
          />
      </div>

      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl">
      </div>
    </div>

    <!-- PC용 결제폼 -->
    <form id="SendPayForm_id">
      <input type="hidden" name="version" v-model="paymentVo.version">
      <input type="hidden" name="mid" v-model="paymentVo.mid">
      <input type="hidden" name="goodname" v-model="paymentVo.goodname">
      <input type="hidden" name="oid" v-model="paymentVo.oid">
      <input type="hidden" name="price" v-model="paymentVo.price">
      <input type="hidden" name="currency" v-model="paymentVo.currency">
      <input type="hidden" name="buyername" v-model="paymentVo.buyername">
      <input type="hidden" name="buyertel" v-model="paymentVo.buyertel">
      <input type="hidden" name="buyeremail" v-model="paymentVo.buyeremail">
      <input type="hidden" name="timestamp" v-model="paymentVo.timestamp">
      <input type="hidden" name="signature" v-model="paymentVo.signature">
      <input type="hidden" name="verification" v-model="paymentVo.verification">
      <input type="hidden" name="returnUrl" v-model="paymentVo.returnUrl">
      <input type="hidden" name="mKey" v-model="paymentVo.mKey">
      <input type="hidden" name="gopaymethod" v-model="paymentVo.gopaymethod" >
      <input type="hidden" name="offerPeriod" value="" >
      <input type="hidden" name="acceptmethod" value="below1000" >
      <input type="hidden" name="languageView" value="" >
      <input type="hidden" name="charset" value="" >
      <input type="hidden" name="payViewType" value="" >
      <input type="hidden" name="closeUrl" v-model="paymentVo.closeUrl" >
      <input type="hidden" name="popupUrl" value="" >
      <input type="hidden" name="quotabase" v-model="paymentVo.cardQuotaBase" >
      <input type="hidden" name="ini_onlycardcode" value="" >
      <input type="hidden" name="ini_cardcode" value="" >
      <input type="hidden" name="ansim_quota" value="" >
      <input type="hidden" name="vbankRegNo" value="" >
      <input type="hidden" name="merchantData" v-model="customData"><!-- 상점 자유 데이터 -->
      <input type="hidden" name="logo_url" value="">
      <input type="hidden" name="logo_2nd" value="https://galleryx.io/logo/pay_logo_64x13.png"><!-- 서브로고 삽입 [size: 64*13] -->
    </form>

  </q-page>
  <!-- <LoginModal ref="refLoginModal" @callback-login="callbackLogin" /> -->
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { required, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'Payment',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      device: 'P', // 디바이스 - P: 데스크탑, M: 모바일웹, android: 안드로이드 앱, ios: 아이폰 앱
      customData: '', // 가맹점 파라미터 - 되돌아오기에 사용할 파라미터 (2000byte)
      payInfo: false,
      itemVo: {
        seq: '',
        itemName: '',     // name 속성이 TypeScript나 JavaScript 환경에서 더 이상 권장되지 않아 itemName우로 변경
        type: '',
        price: '',
        priceType: '',
        displayMaximum: '',
        description: '',
        descriptionKo: '',
        url: '',
        delYn: '',
      },
      paymentVo: {
        seq: '',
        payCode: '', // 결제 코드
        goodname: '',
        buyername: '',
        buyertel: '',
        buyeremail: '',
        price: '',
        mid: '',
        gopaymethod: 'Card', // PC: Card, Mobile: CARD
        mKey: '',
        signature: '',
        verification: '',
        oid: '',
        timestamp: '',
        version: '',
        acceptmethod: '',
        returnUrl: '',
        closeUrl: '',
        cardQuotaBase: '2:3:4:5:6:11:12', // 할부개월수 노출옵션 [할부개월:할부개월]
        currency: '',   // 달러결제 - USD (USD는 카드만 결제가능)
        mobileNextUrl: '',
        mobileReturnUrl: '',
        androidNextUrl: '',
        androidReturnUrl: '',
        iosNextUrl: '',
        iosReturnUrl: '',
        notiUrl: '',
      },
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    // getUserName () {
    //   return this.$store.getters.getUserName
    // },
    // getUserMobileNo () {
    //   return this.$store.getters.getUserMobileNo
    // },
    getPaymentGoodName () {
      return this.$store.getters.getPaymentGoodName
    },
    getPaymentPayCode () {
      return this.$store.getters.getPaymentPayCode
    },
  },
  created: function () {
    this.paymentVo.uid = this.getUid
    this.paymentVo.buyername = this.getUserName
    this.paymentVo.buyertel = this.getUserMobileNo
    this.paymentVo.buyeremail = this.getUid
    this.paymentVo.goodname = this.getPaymentGoodName
    this.paymentVo.payCode = this.getPaymentPayCode
    this.customData = this.getPaymentCustomData

    // 설정된 결제정보 맵핑
    // customData
    if (!this.customData) {
      this.customData = localStorage.getItem('CUSTOM_DATA')
      if (!this.customData) {
        this.customData = this.$cookie.get('CUSTOM_DATA')
      }
    }
    // payCode
    if (!this.paymentVo.payCode) {
      this.paymentVo.payCode = localStorage.getItem('PAY_CODE')
      if (!this.paymentVo.payCode) {
        this.paymentVo.payCode = this.$cookie.get('PAY_CODE')
      }
    }
    // goodname
    if (!this.paymentVo.goodname) {
      this.paymentVo.goodname = localStorage.getItem('GOOD_NAME')
      if (!this.paymentVo.goodname) {
        this.paymentVo.goodname = this.$cookie.get('GOOD_NAME')
      }
    }
    // buyername
    if (!this.paymentVo.buyername) {
      this.paymentVo.buyername = localStorage.getItem('BUYER_NAME')
      if (!this.paymentVo.buyername) {
        this.paymentVo.buyername = this.$cookie.get('BUYER_NAME')
      }
    }
    // buyertel
    if (!this.paymentVo.buyertel) {
      this.paymentVo.buyertel = localStorage.getItem('BUYER_TEL')
      if (!this.paymentVo.buyertel) {
        this.paymentVo.buyertel = this.$cookie.get('BUYER_TEL')
      }
    }

    this.itemVo.seq = this.$route.query.s
    this.paymentVo.seq = this.$route.query.s

    // 아이템 정보 조회
    this.selectItem()

    // 결제에 필요한 정보를 API 서버에 요청
    this.setPayBaseInfo()
  },
  mounted: function () {
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
    truncateText(text, maxLength) {
      if (!text) {
        return ''
      }

      if (text.length <= maxLength) {
        return text
      }
      return text.substring(0, maxLength) + '...'
    },
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    selectItem() {
      const param = {
        uid: this.getUid,
        seq: this.itemVo.seq,
      }

      this.$axios.get('/api/item/selectItem', { params: { ...param }})
        .then((result) => {
          if (result.data) {
            this.itemVo.itemName = result.data.name
            this.itemVo.type = result.data.type
            this.itemVo.price = result.data.price
            this.itemVo.priceType = result.data.price_type
            this.itemVo.displayMaximum = result.data.display_maximum
            this.itemVo.description = result.data.description
            this.itemVo.descriptionKo = result.data.description_ko
            this.itemVo.url = result.data.url
            this.itemVo.delYn = result.data.del_yn
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 결제에 필요한 정보를 API 서버에 요청
    async setPayBaseInfo() {
      console.table(this.paymentVo)
      const param = {
        ...this.paymentVo
      }
      const result = await this.$axios.post('/api/payment/selectPayBaseInfo', param)
      // const result = await this.$axios.get('/api/payment/selectPayBaseInfo', {params: {uid: this.getUid}})
      // console.log(result.data)
      if (result.data && result.data.resultCd === 'SUCCESS') {
        this.paymentVo.price = result.data.price   // USD결제시 *100
        this.paymentVo.mid = result.data.mid
        this.paymentVo.mKey = result.data.mkeyNew // mKey가 front에서 mkey로 소문자로 오는 현상 때문에 mKeyNew 항목 추가 (lombok 버그)
        this.paymentVo.oid = result.data.oid
        this.paymentVo.timestamp = result.data.timestamp
        this.paymentVo.signature = result.data.signature
        this.paymentVo.verification = result.data.verification
        this.paymentVo.version = result.data.version
        this.paymentVo.currency = result.data.currency
        this.paymentVo.acceptmethod = result.data.acceptmethod
        this.paymentVo.returnUrl = result.data.returnUrl
        this.paymentVo.closeUrl = result.data.closeUrl
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    doPayment() {
      // 액션 로그 등록
      this.insertActionLog('100900201', 'buy', this.itemVo.seq)

      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 결제 로그 등록
      this.insertPayLog()

      // 결제 완료 후 아이템 등록을 위해  설정
      this.$cookie.set('ITEM_SEQ', this.paymentVo.item_seq)
      localStorage.setItem('ITEM_SEQ', this.paymentVo.item_seq)

      // 결제 정보 설정
      this.$cookie.set('BUYER_NAME', this.paymentVo.buyername)
      this.$cookie.set('BUYER_TEL', this.paymentVo.buyertel)
      localStorage.setItem('BUYER_NAME', this.paymentVo.buyername)
      localStorage.setItem('BUYER_TEL', this.paymentVo.buyertel)

      // 결제 요청
      this.$INIStdPay.pay('SendPayForm_id')
    },
    // 결제 로그 등록
    insertPayLog() {
      const payLogVo = {
        pc1_version: this.paymentVo.version,
        pc1_gopaymethod: this.paymentVo.gopaymethod,
        pc1_mid: this.paymentVo.mid,
        pc1_oid: this.paymentVo.oid,
        pc1_price: this.paymentVo.price,
        pc1_timestamp: this.paymentVo.timestamp,
        pc1_signature: this.paymentVo.signature,
        PC1_verification: this.paymentVo.verification,
        pc1_mkey: this.paymentVo.mKey,
        pc1_currency: this.paymentVo.currency,
        pc1_goodname: this.paymentVo.goodname,
        pc1_buyername: this.paymentVo.buyername,
        pc1_buyertel: this.paymentVo.buyertel,
        pc1_buyeremail: this.paymentVo.buyeremail,
        pc1_returnurl: this.paymentVo.returnUrl,
        pc1_closeurl: this.paymentVo.closeUrl,
        pc1_quotabase: this.paymentVo.quotabase,
        pc1_nointerest: this.paymentVo.nointerest,
        pc1_tax: this.paymentVo.tax,
        pc1_taxfree: this.paymentVo.taxfree,
        pc1_charset: this.paymentVo.charset,
        pc1_offerperiod: this.paymentVo.offerPeriod,
        pc1_payviewtype: this.paymentVo.payViewType,
        pc1_languageview: this.paymentVo.languageView,
        pc1_logo_url: this.paymentVo.logo_url,
        pc1_logo_2nd: this.paymentVo.logo_2nd,
        pc1_popupurl: this.paymentVo.popupUrl,
        pc1_parentemail: this.paymentVo.parentemail,
        pc1_ini_ssgpay_mdn: this.paymentVo.ini_ssgpay_mdn,
        pc1_merchantdata: this.paymentVo.merchantData,
        pc1_acceptmethod: this.paymentVo.acceptmethod,
        mo1_p_ini_payment: this.paymentVo.P_INI_PAYMENT,
        mo1_p_mid: this.paymentVo.P_MID,
        mo1_p_oid: this.paymentVo.P_OID,
        mo1_p_amt: this.paymentVo.P_AMT,
        mo1_p_goods: this.paymentVo.P_GOODS,
        mo1_p_uname: this.paymentVo.P_UNAME,
        mo1_p_next_url: this.paymentVo.P_NEXT_URL,
        mo1_p_noti_url: this.paymentVo.P_NOTI_URL,
        mo1_p_hpp_method: this.paymentVo.P_HPP_METHOD,
        mo1_p_mobile: this.paymentVo.P_MOBILE,
        mo1_p_email: this.paymentVo.P_EMAIL,
        mo1_p_mname: this.paymentVo.P_MNAME,
        mo1_p_charset: this.paymentVo.P_CHARSET,
        mo1_p_offer_period: this.paymentVo.P_OFFER_PERIOD,
        mo1_p_quotabase: this.paymentVo.P_QUOTABASE,
        mo1_p_tax: this.paymentVo.P_TAX,
        mo1_p_taxfree: this.paymentVo.P_TAXFREE,
        mo1_p_card_option: this.paymentVo.P_CARD_OPTION,
        mo1_p_only_cardcode: this.paymentVo.P_ONLY_CARDCODE,
        mo1_p_vbank_dt: this.paymentVo.P_VBANK_DT,
        mo1_p_vbank_tm: this.paymentVo.P_VBANK_TM,
        mo1_p_noti: this.paymentVo.P_NOTI,
        mo1_p_reserved: this.paymentVo.P_RESERVED,
        reg_id: this.getUid,
      }
      this.$axios.post('/api/payment/insertPayLogAuthReq', payLogVo)
    },
    validate() {
      let result = true
      if (!this.$refs.refBuyerName.validate()) {
        result = false
      }
      if (!this.$refs.refBuyerTel.validate()) {
        result = false
      }
      return result
    },
    goPageNext() {
      console.log('결제전 보낼 정보')
      console.table(this.paymentVo)
      this.payInfo = true
    },
    goPageBack() {
      this.payInfo = false
    },
    goBack() {
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
</style>
