<template>

    <q-dialog v-model="CollectionRequestInfoModal" :maximized="maximized" transition-show="slide-up" transition-hide="slide-down">
  
      <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%;">
        <q-header class="bg-white" elevated>
          <q-toolbar>
            <!-- <q-icon name="notifications_active" color="primary" size="sm" /> -->
            <q-toolbar-title class="text-body2 text-black">
              <span class="text-weight-bold text-subtitle1">Detail</span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
          </q-toolbar>
        </q-header>
        <br />
  
        <q-card style="word-break: break-word;" class="q-pt-md">
            <q-card-section>
                <div class="row justify-center q-pl-xs q-pt-md">
                <div class="col-12">
                    <span class="text-weight-bold text-subtitle1">Project info</span>
                </div>
                </div>
                <div class="row q-pt-lg q-pl-xs">
                    <q-item>
                        <q-item-section>
                        <div class="row">
                            <!-- <q-item-label class="col-12"><div class="end"><q-icon name="delete_forever" size="sm" @click="delete(item.seq)"/></div></q-item-label> -->
                            <q-item-label class="col-12"><span class=" text-weight-bold">seq : </span>{{ projectVo.seq }}</q-item-label>
                            <q-item-label class="col-12"><span class=" text-weight-bold">title : </span>{{ projectVo.title }}</q-item-label>
                            <q-item-label class="col-12"><span class=" text-weight-bold">subtitle : </span>{{ projectVo.subtitle }}</q-item-label>
                            <q-item-label class="col-12"><span class=" text-weight-bold">collection address : </span>{{ projectVo.contract_address }}</q-item-label>
                            <q-item-label class="col-12"><span class=" text-weight-bold">email : </span>{{ projectVo.email }}</q-item-label>
                        </div>
                        </q-item-section>
                    </q-item>
                </div>
            </q-card-section>
            <q-card-section>
                <span class="text-weight-bold text-subtitle1">Nft info</span>
                <div class="row" v-for="item in mediaList" :key="item.seq" style="cursor: pointer;z-index: 1;">
                    <q-item>
                        <q-item-section>
                            <q-item-label class="col-12" v-if="item.type == 'video'"><video :src="item.url" controls autoplay loop muted style="width: 100%; max-width: 100px;"></video></q-item-label>
                            <q-item-label class="col-12" v-else><q-img :src="item.url" style="width: 100px;" /></q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                        <div class="row">
                            <q-item-label class="col-12"><span class=" text-weight-bold">Nft title : </span>{{ item.title }}</q-item-label>
                            <q-item-label class="col-12"><span class=" text-weight-bold">Nft id : </span>{{ item.nft_id }}</q-item-label>
                            <q-item-label class="col-12"><span class=" text-weight-bold">Nft price : </span>{{ item.price }}</q-item-label>
                        </div>
                        </q-item-section>
                    </q-item>
                    <hr> <!-- 구분선 -->
                </div>
            </q-card-section>
            <q-card-section>
                <div class="col-12">
                    <q-input v-model="projectVo.collection_url" hide-bottom-space placeholder="Collection Url" outlined style="height: 56px;" />
                </div>
                <!-- <div class="col-12">
                    <q-input v-model="mediaUrlPrefix" hide-bottom-space placeholder="Media Url Prefix" outlined style="height: 56px;" />
                </div> -->
                <q-btn text-color="black" style="background-color: #fefefe; width: 100%; height: 56px; min-width: 30px;" @click="Modify()">
                    <table border="0" width="100%" align="center">
                    <tr>
                        <td>
                        <b>{{ $t('modify') }}</b>
                        </td>
                    </tr>
                    </table>
                </q-btn>
            </q-card-section>
          <br />
        </q-card>
      </q-layout>
    </q-dialog>
  
    <IframeModal ref="refIframeModal" />  
  </template>
  
  <script>
  // import { Cookies } from 'quasar'
  import { sha512 } from 'js-sha512'
  // import { KakaoCordovaSDK } from 'kakao-sdk'
  
  export default {
    // name: 'mystore',
    data () {
      return {
        CollectionRequestInfoModal: false,
        maximized: false,
        seq: 0,
        mediaUrlPrefix: '',
        saleYn: 'Y',
        mediaList: [],

        projectVo: {
            seq: 0,
            title: '',
            subtitle: '',
            status_cd: '',
            banner_url: '',
            postar_url: '',
            description: '',
            contract_address: '',
            collection_url: '',
            artist_details: '',
            email: '',
            instargram: '',
            twitter: '',
            discord: '',
            telegram: '',
            summary: '',
            nickname: '',
            reg_id: '',
        },
      }
    },
    watch: {
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

            this.CollectionRequestInfoModal = true
            this.selectProject()
            this.selectMediaList()
        },
        selectProject() {
            const param = {
                uid: '1',
                seq: this.projectVo.seq,
            }
            this.$axios.get('/api/project/selectProject', { params: { ...param }})
                .then((result) => {
                // console.log(JSON.stringify(result.data))
                if (result.data) {
                    // console.log(result.data)
                    this.projectVo = result.data

                    // if (this.projectVo.mainnet === 'KLAYTN') {
                    //   this.symbol = 'KLAY'
                    // } else if (this.projectVo.mainnet === 'ETHEREUM') {
                    //   this.symbol = 'ETH'
                    // } else {
                    //   // TODO: 체인 확장시 대응 필요
                    //   this.symbol = 'KLAY'
                    // }

                    // platform contract balance 조회
                    // this.selectPlatformContractBalance()
                } else {
                    this.$noti(this.$q, this.$t('request_data_failed'))
                }
                })
                .catch((err) => {
                console.log(err)
                })
        },
        // 미디어 가격 내역 조회
        selectMediaList() {
            const param = {
                uid: '1',
                projectSeq: this.projectVo.seq,
                saleYn: this.saleYn
            }
            this.$axios.get('/api/media/selectMediaListByProjectSeq', { params: { ...param }})
                .then((result) => {
                // console.log(JSON.stringify(result.data))
                if (result.data) {
                    // console.log(result.data)
                    this.mediaList = result.data

                    // if (this.projectVo.mainnet === 'KLAYTN') {
                    //   this.symbol = 'KLAY'
                    // } else if (this.projectVo.mainnet === 'ETHEREUM') {
                    //   this.symbol = 'ETH'
                    // } else {
                    //   // TODO: 체인 확장시 대응 필요
                    //   this.symbol = 'KLAY'
                    // }

                    // platform contract balance 조회
                    // this.selectPlatformContractBalance()
                } else {
                    this.$noti(this.$q, this.$t('request_data_failed'))
                }
                })
                .catch((err) => {
                console.log(err)
                })
        },
        async Modify() {
            const params = {
                // uid: this.getUid,
                seq: this.projectVo.seq,
                collection_url: this.projectVo.collection_url,
                status_cd: this.$PROJECT_STATUS_CD_CONFIRMED,      // 컬렉션 등록 완료(50)
            }
            this.$q.loading.show() // 로딩 표시 시작
            this.$axios.post('/api/project/updateProjectCollectionUrl', params)
                .then((result) => {
                // console.log(JSON.stringify(result.data))
                this.$q.loading.hide() // 로딩 표시 종료
                if (result.data && result.data.resultCd === 'SUCCESS') {
                    // console.log(result.data)
                    this.$noti(this.$q, this.$t('modify_success'))
                    this.$emit('callback-modify')
                    this.close()

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
        clearField() {
            // 필드 초기화
            this.collectionUrl = ''
            this.mediaUrlPrefix = ''
        },

        close () {
            this.clearField()
            this.CollectionRequestInfoModal = false
        }
    }
  }
  </script>
  
  <style scoped>
  .space{
    padding: 10px;
  }
  </style>