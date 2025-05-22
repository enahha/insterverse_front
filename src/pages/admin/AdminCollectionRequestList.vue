<template>
<q-page class="q-pa-md page-1200">
    <div class="row justify-center page-tit">
        <div class="col-12 doc-heading doc-h2">
            {{ $t('menu_admin_collection_request') }}
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

        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl" >
        </div>

        <!-- 사용자 리스트 -->
        <q-pull-to-refresh @refresh="refresher">
        <q-infinite-scroll @load="loadMore" :offset="100" ref="infiniteScroll">

            <div v-for="item in projectCollectionList" :key="item.seq" style="cursor: pointer;z-index: 1; padding: 10px;">
            <q-separator />
            <q-item>
                <q-item-section clickable @click="goDetail(item.seq)">
                <div class="row">
                    <!-- <q-item-label class="col-12"><div class="end"><q-icon name="delete_forever" size="sm" @click="delete(item.seq)"/></div></q-item-label> -->
                    <q-item-label class="col-12"><span class=" text-weight-bold">seq : </span>{{ item.seq }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">title : </span>{{ item.title }}</q-item-label>
                    <q-item-label class="col-12"><span class=" text-weight-bold">subtitle : </span>{{ item.subtitle }}</q-item-label>
                    <!-- <q-item-label class="col-12"><span class=" text-weight-bold">description : </span>{{ item.description }}</q-item-label> -->
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
        <img src="images/galleryx_nodata_txt.png" style="width: 50%; max-width: 400px;" />
        </div>

        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl">
    </div>


</q-page>
<LoginModal ref="refLoginModal" @callback-login="callbackLogin" />
<CollectionRequestInfoModal ref="refCollectionRequestInfoModal"  @callback-modify="callbackModify"/>

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
        projectCollectionList: [],
        noDataFlag: false,
        keyword: '', // 검색키워드
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
    goDetail(seq) {
      this.$refs.refCollectionRequestInfoModal.projectVo.seq = seq
      this.$refs.refCollectionRequestInfoModal.show()
    },
    callbackModify() {
      this.refresher(null)
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
      this.projectCollectionList = []
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
    // 컬렉션 등록 요청 리스트 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/project/selectProjectListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, statusCd: this.$PROJECT_STATUS_CD_MINT}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컬렉션 등록 요청 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }
      this.$axios.get('/api/project/selectProjectList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, statusCd: this.$PROJECT_STATUS_CD_MINT}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.projectCollectionList = [] // 리스트 초기화
          }
          this.projectCollectionList = this.projectCollectionList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.projectCollectionList || this.projectCollectionList.length < 1) {
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
        contract_address: this.contractAddress,
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
            
            // 리스트 재조회
            this.selectListMax()
          } else {
            this.$noti(this.$q, this.$t('register_notice_failed'))
          }
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
            
            // 리스트 재조회
            this.selectListMax()
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
