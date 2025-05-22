<template>
  <q-page class="justify justify-center page-1200">
    <div class="content">
      <div class="row">
        TEST TAG 페이지1
      </div>

      <div class="input-wrapper">
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
            <p>{{ tag }}</p>
            <p class="hash-item-delete" @click="removeHashTag(index)">x</p>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      filterType: 'now', // 랭킹타입 now, total1
      msgBox: false,
      mainnet: 'KLAYTN',
      projectSeq: '1',
      hashState: reactive({
        hashtag: '',
        hashArr: [],
      }),
    };
  },
  methods: {
    onKeyUp(event) {
      // if (event.code === 'Backspace') {
      //   if (this.hashState.hashtag === '' && this.hashState.hashArr.length > 0) {
      //     this.hashState.hashArr.pop();
      //   }
      // }
    },
    onEnterKey() {
      const trimmedTag = this.hashState.hashtag.trim();
      if (trimmedTag && this.hashState.hashArr.length < 5) {
        this.hashState.hashArr.push(trimmedTag);
        this.hashState.hashtag = '';
      }
    },
    removeHashTag(index) {
      if (index >= 0 && index < this.hashState.hashArr.length) {
        this.hashState.hashArr.splice(index, 1);
      }
    },
  },
  computed: {
    getUid() {
      return this.$store.getters.getUid;
    },
    getNickname() {
      return this.$store.getters.getNickname;
    },
    getWalletType() {
      return this.$store.getters.getWalletType;
    },
    getWalletAddress() {
      return this.$store.getters.getWalletAddress;
    },
  },
  created() {
    this.projectSeq = this.$route.query.seq;
    const nickname = localStorage.getItem('NICKNAME')
      ? localStorage.getItem('NICKNAME')
      : this.$cookie.get('NICKNAME');
    const uid = localStorage.getItem('UID') ? localStorage.getItem('UID') : this.$cookie.get('UID');
    if (nickname && uid) {
      this.$store.dispatch('setNickname', nickname);
      this.$store.dispatch('setUid', uid);
    }
  },
});
</script>

<style scoped>


.hash-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.hash-item {
  display: flex;
  align-items: center;
  background: #e0e0e0;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.hash-item p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.hash-item-delete {
  margin-left: 10px;
  font-size: 14px;
  color: #ff4d4d;
  cursor: pointer;
}

.input-tag {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;
  min-width: 200px;
  max-width: 100%;
  box-sizing: border-box;
}

.input-tag:focus {
  border-color: #007bff;
  outline: none;
}

.input-tag:disabled {
  background: #f9f9f9;
  cursor: not-allowed;
}

.input-tag::placeholder {
  color: #999;
}

</style>