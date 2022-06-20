<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
      <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
            <div class="navbar-item is-size-4 is-family-monospace">
                Noteballs
            </div>

            <a @click.prevent="showMobileNav = !showMobileNav" role="button" class="navbar-burger" :class="{ 'is-active' : showMobileNav }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref="navbarBurgerRef">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active' : showMobileNav }" ref="navbarMenuRef">
            <div class="navbar-start">
                <button v-if="storeAuth.user.id" @click="logout" class="button is-small is-info mt-3">Logout {{ storeAuth.user.email}}</button>
            </div>
            <div class="navbar-end">
            <router-link @click="showMobileNav = false" to="/" class="navbar-item" active-class="is-active">
                Notes
            </router-link>
            <router-link @click="showMobileNav = false" to="/stats" class="navbar-item" active-class="is-active">
                Stats
            </router-link>
            </div>
        </div>
      </div>
    </nav>
</template>

<script setup>
//IMPORTS
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '../../stores/storeAuth'

//STORE
    const storeAuth = useStoreAuth()

//MOBILE NAV
    const showMobileNav = ref(false)

//NAVBAR CLOSE OUTSIDE
    const navbarMenuRef = ref(null)
    const navbarBurgerRef = ref(null)
    onClickOutside(navbarMenuRef, () => {showMobileNav.value = false}, { ignore: [navbarBurgerRef]})

//LOGOUT
    const logout = () => {
        showMobileNav.value = false
        storeAuth.logoutUser()
    }

</script>

<style scoped>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left:0;
        width: 100%;
    }
}
/* @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .button.is-small.is-info.mt-3 {
        margin-left: 100px !important;
    }
} */
</style>