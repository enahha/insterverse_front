<template>
<q-page class="q-pa-md page-1200">
    <div class="row justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
            {{ $t('menu_admin_media_sale') }}
        </div>
        </div>

        <div class="row justify-center q-pb-md">
        </div>

        <div class="row justify-center q-pt-lg">
        <div class="col-12 text-center">
            <q-btn class="btn" color="grey-1" text-color="black" size="lg" @click="goRegister" style="width: 100%;" no-caps tabindex="2">
            <b>Regist</b>
            </q-btn>
        </div>
        </div>

        <q-tabs
          v-model="tab"
          no-caps
          align="justify"
          inline-label
        >
          <q-tab name="1">정산 미완료</q-tab>
          <q-tab name="2">정산 완료</q-tab>
        </q-tabs>

        <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
        </q-page-scroller> -->


        <q-tab-panels v-model="tab">
        <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
        <!-- 정산 미완료 패널 -->
        <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
        <q-tab-panel name="1" style="word-break: break-word;">
          <div class="row justify-center q-pb-sm">
            <div class="row srch-wrap">
                <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
                &nbsp;&nbsp;
                <q-btn @click="searchIncompleteList" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
            </div>
          </div>


          <!-- 미완료 리스트 -->
          <q-pull-to-refresh @refresh="refresherIncompleteList">
          <q-infinite-scroll @load="loadMoreIncompleteList" :offset="100" ref="infiniteScroll">

              <div v-for="item in mediaSaleIncompleteList" :key="item.seq" style="cursor: pointer;z-index: 1; padding: 10px;">
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
                      <q-item-label class="col-12"><div class="end"><q-icon name="edit" size="sm" @click="showMediaSaleModifyModal(item)"/></div></q-item-label>
                      <q-item-label class="col-12"><span class=" text-weight-bold">market : </span>{{ item.market_name }}</q-item-label>
                      <q-item-label class="col-12"><span class=" text-weight-bold">Colletion address : </span>{{ item.contract_address }}</q-item-label>
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
        </q-tab-panel>
        <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
        <!-- 2. 정산 완료 패널 -->
        <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
        <q-tab-panel name="2" style="word-break: break-word;">
          <div class="row justify-center q-pb-sm">
            <div class="row srch-wrap">
                <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
                &nbsp;&nbsp;
                <q-btn @click="searchDoneList" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
            </div>
          </div>

          <!-- 완료 리스트 -->
          <q-pull-to-refresh @refresh="refresherDoneList">
          <q-infinite-scroll @load="loadMoreDoneList" :offset="100" ref="infiniteScroll">

              <div v-for="item in mediaSaleDoneList" :key="item.seq" style="cursor: pointer;z-index: 1; padding: 10px;">
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
                      <q-item-label class="col-12"><div class="end"><q-icon name="edit" size="sm" @click="showMediaSaleModifyModal(item)"/></div></q-item-label>
                      <q-item-label class="col-12"><span class=" text-weight-bold">market : </span>{{ item.market_name }}</q-item-label>
                      <q-item-label class="col-12"><span class=" text-weight-bold">Colletion address : </span>{{ item.contract_address }}</q-item-label>
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
        </q-tab-panel>
      </q-tab-panels>
    <!-- <div v-if="noDataFlagDoneList" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
    </div> -->

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>
</q-page>
<LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
<MediaSaleModifyModal ref="refMediaSaleModifyModal" @callback-modify="callbackModify" />

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
        tab: '1',
        confirmDelete: false,
        deleteSeq: 0,
        refresherDone: '',
        pageSizeDoneList: 100,
        lastPageNumDoneList: 1, // 마지막 페이지
        mediaSaleDoneList: [],
        noDataFlagDoneList: false,
        keyword: '', // 검색키워드
        
        mediaSaleIncompleteList: [],
        noDataFlagIncompleteList: false,
        lastPageNumIncompleteList: 1, // 마지막 페이지
        pageSizeIncompleteList: 100,



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

    this.selectDoneListMax()
    this.selectIncompleteListMax()
},
mounted: function () {
    this.refresherDoneList(null)
    this.refresherIncompleteList(null)
  },
methods: {
    async searchDoneList() {
      await this.selectDoneListMax()
      await this.refresherDoneList(null)
    },
    async searchIncompleteList() {
      await this.selectIncompleteListMax()
      await this.refresherIncompleteList(null)
    },
    // 추가발행
    addTotalSupply() {
        this.confirmAdd = true
    },
    goRegister() {
      this.$router.push('/admin/adminMediaSaleRegister')
    },
    showMediaSaleModifyModal(item) {
      this.$refs.refMediaSaleModifyModal.mediaSaleVo = item
      this.$refs.refMediaSaleModifyModal.mediaSaleVo.uid = this.getUid
      this.$refs.refMediaSaleModifyModal.show()
    },
    callbackModify() {
      this.refresherDoneList(null)
      this.refresherIncompleteList(null)
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
    refresherDoneList (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.mediaSaleDoneList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMoreDoneList(1, done)
    },
    loadMoreDoneList(index, done) {
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
        if (index <= this.lastPageNumDoneList) {
          this.selectDoneList(index, done)
          if (index === this.lastPageNumDoneList) {
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
    // 정산 완료 리스트 마지막 페이지 조회
    selectDoneListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/mediaSale/selectMediaSaleListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSizeDoneList, keyword: this.keyword, done: true}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumDoneList = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 정산 완료 리스트 조회
    selectDoneList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }
      this.$axios.get('/api/mediaSale/selectMediaSaleList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSizeDoneList, keyword: this.keyword, done: true}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.mediaSaleDoneList = [] // 리스트 초기화
          }
          this.mediaSaleDoneList = this.mediaSaleDoneList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.mediaSaleDoneList || this.mediaSaleDoneList.length < 1) {
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
    refresherIncompleteList (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.mediaSaleIncompleteList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMoreIncompleteList(1, done)
    },
    loadMoreIncompleteList(index, done) {
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
        if (index <= this.lastPageNumDoneList) {
          this.selectIncompleteList(index, done)
          if (index === this.lastPageNumDoneList) {
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
    // 정산 미완료 리스트 마지막 페이지 조회
    selectIncompleteListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/mediaSale/selectMediaSaleListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSizeIncompleteList, keyword: this.keyword, done: false}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumIncompleteList = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 정산 미완료 리스트 조회
    selectIncompleteList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }
      this.$axios.get('/api/mediaSale/selectMediaSaleList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSizeIncompleteList, keyword: this.keyword, done: false}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.mediaSaleIncompleteList = [] // 리스트 초기화
          }
          this.mediaSaleIncompleteList = this.mediaSaleIncompleteList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.mediaSaleIncompleteList || this.mediaSaleIncompleteList.length < 1) {
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

            this.refresherDoneList(null)
            this.refresherIncompleteList(null)
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
