<template>
<q-page class="q-pa-md page-1200 plan-wrap">
    <div class="row title">
    <div class="col-12 doc-heading">
        <div class="title-sec q-mb-xl"><span>{{ $t('plan') }}</span></div>
    </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

    <div class="text-subtitle1 q-mb-xl">{{ $t('plan_detail') }}</div>

    <!-- Pricing Plans Section -->
    <div v-if="plan.length > 0" class="row pricing-plan justify-center">
        <!-- FREE Plan -->
        <div class="col-12 col-md-3 plan start-plan">
        <h2>{{ plan[0].name }}</h2>
        <p class="price">FREE</p>
        <div class="features">
            <p>{{ $t('plan_feature_pre') }} {{ plan[0].storage }} {{ $t('plan_feature_post') }}</p>
            <p>{{ plan[0].exhibition_count }} {{ $t('plan_feature') }}</p>
        </div>
        </div>

        <div
        v-for="(item, index) in plan.slice(1, 4)"
        :key="index"
        class="col-12 col-md-3 plan"
        >
            <h2>{{ item.name }}</h2>
            <div class="price-part">
                <p class="price">{{ item.price }}</p>
                <p class="currncy">{{ $t('plan_currncy_usd_month') }}</p>
            </div>
            <div class="features">
                <p>{{ $t('plan_feature_pre') }} {{ item.storage }} {{ $t('plan_feature_post') }}</p>
                <p>{{ item.exhibition_count }} {{ $t('plan_feature') }}</p>
            </div>
            <button @click="goPayment(item)" class="plan-button">UPGRADE</button>
        </div>

        <!-- CUSTOM Plan -->
        <div class="col-12 col-md-3 plan custom-plan">
        <h2>CUSTOM</h2>
        <div class="features">
            <p>Customization</p>
        </div>
        <button class="plan-button">CONTACT US</button>
    </div>

    <div>
        <p></p>
    </div>
</div>

</q-page>
</template>

<script>
import { sha512 } from 'js-sha512'
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
import Modify from '../notice/Modify.vue';

