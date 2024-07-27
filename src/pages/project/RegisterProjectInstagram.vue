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
      <br />
      nextPageUrl<br />
      {{ nextPageUrl }}<br />
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
      <q-btn fab icon="keyboard_arrow_up" color="secondary" />
    </q-page-scroller>


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
          <span class="text-weight-bold text-subtitle1">{{ $t('select_artwork_to_exhibit') }}</span>
        </div>
      </div>
      <div class="justify-center q-pt-xs">

        <q-list bordered separator>
          <q-item v-for="(item, index) in postList" :key="item.seq" clickable class="text-left" @click="checkItem(index)">
            <q-item-section style="flex:50px;">
              <q-checkbox v-model="item.selected" color="blue" />
            </q-item-section>
            <q-item-section style="flex:80px;">
              <video v-if="item.media_type == 'VIDEO'" :src="item.media_url" controls autoplay loop muted style="width: 100%; max-width: 80px;"></video>
              <img v-else :src="item.media_url" style="width: 100%; max-width: 80px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class=""><span class="text-grey-5">{{ $t('id') }} : </span><span>{{ item.id }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('caption') }} : </span><span>{{ item.caption }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('timestamp') }} : </span><span>{{ qDate.formatDate(item.timestamp, 'YYYY-MM-DD HH:mm:ss') }}</span></q-item-label>
              <q-item-label class="q-pt-xs"><span class="text-grey-5">{{ $t('media type') }} : </span><span>{{ item.media_type }}</span></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-btn v-if="nextPageUrl" class="btn" color="secondary" text-color="white" size="lg" style="width: 100%;" @click="loadMore" :loading="isLoading" tabindex="16">
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
import { date } from 'quasar'

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
      userInfo: {
        id: '',
        username: '',
      },
      mediaListField: 'id,caption,media_type,media_url,username,timestamp', // 미디어 리스트 조회 항목
      nextPageUrl: '', // 인스타그램 미디어 다음페이지 조회 URL
      isLoading: false,
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
    qDate() {
      return date
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

    this.$q.loading.show() // 로딩 표시 시작

    // 사용자 정보 조회
    this.getUserInfo()

    // 사용자 미디어 조회
    this.getUserMediaList()

    // this.$q.loading.hide() // 로딩 표시 종료
    
  },
  mounted: function () {
  },
  methods: {
    // 사용자 정보 조회
    async getUserInfo() {
      try {
        // id, username 조회
        const paramUserInfo = {
          fields: 'id,username',
          access_token: this.token,
        }
        const resultUserInfo = await this.$axios.get('https://graph.instagram.com/me', { params: { ...paramUserInfo } })
        if (resultUserInfo.data) {
          console.log(resultUserInfo.data)
          this.userInfo = resultUserInfo.data
        } else {
          this.$noti(this.$q, this.$t('request_data_failed'))
        }
      } catch(e) {
        this.$q.loading.hide() // 로딩 표시 종료
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 사용자 미디어 리스트 조회
    async getUserMediaList() {
      try {
        // media list 조회
        const paramMediaList = {
          fields: 'id,caption,media_type,media_url,username,timestamp',
          access_token: this.token,
        }
        const resultMediaList = await this.$axios.get('https://graph.instagram.com/me/media', { params: { ...paramMediaList } })
        if (resultMediaList.data) {
          console.log(resultMediaList.data)
          // this.postList = resultMediaList.data.data
          // this.setUndefinedToFalse() // undefined selected -> false
          this.nextPageUrl = resultMediaList.data.paging.next

          // 케로셀 미디어 하위 미디어 설정 후 포스트 리스트 설정
          this.postList = await this.getChildrenAddedPostList(resultMediaList.data.data)
          console.log('this.postList: ')
          console.log(this.postList)
        } else {
          this.$noti(this.$q, this.$t('request_data_failed'))
        }
      } catch(e) {
        this.$q.loading.hide() // 로딩 표시 종료
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 하위 미디어 설정
    async getChildrenAddedPostList(newList) {

      // 추가 대상 리스트
      let childrenAddedMediaList = []

      for (let i = 0; i < newList.length; i++) {
        const postObj = newList[i]

        // 케로셀 미디어가 아닌 경우 스킵
        if (postObj.media_type != 'CAROUSEL_ALBUM') {
          postObj.selected = false // 체크박스 해제 디폴트 설정
          childrenAddedMediaList.push(postObj)
        } else {
          // 케로셀 미디어인 경우, 하위 미디어 조회
          const paramChildrenMediaList = {
            // fields: 'id,caption,media_type,media_url,username,timestamp',
            access_token: this.token,
          }
          const resultChildrenMediaList = await this.$axios.get('https://graph.instagram.com/' + postObj.id + '/children', { params: { ...paramChildrenMediaList } })
          if (resultChildrenMediaList.data) {
            // console.log(resultChildrenMediaList.data)
            const childrenMediaIdList = resultChildrenMediaList.data.data

            // 하위 미디어 리스트 루프
            for (let i = 0; i < childrenMediaIdList.length; i++) {
              const childrenMediaObj = childrenMediaIdList[i]
              const mediaId = childrenMediaObj.id

              console.log('mediaId: ' + mediaId)
              let media = await this.getMedia(mediaId, postObj.caption)
              console.log(media)

              // 미디어 추가
              childrenAddedMediaList.push(media)
            }
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        }

        console.log('childrenAddedMediaList: ')
        console.log(childrenAddedMediaList)
      }
      this.$q.loading.hide() // 로딩 표시 종료

      return childrenAddedMediaList
    },
    async getMedia(mediaId, caption) {
      // media 조회
      const paramMedia = {
        fields: 'id,media_type,media_url,username,timestamp', // caption이 없음
        access_token: this.token,
      }
      let resultMedia = await this.$axios.get('https://graph.instagram.com/' + mediaId, { params: { ...paramMedia } })
      if (resultMedia.data) {
        resultMedia.data.selected = false // 체크박스 해제 디폴트 설정
        resultMedia.data.caption = caption // children media는 caption이 없기 때문에 부모 미디어의 캡션으로 설정
        // console.log(resultMedia.data)
        return resultMedia.data
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }
    },
    // 사용자 미디어 다음페이지 조회
    async loadMore() {
      // this.$q.loading.show() // 로딩 표시
      this.isLoading = true // 로딩 표시

      const resultMediaList = await this.$axios.get(this.nextPageUrl)
      if (resultMediaList.data) {
        console.log(resultMediaList.data)
        // this.postList = this.postList.concat(resultMediaList.data.data)
        let newPostList = await this.getChildrenAddedPostList(resultMediaList.data.data)
        this.postList = this.postList.concat(newPostList)

        // this.setUndefinedToFalse() // undefined selected -> false
        this.nextPageUrl = resultMediaList.data.paging.next
      } else {
        this.$noti(this.$q, this.$t('request_data_failed'))
      }

      this.isLoading = false // 로딩 표시 종료
    },
    // undefined selected -> false (undefined면 체크박스가 - 표시되어서 이를 방지하기 위해서 실행)
    setUndefinedToFalse() {
      for (let i = 0; i < this.postList.length; i++) {
        let postObj = this.postList[i]
        if (!postObj.selected) {
          postObj.selected = false
        }
      }
    },
    checkItem(index) {
      // console.log(index)
      // console.log(this.postList[index].selected)
      if (this.postList[index].selected) {
        this.postList[index].selected = false
      } else {
        this.postList[index].selected = true
      }
    },
    // 로그인 후 포스트 리스트 가져오기
    async importPostList() {
      console.log(123)
    },
    // async refresher() {
    //   this.postList = []
    //   this.currentPage = 1

    //   await this.selectListMax()
    //   await this.loadMore(1)
    // },

    goBack() {
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      // 페이지 이동
      // this.$router.go(-1)
      this.$router.push('/project/selectPlatform')
    },
    openUrl(url) {
      return // 사용 안함

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
    },

  },
})
</script>

<style scoped>
</style>
