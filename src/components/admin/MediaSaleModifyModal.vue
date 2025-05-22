<template>
    <q-dialog v-model="MediaSaleModifyModal" persistent>
      <q-card style="width: 100%;">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
  
        <table border="0" width="75%" align="center">
          <tr>
            <td colspan="3" class="space">
              <div class="row justify-center">
              <div class="col-12">
                  <span class="text-weight-bold text-subtitle1">{{ $t('market') }}</span>
              </div>
              </div>
              <div class="row justify-center q-pb-md">
              <div class="col-12">
                  <q-select
                      v-model="mediaSaleVo.market_name"
                      :options="marketOption"
                      option-label="label"
                      option-value="value"
                      :label="$t('Market')"
                      dense
                  />
              </div>
          </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <div class="col-12">
                  <span class="text-weight-bold text-subtitle1">Contract address</span>
              </div>
              <div class="col-12">
                <q-input v-model="mediaSaleVo.contract_address" hide-bottom-space placeholder="Contract address" style="height: 56px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <div class="col-12">
                  <span class="text-weight-bold text-subtitle1">NFT ID</span>
              </div>
              <div class="col-12">
                <q-input v-model="mediaSaleVo.nft_id" hide-bottom-space placeholder="NFT ID" style="height: 56px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <div class="col-12">
                  <span class="text-weight-bold text-subtitle1">Sale price</span>
              </div>
              <div class="col-12">
                <q-input v-model="mediaSaleVo.sale_price" hide-bottom-space placeholder="Sale price" style="height: 56px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <div class="row justify-center">
                <div class="col-12">
                    <span class="text-weight-bold text-subtitle1">{{ $t('payment_currency') }}</span>
                </div>
                </div>
                <div class="row justify-center q-pb-md">
                <div class="col-12">
                    <q-select
                        v-model="mediaSaleVo.payment_currency"
                        :options="currencyOption"
                        option-label="label"
                        option-value="value"
                        :label="$t('payment_currency')"
                        dense
                    />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <div class="col-12">
                  <span class="text-weight-bold text-subtitle1">Settle in</span>
              </div>
              <div class="col-12">
                <q-input v-model="mediaSaleVo.settle_in" hide-bottom-space placeholder="Settle in" style="height: 56px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <div class="col-12">
                  <span class="text-weight-bold text-subtitle1">Settle in</span>
              </div>
              <div>
                <q-input v-model="mediaSaleVo.settle_in_date" :label="$t('settle in date')" ref="refStartTime" tabindex="6">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="mediaSaleVo.settle_out_date" mask="YYYY-MM-DD HH:mm">
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
                        <q-time v-model="mediaSaleVo.settle_out_date" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-time>
                    </q-popup-proxy>
                    </q-icon>
                </template>
                </q-input>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td colspan="3" class="space">
              <div class="col-12">
                <q-input v-model="mediaSaleVo.settle_out" hide-bottom-space placeholder="Settlement out price" outlined style="height: 56px;" />
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
                <div>
                <q-input v-model="mediaSaleVo.settle_out_date" :label="$t('settle out date')" ref="refStartTime" outlined tabindex="6">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="mediaSaleVo.settle_out_date" mask="YYYY-MM-DD HH:mm">
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
                        <q-time v-model="mediaSaleVo.settle_out_date" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-time>
                    </q-popup-proxy>
                    </q-icon>
                </template>
                </q-input>
            </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="space">
              <q-btn text-color="black" style="background-color: #fefefe; width: 100%; height: 56px; min-width: 30px;" @click="Modify()">
                <table border="0" width="100%" align="center">
                  <tr>
                    <td>
                      <b>{{ $t('modify') }}</b>
                    </td>
                  </tr>
                </table>
              </q-btn>
            </td>
          </tr>
        </table>
        <!-- 하단 공간 확보 -->
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>
        </q-toolbar>
      </q-card>
    </q-dialog>
    <TermsModal ref="refTermsModal" />
    <PrivacyModal ref="refPrivacyModal" />
  </template>
  
  <script>
  // import { Cookies } from 'quasar'
  import { sha512 } from 'js-sha512'
  // import { KakaoCordovaSDK } from 'kakao-sdk'
  
  export default {
    // name: 'mystore',
    data () {
      return {
        MediaSaleModifyModal: false,
        mediaSaleVo: {
            seq: 0,
            market_cd: '',
            market_name: '',
            sale_price: '',
            payment_currency: '',
            contract_address: '',
            nft_id: '',
            settle_in: '',
            settle_in_date: '',
            settle_out: '',
            settle_out_date: '',
            del_yn: '',
            reg_id: '',
            reg_time: '',
            uid: '',
        },
        marketOption: [
          {
            label: '메직에덴',
            value: 'magicaden',
          },
          {
            label: '오픈씨',
            value: 'open sea',
          },
        ],
        currencyOption: [
          {
            label: 'USDT',
            value: 'USDT',
          },
        ],
      }
    },
    // created: function () {
    //   if (this.$store.state.device === 'P') {
    //     this.layoutWidth = '280px'
    //   }
    // },
    watch: {
    },
    methods: {
        async show () {
            this.MediaSaleModifyModal = true
            console.log(this.mediaSaleVo.uid)
        },
        async Modify() {
            const result = await this.$axios.post('/api/mediaSale/updateMediaSale', this.mediaSaleVo)
            if (result.data && result.data.resultCd === 'SUCCESS') {
                // 부모창의 콜백함수 호출
                this.$noti(this.$q, this.$t('modify_success'))
                this.$emit('callback-modify')

                this.close()
            } else {
                this.$noti(this.$q, this.$t('modify_failed'))
            }
        },
        clearField() {
            // 필드 초기화
            this.mediaSaleVo.seq = ''
            this.mediaSaleVo.settle_out = ''
            this.mediaSaleVo.settle_out_date = ''
        },

        close () {
            this.clearField()
            this.MediaSaleModifyModal = false
        }
    }
  }
  </script>
  
  <style scoped>
  .space{
    padding: 10px;
  }
  </style>