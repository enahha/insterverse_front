<template>

    <q-dialog v-model="voteHolderListModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down" persistent>

      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
        <q-header class="bg-white" elevated>
          <q-toolbar>
            <q-toolbar-title class="text-black">
              {{ $t('vote_holder_list') }} <span v-if="fixedTime" class="text-body text-grey-7">(Snapshot : {{ fixedTime }})</span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding style="word-break: break-all;">

            <div class="row justify justify-between">
              <div class="row srch-wrap">
                <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
                &nbsp;&nbsp;
                <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outline />
              </div>
            </div>

            <!-- 홀더 목록 리스트 -->
            <q-pull-to-refresh @refresh="refresher" class="holder-list">
              <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

                <div v-for="item in voteHolderList" :key="item.seq" @click="openUrl(scopeKlaytnUrl + 'account/' + item.address)">
                  <q-item clickable>
                    <q-item-section>
                      <div class="list-item">
                        <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center">
                          <tr>
                            <td width="50" class="text-center">
                              {{ item.holder_no }}
                            </td>
                            <td class="text-left">
                              {{ item.address }}
                            </td>
                            <td class="text-center">
                              <span v-if="item.agree_yn === 'Y'" class="text-green text-bold">&nbsp;&nbsp;O</span>
                              <span v-else-if="item.agree_yn === 'N'" class="text-red text-bold">&nbsp;&nbsp;X</span>
                              <span v-else class="text-red text-bold">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </q-item-section>
                  </q-item>
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

            <!-- place QPageScroller at end of page -->
            <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
              <q-btn fab icon="keyboard_arrow_up" color="primary" />
            </q-page-scroller>

          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <IframeModal ref="refIframeModal" />

  </template>

  <script>
  import { useI18n } from 'vue-i18n'
  // import { openURL } from 'quasar'

  export default {
    name: 'HolderListModal',
    data () {
      return {
        voteHolderListModal: false,
        voteSeq: '',
        fixedTime: '',
        maximized: false,
        refresherDone: '',
        pageSize: 100,
        lastPageNum: 1, // 마지막 페이지
        voteHolderList: [],
        noDataFlag: false,
        keyword: '', // 검색키워드
        scopeKlaytnUrl: '',
      }
    },
    setup () {
      const { locale } = useI18n({ useScope: 'global' })
      return {
        locale,
      }
    },
    computed: {
      getUid () {
        return this.$store.getters.getUid
      },
    },
    methods: {
      async show () {
        this.scopeKlaytnUrl = this.$scopeDomainKlaytn
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 디바이스가 모바일인 경우
          this.maximized = true
        } else {
          // 디바이스가 데스크탑인 경우
          this.maximized = false
        }
        this.voteHolderListModal = true

        // 키 설정
        // this.tokenSeq = this.$route.query.seq
        // 화이트리스트 맥스 페이지 조회
        // this.selectListMax()
        this.search()
      },
      // 검색
      async search() {
        await this.selectListMax()
        await this.refresher(null)
      },
      // 검색어 입력창 키업 이벤트
      onKeyup (event) {
        if (event.key === 'Enter') { // 엔터일 경우 검색
          this.search()
        }
      },
      refresher (done) {
        // done - Function to call when you made all necessary updates.
        //        DO NOT forget to call it otherwise the refresh message
        //        will continue to be displayed
        // make some Ajax call then call done()
        this.voteHolderList = []
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
      // 홀더 목록 마지막 페이지 조회
      selectListMax() {
        // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
        if (!this.keyword) {
          this.keyword = ''
        }
        this.$axios.get('/api/vote/selectVoteHolderListLastPageNum',
          {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, voteSeq: this.voteSeq}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.lastPageNum = result.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 홀더 목록 리스트 조회
      selectList(idx, done) {
        if (!this.keyword) {
          this.keyword = ''
        }
        this.$axios.get('/api/vote/selectVoteHolderList',
          {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, voteSeq: this.voteSeq}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (idx === 1) { // 첫번째 load인 경우
              this.voteHolderList = [] // 리스트 초기화
            }
            this.voteHolderList = this.voteHolderList.concat(result.data)

            // 데이터 없음 표시 설정
            if (!this.voteHolderList || this.voteHolderList.length < 1) {
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
      openUrl(url) {
        // cordova인 경우 IframeModal 표시
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
          this.$refs.refIframeModal.url = url
          this.$refs.refIframeModal.show()
        } else {
          window.open(url, '_system')
        }
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
      close () {
        this.voteHolderListModal = false
      }
    }
  }
  </script>
