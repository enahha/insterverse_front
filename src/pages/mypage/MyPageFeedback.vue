<template>
  <q-page class="q-pa-md page-1200 mypage-wrap">
    <div class="row justify-center">
      <div class="row title-sec">
          <div class="col-12 doc-heading">
            <div class="title">{{ $t('menu_mypage_feedback') }}</div>
          </div>
        </div>
    </div>

    <span style="font-size: 23px; font-weight: bold;">{{ $t('menu_mypage_feedback_info') }}</span>
    <div class="underline"></div>
    <div class="col-12 justify-center comment-wrap q-pb-xs tab-panel-4">

    <!-- 프로젝트 댓글 리스트 -->
    <q-pull-to-refresh @refresh="refresherMyComment">
      <q-infinite-scroll @load="loadMore" :offset="100" ref="infiniteScroll">
        <div v-for="item in myCommentList" :key="item.seq">

          <div :style="`padding-left: ${ item.group_layer * 20 }px`" v-if="item.visible_child" :class="`${ item.group_layer === 0 ? 'bg-white' : 'bg-grey-2'}`">
            <div class="row q-pt-md">
              <div class="col-8">
                <table border="0" cellpadding="0" sellspacing="0" width="100%">
                  <tr>
                    <td rowspan="2" width="60" class="flex-bottom">
                      <q-avatar>
                        <!-- <img src="https://cdn.quasar.dev/img/avatar7.jpg"> -->
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                      </q-avatar>
                    </td>
                    <td><span class="text-body2">{{ item.reg_name }}</span></td>
                  </tr>
                  <tr>
                    <td><span class="text-caption text-grey-7">{{ item.reg_time }}</span></td>
                  </tr>
                </table>
                <div>
                  <span class="text-body2" style="padding: 60px;">{{ item.project_title }}</span>
                </div>
              </div>
              <div v-if="getUid && getUid === item.reg_id" class="col-4 text-right q-pt-md">
                <!-- <span style="cursor: pointer;" @click="modifyComment(item)">{{ $t('modify') }}</span> -->
                <q-btn icon="edit" @click="modifyComment(item)" flat dense />
                &nbsp;&nbsp;
                <!-- <span style="cursor: pointer;" @click="deleteComment(item.seq)">{{ $t('delete') }}</span> -->
                <q-btn icon="delete" @click="deleteComment(item.seq)" flat dense />
                &nbsp;&nbsp;
              </div>
            </div>
            <div class="row q-pt-sm" style="word-break: break-word;">
              <div class="col-12 text-body1">{{ item.contents }}</div>
            </div>
            <div class="row q-pt-sm q-pb-sm">
              <div class="col-4">
                <span style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">{{ $t('register_reply') }}</span>
                <span v-if="item.group_layer === 0" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt1 }})</span>
                <span v-if="item.group_layer === 1" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt2 }})</span>
                <span v-if="item.group_layer === 2" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt3 }})</span>
                <span v-if="item.group_layer === 3" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt4 }})</span>
                <span v-if="item.group_layer === 4" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt5 }})</span>
                <span v-else></span>
              </div>
              <!-- <div class="col-4"></div> -->
              <div class="col-8 text-right">
                <q-btn v-if="item.like_cd === 'Y'" icon="thumb_up_alt" @click="likeIt(item, 'YES')" flat dense size="sm" />
                <q-btn v-else icon="thumb_up_off_alt" @click="likeIt(item, 'YES')" flat dense size="sm" />
                &nbsp;{{ item.like_cnt }}
                &nbsp;&nbsp;
                <q-btn v-if="item.like_cd === 'N'" icon="thumb_down_alt" @click="likeIt(item, 'NO')" flat dense size="sm" />
                <q-btn v-else icon="thumb_down_off_alt" @click="likeIt(item, 'NO')" flat dense size="sm" />
                &nbsp;{{ item.dislike_cnt }}
                &nbsp;&nbsp;
                <!-- ### {{ item.group_order }} ### {{ item.group_layer }} -->
              </div>
            </div>

            <div v-if="item.visible_reply_input" class="row q-pt-sm q-pb-sm">
              <div class="col-12">
                <q-input v-model="myReply" type="textarea" :placeholder="$t('enter_the_reply')" rows="2" outlined @keyup="countMyReplyLength" />
              </div>

              <div class="col-6 text-left q-pt-sm">
                &nbsp;&nbsp;&nbsp;{{ myReplyLength }} / 300
              </div>
              <div class="col-6 text-right q-pt-sm">
                <q-btn size="md" color="black" style="height: 36px;" @click="insertProjectCommentReply(item)" outline>{{ $t('register') }}</q-btn>
              </div>
            </div>

          </div>

        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="#FEFEFE" />
    </q-page-scroller>


    <div v-if="noDataFlag && tab === 'c'" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>
    </div>

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
      myReply: '', // 입력 답글
      myReplyLength: 0,
      noDataFlag: false,
      myCommentList: [],
      lastPageNumMyComment: 1, // 마지막 페이지
      refresherMyCommentDone: '',
      noDataFlagMyComment: false,
      confirmDeleteCommentModal: false, // 나의 댓글 삭제 모달
      deleteTargetSeq: '', // 삭제 대상 댓글 seq
      confirmModifyCommentModal: false, // 나의 댓글 수정 모달
      modifyTargetSeq: '', // 수정 대상 댓글 seq
      modifyCommentValue: '', // 수정 대상 댓글 내용
      confirmDeleteProject: false, // 프로젝트 삭제 모달
    }
  },
  components: {
  },
  watch: {
    getUid (newValue) {
      // console.log('newValue: : ' + newValue)
      // this.loadMore(1, null)
      this.refresherMyComment(null)
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

    // 계정 정보 조회
    this.selectUser()

    this.selectMyCommentListMax()
  },
  mounted: function () {
    this.refresherMyComment(null)
  },
  methods: {
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
            this.walletType = result.data.wallet_type
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
    refresherMyComment (done) {
      this.selectMyCommentListMax()
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.myCommentList = []
      this.refresherMyCommentDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMoreMyComment(1, done)
    },
    loadMoreMyComment(index, done) {
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
        if (index <= this.lastPageNumMyComment) {
          this.selectMyCommentList(index, done)
          if (index === this.lastPageNumMyComment) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherMyCommentDone != null && this.refresherMyCommentDone !== '') {
            this.refresherMyComment() // 로딩메세지 종료
            this.refresherMyCommentDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 토근 댓글 리스트 마지막 페이지 조회
    selectMyCommentListMax() {
      this.$axios.get('/api/projectcomment/selectMyProjectCommentListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumMyComment = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 프로젝트 댓글 리스트 조회
    selectMyCommentList(idx, done) {
      this.$axios.get('/api/projectcomment/selectMyProjectCommentList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.myCommentList = [] // 리스트 초기화
          }
          this.myCommentList = this.myCommentList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.myCommentList || this.myCommentList.length < 1) {
            this.noDataFlagMyComment = true
          } else {
            this.noDataFlagMyComment = false
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
    // 나의 댓글 삭제 모달 표시
    deleteComment(commentSeq) {
      this.deleteTargetSeq = commentSeq
      this.confirmDeleteCommentModal = true
    },
    // 나의 댓글 삭제
    doDeleteCommennt() {
      // console.log('insertProjectComment')
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.deleteTargetSeq,
      }
      this.$axios.post('/api/projectcomment/deleteProjectComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.deleteTargetSeq = ''
            this.$noti(this.$q, this.$t('delete_comment_success'))

            // 목록 새로고침
            this.refresherMyComment(null)
          } else {
            this.$noti(this.$q, this.$t('delete_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 나의 댓글 수정 모달 표시
    modifyComment(item) {
      this.modifyTargetSeq = item.seq
      this.modifyCommentValue = item.contents
      this.confirmModifyCommentModal = true

    },
    // 나의 댓글 수정
    doModifyCommennt() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.modifyTargetSeq,
        contents: this.modifyCommentValue,
      }
      this.$axios.post('/api/projectcomment/updateProjectComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.modifyTargetSeq = ''
            this.$noti(this.$q, this.$t('modify_comment_success'))

            // 목록 새로고침
            this.refresherMyComment(null)
          } else {
            this.$noti(this.$q, this.$t('modify_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 답글 등록
    showReplyInput(item) {
      // console.log(item.visible_reply_input)

      // 1. 입력값 초기화
      this.myReply = ''

      // 2. 열린 입력창 모두 닫음
      for (let i = 0; i < this.myCommentList.length; i++) {
        const commentItem = this.myCommentList[i]
        // 현재 아이템 외 전부 닫기
        if (commentItem.seq !== item.seq) {
          commentItem.visible_reply_input = false

          // 해당 child 표시하기
          if (commentItem.seq_parent1 === item.seq_parent1 && item.group_layer === 0) {
            commentItem.visible_child = !item.visible_reply_input
          }
        }
      }

      // 3. 선택한 입력창 표시
      item.visible_reply_input = !item.visible_reply_input
    },

    // 좋아요/싫어요
    likeIt (item, likeCd) {
      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // like_cd Y:좋아요 N:싫어요 null:중립
      // 1. 화면 조작
      if (likeCd === 'YES') { // 좋아요인 경우
        if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_cnt = Number(item.like_cnt) - 1
        } else {
          if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
            item.dislike_cnt = Number(item.dislike_cnt) - 1
          }
          item.like_cd = 'Y' // 좋아요로 설정
          item.like_cnt = Number(item.like_cnt) + 1
        }
      } else { // 싫어요인 경우
        if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
          item.like_cd = null // 중립으로 설정
          item.dislike_cnt = Number(item.dislike_cnt) - 1
        } else {
          if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
            item.like_cnt = Number(item.like_cnt) - 1
          }
          item.like_cd = 'N' // 싫어요로 설정
          item.dislike_cnt = Number(item.dislike_cnt) + 1
        }
      }

      // 2. 좋아요 테이블 저장
      const params = {
        uid: this.getUid,
        project_comment_seq: item.seq,
        like_cd: item.like_cd,
      }
      this.$axios.post('/api/projectcomment/mergeProjectCommentLike', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            // this.$noti(this.$q, this.$t('modify_comment_success'))
          } else {
            // this.$noti(this.$q, this.$t('modify_comment_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
        // 답글 글자수 카운트
        countMyReplyLength() {
      this.myReplyLength = this.myReply.length
    },
    // 답글 등록
    insertProjectCommentReply(item) {
      // console.log('insertProjectComment')

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // 내용 유무 체크
      if (!this.myReply) {
        this.$noti(this.$q, this.$t('enter_the_reply'))
        return
      }

      // 글자수 체크
      if (this.myReply.length > 300) {
        this.$noti(this.$q, this.$t('validation_failed_comment_max_length'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        project_seq: this.projectSeq,
        seq_parent1: item.seq_parent1,
        seq_parent2: item.seq_parent2,
        seq_parent3: item.seq_parent3,
        seq_parent4: item.seq_parent4,
        seq_parent5: item.seq_parent5,
        group_order: item.group_order, // 답글의 대상 값을 넘겨서 이 값보다 큰 GROUP_ORDER 들은 + 1 씩 UPDATE 처리
        group_layer: item.group_layer + 1,
        contents: this.myReply,
      }
      this.$axios.post('/api/projectcomment/insertProjectCommentReply', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.myReply = ''
            this.$noti(this.$q, this.$t('register_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('register_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 정산 예정 금액 조회
    selectMyMediaSaleSettleIn() {
      const param = {
        uid: this.getUid,
      }
      this.$axios.get('/api/mediaSale/selectMyMediaSaleSettleIn', { params: { ...param } })
        .then((result) => {
            if (result.data) {
              console.log("settle_in total")
              console.log(result.data)
              this.settleInTotal = result.data
            } else {
              this.$noti(this.$q, this.$t('register_comment_failed'))
            }
          })
          .catch((err) => {
            console.log(err)
            this.$noti(this.$q, err)
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
      // 지갑주소 유효성 체크
      // if (!this.checkAddress(this.wallet_address)) {
      //   this.$noti(this.$q, this.$t('validation_failed_check_wallet_address'))
      //   result = false
      // }
      // if (!this.$refs.pwd.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_pwd'))
      //   result = false
      // }
      // if (!this.$refs.pwdCheck.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_pwd_check'))
      //   result = false
      // }
      // // 비밀번호 일치 확인
      // if (this.pwd !== this.pwdCheck) {
      //   this.$noti(this.$q, this.$t('pwd_not_match'))
      //   result = false
      // }
      // if (!this.$refs.nickname.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_nickname'))
      //   result = false
      // }
      // if (!this.$refs.name.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_name'))
      //   result = false
      // }
      // if (!this.$refs.mobile_no.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_mobile_no'))
      //   result = false
      // }
      // if (!this.$refs.home_address.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_home_address'))
      //   result = false
      // }
      // if (!this.$refs.business_registration_no.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_business_registration_no'))
      //   result = false
      // }
      // if (!this.$refs.company_address.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_company_address'))
      //   result = false
      // }
      // if (!this.$refs.company_tel_no.validate()) {
      //   this.$noti(this.$q, this.$t('validation_failed_company_tel_no'))
      //   result = false
      // }
      return result
    },
    modifyUserPre(nickname, pwd, pwdCheck) {
      // 비밀번호 변경시
      if(nickname == null) {
        this.modifyUser(nickname, pwd, pwdCheck)
        return
      }
      // 닉네임 변경시
      if(pwd == null && pwdCheck == null) {
        this.modifyUser(nickname, pwd, pwdCheck)
        return
      }
    },
    // 회원정보 수정 처리 시작
    async modifyUser(nickname, pwd, pwdCheck) {
      // Field validation check
      // if(!this.validate()) {
      //   // this.$noti(this.$q, this.$t('validation_failed'))
      //   return
      // }

      // nickname 중복 체크
      const resultNickname = await this.checkNicknameDuplicate(nickname)
      if (resultNickname === false) {
        return
      }

      if(!this.checkField(pwd, pwdCheck)) {
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // 회원정보 수정
      this.doModifyUser(nickname, pwd)
    },
    // 회원정보 수정
    async doModifyUser(nickname, pwd) {
      // 1. 회원정보 수정 처리 - token, token_description, token_contract_verify
      let encPwd = ''
      if (pwd) {
        encPwd = sha512(pwd)
      } else {
        encPwd = null
      }
      const params = {
        uid: this.getUid,
        pwd: encPwd,
        nickname: nickname,
      }

      this.$q.loading.show() // 로딩 표시 시작

      this.$axios.post('/api/user/updateUser', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_user_success'))
            this.clearField()
          } else {
            this.$noti(this.$q, this.$t('modify_user_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    checkField(pwd, pwdCheck) {
      // ID 항목 체크
      // if (!this.checkInput(this.userVo.uid, 'ID')) {
      //   return false
      // }
      // if (!this.checkInputLength(this.userVo.uid, this.$t('ID'), 50, 'long')) {
      //   return false
      // }

      // ID 이메일 형식 체크
      // if (!this.checkEmail(this.userVo.uid)) {
      //   this.$noti(this.$q, this.$t('id_must_be_email'))
      //   return false
      // }
      // // 비밀번호 항목 체크
      // if (!this.checkInput(this.userVo.pwd, this.$t('pwd_upper'))) {
      //   return false
      // }
      // // 비밀번호 확인 항목 체크
      // if (!this.checkInput(this.pwdCheck, this.$t('pwd_check_upper'))) {
      //   return false
      // }

      // 비밀번호 변경이 아닐 시
      if(!pwd) {
        return true
      }

      // 비밀번호 항목 자릿수 체크
      if (!this.checkInputLength(pwd, this.$t('pwd_upper'), 6, 'short')) {
        return false
      }
      // 비밀번호 확인 항목 자릿수 체크
      if (!this.checkInputLength(pwdCheck, this.$t('pwd_check_upper'), 6, 'short')) {
        return false
      }
      // 비밀번호 일치 확인
      if (pwd !== pwdCheck) {
        this.$noti(this.$q, this.$t('pwd_not_match'))
        return false
      }
      return true
    },
    checkInputLength(field, fieldName, length, compareCd) {
      if (!field) {
        this.$noti(this.$q, fieldName + this.$t('is_required'))
        return false
      } else {
        if (compareCd === 'short') {
          if (field.length < length) {
            this.$noti(this.$q, fieldName + this.$t('must_be_longer_than') + ' ' + length)
            return false
          }
        } else if (compareCd === 'long') {
          if (field.length > length) {
            this.$noti(this.$q, fieldName + this.$t('must_be_shorter_than') + ' ' + length)
            return false
          }
        } else if (compareCd === 'equal') {
          if (field.length !== length) {
            this.$noti(this.$q, fieldName + this.$t('must_be_equal') + ' ' + length)
            return false
          }
        }
        return true
      }
    },
    // nickname 중복 체크
    async checkNicknameDuplicate(nickname) {
      const vo = {
        nickname: nickname
      }
      const result = await this.$axios.post('/api/login/checkNicknameDuplicate', vo)
      if (result.data && result.data.resultCd === 'SUCCESS') {
        return true
      } else if (result.data.resultCd === 'FAIL') {
        this.$noti(this.$q, this.$t('nickname_already_in_use'))
        return false
      } else {
        this.$noti(this.$q, result.data.status + ' : ' +result.data.resultMsg)
        return false
      }
    },
    ModifyUserAccount() {
      const params = {
        uid: this.getUid,
        wallet_address: this.walletAddress,
        wallet_type: this.walletType ? this.walletType.value : '',
        bank_type: this.bankType ? this.bankType.value : '',
        bank_account: this.bankAccount
      }

      this.$q.loading.show() // 로딩 표시 시작

      this.$axios.post('/api/user/updateUserAccount', params)
        .then((result) => {
          this.$q.loading.hide() // 로딩 표시 종료

          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_user_success'))
            this.selectUser()
          } else {
            this.$noti(this.$q, this.$t('modify_user_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 파일 업로드 필터
    filterFiles (files) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))

        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    // 이미지 업로드가 완료되면 호출되는 메소드
    fileUploaded_profile_image (file, xhr) {
      this.profile_image = file.xhr.responseText
    },
    fileUploaded_id_card_image (file, xhr) {
      this.id_card_image = file.xhr.responseText
    },
    fileUploaded_home_address_image (file, xhr) {
      this.home_address_image = file.xhr.responseText
    },
    fileUploaded_business_license_image (file, xhr) {
      this.business_license_image = file.xhr.responseText
    },
    fileUploaded_company_address_image (file, xhr) {
      this.company_address_image = file.xhr.responseText
    },
    // 지갑주소 유효성 검증
    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX address
     * @return {Boolean}
     */
    checkAddress(address) {
      if (address.length === 42) {
        return true
      } else {
        return false
      }
      // // check if it has the basic requirements of an address
      // if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      //   return false
      //     // If it's ALL lowercase or ALL upppercase
      // }
      // if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
      //   // return true
      //   // Otherwise check each case
      //   return this.checkAddressChecksum(address)
      // } else {
      //   return false
      // }
    },
    clearField() {
      this.nickname= ''
      this.pwd= ''
      this.pwdCheck= ''
      this.bankType= null
      this.bankAccount= ''
      this.walletTyoe= null
      this.walletAddress= ''
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
</style>
