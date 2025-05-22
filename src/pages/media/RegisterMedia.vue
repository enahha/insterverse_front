<template>
  <q-page class="page-1200 q-pa-md q-pa-md reg-media">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('add_artwork') }}</span></div>
      </div>
    </div>

    <div class="flex flex-center">

      <div class="row">
        
        <!-- 반응형 div 1-->
        <div class="responsive-container q-mr-md q-pb-lg">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <!-- 작품 미리보기 -->
                <span class="text-weight-bold text-subtitle1">※ {{ $t('media_preview') }}</span>
              </td>
            </tr>
            <tr>
              <td v-if="smallSize" align="center" class="small-size-preview text-center">
                <!-- 작품 미리보기 -->
                <div class="row justify-center">
                  <div v-if="mediaUrl" class="col-12 media-preview">
                    <video v-if="mediaType == 'VIDEO'" :src="mediaUrl" controls autoplay loop muted class="media-video"></video>
                    <img v-else :src="mediaUrl" class="media-image">
                  </div>
                  <div v-else class="col-12 media-preview">
                    <span>{{ $t('no_artwork') }}</span>
                  </div>
                </div>
              </td>
              <td v-else align="center" class="large-size-preview text-center">
                <!-- 작품 미리보기 -->
                <div class="row justify-center">
                  <div v-if="mediaUrl" class="col-12 media-preview">
                    <video v-if="mediaType == 'VIDEO'" :src="mediaUrl" controls autoplay loop muted class="media-video"></video>
                    <img v-else :src="mediaUrl" class="media-image">
                  </div>
                  <div v-else class="col-12 media-preview">
                    <span>{{ $t('no_artwork') }}</span>
                  </div>
                </div>
                <br>
              </td>
            </tr>
            <tr>
              <td>
                <!-- 작품 URL -->
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_url') }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <!-- <td>
                <div class="">
                  <q-input v-model="mediaUrl" ref="refMediaUrl" @keyup="mediaUrlChanged" :rules="[required, val => minLength(val, 1), val => maxLength(val, 3000)]" clearable outlined tabindex="1" />
                </div>
              </td> -->
            </tr>
            <tr>
              <td>
                <!-- 작품 업로드 -->
                <div class="row">
                  <!-- <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_image') }}</span>
                  <span class="text-grey">
                    &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
                  </span> -->
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="col-12">
                  <q-uploader
                    field-name="file"
                    ref="uploaderObj"
                    url="/api/common/uploadImageAndThumbnail"
                    hide-upload-btn
                    color="grey-3"
                    text-color="black"
                    :multiple="false"
                    accept="image/*,video/*"
                    :filter="filterFiles"
                    max-files="1"
                    :auto-upload="true"
                    style="width: 100%;"
                    tabindex="9"
                    no-thumbnails
                    @uploaded="fileUploadedMedia"
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- 반응형 div 2 -->
        <div>
          <!-- 작품 항목 -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 10px;">
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_order_number') }}</span>
                </div>
                <div class="">
                  <q-input v-model="mediaOrderNumber" ref="refMediaOrderNumber" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_title') }}</span>
                </div>
                <div class="">
                  <q-input v-model="mediaTitle" ref="refMediaTitle" :rules="[val => maxLength(val, 100)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_subtitle') }}</span>
                </div>
                <div class="">
                  <q-input v-model="mediaSubtitle" ref="refMediaSubtitle" :rules="[val => maxLength(val, 100)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_price') }} (USD)</span>
                </div>
                <div class="row">
                  <q-input v-if="mediaForSale" v-model="mediaPrice" ref="refMediaPrice" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" style="width: 200px;"/>
                  <q-input v-else v-model="mediaPrice" :readonly="true" ref="refMediaPrice" clearable outlined tabindex="1" style="width: 200px;"/>
                  <q-checkbox
                    right-label
                    v-model="mediaForSale"
                    :label = "$t('media_sale')"
                    checked-icon="task_alt"
                    unchecked-icon="highlight_off"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_created') }}</span>
                </div>
                <div class="">
                  <q-input v-model="mediaCreatedAt" ref="refMediaCreated" :rules="[val => maxLength(val, 15)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_size') }}</span>
                </div>
                <div class="row">
                  <q-input class="q-mb-xs q-mr-xs" :label="$t('media_width')" style="width: 200px;" v-model="mediaWidth" ref="refMediaCreated" clearable outlined tabindex="1" />
                  <q-input class="q-mb-xs q-mr-xs" :label="$t('media_height')" style="width: 200px;" v-model="mediaHeight" ref="refMediaSize" clearable outlined tabindex="1" />
                  <q-select  :label="$t('media_unit')" outlined v-model="mediaUnit" :options="mediaUnitOption" style="width: 100px;"/>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_materials') }}</span>
                </div>
                <div class="">
                  <q-input v-model="mediaMaterials" ref="refMediaMaterials" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-pt-lg">
                  <span class="text-weight-bold text-subtitle1">{{ $t('project_tag') }}<span class="text-red"></span></span>
                </div>
                <div class="input-wrapper" style="max-width: 600px;">
                  <q-input
                      class="input-tag"
                      type="text"
                      v-model="hashState.hashtag"
                      @keyup.enter="onEnterKey"
                      :placeholder="hashState.hashArr.length < 5 ? $t('tag') : $t('tag_limit')"
                      :disabled="hashState.hashArr.length >= 5"
                      clearable outlined tabindex="1"
                    />
                  <div class="hash-wrapper">
                    <div
                      class="hash-item"
                      v-for="(tag, index) in hashState.hashArr"
                      :key="index"
                      draggable="true"
                    >
                      <p># {{ tag }}</p>
                      <p class="hash-item-delete" @click="removeHashTag(index)">x</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          <br><br>
          </table>
        </div>
      </div>
    </div>

    <!-- 작품 설명글 -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_description') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12 q-pb-lg">
        <q-editor
          v-model="mediaDescription"
          min-height="10rem"
          autofocus
          tabindex="5"
          @keyup.enter.stop
          toolbar-bg="grey-1"
          :toolbar="[
            ['left', 'center', 'right', 'justify'],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p','h1','h2','h3','h4','h5','h6','code']
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1','size-2','size-3','size-4','size-5','size-6','size-7']
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: ['default_font','arial','arial_black','comic_sans','courier_new','impact','lucida_grande','times_new_roman','verdana']
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
            ['undo', 'redo'],
            ['print', 'fullscreen'],
            ['viewsource']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
    </div>
    <br><br>
      
    <div style="display: flex; justify-content: space-between">
      <q-btn
        :label="$t('go_back')"
        @click="goBack"
        style="background-color: #90B2D8; color: white "
      />
      <q-btn
        :label="$t('save')"
        @click="register"
        style="background-color: #90B2D8; color: white "
      />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>
  </q-page>

  <!-- <WalletModal ref="refWalletModal" /> -->
  <LoginModal ref="refLoginModal" @callback-login="callbackLogin" />

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

