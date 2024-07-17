<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_import_instagram') }}
      </div>
    </div>
    <!-- <div class="row q-pl-md justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_import_instagram_description') }}
      </div>
    </div> -->
    <div class="row justify-center q-pb-xl">
    </div>

    <!-- 상단 버튼 -->
    <div class="row q-pb-xl">
      <div class="col-12">
        <span @click="goBack" style="cursor: pointer;">
          <q-icon name="arrow_back" size="md" />
          {{ $t('go_back') }}
        </span>
      </div>
    </div>

    <div>
      instagram access token<br />
      {{ token }}<br />
      <br />
      instagram user id<br />
      {{ userId }}<br />
    </div>

    <!-- <table border="0" width="" cellpadding="0" cellspacing="0" align="left">
      <tr>
        <td width="100" class="text-left">
          <span class="text-weight-bold text-subtitle1">{{ $t('id') }}</span>
        </td>
        <td class="text-left" width="200">
          <q-input v-model="instagramId" ref="refInstagramId" style="max-width: 200px;" clearable standout dense tabindex="1" />
        </td>
        <td rowspan="2" class="text-center q-pl-sm">
          <q-btn class="btn" color="grey-3" text-color="black" style="width: 120px; height: 89px;" no-caps @click="importPostList" tabindex="3">
            <span class="text-weight-bold text-subtitle1">{{ $t('import') }}</span>
          </q-btn>
        </td>
      </tr>
      <tr class="">
        <td class="text-left q-pt-md">
          <span class="text-weight-bold text-subtitle1">{{ $t('password') }}</span>
        </td>
        <td class="text-left q-pt-sm" style="max-width: 200px;">
          <q-input v-model="instagramPwd" ref="refInstagramPwd" style="max-width: 200px;" clearable standout dense tabindex="2" />
        </td>
      </tr>
    </table> -->
    <!-- 인스타그램 아이디 -->



    <!-- TOP으로 스크롤 버튼 -->
    <!-- <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[10, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="black" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->
    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="" />
    </q-page-scroller>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    <!-- <div class="row srch-wrap">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" />
      &nbsp;&nbsp;
      <q-btn @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
    </div> -->


    

    <!-- <img
      id="image1"
      crossorigin="anonymous"
      src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/106737419_279956670011345_7184237292505553542_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=GgsG03ePLQIAX9qIumI&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfCPf1rFTbE-sUpuhfQoD4wckTKsHEhKhA9_AZgDjwyi6w&oe=652BA178&_nc_sid=b41fef"
    /> -->
    <br />

    <!-- <img src="https://instarverse.com/images/logo_instarverse.png" /> -->

    <!-- 포스트 리스트 -->

    <div v-if="postList.length > 0">
      <div class="row justify-center q-pt-xl">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1">{{ $t('minting_uploaded_nft_image_list') }}</span>
        </div>
      </div>
      <div class="justify-center q-pt-xs">

        <q-list bordered separator>
          <q-item v-for="item in postList" :key="item.seq" clickable class="text-left" @click="openUrl(item.file_url)">
            <q-item-section avatar>
              <video v-if="item.isVideoNft" :src="item.file_url" controls autoplay loop muted style="width: 100%; max-width: 80px;"></video>
              <img v-else :src="item.file_url" style="width: 100%; max-width: 80px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class=""><span class="text-grey-5">{{ $t('minting_nft_image_file_name') }} : </span><span class="text-bold">{{ item.file_name + '.' +  item.file_extension }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('minting_nft_image_file_name_original') }} : </span><span>{{ item.file_name_original }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('minting_nft_image_reg_time') }} : </span><span>{{ qDate.formatDate(item.reg_time, 'YYYY-MM-DD HH:mm:ss') }}</span></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-btn v-if="currentPage <= lastPageNum" class="btn" color="secondary" text-color="black" size="md" style="width: 100%;" @click="loadMore(currentPage)" tabindex="16">
          <b>{{ $t('load_more') }}</b>
        </q-btn>
      </div>
    </div>

    <div v-if="noDataFlag" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
    </div>

    <!-- 하단 버튼 -->
    <div class="row q-pt-xl">
      <div class="col-12">
        <span @click="goBack" style="cursor: pointer;">
          <q-icon name="arrow_back" size="md" />
          {{ $t('go_back') }}
        </span>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

    <!-- 돌아가기 확인창 -->
    <q-dialog v-model="confirmGoBack">
      <q-card>
        <q-card-section class="row items-center" style="min-width: 200px;">
          <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
          <q-icon name="warning" color="primary" size="md" />
          <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="around">
          <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
          <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
  <!-- <TokenDetailModal ref="refTokenDetailModal"/> -->
  <WalletModal ref="refWalletModal" />
  <IframeModal ref="refIframeModal" />
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RegisterProjectInstagram',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      token: '', // 인스타그램 액세스 토큰 long
      userId: '', // 인스타그램 사용자 아이디
      confirmGoBack: false,
      // instagramId: 'aaa',
      // instagramPwd: 'bbb',
      refresherDone: '',
      pageSize: 24,
      lastPageNum: 3, // 마지막 페이지
      postList: [],
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
    // 인스타그램 액세스 토큰
    this.token = this.$route.query.token
    this.$cookie.set('INSTAGRAM_ACCESS_TOKEN', this.token, 365)
    localStorage.setItem('INSTAGRAM_ACCESS_TOKEN', this.token, 365)
    
    this.userId = this.$route.query.userId
    this.$cookie.set('INSTAGRAM_USER_ID', this.userId, 365)
    localStorage.setItem('INSTAGRAM_USER_ID', this.userId, 365)
    
  },
  mounted: function () {
  },
  methods: {
    // 로그인 후 포스트 리스트 가져오기
    async importPostList() {
      console.log(123)
    },
    async refresher() {
      this.postList = []
      this.currentPage = 1

      await this.selectListMax()
      await this.loadMore(1)
    },
    async loadMore(index) {
      this.selectList(index)
      this.currentPage++
    },
    // NFT 민팅 이미지 마지막 페이지 조회
    async selectListMax() {
      this.$axios.get('/api/minting/selectMintingImageListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, seq_minting: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // NFT 민팅 이미지 리스트 조회
    selectList(idx) {
      this.$axios.get('/api/minting/selectMintingImageList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, seq_minting: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.postList = [] // 리스트 초기화
          }
          this.postList = this.postList.concat(result.data)

          // nft_image가 video 타입이면 isVideoNft를 true로 설정
          for (let i = 0; i < this.postList.length; i++) {
            const file_extension = this.postList[i].file_extension
            // console.log('file_extension: ' + file_extension)
            if (
              file_extension === 'mp4'
              || file_extension === 'avi'
              || file_extension === 'wmv'
              || file_extension === 'mpg'
              || file_extension === 'mpeg'
              || file_extension === 'mov'
              || file_extension === 'm4v'
              || file_extension === 'avif'
              || file_extension === 'ogm'
              || file_extension === 'webm'
              || file_extension === 'ogv'
              || file_extension === 'asx'
              || file_extension === 'mp4'
              || file_extension === 'mp4'
              || file_extension === 'mp4'
            ) {
              this.postList[i].isVideoNft = true
            } else {
              this.postList[i].isVideoNft = false
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
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

  },
})
</script>

<style scoped>
</style>
