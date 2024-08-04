<template>
  <q-page class="page-1200 q-pa-md q-pa-md">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec">{{ $t('add_artwork') }}</div>
      </div>
    </div>

    <br><br><br><br>

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
              <td v-if="smallSize" align="center" style="height: 300px; background-color: #f3f3f3;">
                <!-- 작품 미리보기 -->
                <div class="row justify-center">
                  <div v-if="mediaUrl" class="col-12 priview" style="width: 100%; min-width: 300px;">
                    <img :src="mediaUrl" style="width: 100%;">
                  </div>
                  <div v-else class="col-12" style="width: 100%; min-width: 300px;">
                    <span>{{ $t('no_image') }}</span>
                  </div>
                </div>
              </td>
              <td v-else align="center" style="height: 40vh; background-color: #f3f3f3;">
                <!-- 작품 미리보기 -->
                <div class="row justify-center">
                  <div v-if="mediaUrl" class="col-12 priview" style="width: 100%; min-width: 300px;">
                    <img :src="mediaUrl" style="width: 100%;">
                  </div>
                  <div v-else class="col-12" style="width: 100%; min-width: 300px;">
                    <span>{{ $t('no_image') }}</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- 반응형 div 2 -->
        <div>
          <!-- 작품 항목 -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <!-- 작품 업로드 -->
                <div class="row">
                  <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('media_image') }}<span class="text-red"> *</span></span>
                  <span class="text-grey">
                    &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="col-12">
                  <q-uploader
                    field-name="file"
                    ref="uploaderObj"
                    url="/api/common/uploadImage"
                    hide-upload-btn
                    color="grey-3"
                    text-color="black"
                    :multiple="false"
                    accept="image/*"
                    :filter="filterFiles"
                    max-files="1"
                    :auto-upload="true"
                    style="width: 100%;"
                    tabindex="9"
                    @uploaded="fileUploadedMedia"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-pt-lg">
                  <q-input v-model="mediaOrderNumber" :label="$t('media_order_number')" ref="mediaOrderNumber" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-pt-lg">
                  <q-input v-model="mediaTitle" :label="$t('media_title')" ref="mediaTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-pt-lg">
                  <q-input v-model="mediaSubtitle" :label="$t('media_subtitle')" ref="mediaSubtitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-pt-lg row">
                  <q-checkbox
                    left-label
                    v-model="forSale"
                    :label = "$t('media_sale')"
                    checked-icon="task_alt"
                    unchecked-icon="highlight_off"
                  />
                  <q-input v-model="mediaPrice" :disabled="!forSale" :label="$t('media_price')" ref="mediaPrice" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" style="width: 200px;"/>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-pt-lg row">
                  <q-input class="q-mb-xs q-mr-xs" style="width: 200px;" v-model="mediaCreated" :label="$t('media_created')" ref="mediaCreated" clearable outlined tabindex="1" />
                  <q-input class="q-mb-xs q-mr-xs" style="width: 200px;" v-model="mediaSize" :label="$t('media_size')" ref="mediaSize" clearable outlined tabindex="1" />
                  <q-input class="q-mb-xs" style="width: 200px;" v-model="mediaMaterials" :label="$t('media_materials')" ref="mediaMaterials" clearable outlined tabindex="1" />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <br><br><br>

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
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
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
        @click="goTabBack"
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

  <WalletModal ref="refWalletModal" />

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
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'RegisterProject',
  data () {
    return {
      smallSize: false,
      projectSeq: '', // route parameter seq
      mediaOrderNumber: '1',
      mediaTitle: 'room',
      mediaSubtitle: 'black and white',
      mediaPrice: '1122',
      mediaCreated: '2019/09/09',
      mediaSize: '500*500',
      mediaMaterials: 'digtal',
      mediaDescription: 'happy room',
      forSale: true,
      mediaUrl: '',
      // mediaUrl: 'https://beastar.io/images/platform.png',
      // mediaUrl: 'https://beastar.io/images/og_image.png',
      mediaType: 'image',
      truncateTitle: 10,
      truncateDescription: 200,
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
      if (!this.$refs.mediaOrderNumber.validate()) {
        result = false
      }
      if (!this.$refs.mediaTitle.validate()) {
        result = false
      }
      if (!this.$refs.mediaSubtitle.validate()) {
        result = false
      }
      if (!this.$refs.mediaPrice.validate()) {
        result = false
      }
      if (!this.$refs.mediaCreated.validate()) {
        result = false
      }
      if (!this.$refs.mediaSize.validate()) {
        result = false
      }
      if (!this.$refs.mediaMaterials.validate()) {
        result = false
      }
      if (!this.$refs.mediaDescription.validate()) {
        result = false
      }
      return result
    },
    // 등록 처리 시작
    async register() {
      // Field validation check
      // if(!this.validate()) {
      //     this.$noti(this.$q, this.$t('validation_failed'))
      //     return
      // }

      // 로그인 여부 체크, 로그인 모달 표시
      // if (!this.getUid) {
      //     this.$refs.refWalletModal.show()
      //     return
      // }

      // check mainnet
      // if (this.mainnetObj.value !== 'KLAYTN') {
      // this.$noti(this.$q, this.$t('unsupported_mainnet'))
      // return
      // }

      // 등록
      this.doRegister()
    },
    // 등록
    async doRegister() {
      // 1. 등록
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        projectSeq: this.projectSeq,
        type: this.mediaType,
        url: this.mediaUrl,
        order_no: this.mediaOrderNumber,
        title: this.mediaTitle,
        subtitle: this.mediaSubtitle,
        description: this.mediaDescription,
        sale_yn: this.forSale? 'Y':'N',
        price: this.mediaPrice,
        size: this.mediaSize,
        materials: this.mediaMaterials,
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/media/insertMedia', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 페이지 이동
            // 나의 프로젝트 리스트 화면
            this.$router.push({ path: '/project/registerProject', query: { seq: this.projectSeq, tab: 3 }})

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
    // 파일 업로드 필터
    filterFiles (files) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileUploadedMedia (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.mediaUrl = fileNameNew // 작품 이미지 설정
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
