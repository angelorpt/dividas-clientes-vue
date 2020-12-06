<template>
  <div class="row">
    <div class="col-12">
      <p class="k-title-page">{{titulo}}</p>
      <p class="k-subtitle-page" v-if="subtitulo">{{subtitulo}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentTituloPagina',
  props: ['titulo', 'subtitulo'], 
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .k-title-page {
    font: Bold 20px/23px Helvetica;
    text-align: left;
    letter-spacing: 0px;
    opacity: 1;
  }

  .k-subtitle-page {
    font: Regular 13px/15px Helvetica Neue;
    text-align: left;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }
</style>