<template>
    <q-dialog v-model="MediaDetailModal" persistent>
      <q-card class="media-detail-wrap" style="width: auto; max-width: 1000vw;">
      <div class="content row no-wrap items-start">
        <div class="image-container col-4">
          <!-- <div style="width: 600px; height: 600px;"> -->
            <img :src="artwork.image" alt="Artwork" class="image">
        </div>
        <div class="details col-8 q-px-md">
          <q-btn icon="close" flat round dense @click="close" class="close-btn" />
          <q-card-section>
            <div class="title text-h6 q-mb-xs">{{ artwork.title }}</div>
            <div class="subtitle text-subtitle1 text-grey">{{ artwork.subtitle }}</div>
            <div class="info q-mt-md">
              <div class="dimensions text-subtitle2">{{ artwork.year }} &nbsp;&bull;&nbsp; {{ artwork.dimensions }} &nbsp;&bull;&nbsp; {{ artwork.material }}</div>
            </div>
          </q-card-section>
          <div class="price-action q-mt-md">
            <div class="price text-h6">{{ artwork.price }}</div>
            <q-btn color="primary" label="구매하기" @click="buy" />
          </div>
          <div class="info q-mt-md">
              <div class="description text-subtitle1 q-mt-sm">{{ artwork.description }}</div>
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
        artwork: 
          {
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
    