<template>
  <q-page class="page-1200 q-pa-md contact-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec">{{ $t('contact') }}   <span class="subtitle" v-if="locale === 'ko-KR'">Contact</span></div>
      </div>
    </div>

    <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="1">{{ $t('문의하기') }}</q-tab>
      <q-tab name="2">FAQ</q-tab>
    </q-tabs>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 문의하기 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="1" style="word-break: break-word;">
        <div class="tab-1">
          <div class="company-info">
            <q-item>
              <q-item-section avatar class="">
                <!-- <q-icon name="aspect_ratio" style="width: 20px; height: 20px;" /> -->
                <q-img src="icons/icon_contact_call.png" width="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ contactNumber }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar class="">
                <!-- <q-icon name="aspect_ratio" style="width: 20px; height: 20px;" /> -->
                <q-img src="icons/icon_contactus_2.png" width="40px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ contactEmail }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="contact-register">
            <q-card bordered class="bg-grey-9 my-card">
              <q-card-section class="input">
                <span class="text-weight-bold text-subtitle1">{{ $t('user_nickname') }}<span class="text-red"> *</span></span>
                <q-input v-model="nickname" ref="nickname" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable outlined tabindex="1" />
                <span class="text-weight-bold text-subtitle1">{{ $t('email') }}<span class="text-red"> *</span></span>
                <q-input v-model="email" ref="email" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable outlined tabindex="1" />
                <span class="text-weight-bold text-subtitle1">{{ $t('contact_content') }}<span class="text-red"> *</span></span>
                <q-input v-model="contants" ref="contants" :rules="[required, val => minLength(val, 1)]" clearable type="textarea" tabindex="1" />
                <div class="register-btn">
                  <q-btn
                    :label="$t('contact_register')"
                    @click="goTabBack"
                    style="background-color: #90B2D8; color: white; width: 25%;"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 2. FAQ 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="2" style="word-break: break-word;">
        <div class="tab-2">
          <span>FAQ</span>
          <div class="underline"></div>

          <div class="row srch-wrap">
            <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" clearable outlined />
            &nbsp;&nbsp;
            <q-btn v-if="isAdmin" @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" />

            <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
          </div>

          <!-- 공지사항 리스트 -->
          <q-pull-to-refresh @refresh="refresher" class="notice-list">
            <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

              <div v-for="item in faqList" :key="item.seq" @click="showDetail(item.seq)" style="cursor: pointer;z-index: 1;">
                <q-item clickable>
                  <q-item-section>
                    <div class="list-item">
                      <q-item-label v-if="locale === 'ko-KR'" class="col-9 text-weight-bold">{{ item.title_ko }}</q-item-label>
                      <q-item-label v-else class="col-9 text-weight-bold">{{ item.title }}</q-item-label>
                      <q-item-label class="col-3 text-right">{{ qDate.formatDate(item.reg_time, 'YYYY-MM-DD HH:mm') }}</q-item-label>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item-section>
                  <q-item-label v-if="locale === 'ko-KR'" class="col-3 text-right">{{ item.contants_ko }}</q-item-label>
                  <q-item-label v-else class="col-3 text-right">{{ item.contants }}</q-item-label>
                </q-item-section>
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
       </div>
      </q-tab-panel>
    </q-tab-panels>


  </q-page>
  <FaqDetailModal ref="refFaqDetailModal"/>

</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js'
import { date } from 'quasar'

export default defineComponent({
  name: 'Contact',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      tab: '1',
      contactNumber: '02-717-0401',
      contactEmail: 'contact@starinc.io',
      nickname: '',
      email: '',
      contants: '',
      refresherDone: '',
      pageSize: 20,
      lastPageNum: 1, // 마지막 페이지
      faqList: [],
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
    this.selectListMax()
  },
  mounted: function () {},
  methods: {
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
      this.$refs.refFaqDetailModal.seq = seq
      this.$refs.refFaqDetailModal.show()
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.faqList = []
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
    // FAQ 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/faq/selectFaqListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // FAQ 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/faq/selectFaqList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.faqList = [] // 리스트 초기화
          }
          this.faqList = this.faqList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.faqList || this.faqList.length < 1) {
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
      // FAQ 등록 화면으로 이동
      this.$router.push('/faq/register')
    },
    callbackDetail() {
      this.search()
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
      if (!this.$refs.nickname.validate()) {
        result = false
      }
      if (!this.$refs.email.validate()) {
        result = false
      }
      if (!this.$refs.contants.validate()) {
        result = false
      }
      return result
    },
    // 등록 처리 시작
    async register() {
      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // check mainnet
      if (this.mainnetObj.value !== 'KLAYTN') {
        this.$noti(this.$q, this.$t('unsupported_mainnet'))
        return
      }

      // 등록
      this.doRegister()
    },
    // 문의사항 등록
    async doRegister() {
      // 1. 등록
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        mainnet: this.mainnetObj.value,
        type: this.projectTypeObj.value,
        wallet_address: this.projectWalletAddress,
        token_contract_address: this.projectTokenContractAddress,
        lp_contract_address_1: this.projectLpContractAddress1,
        lp_contract_address_2: this.projectLpContractAddress2,
        lp_contract_address_3: this.projectLpContractAddress3,
        lp_contract_address_4: this.projectLpContractAddress4,
        lp_contract_address_5: this.projectLpContractAddress5,
        lp_contract_address_6: this.projectLpContractAddress6,
        lp_contract_address_7: this.projectLpContractAddress7,
        lp_contract_address_8: this.projectLpContractAddress8,
        lp_contract_address_9: this.projectLpContractAddress9,
        lp_contract_address_10: this.projectLpContractAddress10,
        title: this.projectTitle,
        title_ko: this.projectTitleKo,
        summary: this.projectSummary,
        summary_ko: this.projectSummaryKo,
        description: this.projectDescription,
        description_ko: this.projectDescriptionKo,
        official_website: this.projectOfficialWebsite,
        official_email: this.projectOfficialEmail,
        logo_image: this.projectLogoImage,
        docs: this.projectDocs,
        blog: this.projectBlog,
        medium: this.projectMedium,
        telegram: this.projectTelegram,
        twitter: this.projectTwitter,
        github: this.projectGithub,
        meta: this.projectMeta,
        discord: this.projectDiscord,
        // nft_yn: 'Y', // NFT 프로젝트 여부 = 'Y'
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/insertProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 페이지 이동
            // 나의 프로젝트 리스트 화면
            this.$router.push('/project/myProjectList')

            // <!-- 관리자 수정용 -->
            // this.$router.push('/project/newList')
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    doGoBack() {
      // 페이지 이동
      this.$router.go(-1)
      // if (this.$route.query.fromAdmin === 'Y') {
      //   // 나의 프로젝트 리스트 화면 - admin
      //   this.$router.push('/admin/adminMyList')
      // } else {
      //   // 나의 프로젝트 리스트 화면
      //   this.$router.push('/project/projectList')
      // }
    }
  }
})
</script>

<style scoped>
</style>
