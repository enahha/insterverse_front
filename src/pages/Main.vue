<template>
  <!-- <q-page class="justify justify-center" style="background-image: url(images/star1.jpg)"> -->
  <q-page class="justify justify-center main-list">
    <q-carousel
      v-if="locale === 'ko-KR'"
      class="benner carousel"
      v-model="benneSlide"
      swipeable
      animated
      :autoplay="15000"
      control-color="white"
      :navigation="!this.smallSize"
      :arrows="this.smallSize"
      infinite
    >
    
      <template v-slot:navigation-icon="{ active, onClick }">
        <q-btn v-if="active" size="lg" flat round dense @click="onClick">
          <img src="icons/icon_main_1.png" alt="Active Icon" class="navigation-icon" />
        </q-btn>
        <q-btn v-else size="sm" flat round dense @click="onClick">
          <img src="icons/icon_main_2.png" alt="Inactive Icon" class="navigation-icon"/>
        </q-btn>
      </template>

      <q-carousel-slide
        v-for="item in bannerImageKor" 
        :key="item.seq"
        :name="(item.seq).toString()"
        :img-src="item.src"
        style="background-size: cover;"
        @click="handleSlideClick(item.seq)"
      >
        <div class="banner-mant" v-if="item.seq != 2">
          <div>
            <q-img class="logo" src="logo/galleryx_logo.png" style="cursor: pointer; " />
            <p class="ment ment-1">{{ $t('main_banner_info_1') }}</p>
          </div>
          <p class="ment ment-2">{{ $t('main_banner_info_2') }}</p>
          <p class="ment ment-3">{{ $t('main_banner_info_3') }}</p>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-carousel
      v-else
      class="benner carousel"
      v-model="benneSlide"
      swipeable
      animated
      :autoplay="15000"
      control-color="white"
      :navigation="!this.smallSize"
      :arrows="this.smallSize"
      infinite
    >
    
      <template v-slot:navigation-icon="{ active, onClick }">
        <q-btn v-if="active" size="lg" flat round dense @click="onClick">
          <img src="icons/icon_main_1.png" alt="Active Icon" class="navigation-icon" />
        </q-btn>
        <q-btn v-else size="sm" flat round dense @click="onClick">
          <img src="icons/icon_main_2.png" alt="Inactive Icon" class="navigation-icon"/>
        </q-btn>
      </template>

      <q-carousel-slide
        v-for="item in bannerImage" 
        :key="item.seq"
        :name="(item.seq).toString()"
        :img-src="item.src"
        style="background-size: cover;"
        @click="handleSlideClick(item.seq)"
      >
        <div class="banner-mant" v-if="item.seq != 2">
          <div>
            <q-img class="logo" src="logo/galleryx_logo.png" style="cursor: pointer; " />
            <p class="ment ment-1">{{ $t('main_banner_info_1') }}</p>
          </div>
          <p class="ment ment-2">{{ $t('main_banner_info_2') }}</p>
          <p class="ment ment-3">{{ $t('main_banner_info_3') }}</p>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="page-1200" style="word-break: keep-all;">
      <div class="space">
      </div>

      <!-- 인기 전시 -->
      <div class="best-exhibition">
        <div class="line-short"></div>
        <div class="doc-h2 part-1">
          {{ $t('best_exhibition') }}
        </div>
        <div class="line-padding"></div>
        <div class="line-long"></div>
      </div>

      <q-carousel
        class="view"
        v-model="bestSlide"
        swipeable
        animated
        :autoplay="8000"
        control-color="black"
        infinite
        flat
        padding
        :style="{ height: carouselHeight }"
        :navigation="!this.smallSize"
      >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="xs" :icon="btnProps.icon" color="gray" flat round dense @click="onClick" />
        <q-btn v-else size="xs" icon="radio_button_unchecked" color="black" flat round dense @click="onClick" />
      </template>

        <q-carousel-slide
          v-for="(group, index) in groupedItemAsView" 
          :key="index"
          :name="index.toString()"
        >
          <div class="row item-container">
            <div class="col" v-for="item in group" :key="item.seq">
              <q-item clickable @click="goDetail(item.seq)">
                <q-item-section avatar>
                  <q-avatar>
                    <img v-if="item.postar_url" :src="item.postar_url" />
                    <img v-else src="images/exhibition_poster_basic2.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <div class="row list-item">
                    <q-item-label class="col-12">{{ truncateString(item.title) }}</q-item-label>
                    <!-- <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.summary_ko }}</q-item-label> -->
                    <!-- <q-item-label v-else class="col-12">{{ item.summary }}</q-item-label> -->
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div style="padding-top: 100px;"></div>

      <!-- 신규 전시 -->
      <div class="new-exhibition">
        <div class="line-long"></div>
        <div class="line-padding"></div>
        <div class="doc-h2 part-1">
          {{ $t('new_exhibition') }}
        </div>
        <div class="line-short"></div>
      </div>


      <!-- <q-carousel
        class="view"
        v-model="newSlide"
        swipeable
        animated
        :autoplay="10000"
        control-color="black"
        infinite
        flat
        padding
        height="450px"
        :arrows="!this.smallSize"
      > -->
      <q-carousel
        class="view"
        v-model="newSlide"
        swipeable
        animated
        :autoplay="8000"
        control-color="black"
        infinite
        flat
        padding
        :style="{ height: carouselHeight }"
        :navigation="!this.smallSize"
      >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="xs" :icon="btnProps.icon" color="gray" flat round dense @click="onClick" />
        <q-btn v-else size="xs" icon="radio_button_unchecked" color="black" flat round dense @click="onClick" />
      </template>
      
        <q-carousel-slide
          v-for="(group, index) in groupedItemAsNew" 
          :key="index"
          :name="index.toString()"
        >
          <div class="row item-container">
            <div class="col" v-for="item in group" :key="item.seq">
              <q-item clickable @click="goDetail(item.seq)">
                <q-item-section avatar>
                  <q-avatar square>
                    <img v-if="item.postar_url" :src="item.postar_url" />
                    <img v-else src="images/exhibition_poster_basic2.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <div class="row list-item">
                    <q-item-label class="col-12">{{ truncateString(item.title) }}</q-item-label>
                    <!-- <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.summary_ko }}</q-item-label> -->
                    <!-- <q-item-label v-else class="col-12">{{ item.summary }}</q-item-label> -->
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </div>


        </q-carousel-slide>
      </q-carousel>

      

      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl">
      </div>



      <!-- 플랫폼 설명 -->
      
      <!-- <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
        <br />

        <iframe
          v-if="smallSize"
          width="100%"
          height="320"
          src="https://www.youtube.com/embed/0ZqtiUd1f-U"
          title="FundSafe - Blockchain Escrow Service"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <iframe
          v-else
          width="100%"
          style="max-width: 1280px;"
          height="720"
          src="https://www.youtube.com/embed/0ZqtiUd1f-U"
          title="FundSafe - Blockchain Escrow Service"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

      </div> -->


      <!-- <div class="text-center text-body q-pl-md q-pr-md" style="word-break: keep-all;">
        <br />
        <br />
        <br />
        <q-img src="images/idea.png" style="max-width: 600px;" />

        <div v-if="locale === 'en-US'">
          <br />
          <br />We are researching and developing various ways to protect investors.
          <br />We're trying to discover a possible vulnerability in WEB 3.0 and develop a new solution for it.
          <br />First, we are developing FundSafe to solve the risks arising from humans.
          <br />
          <br /><br /><br /><br /><br /><br /><br />
        </div>

        <div v-else-if="locale === 'ko-KR'">
          <br />
          <br />투자자를 보호하기 위한 다양한 방법을 연구하고 개발하고 있습니다.
          <br />WEB 3.0에서 발생할 수 있는 취약성을 발견하고 이에 대한 솔루션을 찾기 위해 노력합니다.
          <br />먼저, 사람으로부터 발생하는 위험을 없애기 위해 FundSafe를 개발하였습니다.
          <br />
          <br /><br /><br /><br /><br /><br /><br />
        </div>
      </div> -->

    </div>

    <!-- <div class="footer">
      <div class="footer-info">
        links
        <div class="text-caption flex flex-center" style="background: rgb(29, 29, 29);">
          <div class="row flex flex-center q-pt-md">
            <div class="q-pl-md q-pr-md q-pb-sm flex flex-center">
              
              <q-img src="logo/icons-social-gitbook.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://docs.beastar.io')" title="Docs" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-img src="logo/icons-social-twitter.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://twitter.com/beastar_2023')" title="Twitter" />
              &nbsp;&nbsp;&nbsp;
              <q-img src="logo/icons-social-medium.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://medium.com/@beastar_official')" title="Medium" />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-img src="logo/icons-social-discord.svg" style="width: 27px; cursor: pointer;" @click="openUrl('https://discord.gg/mqDEH4Du69')" title="Discord" />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <q-img src="logo/icons-social-telegram.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://t.me/beastar_official')" title="Telegram" />
              &nbsp;&nbsp;&nbsp;&nbsp;
             
              <q-img src="logo/icons-social-instagram.svg" style="width: 30px; cursor: pointer;" @click="openUrl('https://www.instagram.com/beastar.official')" title="Instagram" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-img src="logo/icons-apartment.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://www.starinc.io')" title="Company" />
            </div>
          </div>
        </div>

        <div class="text-caption flex flex-center q-pt-xs">
          <span class="text-white"> ⓒ 2023 Star Inc. all rights reserved.</span>
        </div>

        사업자정보
        <div class="text-caption flex flex-center">
          <div class="row">
            <div class="col-12 q-pa-xs text-white">
              {{ $t('company_name') }}
              | {{ $t('company_representive') }} : {{ $t('company_representive_value') }}
              | {{ $t('company_address') }} : {{ $t('company_address_value') }}
              | {{ $t('company_business_number') }} : 139-87-02383
              <a @click="openUrl('http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1398702383')" style="cursor: pointer;"><b>{{ $t('company_verification') }}</b></a>
              | {{ $t('company_mail_order_sales_registration_number') }} : {{ $t('company_mail_order_sales_registration_number_value') }}
              | {{ $t('company_email') }} : contact@starinc.io
              | {{ $t('company_cs') }} : 02-717-0401
              &nbsp;<a style="cursor: pointer;" @click="showTerms">{{ $t('company_show_terms') }}</a>
              &nbsp;<a style="cursor: pointer;" @click="showPrivacy">{{ $t('company_show_privacy') }}</a>
            </div>
          </div>
        </div>

      <div class="col-12 q-pa-md">
      </div>
      </div>
    </div> -->

    <!--
    <div class="text-caption text-white flex flex-center q-pt-sm" style="background: rgb(29, 29, 29);">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="text-center">
        <tr>
          <td>Copyright ⓒ 2023 Star Inc. all rights reserved.</td>
        </tr>
        <tr>
          <td>contact@starinc.io</td>
        </tr>
      </table>
    </div>
    -->

  </q-page>

  <TermsModal ref="refTermsModal" />
  <PrivacyModal ref="refPrivacyModal" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Main',
  data () {
    return {
      smallSize: false,
      refresherDone: '',
      pageSize: 100,
      lastPageNum: 1, // 마지막 페이지
      projectListAsView: [],
      projectListAsNew: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      benneSlide: '0',
      bestSlide: '0',
      newSlide: '0',

      bannerImage: [
        {
          seq: 0,
          src: 'images/instarverse_banner_3_1.png',
        },
        {
          seq: 1,
          src: 'images/instarverse_banner_3_2.png',
        },
        // {
        //   seq: 2,
        //   src: 'images/galleryx_banner_event1-2_eng.png',
        // },
        {
          seq: 2,
          src: 'images/galleryx_banner_event1_eng_btn_text.png',
        },
      ],
      bannerImageKor: [
        {
          seq: 0,
          src: 'images/instarverse_banner_3_1.png',
        },
        {
          seq: 1,
          src: 'images/instarverse_banner_3_2.png',
        },
        // {
        //   seq: 2,
        //   src: 'images/galleryx_banner_event1-2_kor.png',
        // },
        {
          seq: 2,
          src: 'images/galleryx_banner_event1_kor_btn_text.png',
        },
      ],
      userAgent: '',
    }
  },
  components: {
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
    getKeyword () {
      return this.$store.getters.getKeyword
    },
    carouselHeight() {
      return this.smallSize ? '550px' : '400px';
    },
    groupedItemAsView() {
     let chunkSize = 4 // Number of items per slide
      if(this.smallSize){
        console.log(this.smallSize)
        chunkSize = 4
      }
   
      const groups = []
      for (let i = 0; i < this.projectListAsView.length; i += chunkSize) {
        groups.push(this.projectListAsView.slice(i, i + chunkSize))
      }
      console.table(groups)
      return groups
    },
    groupedItemAsNew() {
     let chunkSize = 4 // Number of items per slide
      if(this.smallSize){
        console.log(this.smallSize)
        chunkSize = 4
      }
   
      const groups = []
      for (let i = 0; i < this.projectListAsNew.length; i += chunkSize) {
        groups.push(this.projectListAsNew.slice(i, i + chunkSize))
      }
      console.table(groups)
      return groups
    },
  },
  created: function () {
    // // console.log(this.$q.platform.is.mobile)
    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    if (nickname) {
      this.$store.dispatch('setNickname', nickname)
    }

    // // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
    // if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
    //   // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
    // ) {
    //   this.$router.push('/app/loginApp')
    //   // https://nftpy.io WEB으로 이동
    //   // alert('move to https://nftpy.io')
    //   // if (location.origin !== this.$domain) {
    //   //   location.href = this.$domain
    //   // }
    // }

    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }

    this.selectProjectListAsView()
    this.selectprojectListAsNew()

  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  mounted() {
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // // WEB으로 이동
    // moveToWeb () {
    //   // let targetPath = this.$cookie.get('LOGIN_REDIRECT_URL')
    //   // // APP이면 WEB으로 이동, WEB이면 Push
    //   // if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우 - 푸시 토큰 저장
    //   //   location.href = this.$store.state.DOMAIN + '/#' + targetPath + '?uid=' + uid + '&auth_key=' + authKey
    //   // } else {
    //   //   this.$router.push(targetPath)
    //   // }
    //   location.href = this.$domain
    // },

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
    truncateString(str) {
      const maxLength = 30
      if (str.length <= maxLength) {
        return str;
      }
      return str.slice(0, maxLength - 3) + '...';
    },
    resizeEventHandler() {
      // console.log('resizeEventHandler')
      // console.log(document.body.offsetWidth)
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
    },
    handleSlideClick(seq) {
      if (seq === 2) {
        this.$router.push({ path: '/introduction' })
      }
    },
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
    // 검색
    async search() {
      // await this.selectListMax()
      await this.refresher(null)
    },
    goDetail(seq) {
      this.insertActionLog('100400100', 'exhibition detail', seq)
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
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keywor, statusCd: this.$PROJECT_STATUS_CD_PAID}})
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
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, statusCd: this.$PROJECT_STATUS_CD_PAID}})
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
    // 인기순위순 조회
    selectProjectListAsView() {
      this.$axios.get('/api/project/selectProjectListAsView', {params: {limit: 12}})
      .then((result) => {
          console.log(result.data)
          this.projectListAsView = result.data
        })
    },
    // 등록일자순 조회
    selectprojectListAsNew() {
      this.$axios.get('/api/project/selectProjectListAsRegTime', {params: {limit: 12}})
      .then((result) => {
          console.log(result.data)
          this.projectListAsNew = result.data
        })
    },
    // 토큰 등록으로 이동
    goRegisterToken() {
      this.$router.push('/token/register')
    },
    // 이용약관 모달 표시
    showTerms() {
      this.$refs.refTermsModal.show()
    },
    // 개인정보처리방침 모달 표시
    showPrivacy() {
      this.$refs.refPrivacyModal.show()
    },
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {
        window.open(url, '_system')
      // }
    },
    showConstructionMessage() {
      this.$noti(this.$q, this.$t('coming_soon'))
    },
    downloadIpa() {
      window.open('https://nftpy.io/files/ipa/klaystar.ipa')
    },
    goProjectDetail() {
      this.$router.push({ path: '/exhibition/detail', query: { s: 1 }})
    },
  }
})
</script>
<style scoped>
.navigation-icon{
  width: 15px;
}
.q-carousel__slide {
  /* box-shadow: inset 0px -10px 15px -5px rgba(255, 255, 255, 1); */
}
@media (max-width: 1023px) {
  .q-carousel__slide {
    box-shadow: none;
  }
}
</style>