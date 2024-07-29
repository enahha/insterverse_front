<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec">{{ $t('menu_project_register') }}   <span class="subtitle" v-if="locale === 'ko-KR'">Exhibition</span></div>
      </div>
    </div>

    <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="1">{{ $t('project_artist_description') }}</q-tab>
      <q-tab name="2">{{ $t('project_description') }}</q-tab>
      <q-tab name="3">{{ $t('project_art_upload') }}</q-tab>
      <q-tab name="4">{{ $t('project_preview') }}</q-tab>
    </q-tabs>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 작가 정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="1" style="word-break: break-word;">
        <div class="tab-panel-1 q-pt-lg">
          <span>{{ $t('artist_basic_information') }}</span>
          <div class="underline"></div>

          <div style="margin-left: 5%;">
            <table style="width: 800px;">
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('artist_nickname') }}<span class="text-red"> *</span></span></td>
                    <td class="labal-input"><q-input v-model="nickname" ref="refNickname" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable tabindex="1" /></td>
                </div>
              </tr>
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('artist_representative_sns') }}<span class="text-red"> *</span></span></td>
                    <td class="labal-input"><q-input v-model="representativeSns" ref="refRepresentativeSns" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable tabindex="1" /></td>
                </div>
              </tr>

              <tr>
                <div class="input-group q-pt-lg">
                  <td class="labal" style="align-content: start; padding-top: 2%;"><span class="text-weight-bold text-subtitle1">{{ $t('artist_sns_id') }} / {{ $t('artist_link') }}<span class="text-red"> </span></span></td>

                  <td class="labal-input">
                    <table>
                      <tr>
                        <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_official_email') }}</span></td>
                        <td class="labal-input"><q-input v-model="email" ref="refEmail" clearable tabindex="1" /></td>
                      </tr>
                      <tr>
                        <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_instargram') }}</span></td>
                        <td class="labal-input"><q-input v-model="instargram" placeholder="" ref="refInstargram" clearable tabindex="1" /></td>
                      </tr>
                      <tr>
                        <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_twitter') }}</span></td>
                        <td class="labal-input"><q-input v-model="twitter" ref="refTwitter" clearable tabindex="1" /></td>
                      </tr>
                      <tr>
                        <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_discord') }}</span></td>
                        <td class="labal-input"><q-input v-model="discord" ref="refDiscord" clearable tabindex="1" /></td>
                      </tr>
                      <tr>
                        <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_telegram') }}</span></td>
                        <td class="labal-input"><q-input v-model="telegram" ref="refTelegram" clearable tabindex="1" /></td>
                      </tr>
                    </table>
                  </td>
                </div>
              </tr>
            </table>
          </div>
          <br><br><br><br><br>


          <span>{{ $t('artist_details') }}</span>
          <div class="underline"></div>

          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1">{{ $t('artist_career') }}<span class="text-red"> </span></span>
            </div>
          </div>
          <div class="row justify-center q-pb-lg">
            <div class="col-12  q-pb-lg">
              <q-editor
                v-model="artistDescription"
                min-height="10rem"
                autofocus
                tabindex="5"
                @keyup.enter.stop
                toolbar-bg="grey-1"
                :toolbar="[
                  ['left', 'center', 'right', 'justify'],
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                  ['undo', 'redo'],
                  ['print', 'fullscreen'],
                  ['viewsource']
                ]"
                :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }"
              />
            </div>
          </div>

          <!-- <div style="display: flex; justify-content: flex-end;">
            <q-btn
              :label="$t('save')"
              @click="register"
              :style="{ backgroundColor: methodsExecuted ? 'black' : '#0C2C69', color: 'white', width: '10%' }"
            />
          </div> -->
          
          <div style="display: flex; justify-content: flex-end; padding-top: 100px;">
            <q-btn
              :label="$t('next')"
              @click="goTabNext"
              style="background-color: #90B2D8; color: white "
            />
          </div>


        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 2. 전시정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="2" style="word-break: break-word;">
        <div class="tab-panel-2 q-pt-lg">
          <span>{{ $t('project_basic_information') }}</span>
          <div class="underline"></div>

          
          <div style="margin-left: 5%;">
            <table style="width: 800px;">
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_name') }}<span class="text-red"> *</span></span></td>
                    <td class="labal-input"><q-input v-model="title" ref="refTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable tabindex="1" /></td>
                </div>
              </tr>
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_name') }} (Korean)<span class="text-red"> *</span></span></td>
                    <td class="labal-input"><q-input v-model="titleKo" ref="refTitleKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable tabindex="1" /></td>
                </div>
              </tr>
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_symbol') }}</span>
                      <q-icon name="help" size="xs">
                        <q-tooltip>
                          {{ $t('project_symbol_hint') }}
                        </q-tooltip>
                      </q-icon>
                      <span class="text-red"> *</span>
                    </td>
                    <td class="labal-input"><q-input v-model="symbol" ref="refSymbol" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable tabindex="1" /></td>
                </div>
              </tr>
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_subtitle') }}<span class="text-red"> *</span></span></td>
                    <td class="labal-input"><q-input v-model="subtitle" ref="refSubtitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 300)]" clearable tabindex="1" /></td>
                </div>
              </tr>
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal"><span class="text-weight-bold text-subtitle1">{{ $t('project_exhibition_type') }}<span class="text-red"> *</span></span></td>
                    <td class="labal-input"><q-input v-model="exhibitionName" :disable="true" ref="refExhibitionName" :rules="[required, val => minLength(val, 1), val => maxLength(val, 300)]" clearable tabindex="1"/></td>
                    <td>
                      <q-btn
                          :label="$t('choice')"
                          @click="showExhibitionTypeModal"
                          style="background-color: #90B2D8; color: white "
                        />
                    </td>
                </div>
              </tr>
              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal">
                      <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_banner') }}<span class="text-red"> *</span></span>
                      <span class="text-grey">
                        &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
                      </span>
                    </td>
                    <td class="labal-input">
                      <div class="row justify-center q-pb-md">
                        <div class="col-12">
                          <q-uploader
                            field-name="file"
                            ref="uploaderObj"
                            url="/api/common/uploadImage"
                            hide-upload-btn
                            color="grey-3"
                            text-color="black"
                            :multiple="false"
                            accept="image/*"
                            :filter="filterFiles"
                            max-files="1"
                            :auto-upload="true"
                            tabindex="9"
                            @uploaded="fileUploadedBanner"
                          />
                        </div>
                      </div>
                      <div class="col-12 text-red text-bold">
                        {{ $t('project_banner_hint') }}
                      </div>
                    </td>
                </div>
              </tr>

              <tr>
                <div class="input-group q-pt-lg">
                  <td class="labal">
                    <span class="text-weight-bold text-subtitle1">{{ $t('project_exhibition_day') }}</span>
                  </td>
                  <td class="labal-input" style="">
                    <!-- 전시 시작일 -->
                    <div class="" style="max-width: 300px;">
                      <q-input v-model="startTime" :label="$t('start_time')" ref="refStartTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="6">
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="startTime" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="startTime" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <!-- 전시 종료일 -->
                    <div class="" style="max-width: 300px;">
                      <q-input v-model="endTime" :label="$t('end_time')" ref="refEndTime" :rules="[required, val => minLength(val, 16), val => maxLength(val, 16)]" outlined tabindex="6">
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="endTime" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="endTime" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <div class="col-12 text-red text-bold">
                        {{ $t('project_date_hint') }}
                      </div>
                    </div>
                  </td>
                </div>
              </tr>


              <tr>
                <div class="input-group q-pt-lg">
                    <td class="labal">
                      <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_poster_image') }}<span class="text-red"> *</span></span>
                      <span class="text-grey">
                        &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
                      </span>
                    </td>
                    <td class="labal-input">
                      <div class="row justify-center q-pb-md">
                        <div class="col-12">
                          <q-uploader
                            field-name="file"
                            ref="uploaderObj"
                            url="/api/common/uploadImage"
                            hide-upload-btn
                            color="grey-3"
                            text-color="black"
                            :multiple="false"
                            accept="image/*"
                            :filter="filterFiles"
                            max-files="1"
                            :auto-upload="true"
                            tabindex="9"
                            @uploaded="fileUploadedPoster"
                          />
                        </div>
                      </div>
                      <div class="col-12 text-red text-bold">
                        {{ $t('square_image_only') }}
                      </div>
                      <!-- <div class="row justify-center">
                        <div class="col-12">
                            <span class="text-weight-bold text-subtitle1">※ {{ $t('whitelist_preview_main_image') }}</span>
                        </div>
                        </div>
                        <div class="row justify-center q-pb-xs">
                        <div class="col-12">
                            <img v-if="posterImage" :src="posterImage" style="width: 100%;">
                            <span v-else>{{ $t('no_image') }}</span>
                        </div>
                      </div> -->
                    </td>
                </div>
              </tr>
            </table>
          </div>

          <br><br><br><br><br>

          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_description') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-lg">
            <div class="col-12  q-pb-lg">
              <q-editor
                v-model="projectDescription"
                min-height="10rem"
                autofocus
                tabindex="5"
                @keyup.enter.stop
                toolbar-bg="grey-1"
                :toolbar="[
                  ['left', 'center', 'right', 'justify'],
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                  ['undo', 'redo'],
                  ['print', 'fullscreen'],
                  ['viewsource']
                ]"
                :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }"
              />
            </div>
          </div>
          <br><br>

          <div class="row justify-center q-pt-lg">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_background') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-lg">
            <div class="col-12  q-pb-lg">
              <q-editor
                v-model="projectBackground"
                min-height="10rem"
                autofocus
                tabindex="5"
                @keyup.enter.stop
                toolbar-bg="grey-1"
                :toolbar="[
                  ['left', 'center', 'right', 'justify'],
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                  ['undo', 'redo'],
                  ['print', 'fullscreen'],
                  ['viewsource']
                ]"
                :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }"
              />
            </div>
          </div>

          <!-- <div style="display: flex; justify-content: flex-end;">
            <q-btn
              :label="$t('save')"
              @click="register"
              :style="{ backgroundColor: methodsExecuted ? 'black' : '#0C2C69', color: 'white', width: '10%' }"
            />
          </div> -->
          
          <div style="display: flex; justify-content: space-between; padding-top: 100px;">
            <q-btn
              :label="$t('go_back')"
              @click="goTabBack"
              style="background-color: #90B2D8; color: white "
            />
            <q-btn
              :label="$t('next')"
              @click="goTabNext"
              style="background-color: #90B2D8; color: white "
            />
          </div>





        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 3. 작품 업로드 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="3">
        <div class="tab-panel-3 q-pt-lg">
          <span>{{ $t('project_art_upload') }}</span>
          <div class="underline"></div>


          <!-- <div class="row srch-wrap" style="width: 100%;">
            <q-input v-model="keyword" @keyup="onKeyup" type="search" style="width: 150px;" clearable borderless />
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <q-btn @click="search" icon="search" size="lg" style="width: 80px;" flat  />
          </div> -->

          <div style="width: 100%; display: flex; justify-content: flex-end">
            <q-btn
              @click="goAddWork"
              round
              dense
              icon="add"
              size="3em"
              text-color="white"
              style="background-color: #E1D2BB; font-size: large; margin: 10px;"
            />
          </div>

          <q-pull-to-refresh @refresh="refresher">
          <q-infinite-scroll @load="loadMore" :offset="100" ref="infiniteScroll" style="background-color: #FEFEFE;">
            
            <div class="media-table-wrapper text-center q-pt-lg">
              <div class="table-scroll-wrapper">
                <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                  <thead>
                    <tr>
                      <th></th>
                      <th>{{ $t('media') }}</th>
                      <th>{{ $t('media_title') }}</th>
                      <th>{{ $t('media_price') }}</th>
                      <th>{{ $t('media_description') }}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in mediaList" :key="index">
                        <!-- <td><input type="checkbox" v-model="item.selected"></td> 체크박스 -->
                        <td>{{ item.seq }}</td>
                        <td><q-img :src="item.url" style="width: 300px; height: auto;" /></td>
                        <td style="width: 150px;"> {{ truncateText(item.title, truncateTitle) }}</td>

                        <td style="width: 150px;" v-if="item.price != 0">{{ (item.price).toLocaleString() }} <span>KRW</span></td>
                        <td style="width: 150px;" v-else><span>-</span></td>

                        <td>{{ truncateText(item.description, truncateDescription) }}</td>
                        <td><q-icon name="delete_forever" size="sm" /> <q-icon name="edit" size="sm" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>

          </q-infinite-scroll>
          </q-pull-to-refresh>

          <div style="display: flex; justify-content: space-between; padding-top: 100px;">
            <q-btn
              :label="$t('go_back')"
              @click="goTabBack"
              style="background-color: #90B2D8; color: white "
            />
            <q-btn
              :label="$t('next')"
              @click="goTabNextPreview"
              style="background-color: #90B2D8; color: white "
            />
          </div>


        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 4. 미리보기 및 등록 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="4">
        <div class="row tab-panel-4">
          <q-btn
            size="lg"
            @click="updateProjectStatusCd"
            :label="$t('register_project')"
            class="exhibit-btn"
          />

        </div>
      </q-tab-panel>
    </q-tab-panels>


  </q-page>

  <WalletModal ref="refWalletModal" />
  <ExhibitionTypeModal ref="refExhibitionTypeModal" @callback-register="setexhibitionName"/>

  <q-dialog v-model="confirmGoBack">
    <q-card>
      <q-card-section class="row items-center" style="min-width: 200px;">
        <!-- <q-avatar icon="warning" color="primary" text-color="white" size="sm" /> -->
        <q-icon name="warning" color="primary" size="md" />
        <span class="q-ml-sm">{{ $t('confirm_go_back') }}</span>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat style="width: 45%;" :label="$t('cancel')" color="black" v-close-popup />
        <q-btn flat style="width: 45%;" :label="$t('go_back')" color="black" v-close-popup @click="doGoBack" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'RegisterProject',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
    }
  },
  data () {
    return {
      tab: '1',
      projectSeq: '', // route parameter seq
      mainnetObj: {
        label: 'Klaytn',
        value: 'KLAYTN',
      },
      mainnetOptions: [
        {
          label: 'Klaytn',
          value: 'KLAYTN',
        },
        {
          label: 'Ethereum',
          value: 'ETHEREUM',
        },
        {
          label: 'Polygon',
          value: 'POLYGON',
        },
        {
          label: 'BSC',
          value: 'BSC',
        },
        {
          label: 'Fantom',
          value: 'FANTOM',
        },
        {
          label: 'Avalanche',
          value: 'AVALANCHE',
        },
      ],
      projectTypeObj: {
        label: 'NFT',
        value: 'NFT',
      },
      projectTypeOptions: [
        {
          label: 'NFT',
          value: 'NFT',
        },
        {
          label: 'Token',
          value: 'TOKEN',
        },
        // {
        //   label: 'Polygon',
        //   value: 'POLYGON',
        // },
      ],
      // preview
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

      // seqFileMst: '' // 파일 마스터 SEQ
      confirmGoBack: false, // goBack 확인창

      truncateTitle: 10,
      truncateDescription: 200,
      

      ////////////////////////
      nickname: '',
      representativeSns: '',
      email: '',
      instargram: '',
      twitter: '',
      discord: '',
      telegram: '',
      artistDescription: '',
      title: '',
      titleKo: '',
      symbol: '',
      subtitle: '',
      exhibitionName: '',
      bannerImage: '',
      posterImage: '',
      startTime: '',
      endTime: '',
      projectDescription: '',
      projectBackground: '',

      methodsExecuted: false,
      keyword: '',
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      noDataFlag: false,
      mediaList: []
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
    },
    getNickname () {
      return this.$store.getters.getNickname
    },
    getWalletType () {
      return this.$store.getters.getWalletType
    },
    getWalletAddress () {
      return this.$store.getters.getWalletAddress
    },
  },
  created: function () {
    // 키 설정
    this.projectSeq = this.$route.query.seq

    const nickname = localStorage.getItem('NICKNAME') ? localStorage.getItem('NICKNAME') : this.$cookie.get('NICKNAME')
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID')
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname)
      this.$store.dispatch('setUid', uid)
    }

    // 미디어 등록 후 tab 설정
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab
    }
    
    // 팀 지갑주소에 사용자 지갑주소 디폴트 설정
    this.projectWalletAddress = this.getWalletAddress

    // 미디어 리스트 조회
    this.selectListMax()
  },
  watch: {
    getNickname(newNickname) {
      this.nickname = newNickname;
    }
  },
  mounted: function () {
    this.nickname = this.getNickname
  },
  methods: {
    goTabNext() {
      this.register()   // 등록
      const currentTab = parseInt(this.tab)
      this.tab = (currentTab + 1).toString()
    },
    goTabBack() {
      const currentTab = parseInt(this.tab)
      this.tab = (currentTab - 1).toString()
    },
    goTabNextPreview() {
      this.$router.push({ path: '/project/registerProject', query: { seq: this.projectSeq, tab: 4 }})
      // 미리보기를 위한 프로젝트, 미디어 정보 조회
      const currentTab = parseInt(this.tab)
      this.tab = (currentTab + 1).toString()
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text
      }
      return text.substring(0, maxLength) + '...'
    },
    showExhibitionTypeModal() {
      this.$refs.refExhibitionTypeModal.show()
    },
    setexhibitionName(name) {
      this.exhibitionName = name
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
    goAddWork() {
      this.$router.push({ path: '/media/registerMedia', query: { seq: this.projectSeq }})
    },
    async search() {
      await this.selectListMax()
      await this.refresher(null)
    },
    // 검색어 입력창 키업 이벤트
    onKeyup (event) {
      if (event.key === 'Enter') { // 엔터일 경우 검색
        this.search()
      }
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      this.mediaList = []
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
    // 작품 마지막 페이지 조회
    selectListMax() {
      // 검색어 입력창 x버튼 클릭시 this.keyword가 null이 됨.
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/media/selectMediaListLastPageNum',
        {params: {uid: this.getUid, exhibition_seq: this.projectSeq, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 작품 리스트 조회
    selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/media/selectMediaList',
        {params: {uid: this.getUid, exhibition_seq: this.projectSeq, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.mediaList = [] // 리스트 초기화
          }
          this.mediaList = this.mediaList.concat(result.data)

          // 데이터 없음 표시 설정
          if (!this.mediaList || this.mediaList.length < 1) {
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
      // 왜 안되는거야악!!
      // if (!this.$refs.refNickname.validate()) {
      //   result = falsetrue
      // }
      // if (!this.$refs.refRepresentativeSns.validate()) {
      //   result = falsetrue
      // }
      // if (!this.$refs.refTitle.validate()) {
      //   result = falsetrue
      // }
      // if (!this.$refs.refTitleKo.validate()) {
      //   result = falsetrue
      // }
      // // if (!this.projectImageUrl) {
      // //   this.$noti(this.$q, this.$t('validation_failed_minting_nft_image'))true
      // //   result = falsetrue
      // // }
      // if (!this.$refs.refSymbol.validate()) {
      //   result = falsetrue
      // }
      // if (!this.$refs.refSubtitle.validate()) {
      //   result = falsetrue
      // }
      // if (!this.$refs.refExhibitionName.validate()) {
      //   result = falsetrue
      // }
      // if (!this.$refs.refStartTime.validate()) {
      //   result = falsetrue
      // }
      return result
    },

    // 등록 처리 시작
    async register() {
      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 메인화면으로?
      if (!this.getUid) {
        this.$refs.refLoginModal.show()
        return
      }

      // // check mainnet
      // if (this.mainnetObj.value !== 'KLAYTN') {
      //   this.$noti(this.$q, this.$t('unsupported_mainnet'))
      //   return
      // }

      // 등록 (insert한번 실행되면 update로 전환)
      if(this.methodsExecuted == true) {
        this.doModifyProject()
        return
      }

      this.doRegister()
    },
    // 등록
    async doRegister() {
      // insert / update 구분용
      this.methodsExecuted = true
      // 1. 등록
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        nickname: this.nickname,
        status_cd: '10',      // 등록중
        representative_sns_id: this.representativeSns,
        email: this.email,
        instargram: this.instargram,
        twitter: this.twitter,
        discord: this.discord,
        telegram: this.telegram,
        artist_details: this.artistDescription,
        title: this.title,
        title_ko: this.titleKo,
        symbol: this.symbol,
        subtitle: this.subtitle,
        exhibition_name: this.exhibitionName,
        banner_url: this.bannerImage,
        poster_url: this.posterImage,
        start_time: this.start_time,
        end_time: this.end_time,
        description: this.projectDescription,
        production_background: this.projectBackground,
        collection_status_cd: '10'
        // nft_yn: 'Y', // NFT 프로젝트 여부 = 'Y'
      }
      // this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/insertProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.projectSeq = result.data.last_seq
            this.$noti(this.$q, this.$t('register_success'))

            // 페이지 이동
            // 나의 프로젝트 리스트 화면
            // this.$router.push('/project/projectList')

            // <!-- 관리자 수정용 -->
            // this.$router.push('/project/newList')
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
            // insert / update 구분용
            this.methodsExecuted = false
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 프로젝트 수정
    async doModifyProject() {
      // 1. 프로젝트 수정 처리
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        nickname: this.nickname,
        status_cd: '10',      // 등록중
        representative_sns_id: this.representativeSns,
        email: this.email,
        instargram: this.instargram,
        twitter: this.twitter,
        discord: this.discord,
        telegram: this.telegram,
        artist_details: this.artistDescription,
        title: this.title,
        title_ko: this.titleKo,
        symbol: this.symbol,
        subtitle: this.subtitle,
        exhibition_name: this.exhibitionName,
        banner_url: this.bannerImage,
        poster_url: this.posterImage,
        start_time: this.start_time,
        end_time: this.end_time,
        description: this.projectDescription,
        production_background: this.projectBackground,
        collection_status_cd: '10',
        mod_id: this.getUid
        // nft_yn: 'Y', // NFT 프로젝트 여부 = 'Y'
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/updateProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // // 페이지 이동
            // this.$router.go(-1)
            // if (this.$route.query.fromAdmin === 'Y') {
            //   // 나의 프로젝트 리스트 화면 - admin
            //   this.$router.push('/admin/adminMyList')
            // } else {
            //   // 나의 프로젝트 리스트 화면
            //   this.$router.push('/project/myList')
            // }
            // <!-- 관리자 수정용 -->
            // this.$router.push('/project/newList')
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    async updateProjectStatusCd() {
      // 1. 프로젝트 수정 처리
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        status_cd: '30',      // 정보 등록 완료(결제 완료)
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/updateProjectStatusCd', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('modify_success'))

            // // 페이지 이동
            // this.$router.go(-1)
            // if (this.$route.query.fromAdmin === 'Y') {
            //   // 나의 프로젝트 리스트 화면 - admin
            //   this.$router.push('/admin/adminMyList')
            // } else {
            //   // 나의 프로젝트 리스트 화면
            //   this.$router.push('/project/myList')
            // }
            // <!-- 관리자 수정용 -->
            // this.$router.push('/project/newList')
          } else {
            this.$noti(this.$q, this.$t('modify_failed'))
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })

    },
    // 파일 업로드 필터
    filterFiles (files) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024
      // this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$noti(this.$q, this.$t('file_size_exceeded'))

        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    // fileAdded (files) {
    //   // this.$refs.uploaderObj.reset()
    //   this.$refs.uploaderObj.removeUploadedFiles()
    //   this.$refs.uploaderObj.upload()
    // },
    fileUploadedBanner (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.bannerImage = fileNameNew // 프로젝트 로고 URL 설정
      // this.$refs.uploaderObj.reset()
    },
    fileUploadedPoster (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.posterImage = fileNameNew // 프로젝트 로고 URL 설정
      // this.$refs.uploaderObj.reset()
    },
    goBack() {
      // this.$router.go(-1)

      // goBack 확인창 표시
      this.confirmGoBack = true
    },
    doGoBack() {
      // 페이지 이동
      this.$router.go(-1)
      // if (this.$route.query.fromAdmin === 'Y') {
      //   // 나의 프로젝트 리스트 화면 - admin
      //   this.$router.push('/admin/adminMyList')
      // } else {
      //   // 나의 프로젝트 리스트 화면
      //   this.$router.push('/project/projectList')
      // }
    }
  }
})
</script>

<style scoped>
</style>
