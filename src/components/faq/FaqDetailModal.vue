<template>

    <q-dialog v-model="FaqDetailModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">
  
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
        <q-header class="bg-white" elevated>
          <q-toolbar>
            <q-icon name="notifications_active" color="primary" size="sm" />
            <q-toolbar-title class="text-body2 text-black">
              <span v-if="locale === 'ko-KR'" class="text-weight-bold text-subtitle1">{{ faqVo.title_ko }}</span>
              <span v-else class="text-weight-bold text-subtitle1">{{ faqVo.title }}</span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
          </q-toolbar>
        </q-header>
        <br />
  
        <q-card style="word-break: break-word;" class="q-pt-md">
          <q-card-section>
            <div class="row justify-center q-pl-xs q-pt-md">
              <div class="col-12">
                {{ qDate.formatDate(faqVo.reg_time, 'YYYY-MM-DD HH:mm') }}
              </div>
            </div>
            <div class="row justify-center q-pt-lg q-pl-xs">
              <div v-if="locale === 'ko-KR'" class="col-12" v-html="faqVo.contents_ko"></div>
              <div v-else class="col-12" v-html="faqVo.contents"></div>
            </div>
  
            <div v-if="isAdmin">
              <div class="row justify-center q-pt-lg">
                <div class="col-6 text-left">
                  <q-btn class="btn btn-blk" color="primary" text-color="black" size="lg" style="width: 98%;" @click="deleteFaq" tabindex="2">
                    <b>{{ $t('delete') }}</b>
                  </q-btn>
                </div>
                <div class="col-6 text-right">
                  <q-btn class="btn btn-bdr-blk" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="goModify" tabindex="1">
                    <b>{{ $t('modify') }}</b>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
          <br />
        </q-card>
      </q-layout>
    </q-dialog>
  
    <IframeModal ref="refIframeModal" />
  
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="row items-center" style="min-width: 200px;">
          <q-icon name="warning" color="primary" size="md" />
          <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="around">
          <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
          <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteFaq" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
  </template>
  
  <script>
  import { useI18n } from 'vue-i18n'
  import { date } from 'quasar'
  
  export default {
    name: 'FaqDetailModal',
    data () {
      return {
        FaqDetailModal: false,
        maximized: false,
        // seq: '',
        faqVo: {
          seq: '',
          title: '',
          title_ko: '',
          contents: '',
          contents_ko: '',
          reg_time: '',
        },
        confirmDelete: false, // 삭제 확인창
      }
    },
    setup () {
      const { locale } = useI18n({ useScope: 'global' })
  
      return {
        locale,
      }
    },
    computed: {
      getUid () {
        return this.$store.getters.getUid
      },
      isAdmin () {
        return this.$store.getters.getAdcd === this.$adminCode
      },
      qDate() {
        return date
      },
    },
    methods: {
      async show () {
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 디바이스가 모바일인 경우
          this.maximized = true
        } else {
          // 디바이스가 데스크탑인 경우
          this.maximized = false
        }
        this.FaqDetailModal = true
  
        // 공지사항 조회
        this.selectFaq()
      },
      // 공지사항 조회
      selectFaq() {
        const param = {
          uid: this.getUid,
          seq: this.seq,
        }
  
        // 공지사항 조회
        this.$axios.get('/api/faq/selectFaq', { params: { ...param }})
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (result.data) {
              // console.log(result.data)
  
              // 데이터 설정
              this.faqVo = result.data
            } else {
              this.$noti(this.$q, this.$t('request_data_failed'))
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      goModify() {
        this.$router.push({ path: '/faq/modify', query: { seq: this.faqVo.seq }})
      },
      deleteFaq() {
        // 삭제 확인창 표시
        this.confirmDelete = true
      },
      doDeleteFaq() {
        this.$q.loading.show() // 로딩 표시 시작
  
        // 공지사항 삭제 처리
        const param = {
          uid: this.getUid,
          seq: this.seq,
        }
        this.$axios.post('/api/faq/deleteFaq', param)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩 표시 종료
            if (result.data && result.data.resultCd === 'SUCCESS') {
              this.$noti(this.$q, this.$t('delete_faq_success'))
  
              this.$emit('callback-detail') // 리스트 화면 새로고침
            } else {
              this.$noti(this.$q, this.$t('delete_faq_failed'))
            }
  
            // 2. 페이지 이동 - 문의하기 리스트 화면
            this.$router.push('/contact')
            this.close()
          })
          .catch((err) => {
            this.$q.loading.hide() // 로딩 표시 종료
            console.log(err)
            this.$noti(this.$q, err)
          })
      },
      close () {
        this.FaqDetailModal = false
      }
    }
  }
  </script>
  