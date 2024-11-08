<template>
  <q-page class="q-pa-md page-1200 store-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('store') }}</span></div>
      </div>
    </div>

    <q-page-scroller class="custom-scroller" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="secondary" />
    </q-page-scroller>

    <!-- <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="i">{{ $t('project_exhibition_type') }}</q-tab>
    </q-tabs> -->

    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 전시관 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="h" style="word-break: break-word; padding: 0 0;">
        <!-- 나의 작품 판매 리스트 -->
        <div class="store-list">
          <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

            <div v-for="item in galleryList" :key="item.seq">
              <q-item >
                <q-item-section avatar @click="goPayment(item)">
                  <q-avatar square class="media-container">
                    <img v-if="item.url" :src="item.url"  class="media-content">
                    <img v-else src="images/exhibition_poster_basic2.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <div class="row list-item">
                    <q-item-label class="col-12" style="max-height: 20px; cursor: pointer;" @click="goPayment(item)">{{ item.name }}</q-item-label>
                    <q-item-label v-if="locale === 'ko-KR'" class="col-12 text-bold">{{truncateText(item.description_ko, 80) }}</q-item-label>
                    <q-item-label v-else class="col-12 text-bold">{{ truncateText(item.description, 100) }}</q-item-label>

                    <q-item-label style="width: 100%; display: flex; justify-content: space-around; align-items: last baseline;">
                      <!-- <div style="font-size: large; color: black; font-weight: bold;">$ {{ item.price }}</div> -->
                      <q-btn
                          :label="$t('project_preview')"
                          @click="openPreview"
                          style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 90px; max-height: 30px;"
                        />
                      <q-btn
                          :label="'$ ' + item.price"
                          @click="goPayment(item)"
                          style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 90px; max-height: 30px;"
                        />
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
        </div>


        <div v-if="noDataFlag" class="row justify-center q-pt-lg">
          <img src="images/galleryx_nodata_txt.png" style="width: 35%; max-width: 250px;" />
        </div>



        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl">
        </div>


      </q-tab-panel>
    </q-tab-panels>


  </q-page>

  <!-- <q-dialog v-model="confirmDeleteCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

  <!-- <q-dialog v-model="confirmModifyCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-input v-model="modifyCommentValue" type="textarea" :placeholder="$t('enter_the_comment')" rows="7" outlined />
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('modify')" color="black" v-close-popup @click="doModifyCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
  
  <!-- <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

  <MediaDetailModal ref="refMediaDetailModal" />
  <WalletModal ref="refWalletModal" />
  <SettleOutHistoryModal ref="refSettleOutHistoryModal"/>
</template>

<script>
import { defineComponent } from 'vue';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'StoreList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      tab: 'h',
      uid: '',
      keyword: '',
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 2, // 마지막 페이지
      noDataFlag: false,
      galleryList: [],
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
    truncateText(text, maxLength) {
      if (!text) {
        return ''
      }

      if (text.length <= maxLength) {
        return text
      }
      return text.substring(0, maxLength) + '...'
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
    showDetail(seq) {
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
      this.galleryList = []
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
      this.$axios.get('/api/item/selectItemListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, type:this.$ITEM_PRICE_TYPE_PAID}})
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
      this.$axios.get('/api/item/selectItemList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, type:this.$ITEM_TYPE_HALL, priceType:this.$ITEM_PRICE_TYPE_PAID}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.galleryList = [] // 리스트 초기화
          }
          this.galleryList = this.galleryList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.galleryList || this.galleryList.length < 1) {
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
    goPayment(item) {
      // 1. 해당 건이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: this.seq,
      }
      // const result = await this.$axios.post('/api/tokenburn/checkTokenBurnStatusCdPaid', params)
      // if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
      //   this.$router.push({ path: '/token/burn', query: { key: this.seq }}) // 실행 화면으로 이동
      // } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = item.name
        const payCode = this.$PAY_CODE_HALL

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode)

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/store'
        let payFailUrl = '/payment/item?s=' + item.seq // 디바이스가 데스크탑인 경우
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          payFailUrl = '/paymentMobile' // 디바이스가 모바일인 경우
        }
        const key = item.seq // insert로 받아온 seq를 설정 ※ item의 seq는 토큰 seq이고, this.seq는 token_burn 또는 token_mint 테이블에 insert 된 seq 임.
        const customData = payCode + '|' + paySuccessUrl + '|' + payFailUrl + '|' + key   // db에 들어가는 데이터같음
        this.$store.dispatch('setPaymentCustomData', customData) // 상점 파라미터(customData) 설정

        // 결제 정보 설정
        this.$cookie.set('GOOD_NAME', goodName)
        this.$cookie.set('PAY_CODE', payCode)
        this.$cookie.set('CUSTOM_DATA', customData)
        localStorage.setItem('GOOD_NAME', goodName)
        localStorage.setItem('PAY_CODE', payCode)
        localStorage.setItem('CUSTOM_DATA', customData)

        // 결제 화면으로 이동
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 액션 로그 등록
          this.insertActionLog('100900200', 'go item payment', item.seq)

          // 디바이스가 모바일인 경우
          this.$router.push('/paymentMobile')
        } else {
          // 액션 로그 등록
          this.insertActionLog('100900200', 'go item payment', item.seq)

          // 디바이스가 데스크탑인 경우
          // this.$router.push('/PaymentItem')

          // 결제 준비 화면으로
           this.$router.push({ path: '/payment/item', query: { s: item.seq }})

          // this.$router.push('/payment')
        }
      // }

    },
    callbackDetail() {
      this.search()
    },
    openPreview() {
      // 액션 로그 등록
      this.insertActionLog('100900100', 'preview', item.seq)

    }
  },
})
</script>
