<template>
  <q-item
    v-if="link.includes('http')"
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    &nbsp;&nbsp;&nbsp;
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" style="width: 20px; height: 20px;" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption v-if="caption">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-item
    v-else
    clickable
    :to="link"
  >
    &nbsp;&nbsp;&nbsp;
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" style="width: 20px; height: 20px;" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption v-if="caption">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