export default defineComponent({
name: 'Mypage',
setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
    locale,
    }
},
beforeUnmount() {
},
data () {
    return {
        plan: [], 
    }
},
components: {
},
watch: {
    getUid (newValue) {
    // console.log('newValue: : ' + newValue)
    // this.loadMore(1, null)
    // if (!newValue) {
    //   this.$router.push('/')
    // } else {
    //   this.loadMore(1, null)
    // }
    },
},
computed: {
    getUid () {
    return this.$store.getters.getUid
    },
    getNickname () {
    return this.$store.getters.getNickname
    },
    getWalletType () {
    return this.$store.getters.getWalletType
    },
    getWalletAddress () {
    return this.$store.getters.getWalletAddress
    },
    isAdmin () {
    return this.$store.getters.getAdcd === this.$adminCode
    },
    qDate() {
    return date
    },
},
created: function () {
    // 키 설정
    // this.uid = this.$route.query.seq

    // user_profile_image preview reg_name
    // this.reg_name = this.getUid.split('@')[0]

    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
    this.$store.dispatch('setNickname', nickname)
    this.$store.dispatch('setUid', uid)
    }

    // 계정 정보 조회
    this.selectUser()

    // plan항목 조회
    this.selectPlanList()
},
mounted: function () {
},
methods: {
    truncateText(text, maxLength) {
    if (!text) {
        return ''
    }

    if (text.length <= maxLength) {
        return text
    }
    return text.substring(0, maxLength) + '...'
    },
    
    // 계정 조회
    selectUser() {
        // 로그인 여부 체크, 로그인 모달 표시
        if (!this.getUid) {
            // this.$refs.refWalletModal.show()
            this.$router.push('/')
            return
        }

        const param = {
            uid: this.getUid,
        }

        // 계정 조회
        this.$axios.get('/api/user/selectUser', { params: { ...param }})
            .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (result.data) {
                console.log(result.data)
                this.walletAddress = result.data.wallet_address
                if (!this.walletAddress) {
                this.walletAddress = this.$store.getters.getWalletAddress
                }
                this.walletType = result.data.wallet_type
                this.bankAccount = result.data.bank_account
                this.bankType = result.data.bank_type
                // this.nickname = result.data.nickname
                this.profile_image = result.data.profile_image
                // this.reg_name = result.data.reg_name
                this.name = result.data.name
                this.mobile_no = result.data.mobile_no
                this.id_card_image = result.data.id_card_image
                this.home_address = result.data.home_address
                this.home_address_image = result.data.home_address_image
                this.business_registration_no = result.data.business_registration_no
                this.business_license_image = result.data.business_license_image
                this.company_address = result.data.company_address
                this.company_address_image = result.data.company_address_image
                this.company_tel_no = result.data.company_tel_no
            } else {
                this.$noti(this.$q, this.$t('request_data_failed'))
            }
            })
            .catch((err) => {
            console.log(err)
            })
    },
    callbackLogin(userVo) {
        // console.log('callbackLogin!!!')
        this.$store.dispatch('setUid', userVo.uid)
        this.$store.dispatch('setAdcd', userVo.adcd)
        this.$store.dispatch('setName', userVo.name)
        this.$store.dispatch('setNickname', userVo.nickname)
        this.$store.dispatch('setProfileImage', userVo.profile_image)
        this.$store.dispatch('setWalletType', userVo.wallet_type)
        this.$store.dispatch('setWalletAddress', userVo.wallet_address)
        this.$store.dispatch('setMobileNo', userVo.mobile_no)
    },
    selectPlanList() {
        const param = {
            uid: this.getUid,
        }

        // 계정 조회
        this.$axios.get('/api/plan/selectPlanList', { params: { ...param }})
            .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (result.data) {
                console.log(result.data)
                this.plan = result.data
            } else {
                this.$noti(this.$q, this.$t('request_data_failed'))
            }
            })
            .catch((err) => {
            console.log(err)
            })
    },
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
    goPayment(item) {
      // 1. 해당 건이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: this.seq,
      }
      // const result = await this.$axios.post('/api/tokenburn/checkTokenBurnStatusCdPaid', params)
      // if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
      //   this.$router.push({ path: '/token/burn', query: { key: this.seq }}) // 실행 화면으로 이동
      // } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = item.name
        const payCode = this.$PAY_CODE_PLAN

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode)

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/store'
        // let payFailUrl = '/payment/item?s=' + item.seq // 디바이스가 데스크탑인 경우
        let payFailUrl = '/plan' // 디바이스가 데스크탑인 경우
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          payFailUrl = '/paymentMobile' // 디바이스가 모바일인 경우
        }
        const key = item.seq // insert로 받아온 seq를 설정 ※ item의 seq는 토큰 seq이고, this.seq는 token_burn 또는 token_mint 테이블에 insert 된 seq 임.
        const customData = payCode + '|' + paySuccessUrl + '|' + payFailUrl + '|' + key   // db에 들어가는 데이터같음
        this.$store.dispatch('setPaymentCustomData', customData) // 상점 파라미터(customData) 설정

        // 결제 정보 설정
        this.$cookie.set('GOOD_NAME', goodName)
        this.$cookie.set('PAY_CODE', payCode)
        this.$cookie.set('CUSTOM_DATA', customData)
        localStorage.setItem('GOOD_NAME', goodName)
        localStorage.setItem('PAY_CODE', payCode)
        localStorage.setItem('CUSTOM_DATA', customData)

        // 결제 화면으로 이동
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 액션 로그 등록
          this.insertActionLog('100120300', 'go plan payment', item.seq)

          // 디바이스가 모바일인 경우
          this.$router.push('/paymentMobile/plan')
        } else {
          // 액션 로그 등록
          this.insertActionLog('100120300', 'go plan payment', item.seq)

          // 디바이스가 데스크탑인 경우
          // this.$router.push('/PaymentItem')

          // 결제 준비 화면으로
           this.$router.push({ path: '/payment/plan', query: { s: item.seq }})

          // this.$router.push('/payment')
        }
      // }

    },
    clearField() {
    this.nickname= ''
    this.pwd= ''
    this.pwdCheck= ''
    this.bankType= null
    this.bankAccount= ''
    this.walletTyoe= null
    this.walletAddress= ''
    },
    goBack() {
    // goBack 확인창 표시
    this.confirmGoBack = true
    },
    doGoBack() {
    this.$router.go(-1)
    }
}
})
</script>

<style scoped>
</style>
