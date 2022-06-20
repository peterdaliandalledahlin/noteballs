<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<script setup>
//IMPORTS
  import { onMounted } from 'vue'
  import NavBar from '@/components/layout/NavBar.vue'
  import { useStoreAuth } from './stores/storeAuth'

//STORE
  const storeAuth = useStoreAuth()

//MOUNTED
  onMounted(() => {
    storeAuth.init()
  })
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>