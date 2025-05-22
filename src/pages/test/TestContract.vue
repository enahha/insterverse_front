<template>
    <q-page class="justify justify-center">
      <!-- <div style="background-color: black;"> -->
      <div class="" style="">
        <!-- <div class="row">
          <div class="text-h5 text-bold">
            Overview
          </div>
        </div> -->
        <!-- <div class="row" style="background-image: url(images/star1.jpg); height: 40rem;"> -->
        <div class="row">
          TEST IPFS 페이지1
        </div>
  
  
  
        <div style="text-align: center; width: 100%;">
          <q-btn style="background: goldenrod; color: black; width: 250px;" size="lg" @click="updateProjectStatusCd" rounded>
            contract test
          </q-btn>
        </div>
        <br />
        <br />
      </div>
    </q-page>
  
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  // import Caver from 'caver-js'
  
  export default defineComponent({
    name: 'PageIndex',
    data () {
      return {
        filterType: 'now', // 랭킹타입 now, total1
        msgBox: false,
        mainnet: 'KLAYTN',
        projectSeq: '1'
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
        // 키 설정
        this.projectSeq = this.$route.query.seq

        const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
        const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
        if (nickname && uid) {
        this.$store.dispatch('setNickname', nickname)
        this.$store.dispatch('setUid', uid)
        }
    },
    mounted: function () {
    },
    methods: {
      async updateProjectStatusCd() {
        // 1. 프로젝트 수정 처리
        const params = {
            uid: this.getUid,
            seq: this.projectSeq,
            status_cd: '55',      // 정보 등록 완료(결제 완료)
        }
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.post('/api/project/updateProjectStatusCd', params)
        .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩 표시 종료
            if (result.data && result.data.resultCd === 'SUCCESS') {
                // console.log(result.data)
                this.$noti(this.$q, this.$t('modify_success'))

                this.mintKlaytnNft()

                // 페이지 이동 --> 마이페이지?
                this.$router.push('/mypage')
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
      async mintKlaytnNft() {
            this.$axios.get('/api/project/mintKlaytnNft', {params: {seq: this.projectSeq}})
            // .then((result) => {

            // })
      }
    }
  })
  </script>
  