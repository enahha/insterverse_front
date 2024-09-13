import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import VueClipboard from 'vue-clipboard2'

export default boot(({ app }) => {
  ///////////////////////////////////////////////////////////
  // plugin
  ///////////////////////////////////////////////////////////
  app.use(VueClipboard) // copy text to clipboard - this.$copyText

  ///////////////////////////////////////////////////////////
  // variable
  ///////////////////////////////////////////////////////////
  // 쿠키
  app.config.globalProperties.$cookie = Cookies
  // app.config.globalProperties.$fiters = {
  //   zerofill (value) {
  //     if (!value) return '00'
  //     value = value.toString()
  //     return (value < 10 && value > -1 ? "0" : "") + value
  //   }
  // }

  // 관리자 지갑 주소 - IDO 처리시 사용
  // app.config.globalProperties.$systemWalletAddress = '0xb4285d543F192859cdB9f825686F3a2A8f8AA8BC'
  app.config.globalProperties.$systemWalletAddress = '0x16F5dF3C8dD43166492b867079f48DB746107CFE'
  // app.config.globalProperties.$systemWalletAddressKlay = '0x16F5dF3C8dD43166492b867079f48DB746107CFE'

  app.config.globalProperties.$systemMailFrom = 'contact@starinc.io'

  // 관리자 여부
  app.config.globalProperties.$adminCode = '1029'

  const SCOPE_DOMAIN_KLAYTN_TEST = 'https://baobab.scope.klaytn.com/'
  const SCOPE_DOMAIN_KLAYTN = 'https://scope.klaytn.com/'
  app.config.globalProperties.$scopeDomainKlaytn = SCOPE_DOMAIN_KLAYTN

  // 계약 검증 신청 진입 화면 URL
  app.config.globalProperties.$scopeSubmissionUrl = app.config.globalProperties.$scopeDomainKlaytn + 'contract/submission'


  const DOMAIN_LOCAL = ''
  const DOMAIN_INSTARVERSE_TEST = 'http://localhost:8888'
  const DOMAIN_INSTARVERSE = 'https://instarverse.com'
  app.config.globalProperties.$apiServer = DOMAIN_INSTARVERSE

  app.config.globalProperties.$frontDomain = DOMAIN_INSTARVERSE

  // 인스타그램
  app.config.globalProperties.$instagramClientId = '681042560396956'
  app.config.globalProperties.$instagramLoginRedirectUri = 'https://instarverse.com/api/login/instagramLoginRedirectUri'

  //유니티
  app.config.globalProperties.$exhibitionUnityUrl = 'https://instarverse.com/exhibition/index.html?exhibitionSeq='
  
  // 프로젝트 상태 코드
  app.config.globalProperties.$PROJECT_STATUS_CD_REGISTERED = '10'
  app.config.globalProperties.$PROJECT_STATUS_CD_PAID = '20'
  app.config.globalProperties.$PROJECT_STATUS_CD_CONTRACT = '30'
  app.config.globalProperties.$PROJECT_STATUS_CD_MINT = '40'
  app.config.globalProperties.$PROJECT_STATUS_CD_CONFIRMED = '50'
  app.config.globalProperties.$PROJECT_STATUS_CD_DELETE = '99'

  // 결제 관련 상수
  // app.config.globalProperties.$CREATE_TOKEN_CD_PAID = '11' // 토큰 생성 상태 코드 - 결제완료
  // app.config.globalProperties.$PAY_CODE_CREATE_TOKEN = 'CREATE_TOKEN' // 결제코드: CREATE_TOKEN(토큰 생성)
  // app.config.globalProperties.$PAY_CODE_MINT_TOKEN = 'MINT_TOKEN' // 결제코드: MINT_TOKEN(토큰 추가발행)
  // app.config.globalProperties.$PAY_CODE_BURN_TOKEN = 'BURN_TOKEN' // 결제코드: BURN_TOKEN(토큰 소각)
  // app.config.globalProperties.$PAY_CODE_CONTRACT_VERIFY = 'CONTRACT_VERIFY' // 결제코드: CONTRACT_VERIFY(계약 검증)
  // app.config.globalProperties.$PAY_CODE_CREATE_POOL = 'CREATE_POOL' // 결제코드: CREATE_POOL(유동성 풀 생성)
  // app.config.globalProperties.$PAY_CODE_CREATE_AIRDROP = 'CREATE_AIRDROP' // 결제코드: CREATE_AIRDROP(에어드랍 생성)
  // app.config.globalProperties.$PAY_CODE_CREATE_WHITELIST = 'CREATE_WHITELIST' // 결제코드: CREATE_WHITELIST(화이트리스트 생성)
  // app.config.globalProperties.$PAY_CODE_CREATE_PRESALE = 'CREATE_PRESALE' // 결제코드: CREATE_PRESALE(사전판매 생성)
  // app.config.globalProperties.$PAY_CODE_CREATE_RECRUIT = 'CREATE_RECRUIT' // 결제코드: CREATE_RECRUIT(채용 생성)
  // app.config.globalProperties.$PAY_CODE_CREATE_MINTING = 'CREATE_MINTING' // 결제코드: CREATE_MINTING(NFT 민팅 생성)

  // 아이템 무료, 유료 구분
  app.config.globalProperties.$ITEM_TYPE_FREE = 'FREE' // 결제코드: CREATE_MINTING(NFT 민팅 생성)
  app.config.globalProperties.$ITEM_TYPE_PAID = 'PAID' // 결제코드: CREATE_MINTING(NFT 민팅 생성)

  // 결제 관련 상수
  app.config.globalProperties.$PAY_CODE_HALL = 'HALL' // 결제코드: CREATE_MINTING(NFT 민팅 생성)



  // app.config.globalProperties.$device = '' // 디바이스 - P: 데스크탑, M: 모바일웹, android: 안드로이드 앱, ios: 아이폰 앱

  // Swapscanner URL
  app.config.globalProperties.$urlSwapscannerEn = 'https://swapscanner.io/swap?from=0x0000000000000000000000000000000000000000&to='
  app.config.globalProperties.$urlSwapscannerKo = 'https://swapscanner.io/ko/swap?from=0x0000000000000000000000000000000000000000&to='
  // app.config.globalProperties.$urlSwapscannerEn = 'https://swapscanner.io/pro/swap?from=krw&to='
  // app.config.globalProperties.$urlSwapscannerKo = 'https://swapscanner.io/ko/pro/swap?from=krw&to='




  ///////////////////////////////////////////////////////////
  // Method
  ///////////////////////////////////////////////////////////
  app.config.globalProperties.$testApi = function (param) {
    return param + '456456456'
  }

  app.config.globalProperties.$noti = function (quasar, message) {
    quasar.notify({
      message: `<span style="color: black;">${message}</span>`,
      color: 'white',
      avatar: 'icons/instarverse_logo.png',
      position: 'bottom',
      html: true,
      actions: [
        { label: 'X', color: 'black', handler: () => { /* ... */ } },
      ],
    })
  }

})
