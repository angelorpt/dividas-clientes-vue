<template>
  <div class="col-xs-12 text-right q-mb-lg">

    <q-btn  :label="label ? label : 'Button'"
            :icon="icon"
            :loading="loading"
            class="k-btn k-btn-cancelar col-xs-6"
            @click="$emit('click')">
      <q-tooltip v-if="tooltip != null">{{tooltip}}</q-tooltip>
    </q-btn>

  </div>
</template>

<script>
export default {
  name: 'ComponentButtonBack',
  props: {
    icon    : String,
    label   : String,
    tooltip : String,
    loading : {
      type    : Boolean,
      default : false,
    }
  },
  data () {
    return {}
  },
  methods: {

  },
}
</script>
