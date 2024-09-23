<template>
  <div class="row justify-center project-detail-header">
    <div class="col-12 q-pb-xs">
      <!-- 베너 이미지 db저장된 uri로 바꿔야 함. 임시 이미지 -->
      <img v-if="projectVo.banner_url" :src="projectVo.banner_url" alt="Active Icon" style="width: 100%; height: 400px; object-fit: cover; margin: -60px auto;" />
      <img v-else src="images/exhibition_banner_basic.png" alt="Active Icon" style="width: 100%; height: 400px; margin: -60px auto;" />

      <q-page-scroller class="custom-scroller" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="secondary" />
      </q-page-scroller>
      
      <!-- <div class="row flex flex-center"> -->
      <!-- <div class="row justify justify-between q-pt-sm"> -->
      <div class="row q-pt-sm flex flex-center page-1200" style="width: 100%;">
        <div class="row">
          <div class="row">
            <div class="col">
              <table border="0" width="100%" class="table-wrap flex flex-center"  align="center">
                <tr class="title-wrap row">
                  <td class="title-inner">
                    <div class="q-pl-sm" style="display: flex;">
                      <div class="row">
                        <!-- <div v-if="popupYn !== 'y'"> -->
                        <div>
                          <q-btn  class="btn-custom-style" flat round dense icon="arrow_back" color="white" icon-left="true" @click="goBack" />
                        </div>
                        <div v-if="getUid === projectVo.reg_id" class="col flex flex-center">
                          <q-btn  class="btn-custom-style" flat round dense icon="edit" size="md" color="white" icon-right="true" @click="goModify" />
                        </div>
                        <div v-if="getUid === projectVo.reg_id" class="col">
                          <q-btn class="btn-custom-style" flat round dense icon="delete" size="md" color="white" icon-right="true" @click="deleteProject" />
                        </div>
                        <div class="col">
                          <q-btn  class="btn-custom-style" flat round dense icon="share" size="md" color="white" icon-right="true" @click="shareUrlCopy(projectVo.seq)" />
                        </div>
                        <!-- <div class="q-pl-md q-pr-sm">
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
                        </div> -->
                      </div>
                    </div>
                    <div class="q-pl-sm title" style="word-break: break-word;">
                      <div v-if="calculateStatus(projectVo) === 'Registering'" style="font-size: 18px;">
                        <q-icon name="radio_button_unchecked" color="gray" style="padding-right: 5px;" />{{ $t('Registering') }}
                      </div>
                      <div v-if="calculateStatus(projectVo) === 'start'" style="font-size: 18px;">
                        <q-icon name="radio_button_checked" color="red" style="padding-right: 5px;" />{{ $t('display') }}
                      </div>
                      <div v-if="calculateStatus(projectVo) === 'end'" style="font-size: 18px;">
                        <q-icon name="radio_button_unchecked" color="gray" style="padding-right: 5px;" />{{ $t('exhibit_ending') }}
                      </div>
                      <div v-if="calculateStatus(projectVo) === 'ready'" style="font-size: 18px;">
                        <q-icon name="radio_button_unchecked" color="gray" style="padding-right: 5px;" />{{ $t('exhibit_ready') }}
                      </div>
                      <div class="">
                        {{ projectVo.title }}
                      </div>
                      <div class="col-12 subtitle">
                        {{ projectVo.subtitle }}
                      </div>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="col-12">
                      {{ projectVo.title }}
                    </div>
                  </td> -->
                </tr>
                <tr class="row btn-wrap">
                  <td>
                    <q-btn :label="$t('exhibition_enter')" @click="exhibition_enter" :disable="!isStart" size="20px" style="background-color: #FEFEFE; width: 250px; margin-top: 2%; opacity: 1; margin: 10px;"/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--<div class="q-pl-sm" style="padding-left: 15%; background-color: rgba(255, 255, 255, 0.3);">   반투명 흰색레이어 추가 -->
        <!-- <div class="page-1200">
          <div class="q-pl-sm" style="">
            <div class="row flex flex-center">
              <div>
                <q-btn  class="btn-custom-style" flat round dense icon="arrow_back" color="white" icon-left="true" @click="goBack" />
              </div>
              <div v-if="getUid === projectVo.reg_id" class="col flex flex-center">
                <q-btn  class="btn-custom-style" flat round dense icon="edit" size="md" color="white" icon-right="true" @click="goModify" />
              </div>
              <div v-if="getUid === projectVo.reg_id" class="col">
                <q-btn class="btn-custom-style" flat round dense icon="delete" size="md" color="white" icon-right="true" @click="deleteProject" />
              </div>
              <div class="col">
                <q-btn  class="btn-custom-style" flat round dense icon="share" size="md" color="white" icon-right="true" @click="shareUrlCopy(projectVo.seq)" />
              </div> -->
              <!-- <div class="q-pl-md q-pr-sm">
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
              </div> -->
            <!-- </div>
          </div>
        </div> -->
        
        <!-- <div class="col">
          <table border="0" style="margin: -70px auto; padding-right: 8%;" align="center">
            <tr>
              <td style="display: flex; flex-direction: column; align-items: end; padding-right: 25%;">
                <q-btn :label="$t('exhibition_enter')" @click="exhibition_enter" :disable="!isStart" size="20px" style="background-color: #FEFEFE; width: 180px; margin-top: 2%; opacity: 1;"/>
              </td>
            </tr>
          </table>
        </div> -->


      </div>
    </div>
  </div>

  <q-page class="page-1200 q-pa-md project-detail-wrap">
    <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="i">{{ $t('information') }}</q-tab>
      <q-tab name="l">{{ $t('link') }}</q-tab>
      <q-tab name="c">{{ $t('comment') }}</q-tab>
      <!-- <q-tab name="i" icon="info">&nbsp;&nbsp;{{ $t('information') }}</q-tab>
      <q-tab name="l" icon="link">&nbsp;&nbsp;{{ $t('link') }}</q-tab>
      <q-tab name="c" icon="chat">&nbsp;&nbsp;{{ $t('comment') }}</q-tab> -->
    </q-tabs>


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="i" style="word-break: break-word; ">
      
      <span class="subhead">{{ $t('project_period') }}</span>
      <div class="underline" style="margin-bottom: 30px"></div>
      <div class="justify-center q-pb-md q-pl-xs">
        <div class="col-12 t-text">
          {{ projectVo.display_start_time }} ~ {{ projectVo.display_end_time ? projectVo.display_end_time : $t('indefinite') }}
        </div>
      </div>

      <span class="subhead" v-if="projectVo.description">{{ $t('project_description') }}</span>
      <div v-if="projectVo.description" class="underline" style="margin-bottom: 30px"></div>
      <div v-if="projectVo.description" class="q-pb-md q-pl-xs">
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12" v-html="projectVo.description" />
        </div>
      </div>

      <span class="subhead">{{ $t('project_catalog') }}</span>
      <div class="underline" style="margin-bottom: 30px"></div>

      <div class="project-list row " style="margin-bottom: 30px">
        <div v-for="item in mediaList" :key="item.seq">
          <q-item>
            <q-item-section avatar @click="goMediaDetail(item)">
              <!-- 스타일이 안먹어서 해당 파일 아래 따로 스타일 설정 -->
              <q-avatar square v-if="item.type == 'VIDEO'" class="media-container">
                <video :src="item.url" controls autoplay loop muted class="media-content"></video>
              </q-avatar>
              <q-avatar square v-else class="media-container">
                <img v-if="item.url" :src="item.url"  class="media-content">
                <img v-else src="images/exhibition_poster_basic2.png">
              </q-avatar>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <!-- <span>{{ $t('project_information') }}</span>
      <div class="underline" style="margin-bottom: 30px"></div> -->

      <!-- <div class="row justify-center">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_title') }}</span>
        </div>
      </div>
      <div class="row justify-center q-pb-md q-pl-xs">
        <div class="col-12 t-text">
          {{ projectVo.title }}
        </div>
      </div> -->


      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl">
      </div>

      <span class="subhead">{{ $t('artist_basic_information') }}</span>
      <div class="underline" style="margin-bottom: 30px"></div>
      <div class="row justify-center q-pb-md q-pl-xs">
        <div class="col-12 text-weight-bold" style="font-size: 50px;">
          {{ projectVo.nickname }}
        </div>
        <div v-if="projectVo.instargram" class="col-12" style="font-size: 20px;">
          {{ projectVo.instargram }}
        </div>
        <div v-else class="col-12" style="font-size: 20px;">
          {{ projectVo.email }}
        </div>
      </div>
      <div v-if="projectVo.artist_details" class="q-pb-md q-pl-xs">
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12" v-html="projectVo.artist_details" />
        </div>
      </div>

      <!-- 하단 공간 확보 -->
      <div class="row justify-center q-pa-xl">
      </div>

      <span v-if="projectVo.production_background" class="subhead">{{ $t('project_background') }}</span>
      <div v-if="projectVo.production_background" class="underline" style="margin-bottom: 30px"></div>
      <div v-if="projectVo.production_background" class="q-pb-md q-pl-xs">
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12" v-html="projectVo.production_background" />
        </div>
        <!-- 하단 공간 확보 -->
        <div class="row justify-center q-pa-xl">
        </div>
      </div>



      <span class="subhead">{{ $t('project_nft_info') }}</span>
      <div class="underline" style="margin-bottom: 30px"></div>
      <div class="row justify-center">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_symbol') }}</span>
        </div>
      </div>
      <div class="row justify-center q-pb-md q-pl-xs">
        <div class="col-12 t-text">
          {{ projectVo.symbol }}
        </div>
      </div>
      <div class="row justify-center" v-if="projectVo.contract_address">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('contract_address') }}</span>
        </div>
      </div>
      <div class="row justify-center q-pb-md q-pl-xs">
        <div class="col-12 t-text">
          {{ projectVo.contract_address }}
        </div>
      </div>
      <div v-if="projectVo.collection_url" class="row justify-center">
        <div class="col-12">
          <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('market_url') }}</span>
          <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.collection_url)">&nbsp;{{ $t('copy') }}</q-btn>

        </div>
      </div>
      <div v-if="projectVo.collection_url" class="row justify-center q-pb-md q-pl-xs t-stit">
        <div class="col-12">
          <a @click="openUrl(projectVo.collection_url)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.collection_url }}</a>
        </div>
      </div>
      

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_title') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div class="col-12 t-text">
            {{ projectVo.title }}
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_subtitle') }}</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs">
          <div v-if="locale === 'ko-KR'" class="col-12 t-text">
            {{ projectVo.subtitle }}
          </div>
          <div v-else class="col-12 t-text">
            {{ projectVo.subtitle }}
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
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('mainnet') }}</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ projectVo.mainnet }}
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_type') }}</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ projectVo.type }}
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_wallet_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.wallet_address)">&nbsp;{{ $t('copy') }}</q-btn>
          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.wallet_address )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.wallet_address }}</a>
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_token_contract_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.token_contract_address)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.token_contract_address )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.token_contract_address }}</a>
          </div>
        </div> -->

        <!-- lp contract address 1 -->
        <!-- <div v-if="projectVo.lp_contract_address_1">
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
        </div> -->
        <!-- lp contract address 2 -->
        <!-- <div v-if="projectVo.lp_contract_address_2">
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
        </div> -->
        <!-- lp contract address 3 -->
        <!-- <div v-if="projectVo.lp_contract_address_3">
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
        </div> -->
        <!-- lp contract address 4 -->
        <!-- <div v-if="projectVo.lp_contract_address_4">
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
        </div> -->
        <!-- lp contract address 5 -->
        <!-- <div v-if="projectVo.lp_contract_address_5">
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
        </div> -->
        <!-- lp contract address 6 -->
        <!-- <div v-if="projectVo.lp_contract_address_6">
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
        </div> -->
        <!-- lp contract address 7 -->
        <!-- <div v-if="projectVo.lp_contract_address_7">
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
        </div> -->
        <!-- lp contract address 8 -->
        <!-- <div v-if="projectVo.lp_contract_address_8">
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
        </div> -->
        <!-- lp contract address 9 -->
        <!-- <div v-if="projectVo.lp_contract_address_9">
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
        </div> -->
        <!-- lp contract address 10 -->
        <!-- <div v-if="projectVo.lp_contract_address_10">
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
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_contract_address') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.platform_contract_address)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a @click="openUrl(scopeKlaytnUrl + 'account/' + projectVo.platform_contract_address )" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.platform_contract_address }}</a>
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_contract_balance') }} ①</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ Number(platformContractBalance).toLocaleString() }} {{ symbol }}
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_deposit_balance') }} ②</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ Number(projectVo.platform_deposit_balance).toLocaleString() }} {{ symbol }}
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_platform_yield') }} ③</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ Number(projectVo.platform_yield).toLocaleString() }} {{ symbol }}
          </div>
        </div> -->

        <!-- <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_total_balance') }} ( ① + ② + ③ )</span>

          </div>
        </div>
        <div class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            {{ (Number(platformContractBalance) + Number(projectVo.platform_total_balance)).toLocaleString() }} {{ symbol }}
          </div>
        </div> -->


        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="" />
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
        <div v-if="projectVo.email" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_official_email') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.email)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.email" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <!-- <a @click="openUrl(projectVo.email)" class="text-weight-bold" style="cursor: pointer;">{{ projectVo.email }}</a> -->
            <a class="text-weight-bold" style="cursor: pointer;">{{ projectVo.email }}</a>
          </div>
        </div>

        <div v-if="projectVo.instargram" class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_instargram') }}</span>
            <q-btn icon="content_copy" color="grey-7" size="md" flat @click="copyValue(projectVo.instargram)">&nbsp;{{ $t('copy') }}</q-btn>

          </div>
        </div>
        <div v-if="projectVo.instargram" class="row justify-center q-pb-md q-pl-xs t-stit">
          <div class="col-12">
            <a class="text-weight-bold">{{ projectVo.instargram }}</a>
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
        <!-- <div v-if="projectVo.telegram" class="row justify-center">
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
        </div> -->
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 3. 댓글 패널 ※ infiniteScroll 이상동작으로 comment는 별도로 기술 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="c">
        <!-- 댓글 리스트  -->
        <div class="col-12 justify-center q-pa-md comment-wrap">

          <div class="row">
            <div class="col-12">
              <q-input v-model="myContents" type="textarea" :placeholder="$t('enter_the_comment')" rows="2" clearable borderless tabindex="1" @keyup="countMyContentsLength" />
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
                              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
                              <q-avatar color="primary" text-color="white" icon="person" size="40px"  />
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
                      <span style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">{{ $t('register_reply') }}</span>
                      <span v-if="item.group_layer === 0" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt1 }})</span>
                      <span v-if="item.group_layer === 1" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt2 }})</span>
                      <span v-if="item.group_layer === 2" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt3 }})</span>
                      <span v-if="item.group_layer === 3" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt4 }})</span>
                      <span v-if="item.group_layer === 4" style="cursor: pointer;" class="text-body2" @click="showReplyInput(item)">&nbsp;({{ item.reply_cnt5 }})</span>
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
            <q-btn fab icon="keyboard_arrow_up" color="#FEFEFE" />
          </q-page-scroller>

        </div>
      </q-tab-panel>
    </q-tab-panels>

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
  <MediaDetailModal ref="refMediaDetailModal" />

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

  //     const ogUrlString = 'https://instarverse.com/info?seq=' + this.projectVo.seq + '&tab=' + this.tab

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
        seq: 0,
        status_cd: '',
        nickname: '',
        email: '',
        instargram: '',
        twitter: '',
        discord: '',
        telegram: '',
        artist_details: '',
        title: '',
        titleKo: '',
        symbol: '',
        subtitle: '',
        exhibition_name: '',
        banner_url: '',
        postar_url: '',
        display_start_time: '',
        display_end_time: '',
        description: '',
        production_background: '',
        contract_address: '',
        collection_url: '',
        reg_id: '',
      },
      mediaList: [],
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
      isStart: false,
      isEnd: false,
      isReady: false,
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
    },
    getNickname () {
      return this.$store.getters.getNickname
    },
  },
  mounted: function () {
    this.refresher(null)
  },
  created: function () {
    // 화면 리사이즈 이벤트 핸들러
    window.addEventListener("resize", this.resizeEventHandler)
    if (document.body.offsetWidth < 1024) {
      this.smallSize = true
    }

    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname)
      this.$store.dispatch('setUid', uid)
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

    // 조회수 + 1


    // 프로젝트 정보 조회
    this.selectProject()

    // 댓글 건수 조회
    this.selectListMax()

    // 미디어 정보 조회
    this.selectMediaList()
  },
  destroy: function () {
    window.removeEventListener("resize", this.resizeEventHandler)
  },
  watch: {
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
    insertActionLog(action, actionDetail, reqUrl, urlParams) {
      // 액션 로그 등록 처리
      const param = {
        uid: this.getUid,
        action: action,
        action_detail: actionDetail,
        req_url: reqUrl,
        params: urlParams,
        user_agent: this.$cookie.get('AGENT'),
      }
      this.$axios.post('/api/common/insertActionLog', param)
        .catch((err) => {
          console.log(err)
        })
    },
    showMediaDetailModal() {
      this.$refs.refMediaDetailModal.show()
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
    calculateStatus(item) {
      const now = new Date()
      const startTime = new Date(item.display_start_time)
      const endTime = item.display_end_time ? new Date(item.display_end_time) : null

      if (item.status_cd == "10") {
        return 'Registering'
      }

      if (!endTime) {
        if (now >= startTime) {
          return 'start'
        } else if (now < startTime){
          return 'ready'
        }
      } else {
        console.log(3)
        if (now < startTime) {
          return 'ready'
        } else if (now >= startTime && now <= endTime) {
          return 'start'
        } else {
          return 'end'
        }
      }
    },
    goMediaDetail(item) {
      console.log(item)
      this.$refs.refMediaDetailModal.myMediaVo = item
      this.$refs.refMediaDetailModal.show()
    },
    selectMediaList() {
      this.$axios.get('/api/media/selectMediaListByProjectSeq',
        {params: {uid: this.getUid, projectSeq: this.projectSeq}})
        .then((result) => {
          this.mediaList = result.data
        })
        .catch((err) => {
          console.log(err)
        })
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

      // 로그인 여부 체크, 로그인 모달 표시   < -- 이건 지갑 로그인
      // if (!this.getUid) {
      //   this.$refs.refWalletModal.show()
      //   return
      // }

      // 로그인 안했을 시 return 추가해야 함.

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
          if (result.data) {
            this.projectVo = result.data

            // 현재 시간
            const now = new Date()

            // 시작 시간과 종료 시간
            const startTime = new Date(result.data.display_start_time)
            const endTime = result.data.display_end_time ? new Date(result.data.display_end_time) : null

            if (!endTime) {
              // display_end_time이 null이거나 빈 값이면
              // 현재 시간이 startTime을 경과하면 전시 중 상태로 설정
              if (now >= startTime) {
                this.isStart = true
                this.isReady = false
                this.isEnd = false
              } else {
                // 전시 준비 중 상태로 설정
                this.isStart = false
                this.isReady = true
                this.isEnd = false
              }
            } else {
              // display_end_time이 설정된 경우
              if (now < startTime) {
                // 전시 준비 중 상태로 설정
                this.isStart = false
                this.isReady = true
                this.isEnd = false
              } else if (now >= startTime && now <= endTime) {
                // 전시 중 상태로 설정
                this.isStart = true
                this.isReady = false
                this.isEnd = false
              } else {
                // 전시 종료 상태로 설정
                this.isStart = false
                this.isReady = false
                this.isEnd = true
              }
            }

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
      // API 서버로 보내서 og 정보 달고 다시 frontPath로 넘어옴. path: https://instarverse.com/#/info?seq=999&tab=XXX
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
      // 액션 로그 등록
      this.insertActionLog(this.$ACTION_ENTER, null, this.$exhibitionUnityUrl, this.projectSeq)
      
      window.open(this.$exhibitionUnityUrl +  this.projectSeq, '_system')
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
.media-container {
  overflow: hidden;
  cursor: pointer;
}
.media-content {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f6f6f6;
  transition: transform 0.3s ease; /* 부드러운 변형 효과 */
}
.media-container:hover .media-content {
  transform: scale(1.05); /* 마우스를 올리면 5% 확대 */
}
.title {
  font-weight: bold; 
  font-size: 40px;
  color: white;
  text-shadow: 2px 2px 5px black;
}
.subtitle{
  word-break: break-word;
  font-size: 20px;
  color: white;
  text-shadow: 2px 2px 5px black;
}
.btn-custom-style {
  text-shadow: 2px 2px 5px black;
}
.table-wrap {
  margin: -329px auto;
  /* padding-left: 9%; */
  padding-right: 7px;
  height: 410px;
}
.title-wrap {
  width: 1280px;
  height: 150px;
  padding-top: 17px;
}
.btn-wrap {
  width: 100%; 
  display: flex; 
  justify-content: flex-end;
}
@media (max-width: 1023px) {
  .title{
    font-size: 25px;
    padding-top: 20px;
  }
  .subtitle{
    display: none;
  }
  .table-wrap {
    margin: -329px auto;
    /* padding-left: 9%; */
    height: 410px;
  }
  .title-wrap {
    width: 100%;
    height: 150px;
  }
}
</style>
