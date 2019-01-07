<template>
  <div id="app" class="app">
    <tabheader></tabheader>
    <router-view></router-view>
  </div>
</template>

<script>
import tabheader from '@/base/tabheader/tabheader.vue';
export default {
  name: 'App',
  components: {
    tabheader
  }
}
</script>
