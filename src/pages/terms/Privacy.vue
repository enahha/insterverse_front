<template>
  <q-page class="q-pa-md page-default">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('personal_information_processing_policy') }}
      </div>
    </div>
    <div class="row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('personal_information_processing_policy_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <font size="1">
      <div v-if="locale === 'ko-KR'">
        <br />개인정보 수집 및 이용 동의(필수)
        <br />
        <br />개인정보처리방침
        <br />
        <br />[차례]
        <br />1. 총칙
        <br />2. 개인정보 수집에 대한 동의
        <br />3. 개인정보의 수집 및 이용목적
        <br />4. 수집하는 개인정보 항목
        <br />5. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
        <br />6. 목적 외 사용 및 제3자에 대한 제공
        <br />7. 개인정보의 열람 및 정정
        <br />8. 개인정보 수집, 이용, 제공에 대한 동의철회
        <br />9. 개인정보의 보유 및 이용기간
        <br />10. 개인정보의 파기절차 및 방법
        <br />11. 아동의 개인정보 보호
        <br />12. 개인정보 보호를 위한 기술적 대책
        <br />13. 개인정보의 위탁처리
        <br />14. 의겸수렴 및 불만처리
        <br />15. 부 칙(시행일) 
        <br />
        <br />1. 총칙
        <br />
        <br />주식회사 스타(이하 회사)의 galleryx.io(이하 사이트)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        <br />
        <br />본 회사 사이트는 회원의 개인정보보호를 소중하게 생각하고, 회원의 개인정보를 보호하기 위하여 항상 최선을 다해 노력하고 있습니다. 
        <br />1) 회사는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 비롯한 모든 개인정보보호 관련 법률규정을 준수하고 있으며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
        <br />2) 회사는 「개인정보처리방침」을 제정하여 이를 준수하고 있으며, 이를 인터넷사이트 및 모바일 어플리케이션에 공개하여 이용자가 언제나 용이하게 열람할 수 있도록 하고 있습니다.
        <br />3) 회사는 「개인정보처리방침」을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
        <br />4) 회사는 「개인정보처리방침」을 홈페이지 첫 화면 하단에 공개함으로써 귀하께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다.
        <br />5) 회사는  「개인정보처리방침」을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
        <br />
        <br />2. 개인정보 수집에 대한 동의
        <br />
        <br />귀하께서 본 사이트의 개인정보보호방침 또는 이용약관의 내용에 대해 「동의 한다」버튼 또는 「동의하지 않는다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의 한다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.
        <br />
        <br />3. 개인정보의 수집 및 이용목적
        <br />
        <br />본 사이트는 다음과 같은 목적을 위하여 개인정보를 수집하고 있습니다.
        <br />서비스 제공을 위한 계약의 성립 : 본인식별 및 본인의사 확인 등
        <br />서비스의 이행 : 상품배송 및 대금결제
        <br />회원 관리 : 회원제 서비스 이용에 따른 본인확인, 개인 식별, 연령확인, 불만처리 등 민원처리
        <br />기타 새로운 서비스, 신상품이나 이벤트 정보 안내
        <br />단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 등)는 수집하지 않습니다.
        <br />
        <br />4. 수집하는 개인정보 항목
        <br />
        <br />본 사이트는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다. 
        <br />1) 개인정보 수집방법 : 홈페이지(회원가입)
        <br />2) 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 전화번호 , 주소 , 휴대전화번호 , 이메일 , 주민등록번호 , 접속 로그 , 접속 IP 정보 , 결제기록
        <br />
        <br />
        <br />5. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
        <br />
        <br />본 사이트는 귀하에 대한 정보를 저장하고 수시로 찾아내는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트가 귀하의 컴퓨터 브라우저(넷스케이프, 인터넷 익스플로러 등)로 전송하는 소량의 정보입니다. 귀하께서 웹사이트에 접속을 하면 본 사이트의 컴퓨터는 귀하의 브라우저에 있는 쿠키의 내용을 읽고, 귀하의 추가정보를 귀하의 컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력 없이 서비스를 제공할 수 있습니다.
        <br />1) 쿠키는 귀하의 컴퓨터는 식별하지만 귀하를 개인적으로 식별하지는 않습니다. 또한 귀하는 쿠키에 대한 선택권이 있습니다. 웹브라우저의 옵션을 조정함으로써 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할 수 있는 선택권을 가질 수 있습니다.
        <br />2) 쿠키 등 사용 목적 : 이용자의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공
        <br />3) 쿠키 설정 거부 방법 : 쿠키 설정을 거부하는 방법으로는 귀하가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 설정방법 예시 : 인터넷 익스플로어의 경우 → 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보
        <br />단, 귀하께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.
        <br />
        <br />6 목적 외 사용 및 제3자에 대한 제공
        <br />
        <br />본 사이트는 귀하의 개인정보를 "개인정보의 수집목적 및 이용목적"에서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타 기업·기관에 제공하지 않습니다.
        <br />그러나 보다 나은 서비스 제공을 위하여 귀하의 개인정보를 회사 자회사 또는 제휴사에게 제공하거나, 회사 자회사 또는 제휴사와 공유할 수 있습니다. 개인정보를 제공하거나 공유할 경우에는 사전에 귀하께 회사 자회사 그리고 제휴사가 누구인지, 제공 또는 공유되는 개인정보항목이 무엇인지, 왜 그러한 개인정보가 제공되거나 공유되어야 하는지, 그리고 언제까지 어떻게 보호·관리되는지에 대해 개별적으로 전자우편 및 서면을 통해 고지하여 동의를 구하는 절차를 거치게 되며, 귀하께서 동의하지 않는 경우에는 회사 자회사 그리고 제휴사에게 제공하거나 공유하지 않습니다. 또한 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으나, 아래의 경우에는 예외로 합니다.
        <br />1) 이용자들이 사전에 동의한 경우
        <br />2) 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
        <br />
        <br />7. 개인정보의 열람 및 정정
        <br />
        <br />귀하는 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다. 개인정보 열람 및 정정을 하고자 할 경우에는 "회원정보수정"을 클릭하여 직접 열람 또는 정정하거나, 개인정보 최고관리책임자에게 E-mail로 연락하시면 조치하겠습니다.
        <br />귀하가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 당해 개인정보를 이용하지 않습니다.
        <br />
        <br />8. 개인정보 수집, 이용, 제공에 대한 동의철회
        <br />
        <br />회원가입 등을 통해 개인정보의 수집, 이용, 제공에 대해 귀하께서 동의하신 내용을 귀하는 언제든지 철회하실 수 있습니다. 동의철회는 "마이페이지"의 "회원탈퇴(동의철회)"를 클릭하거나 개인정보관리책임자에게 E-mail등으로 연락하시면 즉시 개인정보의 삭제 등 필요한 조치를 하겠습니다.
        <br />본 사이트는 개인정보의 수집에 대한 회원탈퇴(동의철회)를 개인정보 수집시와 동등한 방법 및 절차로 행사할 수 있도록 필요한 조치를 하겠습니다.
        <br />
        <br />9. 개인정보의 보유 및 이용기간
        <br />
        <br />원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
        <br />1) 보존 항목 : 회원가입정보(로그인ID, 이름, 별명)
        <br />2) 보존 근거 : 회원 탈퇴 시 다른 회원이 기존 회원아이디로 재가입하여 활동하지 못하도록 하기 위함
        <br />3) 보존 기간 : 영구
        <br />그리고 상법 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 거래 및 회원정보를 보관합니다.
        <br />⚪보존 항목 : 계약 또는 청약철회 기록, 대금 결제 및 재화공급 기록, 불만 또는 분쟁처리 기록
        <br />⚪보존 근거 : 전자상거래등에서의 소비자보호에 관한 법률 제6조 거래기록의 보존
        <br />⚪보존 기간 : 계약 또는 청약철회 기록(5년), 대금 결제 및 재화공급 기록(5년), 불만 또는 분쟁처리 기록(3년), 위 보유기간에도 불구하고 계속 보유하여야 할 필요가 있을 경우에는 귀하의 동의를 받겠습니다.
        <br />⚪회원이 1년간 서비스 이용기록이 없는 경우[정보통신망 이용촉진 및 정보보호 등에 관한 법률] 제 29조 '개인정보 유효 기간제'에 따라 회원에게 사전 통지하고 별도로 분리하여 저장합니다. 
        <br />4) 개인정보의 국외 보관에 대한 내용
        <br /> 회사는 이용자로부터 취득 또는 생성한 개인정보를 미리내가 보유하고 있는 데이터베이스 (물리적보관소: 한국)에 저장합니다. 미리내는 해당 서버의 물리적인 관리만을 행하고, 원칙적으로 회원님의 개인정보에 접근하지 않습니다. 
        <br />
        <br />
        <br />⚪이전항목: 서비스 이용기록 또는 수집된 개인정보
        <br />⚪이전국가: 한국
        <br />⚪이전일시 및 방법: 전산 서버 수탁계약 이후 서비스 이용 시점에 네트워크를 통한 전송
        <br />⚪개인정보 보유 및 이용기간: 회원탈퇴시 혹은 위탁계약 종료시까지 
        <br />
        <br />10. 개인정보의 파기절차 및 방법
        <br />
        <br />본 사이트는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
        <br />파기절차 : 귀하가 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
        <br />파기방법 : 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
        <br />
        <br />11. 아동의 개인정보 보호
        <br />
        <br />본 사이트는 만14세 미만 아동의 개인정보를 수집하는 경우 법정대리인의 동의를 받습니다.
        <br />만14세 미만 아동의 법정대리인은 아동의 개인정보의 열람, 정정, 동의철회를 요청할 수 있으며, 이러한 요청이 있을 경우 본 사이트는 지체 없이 필요한 조치를 취합니다.
        <br />
        <br />12. 개인정보 보호를 위한 기술적 대책
        <br />
        <br />본 사이트는 귀하의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
        <br />귀하의 개인정보는 비밀번호에 의해 보호되며, 파일 및 전송 데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.
        <br />본 사이트는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다.
        <br />해킹 등에 의해 귀하의 개인정보가 유출되는 것을 방지하기 위해, 외부로부터의 침입을 차단하는 장치를 이용하고 있습니다.
        <br />
        <br />13. 개인정보의 위탁처리본 사이트는 서비스 향상을 위해서 귀하의 개인정보를 외부에 위탁하여 처리할 수 있습니다.
        <br />
        <br />개인정보의 처리를 위탁하는 경우에는 미리 그 사실을 귀하에게 고지하겠습니다.
        <br />개인정보의 처리를 위탁하는 경우에는 위탁계약 등을 통하여 서비스제공자의 개인정보보호 관련 지시 엄수, 개인정보에 관한 비밀유지, 제3자 제공의 금지 및 사고시의 책임부담 등을 명확히 규정하고 당해 계약내용을 서면 또는 전자적으로 보관하겠습니다.
        <br />
        <br />14. 의견수렴 및 불만처리
        <br />본 사이트는 개인정보보호와 관련하여 귀하가 의견과 불만을 제기할 수 있는 창구를 개설하고 있습니다. 개인정보와 관련한 불만이 있으신 분은 본 사이트의 개인정보 최고 관리책임자에게 의견을 주시면 접수 즉시 조치하여 처리결과를 통보해 드립니다.
        <br />1) 개인정보 최고 관리책임자는 회사의 대표가 직접 맡아서 개인정보에 대한 강조를 하고 있습니다. 개인정보를 보호하고 유출을 방지하는 책임자로서 이용자가 안심하고 회사가 제공하는 서비스를 이용할 수 있도록 도와드리며, 개인정보를 보호하는데 있어 이용자에게 고지한 사항들에 반하여 사고가 발생할 시에는 이에 관한 책임을 집니다.
        <br />2) 기술적인 보완조치를 취하였음에도 불구하고 악의적인 해킹 등 기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한 정보의 훼손 및 멸실, 이용자가 작성한 게시물에 의한 각종 분쟁 등에 관해서는, 본 사이트 회사는 책임이 없습니다.
        <br />3) 회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률에서 규정한 관리책임자를 다음과 같이 지정합니다.
        <br />개인정보 최고 관리책임자 성명 : 안영대
        <br />전화번호 : 01093941941
        <br />이메일 : contact@starinc.io
        <br />
        <br />또는 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
        <br />개인분쟁조정위원회 (www.1336.or.kr / 1336)
        <br />정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)
        <br />대검찰청 인터넷범죄수사센터 (icic.sppo.go.kr / 02-3480-3600)
        <br />경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)
        <br />
        <br />15. 부 칙(시행일) 
        <br />
        <br />현 개인정보처리방침은 2023년 2월 9일에 제정되었으며, 정부 및 회사의 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 경우에는 개정 최소 7일 전부터 ‘공지사항’란을 통해 고지하며, 본 정책은 시행 일자에 시행됩니다.
        <br />이 개인정보처리방침은 2023년 2월 14일 부터 적용됩니다.
      </div>
      <div v-else>
        <br />Consent to collect and use personal information (required)
        <br />
        <br />Personal information processing policy.
        <br />
        <br />[Time]
        <br />1. General rules.
        <br />2. Consent to the collection of personal information.
        <br />3. Purpose of collecting and using personal information.
        <br />4. Personal information items to be collected.
        <br />5. Matters concerning the installation and operation of an automatic personal information collection device and its refusal.
        <br />6. Use outside of purpose and provision to a third party.
        <br />7. Reading and correcting personal information.
        <br />8. Withdrawal of consent to collect, use, and provide personal information.
        <br />9. Period of retention and use of personal information.
        <br />10. Procedures and methods for destroying personal information.
        <br />11. Protection of children's personal information.
        <br />12. Technical measures to protect personal information.
        <br />13. Consignment processing of personal information.
        <br />14. Collecting righteousness and handling complaints.
        <br />15. Addendum (Enforcement Date)
        <br />
        <br />1. General rules.
        <br />
        <br />Star Inc.'s galleryx.io (hereinafter referred to as the site) establishes and discloses personal information processing policies as follows in order to protect the personal information of the data subject and to quickly and smoothly handle related grievances in accordance with Article 30 of the Personal Information Protection Act.
        <br />
        <br />This company site values the protection of members' personal information and always tries its best to protect members' personal information.
        <br />1) The company complies with all personal information protection-related laws, including the Information and Communication Network Utilization and Information Protection Act, and is doing its best to protect the rights and interests of users by establishing personal information processing policies under related laws.
        <br />2) The company has enacted and complies with the Personal Information Processing Policy, which is disclosed on Internet sites and mobile applications so that users can always easily access it.
        <br />3) Through the Personal Information Processing Policy, the company will inform you of the purpose and method of using the personal information you provide and what measures are being taken to protect your personal information.
        <br />4) The company is taking measures to make it easy for you to see at all times by releasing the Personal Information Processing Policy at the bottom of the first screen of the website.
        <br />5) If the company revises the Personal Information Processing Policy, it will announce it through the website notice (or individual notice).
        <br />
        <br />2. Consent to the collection of personal information.
        <br />
        <br />If you click the "I agree" button or the "I disagree" button on the contents of the privacy policy or terms and conditions of use of this site, and click the "I agree" button, it is deemed that you have agreed to collect personal information.
        <br />
        <br />3. Purpose of collecting and using personal information.
        <br />
        <br />This site collects personal information for the following purposes.
        <br />Establishment of a contract for service provision: identification of the person and confirmation of the person's intention, etc.
        <br />Implementation of services: Product delivery and payment.
        <br />Member management: handling complaints such as identification, personal identification, age verification, and complaint handling according to the use of membership services.
        <br />Information on new services, new products, and events.
        <br />However, we do not collect sensitive personal information (race and ethnicity, thoughts and creed, origin and hometown, political orientation and criminal records, health status, etc.) that may violate basic human rights of users.
        <br />
        <br />4. Personal information items to be collected.
        <br />
        <br />This site collects the following personal information for membership, counseling, and service application.
        <br />1) How to collect personal information: Homepage (member registration)
        <br />2) Collection items: name, date of birth, gender, login ID, password, phone number, address, mobile phone number, e-mail, resident registration number, access log, access IP information, payment record.
        <br />
        <br />
        <br />5. Matters concerning the installation and operation of an automatic personal information collection device and its refusal.
        <br />
        <br />This site uses "cookie" that stores information about you and finds them from time to time. Cookies are a small amount of information that the website sends to your computer browser (Netscape, Internet Explorer, etc.). Once you access the website, the computer on this site can read the contents of the cookies in your browser, locate your additional information on your computer, and provide the service without additional input, such as the name of the access.
        <br />1) Cookies identify your computer, but do not personally identify you. You also have a choice about cookies. By adjusting the options on your web browser, you can have the option of accepting all cookies, sending a notification when they are installed, or rejecting all cookies.
        <br />2) Purpose of use such as cookies: Target marketing and personalized services are provided by analyzing the user's access frequency and visit time, identifying and tracking the user's taste and interests, and identifying the degree of participation in various events and visits.
        <br />3) How to reject cookie settings: By choosing the option of your web browser, you can allow all cookies, go through confirmation every time you save cookies, or refuse to save all cookies. Example of how to set up: In the case of Internet Explorer, → Tools at the top of the web browser > Internet Options > Personal Information
        <br />However, if you refuse to install cookies, there may be difficulties in providing services.
        <br />
        <br />6 Use outside of purpose and provision to a third party.
        <br />
        <br />This site uses your personal information within the scope notified by "Personal Information Collection Purpose and Use Purpose" and does not use it beyond the same range or provide it to others or other companies or institutions.
        <br />However, in order to provide better service, you can provide your personal information to your subsidiary or affiliate, or share it with your subsidiary or affiliate. If you provide or share personal information, you will be notified individually through e-mail and written notice of who the company subsidiaries and affiliates are, what personal information should be provided or shared, and how long such personal information is protected and managed, and if you disagree, you will not provide or share it. In addition, the user's personal information is not provided to the outside in principle, but exceptions are made in the following cases.
        <br />1) If the users have agreed in advance,
        <br />2) In a case where there is a request from an investigative agency in accordance with the provisions of the statutes or in accordance with the procedures and methods prescribed in the statutes for investigative
        <br />
        <br />7. Reading and correcting personal information.
        <br />
        <br />You can view or correct your registered personal information at any time. If you want to view and correct your personal information, click "Modify Member Information" to directly view or correct it, or contact the personal information chief manager via e-mail.
        <br />If you request correction of an error in personal information, do not use the personal information until the correction is completed.
        <br />
        <br />8. Withdrawal of consent to collect, use, and provide personal information.
        <br />
        <br />You can withdraw your consent to the collection, use, and provision of personal information through membership registration at any time. For withdrawal of consent, click on "withdrawal of membership" on "My Page" or contact the person in charge of personal information management by e-mail, and we will immediately take necessary measures such as deleting personal information.
        <br />This site will take necessary measures so that membership withdrawal (withdrawal of consent) for the collection of personal information can be exercised in the same way and procedure as when collecting personal information.
        <br />
        <br />9. Period of retention and use of personal information.
        <br />
        <br />In principle, after the purpose of collecting and using personal information is achieved, the information is destroyed without delay. However, the following information is preserved for the period specified for the following reasons.
        <br />1) Preservation item: membership information (login ID, name, nickname)
        <br />2) Evidence for preservation: To prevent other members from re-subscribing with their existing membership ID when withdrawing from membership.
        <br />3) Preservation period: Permanently
        <br />In addition, if it is necessary to preserve it in accordance with the provisions of related laws such as the Commercial Act, the company stores transactions and member information for a certain period prescribed by the relevant laws and regulations as follows.
        <br />⚪ Preservation items: records of withdrawal of contracts or subscriptions, records of payment and supply of goods, records of complaints or disputes.
        <br />⚪ grounds for preservation: preservation of transaction records under Article 6 of the Consumer Protection Act on e-commerce, etc.
        <br />⚪ Preservation Period: We will obtain your consent if we need to keep the contract or subscription withdrawal record (5 years), payment and goods supply record (5 years), complaint or dispute settlement record (3 years), and retention period.
        <br />If a member of ⚪ does not have a one-year service usage record, he/she shall notify the member in advance and store it separately pursuant to Article 29 of the "Personal Information Validity Period" of the Act on Promotion of Information and Communication Network Utilization.
        <br />4) Contents of the storage of personal information abroad.
        <br />The company stores personal information acquired or generated from users in my database (physical archive: Korea) in advance. Mirinae only manages the server physically, and in principle does not access your personal information.
        <br />
        <br />
        <br />⚪ Previous Item: Service usage records or collected personal information
        <br />⚪ Previous country: Korea
        <br />Date and method before ⚪: Transmission through the network at the time of service use after the computer server consignment contract.
        <br />⚪ Period of retention and use of personal information: until the withdrawal of membership or the termination of the consignment contract.
        <br />
        <br />10. Procedures and methods for destroying personal information.
        <br />
        <br />In principle, this site will destroy the information without delay after the purpose of collecting and using personal information is achieved. The procedure and method of destruction are as follows.
        <br />Destruction Procedure: The information you entered for membership registration, etc., will be transferred to a separate DB (separate document box in case of paper) and will be destroyed after being stored for a certain period of time according to internal policy and other relevant laws. Personal information transferred to a separate DB is not used for any purpose other than being held unless it is legal.
        <br />Destruction Method: Delete personal information stored in the form of an electronic file using a technical method that cannot play records.
        <br />
        <br />11. Protection of children's personal information.
        <br />
        <br />This site obtains consent from a legal representative when collecting personal information of children under the age of 14.
        <br />Legal representatives of children under the age of 14 may request the access, correction, or withdraw consent of their personal information, and if such requests are made, the site will take necessary measures without delay.
        <br />
        <br />12. Technical measures to protect personal information.
        <br />
        <br />The site is seeking the following technical measures to ensure safety so that personal information is not lost, stolen, leaked, altered or damaged in handling your personal information.
        <br />Your personal information is protected by a password, and sensitive data is protected by encryption of files and transport data or by using the File Lock function (Lock).
        <br />This site is taking measures to prevent damage caused by computer viruses using vaccine programs. Vaccine programs are updated periodically and provide vaccines as soon as they appear in the event of a sudden virus to prevent personal information from being violated.
        <br />To prevent the leakage of your personal information by hacking, we are using a device that blocks intrusion from outside.
        <br />
        <br />13. Consignment processing of personal information This site can entrust and process your personal information to the outside to improve the service.
        <br />
        <br />If we entrust the processing of personal information, we will notify you in advance.
        <br />In the case of entrusting the processing of personal information, the service provider's strict instructions on personal information protection, confidentiality of personal information, prohibition of providing third parties, and responsibility for accidents will be clearly defined and kept in writing or electronically.
        <br />
        <br />14. Collecting opinions and handling complaints.
        <br />This site is opening a window for you to raise opinions and complaints regarding personal information protection. If you have any complaints about personal information, please give your opinion to the personal information chief of this site and we will take action immediately after receiving it and notify you of the processing results.
        <br />1) The CEO of the company is in charge of personal information management and emphasizes personal information. As a person in charge of protecting personal information and preventing leakage, we will help users use the services provided by the company with confidence, and take responsibility for any accidents against the notifications made to users in protecting personal information.
        <br />2) Despite technical supplementary measures, the site company is not responsible for damage and loss of information caused by unexpected accidents caused by basic network risks such as malicious hacking, and various disputes caused by posts written by users.
        <br />3) The company designates the management manager stipulated in the Act on Promotion of Information and Communication Network Utilization and Information Protection as follows.
        <br />Name of Chief Executive Officer of Personal Information: Ahn Youngdae
        <br />Phone number: 01093941941
        <br />Email: contact@starinc.io
        <br />
        <br />Or, if you need a report or consultation on personal information infringement, please contact the institution below.
        <br />Personal Dispute Mediation Committee (www.1336.or.kr / 1336)
        <br />Information Protection Mark Certification Committee (www.eprivacy.or.kr / 02-580-0533~4)
        <br />Supreme Prosecutors' Office Internet Crime Investigation Center (icic.sppo.go.kr / 02-3480-3600)
        <br />National Police Agency Cyber Terrorism Response Center (www.ctrc.go.kr / 02-392-0330)
        <br />
        <br />15. Addendum (Enforcement Date)
        <br />
        <br />The current personal information processing policy was enacted on February 9, 2023, and if there is addition, deletion, or modification of the contents due to changes in government and company policies or security technologies, it will be notified through the "Notice" section at least seven days before the revision.
        <br />This personal information processing policy will take effect on February 14, 2023.
      </div>
    </font>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Create',
  data () {
    return {
      key: '', // 결제창 호출시 상점 파라미터(merchantData)로 설정한 값 중의 key의 value
    }
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
    }
  },
  components: {
  },
  computed: {
  },
  created: function () {
  },
  mounted: function () {},
  methods: {
  },
})
</script>

<style scoped>
</style>
