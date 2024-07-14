<template>
  <q-page class="page-default">
    <div class="row q-pt-md q-pl-md justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_vote_list') }}
      </div>
    </div>
    <div class="row q-pl-md row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_vote_list_description') }}
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

    <!-- 투표 리스트 -->
    <q-pull-to-refresh @refresh="refresher" class="vote-list">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="item in voteList" :key="item.seq">
          <q-item clickable @click="goDetail(item.seq)">
            <q-item-section avatar>
              <q-avatar>
                <img v-if="item.project_logo_image" :src="item.project_logo_image">
                <q-icon v-else name="rocket_launch" size="md" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row list-item">
                <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.project_title_ko }}</q-item-label>
                <q-item-label v-else class="col-12">{{ item.project_title }}</q-item-label>
                <q-item-label v-if="locale === 'ko-KR'" class="col-12 text-yellow">{{ item.title_ko }}</q-item-label>
                <q-item-label v-else class="col-12 text-yellow">{{ item.title }}</q-item-label>
                <q-item-label>{{ item.start_time }} ~ {{ item.end_time }}</q-item-label>
                <q-item-label>&nbsp;</q-item-label>
                <q-item-label>
                  <table border="0" width="100%" cellpadding="2" cellspacing="0" align="center">
                    <tr>
                      <td class="text-center" width="20">
                        <span class="text-bold text-green">O&nbsp;</span>
                      </td>
                      <td class="text-left">
                        <q-linear-progress size="30px" :value="item.rate_agree.toFixed(3) / 100" color="green-5" class="bg-black" rounded>
                          <div class="absolute-full flex flex-center">
                            <q-badge color="white" text-color="black">
                              {{ item.rate_agree.toFixed(3) }} %
                            </q-badge>
                          </div>
                        </q-linear-progress>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <span class="text-bold text-red">X&nbsp;</span>
                      </td>
                      <td class="text-left">
                        <q-linear-progress size="30px" :value="item.rate_disagree.toFixed(3) / 100" color="red-5" class="bg-black" rounded>
                          <div class="absolute-full flex flex-center">
                            <q-badge color="white" text-color="black">
                              {{ item.rate_disagree.toFixed(3) }} %
                            </q-badge>
                          </div>
                        </q-linear-progress>
                      </td>
                    </tr>
                  </table>
                </q-item-label>
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
  
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'VoteList',
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
      voteList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
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
    // 신규 토큰 리스트 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/vote/selectVoteListLastPageNum',
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
      this.$axios.get('/api/vote/selectVoteList',
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
      // 투표 등록 화면으로 이동
      this.$router.push('/vote/registerVote')
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
