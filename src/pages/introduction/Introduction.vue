<template>
  <!-- <q-page class="justify justify-center" style="background-image: url(images/star1.jpg)"> -->
  <q-page class="justify justify-center introduction">
      <div style="height: 500px;">
        <q-img src="images/main_exhibition.png" style="width: 100%; height: 500px; margin: -60px auto;" />
      </div>

      <div>
        <div class="q-pt-lg">
          <div class="row" style="display: flex; align-items: center;">
            <div class="underline" style="margin-right: 10px;"></div>
            <span class="subtitle">About Us</span>
          </div>
          <div class="center q-pt-lg">
            <div style="width: 70%; text-align: left;">  
              인스타버스는 인스타그램과 메타버스 전시관의 결합을 모티브로 탄생한 NFT 시장 기반의 가상 갤러리입니다.
              이 플랫폼은 아티스트가 NFT 판매 시장의 높은 장벽을 넘어설 수 있도록 돕기 위해 만들어졌습니다. 아티스트들은 더 넓은 시장에 자신을 알리고, 팬들과 소통하며,
              작품을 경제적으로 활용할 수 있는 새로운 기회가 제공됩니다. 인스타버스를 통해 작품을 전시하고, 전 세계의 관람객과 연결될 수 있는 새로운 가능성이 되고자 합니다.
            </div>
          </div>
        </div>

        <div class="q-pt-lg interval-between">
          <div class="row" style="display: flex; align-items: center;">
            <div class="underline" style="margin-right: 10px;"></div>
            <span class="subtitle">Our Value</span>
          </div>
          <div class="center q-pt-lg">
            <div style="width: 72%; text-align: left;">  
              <ul>
                <li>NFT 시장은 나날이 거대해지는 것에 비해 기존의 아티스트들에겐 진입 장벽이 너무 높았습니다. 그런 아티스트에게 자동 NFT 전환 서비스를 제공하여 인스타버스에 업로드만으로 누구나 쉽게 작품을 NFT로 변환해 판매 할 수 있습니다.</li>
                <li>인스타그램과의 연동으로 이전에 업로드 했던 작품을 커스텀 전시관과 가상 갤러리 제작을 통해 주제와 컨셉에 맞는 독보적인 아카이빙을 제공합니다.</li>
                <li>AI 도슨트의 활용으로 관람객에게 보다 깊이감 있는 작품과 세계관의 설명이 가능합니다.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="q-pt-lg interval-between">
          <div class="row" style="display: flex; align-items: center;">
            <div class="underline" style="margin-right: 10px;"></div>
            <span class="subtitle">Why Instarverse?</span>
          </div>
          <div class="center" style="padding: 100px;">
            <q-img src="images/instarverse_aboutus_1.png" style="max-width: 900px; margin-right: 20px;" />
            <div style="width: 35%; text-align: center; padding-top: 90px;">
              <h4 style="font-weight: bold;">
                내 작품을 NFT로 발행 및 판매
              </h4>
              <span style="font-size: 16px; line-height: 1.6;">
                NFT 시장은 나날이 거대해지는 것에 비해 기존의 아티스트들에겐 진입 장벽이 너무 높았습니다. 
                그런 아티스트에게 자동 NFT 전환 서비스를 제공하여 인스타버스에 업로드만으로 누구나 쉽게 
                작품을 NFT로 변환해 판매할 수 있습니다.
              </span>
            </div>
          </div>

          <div class="center" style="background-color: #90B2D8; padding: 100px;">
            <div style="width: 35%; text-align: center; padding-top: 90px;">
              <h4 style="font-weight: bold; color: white;">
                창작자 수수료 수익
              </h4>
              <span style="font-size: 16px; line-height: 1.6; color: white;">
                NFT는 구매자가 재판매 할 경우 창작자에게 수수료가 지급됩니다.
                오프라인 시장에서 볼 수 없던 아티스트의 수익적 혜택을 인스타버스를 통해
                손쉽게 누릴 수 있습니다.
              </span>
            </div>
            <q-img src="images/instarverse_aboutus_2.png" style="max-width: 900px; margin-right: 20px;" />
          </div>

          <div class="center" style="padding: 100px;">
            <q-img src="images/instarverse_aboutus_3.png" style="max-width: 900px; margin-right: 20px;" />
            <div style="width: 35%; text-align: center; padding-top: 90px;">
              <h4 style="font-weight: bold;">
                인스타그램 연동
              </h4>
              <span style="font-size: 16px; line-height: 1.6;">
                인스타그램과 연동하여 단순 클릭만으로 과거 업로드 했던 작품들을 커스텀 전시관과
                가상 갤러리에 전시할 수 있습니다. 이를 통해 개인의 컬렉션 생성을 자유롭게 해
                아티스트에게 독보적인 아카이브 환경을 제공합니다.
              </span>
            </div>
          </div>

          <div class="center" style="background-color: #0C2C69; padding: 100px;">
            <div style="width: 35%; text-align: center; padding-top: 90px;">
              <h4 style="font-weight: bold; color: white;">
                AI 도슨트와 자유로운 소통 
              </h4>
              <span style="font-size: 16px; line-height: 1.6; color: white;">
                AI 도슨트의 활용으로 아티스트의 직접적인 개입 없이도 관람객에게 보다 깊이 있는
                작품과 세계관의 설명이 가능합니다. 도슨트와 음성 대화 기술을 통해 실제 갤러리와
                같은 상호작용을 경험하세요.
              </span>
            </div>
            <q-img src="images/instarverse_aboutus_4.png" style="max-width: 900px; margin-right: 20px;" />
          </div>

          <div class="center" style="padding: 100px;">
            <q-img src="images/instarverse_aboutus_5.png" style="max-width: 900px; margin-right: 20px;" />
            <div style="width: 35%; text-align: center; padding-top: 90px;">
              <h4 style="font-weight: bold;">
                자동 관람 기능
              </h4>
              <span style="font-size: 16px; line-height: 1.6;">
                영상처럼 흘러가는 자동 관람 기능으로 3D 멀미를 호소하는 관람객에게 친화적이며
                직접 조작하지 않고도 작품을 감상할 수 있습니다.
              </span>
            </div>
          </div>

          <div class="center" style="background-color: #90B2D8; padding: 100px;">
            <div style="width: 35%; text-align: center; padding-top: 90px;">
              <h4 style="font-weight: bold; color: white;">
                365일 연중무휴 포트폴리오  
              </h4>
              <span style="font-size: 16px; line-height: 1.6; color: white;">
                인스타버스의 상시 전시를 통해 시간과 장소를 가리지 않는 특색 있는 포트폴리오
                공간이 제공됩니다. 종이와 문서로 이루어진 기존의 포트폴리오와 달리 링크 형태로
                명함, 카드, SNS 등 활용성이 뛰어납니다.
              </span>
            </div>
            <q-img src="images/instarverse_aboutus_6.png" style="max-width: 900px; margin-right: 20px;" />
          </div>
        </div>

        <div class="q-pt-lg interval-between">
          <div class="row" style="display: flex; align-items: center;">
            <div class="underline" style="margin-right: 10px;"></div>
            <span class="subtitle">Explore</span>
          </div>
          <div class="center q-pt-lg">
            <div style="width: 72%; text-align: left;">  
              <ul style="list-style: none; padding: 0; margin-top: 40px;">
                <li v-for="(gallery, index) in galleries" :key="index" style="display: flex; align-items: center; margin-bottom: 40px;">
                  <img :src="gallery.image" style="width: 550px; height: 300px; object-fit: cover; margin-right: 20px; border-radius: 8px;">
                  <div style="width: 50%; text-align: left;">
                    <p style="font-size: 16px; line-height: 1.6;">{{ gallery.description }}</p>
                    <a :href="gallery.url" target="_blank" style="display: inline-block; background-color: #90B2D8; border: none; padding: 10px 40px; border-radius: 8px; color: white; text-decoration: none; cursor: pointer;">
                      전시관 체험하기
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>




      </div>
    <br />
    <br />

    <!-- links -->
    <!-- <div class="text-caption text-white flex flex-center" style="background: rgb(29, 29, 29);">
      <div class="row flex flex-center q-pt-md">
        <div class="q-pl-md q-pr-md q-pb-sm flex flex-center">
          <img src="logo/icons-social-gitbook.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://docs.nftpy.io')" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="logo/icons-social-telegram.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://t.me/klaystar')" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="logo/icons-social-twitter.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://twitter.com/klaystar_offici')" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="logo/icons-social-medium.svg" style="width: 35px; cursor: pointer;" @click="openUrl('https://klaystar.medium.com')" />
        </div>
      </div>
    </div> -->

  </q-page>

  <TermsModal ref="refTermsModal" />
  <PrivacyModal ref="refPrivacyModal" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      // msgBox: false,
      galleries: [
        {
          image: 'images/explore_1.png',
          description: '모던한 컨셉의 전시장으로 어두운 배색과 특이한 가벽 구조로 안정감 있는 전시 공간을 제공합니다.',
          url: '',
        },
        {
          image: 'images/explore_2.png',
          description: '중앙의 구조물을 통해 관람자의 동선을 유도하여 스토리텔링에 유리한 전시장입니다. 체커무늬 바닥이 특징으로 트렌디한 느낌을 줍니다.',
          url: '',
        },
        // 추가 전시관 데이터가 필요하면 여기 추가합니다.
      ],
    }
  },
  components: {
  },
  created: function () {
    // console.log(this.$q.platform.is.mobile)

    // CORDOVA APP인 경우, /app/loginApp 화면으로 이동
    if ((this.$q.platform.is.cordova === true || this.$q.platform.is.name === 'webkit') && location.origin !== this.$frontDomain
      // && this.$q.platform.is.mobile === true && (this.$q.platform.is.platform === 'andriod' || this.$q.platform.is.platform === 'ios')
    ) {
      this.$router.push('/app/loginApp')
      // https://nftpy.io WEB으로 이동
      // alert('move to https://nftpy.io')
      // if (location.origin !== this.$domain) {
      //   location.href = this.$domain
      // }
    }

  },
  mounted: function () {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  methods: {
    // // WEB으로 이동
    // moveToWeb () {
    //   // let targetPath = this.$cookie.get('LOGIN_REDIRECT_URL')
    //   // // APP이면 WEB으로 이동, WEB이면 Push
    //   // if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우 - 푸시 토큰 저장
    //   //   location.href = this.$store.state.DOMAIN + '/#' + targetPath + '?uid=' + uid + '&auth_key=' + authKey
    //   // } else {
    //   //   this.$router.push(targetPath)
    //   // }
    //   location.href = this.$domain
    // },
    // 토큰 등록으로 이동
    goRegisterToken() {
      this.$router.push('/token/register')
    },
    // 이용약관 모달 표시
    showTerms() {
      this.$refs.refTermsModal.show()
    },
    // 개인정보처리방침 모달 표시
    showPrivacy() {
      this.$refs.refPrivacyModal.show()
    },
    openUrl(url) {
      // cordova인 경우 IframeModal 표시
      // if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
      //   this.$refs.refIframeModal.url = url
      //   this.$refs.refIframeModal.show()
      // } else {
        window.open(url, '_system')
      // }
    },
    showConstructionMessage() {
      this.$noti(this.$q, this.$t('coming_soon'))
    },
    downloadIpa() {
      window.open('https://nftpy.io/files/ipa/klaystar.ipa')
    }
  }
})
</script>
