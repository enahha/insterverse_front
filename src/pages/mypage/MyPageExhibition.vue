<template>
  <q-page class="q-pa-md page-1200 mypage-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('menu_mypage_my_exhibition') }}</span></div>
      </div>
    </div>

    <q-page-scroller class="custom-scroller" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="secondary" />
    </q-page-scroller>

    <div class="tab-panel-2 q-pt-lg">
      <!-- 프로젝트 리스트 -->
      <q-pull-to-refresh @refresh="refresher" class="project-list">
        <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

          <div v-for="item in projectList" :key="item.seq">
            <q-item clickable @click="goDetail(item.seq)">
              <q-item-section avatar>
                <!-- <q-avatar square>
                  <img v-if="item.postar_url" :src="item.postar_url">
                  <q-icon v-else name="rocket_launch" size="md" />
                </q-avatar> -->


                <!-- 이거 스타일은 app.scss파일이 아닌 해당 파일 아래쪽에 위치해있음. (스타일이 안먹어서,,,) 
                 @mouseover="hovering[index] = true" @mouseleave="hovering[index] = false"-->
                <div class="image-container"  >
                  <img v-if="item.postar_url" :src="item.postar_url">
                  <img v-else src="images/exhibition_poster_basic2.png">

                  <div class="menu-sec">
                    <!--  @click.stop="confirmMainHallModify(item)"  -->
                    <q-btn flat round dense icon="more_horiz" color="black" icon-right="true" class="more-menu" @click.stop="openMenu(item.seq)">

                    <q-menu :offset="[50, 10]" class="menu" >
                      <q-btn flat label="대표로 지정"  @click="confirmMainHallModify(item)"/>
                    </q-menu>
                  </q-btn>
                  </div>

                  <div v-if="item.main_hall == 'Y'" class="main-hall-label">대표 전시관</div>
                </div>
              </q-item-section>

              <q-item-section>
                <div class="row list-item">
                  <q-item-label class="col-12">{{ item.title }}</q-item-label>
                  <q-item-label class="col-12">{{ truncateText(item.subtitle,truncateSubtitle) }}</q-item-label>
                  
                  <q-item-label v-if="calculateStatus(item) === 'Registering'" style="font-size: 12px;">
                    <q-icon name="radio_button_unchecked" color="gray" style="padding-right: 5px;" />{{ $t('Registering') }}
                  </q-item-label>
                  <q-item-label v-if="calculateStatus(item) === 'start'" style="font-size: 12px;">
                    <q-icon name="radio_button_checked" color="red" style="padding-right: 5px;" />{{ $t('display') }}
                  </q-item-label>
                  <q-item-label v-if="calculateStatus(item) === 'end'" style="font-size: 12px;">
                    <q-icon name="radio_button_unchecked" color="gray" style="padding-right: 5px;" />{{ $t('exhibit_ending') }}
                  </q-item-label>
                  <q-item-label v-if="calculateStatus(item) === 'ready'" style="font-size: 12px;">
                    <q-icon name="radio_button_unchecked" color="gray" style="padding-right: 5px;" />{{ $t('exhibit_ready') }}
                  </q-item-label>
                  <!-- <q-item-label class="col-12">{{ item.title }}</q-item-label>
                  <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ truncateText(item.summary_ko,truncateSubtitle) }}</q-item-label>
                  <q-item-label v-else class="col-12">{{ truncateText(item.summary,truncateSubtitle) }}</q-item-label> -->
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

      <div v-if="noDataFlag" class="row justify-center q-pt-lg">
        <img src="images/no_data.png" style="width: 35%; max-width: 250px;" />
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

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
  </q-dialog> -->
  
  <q-dialog v-model="confirmMainHall">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-icon name="warning" color="primary" size="md" /> -->
        <span class="q-ml-sm">{{ $t('confirm_main_hall') }}</span>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('confirm')" color="black" v-close-popup @click="updateMainHall" />
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
  name: 'MyPageExhibition',
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
      itemTemp: null,
      menuOpened: {},
      confirmMainHall: false,

      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      projectList: [],
      myReply: '', // 입력 답글
      myReplyLength: 0,
      noDataFlag: false,
      refresherDone: '',
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

    this.selectListMax()
  },
  mounted: function () {
    this.refresher(null)
  },
  methods: {
    openMenu(seq) {
      this.menuOpened[seq] = true
    },
    confirmMainHallModify(item) {
      this.itemTemp = item
      this.confirmMainHall = true
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
    calculateStatus(item) {
      const now = new Date()
      const startTime = new Date(item.display_start_time)
      const endTime = item.display_end_time ? new Date(item.display_end_time) : null

      if (item.status_cd == "10") {
        return 'Registering'
      }

      if (!endTime) {
        if (now >= startTime) {
          return 'start'
        } else if (now < startTime){
          return 'ready'
        }
      } else {
        console.log(3)
        if (now < startTime) {
          return 'ready'
        } else if (now >= startTime && now <= endTime) {
          return 'start'
        } else {
          return 'end'
        }
      }
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
        {params: {uid: this.getUid, regId: this.getUid, pageSize: this.pageSize, keyword: this.keyword, statusCd: this.$PROJECT_STATUS_CD_REGISTERED}}) // 등록중
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
        {params: {uid: this.getUid, regId: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, statusCd: this.$PROJECT_STATUS_CD_REGISTERED}})  // 등록중
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
    // 메인 홀 수정
    async updateMainHall() {
      const params = {
        ...this.itemTemp
      }

      this.$axios.post('/api/project/updateMainHall', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.refresher(null)
          } else {
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
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
    position: relative;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: block;
}

.menu-sec {
    position: absolute; 
    top: 0; 
    right: 0; 
    width: 20%; 
    height: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}


.more-menu {
  position: relative; 
  top: 10px;
  right: 0px;
  transform: translateX(-25%);
  /* background-color: rgba(0, 0, 0, 0.7); */
  background-color: #ffffffa2;
  color: rgb(0, 0, 0);
  border: none;
  /* padding: 5px 8px; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  /* display: none; */
}

.menu {
  z-index: 9999;
  position: absolute;
    top: 45px;  /* 'more_horiz' 버튼 아래에 메뉴가 위치하도록 */
    right: 10px; /* 오른쪽 정렬 */
    width: auto;  /* 메뉴의 너비를 자동으로 조절 */
}

.main-hall-label {
  position: absolute;
  top: 10px;
  left: 15%;
  transform: translateX(-50%);
  background-color: aliceblue;
  color: #0C2C69;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
}


@media (max-width: 1023px) {
  .image-container {
    max-width: 100%;
  }

  .main-hall-label {
    position: absolute;
    top: 10px;
    left: 23%;
    transform: translateX(-50%);
    background-color: aliceblue;
    color: #0C2C69;
    padding: 3px 5px;
    border-radius: 5px;
    font-size: 10px;
  }

}
</style>
