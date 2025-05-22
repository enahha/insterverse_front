<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_project_register') }}
      </div>
    </div>
    <div class="row q-pl-md justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_project_selection_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-xl">
    </div>

    <!-- 프로젝트 만들기 -->
    <div class="flex flex-center">
      <!-- 1 NFT 프로젝트 만들기 -->
      <div class="row">
        <!-- 반응형 div 1-->
        <div style="max-width: 450px; cursor: pointer;" @click="goRegister(0)">
          <!-- 직접 등록하기 -->
          <div class="row">
            <div class="col-12 col-md">
              <div class="q-pa-md">
                <q-card class="my-card" flat bordered>
                  <q-item clickable v-ripple>
                    <q-card-section horizontal>
                      <q-card-section class="q-mt-xl q-mb-xl text-center">
                        <div style="min-width: 350px;"><q-img src="logo/logo_instarverse.png" width="100px" /></div>
                        <div class="text-h5 q-mt-lg q-mb-md">{{ $t('register_project_title') }}</div>
                        <div class="">{{ $t('register_project_detail') }}</div>
                      </q-card-section>
                    </q-card-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
        </div>

        <!-- 반응형 div 2 -->
        <div style="min-width: 250px;max-width: 450px; cursor: pointer;" @click="goRegister(1)">
          <!-- 인스타그램에서 가져오기 -->
          <div class="row">
            <div class="col-12 col-md">
              <div class="q-pa-md">
                <q-card class="my-card" flat bordered>
                  <q-item clickable v-ripple>
                    <q-card-section horizontal>
                      <q-card-section class="q-mt-xl q-mb-xl text-center">
                        <div style="min-width: 350px;"><q-img src="logo/logo_instagram_square.png" width="100px" /></div>
                        <div class="text-h5 q-mt-lg q-mb-md">{{ $t('import_project_title') }}</div>
                        <div class="">{{ $t('import_project_detail') }}</div>
                      </q-card-section>
                    </q-card-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <TokenDetailModal ref="refTokenDetailModal"/> -->
  <WalletModal ref="refWalletModal" />
  <IframeModal ref="refIframeModal" />
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'InstagramList',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      refresherDone: '',
    }
  },
  components: {
  },
  watch: {
    // getUid (newValue) {
    //   // console.log('newValue: : ' + newValue)
    //   // this.loadMore(1, null)
    //   this.refresher(null)
    //   // if (!newValue) {
    //   //   this.$router.push('/')
    //   // } else {
    //   //   this.loadMore(1, null)
    //   // }
    // },
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    isAdmin () {
      return this.$store.getters.getAdcd === this.$adminCode
    },
    getKeyword () {
      return this.$store.getters.getKeyword
    },
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    goRegister(type) {
      if (type == 1) { // SNS에서 가져오기
        this.$router.push('/project/selectPlatform')
      } else { // 직접 등록하기
        this.$router.push('/project/registerProject')
      }
    },

  },
})
</script>

<style scoped>
</style>
