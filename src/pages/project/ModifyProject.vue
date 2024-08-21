<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec">{{ $t('menu_project_register') }}</div>
      </div>
    </div>

    <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="1" :disable="true">{{ $t('project_artwork') }}</q-tab>
      <q-tab name="2" :disable="true">{{ $t('project_description') }}</q-tab>
      <q-tab name="3" :disable="true">{{ $t('project_artist') }}</q-tab>
      <q-tab name="4" :disable="true">{{ $t('project_preview') }}</q-tab>
    </q-tabs>

    <!-- <q-page-scroller position="top" :scroll-offset="150" :offset="[0, 10]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" style="z-index: 9;" class="z-top" />
    </q-page-scroller> -->


    <q-tab-panels v-model="tab">
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 1.작품 업로드 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="1" style="word-break: break-word;">
        <keep-alive>
        <div class="tab-panel-3 q-pt-lg">
          <span>{{ $t('my_artworks') }}</span>
          <div class="underline"></div>


          <!-- <div class="row srch-wrap" style="width: 100%;">
            <q-input v-model="keyword" @keyup="onKeyup" type="search" style="width: 150px;" clearable outlined borderless />
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <q-btn @click="search" icon="search" size="lg" style="width: 80px;" flat  />
          </div> -->

          <!-- <div style="width: 100%; display: flex; justify-content: flex-end">
            <q-btn
              @click="goMyMediaList"
              round
              dense
              icon="add"
              size="3em"
              text-color="white"
              style="background-color: #E1D2BB; font-size: large; margin: 10px;"
            />
          </div> -->

          <div style="width: 100%; display: flex; justify-content: flex-end">
            <q-btn
                :label="$t('manage')"
                @click="goMyMediaList"
                style="background-color: #0C2C69; color: white; min-width: 100px; "
              />
          </div>

          <q-pull-to-refresh @refresh="refresher">
          <q-infinite-scroll @load="loadMore" :offset="1000" ref="infiniteScroll" style="background-color: #FEFEFE;">
            
            <div class="media-table-wrapper text-center q-pt-lg">
              <div class="table-scroll-wrapper">
                <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                  <thead>
                    <tr>
                      <!-- <th>{{ $t('media_order_number') }}</th> -->
                      <th>No.</th>
                      <th>{{ $t('media') }}</th>
                      <th>{{ $t('media_title') }}</th>
                      <th>{{ $t('media_price') }} (USD)</th>
                      <th>{{ $t('media_description') }}</th>
                      <!-- <th></th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(item, index) in myMediaList" 
                      :key="index" 
                      @click="toggleSelect(item)" 
                      :class="{'selected-row': item.selected}" 
                      style="cursor: pointer;"
                    >
                      <!-- <td><input type="checkbox" v-model="item.selected"></td> 체크박스 -->
                      <td style="width: 70px; cursor: pointer;">{{ item.order_no }}</td>
                      <td style="width: 140px; cursor: pointer;" v-if="item.type == 'VIDEO'"><video :src="item.url" controls autoplay loop muted style="width: 100%; max-width: 100px;"></video></td>
                      <td style="width: 100px; cursor: pointer;" v-else><q-img :src="item.url" style="width: 100px;" /></td>
                      <td style="width: 150px; cursor: pointer;"> {{ truncateText(item.title, 10) }}</td>
                      <td style="width: 100px; cursor: pointer;" v-if="item.price > 0">{{ Number(item.price).toLocaleString() }}</td>
                      <td style="width: 100px; cursor: pointer;" v-else><span>-</span></td>
                      <td style="width: 300px; cursor: pointer;">{{ truncateText(item.description, 20) }}</td>
                      <!-- <td style="width: 100px;">
                        <q-icon name="edit" size="md" @click="goEdit(item.seq)">
                          <q-tooltip>{{ $t('edit') }}</q-tooltip>
                        </q-icon>
                        &nbsp;&nbsp;&nbsp;
                        <q-icon name="delete_forever" size="md" @click="deleteMyMedia(item.seq)">
                          <q-tooltip>{{ $t('delete') }}</q-tooltip>
                        </q-icon>
                      </td> -->
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

          <div v-if="noDataFlag" class="row justify-center q-pt-lg">
            <img src="images/sorry-no-data.png" style="width: 50%; max-width: 400px;" />
          </div>

          <div style="display: flex; justify-content: flex-end; padding-top: 30px;">
            <q-btn
              :label="$t('go_next')"
              @click="goTabNext"
              style="background-color: #90B2D8; color: white "
            />
          </div>

        </div>
      </keep-alive>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 2. 전시소개 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="2">
        <div class="tab-panel-2 q-pt-lg">
          <span>{{ $t('project_basic_information') }}</span>
          <div class="underline"></div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_name') }}<span class="text-red"> *</span></span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="title" :disable="true" ref="refTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_subtitle') }}<span class="text-red"> *</span></span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="subtitle" ref="refTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-md">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_symbol') }}</span>&nbsp;
            <span class="text-weight-bold text-subtitle1 text-red"> * </span>
            <q-icon name="help" size="sm">
              <q-tooltip>
                {{ $t('project_symbol_hint') }}
              </q-tooltip>
            </q-icon>
            <div style="max-width: 600px;">
              <q-input v-model="symbol" :disable="true" ref="refSymbol" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable outlined tabindex="1" />
            </div>
          </div>

          <div class="q-pt-md">
            <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_banner') }}<span class="text-red"> *</span></span>
            <span class="text-grey">
              &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
            </span>
          </div>
          <div style="max-width: 600px;">
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
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_exhibition_day') }}</span>
          </div>
          <div style="max-width: 600px;">
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
            <div class="q-pt-md" style="max-width: 300px;">
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
              <div class="col-12 text-red text-bold q-pt-xs">
                {{ $t('project_date_hint') }}
              </div>
            </div>
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_poster_image') }}<span class="text-red"> *</span></span>
            <span class="text-grey">
              &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
            </span>
          </div>
          <div style="max-width: 600px;">
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
          </div>
          <br><br><br>

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
          
          <div style="display: flex; justify-content: space-between; padding-top: 30px;">
            <q-btn
              :label="$t('go_back')"
              @click="goTabBack"
              style="background-color: #90B2D8; color: white "
            />
            <q-btn
              :label="$t('go_next')"
              @click="goTabNext"
              style="background-color: #90B2D8; color: white "
            />
          </div>

        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 3. 작가 정보 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="3" style="word-break: break-word;">

        <div class="tab-panel-1 q-pt-lg">
          <span>{{ $t('artist_basic_information') }}</span>
          <div class="underline"></div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('artist_nickname') }}<span class="text-red"> *</span></span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="nickname" ref="refNickname" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-md">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_official_email') }}</span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="email" ref="refEmail" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-md">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_instargram') }}</span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="instargram" ref="refInstargram" placeholder="ex) https://www.instagram.com/banana123" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_twitter') }}</span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="twitter" ref="refTwitter" placeholder="ex) https://x.com/banana123" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_discord') }}</span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="discord" ref="refDiscord" placeholder="ex) https://discord.gg/banana123" clearable outlined tabindex="1" />
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_telegram') }}</span>
          </div>
          <div style="max-width: 600px;">
            <q-input v-model="telegram" ref="refTelegram" placeholder="ex) https://t.me/banana123" clearable outlined tabindex="1" />
          </div>
          <br><br><br>


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
          
          <div style="display: flex; justify-content: space-between; padding-top: 30px;">
            <q-btn
              :label="$t('go_back')"
              @click="goTabBack"
              style="background-color: #90B2D8; color: white "
            />
            <q-btn
              :label="$t('go_next')"
              @click="goTabNext"
              style="background-color: #90B2D8; color: white "
            />
          </div>

        </div>
      </q-tab-panel>
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <!-- 4. 미리보기 및 등록 패널 -->
      <!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
      <q-tab-panel name="4">
        <div class="c">
          <span>{{ $t('project_basic_information') }}</span>
          <div class="underline" style="margin-bottom: 20px;"></div>

          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_title') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ title }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_symbol') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ symbol }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('start_time') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ startTime }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('end_time') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ endTime ? endTime : $t('indefinite') }}
            </div>
          </div>
          <div v-if="projectDescription" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_description') }}</span>
            </div>
          </div>
          <div v-if="projectDescription" class="q-pb-md q-pl-xs">
            <div class="row justify-center q-pb-md q-pl-xs t-stit">
              <div class="col-12" v-html="projectDescription" />
            </div>
          </div>
          <div v-if="projectBackground" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_background') }}</span>
            </div>
          </div>
          <div v-if="projectBackground" class="q-pb-md q-pl-xs">
            <div class="row justify-center q-pb-md q-pl-xs t-stit">
              <div class="col-12" v-html="projectBackground" />
            </div>
          </div>

          <div class="project-list row">
          <div v-for="item in selectedMyMediaList" :key="item.seq">
            <q-item>
              <q-item-section avatar>
                <q-avatar square v-if="item.type == 'VIDEO'">
                  <video :src="item.url" controls autoplay loop muted style="width: 100%; max-width: 100px;"></video>
                </q-avatar>
                <q-avatar square v-else>
                  <img v-if="item.url" :src="item.url">
                  <q-icon v-else name="rocket_launch" size="md" />
                </q-avatar>
              </q-item-section>
            </q-item>
          </div>
        </div>

          <span>{{ $t('artist_basic_information') }}</span>
          <div class="underline" style="margin-bottom: 20px;"></div>

          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('artist_nickname') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ nickname }}
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_official_email') }}</span>
            </div>
          </div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ email }}
            </div>
          </div>
          <div v-if="instargram" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_instargram') }}</span>
            </div>
          </div>
          <div v-if="instargram" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ instargram }}
            </div>
          </div>
          <div v-if="twitter" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_twitter') }}</span>
            </div>
          </div>
          <div v-if="twitter" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ twitter }}
            </div>
          </div>
          <div v-if="discord" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_discord') }}</span>
            </div>
          </div>
          <div v-if="discord" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ discord }}
            </div>
          </div>
          <div v-if="telegram" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('project_telegram') }}</span>
            </div>
          </div>
          <div v-if="telegram" class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ telegram }}
            </div>
          </div>
          <div v-if="artistDescription" class="row justify-center">
            <div class="col-12">
              <span class="text-weight-bold text-subtitle1 text-grey-6 t-tit">{{ $t('artist_details') }}</span>
            </div>
          </div>
          <div v-if="artistDescription" class="q-pb-md q-pl-xs">
            <div class="row justify-center q-pb-md q-pl-xs t-stit">
              <div class="col-12" v-html="artistDescription" />
            </div>
          </div>

          <div class="center q-pb-md">
            <q-btn
              size="lg"
              @click="register"
              :disable="isButtonClicked"
              :label="$t('register_project')"
              class="exhibit-btn"
            />
          </div>
          <div class="center">
            <q-btn flat round dense @click="goTabBack">
              <q-icon name="keyboard_double_arrow_left" size='xl' />
            </q-btn>
            <!-- <q-btn
              :label="$t('go_back')"
              @click="goTabBack"
              style="background-color: #90B2D8; color: white "
            /> -->
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>


  </q-page>

  <WalletModal ref="refWalletModal" />
  <ExhibitionTypeModal ref="refExhibitionTypeModal" @callback-register="setexhibitionName"/>
  <MediaDetailModal ref="refMediaDetailModal" />

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
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js'

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
      mainnet: 'KLAYTN',
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
      // seqFileMst: '' // 파일 마스터 SEQ
      confirmGoBack: false, // goBack 확인창
      truncateTitle: 10,
      truncateDescription: 200,
      ////////////////////////
      nickname: '',
      // representativeSns: '',
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
      isButtonClicked: false,
      keyword: '',
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      noDataFlag: false, // 나의 작품 데이터 없음 플래그
      myMediaList: [],
      mediaList: [],
      originalMediaList: [],
      selectedState: {},
      // selectedMyMediaList: [
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      //   {
      //     seq: 1,
      //     type: 'IMAGE',
      //     url: 'https://picsum.photos/500',
      //   },
      // ]
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
    selectedMyMediaList() {
      return this.myMediaList.filter(item => item.selected)
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

    // 이전에 선택된 상태를 불러옵니다.
    const savedState = JSON.parse(localStorage.getItem('mediaSelectionState'))
    if (savedState) {
      this.selectedState = savedState
      console.log("this.selectedState")
      console.log(this.selectedState)
    }

    // 미디어 등록 후 tab 설정
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab
    }

    this.checkLogin()
    
    // 팀 지갑주소에 사용자 지갑주소 디폴트 설정
    // this.projectWalletAddress = this.getWalletAddress

    // this.nickname = nickname ? nickname : ''

    // 프로젝트 조회
    this.selectProject()

    // 미디어 리스트 조회
    this.selectListMax()
  },
  watch: {
    getNickname(newNickname) {
      this.nickname = newNickname
    },
  },
  mounted: function () {
    this.nickname = this.getNickname
  },
  beforeUnmount() { 
    // 페이지를 나갈 시 미디어 리스트 선택사항 삭제
    localStorage.removeItem('mediaSelectionState')
    this.selectedState = {}
    this.myMediaList = []
  },
  methods: {
    checkLogin() {
      // 로그인 되어있지 않으면 로그인페이지로 이동, 로그인 후 돌아올 path 설정
      if(!this.getUid) {
        this.$router.push({ path: '/login', query: { redirectPath: this.$route.path }})
      }
    },
    goTabNext() {
      if (this.tab == '1') {
        this.processMediaLists()
      } else {
        console.log("register")
        this.branchInsertUpdate()   // 등록
      }

      // 다음 탭으로
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
    toggleSelect(item) {
      item.selected = !item.selected
      this.saveSelectionState()
    },
    saveSelectionState() {
      // 현재 선택 상태를 저장
      this.myMediaList.forEach(item => {
        this.selectedState[item.seq] = item.selected // seq를 key로 사용하여 저장
      })
      localStorage.setItem('mediaSelectionState', JSON.stringify(this.selectedState))
    },
    async applySelectionState() {
      // 선택된 미디어와 나의 미디어를 비교하여 선택 상태 적용
      this.myMediaList.forEach(item => {
        // console.log(`myMediaList.seq: ${item.seq}`)

        // mediaList에서 my_media_seq와 item.seq를 비교
        const matchedMedia = this.mediaList.find(media => {
          // console.log(media)
          // console.log(`Comparing with mediaList.my_media_seq: ${media.my_media_seq}`)
          return media.my_media_seq === item.seq
        })

        if (matchedMedia) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    goMyMediaList() {
      // this.$router.push({ path: '/media/registerMedia', query: { seq: this.projectSeq }})
      this.$router.push('/media')
    },
    async selectProject() {
      this.$axios.get('/api/project/selectProject',
        {params: {uid: this.getUid, seq: this.projectSeq}})
        .then((result) => {
          console.log("result.data.nickname")
          console.log(result.data.nickname)
          this.nickname = result.data.nickname
          this.email = result.data.email
          this.instargram = result.data.instargram
          this.twitter = result.data.twitter
          this.discord = result.data.discord
          this.telegram = result.data.telegram
          this.artistDescription = result.data.artist_details
          this.title = result.data.title
          this.symbol = result.data.symbol
          this.subtitle = result.data.subtitle
          this.exhibitionName = result.data.exhibition_name
          this.bannerImage = result.data.banner_url
          this.posterImage = result.data.postar_url
          this.startTime = result.data.display_start_time
          this.endTime = result.data.display_end_time
          this.projectDescription = result.data.description
          this.projectBackground = result.data.production_background

          console.log("selectProject this.bannerImage")
          console.log(this.bannerImage)
          console.log("selectProject this.posterImage")
          console.log(this.posterImage)
        })
        .catch((err) => {
          console.log(err)
        })
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
      this.saveSelectionState() // 새로고침 전에 선택 상태 저장
      this.myMediaList = []
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
      this.$axios.get('/api/mymedia/selectMyMediaListLastPageNum',
        {params: {uid: this.getUid, pageSize: this.pageSize, keyword: this.keyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 작품 리스트 조회
    async selectList(idx, done) {
      if (!this.keyword) {
        this.keyword = ''
      }
      this.$axios.get('/api/mymedia/selectMyMediaList',
        {params: {uid: this.getUid, pageNum: idx, pageSize: this.pageSize, keyword: this.keyword}})
        .then(async (result) => {
          // console.log(JSON.stringify(result.data))
          // console.log(result.data)
          if (idx === 1) { // 첫번째 load인 경우
            this.myMediaList = [] // 리스트 초기화
          }
          this.myMediaList = this.myMediaList.concat(result.data)

          // 선택된 미디어 리스트와 비교하여 선택 상태 적용
          await this.selectMediaList()

          // 데이터 없음 표시 설정
          if (!this.myMediaList || this.myMediaList.length < 1) {
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
    async selectMediaList() {
      this.$axios.get('/api/media/selectMediaList',
        {params: {uid: this.getUid, projectSeq: this.projectSeq}})
        .then((result) => {
          this.mediaList = result.data.filter(media => media.del_yn === 'N')
          console.log(this.mediaList)

          this.originalMediaList = result.data

          // myMediaList와 mediaList 비교하여 선택 상태 적용
          this.applySelectionState()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    truncateText(text, maxLength) {
      if (!text) {
        return ''
      }

      if (text.length <= maxLength) {
        return text
      }
      return text.substring(0, maxLength) + '...'
    },
    showDetail(item) {
      console.log(item)
      this.$refs.refMediaDetailModal.myMediaVo = item
      this.$refs.refMediaDetailModal.show()
    },
    ///////////////////////////////////////////////////////////////////////////
    // validation
    ///////////////////////////////////////////////////////////////////////////
    required(val) {
      const message = this.$t('validation_required')
      return required(val, message)
    },
    requiredNumber(val) {
      const message = this.$t('validation_required')
      return required(val, message)
    },
    minLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_min_length') + ': ' + length
      return minLength(val, message, length)
    },
    maxLength(val, length) {
      if (!val) {
        return true
      }
      const message = this.$t('validation_max_length') + ': ' + length
      return maxLength(val, message, length)
    },
    minValue(val, value) {
      const message = this.$t('validation_min_value') + ': ' + value
      return minValue(val, message, value)
    },
    maxValue(val, value) {
      const message = this.$t('validation_max_value') + ': ' + value
      return maxValue(val, message, value)
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
    async branchInsertUpdate() {
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

      this.doModifyProject()
    },
    // 프로젝트 수정
    async doModifyProject() {
      console.log("doModifyProject ==================")
      console.log("bannerImage : " + this.bannerImage)
      console.log("posterImage : " + this.posterImage)

      // 1. 프로젝트 수정 처리
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        nickname: this.nickname,
        status_cd: '10', // 등록중
        // representative_sns_id: this.representativeSns,
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
        postar_url: this.posterImage,
        display_start_time: this.start_time,
        display_end_time: this.end_time,
        description: this.projectDescription,
        production_background: this.projectBackground,
        mod_id: this.getUid,
        mainnet: this.mainnet,
        // nft_yn: 'Y', // NFT 프로젝트 여부 = 'Y'
      }
      // this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/updateProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
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
    async register() {
      this.isButtonClicked = true
      // 미디어 수정 혹은 등록
      // this.processMediaLists()

      // 프로젝트 status_cd변경
      this.updateProjectStatusCd()
    },
    async updateProjectStatusCd() {
      // 1. 프로젝트 수정 처리
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        status_cd: this.$PROJECT_STATUS_CD_PAID,      // 정보 등록 완료(결제 완료)
      }
      try {
        this.$q.loading.show() // 로딩 표시 시작
        const result = await this.$axios.post('/api/project/updateProjectStatusCd', params)
        console.log(JSON.stringify(result.data))

        if (result.data && result.data.resultCd === 'SUCCESS') {
          console.log('SUCCESS')
          this.$q.loading.hide()  // 로딩 표시 종료
          
          // mintKlaytnNft API 호출을 대기
          console.log('projectSeq   ==  ' + this.projectSeq)

          await this.$axios.get('/api/project/mintKlaytnNft', { params: { seq: this.projectSeq } })

          // 나의 프로젝트 리스트 화면으로 이동
          this.$router.push('/mypage/MyExhibition')
        }
      } catch (err) {
        console.log(err)
        this.$noti(this.$q, err)
      }
    },
    // 미디어 등록, 삭제, 재등록 처리
    async processMediaLists() {
      try {
        // 현재 선택된 미디어 리스트 (MyMediaVo 리스트)
        const selectedMediaList = this.selectedMyMediaList
        // console.log('Selected Media List:')
        // console.table(selectedMediaList)

        // 기존 DB에 저장된 미디어 리스트
        const currentMediaList = this.originalMediaList
        // console.log('Current Media List:')
        // console.table(currentMediaList)

        // add 리스트 생성: 선택된 미디어 리스트에 있지만 기존 리스트에 없는 항목  - 새로운 항목
        const addList = selectedMediaList.filter(selected => {
          return !currentMediaList.some(media => media.my_media_seq === selected.seq)
        })
        // console.log('Add List:')
        // console.table(addList)

        // delete 리스트 생성: 기존 리스트에 있지만 선택된 리스트에 없는 항목 - 지워진 항목
        const deleteList = currentMediaList.filter(media => {
          return !selectedMediaList.some(selected => selected.seq === media.my_media_seq)
        })
        // console.log('deleteList List:')
        // console.table(deleteList)

        // restore 리스트 생성: 선택된 리스트에 있지만 기존 리스트에 있고, 해당 항목이 삭제된 상태인 경우
        const restoreList = currentMediaList.filter(media => {
          return selectedMediaList.some(selected => selected.seq === media.my_media_seq && media.del_yn === 'Y')
        })
        // console.log('Restore List:')
        // console.table(restoreList)
        // console.log('---------------')

        // 각각의 리스트를 처리
        await this.insertMediaList(addList)
        await this.deleteMediaList(deleteList)
        await this.restoreMedia(restoreList)

      } catch (error) {
        console.error('Error processing media lists:', error)
        this.$q.notify({ type: 'negative', message: 'Failed to process media lists.' })
      }
    },
    // 미디어 등록
    async insertMediaList(addMediaList) {
      if (addMediaList.length === 0) {
        console.log("addMediaList 선택된 항목x")
        return
      }

      // project_seq 추가
      addMediaList.forEach(item => {
        item.project_seq = this.projectSeq
      })

      // this.$q.loading.show()
      this.$axios.post('/api/media/insertMediaList', addMediaList)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // // 페이지 이동
            // this.$router.push('/media') // 나의 작품 리스트
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 미디어 삭제
    async deleteMediaList(deleteList) {
      if (deleteList.length === 0) {
        console.log("deleteMediaList 선택된 항목x")
        return
      }

      // this.$q.loading.show()
      this.$axios.post('/api/media/deleteMedia', deleteList)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // // 페이지 이동
            // this.$router.push('/media') // 나의 작품 리스트
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
          this.$noti(this.$q, err)
        })
    },
    // 미디어 재등록
    async restoreMedia(restoreList) {
      if (restoreList.length === 0) {
        console.log("restoreList 선택된 항목x")
        return
      }

      // this.$q.loading.show()
      this.$axios.post('/api/media/restoreMedia', restoreList)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // // 페이지 이동
            // this.$router.push('/media') // 나의 작품 리스트
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
          }
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
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
