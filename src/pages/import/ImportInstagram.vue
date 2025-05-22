<template>
  <q-page class="page-1200 project-list-wrap">
    <div class="row q-pt-md q-pl-md justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_instagram_list') }}
      </div>
    </div>
    <div class="row q-pl-md row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_instagram_list_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <div class="row srch-wrap">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" />
      <!-- &nbsp;&nbsp;
      <q-btn @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" /> -->
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
    </div>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

    <!-- <img
      id="image1"
      crossorigin="anonymous"
      src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/106737419_279956670011345_7184237292505553542_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=GgsG03ePLQIAX9qIumI&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfCPf1rFTbE-sUpuhfQoD4wckTKsHEhKhA9_AZgDjwyi6w&oe=652BA178&_nc_sid=b41fef"
    /> -->
    <br />

    <!-- <img src="https://galleryx.io/images/logo_instarverse.png" /> -->

    <!-- 프로젝트 리스트 -->
    <q-pull-to-refresh @refresh="refresher" class="project-list">
      <q-infinite-scroll @load="loadMore" :offset="0" ref="infiniteScroll">

        <div v-for="item in projectList" :key="item.seq">

          <div @click="showDetail(item)" style="cursor: pointer;">
            <div v-if="$q.platform.is.mobile === true">

              <div v-if="item.media_type === '2'">
                <q-video :src="item.url" style="width: 100%; height: 300px" />
              </div>
              <div v-else>
                <q-img :src="item.url" style="width: 100%; height: 300px;" />
              </div>

              <div v-if="item.media_type === '1'" class="q-pt-md">
                media_type: {{ item.media_type }} (Image)
              </div>
              <div v-else-if="item.media_type === '2'" class="q-pt-md">
                media_type: {{ item.media_type }} (Video)
              </div>
              <div v-else-if="item.media_type === '8'" class="q-pt-md">
                media_type: {{ item.media_type }} (Carousel)
              </div>
              <div v-else class="q-pt-md">
                media_type: {{ item.media_type }} (?)
              </div>

              <div class="q-pt-md">{{ item.url }}</div>

            </div>
            <div v-else>

              <div v-if="item.media_type === '2'">
                <q-video :src="item.url" style="width: 370px; height: 370px" />
              </div>
              <div v-else>
                <q-img :src="item.url" style="width: 370px; height: 370px;" />
              </div>

              <div v-if="item.media_type === '1'" class="q-pt-md q-pl-md">
                media_type: {{ item.media_type }} (Image)
              </div>
              <div v-else-if="item.media_type === '2'" class="q-pt-md q-pl-md">
                media_type: {{ item.media_type }} (Video)
              </div>
              <div v-else-if="item.media_type === '8'" class="q-pt-md q-pl-md">
                media_type: {{ item.media_type }} (Carousel)
              </div>
              <div v-else class="q-pt-md q-pl-md">
                media_type: {{ item.media_type }} (?)
              </div>

              <div class="q-pa-md">{{ item.url }}</div>
              
            </div>
          </div>

          <!-- <q-item clickable @click="goDetail(item.seq)">
            <q-item-section avatar>
              <q-avatar>
                <img v-if="item.logo_image" :src="item.logo_image">
                <q-icon v-else name="rocket_launch" size="md" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row list-item">
                <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.title_ko }}</q-item-label>
                <q-item-label v-else class="col-12">{{ item.title }}</q-item-label>
                <q-item-label v-if="locale === 'ko-KR'" class="col-12">{{ item.summary_ko }}</q-item-label>
                <q-item-label v-else class="col-12">{{ item.summary }}</q-item-label>
              </div>
            </q-item-section>
          </q-item> -->

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
      <img src="images/galleryx_nodata_txt.png" style="width: 50%; max-width: 400px;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <TokenDetailModal ref="refTokenDetailModal"/> -->
  <WalletModal ref="refWalletModal" />
  <IframeModal ref="refIframeModal" />
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'InstagramList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      refresherDone: '',
      pageSize: 24,
      lastPageNum: 3, // 마지막 페이지
      projectList: [],
      noDataFlag: false,
      keyword: '', // 검색키워드
      numResults: '',
      moreAvailable: 'false',
      maxId: '',
    }
  },
  components: {
  },
  watch: {
    // getUid (newValue) {
    //   // console.log('newValue: : ' + newValue)
    //   // this.loadMore(1, null)
    //   this.refresher(null)
    //   // if (!newValue) {
    //   //   this.$router.push('/')
    //   // } else {
    //   //   this.loadMore(1, null)
    //   // }
    // },
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
    if (!this.keyword) {
      this.keyword = 'abstractsunday'
    }
    // this.keyword = 'abstractsunday'
    // this.keyword = 'instarverse2023'

    // this.selectListMax()
  },
  mounted: function () {
  },
  methods: {
    // 검색
    async search() {
      // await this.selectListMax()
      this.maxId = ''
      if (this.keyword !== '') {
        await this.refresher(null)
      }
    },
    // 검색어 입력창 키업 이벤트
    onKeyup (event) {
      // 키워드 설정
      this.$store.dispatch('setKeyword', this.keyword)

      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    showDetail(item) {
      // 상세 화면으로 이동
      // this.$refs.refIframeModal.url = url
      // this.$refs.refIframeModal.show()
      if (item.media_type === '8') {
        // console.log(item)
        // carousel 인 경우, 리스트 사이즈 만큼 창 오픈
        // console.log(item.carousel_media_list)
        // console.log(item.carousel_media_list.length)

        for (let i = 0; i < item.carousel_media_list.length; i++) {
          let carouselItem = item.carousel_media_list[i]
          // console.log(carouselItem.url)
          window.open(carouselItem.url, '_blank')
        }
      } else {
        window.open(item.url, '_system')
      }
    },
    // goDetail(seq) {
    //   // 상세 화면으로 이동
    //   this.$router.push({ path: '/exhibition/detail', query: { s: seq }})
    //   // this.$refs.refTokenDetailModal.tokenSeq = seq
    //   // this.$refs.refTokenDetailModal.show()
    // },
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
    // // 신규 토큰 리스트 마지막 페이지 조회
    // selectListMax() {
    //   // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
    //   if (!this.keyword) {
    //     this.keyword = ''
    //   }
    //   this.$axios.get('/api/project/selectProjectListLastPageNum',
    //     {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
    //     .then((result) => {
    //       // console.log(JSON.stringify(result.data))
    //       this.lastPageNum = result.data
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },

    // 인스타그램 미디어 리스트 조회
    selectList(idx, done) {
      // if (!this.keyword) {
      //   this.keyword = ''
      //   // 키워드 설정
      //   this.$store.dispatch('setKeyword', this.keyword)
      // }
      this.$axios.get('/api/instagram/selectInstagramMediaList777',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword, maxId: this.maxId}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.projectList = [] // 리스트 초기화
          }

          console.log(result.data.media_list)
          if (result.data != null && result.data.media_list != undefined) {
            this.projectList = this.projectList.concat(result.data.media_list)
            this.numResults = result.data.num_results
            this.moreAvailable = result.data.more_available
            this.maxId = result.data.next_max_id

            // 데이터가 더 없을 경우
            if (this.moreAvailable === 'false') {
              this.lastPageNum = idx
            } else {
              this.lastPageNum += 1
            }
          }

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
    goRegister() {

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // 프로젝트 등록 화면으로 이동
      this.$router.push('/project/registerProject')
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
