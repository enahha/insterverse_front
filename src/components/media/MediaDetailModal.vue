<template>
  <q-dialog v-model="MediaDetailModal" :maximized="maximized">

    <!-- TODO: 반응형으로 좌우 나눠서 개발해야 함 -->
    <div class="col" style="max-width: 1200px; word-break: break-all;">
      <q-card>
        <q-btn class="" flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
        <q-card-section horizontal>

          <q-card-section class="col-6 flex flex-center">
            <video v-if="myMediaVo.type == 'video'" :src="myMediaVo.url" controls autoplay loop muted style="width: 100%;"></video>
            <q-img v-else :src="myMediaVo.url" />
          </q-card-section>

          <!-- <img class="col-6" :src="myMediaVo.image" /> -->
          <q-card-section>
            <div class="text-h6 q-mb-xs">{{ myMediaVo.title }}</div>
            <div class="text-subtitle1 text-grey">{{ myMediaVo.subtitle }}</div>
            <div v-if="myMediaVo.sale_yn == 'Y'" class="price text-h6">{{ myMediaVo.price }}</div>
            <div class="q-mt-md q-mb-sm">
              <div class="text-subtitle2">{{ myMediaVo.year }} &nbsp;&bull;&nbsp; {{ myMediaVo.dimensions }} &nbsp;&bull;&nbsp; {{ myMediaVo.material }}</div>
            </div>
            <!-- <q-separator /> -->
            <div class="q-pa-sm" style="border: 1px solid;" v-html="myMediaVo.description" />
          </q-card-section>
        </q-card-section>
      </q-card>
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
        image: 'https://picsum.photos/1000',
        title: '트랜스휴먼',
        subtitle: '트랜스휴먼9 (부제)',
        price: '150,000',
        year: '1998/02/03',
        dimensions: '1668 x 1668',
        material: '디지털',
        description: '2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...2021년 아르코미술관 기획초대전은 작가 정재철 (1959-2020)의 작고 1주기전으로 마련한다...'
      },
    }
  },
  methods: {
    async show() {
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
  }
}
</script>

<style scoped>
</style>
    