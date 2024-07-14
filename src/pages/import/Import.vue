<template>
  <q-page class="page-1200 project-list-wrap">
    <div class="row q-pt-md q-pl-md justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_import') }}
      </div>
    </div>
    <div class="row q-pl-md row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_import_description') }}
      </div>
    </div>
    <!-- <div class="row justify-center q-pb-md">
    </div> -->

    <!-- <div class="row srch-wrap">
      <q-input v-model="keyword" @keyup="onKeyup" type="search" color="primary" style="width: 190px;" />
      &nbsp;&nbsp;
      <q-btn @click="goRegister" icon="add" color="primary" size="lg" style="width: 80px;" />
      &nbsp;&nbsp;
      <q-btn @click="search" icon="search" color="primary" size="lg" style="width: 80px;" outlined />
    </div> -->

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->

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
    async refresher() {
      this.mintingImageList = []
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
            this.mintingImageList = [] // 리스트 초기화
          }
          this.mintingImageList = this.mintingImageList.concat(result.data)

          // nft_image가 video 타입이면 isVideoNft를 true로 설정
          for (let i = 0; i < this.mintingImageList.length; i++) {
            const file_extension = this.mintingImageList[i].file_extension
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
              this.mintingImageList[i].isVideoNft = true
            } else {
              this.mintingImageList[i].isVideoNft = false
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

  },
})
</script>

<style scoped>
</style>
