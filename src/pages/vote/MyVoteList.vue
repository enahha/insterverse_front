<template>
  <q-page class="page-default my-vote-list-wrap">
    <div class="row q-pt-md q-pl-md justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_my_vote_list') }}
      </div>
    </div>
    <div class="row q-pl-md row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_my_vote_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="row srch-wrap">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
      <!-- &nbsp;&nbsp;
      <q-btn @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" /> -->
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 나의 투표 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <q-card class="my-card q-pt-sm q-ml-md q-mr-md q-mb-lg" v-for="item in voteList" :key="item.seq">

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img v-if="item.project_logo_image" :src="item.project_logo_image">
                <q-icon v-else name="how_to_vote" size="md" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row">
                <q-item-label class="col-12">{{ $t('vote_seq') }} [ {{ item.seq }} ]</q-item-label>
                <q-item-label v-if="locale === 'ko-KR'" class="col-12 text-weight-bold">{{ item.title_ko }}</q-item-label>
                <q-item-label v-else class="col-12 text-weight-bold">{{ item.title }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>

          <!-- Action Button -->
          <q-card-actions align="around">
            <!-- {{ item.status_cd }} -->
            <!-- delete -->
            <q-btn v-if="item.status_cd === '10'" flat style="width: 23%;" @click="deleteVote(item)" no-caps>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="delete_forever" /></td>
                </tr>
                <tr>
                  <td><span class="text-white">{{ $t('delete') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- modify -->
            <q-btn v-if="item.status_cd < '20'" flat style="width: 23%;" @click="goModify(item.seq)" no-caps>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="edit" /></td>
                </tr>
                <tr>
                  <td><span class="text-white">{{ $t('modify') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- detail -->
            <q-btn flat style="width: 23%;" @click="goDetail(item.seq)" no-caps>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="preview" /></td>
                </tr>
                <tr>
                  <td><span class="text-white">{{ $t('detail') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- fix -->
            <q-btn v-if="item.status_cd < '30'" flat style="width: 23%;" @click="fixVote(item)" no-caps>
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="double_arrow" /></td>
                </tr>
                <tr>
                  <td><span class="text-white">{{ $t('fix') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- close off vote -->
            <!-- 30: VOTE_STATUS_CD_FIXED -->
            <q-btn v-if="item.status_cd === '30'" flat style="width: 23%;" @click="closeOffVote(item)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="done_outline" /></td>
                </tr>
                <tr>
                  <td><span class="text-white text-lowercase">{{ $t('close_off') }}</span></td>
                </tr>
              </table>
            </q-btn>
            <!-- withdraw -->
            <!-- 40: VOTE_STATUS_CD_CLOSED -->
            <q-btn v-if="item.status_cd === '40'" flat style="width: 23%;" @click="goVoteWithdraw(item.seq)">
              <table border="0" cellpadding="0" sellspacing="0" width="100%">
                <tr>
                  <td><q-icon name="rocket_launch" /></td>
                </tr>
                <tr>
                  <td><span class="text-white text-lowercase">{{ $t('withdraw') }}</span></td>
                </tr>
              </table>
            </q-btn>
          </q-card-actions>
          
        </q-card>

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

  <!-- confirm delete -->
  <q-dialog v-model="confirmDelete">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteVote" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- confirm fix -->
  <q-dialog v-model="confirmFix">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_fix') }}</span>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('fix')" color="black" v-close-popup @click="doFixVote" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- confirm closeOff -->
  <q-dialog v-model="confirmCloseOff">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_close_off') }}</span>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('close_off')" color="black" v-close-popup @click="doCloseOffVote" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MyVoteList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      refresherDone: '',
      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      confirmDelete: false,
      confirmFix: false,
      confirmCloseOff: false,
      targetItem: '',
      voteList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      // contractList: [
      //   {
      //     seq: 1,
      //     mainnet: 'KLAYTN',
      //     contract_address: '0xKlaytnContract',
      //   },
      //   {
      //     seq: 2,
      //     mainnet: 'ETHEREUM',
      //     contract_address: '0xEthereumContract',
      //   },
      // ],
    }
  },
  components: {
  },
  watch: {
    getUid (newValue) {
      // console.log('newValue: : ' + newValue)
      // this.loadMore(1, null)
      this.refresher(null)
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
  },
  methods: {
    // 검색
    async search() {
      await this.selectListMax()
      await this.refresher(null)
    },
    // 검색어 입력창 키업 이벤트
    onKeyup (event) {
      // 키워드 설정
      this.$store.dispatch('setKeyword', this.keyword)
      
      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    // showDetail(seq) {
    //   // 상세 화면으로 이동
    //   // this.$router.push({ path: '/token/detail', query: { seq: seq }})
    //   this.$refs.refTokenDetailModal.tokenSeq = seq
    //   this.$refs.refTokenDetailModal.show()
    // },
    goDetail(seq) {
      // 상세 화면으로 이동
      this.$router.push({ path: '/vote/voteDetail', query: { s: seq }})
      // this.$refs.refTokenDetailModal.tokenSeq = seq
      // this.$refs.refTokenDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.voteList = []
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
    // 프로젝트 리스트 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/vote/selectMyVoteListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 프로젝트 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
        // 키워드 설정
        this.$store.dispatch('setKeyword', this.keyword)
      }
      this.$axios.get('/api/vote/selectMyVoteList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.voteList = [] // 리스트 초기화
          }
          this.voteList = this.voteList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.voteList || this.voteList.length < 1) {
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
    goRegister() {
      // 프로젝트 등록 화면으로 이동
      this.$router.push('/vote/registerVote')
    },
    goModify(seq) {
      // 프로젝트 수정 화면으로 이동
      this.$router.push({ path: '/vote/modifyVote', query: { seq: seq }})
    },
    goRegisterVote(seq) {
      // 투표 등록 화면으로 이동
      this.$router.push({ path: '/vote/registerVote', query: { seq: seq }})
    },
    goVoteWithdraw(seq) {
      // 펀드 출금 화면으로 이동
      this.$router.push({ path: '/vote/voteWithdraw', query: { seq: seq }})
    },
    fixVote(item) {
      // 대상 아이템 설정
      this.targetItem = item
      
      // 투표 확정 확인창 표시
      this.confirmFix = true
    },
    // 투표 확정 확인창에서 생성 버튼 클릭시 - 투표 확정 처리 (홀더리스트 생성)
    doFixVote() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.targetItem.seq,
      }
      this.$axios.post('/api/vote/updateVoteStatusCdFixed', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료

          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            // this.refresher(null)

            // 대상 아이템의 status_cd 설정
            this.targetItem.status_cd = result.data.status_cd

            this.$noti(this.$q, this.$t('process_success')) // '처리 완료'
          } else {
            this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    deleteVote(item) {
      // 대상 아이템 설정
      this.targetItem = item
      
      // 삭제 확인창 표시
      this.confirmDelete = true
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeleteVote() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.targetItem.seq,
      }
      this.$axios.post('/api/vote/deleteVote', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // 리스트 재조회
            this.refresher(null)
            this.$noti(this.$q, this.$t('delete_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 마감 확인창 표시
    closeOffVote(item) {
      this.targetItem = item
      // this.closeOffSeq = item.seq // vote 의 seq
      // this.maxSelect = item.max_select // vote 의 max_select
      // this.selectType = item.select_type // vote 의 max_select
      this.confirmCloseOff = true
    },
    // 마감 처리
    async doCloseOffVote() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.targetItem.seq, // vote 테이블의 seq
      }
      // console.log(params)
      const result = await this.$axios.post('/api/vote/updateVoteStatusCdClosed', params)
      this.$q.loading.hide() // 로딩 표시 종료
      if (result && result.data && result.data.resultCd === 'SUCCESS') {
        this.targetItem.status_cd = '40' // 40: 마감 완료
        this.$noti(this.$q, this.$t('process_success')) // '처리 완료'
      } else {
        this.$noti(this.$q, this.$t('process_failed')) // '처리 실패'
      }
    },
    copyValue(value) {
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      console.log(1)
      // 클립보드로 복사하기
      this.$copyText(String(value)).then(this.copyValueSuccess, this.copyValueFail)
      console.log(2)
    },
    copyValueSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_success'))
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_failed'))
    },

    // // 상세 설정으로 이동
    // goSetDescription(seq) {
    //   this.$router.push({ path: '/token/description', query: { seq: seq }})
    // },

  },
})
</script>

<style scoped>
</style>
