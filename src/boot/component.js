import { boot } from 'quasar/wrappers'

import LoginModal from 'components/login/LoginModal'
import WalletModal from 'components/login/WalletModal'
import KlipQRCodeModal from 'components/login/KlipQRCodeModal'
import TermsModal from 'components/terms/TermsModal'
import PrivacyModal from 'components/terms/PrivacyModal'
import IframeModal from 'components/common/IframeModal'
import IframeLinkSampleModal from 'components/common/IframeLinkSampleModal'
import NoticeDetailModal from 'components/notice/NoticeDetailModal'
import SwapToKstar from 'components/swap/SwapToKstar'
import SwapPresale from 'components/swap/SwapPresale'
import VueCountdown from '@chenfengyuan/vue-countdown'
import UserDetailModal from 'components/admin/UserDetailModal'
import HolderListModal from 'components/vote/HolderListModal'
import ExhibitionTypeModal from 'components/exhibition/ExhibitionTypeModal'
import MediaDetailModal from 'components/media/MediaDetailModal'
import FaqDetailModal from 'components/faq/FaqDetailModal'
import SettleOutHistoryModal from 'components/settlement/SettleOutHistoryModal'
import MediaSaleModifyModal from 'components/admin/MediaSaleModifyModal'

export default boot(({ app }) => {
  app.component('LoginModal', LoginModal) // 로그인
  app.component('WalletModal', WalletModal) // 월렛
  app.component('KlipQRCodeModal', KlipQRCodeModal) // 클립 QR코드
  app.component('TermsModal', TermsModal) // 이용약관
  app.component('PrivacyModal', PrivacyModal) // 개인정보처리방침
  app.component('IframeModal', IframeModal) // iframe - 토큰 상세에서 web site 표시
  app.component('IframeLinkSampleModal', IframeLinkSampleModal) // iframe - 링크 팝업 샘플용
  app.component('NoticeDetailModal', NoticeDetailModal) // 공지사항 상세
  app.component('SwapToKstar', SwapToKstar) // KSTAR로 스왑
  app.component('SwapPresale', SwapPresale) // 사전판매용 스왑
  app.component('VueCountdown', VueCountdown) // 사전판매 상세 타임카운터
  app.component('UserDetailModal', UserDetailModal) // 사용자 상세
  app.component('HolderListModal', HolderListModal) // 홀더 목록
  app.component('ExhibitionTypeModal', ExhibitionTypeModal) // 전시관 목록 모달
  app.component('MediaDetailModal', MediaDetailModal) // 작품 상세 모달
  app.component('FaqDetailModal', FaqDetailModal) // 작품 상세 모달
  app.component('SettleOutHistoryModal', SettleOutHistoryModal) // 정산 내역 조회 모달
  app.component('MediaSaleModifyModal', MediaSaleModifyModal) // 출금 등록 모달
})
