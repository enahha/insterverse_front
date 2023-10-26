<template>
  <div class="row justify-center project-detail-header">
    <div class="col-12 q-pb-xs">
      <!-- <div class="row flex flex-center"> -->
      <!-- <div class="row justify justify-between q-pt-sm"> -->
      <div class="row justify justify-between q-pt-sm">
        <div class="row flex flex-center">
          <div class="row flex flex-center">
            <div class="col">
              <table border="0" width="100%" style="margin: 0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td>
                    <div class="text-right q-pl-sm">
                      <q-avatar size="md">
                        <img v-if="projectVo.logo_image" :src="projectVo.logo_image">
                        <q-icon v-else name="rocket_launch" size="md" />
                      </q-avatar>
                    </div>
                  </td>
                  <td width="100%">
                    <div class="text-h6 q-pl-sm" style="word-break: break-word;">
                      <div v-if="locale === 'ko-KR'">
                        {{ projectVo.title_ko }}
                      </div>
                      <div v-else class="col-12">
                        {{ projectVo.title }}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="q-pl-sm">
          <div class="row flex flex-center">
            <!-- <div v-if="popupYn !== 'y'"> -->
            <div>
              <q-btn flat round dense icon="arrow_back" color="black" icon-left="true" @click="goBack" />
            </div>
            <div v-if="getUid === projectVo.reg_id" class="col flex flex-center">
              <q-btn flat round dense icon="edit" size="md" color="primary" icon-right="true" @click="goModify" />
            </div>
            <div v-if="getUid === projectVo.reg_id" class="col">
              <q-btn flat round dense icon="delete" size="md" color="primary" icon-right="true" @click="deleteProject" />
            </div>
            <div class="col">
              <q-btn flat round dense icon="share" size="md" color="black" icon-right="true" @click="shareUrlCopy(projectVo.seq)" />
            </div>
            <div class="q-pl-md q-pr-sm">
              <q-select
                v-if="popupYn === 'y'"
                v-model="locale"
                :options="localeOptions"
                dense
                borderless
                emit-value
                map-options
                style="width: 55px"
                @update:model-value="onChangeLocale"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Side Area -->
  <!-- <div :class="`page-side-bar project-type ${getRightDrawerOpen ? 'on' : ''}`"></div> -->
  <div v-if="smallSize">
    <div class="page-side-bar project-type">
      <div class="row">
        <q-avatar size="md">
          <img v-if="projectVo.logo_image" :src="projectVo.logo_image">
          <q-icon v-else name="rocket_launch" size="md" />
        </q-avatar>
      </div>
      <div class="row">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_title') }}</span>
        </div>
      </div>
      <div class="row q-pb-md">
        <div v-if="locale === 'ko-KR'" class="col-12 t-text">
          {{ projectVo.title_ko }}
        </div>
        <div v-else class="col-12 t-text">
          {{ projectVo.title }}
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_summary') }}</span>
        </div>
      </div>
      <div class="row">
        <div v-if="locale === 'ko-KR'" class="col-12 t-text">
          {{ projectVo.summary_ko }}
        </div>
        <div v-else class="col-12 t-text">
          {{ projectVo.summary }}
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <br />
          <q-btn class="btn" color="primary" text-color="black" size="lg" style="width: 100%;" no-caps @click="exhibition_enter">
            <b>{{ $t('exhibition_enter') }}</b>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <q-page-sticky position="top-right" :offset="[0, 0]">
      <div class="page-side-bar project-type">
        <div class="row">
          <q-avatar size="md">
            <img v-if="projectVo.logo_image" :src="projectVo.logo_image">
            <q-icon v-else name="rocket_launch" size="md" />
          </q-avatar>
        </div>
        <div class="row">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_title') }}</span>
          </div>
        </div>
        <div class="row q-pb-md">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            {{ projectVo.title_ko }}
          </div>
          <div v-else class="col-12 t-text">
            {{ projectVo.title }}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_summary') }}</span>
          </div>
        </div>
        <div class="row">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            {{ projectVo.summary_ko }}
          </div>
          <div v-else class="col-12 t-text">
            {{ projectVo.summary }}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <br />
            <q-btn class="btn" color="primary" text-color="black" size="lg" style="width: 100%;" no-caps @click="exhibition_enter">
              <b>{{ $t('exhibition_enter') }}</b>
            </q-btn>
          </div>
        </div>
      </div>
    </q-page-sticky>
  </div>

  <q-page class="page-default project-detail-wrap">
    <q-tabs
      v-model="tab"
      class="bg-grey-1 shadow-0"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="i" icon="info">&nbsp;&nbsp;{{ $t('information') }}</q-tab>
      <q-tab name="l" icon="link">&nbsp;&nbsp;{{ $t('link') }}</q-tab>
      <q-tab name="c" icon="chat">&nbsp;&nbsp;{{ $t('comment') }}</q-tab>
    </q-tabs>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="i" style="word-break: break-word;">
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_title') }}</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            {{ projectVo.title_ko }}
          </div>
          <div v-else class="col-12 t-text">
            {{ projectVo.title }}
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_summary') }}</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            {{ projectVo.summary_ko }}
          </div>
          <div v-else class="col-12 t-text">
            {{ projectVo.summary }}
          </div>
        </div>
        <div v-if="projectVo.description || projectVo.description_ko" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_description') }}</span>

          </div>
        </div>
        <div v-if="projectVo.description || projectVo.description_ko" class="q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="row q-pb-md q-pl-xs">
            <div class="col-12" v-html="projectVo.description_ko" />
          </div>
          <div v-else class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12" v-html="projectVo.description" />
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('mainnet') }}</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ projectVo.mainnet }}
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_type') }}</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ projectVo.type }}
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_wallet_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.wallet_address)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.wallet_address )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.wallet_address }}</a>
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_token_contract_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.token_contract_address)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.token_contract_address )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.token_contract_address }}</a>
          </div>
        </div>

        <!-- lp contract address 1 -->
        <div v-if="projectVo.lp_contract_address_1">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 1</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_1)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_1 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_1 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 2 -->
        <div v-if="projectVo.lp_contract_address_2">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 2</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_2)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_2 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_2 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 3 -->
        <div v-if="projectVo.lp_contract_address_3">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 3</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_3)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_3 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_3 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 4 -->
        <div v-if="projectVo.lp_contract_address_4">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 4</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_4)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_4 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_4 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 5 -->
        <div v-if="projectVo.lp_contract_address_5">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 5</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_5)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_5 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_5 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 6 -->
        <div v-if="projectVo.lp_contract_address_6">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 6</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_6)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_6 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_6 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 7 -->
        <div v-if="projectVo.lp_contract_address_7">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 7</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_7)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_7 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_7 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 8 -->
        <div v-if="projectVo.lp_contract_address_8">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 8</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_8)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_8 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_8 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 9 -->
        <div v-if="projectVo.lp_contract_address_9">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 9</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_9)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_9 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_9 }}</a>
            </div>
          </div>
        </div>
        <!-- lp contract address 10 -->
        <div v-if="projectVo.lp_contract_address_10">
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_lp_contract_address') }} 10</span>
              <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.lp_contract_address_10)">&nbsp;{{ $t('copy') }}</q-btn>

            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs t-stit">
            <div class="col-12">
              <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.lp_contract_address_10 )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.lp_contract_address_10 }}</a>
            </div>
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_contract_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.platform_contract_address)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.platform_contract_address )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.platform_contract_address }}</a>
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_contract_balance') }} ①</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ Number(platformContractBalance).toLocaleString() }} {{ symbol }}
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_deposit_balance') }} ②</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ Number(projectVo.platform_deposit_balance).toLocaleString() }} {{ symbol }}
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_yield') }} ③</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ Number(projectVo.platform_yield).toLocaleString() }} {{ symbol }}
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_total_balance') }} ( ① + ② + ③ )</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ (Number(platformContractBalance) + Number(projectVo.platform_total_balance)).toLocaleString() }} {{ symbol }}
          </div>
        </div>

        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>

      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 2. 링크 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="l" style="word-break: break-word;">
        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('platform_contract_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.platform_contract_address)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'project/' + projectVo.platform_contract_address)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.platform_contract_address }}</a>
          </div>
        </div> -->
        <div v-if="projectVo.official_website" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_official_website') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.official_website)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.official_website" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.official_website)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.official_website }}</a>
          </div>
        </div>
        <div v-if="projectVo.official_email" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_official_email') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.official_email)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.official_email" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a class="text-weight-bold">{{ projectVo.official_email }}</a>
          </div>
        </div>
        <div v-if="projectVo.docs" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_docs') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.docs)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.docs" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.docs)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.docs }}</a>
          </div>
        </div>
        <div v-if="projectVo.blog" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_blog') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.blog)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.blog" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.blog)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.blog }}</a>
          </div>
        </div>
        <div v-if="projectVo.medium" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_medium') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.medium)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.medium" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.medium)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.medium }}</a>
          </div>
        </div>
        <div v-if="projectVo.telegram" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_telegram') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.telegram)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.telegram" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.telegram)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.telegram }}</a>
          </div>
        </div>
        <div v-if="projectVo.twitter" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_twitter') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.twitter)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.twitter" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.twitter)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.twitter }}</a>
          </div>
        </div>
        <div v-if="projectVo.github" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_github') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.github)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.github" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.github)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.github }}</a>
          </div>
        </div>
        <div v-if="projectVo.meta" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_meta') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.meta)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.meta" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.meta)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.meta }}</a>
          </div>
        </div>
        <div v-if="projectVo.discord" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_discord') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.discord)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.discord" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(projectVo.discord)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.discord }}</a>
          </div>
        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 3. 댓글 패널 ※ infiniteScroll 이상동작으로 comment는 별도로 기술 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- <q-tab-panel name="comment">
        <div>
        </div>
      </q-tab-panel> -->
    </q-tab-panels>

    <!-- 댓글 리스트  -->
    <div v-if="tab === 'c'" class="col-12 justify-center q-pa-md comment-wrap">

      <div class="row">
        <div class="col-12">
          <q-input v-model="myContents" type="textarea" :placeholder="$t('enter_the_comment')" rows="2" outlined @keyup="countMyContentsLength" />
        </div>
      </div>

      <div class="row q-pt-sm q-pb-sm">
        <div class="col-6 text-left">
          &nbsp;&nbsp;&nbsp;{{ myContentsLength }} / 300
        </div>
        <div class="col-6 text-right">
          <q-btn size="md" color="black" style="height: 36px;" @click="insertProjectComment" outline>{{ $t('register') }}</q-btn>
        </div>
      </div>

      <!-- 프로젝트 댓글 리스트 -->
      <q-pull-to-refresh @refresh="refresher">
        <q-infinite-scroll @load="loadMore" :offset="100" ref="infiniteScroll">
          <div v-for="item in projectCommentList" :key="item.seq">

            <div :style="`padding-left: ${ item.group_layer * 20 }px`" v-if="item.visible_child" :class="`${ item.group_layer === 0 ? 'bg-white' : 'bg-grey-2'}`">
              <div class="row q-pt-md">
                <div class="col-8">
                  <table border="0" cellpadding="0" sellspacing="0" width="100%">
                    <tr>
                      <td rowspan="2" width="60" class="flex-bottom">
                        <q-avatar>
                          <!-- <img src="https://cdn.quasar.dev/img/avatar7.jpg"> -->
                          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                      </td>
                      <td><span class="text-body2">{{ item.reg_name }}</span></td>
                    </tr>
                    <tr>
                      <td><span class="text-caption text-grey-7">{{ item.reg_time }}</span></td>
                    </tr>
                  </table>
                </div>
                <div v-if="getUid && getUid === item.reg_id" class="col-4 text-right q-pt-md">
                  <!-- <span style="cursor: pointer;" @click="modifyComment(item)">{{ $t('modify') }}</span> -->
                  <q-btn icon="edit" @click="modifyComment(item)" flat dense />
                  &nbsp;&nbsp;
                  <!-- <span style="cursor: pointer;" @click="deleteComment(item.seq)">{{ $t('delete') }}</span> -->
                  <q-btn icon="delete" @click="deleteComment(item.seq)" flat dense />
                  &nbsp;&nbsp;
                </div>
              </div>
              <div class="row q-pt-sm" style="word-break: break-word;">
                <div class="col-12 text-body1">{{ item.contents }}</div>
              </div>
              <div class="row q-pt-sm q-pb-sm">
                <div class="col-4">
                  <span style="cursor: pointer; text-body2" @click="showReplyInput(item)">{{ $t('register_reply') }}</span>
                  <span v-if="item.group_layer === 0" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt1 }})</span>
                  <span v-if="item.group_layer === 1" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt2 }})</span>
                  <span v-if="item.group_layer === 2" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt3 }})</span>
                  <span v-if="item.group_layer === 3" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt4 }})</span>
                  <span v-if="item.group_layer === 4" style="cursor: pointer; text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt5 }})</span>
                  <span v-else></span>
                </div>
                <!-- <div class="col-4"></div> -->
                <div class="col-8 text-right">
                  <q-btn v-if="item.like_cd === 'Y'" icon="thumb_up_alt" @click="likeIt(item, 'YES')" flat dense size="sm" />
                  <q-btn v-else icon="thumb_up_off_alt" @click="likeIt(item, 'YES')" flat dense size="sm" />
                  &nbsp;{{ item.like_cnt }}
                  &nbsp;&nbsp;
                  <q-btn v-if="item.like_cd === 'N'" icon="thumb_down_alt" @click="likeIt(item, 'NO')" flat dense size="sm" />
                  <q-btn v-else icon="thumb_down_off_alt" @click="likeIt(item, 'NO')" flat dense size="sm" />
                  &nbsp;{{ item.dislike_cnt }}
                  &nbsp;&nbsp;
                  <!-- ### {{ item.group_order }} ### {{ item.group_layer }} -->
                </div>
              </div>

              <div v-if="item.visible_reply_input" class="row q-pt-sm q-pb-sm">
                <div class="col-12">
                  <q-input v-model="myReply" type="textarea" :placeholder="$t('enter_the_reply')" rows="2" outlined @keyup="countMyReplyLength" />
                </div>

                <div class="col-6 text-left q-pt-sm">
                  &nbsp;&nbsp;&nbsp;{{ myReplyLength }} / 300
                </div>
                <div class="col-6 text-right q-pt-sm">
                  <q-btn size="md" color="black" style="height: 36px;" @click="insertProjectCommentReply(item)" outline>{{ $t('register') }}</q-btn>
                </div>
              </div>

            </div>

          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>

      <!-- place QPageScroller at end of page -->
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>

    </div>

    <div v-if="noDataFlag && tab === 'c'" class="row justify-center">
      <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <q-dialog v-model="confirmDeleteCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmModifyCommentModal">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <q-input v-model="modifyCommentValue" type="textarea" :placeholder="$t('enter_the_comment')" rows="7" outlined />
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('modify')" color="black" v-close-popup @click="doModifyCommennt" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmDeleteProject">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('delete')" color="black" v-close-popup @click="doDeleteProject" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <WalletModal ref="refWalletModal" />
  <IframeModal ref="refIframeModal" />

