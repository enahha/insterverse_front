<template>
  <q-page class="q-pa-md page-1200 mypage-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('menu_mypage_sales_detail') }}</span></div>
      </div>
    </div>

    <q-page-scroller class="custom-scroller" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="secondary" />
    </q-page-scroller>

    <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <!-- <q-tab name="3">{{ $t('menu_mypage_sales_detail') }}</q-tab> -->
    </q-tabs>

      <!-- 페널이 없어지면 에러발생... 왤까... -->

    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 3. 판매 내역 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="3" style="word-break: break-word;">
        <div class="tab-panel-3 q-pt-lg">
          <div class="withdrawal row">
            <div class="title">{{ $t('menu_mypage_total_settlement') }} <div>{{ $t('menu_mypage_currncy') }} {{ Number(settleInTotal).toLocaleString() }}</div> </div>
           
          </div>
          <div class="sales-detail q-pt-lg">
            <div style="width: 100%; display: flex; justify-content: space-between;">
            <div class="title">{{ $t('settle_out_list') }}</div>
              <q-btn
                :label="$t('menu_mypage_settlement_list')"
                @click="showsettleOutHistoryModal"
                style="background-color: #0C2C69; color: white;"
              />
            </div>
            <div class="underline"></div>
          </div>  

          <!-- 나의 작품 판매 리스트 -->
          <q-pull-to-refresh @refresh="refresherMyMediaSale" class="project-list">
            <q-infinite-scroll @load="loadMoreMyMediaSale" :offset="0" ref="infiniteScroll">

              <div v-for="item in myMediaSaleList" :key="item.seq">
                <q-item clickable @click="goMediaDetail(item)">
                  <q-item-section avatar @click="goMediaDetail(item)">
                    <!-- 스타일이 안먹어서 해당 파일 아래 따로 스타일 설정 -->
                    <q-avatar square v-if="item.type == 'VIDEO'" class="media-container">
                      <video :src="item.url" controls autoplay loop muted class="media-content"></video>
                    </q-avatar>
                    <q-avatar square v-else class="media-container">
                      <img v-if="item.url" :src="item.url"  class="media-content">
                      <img v-else src="images/exhibition_poster_basic2.png">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <div class="row list-item">
                      <q-item-label class="col-12">{{ item.title }}</q-item-label>
                      <q-item-label class="col-12">{{ truncateText(item.subtitle,truncateSubtitle) }}</q-item-label>
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

          <div v-if="noDataFlagMyMediaSale" class="row justify-center q-pt-lg">
            <img src="images/no_data.png" style="width: 35%; max-width: 250px;" />
          </div>

        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmDeleteCommentModal">
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
  </q-dialog>

  <q-dialog v-model="confirmModifyCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-input v-model="modifyCommentValue" type="textarea" :placeholder="$t('enter_the_comment')" rows="7" outlined />
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('modify')" color="black" v-close-popup @click="doModifyCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  
  <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <MediaDetailModal ref="refMediaDetailModal" />
  <WalletModal ref="refWalletModal" />
  <SettleOutHistoryModal ref="refSettleOutHistoryModal"/>
</template>

<script>
import { sha512 } from 'js-sha512'
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
import Modify from '../notice/Modify.vue';

