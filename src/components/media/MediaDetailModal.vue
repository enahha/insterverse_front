<template>
  <q-dialog v-model="MediaDetailModal" persistent>
    <q-card class="media-detail-wrap" style="width: auto; max-width: 1000vw;">
    <div class="content row no-wrap items-start">
      <div class="image-container col-4">
        <!-- <div style="width: 600px; height: 600px;"> -->
          <img :src="myMediaVo.url" alt="Artwork" class="image">
      </div>
      <div class="details col-8 q-px-md">
        <q-btn icon="close" flat round dense @click="close" class="close-btn" />
        <q-card-section>
          <div class="title text-h6 q-mb-xs">{{ myMediaVo.title }}</div>
          <div class="subtitle text-subtitle1 text-grey">{{ myMediaVo.subtitle }}</div>
          <div class="info q-mt-md">
            <div class="size text-subtitle2">{{ myMediaVo.created_at }} &nbsp;&bull;&nbsp; {{ myMediaVo.size }} &nbsp;&bull;&nbsp; {{ myMediaVo.material }}</div>
          </div>
        </q-card-section>
        <div class="price-action q-mt-md">
          <div class="price text-h6">{{ myMediaVo.price }}</div>
          <q-btn color="primary" label="구매하기" @click="buy" />
        </div>
        <div class="info q-mt-md">
            <div class="description text-subtitle1 q-mt-sm">{{ myMediaVo.description }}</div>
          </div>
      </div>
    </div>
  </q-card>
  </q-dialog>
</template>

<script>
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { Connection, PublicKey } from "@solana/web3.js";

export default {
  data () {
    return {
      MediaDetailModal: false,
      // exhibitionTypeList: [],
      myMediaVo: 
        {
          seq: '',
          type: '',
          url: '',
          title: '',
          subtitle: '',
          price: '',
          created_at: '',
          size: '',
          material: '',
          description: ''
        },
      
    }
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
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    qDate() {
      return date
    },
  },
  created: function () {
    // 키 설정
    // this.uid = this.$route.query.seq

    // user_profile_image preview reg_name
    // this.reg_name = this.getUid.split('@')[0]

    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname)
      this.$store.dispatch('setUid', uid)
    }
  },
  methods: {
    async show() {
      this.MediaDetailModal = true
      console.log("++++++++++++++++++++++++++++++")
      console.log(this.myMediaVo.seq)
      this.selectMedia()
    },
    close() {
      this.MediaDetailModal = false
    },
    async apply(seq) {
      this.$emit('callback-memetoonAccount', this.memetoonAccount)
      thiw.close()
    },
    async validate() {
      let result = true

      if (!this.memetoonAccount.id) {
        result = false
        this.$noti(this.$q, 'ID required')
      }
      
      if (!this.memetoonAccount.pwd) {
        result = false
        this.$noti(this.$q, 'Password required')
      }

      return result;
    },
    selectMedia() {
      const param = {
        uid: this.getUid,
        seq: this.myMediaVo.seq,
      }

      // 공지사항 조회
      this.$axios.get('/api/myMedia/selectMyMedia', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)

            // 데이터 설정
            this.myMediaVo = result.data
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
  