<template>
  <q-dialog v-model="ExhibitionTypeModal" persistent>
    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders bg-white" style="min-width: 40%; max-height: 60vh;">
      <q-header class="bg-white" elevated>
        <q-toolbar>
          <q-toolbar-title class="text-body2 text-black">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_exhibition_type') }}</span>
          </q-toolbar-title>
          <q-btn flat round dense icon="close" color="black" v-close-popup icon-right="true" @click="close" />
        </q-toolbar>
      </q-header>
      <br /><br />
      <div class="exhibition-type" @click="apply(item)" v-for="item in itemList" :key="item.seq" style="cursor: pointer;z-index: 1;">
        <q-item>
          <q-item-section avatar>
            <q-avatar square>
              <img v-if="item.url" :src="item.url">
              <img v-else src="images/exhibition_poster_basic2.png">
            </q-avatar>
          </q-item-section>
          
          <q-item-section>
            <div class="row list-item">
              <q-item-label class="" style="max-height: 20px; ">{{ item.name }}</q-item-label>
              <q-item-label class="" style="max-height: 20px; ">{{ $t('over_display_maximum') }} : {{ item.display_maximum }}</q-item-label>
              <q-item-label class="" style="max-height: 50px;">{{ truncateText(item.description, 250) }}</q-item-label>
              
              <q-item-label style="width: 85%; display: flex; justify-content: center; align-items: last baseline;">
                <q-btn
                    v-if="item.myItem"
                    :label="$t('choice')"
                    @click="apply(item)"
                    style="background-color: #90B2D8; color: black; border: 1px solid #6c6c6c; width: 20vh; max-height: 30px;"
                  />
                <q-btn
                    v-else
                    :label="$t('get')"
                    @click="goItemPayment(item)"
                    style="background-color: none; color: black; border: 1px solid #6c6c6c; width: 20vh; max-height: 30px;"
                  />
              </q-item-label>
            </div>
          </q-item-section>

        </q-item>
        <hr> <!-- 구분선 -->
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <div v-if="noDataFlag" class="row justify-center q-pt-lg">
        <img src="images/no_data.png" style="width: 35%; max-width: 250px;" />
      </div>
    </q-layout>
  </q-dialog>
</template>
  
  <script>
  export default {
    data () {
      return {
        ExhibitionTypeModal: false,
        itemList: [],
        myItemList: [],
        keyword: '',
        refresherDone: '',
        pageSize: 200,
        lastPageNum: 1, // 마지막 페이지
        noDataFlag: false, // 나의 작품 데이터 없음 플래그
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
      async show() {
        this.ExhibitionTypeModal = true
        this.selectUserItemListByUid()
      },
      close() {
        this.ExhibitionTypeModal = false
      },
      truncateText(text, maxLength) {
        if (!text) {
          return ''
        }

        if (text.length <= maxLength) {
          return text
        }
        return text.substring(0, maxLength) + '...'
      },
      // refresher (done) {
      //   // done - Function to call when you made all necessary updates.
      //   //        DO NOT forget to call it otherwise the refresh message
      //   //        will continue to be displayed
      //   // make some Ajax call then call done()
      //   this.itemList = []
      //   this.refresherDone = done // load가 끝나면 로딩메세지 종료
      //   // this.$refs.infiniteScroll.reset() // index 초기화
      //   // this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      //   // this.$refs.infiniteScroll.load() // loadMore로 검색
      //   this.loadMore(1, done)
      // },
      // loadMore(index, done) {
      //   // index - called for nth time
      //   // done - Function to call when you made all necessary updates.
      //   //        DO NOT forget to call it otherwise your loading message
      //   //        will continue to be displayed. Has optional boolean
      //   //        parameter that invokes stop() when true
      //   // console.log('index: ' + index)
      //   // make some Ajax call then call done()
      //   // this.pageNum = index
      //   setTimeout(() => {
      //     // alert(index)
      //     // console.log('loadMore called index: ' + index)
      //     if (index <= this.lastPageNum) {
      //       this.selectItemList(index, done)
      //       if (index === this.lastPageNum) {
      //         this.$refs.infiniteScroll.stop()
      //       }

      //       // refresher 로딩메세지 처리
      //       if (this.refresherDone != null && this.refresherDone !== '') {
      //         this.refresherDone() // 로딩메세지 종료
      //         this.refresherDone = '' // 로딩메세지 초기화
      //       }
      //     }
      //   }, 500)
      // },
      // // 전시관 타입 조회
      // selectItemListMax() {
      //   // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      //   if (!this.keyword) {
      //     this.keyword = ''
      //   }
      //   this.$axios.get('/api/item/selectItemListLastPageNum',
      //     {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
      //     .then((result) => {
      //       // console.log(JSON.stringify(result.data))
      //       this.lastPageNum = result.data
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
      // },  
      // 전시관 타입 리스트 조회
      selectItemList(idx, done) {
        if (!this.keyword) {
          this.keyword = ''
        }
        this.$axios.get('/api/item/selectItemList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword, type:this.$ITEM_TYPE_HALL}})
          .then(async (result) => {
            // console.log(JSON.stringify(result.data))
            // console.log(result.data)
            if (idx === 1) { // 첫번째 load인 경우
              this.itemList = [] // 리스트 초기화
            }
            this.itemList = this.itemList.concat(result.data)

            // myItemList와 itemList를 비교하여 정렬
            this.sortItemList()

            console.log("this.itemList")
            console.log(this.itemList)

            // 데이터 없음 표시 설정
            if (!this.itemList || this.itemList.length < 1) {
              this.noDataFlag = true
            } else {
              this.noDataFlag = false
            }
            if (done) {
              done()
            }
          })
          .catch((err) => {
            console.log(err)
            if (done) {
              done()
            }
          })
      },
      // 내가 가지고 있는 아이템 조회
      async selectUserItemListByUid() {
        this.$axios.get('/api/userItem/selectUserItemListByUid',
        {params: {uid: this.getUid}})
          .then(async (result) => {
            this.myItemList = result.data

            this.selectItemList(1, this.refresherDone)
          })
          .catch((err) => {
            console.log(err)
            if (done) {
              done()
            }
          })
      },
      // 아이템 리스트 정렬
      sortItemList() {
        if (this.myItemList && this.itemList) {
          // myItemList에 있는 item_seq를 기준으로 itemList에서 해당 아이템을 찾아 정렬
          const myItems = this.itemList
            .filter(item => this.myItemList.some(myItem => myItem.item_seq === item.seq))
            .map(item => ({ ...item, myItem: true }))

          const otherItems = this.itemList
            .filter(item => !this.myItemList.some(myItem => myItem.item_seq === item.seq))
            .map(item => item.price_type === this.$ITEM_PRICE_TYPE_FREE ? { ...item, myItem: true } : item)
          // console.log("myItems")
          // console.log(myItems)
          // console.log("otherItems")
          // console.log(otherItems)

          // 내 아이템을 상단에 배치
          this.itemList = [...myItems, ...otherItems]
        }
      },
      apply(item) {
        this.$emit('callback-register', item)
        this.close()
      },
      goItemPayment(item) {
        this.$router.push({ path: '/payment/item', query: { s: item.seq }})
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
    