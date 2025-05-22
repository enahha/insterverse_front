<template>
  <div class="gallery-plans">
    <div v-for="(plan, index) in plans" :key="index" class="plan">
      <h5>{{ plan.name }}</h5>
      <p v-html="plan.details"></p>
      <p><strong>Price:</strong> {{ plan.price }}</p>
      <button @click="goPayment(plan)">결제</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: [
        { 
          name: "starter", 
          details: "작품 20개 보관가능<br>1개의 공개 전시회", 
          price: "free" 
        },
        { 
          name: "basic", 
          details: "작품 50개 보관가능<br>5개의 공개 전시회", 
          price: "월 $6" 
        },
        { 
          name: "regular", 
          details: "작품 250개 보관가능<br>10개의 공개 전시회", 
          price: "월 $15" 
        },
        { 
          name: "professional", 
          details: "작품 500개 보관가능<br>50개의 공개 전시", 
          price: "월 $30" 
        },
        { 
          name: "custom", 
          details: "커스텀", 
          price: "contact us" 
        },
      ]
    };
  },
  methods: {
    purchasePlan(planName) {
      alert(`${planName} 플랜을 선택했습니다!`);
      // 결제 처리 로직을 여기에 추가
    },
    // 결제
    async goPayment(item) {
      // 1. 해당 건이 결제 완료인지 확인
      const params = {
        uid: this.getUid,
        seq: this.seq,
      }
      // const result = await this.$axios.post('/api/tokenburn/checkTokenBurnStatusCdPaid', params)
      // if (result && result.data && result.data.resultCd === 'SUCCESS') { // 결제 완료인 경우
      //   this.$router.push({ path: '/token/burn', query: { key: this.seq }}) // 실행 화면으로 이동
      // } else { // 결제 전인 경우, 결제 화면으로 이동
        // 결제정보 설정
        // const goodName = item.name + ' ' + this.$t('contract_verify')
        const goodName = item.name
        const payCode = 'TEST'

        this.$store.dispatch('setPaymentGoodsName', goodName)
        this.$store.dispatch('setPaymentPayCode', payCode)

        // 상점 파라미터(customData) 설정
        // [0]: payCode | [1]: paySuccessUrl | [2]: payFailUrl | [3]: key
        const paySuccessUrl = '/notice'
        let payFailUrl = '/payment' // 디바이스가 데스크탑인 경우
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          payFailUrl = '/paymentMobile' // 디바이스가 모바일인 경우
        }
        const key = this.seq // insert로 받아온 seq를 설정 ※ item의 seq는 토큰 seq이고, this.seq는 token_burn 또는 token_mint 테이블에 insert 된 seq 임.
        const customData = payCode + '|' + paySuccessUrl + '|' + payFailUrl + '|' + key   // db에 들어가는 데이터같음
        this.$store.dispatch('setPaymentCustomData', customData) // 상점 파라미터(customData) 설정

        // 결제 정보 설정
        this.$cookie.set('GOOD_NAME', goodName)
        this.$cookie.set('PAY_CODE', payCode)
        this.$cookie.set('CUSTOM_DATA', customData)
        localStorage.setItem('GOOD_NAME', goodName)
        localStorage.setItem('PAY_CODE', payCode)
        localStorage.setItem('CUSTOM_DATA', customData)

        // 결제 화면으로 이동
        if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || this.$q.platform.is.mobile) {
          // 디바이스가 모바일인 경우
          this.$router.push('/paymentMobile')
        } else {
          // 디바이스가 데스크탑인 경우
          this.$router.push('/test/pay')
          // this.$router.push('/payment')
        }
      // }
    },
    close () {
      this.tokenBurnModal = false
    }
  }
}
</script>

<style>
.gallery-plans {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.plan {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
  text-align: center;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
