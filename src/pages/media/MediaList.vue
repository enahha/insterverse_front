<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('my_artworks') }}</span></div>
      </div>
    </div>

    <q-page-scroller class="custom-scroller" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="secondary" />
    </q-page-scroller>

    <div class="tab-panel-3 q-pt-lg">

      <div style="width: 100%; display: flex; justify-content: flex-end; gap: 20px;">
        <!-- <q-btn
            :label="$t('import')"
            @click="goImport"
            style="background-color: #0C2C69; color: white; min-width: 100px;"
          /> -->

          <q-btn
            
            @click="goAdd"
            style="background-color: #0C2C69; color: white; min-width: 140px; "
          >
            <q-icon name="add" color="white" size="sm" />&nbsp;
            {{ $t('add') }}
          </q-btn>
      </div>

      <q-pull-to-refresh @refresh="refresher">
        <q-infinite-scroll @load="loadMore" :offset="1000" ref="infiniteScroll" style="background-color: #FEFEFE;">
          
          <div class="media-table-wrapper text-center q-pt-lg">
            <div class="table-scroll-wrapper">
              <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                <thead>
                  <tr>
                    <!-- <th>{{ $t('media_order_number') }}</th> -->
                    <th v-if="!smallSize">No.</th>
                    <th>{{ $t('media') }}</th>
                    <th>{{ $t('media_title') }}</th>
                    <th v-if="!smallSize">{{ $t('media_price') }} (USD)</th>
                    <th v-if="!smallSize">{{ $t('media_description') }}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in mediaList" :key="index">
                    <!-- <td><input type="checkbox" v-model="item.selected"></td> 체크박스 -->
                    <td v-if="!smallSize" @click="showDetail(item)" style="width: 70px; cursor: pointer;">{{ item.order_no }}</td>

                    <td @click="showDetail(item)" style="width: 140px; cursor: pointer;" v-if="item.type == 'VIDEO'"><video :src="item.url" controls autoplay loop muted style="width: 100%; max-width: 100px;"></video></td>
                    <td @click="showDetail(item)" style="width: 100px; cursor: pointer;" v-else><q-img :src="item.url" style="width: 100px;" /></td>
                    
                    <td @click="showDetail(item)" style="width: 150px; cursor: pointer;"> {{ truncateText(item.title, 10) }}</td>
                    <td @click="showDetail(item)" style="width: 100px; cursor: pointer;" v-if="!smallSize && item.price > 0">{{ Number(item.price).toLocaleString() }}</td>
                    <td @click="showDetail(item)" style="width: 100px; cursor: pointer;" v-if="!smallSize && (item.price <= 0 || isNaN(item.price))"><span>-</span></td>
                    <td  v-if="!smallSize" @click="showDetail(item)" style="width: 300px; cursor: pointer;">{{ truncateText(item.description, 20) }}</td>
                    <td style="width: 100px;">
                      <q-icon name="edit" size="sm" @click="goEdit(item.seq)">
                        <q-tooltip>{{ $t('edit') }}</q-tooltip>
                      </q-icon>
                      &nbsp;&nbsp;&nbsp;
                      <q-icon name="delete_forever" size="sm" @click="deleteMyMedia(item.seq)">
                        <q-tooltip>{{ $t('delete') }}</q-tooltip>
                      </q-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>

        </q-infinite-scroll>
      </q-pull-to-refresh>

      <div v-if="noDataFlag" class="row justify-center q-pt-lg">
        <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmDelete">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="deleteProcess" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <MediaDetailModal ref="refMediaDetailModal" />

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'RegisterProject',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      smallSize: false,
      confirmDelete: false, // delete 확인창
      keyword: '',
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      noDataFlag: false, // 나의 작품 데이터 없음 플래그
      mediaList: [],
      deleteSeq: '',
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
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
  },
  created: function () {
    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
      if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }

    // 로그인 체크
    this.checkLogin()

    // 미디어 리스트 조회
    this.selectListMax()
  },
  // watch: {
  //   getNickname(newNickname) {
  //     this.nickname = newNickname;
  //   }
  // },
  mounted: function () {},
  methods: {
    showDetail(item) {
      console.log(item)
      this.$refs.refMediaDetailModal.myMediaVo = item
      this.$refs.refMediaDetailModal.show()
    },
    goEdit(seq) {
      this.$router.push({ path: '/media/modifyMedia', query: { seq: seq }})
    },
    deleteMyMedia(seq) {
      // 삭제 확인창 표시
      this.deleteSeq = seq
      this.confirmDelete = true
    },
    async deleteProcess() {
      await this.doDeleteMyMedia()
      await this.doDeleteMedia()

      // 리스트 재조회
      this.search()
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    async doDeleteMyMedia(seq) {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.deleteSeq,
      }
      this.$axios.post('/api/mymedia/deleteMyMedia', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('delete_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    async doDeleteMedia(seq) {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        del_id: this.getUid,
        my_media_seq: this.deleteSeq,
      }
      this.$axios.post('/api/media/deleteMediaByMyMediaSeq', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('delete_success'))
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
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
    checkLogin() {
      // 로그인 되어있지 않으면 로그인페이지로 이동, 로그인 후 돌아올 path 설정
      if(!this.getUid) {
        this.$router.push({ path: '/login', query: { redirectPath: this.$route.path }})
      }
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
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.mediaList = []
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
    // 작품 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/mymedia/selectMyMediaListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
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
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/mymedia/selectMyMediaList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.mediaList = [] // 리스트 초기화
          }
          this.mediaList = this.mediaList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.mediaList || this.mediaList.length < 1) {
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
    async updateProjectStatusCd() {
      // 1. 프로젝트 수정 처리
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        status_cd: this.$PROJECT_STATUS_CD_PAID,      // 정보 등록 완료(결제 완료)
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/updateProjectStatusCd', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // // 페이지 이동
            // this.$router.go(-1)
            // if (this.$route.query.fromAdmin === 'Y') {
            //   // 나의 프로젝트 리스트 화면 - admin
            //   this.$router.push('/admin/adminMyList')
            // } else {
            //   // 나의 프로젝트 리스트 화면
            //   this.$router.push('/project/myList')
            // }
            // <!-- 관리자 수정용 -->
            // this.$router.push('/project/newList')
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })

    },
    goAdd() {
      this.$router.push('/media/registerMedia')
    },
    goImport() {
      this.$router.push('/project/selectPlatform')
    },
    goBack() {
      // this.$router.go(-1)

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
  }
})
</script>

<style scoped>
</style>
