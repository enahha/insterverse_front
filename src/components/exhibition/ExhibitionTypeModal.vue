<template>
    <q-dialog v-model="ExhibitionTypeModal" persistent>
        <q-card style="max-width: 60vh;">
          <div style="padding: 30px;">
            <q-toolbar>
                <q-toolbar-title><span class="text-weight-bold text-center"></span></q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup icon-right="true" @click="close" />
            </q-toolbar>

            <br />

            <div class="modal inner exhibition-type">
                <div class="type-sec" v-for="item in exhibitionTypeList" :key="item.seq">
                    <q-item clickable @click="apply(item.name)">
                    <q-item-section avatar>
                        <q-avatar>
                        <img v-if="item.url" :src="item.url">
                        <q-icon v-else name="rocket_launch" size="md" />
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <div class="row list-item">
                        <q-item-label class="col-12">{{ item.name }}</q-item-label>
                        <q-item-label class="col-12">display : {{ item.display_maximum }} items</q-item-label>
                        <!-- <q-item-label class="col-12">{{ item.description }}</q-item-label> -->
                        </div>
                    </q-item-section>
                    </q-item>
                </div>
            </div>
          </div>
        </q-card>
    </q-dialog>
  </template>
  
  <script>
  export default {
    data () {
      return {
        ExhibitionTypeModal: false,
        exhibitionTypeList: [],
      }
    },
    methods: {
      async show() {
        this.ExhibitionTypeModal = true

        this.selectExhibitionTypeList(null)
      },
      close() {
        this.ExhibitionTypeModal = false
      },
      selectExhibitionTypeList(type) {
        this.$axios.get('/api/exhibition/selectExhibitionTypeList', {params: {type: type}})
        .then((result) => {
          this.exhibitionTypeList = result.data
        })
      },
      async apply(name) {
        this.$emit('callback-register', name)
        this.close()
      },
    }
  }
  </script>
  
  <style scoped>
  </style>
    