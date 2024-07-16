<template>
  <q-page class="q-pa-md page-1200">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_delete_user') }}
      </div>
    </div>
    <!--
    <div class="row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_notice_modify_description') }}
      </div>
    </div>
    -->
    <div class="row justify-center q-pb-md">
    </div>

    <!-- delete_user_id -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('delete_user_id') }}(UID)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="deleteUserId" ref="refDeleteUserId" :rules="[required, val => minLength(val, 6), val => maxLength(val, 50)]" clearable standout dark tabindex="1" />
      </div>
    </div>

    <!-- delete_user_pwd -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('user_pwd') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="deleteUserPwd" ref="refDeleteUserPwd" :rules="[required, val => minLength(val, 6), val => maxLength(val, 50)]" clearable standout dark tabindex="1" />
      </div>
    </div>


    <div class="row justify-center q-pt-lg">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="deleteUser" tabindex="3">
          <b>{{ $t('delete') }}</b>
        </q-btn>
      </div>
    </div>
    

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>
  <!-- <WalletModal ref="refWalletModal" /> -->

  <q-dialog v-model="confirmDelete">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteUser" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';
// import { shake128 as SHA3 } from 'js-sha3'
import sha512 from 'crypto-js/sha512';

export default defineComponent({
  name: 'DeleteUser',
  data () {
    return {
      // type: '',
      confirmDelete: false,
      deleteUserId: '',
      deleteUserPwd: '',
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {},
  mounted: function () {},
  methods: {
    // callbackLogin(userVo) {
    //   // console.log('callbackLogin!!!')
    //   this.$store.dispatch('setUid', userVo.uid)
    //   this.$store.dispatch('setAdcd', userVo.adcd)
    //   this.$store.dispatch('setName', userVo.name)
    //   this.$store.dispatch('setNickname', userVo.nickname)
    //   this.$store.dispatch('setProfileImage', userVo.profile_image)
    //   this.$store.dispatch('setWalletType', userVo.wallet_type)
    //   this.$store.dispatch('setWalletAddress', userVo.wallet_address)
    //   this.$store.dispatch('setMobileNo', userVo.mobile_no)
    // },
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message);
    },
    minLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length);
    },
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length);
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value);
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value);
    },
    ///////////////////////////////////////////////////////////////////////////
    validate() {
      let result = true
      if (!this.$refs.refDeleteUserId.validate()) {
        this.$noti(this.$q, 'check the field [User ID]')
        result = false
      }
      if (!this.$refs.refDeleteUserPwd.validate()) {
        this.$noti(this.$q, 'check the field [User Password]')
        result = false
      }
      return result
    },
    // 사용자 삭제 확인
    deleteUser() {
      // Field validation check
      if(!this.validate()) {
        return
      }

      // deleteUser 확인창 표시
      this.confirmDelete = true
    },
    // 사용자 삭제
    doDeleteUser() {

      // // 로그인 여부 체크, 로그인 모달 표시
      // if (!this.getUid) {
      //   // this.$refs.refWalletModal.show()
      //   this.$noti(this.$q, 'Please log in.')
      //   return
      // }

      this.$q.loading.show() // 로딩 표시 시작

      // user 삭제 처리
      const param = {
        uid: this.deleteUserId,
        pwd: sha512(this.deleteUserPwd).toString(),
      }
      this.$axios.post('/api/user/deleteUser', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, 'Delete user completed.')
            // 페이지 이동
            this.$router.push('/')
          } else {
            this.$noti(this.$q, 'Delete process failed.')
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goBack() {
      this.$router.push('/')
    },
  }
})
</script>

<style scoped>
</style>
