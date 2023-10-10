<template>
  <q-page class="q-pa-md page-default project-reg-wrap">
    <div class="row justify-center page-tit">
      <div class="col-12 doc-heading doc-h2">
        {{ $t('menu_project_register') }}
      </div>
    </div>
    <div class="row justify-center page-sub-tit">
      <div class="col-12">
        {{ $t('menu_project_register_description') }}
      </div>
    </div>
    <div class="row justify-center q-pb-md">
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('mainnet') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-select
          v-model="mainnetObj"
          :options="mainnetOptions"
          dense
          standout
          style="width: 200px;"
          tabindex="1"
        />
      </div>
    </div>

    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_type') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-select
          v-model="projectTypeObj"
          :options="projectTypeOptions"
          dense
          standout
          style="width: 200px;"
          tabindex="1"
        />
      </div>
    </div>

    <div class="row justify-center q-pt-md">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_wallet_address') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectWalletAddress" ref="projectWalletAddress" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_token_contract_address') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectTokenContractAddress" ref="projectTokenContractAddress" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>

    <!-- lp contract address -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }}</span>
      </div>
    </div>
    <q-expansion-item
      icon="join_full"
      :label="$t('project_lp_contract_address_description')"
      style="border-radius: 30px"
      header-class="bg-grey-2"
      class="q-pb-xl"
    >
      <q-list padding bordered class="q-pl-md q-pr-md">
        <!-- lp contract address 1 -->
        <div class="row justify-center q-pt-md">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 1</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress1" ref="projectLpContractAddress1" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 2 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 2</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress2" ref="projectLpContractAddress2" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 3 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 3</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress3" ref="projectLpContractAddress3" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 4 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 4</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress4" ref="projectLpContractAddress4" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 5 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 5</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress5" ref="projectLpContractAddress5" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 6 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 6</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress6" ref="projectLpContractAddress6" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 7 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 7</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress7" ref="projectLpContractAddress7" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 8 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 8</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress8" ref="projectLpContractAddress8" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 9 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 9</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress9" ref="projectLpContractAddress9" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>

        <!-- lp contract address 10 -->
        <div class="row justify-center">
          <div class="col-12">
            <span class="text-weight-bold text-subtitle1">{{ $t('project_lp_contract_address') }} 10</span>
          </div>
        </div>
        <div class="row justify-center q-pb-md">
          <div class="col-12">
            <q-input v-model="projectLpContractAddress10" ref="projectLpContractAddress10" :rules="[val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
          </div>
        </div>
      </q-list>

    </q-expansion-item>
    

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_title') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectTitle" ref="projectTitle" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="1" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_title') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectTitleKo" ref="projectTitleKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 50)]" clearable standout tabindex="2" />
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_summary') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectSummary" ref="projectSummary" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="3" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_summary') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectSummaryKo" ref="projectSummaryKo" :rules="[required, val => minLength(val, 1), val => maxLength(val, 100)]" clearable standout tabindex="4" />
      </div>
    </div>

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_description') }} (English)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-lg">
      <div class="col-12">
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
    <div class="row justify-center q-pt-sm">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_description') }} (Korean)<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-editor
          v-model="projectDescriptionKo"
          min-height="10rem"
          autofocus
          tabindex="6"
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
    <br />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_official_website') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectOfficialWebsite" ref="projectOfficialWebsite" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="7" placeholder="e.g. https://klayswap.com" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_official_email') }}<span class="text-red"> *</span></span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectOfficialEmail" ref="projectOfficialEmail" :rules="[required, val => minLength(val, 5), val => maxLength(val, 30)]" clearable standout tabindex="8" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1" style="display: inline-block;">{{ $t('project_logo_image') }}</span>
        <span class="text-grey">
          &nbsp;&nbsp;({{ $t('image_reset') }} : <q-icon name="done_all" size="sm" />)
        </span>
      </div>
    </div>
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
          @uploaded="fileUploaded"
        />
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12 text-red text-bold">
        {{ $t('square_image_only') }}
      </div>
    </div>

    <!-- preview -->
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">※ {{ $t('preview') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img v-if="projectLogoImage" :src="projectLogoImage">
                <q-icon v-else name="rocket_launch" size="md" />

              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="row">
                <q-item-label class="col-12">{{ projectTitle }}</q-item-label>
                <q-item-label class="col-12">{{ projectSummary }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
    <br />

    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_docs') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectDocs" ref="projectDocs" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="10" placeholder="e.g. https://docs.klayswap.com" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_blog') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectBlog" ref="projectBlog" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="11" placeholder="e.g. https://medium.com/iotrustlab/tagged/klayswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_medium') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectMedium" ref="projectMedium" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="12" placeholder="e.g. https://medium.com/klayswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_telegram') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectTelegram" ref="projectTelegram" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="13" placeholder="e.g. https://t.me/klayswapchannel" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_twitter') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectTwitter" ref="projectTwitter" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="14" placeholder="e.g. https://twitter.com/KLAYswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_github') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectGithub" ref="projectGithub" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="15" placeholder="e.g. https://github.com/KlaySwap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_meta') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectMeta" ref="projectMeta" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="16" placeholder="e.g. https://www.facebook.com/klayswap" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <span class="text-weight-bold text-subtitle1">{{ $t('project_discord') }}</span>
      </div>
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-12">
        <q-input v-model="projectDiscord" ref="projectDiscord" :rules="[val => maxLength(val, 100)]" clearable standout tabindex="17" placeholder="e.g. https://discord.gg/fRhThwHXGQ" />
      </div>
    </div>

    <div class="row justify-center q-pt-md">
      <div class="col-6 text-left">
        <q-btn class="btn" color="grey-3" text-color="black" size="lg" style="width: 98%;" @click="goBack" tabindex="19">
          <b>{{ $t('go_back') }}</b>
        </q-btn>
      </div>
      <div class="col-6 text-right">
        <q-btn class="btn" color="secondary" text-color="black" size="lg" style="width: 98%;" @click="register" tabindex="18">
          <b>{{ $t('save_description') }}</b>
        </q-btn>
      </div>
    </div>

    <!-- 하단 공간 확보 -->
    <div class="row justify-center q-pa-xl">
    </div>

  </q-page>

  <WalletModal ref="refWalletModal" />

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
import { required, requiredNumber, minLength, maxLength, minValue, maxValue} from 'src/validation.js';

