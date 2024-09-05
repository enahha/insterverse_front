<template>
  <q-page class="page-1200 q-pa-md project-reg-wrap">
    <div class="row title">
      <div class="col-12 doc-heading">
        <div class="title-sec"><span>{{ $t('menu_project_register') }}</span></div>
      </div>
    </div>

    <q-page-scroller class="custom-scroller" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="secondary" />
    </q-page-scroller>

    <q-tabs
      v-model="tab"
      no-caps
      align="justify"
      inline-label
    >
      <q-tab name="1" @click="unableTabNext">{{ $t('project_artwork') }}</q-tab>
      <q-tab name="2" @click="unableTabNext">{{ $t('project_description') }}</q-tab>
      <q-tab name="3" @click="unableTabNext">{{ $t('project_artist') }}</q-tab>
      <q-tab name="4" @click="unableTabNext">{{ $t('project_preview') }}</q-tab>
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

          <q-infinite-scroll @load="loadMore" :offset="1000" ref="infiniteScroll">
            <q-table
              flat
              :rows="myMediaList"
              :columns="columns"
              row-key="seq"
              selection="multiple"
              v-model:selected="selected"
              class="media-table-wrapper text-center q-pt-lg"
              virtual-scroll
              v-model:pagination="pagination"
              :rows-per-page-options="[10, 25, 50, 100]"
            >
              <template v-slot:body-cell-media="props">
                <q-td :props="props"  @click="showDetail(props.row)">
                  <video v-if="props.row.type === 'VIDEO'" :src="props.row.url" controls autoplay loop muted style="width: 100%; max-width: 100px;"></video>
                  <q-img v-else :src="props.row.url" style="width: 100px;" />
                </q-td>
              </template>
              <template v-slot:body-cell-title="props">
                <q-td :props="props"  @click="showDetail(props.row)">{{ truncateText(props.row.title, 10) }}</q-td>
              </template>
              <template v-slot:body-cell-price="props">
                <q-td :props="props"  @click="showDetail(props.row)">{{ props.row.price > 0 ? Number(props.row.price).toLocaleString() : '-' }}</q-td>
              </template>
              <!-- <template v-slot:body-cell-description="props">
                <q-td :props="props">{{ truncateText(props.row.description, 50) }}</q-td>
              </template> -->
            </q-table>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>

          <div v-if="noDataFlag" class="row justify-center q-pt-lg">
            <img src="images/no_data.png" style="width: 35%; max-width: 250px;" />
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
            <q-input v-model="title" ref="refTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable outlined tabindex="1" />
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
              <q-input v-model="symbol" ref="refSymbol" :rules="[required, val => minLength(val, 1), val => maxLength(val, 10)]" clearable outlined tabindex="1" />
            </div>
          </div>

          <div class="q-pt-md">
            <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_banner') }}<span class="text-red"> *</span></span>
            <span class="text-grey">
              &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
            </span>
          </div>
          <div style="max-width: 600px;">
            <div class="row justify-center q-pb-xs">
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
            <div class="col-12 text-red text-bold worn-text">
              {{ $t('project_banner_hint') }}
            </div>
          </div>

          <div class="q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_exhibition_day') }}</span>
          </div>
          <div style="max-width: 600px;">
            <!-- 전시 시작일 -->
            <div class="" style="max-width: 300px;">
              <q-input v-model="startTime" :label="$t('start_time')" ref="refStartTime" outlined tabindex="6">
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
            <div class="q-pt-xs" style="max-width: 300px;">
              <q-input v-model="endTime" :label="$t('end_time')" ref="refEndTime" outlined tabindex="6">
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
              <div class="col-12 text-red text-bold q-pt-xs worn-text">
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
            <div class="row justify-center  q-pb-xs">
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
            <!-- <div class="col-12 text-red text-bold worn-text">
              {{ $t('square_image_only') }}
            </div> -->
          </div>

          <div class="row q-pt-lg">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_tag') }}<span class="text-red"></span></span>
          </div>
          <div class="input-wrapper" style="max-width: 600px;">
            <q-input
                class="input-tag"
                type="text"
                v-model="hashState.hashtag"
                @keyup.enter="onEnterKey"
                :placeholder="hashState.hashArr.length < 5 ? '#태그 입력 (최대 5개)' : '최대 5개까지 입력'"
                :disabled="hashState.hashArr.length >= 5"
                clearable outlined tabindex="1"
              />
            <div class="hash-wrapper">
              <div
                class="hash-item"
                v-for="(tag, index) in hashState.hashArr"
                :key="index"
                draggable="true"
              >
                <p># {{ tag }}</p>
                <p class="hash-item-delete" @click="removeHashTag(index)">x</p>
              </div>
            </div>
          </div>
          <br><br>

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

          <div style="display: flex; justify-content: flex-end;">
            <q-btn
              label="showExhibitionTypeModal"
              @click="showExhibitionTypeModal"
              :style="{ backgroundColor: methodsExecuted ? 'black' : '#0C2C69', color: 'white', width: '10%' }"
            />
          </div>
          
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
          <span style="font-weight: bold; font-size: 20px;">{{ $t('project_period') }}</span>
          <div class="underline" style="margin-bottom: 30px"></div>
          <div class="justify-center q-pb-md q-pl-xs">
            <div class="col-12 t-text">
              {{ startTime }} ~ {{ endTime ? endTime : $t('indefinite') }}
            </div>
          </div>

          <span v-if="projectDescription" style="font-weight: bold; font-size: 20px;">{{ $t('project_description') }}</span>
          <div v-if="projectDescription" class="underline" style="margin-bottom: 30px"></div>
          <div v-if="projectDescription" class="q-pb-md q-pl-xs">
            <div class="row justify-center q-pb-md q-pl-xs t-stit">
              <div class="col-12" v-html="projectDescription" />
            </div>
          </div>

          <span style="font-weight: bold; font-size: 20px;">{{ $t('project_catalog') }}</span>
          <div class="underline" style="margin-bottom: 30px"></div>
          <div class="project-list row">
          <div v-for="item in selected" :key="item.seq">
            <q-item>
              <q-item-section avatar>
                <!-- 스타일이 안먹어서 해당 파일 아래 따로 스타일 설정 -->
                <q-avatar square v-if="item.type == 'VIDEO'" class="media-container">
                  <video :src="item.url" controls autoplay loop muted class="media-content"></video>
                </q-avatar>
                <q-avatar square v-else class="media-container">
                  <img v-if="item.url" :src="item.url"  class="media-content">
                  <q-icon v-else name="rocket_launch" size="md" />
                </q-avatar>
              </q-item-section>
            </q-item>
          </div>
          </div>

          <!-- 하단 공간 확보 -->
          <div class="row justify-center q-pa-xl">
          </div>

          <span style="font-weight: bold; font-size: 20px;">{{ $t('artist_basic_information') }}</span>
          <div class="underline" style="margin-bottom: 30px"></div>
          <div class="row justify-center q-pb-md q-pl-xs">
            <div class="col-12 text-weight-bold" style="font-size: 50px;">
              {{ nickname }}
            </div>
            <div class="col-12" style="font-size: 20px;">
              {{ instargram }}
            </div>
          </div>
          <div v-if="artistDescription" class="q-pb-md q-pl-xs">
            <div class="row justify-center q-pb-md q-pl-xs t-stit">
              <div class="col-12" v-html="artistDescription" />
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

          <!-- 하단 공간 확보 -->
          <div class="row justify-center q-pa-xl">
          </div>

          <span v-if="projectBackground">{{ $t('project_background') }}</span>
          <div v-if="projectBackground" class="underline" style="margin-bottom: 30px"></div>
          <div v-if="projectBackground" class="q-pb-md q-pl-xs">
            <div class="row justify-center q-pb-md q-pl-xs t-stit">
              <div class="col-12" v-html="projectBackground" />
            </div>
            <!-- 하단 공간 확보 -->
            <div class="row justify-center q-pa-xl">
            </div>
          </div>

          <span>{{ $t('project_nft_info') }}</span>
          <div class="underline" style="margin-bottom: 30px"></div>
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

          <div style="display: flex; justify-content: space-between; padding-top: 30px;">
            <q-btn
              :label="$t('go_back')"
              @click="goTabBack"
              style="background-color: #90B2D8; color: white "
            />
            <q-btn
              outline
              @click="register"
              :disable="isButtonClicked"
              :label="$t('register_project')"
              style="background-color: #FEFEFE; color: #90B2D8; width: 200px; font-weight: bold;"
            />
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
import { defineComponent, reactive } from 'vue'
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
      startTime: null,
      endTime: null,
      projectDescription: '',
      projectBackground: '',

      methodsExecuted: false,
      isButtonClicked: false,
      keyword: '',
      refresherDone: '',
      pageSize: 50,
      lastPageNum: 1, // 마지막 페이지
      noDataFlag: false, // 나의 작품 데이터 없음 플래그
      columns: [
        { name: 'order_no', required: true, label: 'No.', align: 'center', field: 'order_no' , style: { width: '20px' }},
        { name: 'media', label: this.$t('media'), align: 'center', field: 'type', style: { width: '250px' }},
        { name: 'title', label: this.$t('media_title'), align: 'center', field: 'title' },
        { name: 'price', label: this.$t('media_price') + ' (USD)', align: 'center', field: 'price' },
        // { name: 'description', label: this.$t('media_description'), align: 'left', field: 'description' },
      ],
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 10, 
      },
      myMediaList: [],
      selectedState: {},
      hashState: reactive({
        hashtag: '',
        hashArr: [],
      }),
      // selectedmyMediaList: [
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
    selectedmyMediaList() {
      return this.myMediaList.filter(item => item.selected);
    },
    paginatedRows() {
      const start = (this.pagination.page - 1) * this.pagination.rowsPerPage
      const end = start + this.pagination.rowsPerPage
      return this.myMediaList.slice(start, end)
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

    this.nickname = nickname ? nickname : ''

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
    unableTabNext() {
      event.preventDefault()
      event.stopPropagation()
      this.currentTab = this.currentTab
    },
    goTabNext() {
      if (this.tab == '1') {
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
      // 저장된 선택 상태 적용
      this.myMediaList.forEach(item => {
        if (this.selectedState.hasOwnProperty(item.seq)) {
          item.selected = this.selectedState[item.seq]
        } else {
          item.selected = false // 이전에 선택되지 않은 항목은 false로 설정
        }
      })
    },
    onEnterKey() {
      const trimmedTag = this.hashState.hashtag.trim()
      if (trimmedTag && this.hashState.hashArr.length < 5) {
        this.hashState.hashArr.push(trimmedTag)
        this.hashState.hashtag = ''
      }
    },
    removeHashTag(index) {
      if (index >= 0 && index < this.hashState.hashArr.length) {
        this.hashState.hashArr.splice(index, 1)
      }
    },
    goMyMediaList() {
      // this.$router.push({ path: '/media/registerMedia', query: { seq: this.projectSeq }})
      this.$router.push('/media')
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
          // 선택 상태 적용
          await this.applySelectionState()

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
      if (!this.$refs.refTitle.validate()) {
        result = false
      }
      if (!this.$refs.refSubTitle.validate()) {
        result = false
      }
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
      if (!this.$refs.refSymbol.validate()) {
        result = falsetrue
      }
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

      this.doInsertProject()
    },
    // 등록
    async doInsertProject() {
      // insert / update 구분용
      this.methodsExecuted = true
      // 시작일을 입력하지 않으면 오늘 날짜와 시간으로 지정
      if (this.startTime === null) {
        const now = new Date().toISOString()
        this.startTime = now.replace('T', ' ').split('.')[0]
      }
      console.log(this.hashState.hashArr)
      // 1. 등록
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
        display_start_time: this.startTime,
        display_end_time: this.endTime,
        description: this.projectDescription,
        production_background: this.projectBackground,
        mainnet: this.mainnet,
        tag_list: this.hashState.hashArr,
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
      console.log("doModifyProject")
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
        display_start_time: this.startTime,
        display_end_time: this.endTime,
        description: this.projectDescription,
        production_background: this.projectBackground,
        mod_id: this.getUid,
        mainnet: this.mainnet,
        tag_list: this.hashState.hashArr,
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
      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      this.isButtonClicked = true

      // 미디어 리스트 등록
      this.insertmyMediaList()

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
          this.$q.loading.hide() // 로딩 표시 시작
          
          // 나의 프로젝트 리스트 화면으로 이동
          this.$router.push('/mypage/MyExhibition')
          
          // mintKlaytnNft API 호출을 대기
          await this.$axios.get('/api/project/mintKlaytnNft', { params: { seq: this.projectSeq } })

        }
      } catch (err) {
        console.log(err)
        this.$noti(this.$q, err)
      }
    },
    async insertmyMediaList() {
      // 선택된 미디어 항목을 필터링
      // const selectedMedia = this.myMediaList.filter(item => item.selected)
      
      if (this.selected.length === 0) {
        console.log("선택된 항목x")
        return
      }

      // project_seq 추가
      this.selected.forEach(item => {
        item.project_seq = this.projectSeq
      })

      // this.$q.loading.show()
      this.$axios.post('/api/media/insertMediaList', this.selected)
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
      console.log(this.posterImage)
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
.media-container {
    overflow: hidden;
    cursor: pointer; /* 손가락 모양으로 변경 */
}
.media-content {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #f6f6f6;
    transition: transform 0.3s ease; /* 부드러운 변형 효과 */
}

.media-container:hover .media-content {
}
</style>