<template>
  <q-page class="q-pa-md page-default vote-reg-wrap">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_vote_register') }}
      </div>
    </div>
    <div class="row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_vote_register_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('vote_title') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="voteTitle" ref="voteTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('vote_title') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="voteTitleKo" ref="voteTitleKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="2" />
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('vote_description') }} (English)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
        <q-editor
          v-model="voteDescription"
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
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('vote_description') }} (Korean)</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="voteDescriptionKo"
          min-height="10rem"
          autofocus
          tabindex="6"
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

    <div class="row justify-center q-pb-md">
      <div class="col-12">
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('vote_main_image') }}</span>
        <span class="text-grey">
          &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
        </span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
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
          tabindex="9"
          @uploaded="fileUploaded"
        />
      </div>
    </div>

    <!-- preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('preview') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-card class="my-card">
          <q-item>
            <q-item-section>
              <img v-if="voteMainImage" :src="voteMainImage" style="width: 100%;">
              <q-icon v-else name="image" size="md" />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <!-- Withdrawal Request Amount -->
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('vote_withdrawal_request_amount') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="voteRequestAmount" ref="voteRequestAmount" type="number" :rules="[required, val => maxLength(val, 100)]" clearable standout tabindex="10" placeholder="e.g. 10000" />
      </div>
    </div>

    <!-- start_time -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('start_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('start_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="voteStartTime" ref="voteStartTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="7">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="voteStartTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="voteStartTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- end_time -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('end_time') }}<span class="text-red"> *</span></span>
        <span class="text-grey">&nbsp;&nbsp; {{ $t('end_time_hint') }}</span>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div class="" style="max-width: 250px">
          <q-input v-model="voteEndTime" ref="voteEndTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="8">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="voteEndTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="voteEndTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>


    <div class="row justify-center q-pt-md">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="19">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="register" tabindex="18">
          <b>{{ $t('save_description') }}</b>
        </q-btn>
      </div>
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
  name: 'RegisterVote',
  data () {
    return {
      projectSeq: '', // route parameter seq
      projectMainnet: '',
      projectType: '',
      projectTitle: '',
      projectTitleKo: '',
      projectWalletAddress: '',
      projectTokenContractAddress: '',
      projectPlatformContractAddress: '',
      voteSeq: '',
      voteTitle: '',
      voteTitleKo: '',
      voteDescription: '',
      voteDescriptionKo: '',
      voteMainImage: '',
      voteRequestAmount: '',
      voteStartTime: '',
      voteEndTime: '',
      // seqFileMst: '' // 파일 마스터 SEQ
      confirmGoBack: false, // goBack 확인창
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {
    // 프로젝트 키 설정
    this.projectSeq = this.$route.query.seq
    // 프로젝트 정보 조회
    this.selectProject()
  },
  mounted: function () {},
  methods: {
    // 프로젝트 조회
    selectProject() {
      const param = {
        uid: this.getUid,
        seq: this.projectSeq,
      }
      this.$axios.get('/api/project/selectProject', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)
            this.projectMainnet = result.data.mainnet
            this.projectType = result.data.type
            this.projectTitle = result.data.title
            this.projectTitleKo = result.data.title_ko
            // this.projectSummary = result.data.summary
            // this.projectSummaryKo = result.data.summary_ko
            // this.projectDescription = result.data.description
            // this.projectDescriptionKo = result.data.description_ko
            // this.projectOfficialWebsite = result.data.official_website
            // this.projectOfficialEmail = result.data.official_email
            // this.projectLogoImage = result.data.logo_image
            // this.projectDocs = result.data.docs
            // this.projectBlog = result.data.blog
            // this.projectMedium = result.data.medium
            // this.projectTelegram = result.data.telegram
            // this.projectTwitter = result.data.twitter
            // this.projectGithub = result.data.github
            // this.projectMeta = result.data.meta
            // this.projectDiscord = result.data.discord
            this.projectWalletAddress = result.data.wallet_address
            this.projectTokenContractAddress = result.data.token_contract_address
            this.projectPlatformContractAddress = result.data.platform_contract_address
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
      if (!this.$refs.voteTitle.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_vote_title'))
        result = false
      }
      if (!this.$refs.voteTitleKo.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_vote_title_ko'))
        result = false
      }
      if (!this.voteDescription) {
        this.$noti(this.$q, this.$t('validation_failed_vote_description'))
        result = false
      }
      if (!this.voteDescriptionKo) {
        this.$noti(this.$q, this.$t('validation_failed_vote_description_ko'))
        result = false
      }
      console.log(this.voteDescription.length)
      if (this.voteDescription.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_vote_description_length'))
        result = false
      }
      if (this.voteDescriptionKo.length > 21800) {
        this.$noti(this.$q, this.$t('validation_failed_vote_description_ko_length'))
        result = false
      }
      if (!this.$refs.voteRequestAmount.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_vote_withdrawal_request_amount'))
        result = false
      }
      if (!this.$refs.voteStartTime.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_vote_start_time'))
        result = false
      }
      if (!this.$refs.voteEndTime.validate()) {
        this.$noti(this.$q, this.$t('validation_failed_vote_end_time'))
        result = false
      }
      return result
    },
    // 등록 처리 시작
    async register() {
      // Field validation check
      if(!this.validate()) {
        // this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
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
        seq: this.voteSeq,
        project_seq: this.projectSeq,
        project_mainnet: this.projectMainnet,
        project_type: this.projectType,
        project_title: this.projectTitle,
        project_title_ko: this.projectTitleKo,
        project_wallet_address: this.projectWalletAddress,
        project_token_contract_address: this.projectTokenContractAddress,
        project_platform_contract_address: this.projectPlatformContractAddress,
        title: this.voteTitle,
        title_ko: this.voteTitleKo,
        description: this.voteDescription,
        description_ko: this.voteDescriptionKo,
        main_image: this.voteMainImage,
        request_amount: this.voteRequestAmount,
        start_time: this.voteStartTime,
        end_time: this.voteEndTime,
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/vote/insertVote', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 페이지 이동
            // 나의 투표 리스트 화면
            this.$router.push('/vote/myVoteList')
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
    // fileAdded (files) {
    //   // this.$refs.uploaderObj.reset()
    //   this.$refs.uploaderObj.removeUploadedFiles()
    //   this.$refs.uploaderObj.upload()
    // },
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.voteMainImage = fileNameNew // 투표 로고 URL 설정
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
      // if (this.$route.query.fromAdmin === 'Y') {
      //   // 나의 투표 리스트 화면 - admin
      //   this.$router.push('/admin/adminMyList')
      // } else {
      //   // 나의 투표 리스트 화면
      //   this.$router.push('/vote/voteList')
      // }
    }
  }
})
</script>

<style scoped>
</style>
