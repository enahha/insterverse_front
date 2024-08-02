<template>
<q-page class="q-pa-md page-1200">
    <div class="row justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
            {{ $t('menu_admin_media_sale') }}
        </div>
        </div>

        <div class="row justify-center q-pb-md">
        </div>

        <div class="row justify-center q-pb-sm">
            <div class="row srch-wrap">
                <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
                &nbsp;&nbsp;
                <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
            </div>
        </div>

        <div class="row justify-center">
            <div class="col-12">
                <span class="text-weight-bold text-subtitle1">{{ $t('market') }}</span>
            </div>
            </div>
            <div class="row justify-center q-pb-md">
            <div class="col-12">
                <q-select
                    v-model="marketType"
                    :options="marketOption"
                    option-label="label"
                    option-value="value"
                    :label="$t('Market')"
                    outlined
                    dense
                />
            </div>
        </div>

        <q-input v-model="salePrice" label="■ Sale price" standout clearable />
        <br />

        <q-input v-model="nftId" label="■ NFT ID" standout clearable />
        <br />

        <q-input v-model="colletionAddress" label="■ Collection address" standout clearable />
        <br />

        <div class="row justify-center">
            <div class="col-12">
                <span class="text-weight-bold text-subtitle1">{{ $t('payment_currency') }}</span>
            </div>
            </div>
            <div class="row justify-center q-pb-md">
            <div class="col-12">
                <q-select
                    v-model="currencyType"
                    :options="currencyOption"
                    option-label="label"
                    option-value="value"
                    :label="$t('payment_currency')"
                    outlined
                    dense
                />
            </div>
        </div>



        <q-input v-model="settleIn" label="■ Settle in" standout clearable />
        <br />

        <div>
            <q-input v-model="settleInDate" :label="$t('settle in date')" ref="refStartTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="6">
            <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="settleInDate" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
            <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="settleInDate" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-time>
                </q-popup-proxy>
                </q-icon>
            </template>
            </q-input>
        </div>

        <q-input v-model="settleOut" label="■ Settle out" standout clearable />
        <br />
        
        <div>
            <q-input v-model="settleOutDate" :label="$t('settle out date')" ref="refStartTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="6">
            <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="settleOutDate" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
            <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="settleOutDate" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-time>
                </q-popup-proxy>
                </q-icon>
            </template>
            </q-input>
        </div>

        <div class="row justify-center q-pt-lg">
        <div class="col-12 text-center">
            <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="register" style="width: 100%;" no-caps tabindex="2">
            <b>Register</b>
            </q-btn>
        </div>
        </div>

    
        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl" >
        </div>

        <!-- 사용자 리스트 -->
        <q-pull-to-refresh @refresh="refresher">
        <q-infinite-scroll @load="loadMore" :offset="100" ref="infiniteScroll">

            <div v-for="item in mediaSaleList" :key="item.seq" style="cursor: pointer;z-index: 1; padding: 10px;">
            <q-separator />
            <q-item>
                <q-item-section avatar>
                <!-- <q-avatar>
                    <img v-if="item.profile_image" :src="item.profile_image">
                    <q-icon v-else name="account_circle" size="md" />
                </q-avatar> -->
                </q-item-section>

                <q-item-section>
                <div class="row">
                    <q-item-label class="col-12"><div class="end"><q-icon name="delete_forever" size="sm" @click="deleteMediaSale(item.seq)"/></div></q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">market : </span>{{ item.market_name }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Colletion address : </span>{{ item.colletion_address }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">NFT ID : </span>{{ item.nft_id }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Currency : </span>{{ item.payment_currency }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Sale price : </span>{{ item.sale_price }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Settle in : </span>{{ item.settle_in }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Settle in date : </span>{{ item.settle_in_date }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Settle out : </span>{{ item.settle_out }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">Settle out date : </span>{{ item.settle_out_date }}</q-item-label>
                </div>
                </q-item-section>
            </q-item>

            <!-- 관리자 수정용 -->
            <!-- <div v-if="isAdmin" class="text-right">
                <q-btn @click="goSetDescription(item.seq)" size="sm" label="Modify" />
            </div> -->
            <div class="end">{{ item.reg_time }}</div>
            </div>
            <q-separator />

            <br>
            <br>
            <template v-slot:loading>
            <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
            </div>
            </template>
        </q-infinite-scroll>
        </q-pull-to-refresh>

        <div v-if="noDataFlag" class="row justify-center">
        <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
        </div>

        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl">
    </div>


</q-page>
<LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
<NoticeDetailModal ref="refNoticeDetailModal" @callback-detail="callbackDetail" />

<q-dialog v-model="confirmDelete">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteMediaSale" />
      </q-card-actions>
    </q-card>
  </q-dialog>


</template>

<script>
import { defineComponent } from 'vue';
// import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'

export default defineComponent({
name: 'AdminMaintenance',
data () {
    return {
        confirmDelete: false,
        deleteSeq: 0,
        refresherDone: '',
        pageSize: 100,
        lastPageNum: 1, // 마지막 페이지
        mediaSaleList: [],
        noDataFlag: false,
        keyword: '', // 검색키워드

        salePrice: '',
        nftId: '',
        colletionAddress: '',
        settleIn: '',
        settleInDate: '',
        settleOut: '',
        settleOutDate: '',
        marketType: null,
        currencyType: null,
        marketOption: [
            {
            label: '메직에덴',
            value: 'magicaden',
            },
            {
            label: '오픈씨',
            value: 'open sea',
            },
        ],
        currencyOption: [
            {
            label: 'USDT',
            value: 'USDT',
            },
        ],

    }
},
components: {
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
    // 검색 키워드 설정
    this.keyword = this.getKeyword

    this.selectListMax()
},
mounted: function () {
    this.refresher(null)
  },
methods: {
    async search() {
      await this.selectListMax()
      await this.refresher(null)
    },
    // 추가발행
    addTotalSupply() {
        this.confirmAdd = true
    },
    doAddTotalSupply() {
        const params = {
            seq: this.addTokenSeq, // KSTAR_SEQ = 153
            wallet_address: this.walletAddress, // token owner wallet address
            // wallet_address: '0xd6AC741d0060b89AD93Ff4c9578B4373DEd77A6D', // HALF
            add_total_supply_amount: this.totalSupply,
        }
        this.$q.loading.show() // 로딩 표시
        this.$axios.post('/api/token/addTotalSupplyToken', params)
            .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩 표시 종료
            if (result.data && result.data.resultCd === 'SUCCESS') {
                // console.log(result.data)
                this.$noti(this.$q, this.$t('test_success'))
            } else {
                this.$noti(this.$q, this.$t('test_failed'))
                this.$noti(this.$q, result.data.resultMsg)
            }
            })
            .catch((err) => {
            this.$q.loading.hide() // 로딩 표시 종료
            console.log(err)
            this.$noti(this.$q, err)
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
    // 검색어 입력창 키업 이벤트
    onKeyup (event) {
      // 키워드 설정
      this.$store.dispatch('setKeyword', this.keyword)
      
      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    showDetail(seq) {
      // 상세 화면으로 이동
      // this.$router.push({ path: '/token/detail', query: { seq: seq }})
      this.$refs.refUserDetailModal.seq = seq
      this.$refs.refUserDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.mediaSaleList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMore(1, done)
    },
    loadMore(index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        // console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 신규 토큰 리스트 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/mediaSale/selectMediaSaleListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 신규 토큰 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }
      this.$axios.get('/api/mediaSale/selectMediaSaleList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.mediaSaleList = [] // 리스트 초기화
          }
          this.mediaSaleList = this.mediaSaleList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.mediaSaleList || this.mediaSaleList.length < 1) {
            this.noDataFlag = true
          } else {
            this.noDataFlag = false
          }
          if (done) {
            done()
          }
        })
        .catch((err) => {
          console.log(err)
          if (done) {
            done()
          }
        })
    },
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value);
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value);
    },
    ///////////////////////////////////////////////////////////////////////////
    validate() {
      let result = true
      if (!this.$refs.refTitle.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_notice_title'))
        result = false
      }
      if (!this.$refs.refTitleKo.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_notice_title'))
        result = false
      }
      if (this.$refs.refContents.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_notice_contents'))
        result = false
      }
      if (this.$refs.refContentsKo.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_notice_contents'))
        result = false
      }
      return result
    },
    // 공지사항 등록
    register() {
      // Field validation check
    //   if(!this.validate()) {
    //     return
    //   }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // 공지사항 등록 처리
      const param = {
        uid: this.getUid,
        market_cd: this.marketType.value,
        market_name: this.marketType.name,
        sale_price: this.salePrice,
        payment_currency: this.currencyType.value,
        colletion_address: this.colletionAddress,
        nft_id: this.nftId,
        settle_in: this.settleIn,
        settle_in_date: this.settleInDate,
        settle_out: this.settleOut,
        settle_out_date: this.settleOutDate,
      }
      this.$axios.post('/api/mediaSale/insertMediaSale', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_notice_success'))
          } else {
            this.$noti(this.$q, this.$t('register_notice_failed'))
          }

          // 2. 페이지 이동
          this.$router.push('/admin/adminMediaSale')
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    deleteMediaSale(seq) {
      // 삭제 확인창 표시
      this.deleteSeq = seq
      this.confirmDelete = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeleteMediaSale(seq) {
    //   this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.deleteSeq,
      }
      this.$axios.post('/api/mediaSale/deleteMediaSale', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        //   this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('delete_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
          
          // 2. 페이지 이동
          this.$router.push('/admin/adminMediaSale')
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    }
})
</script>

<style scoped>
</style>
