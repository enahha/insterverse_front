<template>
  <q-page class="page-1200 q-pa-md">
      <div class="row title">
        <div class="col-12 doc-heading">
          <div class="title-sec"><span>{{ $t('notice') }}</span></div>
        </div>
      </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="row srch-wrap">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" style="width: 150px;" clearable borderless />
      &nbsp;&nbsp;
      <!-- <q-btn @click="goRegister" icon="add" size="lg" style="width: 80px;" outline/> -->
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" size="lg" style="width: 80px;" flat  />
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- 공지사항 리스트 -->
    <q-pull-to-refresh @refresh="refresher">
    <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="(item, index) in noticeList" :key="item.seq" @click="showDetail(item.seq)" style="cursor: pointer;z-index: 1;">
          <q-item clickable>
            <q-item-section>
              <div class="list-item">
                <q-item-label v-if="locale === 'ko-KR'" class="col-9 text-weight-bold"><span style="padding-right: 30px;">{{ index + 1 }}</span>{{ item.title_ko }}</q-item-label>
                <q-item-label v-else class="col-9 text-weight-bold">{{ item.title }}</q-item-label>
                <q-item-label class="col-3 text-right">{{ qDate.formatDate(item.reg_time, 'YYYY-MM-DD HH:mm') }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <hr> <!-- 구분선 -->
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>

    <div v-if="noDataFlag" class="row justify-center q-pt-lg">
      <img src="images/galleryx_nodata_txt.png" style="width: 35%; max-width: 250px;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <NoticeDetailModal ref="refNoticeDetailModal" @callback-detail="callbackDetail" />
</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'NoticeList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      uid: '',
      keyword: '',
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 2, // 마지막 페이지
      noDataFlag: false,
      noticeList: [],
    }
  },
  components: {
  },
  watch: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getNickname () {
      return this.$store.getters.getNickname
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    qDate() {
      return date
    },
  },
  created: function () {
    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname)
      this.$store.dispatch('setUid', uid)
    }

    this.selectListMax()

  },
  mounted: function () {
    this.refresher(null)
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
    // 검색
    async search() {
      // 액션 로그 등록
      this.insertActionLog('100700200', 'search notice', null)

      await this.selectListMax()
      await this.refresher(null)
    },
    // 검색어 입력창 키업 이벤트
    onKeyup (event) {
      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    showDetail(seq) {
      // 액션 로그 등록
      this.insertActionLog('100700100', 'noitic detail', seq)

      // 상세 화면으로 이동
      // this.$router.push({ path: '/token/detail', query: { seq: seq }})
      this.$refs.refNoticeDetailModal.seq = seq
      this.$refs.refNoticeDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.noticeList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      console.log("refresher--2")

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
    // 작품 마지막 페이지 조회
    selectListMax() {
      console.log("selectListMax--1")
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/notice/selectNoticeListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 작품 리스트 조회
    selectList(idx, done) {
      console.log("selectList--1")
      
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/notice/selectNoticeList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.noticeList = [] // 리스트 초기화
          }
          this.noticeList = this.noticeList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.noticeList || this.noticeList.length < 1) {
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
      // 공지사항 등록 화면으로 이동
      this.$router.push('/notice/register')
    },
    callbackDetail() {
      this.search()
    },
  },
})
</script>

<style scoped>
</style>
