
const routes = [
  // Index.vue created 에서 APP 이면 /app 으로, WEB 이면 /web 으로 이동
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login/Login.vue') },
    ]
  },
  {
    path: '/payment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/payment/Payment.vue') },
      { path: 'paymentCallback', component: () => import('pages/payment/PaymentCallback.vue') },
    ]
  },
  {
    path: '/paymentMobile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/payment/PaymentMobile.vue') },
      { path: 'paymentCallback', component: () => import('pages/payment/PaymentCallback.vue') },
    ]
  },
  {
    path: '/introduction',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/introduction/Introduction.vue') },
    ]
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/notice/NoticeList.vue') },
      { path: 'register', component: () => import('pages/notice/Register.vue') },
      { path: 'modify', component: () => import('pages/notice/Modify.vue') },
    ]
  },
  {
    path: '/faq',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'register', component: () => import('pages/faq/Register.vue') },
      { path: 'modify', component: () => import('pages/faq/Modify.vue') },
    ]
  },
  {
    path: '/inquiry',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/inquiry/InquiryList.vue') },
      { path: 'register', component: () => import('src/pages/inquiry/RegisterInquiry.vue') },
    ]
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'twitter', component: () => import('src/pages/test/TestTwitter.vue') },
      { path: 'ipfs', component: () => import('src/pages/test/TestIPFS.vue') },
      { path: 'tag', component: () => import('src/pages/test/TestTag.vue') },
      // { path: 'home', component: () => import('pages/Index.vue') },
    ]
  },

  // {
  //   path: '/',
  //   component: () => import('layouts/EmptyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') },
  //   ]
  // },

  // project info
  {
    path: '/i',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/exhibition/Detail.vue') },
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      // { path: 'loginApp', component: () => import('pages/app/LoginApp.vue') },
      { path: '', component: () => import('pages/app/LoginApp.vue') },
      { path: 'kakaoLoginRedirect', component: () => import('pages/app/KakaoLoginRedirect.vue') },
    ]
  },
  {
    path: '/web',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
      // { path: 'home', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/mypage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'MyExhibition', component: () => import('src/pages/mypage/MyPageExhibition.vue') },
      { path: 'MyFeedback', component: () => import('src/pages/mypage/MyPageFeedback.vue') },
      { path: 'MyPrivacy', component: () => import('src/pages/mypage/MyPagePrivacy.vue') },
      { path: 'MySale', component: () => import('src/pages/mypage/MyPageSale.vue') },
    ]
  },
  {
    path: '/join',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/join/Join.vue') },
    ]
  },
  {
    path: '/alarm',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/alarm/AlarmList.vue') },
    ]
  },
  {
    path: '/exhibition',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/exhibition/ProjectList.vue') },
      { path: 'detail', component: () => import('src/pages/exhibition/Detail.vue') },
    ]
  },
  {
    path: '/media',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/media/MediaList.vue') },
      { path: 'registerMedia', component: () => import('src/pages/media/RegisterMedia.vue') },
      { path: 'modifyMedia', component: () => import('src/pages/media/ModifyMedia.vue') },
    ]
  },
  {
    path: '/project',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('src/pages/project/SelectType.vue') },
      { path: '', component: () => import('pages/project/RegisterProject.vue') },
      { path: 'selectPlatform', component: () => import('src/pages/project/SelectPlatform.vue') },
      { path: 'instagramList', component: () => import('pages/project/InstagramList.vue') },
      { path: 'youtubeList', component: () => import('pages/project/YoutubeList.vue') },
      { path: 'myProjectList', component: () => import('pages/project/MyProjectList.vue') },
      // { path: 'registerProject', component: () => import('pages/project/RegisterProject.vue') },
      { path: 'registerProjectInstagram', component: () => import('pages/project/RegisterProjectInstagram.vue') },
      { path: 'modifyProject', component: () => import('pages/project/ModifyProject.vue') },
    ]
  },
  {
    path: '/callback',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'instagramLoginRedirect', component: () => import('pages/callback/InstagramLoginRedirect.vue') },
    ]
  },
  {
    path: '/introduction',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/introduction/Introduction.vue') },
    ]
  },
  {
    path: '/contact',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/contact/Contact.vue') },
    ]
  },
  {
    path: '/import',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/import/Import.vue') },
      { path: 'importInstagram', component: () => import('pages/import/ImportInstagram.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'adminUserList', component: () => import('pages/admin/AdminUserList.vue') },
      { path: 'adminMaintenance', component: () => import('pages/admin/AdminMaintenance.vue') },
      { path: 'adminMyList', component: () => import('pages/admin/AdminMyList.vue') },
      { path: 'adminDescription', component: () => import('pages/admin/AdminDescription.vue') },
      { path: 'adminManageToken', component: () => import('src/pages/admin/AdminManageToken.vue') },
      { path: 'adminMediaSale', component: () => import('src/pages/admin/AdminMediaSaleList.vue') },
      { path: 'adminMediaSaleRegister', component: () => import('src/pages/admin/AdminMediaSaleRegister.vue') },
      { path: 'adminCollectionRequest', component: () => import('src/pages/admin/AdminCollectionRequestList.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
      { path: 'privacy', component: () => import('pages/terms/Privacy.vue') },
      { path: 'terms', component: () => import('pages/terms/Terms.vue') },
      { path: 'delete', component: () => import('pages/delete/DeleteUser.vue') },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    // component: () => import('layouts/MainLayout.vue'),
    component: () => import('pages/Error404.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Error404.vue') },
    // ]
  }
]

export default routes
