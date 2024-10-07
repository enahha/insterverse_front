<template>

    <q-dialog v-model="AddMediaModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">
  
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
        <q-header class="bg-white" elevated>
          <q-toolbar>
            <q-toolbar-title class="text-body2 text-black">
              <span class="text-weight-bold text-subtitle1">{{ $t('media_add') }}</span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
          </q-toolbar>
        </q-header>
        <br /><br />
  
        <div v-if="!noDataFlag">
            <!-- <div class="end"><q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" /></div> -->
            
            <!-- <q-pull-to-refresh @refresh="refresher"> -->
            <q-infinite-scroll @load="loadMore" :offset="1000" ref="infiniteScroll">
              <q-table
                style="height: 84vh"
                flat
                :rows="myMediaList"
                :columns="filteredColumns"
                row-key="seq"
                selection="multiple"
                v-model:selected="selected"
                class="media-table-wrapper text-center q-pt-lg"
                virtual-scroll
                v-model:pagination="pagination"
                :rows-per-page-options="[10, 25, 50, 100]"
              >
                <template v-slot:body-cell-media="props">
                  <q-td :props="props">
                    <video v-if="props.row.type === 'VIDEO'" :src="props.row.url" controls autoplay loop muted style="width: 100%; max-width: 100px;"></video>
                    <q-img v-else :src="props.row.url" style="width: 100px;" />
                  </q-td>
                </template>
                <template v-slot:body-cell-title="props">
                  <q-td :props="props">{{ truncateText(props.row.title, 10) }}</q-td>
                </template>
                <template v-slot:body-cell-price="props">
                  <q-td :props="props">{{ props.row.price > 0 ? Number(props.row.price).toLocaleString() : '-' }}</q-td>
                </template>
                <!-- <template v-slot:body-cell-description="props">
                  <q-td :props="props">{{ truncateText(props.row.description, 20) }}</q-td>
                </template> -->
              </q-table>
              <!-- <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px" />
                </div>
              </template> -->
            </q-infinite-scroll>
          <!-- </q-pull-to-refresh> -->
        

        
          <q-btn
          :label="$t('add')"
          @click="processMediaList"
          style="background-color: #0C2C69; color: white; min-width: 100px; display: flex; float: right; margin: 30px;"
          />
        </div>
      
        <div v-if="noDataFlag" class="row justify-center q-pt-lg">
          <img src="images/galleryx_nodata_txt.png" style="width: 35%; max-width: 250px;" />
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
  import { defineComponent, reactive } from 'vue'
   
  export default {
    name: 'AddMediaModal',
    data () {
      return {
        AddMediaModal: false,
        maximized: false,
        confirmDelete: false, // 삭제 확인창
        projectSeq: 0,
        uid: '',
        keyword: '',
        refresherDone: '',
        pageSize: 50,
        lastPageNum: 2, // 마지막 페이지
        noDataFlag: false,
        columns: [
            // { name: 'order_no', required: true, label: 'No.', align: 'center', field: 'order_no' },
            { name: 'media', label: this.$t('media'), align: 'center', field: 'type'},
            { name: 'title', label: this.$t('media_title'), align: 'center', field: 'title'},
            { name: 'price', label: this.$t('media_price') + ' (USD)', align: 'center', field: 'price' },
            // { name: 'description', label: this.$t('media_description'), align: 'left', field: 'description' },
        ],
        selected: [],
        pagination: {
            page: 1,
            rowsPerPage: 25, 
        },
        myMediaList: [],
        mediaList: [],
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
      filteredColumns() {
        // smallSize일 때 price 필드를 제거
        return this.smallSize
          ? this.columns.filter(col => col.name !== 'price')
          : this.columns
      }
    },
    created: function () {
       // 화면 리사이즈 이벤트 핸들러
      window.addEventListener("resize", this.resizeEventHandler)
        if (document.body.offsetWidth < 1024) {
        this.smallSize = true
      }
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
            this.AddMediaModal = true

            // 나의 미디어 내역 조회
            this.selectListMax()
        },
        truncateText(text, maxLength) {
            if (!text) {
                return ''
            }

            if (text.length <= maxLength) {
                return text
            }
            return text.substring(0, maxLength) + '...'
        },
        applySelectionState() {
          console.log("applySelectionState In")
          console.table(this.mediaList)
          console.log("======================")
          console.table(this.myMediaList)
          console.log("======================")

          this.myMediaList = this.myMediaList.filter(item => {
            // mediaList에서 item.seq와 일치하는 항목을 찾음
            const matchedMedia = this.mediaList.find(media => media.my_media_seq === item.seq)

            // mediaList에 해당 항목이 존재하지 않거나, del_yn이 "Y"인 경우만 남김
            if (!matchedMedia || matchedMedia.del_yn === "Y") {
              return true
            }

            // 그 외의 경우는 myMediaList에서 제외
            return false
          })

          // console.log("Updated myMediaList")
          // console.table(this.myMediaList)
        },
        // 나의 미디어 내역 조회
        refresher (done) {
            // done - Function to call when you made all necessary updates.
            //        DO NOT forget to call it otherwise the refresh message
            //        will continue to be displayed
            // make some Ajax call then call done()
            this.myMediaList = []
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
            this.$axios.get('/api/mymedia/selectMyMediaListLastPageNum',
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
            if (!this.keyword) {
                this.keyword = ''
            }
            this.$axios.get('/api/mymedia/selectMyMediaList',
            {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
                .then((result) => {
                // console.log(JSON.stringify(result.data))
                console.log(result.data)
                if (idx === 1) { // 첫번째 load인 경우
                    this.myMediaList = [] // 리스트 초기화
                }
                this.myMediaList = this.myMediaList.concat(result.data)

                // 이미 미디어에 있는 상품을 선택항목에서 제외
                this.applySelectionState()

                // 데이터 없음 표시 설정
                if (!this.myMediaList || this.myMediaList.length < 1) {
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
        async processMediaList() {
          const insertMediaList = []
          const restoreMediaList = []

          // 선택된 미디어와 mediaList를 비교하여 분류
          this.selected.forEach(item => {
            const matchedMedia = this.mediaList.find(media => media.my_media_seq === item.seq)
            
            if (matchedMedia) {
              // item.seq를 mediaList의 seq로 재정의(restore경우 media의 seq가 필요하기 때문)
              item.seq = matchedMedia.seq
              restoreMediaList.push(item)
            } else {
              insertMediaList.push(item)
            }
          })

          // restoreMedia 호출
          if (restoreMediaList.length > 0) {
            // console.log("이미 존재하는 항목 복구 중:", restoreMediaList)
            // console.table(restoreMediaList)
            await this.restoreMedia(restoreMediaList)
          }
          // insertMedia 호출
          if (insertMediaList.length > 0) {
            // console.log("insertMedia 호출", insertMediaList)
            // console.table(insertMediaList)
            await this.insertMedia(insertMediaList)
          }
        },
        async insertMedia(insertMediaList) {
            // 선택된 미디어 항목을 필터링
            // const selectedMedia = this.myMediaList.filter(item => item.selected)
            
            if (insertMediaList.length === 0) {
                // console.log("선택된 항목x")
                return
            }

            // project_seq 추가
            insertMediaList.forEach(item => {
                item.project_seq = this.projectSeq
            })

            // this.$q.loading.show()
            this.$axios.post('/api/media/insertMediaList', insertMediaList)
                .then((result) => {
                // console.log(JSON.stringify(result.data))
                this.$q.loading.hide() // 로딩 표시 종료
                if (result.data && result.data.resultCd === 'SUCCESS') {
                    // console.log(result.data)
                    this.$noti(this.$q, this.$t('register_success'))

                    this.$emit('callback-refresher')

                    this.close()
                } else {
                    this.$noti(this.$q, this.$t('register_failed'))
                }
                })
                .catch((err) => {
                // this.$q.loading.hide() // 로딩 표시 종료
                console.log(err)
                this.$noti(this.$q, err)
                })

        },
        // 미디어 재등록
        async restoreMedia(restoreMediaList) {
          if (restoreMediaList.length === 0) {
            console.log("restoreList 선택된 항목x")
            return
          }

          // this.$q.loading.show()
          this.$axios.post('/api/media/restoreMedia', restoreMediaList)
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              this.$q.loading.hide() // 로딩 표시 종료
              if (result.data && result.data.resultCd === 'SUCCESS') {
                // console.log(result.data)
                this.$noti(this.$q, this.$t('register_success'))

                this.$emit('callback-refresher')

                this.close()
              } else {
                this.$noti(this.$q, this.$t('register_failed'))
              }
            })
            .catch((err) => {
              // this.$q.loading.hide() // 로딩 표시 종료
              console.log(err)
              this.$noti(this.$q, err)
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
        this.selected = []
        this.AddMediaModal = false
      }
    }
  }
  </script>
  <style scoped>
  </style>