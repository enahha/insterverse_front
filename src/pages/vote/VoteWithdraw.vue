<template>
  <q-page class="q-pa-md page-default vote-withdraw-wrap">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_vote_withdraw') }}
      </div>
    </div>
    <div class="row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_vote_withdraw_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <!-- KR -->
    <div v-if="locale === 'ko-KR'" class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 유의 사항 -->
        <div class="row text-bold">
          유의 사항
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm">
          · 수수료를 제외한 금액이 표시됩니다.
        </div>
      </div>
    </div>

    <!-- EN -->
    <div v-else class="row justify-center">
      <div class="col-12" style="word-break: break-word;">
        <!-- 유의 사항 -->
        <div class="row text-bold">
          Notes
        </div>
        <div class="row q-pt-xs q-pl-xs q-pb-sm">
          · The amount excluding the commission is displayed.
        </div>
      </div>
    </div>

    <!-- <q-separator spaced /> -->

    <!-- KLAY -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ pay_token_symbol }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="withdrawal_amount" input-class="text-right" standout readonly />
      </div>
    </div>

    <!-- project wallet address -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_wallet_address') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <q-input v-model="project_wallet_address" standout readonly />
      </div>
    </div>
    
    <!-- withdraw -->
    <div class="row justify-center q-pt-xl">
      <div class="col-12 text-center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="text-h6">
          <tr>
            <td class="text-center">
              <span class="text-weight-bold text-subtitle1">
                {{ $t('vote_withdrawal_time') }}
              </span>
            </td>
          </tr>
          <tr>
            <td v-if="withdrawal_time" class="text-center">
              <span class="text-weight-bold text-subtitle1">
                {{ qDate.formatDate(withdrawal_time, 'YYYY-MM-DD HH:mm:ss') }}
              </span>
            </td>
            <td v-else>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td class="text-center">
              &nbsp;
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <span class="text-weight-bold text-subtitle1">
                {{ $t('vote_withdrawal_txid') }}
              </span>
            </td>
          </tr>
          <tr>
            <td v-if="withdrawal_txid" class="text-center text-blue">
              <a @click="openUrl('https://scope.klaytn.com/tx/' + withdrawal_txid)" style="cursor: pointer;">
                <span class="text-weight-bold text-subtitle1">
                  {{ withdrawal_txid }}
                </span>
              </a>
            </td>
            <td v-else>
              &nbsp;
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-md">
    </div>

    <!-- buttons -->
    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="2">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn v-if="!withdrawal_time" class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="withdraw" tabindex="1">
          <b>{{ $t('withdraw') }}</b>
        </q-btn>
        <q-btn v-else class="btn" color="grey-5" text-color="black" size="lg" style="width: 98%;" @click="withdraw" disable tabindex="1">
          <b>{{ $t('withdraw') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <WalletModal ref="refWalletModal" />

  <!-- confirm delete -->
  <q-dialog v-model="confirmWithdraw">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_withdraw') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('withdraw')" color="black" v-close-popup @click="doWithdraw" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue';
import { date } from 'quasar'
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
// import { ref } from 'vue'
// import _ from 'lodash'

export default defineComponent({
  name: 'VoteWithdraw',
  data () {
    return {
      confirmWithdraw: false,
      project_wallet_address: '',
      withdrawal_txid: '',
      withdrawal_time: '',
      voteSeq: '',
      pay_token_symbol: '',
      fund_total: '',
      fund_fee: '',
      withdrawal_amount: '',
      // klay_remit: '0',
      // kstar_remit: '0',
      // usdt_remit: '0',
      // usdc_remit: '0',
      // usd_remit: '0',
      // usdToKrw: '',
      // tokenPriceKlay: '0',
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    qDate() {
      return date
    },
  },
  created: function () {
    // 키 설정
    this.voteSeq = this.$route.query.seq

    // 사전판매 조회
    this.selectVote()
  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    async selectVote() {
      const param = {
        uid: this.getUid,
        seq: this.voteSeq,
      }
      const result = await this.$axios.get('/api/vote/selectVote', { params: { ...param } })
      if (result.data) {
        // 항목 설정
        // this.klay_remit = result.data.klay_remit
        // this.kstar_remit = result.data.kstar_remit
        // this.usdt_remit = result.data.usdt_remit
        // this.usdc_remit = result.data.usdc_remit
        // this.usd_remit = result.data.usd_remit

        if (result.data.project_mainnet === 'KLAYTN') {
          this.pay_token_symbol = 'KLAY'
        } else if (result.data.project_mainnet === 'ETHEREUM') {
          this.pay_token_symbol = 'ETH'
        } else {
          // 추후 확장
        }
        this.project_wallet_address = result.data.project_wallet_address
        this.withdrawal_amount = Number(result.data.withdrawal_amount).toFixed(6)
        this.withdrawal_txid = result.data.withdrawal_txid
        this.withdrawal_time = result.data.withdrawal_time
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    withdraw() {
      // 확인창 표시
      this.confirmWithdraw = true
    },
    doWithdraw() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.voteSeq,
      }
      this.$axios.post('/api/vote/updateVoteWithdraw', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result && result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('process_success'))
            this.selectVote()
          } else {
            if (result && result.data && result.data.resultMsg) { // 투표결과 반대인 경우 - 투표권자의 25% 이상 참여 and 그 중 과반수 이상이 반대해야만 반려
              this.$noti(this.$q, result.data.resultMsg)
            } else {
              this.$noti(this.$q, this.$t('process_failed'))
            }
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    openUrl(url) {
      window.open(url)
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
    copyValue(value) {
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // 클립보드로 복사하기
      this.$copyText(String(value)).then(this.copyValueSuccess, this.copyValueFail)
    },
    copyValueSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_success'))
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_failed'))
    },
    goBack() {
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
</style>
