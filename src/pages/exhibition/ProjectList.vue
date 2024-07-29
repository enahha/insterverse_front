<template>
  <q-page class="page-1200 q-pa-md project-list-wrap">
      <div class="row title">
        <div class="col-12 doc-heading">
          <div class="title-sec">{{ $t('menu_project_list') }}   <span class="subtitle" v-if="locale === 'ko-KR'">Exhibition</span></div>
        </div>
      </div>
      <!-- <div class="row q-pl-md justify-center page-sub-tit">
        <div class="col-12">
          {{ $t('menu_project_list_description') }}
        </div>
      </div>
      <div class="row justify-center q-pb-md">
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

      <!-- 프로젝트 리스트 -->
      <q-pull-to-refresh @refresh="refresher" class="project-list">
        <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

          <div v-for="item in projectList" :key="item.seq">
            <q-item clickable @click="goDetail(item.seq)">
              <q-item-section avatar>
                <q-avatar>
                  <img v-if="item.postar_url" :src="item.postar_url">
                  <q-icon v-else name="rocket_launch" size="md" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <div class="row list-item">
                  <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.title_ko }}</q-item-label>
                  <q-item-label v-else class="col-12">{{ item.title }}</q-item-label>
                  <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.summary_ko }}</q-item-label>
                  <q-item-label v-else class="col-12">{{ item.summary }}</q-item-label>
                </div>
              </q-item-section>
            </q-item>

            <!-- 관리자 수정용 -->
            <!-- <div v-if="isAdmin" class="text-right">
              <q-btn @click="goSetDescription(item.seq)" size="sm" label="Modify" />
            </div> -->
          </div>
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
    <!-- <TokenDetailModal ref="refTokenDetailModal"/> -->
    <WalletModal ref="refWalletModal" />
  </template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ProjectList',
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
      projectList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
    }
  },
  components: {
  },
  watch: {
    // getUid (newValue) {
    //   // console.log('newValue: : ' + newValue)
    //   // this.loadMore(1, null)
    //   this.refresher(null)
    //   // if (!newValue) {
    //   //   this.$router.push('/')
    //   // } else {
    //   //   this.loadMore(1, null)
    //   // }
    // },
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
      this.$router.push({ path: '/exhibition/detail', query: { s: seq }})
      // this.$refs.refTokenDetailModal.tokenSeq = seq
      // this.$refs.refTokenDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.projectList = []
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
      this.$axios.get('/api/project/selectProjectListLastPageNum',
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
      this.$axios.get('/api/project/selectProjectList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.projectList = [] // 리스트 초기화
          }
          this.projectList = this.projectList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.projectList || this.projectList.length < 1) {
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

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // 프로젝트 등록 화면으로 이동
      this.$router.push('/project/registerProject')
    },

    // 상세 설정으로 이동
    goSetDescription(seq) {
      this.$router.push({ path: '/token/description', query: { seq: seq }})
    },

  },
})
</script>

<style scoped>
</style>
