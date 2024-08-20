<template>
  <q-dialog v-model="MediaDetailModal" :maximized="maximized">
    <div class="flex flex-center bg-white" style="max-width: 1200px; word-break: break-all;">

      <div class="row">

        <q-toolbar class="bg-white">
          <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
        
        <!-- 반응형 div 1-->
        <div class="bg-white q-pl-lg q-pr-lg q-pb-lg" style="max-width: 600px; word-break: break-all;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <!-- 작품 보기 -->
                <video v-if="myMediaVo.type == 'VIDEO'" :src="myMediaVo.url" controls autoplay loop muted style="width: 100%;"></video>
                <img v-else :src="myMediaVo.url" class="responsive-container" />
              </td>
            </tr>
          </table>
        </div>

        <!-- 반응형 div 2 -->
        <div class="bg-white q-pl-lg q-pr-lg q-pb-lg responsive-container" style="max-width: 600px; word-break: break-all;">
          <!-- 작품 항목 -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td colspan="2">
                <div class="text-h5 q-mb-xs">{{ myMediaVo.title }}</div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="text-h6 text-grey">{{ myMediaVo.subtitle }}</div>
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td width="100" align="center">
                <div v-if="myMediaVo.sale_yn == 'Y'" class="text-subtitle1">$ {{ Number(myMediaVo.price).toLocaleString() }}</div>
                <div v-else class="text-subtitle1">N/A</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="q-mt-md q-mb-sm">
                  <div class="text-subtitle2">{{ myMediaVo.created_at }} &nbsp;&bull;&nbsp; {{ myMediaVo.size }} &nbsp;&bull;&nbsp; {{ myMediaVo.materials }}</div>
                </div>
              </td>
              <td align="center">
                <q-btn 
                  :label="$t('buy')" 
                  @click="openUrl(myMediaVo.nft_market_url)" 
                  :style="{
                    'background-color': myMediaVo.sale_yn == 'N' ? '#cdd3d6' : '#90B2D8', 
                    'color': 'white', 
                    'width': '100%'
                  }"
                  :disabled="myMediaVo.sale_yn == 'N'"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <!-- <div class="q-mt-sm q-pr-sm q-pl-sm q-pb-sm" style="border: 1px solid; height: 28vh; overflow-y: auto;" v-html="myMediaVo.description" /> -->
                <div class="q-mt-sm q-pr-sm q-pl-sm q-pb-sm" style="height: 28vh; overflow-y: auto;" v-html="myMediaVo.description" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  </q-dialog>
</template>

<script>
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { Connection, PublicKey } from "@solana/web3.js";

export default {
  data () {
    return {
      MediaDetailModal: false,
      maximized: false,
      // exhibitionTypeList: [],
      myMediaVo: {
        url: '',
        title: '',
        subtitle: '',
        type: '',
        sale_yn: '',
        price: '',
        created_at: '',
        size: '',
        materials: '',
        description: '',
        nft_market_url: '',
      },
    }
  },
  methods: {
    async show() {
      console.log(this.$q.platform.is)
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
        // 디바이스가 모바일인 경우
        this.maximized = true
      } else {
        // 디바이스가 데스크탑인 경우
        this.maximized = false
      }
      this.MediaDetailModal = true
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
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {

      // 테스트
      url = 'https://opensea.io/kr/assets/klaytn/0x4e3f3a3dba12cec714cba0508a1bab8ead85af31/37706'
      window.open(url, '_system')

      // }
    },
  }
}
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