</template>

<script>
import { defineComponent, reactive } from 'vue'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'RegisterMedia',
  data () {
    return {
      smallSize: false,
      confirmGoBack: false,
      projectSeq: '', // route parameter seq
      mediaOrderNumber: '0',
      mediaTitle: "It's YOURS ",
      mediaSubtitle: '',
      mediaPrice: '10.75',
      mediaCreatedAt: '2024',
      mediaHeight: '50',
      mediaWidth: '50',
      mediaUnit: 'cm',
      mediaUnitOption: [
        'cm',
        'inch',
        'px',
      ],
      mediaMaterials: 'digtal',
      mediaDescription: 'YOURS are PFPs (Profile Pictures) that resemble you, are exactly like you, and represent you.Discover a variety of YOURS that are generated entirely from hand drawings, one by one. 당신의 PFP(프로필 사진)는 당신을 닮고, 당신과 똑같으며, 당신을 대표하는 인물입니다.전적으로 손으로 그린 그림에서 생성된 다양한 그림을 하나씩 찾아보세요.',
      mediaForSale: true,
      mediaUrl: '',
      mediaThumnailUrl: '',
      // mediaUrl: 'https://beastar.io/images/platform.png',
      // mediaUrl: 'https://beastar.io/images/og_image.png',
      mediaType: 'IMAGE', // 파일 업로드시 fileUploadedMedia 함수에서 image or video로 자동 설정
      truncateTitle: 10,
      truncateDescription: 200,
      hashState: reactive({
        hashtag: '',
        hashArr: [],
      }),
    }
  },
  components: {
  },
  watch: {
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
    // 키 설정
    this.projectSeq = this.$route.query.seq

    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname)
      this.$store.dispatch('setUid', uid)
    }

    // 팀 지갑주소에 사용자 지갑주소 디폴트 설정
    // this.projectWalletAddress = this.getWalletAddress

    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
      if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }
  },
  mounted: function () {},
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
    // 미디어 URL 변경 이벤트 - mediaType 설정
    // q-uploader를 통해서 파일 업로드시에는 이 처리가 실행되지 않음
    mediaUrlChanged() {
      // console.log(this.mediaUrl)
      // alert(this.mediaUrl)
      const splitedUrl = this.mediaUrl.split('.')
      // for (let i = 0; i < splitedUrl.length; i++) {
      //   const obj = splitedUrl[i]
      //   console.log('i: ' + i + ' , obj: ' + obj)
      // }
      // console.log('value: ' + splitedUrl[splitedUrl.length-1])
      const file_extension = splitedUrl[splitedUrl.length-1]
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
      ) {
        this.mediaType = 'VIDEO'
      } else {
        this.mediaType = 'IMAGE'
      }
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
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text
      }
      return text.substring(0, maxLength) + '...'
    },
    onEnterKey() {
      const trimmedTag = this.hashState.hashtag.trim();
      if (trimmedTag && this.hashState.hashArr.length < 5) {
        this.hashState.hashArr.push(trimmedTag);
        this.hashState.hashtag = '';
      }
    },
    removeHashTag(index) {
      if (index >= 0 && index < this.hashState.hashArr.length) {
        this.hashState.hashArr.splice(index, 1);
      }
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
      if (!this.$refs.refMediaUrl.validate()) {
        result = false
      }
      if (!this.$refs.refMediaOrderNumber.validate()) {
        result = false
      }
      // if (!this.$refs.refMediaSubtitle.validate()) {
      //   result = false
      // }
      // if (!this.$refs.refMediaPrice.validate()) {
      //   result = false
      // }
      // if (!this.$refs.refMediaCreated.validate()) {
      //   result = false
      // }
      // if (!this.$refs.refMediaSize.validate()) {
      //   result = false
      // }
      // if (!this.$refs.refMediaMaterials.validate()) {
      //   result = false
      // }
      // if (!this.$refs.refMediaDescription.validate()) {
      //   result = false
      // }
      return result
    },
    // 등록 처리 시작
    register() {
      // 액션 로그 등록
      this.insertActionLog('100600101', 'save artwork', null)

      // Field validation check (작품등록 다 끝나고 풀기!!)
      // if(!this.validate()) {
      //     this.$noti(this.$q, this.$t('validation_failed'))
      //     return
      // }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
          this.$refs.refLoginModal.show()
          return
      }

      // 등록
      this.doRegister()
    },
    // 등록
    async doRegister() {
      // 1. 등록
      const params = {
        uid: this.getUid,
        type: this.mediaType,
        url: this.mediaUrl,
        thumbnail_url: this.thumbnailUrl,
        order_no: this.mediaOrderNumber,
        title: this.mediaTitle ? this.mediaTitle : 'Untitled',
        subtitle: this.mediaSubtitle,
        description: this.mediaDescription,
        sale_yn: this.mediaForSale ? 'Y':'N',
        price: this.mediaPrice,
        created_at: this.mediaCreatedAt,
        size: this.mediaWidth ? `${this.mediaWidth} x ${this.mediaHeight} ${this.mediaUnit}` : null,
        materials: this.mediaMaterials,
        tag_list: this.hashState.hashArr,
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/mymedia/insertMyMedia', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 페이지 이동
            this.$router.push('/media') // 나의 작품 리스트
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
    // 파일 업로드 필터
    filterFiles (files) {
      // const MAX_FILE_SIZE = 2 * 1024 * 1024
      const MAX_FILE_SIZE = 10 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('user_file_size_exceeded')) // 파일 최대 사이즈 : 10MB
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileUploadedMedia (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      let response = JSON.parse(file.xhr.responseText)
      let fileType = file.type
      let fileNameNew = response.fileUrl
      let thumbnailUrl = response.thumnailUrl
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)
      console.log('thumbnailUrl: ' + thumbnailUrl)
      // console.log(file)
      // console.log(file.files[0].type)
      // console.log(file.files[0].type.split('/')[0])

      // 미디어 타입 설정
      this.mediaType = file.files[0].type.split('/')[0] // image or video

      this.mediaUrl = fileNameNew // 작품 이미지 설정
      this.thumbnailUrl = thumbnailUrl
      // this.$refs.uploaderObj.reset()
    },
    goBack() {
      // this.$router.go(-1)
      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      // 페이지 이동
      this.$router.go(-1)
    },
  }
})
</script>

<style scoped>
.responsive-container {
  width: 100%;
}
@media (min-width: 600px) {
  .responsive-container {
    width: 600px;
  }
}
</style>
