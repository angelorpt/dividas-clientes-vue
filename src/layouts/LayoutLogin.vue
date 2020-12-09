<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <div class="mobile-hide">
      <div class="col-12">
        <q-img src="assets/login.png" class="loginBackground" />
      </div>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style type="scss" scoped>

.footer {
  background-color: var(--primary);
  color: white;
}

.loginBackground {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 0;
  margin-left: 0;
  z-index: -1;
}

</style>

<script>
export default {
  name: 'LayoutLogin',
  data () {
    return {
      
    }
  }
}
</script>
