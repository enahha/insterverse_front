<template>

    <q-dialog v-model="settleOutHistoryModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">
  
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
        <q-header class="bg-white" elevated>
          <q-toolbar>
            <q-toolbar-title class="text-body2 text-black">
              <span class="text-weight-bold text-subtitle1">{{ $t('settle_out_list') }}</span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
          </q-toolbar>
        </q-header>
        <br />
  
        <div style="margin-top: 50px;">
          <q-pull-to-refresh @refresh="refresher">
          <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

              <div v-for="item in settleOutList" :key="item.seq" style="cursor: pointer;z-index: 1;">
              <q-item>
                  <q-item-section>
                  <div class="list-item">
                      <q-item-label class="col-9 text-weight-bold" style="display: flex; justify-content: space-between;">
                        <span>{{ item.settle_out_date }}</span>
                        <span>{{ $t('menu_mypage_currncy') }} {{ item.settle_out }}</span>
                      </q-item-label>
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
            <img src="images/no_data.png" style="width: 35%; max-width: 250px;" />
          </div>
        </div>
      </q-layout>
    </q-dialog>
    
  
    <IframeModal ref="refIframeModal" />
  
    <!-- <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="row items-center" style="min-width: 200px;">
          <q-icon name="warning" color="primary" size="md" />
          <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="around">
          <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
          <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteNotice" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  
  </template>
  
  <script>
  import { useI18n } from 'vue-i18n'
  import { date } from 'quasar'
  
  export default {
    name: 'settleOutHistoryModal',
    data () {
      return {
        settleOutHistoryModal: false,
        maximized: false,
        confirmDelete: false, // 삭제 확인창
        uid: 'dmsdk921@gmail.com',
        keyword: '',
        refresherDone: '',
        pageSize: 100,
        lastPageNum: 1, // 마지막 페이지
        noDataFlag: false,
        settleOutList: [],
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
      isAdmin () {
        return this.$store.getters.getAdcd === this.$adminCode
      },
      qDate() {
        return date
      },
    },
    methods: {
        async show () {
            if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
                // 디바이스가 모바일인 경우
                this.maximized = true
            } else {
                // 디바이스가 데스크탑인 경우
                this.maximized = false
            }
            this.settleOutHistoryModal = true

            // // 정산 내역 조회
            this.selectListMax()
        },
        // 정산 내역 조회
        refresher (done) {
            // done - Function to call when you made all necessary updates.
            //        DO NOT forget to call it otherwise the refresh message
            //        will continue to be displayed
            // make some Ajax call then call done()
            this.settleOutList = []
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
            this.$axios.get('/api/mediaSale/selectMyMediaSaleSettlOutLastPageNum',
                {params: {uid: this.uid, pageSize: this.pageSize, keyword: this.keyword}})
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
            if (!this.keyword) {
                this.keyword = ''
            }
            this.$axios.get('/api/mediaSale/selectMyMediaSaleSettlOutList',
                {params: {uid: this.uid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
                .then((result) => {
                // console.log(JSON.stringify(result.data))
                console.log(result.data)
                if (idx === 1) { // 첫번째 load인 경우
                    this.settleOutList = [] // 리스트 초기화
                }
                this.settleOutList = this.settleOutList.concat(result.data)

                // 데이터 없음 표시 설정
                if (!this.settleOutList || this.settleOutList.length < 1) {
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

    //   goModify() {
    //     this.$router.push({ path: '/notice/modify', query: { seq: this.noticeVo.seq }})
    //   },
    //   deleteNotice() {
    //     // 삭제 확인창 표시
    //     this.confirmDelete = true
    //   },
    //   doDeleteNotice() {
    //     this.$q.loading.show() // 로딩 표시 시작
  
    //     // 공지사항 삭제 처리
    //     const param = {
    //       uid: this.getUid,
    //       seq: this.seq,
    //     }
    //     this.$axios.post('/api/notice/deleteNotice', param)
    //       .then((result) => {
    //         // console.log(JSON.stringify(result.data))
    //         this.$q.loading.hide() // 로딩 표시 종료
    //         if (result.data && result.data.resultCd === 'SUCCESS') {
    //           this.$noti(this.$q, this.$t('delete_notice_success'))
  
    //           this.$emit('callback-detail') // 리스트 화면 새로고침
    //         } else {
    //           this.$noti(this.$q, this.$t('delete_notice_failed'))
    //         }
  
    //         // 2. 페이지 이동 - 공지사항 리스트 화면
    //         this.$router.push('/notice')
    //         this.close()
    //       })
    //       .catch((err) => {
    //         this.$q.loading.hide() // 로딩 표시 종료
    //         console.log(err)
    //         this.$noti(this.$q, err)
    //       })
    //   },
      close () {
        this.settleOutHistoryModal = false
      }
    }
  }
  </script>
  