export default defineComponent({
  name: 'RegisterProject',
  data () {
    return {
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
      projectTokenContractAddress: '',
      projectLpContractAddress1: '',
      projectLpContractAddress2: '',
      projectLpContractAddress3: '',
      projectLpContractAddress4: '',
      projectLpContractAddress5: '',
      projectLpContractAddress6: '',
      projectLpContractAddress7: '',
      projectLpContractAddress8: '',
      projectLpContractAddress9: '',
      projectLpContractAddress10: '',
      projectWalletAddress: '',
      projectTitle: '',
      projectTitleKo: '',
      projectSummary: '',
      projectSummaryKo: '',
      projectDescription: '',
      projectDescriptionKo: '',
      projectOfficialWebsite: '',
      projectOfficialEmail: '',
      projectLogoImage: '',
      projectDocs: '',
      projectBlog: '',
      projectMedium: '',
      projectTelegram: '',
      projectTwitter: '',
      projectGithub: '',
      projectMeta: '',
      projectDiscord: '',
      // seqFileMst: '' // 파일 마스터 SEQ
      confirmGoBack: false, // goBack 확인창
    }
  },
  components: {
  },
  computed: {
    getUid () {
      return this.$store.getters.getUid
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
    // 팀 지갑주소에 사용자 지갑주소 디폴트 설정
    this.projectWalletAddress = this.getWalletAddress
  },
  mounted: function () {},
  methods: {
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
      if (!this.$refs.projectWalletAddress.validate()) {
        result = false
      }
      if (!this.$refs.projectTokenContractAddress.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress1.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress2.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress3.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress4.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress5.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress6.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress7.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress8.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress9.validate()) {
        result = false
      }
      if (!this.$refs.projectLpContractAddress10.validate()) {
        result = false
      }
      if (!this.$refs.projectTitle.validate()) {
        result = false
      }
      if (!this.$refs.projectTitleKo.validate()) {
        result = false
      }
      if (!this.$refs.projectSummary.validate()) {
        result = false
      }
      if (!this.$refs.projectSummaryKo.validate()) {
        result = false
      }
      if (!this.$refs.projectOfficialWebsite.validate()) {
        result = false
      }
      if (!this.$refs.projectOfficialEmail.validate()) {
        result = false
      }
      if (!this.$refs.projectDocs.validate()) {
        result = false
      }
      if (!this.$refs.projectBlog.validate()) {
        result = false
      }
      if (!this.$refs.projectMedium.validate()) {
        result = false
      }
      if (!this.$refs.projectTelegram.validate()) {
        result = false
      }
      if (!this.$refs.projectTwitter.validate()) {
        result = false
      }
      if (!this.$refs.projectGithub.validate()) {
        result = false
      }
      if (!this.$refs.projectMeta.validate()) {
        result = false
      }
      if (!this.$refs.projectDiscord.validate()) {
        result = false
      }
      return result
    },
    // 등록 처리 시작
    async register() {
      // Field validation check
      if(!this.validate()) {
        this.$noti(this.$q, this.$t('validation_failed'))
        return
      }

      // 로그인 여부 체크, 로그인 모달 표시
      if (!this.getUid) {
        this.$refs.refWalletModal.show()
        return
      }

      // check mainnet
      if (this.mainnetObj.value !== 'KLAYTN') {
        this.$noti(this.$q, this.$t('unsupported_mainnet'))
        return
      }

      // 등록
      this.doRegister()
    },
    // 등록
    async doRegister() {
      // 1. 등록
      const params = {
        uid: this.getUid,
        seq: this.projectSeq,
        mainnet: this.mainnetObj.value,
        type: this.projectTypeObj.value,
        wallet_address: this.projectWalletAddress,
        token_contract_address: this.projectTokenContractAddress,
        lp_contract_address_1: this.projectLpContractAddress1,
        lp_contract_address_2: this.projectLpContractAddress2,
        lp_contract_address_3: this.projectLpContractAddress3,
        lp_contract_address_4: this.projectLpContractAddress4,
        lp_contract_address_5: this.projectLpContractAddress5,
        lp_contract_address_6: this.projectLpContractAddress6,
        lp_contract_address_7: this.projectLpContractAddress7,
        lp_contract_address_8: this.projectLpContractAddress8,
        lp_contract_address_9: this.projectLpContractAddress9,
        lp_contract_address_10: this.projectLpContractAddress10,
        title: this.projectTitle,
        title_ko: this.projectTitleKo,
        summary: this.projectSummary,
        summary_ko: this.projectSummaryKo,
        description: this.projectDescription,
        description_ko: this.projectDescriptionKo,
        official_website: this.projectOfficialWebsite,
        official_email: this.projectOfficialEmail,
        logo_image: this.projectLogoImage,
        docs: this.projectDocs,
        blog: this.projectBlog,
        medium: this.projectMedium,
        telegram: this.projectTelegram,
        twitter: this.projectTwitter,
        github: this.projectGithub,
        meta: this.projectMeta,
        discord: this.projectDiscord,
        // nft_yn: 'Y', // NFT 프로젝트 여부 = 'Y'
      }
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.post('/api/project/insertProject', params)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          if (result.data && result.data.resultCd === 'SUCCESS') {
            // console.log(result.data)
            this.$noti(this.$q, this.$t('register_success'))

            // 페이지 이동
            // 나의 프로젝트 리스트 화면
            this.$router.push('/project/myProjectList')

            // <!-- 관리자 수정용 -->
            // this.$router.push('/project/newList')
          } else {
            this.$noti(this.$q, this.$t('register_failed'))
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
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      // console.log('fileName: ' + fileName)
      // console.log('fileSize: ' + fileSize)
      // console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)

      this.projectLogoImage = fileNameNew // 프로젝트 로고 URL 설정
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
