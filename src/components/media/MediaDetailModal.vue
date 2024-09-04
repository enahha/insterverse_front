<template>
  <q-dialog v-model="MediaDetailModal" :maximized="maximized">
    <div class="flex flex-center bg-white media-detail-wrap" style="max-width: 1600px; word-break: break-all;">

      <div class="media-row">

        <q-toolbar v-if="smallSize" class="bg-white">
          <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
        
        <!-- 반응형 div 1-->
        <div v-if="smallSize" class="bg-white q-pl-lg q-pr-lg q-pb-lg q-mt-sm" style="max-width: 600px; word-break: break-all;">
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
        <div v-if="!smallSize" class="media-wrapper">
          <!-- <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
            <tr>
              <td> -->
                <video v-if="myMediaVo.type == 'VIDEO'" :src="myMediaVo.url" controls autoplay loop muted class="responsive-media"></video>
                <img v-else :src="myMediaVo.url" class="responsive-media" />
              <!-- </td>
            </tr>
          </table> -->
        </div>

        <!-- 반응형 div 2 -->
        <div class="bg-white q-pl-lg q-pr-lg q-pb-lg responsive-container" style="word-break: break-all;">
          <!-- 작품 항목 -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr  v-if="!smallSize">
              <td colspan="2">
                <div class="text-h5 q-mb-xs close-btn"><q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" /></div>
              </td>
            </tr>
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
                <div class="q-mt-md q-mb-sm">
                  <div class="text-subtitle2" style="font-size: small;">
                    <span v-if="myMediaVo.created_at">{{ myMediaVo.created_at }} <br/></span>
                    <span v-if="myMediaVo.size">{{ myMediaVo.size }} <br/></span>
                    <span v-if="myMediaVo.materials">{{ myMediaVo.materials }}</span>
                  </div>
                </div>
              </td>

            </tr>
            <tr>
              <td>
          
              </td>
              <td align="center"  class="q-pb-lg">
                <div v-if="myMediaVo.sale_yn == 'Y'" class="text-subtitle1">$ {{ Number(myMediaVo.price).toLocaleString() }}</div>
                <div v-else class="text-subtitle1">N/A</div>
                <!-- :label="'$' + Number(myMediaVo.price).toLocaleString() + '&nbsp;&nbsp;&nbsp;' + $t('buy')"  -->
                <!-- :label="$t('buy')"  -->
                <q-btn 
                  :label="$t('buy')" 
                  @click="openUrl(myMediaVo.nft_market_url)" 
                  :style="{
                    'background-color': myMediaVo.sale_yn == 'N' ? '#cdd3d6' : '#90B2D8', 
                    'color': 'white', 
                    'width': '100%',
                  }"
                  :disabled="myMediaVo.sale_yn == 'N'"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <!-- <div class="q-mt-sm q-pr-sm q-pl-sm q-pb-sm" style="border: 1px solid; height: 28vh; overflow-y: auto;" v-html="myMediaVo.description" /> -->
                <div class="q-mt-sm q-pr-sm q-pl-sm q-pb-sm my-scrollbar" style="height: 30vh; overflow-y: auto;" v-html="myMediaVo.description" />
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
      smallSize: false,
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
  created: function () {
    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
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
    resizeEventHandler() {
      // console.log('resizeEventHandler')
      // console.log(document.body.offsetWidth)
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
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
.media-row {
  display: flex;
  flex-wrap: nowrap;
}
.responsive-container {
  width: 100%;
  max-width: 300px; 
}
.my-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #ffffff #f1f1f1;
}
/* Webkit 기반 브라우저 (Chrome, Safari) */
.my-scrollbar::-webkit-scrollbar {
    width: 8px;
}
/* IE 및 Edge (레거시) */
.my-scrollbar {
    -ms-overflow-style: -ms-autohiding-scrollbar;
}
.media-wrapper {
  width: 800px;
  height: 800px;
  background-color: #f6f6f6;
  padding: 16px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.responsive-media {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
@media (max-width: 1023px) {
  .media-row {
    display: flex;
    flex-wrap: wrap;
  }
  .responsive-container {
    max-width: 600px; 
  }
}
</style>