</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useMeta } from 'quasar'
// import { createMetaMixin } from 'quasar'

// const metaData = {
//   // sets document title
//   title: 'Index Page',
//   // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
//   titleTemplate: title => `${title} - My Website`,

//   // meta tags
//   meta: {
//     description: { name: 'description', content: 'Page 1' },
//     keywords: { name: 'keywords', content: 'Quasar website' },
//     equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
//     // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
//     ogTitle:  {
//       property: 'og:title',
//       // optional; similar to titleTemplate, but allows templating with other meta properties
//       template (ogTitle) {
//         return `${ogTitle} - My Website`
//       }
//     }
//   },

//   // CSS tags
//   link: {
//     material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
//   },

//   // JS tags
//   script: {
//     ldJson: {
//       type: 'application/ld+json',
//       innerHTML: `{ "@context": "http://schema.org" }`
//     }
//   },

//   // <html> attributes
//   htmlAttr: {
//     'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">
//     empty: undefined // generates <html empty>
//   },

//   // <body> attributes
//   bodyAttr: {
//     'action-scope': 'xyz', // generates <body action-scope="xyz">
//     empty: undefined // generates <body empty>
//   },

//   // <noscript> tags
//   noscript: {
//     default: 'This is content for browsers with no JS (or disabled JS)'
//   }
// }