export default defineComponent({
  name: 'Mypage',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  beforeUnmount() {
    // truncateText중 null일 때 mount오류 발생(?????)하여 추가
    // 컴포넌트가 언마운트될 때 vnode가 null인지 확인하고, null일 경우 해당 로직을 실행하지 않도록함
    if (!this.$vnode) return
  },
  data () {
    return {
      tab: '3',
      nickname: '',
      pwd: '',
      pwdCheck: '',
      bankType: null,
      bankAccount: '',
      walletType: null,
      walletAddress: '',
      confirmGoBack: false, // goBack 확인창
      truncateSubtitle: 50,
      settleInTotal: '',

      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      projectList: [],
      myReply: '', // 입력 답글
      myReplyLength: 0,
      noDataFlag: false,
      refresherDone: '',
      myCommentList: [],
      lastPageNumMyComment: 1, // 마지막 페이지
      refresherMyCommentDone: '',
      noDataFlagMyComment: false,
      myMediaSaleList: [],
      lastPageNumMyMediaSale: 1, // 마지막 페이지
      refresherMyMediaSaleDone: '',
      noDataFlagMyMediaSale: false,
      confirmDeleteCommentModal: false, // 나의 댓글 삭제 모달
      deleteTargetSeq: '', // 삭제 대상 댓글 seq
      confirmModifyCommentModal: false, // 나의 댓글 수정 모달
      modifyTargetSeq: '', // 수정 대상 댓글 seq
      modifyCommentValue: '', // 수정 대상 댓글 내용
      confirmDeleteProject: false, // 프로젝트 삭제 모달

      bankOption: [
        {
          label: '우리은행',
          value: '우리은행',
        },
        {
          label: '국민은행',
          value: '국민은행',
        },
        {
          label: '기업은행',
          value: '기업은행',
        }
      ],
      walletOption: [
        {
          label: 'Solana',
          value: 'SOLANA',
        },
        {
          label: 'Ethereum',
          value: 'ETH',
        },
        {
          label: 'Kaia',
          value: 'KAIA',
        },
      ],
    }
  },
  components: {
  },
  watch: {
    getUid (newValue) {
      // console.log('newValue: : ' + newValue)
      // this.loadMore(1, null)
      // this.refresher(null)
      // this.refresherMyComment(null)
      this.refresherMyMediaSale(null)
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
    getNickname () {
      return this.$store.getters.getNickname
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    qDate() {
      return date
    },
  },
  created: function () {
    // 키 설정
    // this.uid = this.$route.query.seq

    // user_profile_image preview reg_name
    // this.reg_name = this.getUid.split('@')[0]

    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname)
      this.$store.dispatch('setUid', uid)
    }

    // 정산 예정 금액 조회
    this.selectMyMediaSaleSettleIn()

    // 계정 정보 조회
    this.selectUser()

    this.selectMyMediaSalListMax()
  },
  mounted: function () {
    // this.refresher(null)
    // this.refresherMyComment(null)
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
    
    // 계정 조회
    selectUser() {
      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        // this.$refs.refWalletModal.show()
        this.$router.push('/')
        return
      }

      const param = {
        uid: this.getUid,
      }

      // 계정 조회
      this.$axios.get('/api/user/selectUser', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            console.log(result.data)
            this.walletAddress = result.data.wallet_address
            if (!this.walletAddress) {
              this.walletAddress = this.$store.getters.getWalletAddress
            }
            this.walletType.value = result.data.wallet_type
            this.bankAccount = result.data.bank_account
            this.bankType = result.data.bank_type
            // this.nickname = result.data.nickname
            this.profile_image = result.data.profile_image
            // this.reg_name = result.data.reg_name
            this.name = result.data.name
            this.mobile_no = result.data.mobile_no
            this.id_card_image = result.data.id_card_image
            this.home_address = result.data.home_address
            this.home_address_image = result.data.home_address_image
            this.business_registration_no = result.data.business_registration_no
            this.business_license_image = result.data.business_license_image
            this.company_address = result.data.company_address
            this.company_address_image = result.data.company_address_image
            this.company_tel_no = result.data.company_tel_no
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
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
    goDetail(seq) {
      // 상세 화면으로 이동
      this.$router.push({ path: '/exhibition/detail', query: { s: seq }})
      // this.$refs.refTokenDetailModal.tokenSeq = seq
      // this.$refs.refTokenDetailModal.show()
    },
    goMediaDetail(item) {
      console.log(item)
      this.$refs.refMediaDetailModal.myMediaVo = item
      this.$refs.refMediaDetailModal.show()
    },
    showsettleOutHistoryModal() {
      // 액션 로그 등록
      this.insertActionLog('100100301', 'sales history', null)

      this.$refs.refSettleOutHistoryModal.uid = this.getUid
      this.$refs.refSettleOutHistoryModal.show()
    },
    refresherMyMediaSale (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.myMediaSaleList = []
      this.refresherMyMediaSaleDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMoreMyMediaSale(1, done)
    },
    loadMoreMyMediaSale (index, done) {
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
        if (index <= this.lastPageNumMyMediaSale) {
          this.selectMyMediaSaleList(index, done)
          if (index === this.lastPageNumMyMediaSale) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDoneMyMediaSale != null && this.refresherDoneMyMediaSale !== '') {
            this.refresherMyMediaSale() // 로딩메세지 종료
            this.refresherDoneMyMediaSale = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 신규 판매 내역 리스트 마지막 페이지 조회
    selectMyMediaSalListMax() {
      this.$axios.get('/api/mediaSale/selectMyMediaSaleListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: ''}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 신규 판매 내역 리스트 조회
    selectMyMediaSaleList(idx, done) {
      this.$axios.get('/api/mediaSale/selectMyMediaSaleList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: ''}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          console.table(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.myMediaSaleList = [] // 리스트 초기화
          }
          this.myMediaSaleList = this.myMediaSaleList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.myMediaSaleList || this.myMediaSaleList.length < 1) {
            this.noDataFlagMyMediaSale = true
          } else {
            this.noDataFlagMyMediaSale = false
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
    // 정산 예정 금액 조회
    selectMyMediaSaleSettleIn() {
      const param = {
        uid: this.getUid,
      }
      this.$axios.get('/api/mediaSale/selectMyMediaSaleSettleIn', { params: { ...param } })
        .then((result) => {
            console.log("result.data")
            console.log(result.data)
            console.log("result.data")
            this.settleInTotal = result.data
          })
          .catch((err) => {
            console.log(err)
            this.$noti(this.$q, err)
          })
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      this.$router.go(-1)
    }
  }
})
</script>
<style scoped>
.image-container {
    width: 100%;
    max-width: 350px;
    aspect-ratio: 5 / 4;
    background-color: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: block;
}
.media-container {
    overflow: hidden;
    cursor: pointer;
}
.media-content {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #f6f6f6;
    transition: transform 0.3s ease; /* 부드러운 변형 효과 */
}
.media-container:hover .media-content {
  transform: scale(1.05); /* 마우스를 올리면 5% 확대 */
}
@media (max-width: 1023px) {
  .image-container {
    max-width: 100%;
  }
}
</style>