export default defineComponent({
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'EN' },
        { value: 'ko-KR', label: 'KO' },
      ],
    }
  },
  // setup () {
  //   // needs to be called in setup()
  //   useMeta(metaData)
  // },
  // mixins: [
  //   createMetaMixin(metaData)
  // ],
  // Open Graph 정보 설정 - 공유 링크 복사 - 붙여넣기 하면 하기 정보가 표시됨
  // mixins: [
  //   createMetaMixin(function () {

  //     const ogUrlString = 'https://klaystar.com/info?seq=' + this.projectVo.seq + '&tab=' + this.tab

  //     // meta tags
  //     const metaInfo = {
  //       ogUrl: {
  //         property: 'og:url',
  //         // name: 'description',
  //         // content: window.location.href,
  //         content: ogUrlString,
  //       },
  //       ogDescription: {
  //         property: 'og:description',
  //         // name: 'description',
  //         content: this.projectVo.summary,
  //       },
  //       ogImage: {
  //         property: 'og:image',
  //         content: this.projectVo.logo_image,
  //       },
  //       // keywords: { name: 'keywords', content: 'Quasar website' },
  //       // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  //       // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
  //       ogTitle:  {
  //         property: 'og:title',
  //         content: this.projectVo.title,
  //       }
  //     }
  //     // "this" here refers to your component
  //     return {
  //       title: this.projectVo.title,
  //       description: this.projectVo.summary,
  //       meta: metaInfo,
  //     }
  //   })
  // ],
  name: 'ProjectDetail',
  data () {
    return {
      smallSize: false,
      popupYn: 'n', // 프로젝트정보 참조시 팝업표시 여부 파라미터
      urlSwapscannerKo: this.$urlSwapscannerKo, // https://swapscanner.io/ko/swap?from=0x0000000000000000000000000000000000000000&to=
      urlSwapscannerEn: this.$urlSwapscannerEn, // https://swapscanner.io/swap?from=0x0000000000000000000000000000000000000000&to=
      projectSeq: '', // route parameter seq
      tab: 'i',
      symbol: '', // 통화 심볼
      projectVo: {
        seq: '',
        mainnet: '',
        type: '',
        wallet_address: '',
        token_contract_address: '',
        lp_contract_address_1: '',
        lp_contract_address_2: '',
        lp_contract_address_3: '',
        lp_contract_address_4: '',
        lp_contract_address_5: '',
        lp_contract_address_6: '',
        lp_contract_address_7: '',
        lp_contract_address_8: '',
        lp_contract_address_9: '',
        lp_contract_address_10: '',
        platform_contract_address: '',
        platform_deposit_balance: '',
        platform_yield: '',
        platform_total_balance: '',
        title: '',
        title_ko: '',
        summary: '',
        summary_ko: '',
        description: '',
        description_ko: '',
        official_website: '',
        official_email: '',
        logo_image: '',
        docs: '',
        blog: '',
        medium: '',
        telegram: '',
        twitter: '',
        github: '',
        meta: '',
        discord: '',
        reg_id: '',
      },
      platformContractBalance: '0', // 컨트랙트 잔고
      scopeKlaytnUrl: this.$scopeDomainKlaytn,
      myContents: '', // 입력 댓글
      myContentsLength: 0,
      myReply: '', // 입력 답글
      myReplyLength: 0,
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      projectCommentList: [],
      noDataFlag: false,
      confirmDeleteCommentModal: false, // 나의 댓글 삭제 모달
      deleteTargetSeq: '', // 삭제 대상 댓글 seq
      confirmModifyCommentModal: false, // 나의 댓글 수정 모달
      modifyTargetSeq: '', // 수정 대상 댓글 seq
      modifyCommentValue: '', // 수정 대상 댓글 내용
      confirmDeleteProject: false, // 프로젝트 삭제 모달
    }
  },
  components: {
  },
  computed: {
    getRightDrawerOpen () {
      return this.$store.getters.getRightDrawerOpen
    },
    getUid () {
      return this.$store.getters.getUid
    }
  },
  created: function () {
    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }

    // 탭 파라미터 존재시, 해당 탭 표시
    if (this.$route.query.t === 'i' || this.$route.query.t === 'l' || this.$route.query.t === 'c') {
      this.tab = this.$route.query.t
    } else {
      this.tab = 'i'
    }
    // locale 파라미터 존재시, 해당 locale 설정
    if (this.$route.query.l === 'ko') {
      this.locale = 'ko-KR'
    } else if (this.$route.query.l === 'en') {
      this.locale = 'en-US'
    } else {
      // klaystar default locale is... ko?
    }
    // popup 파라미터 존재시, popupYn 설정
    if (this.$route.query.p) {
      this.popupYn = this.$route.query.p
    }


    // 키 설정
    this.projectSeq = this.$route.query.s
    // 프로젝트 정보 조회
    this.selectProject()

    // 댓글 건수 조회
    this.selectListMax()
  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  mounted: function () {},
  methods: {
    resizeEventHandler() {
      // console.log('resizeEventHandler')
      // console.log(document.body.offsetWidth)
      if (this.$q.platform.is.mobile || this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit' || document.body.offsetWidth < 1024) {
        this.smallSize = true
      } else {
        this.smallSize = false
      }
    },
    callbackLogin(userVo) {
      // console.log('callbackLogin!!!')
      this.$store.dispatch('setUid', userVo.uid)
      this.$store.dispatch('setAdcd', userVo.adcd)
      this.$store.dispatch('setName', userVo.name)
      this.$store.dispatch('setNickname', userVo.nickname)
      this.$store.dispatch('setProfileImage', userVo.profile_image)
      this.$store.dispatch('setWalletType', userVo.wallet_type)
      this.$store.dispatch('setWalletAddress', userVo.wallet_address)
      this.$store.dispatch('setMobileNo', userVo.mobile_no)
    },
    // 답글 글자수 카운트
    countMyReplyLength() {
      this.myReplyLength = this.myReply.length
    },
    // 답글 등록
    insertProjectCommentReply(item) {
      // console.log('insertProjectComment')

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // 내용 유무 체크
      if (!this.myReply) {
        this.$noti(this.$q, this.$t('enter_the_reply'))
        return
      }

      // 글자수 체크
      if (this.myReply.length > 300) {
        this.$noti(this.$q, this.$t('validation_failed_comment_max_length'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        project_seq: this.projectSeq,
        seq_parent1: item.seq_parent1,
        seq_parent2: item.seq_parent2,
        seq_parent3: item.seq_parent3,
        seq_parent4: item.seq_parent4,
        seq_parent5: item.seq_parent5,
        group_order: item.group_order, // 답글의 대상 값을 넘겨서 이 값보다 큰 GROUP_ORDER 들은 + 1 씩 UPDATE 처리
        group_layer: item.group_layer + 1,
        contents: this.myReply,
      }
      this.$axios.post('/api/projectcomment/insertProjectCommentReply', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.myReply = ''
            this.$noti(this.$q, this.$t('register_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('register_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 댓글 글자수 카운트
    countMyContentsLength() {
      this.myContentsLength = this.myContents.length
    },
    // 댓글 등록
    insertProjectComment() {
      // console.log('insertProjectComment')

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // 내용 유무 체크
      if (!this.myContents) {
        this.$noti(this.$q, this.$t('enter_the_comment'))
        return
      }

      if (this.myContents.length > 300) {
        this.$noti(this.$q, this.$t('validation_failed_comment_max_length'))
        return
      }

      this.$q.loading.show() // 로딩 표시 시작

      // seq_parent는 WAS 쿼리에 selectKey로 설정됨
      const params = {
        uid: this.getUid,
        project_seq: this.projectSeq,
        contents: this.myContents,
      }
      this.$axios.post('/api/projectcomment/insertProjectComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.myContents = ''
            this.$noti(this.$q, this.$t('register_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('register_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    refresher (done) {
      this.selectListMax()
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.projectCommentList = []
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      // this.$refs.infiniteScroll.load() // loadMore로 검색
      this.loadMore(1, done)
    },
    loadMore(index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        // console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 토근 댓글 리스트 마지막 페이지 조회
    selectListMax() {
      this.$axios.get('/api/projectcomment/selectProjectCommentListLastPageNum',
        {params: {uid: this.getUid, projectSeq: this.projectSeq, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 프로젝트 댓글 리스트 조회
    selectList(idx, done) {
      this.$axios.get('/api/projectcomment/selectProjectCommentList',
        {params: {uid: this.getUid, projectSeq: this.projectSeq, pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.projectCommentList = [] // 리스트 초기화
          }
          this.projectCommentList = this.projectCommentList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.projectCommentList || this.projectCommentList.length < 1) {
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
    selectProject() {
      const param = {
        uid: this.getUid,
        seq: this.projectSeq,
      }
      this.$axios.get('/api/project/selectProject', { params: { ...param }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data) {
            // console.log(result.data)
            this.projectVo = result.data

            if (this.projectVo.mainnet === 'KLAYTN') {
              this.symbol = 'KLAY'
            } else if (this.projectVo.mainnet === 'ETHEREUM') {
              this.symbol = 'ETH'
            } else {
              // TODO: 체인 확장시 대응 필요
              this.symbol = 'KLAY'
            }

            // platform contract balance 조회
            this.selectPlatformContractBalance()
          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    selectPlatformContractBalance() {
      const param = {
        uid: this.getUid,
        mainnet: this.projectVo.mainnet,
        platformContractAddress: this.projectVo.platform_contract_address,
      }
      this.$axios.get('/api/project/selectPlaformContractBalance', { params: { ...param }})
        .then((result) => {
          // console.log(result.data)
          // console.log(JSON.stringify(result.data))
          if (result.data != null) {
            let balanceOrdinal = String(result.data)

            // 20230419 YD Ahn : API 결과가 변경된 듯. decimal 자릿수 모두 붙어서 반환되니 / decimal 하면 됨
            // if (balanceOrdinal != '0') {
            //   // decimals = 18 계산
            //   let pointPosition = balanceOrdinal.length - 18
            //   // console.log('pointPosition: ' + pointPosition)
            //   this.platformContractBalance = [balanceOrdinal.slice(0, pointPosition), '.', balanceOrdinal.slice(pointPosition)].join('')
            // }
            if (balanceOrdinal != '0') {
              this.platformContractBalance = balanceOrdinal / 1000000000000000000
            }

          } else {
            this.$noti(this.$q, this.$t('request_data_failed'))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openUrl(url) {
      // console.log(url)
      // openURL(url)
      // window.open(url, '_system', 'location=yes,footer=yes')

      // cordova인 경우 IframeModal 표시
      if (this.$q.platform.is.cordova || this.$q.platform.is.name === 'webkit') {
        this.$refs.refIframeModal.url = url
        this.$refs.refIframeModal.show()
      } else {
        window.open(url, '_system')
      }
    },
    shareUrlCopy(value) {
      // console.log('copyAddress function called!')
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://klaystar.com/#/info?seq=999&tab=XXX
      const host = location.protocol + '//' + location.host
      const url = host + '/i?s=' + value + '&t=' + this.tab + '&l=' + this.locale.substring(0, 2) // seq, tab, locale

      // 클립보드로 복사하기
      this.$copyText(url).then(this.copyValueSuccess, this.copyValueFail)
    },
    copyValue(value) {
      if (!value) {
        this.$noti(this.$q, 'Value is Empty')
        return
      }
      // 클립보드로 복사하기
      this.$copyText(String(value)).then(this.copyValueSuccess, this.copyValueFail)
    },
    copyValueSuccess(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_success'))
    },
    copyValueFail(e) {
      // console.log(e)
      this.$noti(this.$q, this.$t('copy_failed'))
    },
    goBack() {
      try {
        this.$router.go(-1)
      } catch(e) {
        this.$router.push('/project/projectList')
      }
    },
    // 나의 댓글 삭제 모달 표시
    deleteComment(commentSeq) {
      this.deleteTargetSeq = commentSeq
      this.confirmDeleteCommentModal = true
    },
    // 나의 댓글 삭제
    doDeleteCommennt() {
      // console.log('insertProjectComment')
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.deleteTargetSeq,
      }
      this.$axios.post('/api/projectcomment/deleteProjectComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.deleteTargetSeq = ''
            this.$noti(this.$q, this.$t('delete_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('delete_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 나의 댓글 수정 모달 표시
    modifyComment(item) {
      this.modifyTargetSeq = item.seq
      this.modifyCommentValue = item.contents
      this.confirmModifyCommentModal = true

    },
    // 나의 댓글 수정
    doModifyCommennt() {
      this.$q.loading.show() // 로딩 표시 시작
      const params = {
        uid: this.getUid,
        seq: this.modifyTargetSeq,
        contents: this.modifyCommentValue,
      }
      this.$axios.post('/api/projectcomment/updateProjectComment', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.modifyTargetSeq = ''
            this.$noti(this.$q, this.$t('modify_comment_success'))

            // 목록 새로고침
            this.refresher(null)
          } else {
            this.$noti(this.$q, this.$t('modify_comment_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 답글 등록
    showReplyInput(item) {
      // console.log(item.visible_reply_input)

      // 1. 입력값 초기화
      this.myReply = ''

      // 2. 열린 입력창 모두 닫음
      for (let i = 0; i < this.projectCommentList.length; i++) {
        const commentItem = this.projectCommentList[i]
        // 현재 아이템 외 전부 닫기
        if (commentItem.seq !== item.seq) {
          commentItem.visible_reply_input = false

          // 해당 child 표시하기
          if (commentItem.seq_parent1 === item.seq_parent1 && item.group_layer === 0) {
            commentItem.visible_child = !item.visible_reply_input
          }
        }
      }

      // 3. 선택한 입력창 표시
      item.visible_reply_input = !item.visible_reply_input
    },

    // 좋아요/싫어요
    likeIt (item, likeCd) {
      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // like_cd Y:좋아요 N:싫어요 null:중립
      // 1. 화면 조작
      if (likeCd === 'YES') { // 좋아요인 경우
        if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_cnt = Number(item.like_cnt) - 1
        } else {
          if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
            item.dislike_cnt = Number(item.dislike_cnt) - 1
          }
          item.like_cd = 'Y' // 좋아요로 설정
          item.like_cnt = Number(item.like_cnt) + 1
        }
      } else { // 싫어요인 경우
        if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
          item.like_cd = null // 중립으로 설정
          item.dislike_cnt = Number(item.dislike_cnt) - 1
        } else {
          if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
            item.like_cnt = Number(item.like_cnt) - 1
          }
          item.like_cd = 'N' // 싫어요로 설정
          item.dislike_cnt = Number(item.dislike_cnt) + 1
        }
      }

      // 2. 좋아요 테이블 저장
      const params = {
        uid: this.getUid,
        project_comment_seq: item.seq,
        like_cd: item.like_cd,
      }
      this.$axios.post('/api/projectcomment/mergeProjectCommentLike', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            // this.$noti(this.$q, this.$t('modify_comment_success'))
          } else {
            // this.$noti(this.$q, this.$t('modify_comment_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    goModify() {
      this.$router.push({ path: '/project/modifyProject', query: { seq: this.projectVo.seq }})
    },
    deleteProject() {
      // 삭제 확인창 표시
      this.confirmDeleteProject = true
    },
    exhibition_enter() {
      window.open('https://instarverse.com/exhibition/index.html?exhibitionSeq=' + this.projectSeq, '_system')
    },
    // 삭제 확인창에서 삭제 버튼 클릭시 - 삭제 처리
    doDeleteProject() {
      this.$q.loading.show() // 로딩 표시 시작
      const param = {
        uid: this.getUid,
        seq: this.projectVo.seq,
      }
      this.$axios.post('/api/project/deleteProject', param)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            this.$noti(this.$q, this.$t('delete_success'))

            // 돌아가기
            this.$router.go(-1)
          } else {
            this.$noti(this.$q, this.$t('delete_failed'))
            this.$noti(this.$q, result.data.resultMsg)
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
  }
})
</script>

<style scoped>
</style>
