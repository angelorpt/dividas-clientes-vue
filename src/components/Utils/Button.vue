<template>
  <div>
    <q-btn  :label="label ? label : ''"
            :icon="icon"
            :loading="loading"
            :round="round"
            :flat="flat"
            :color="color ? color : ''"
            :text-color="textColor ? textColor : 'white'"
            @click="clickButton">
      <q-tooltip v-if="tooltip != null">{{tooltip}}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'ComponentButton',
  props: {
    icon      : String,
    color     : String,
    label     : String,
    tooltip   : String,
    textColor : String,
    flat : {
      type    : Boolean,
      default : false,
    },
    round : {
      type    : Boolean,
      default : false,
    },
    loading : {
      type    : Boolean,
      default : false,
    }
  },
  data () {
    return {}
  },
  methods: {
    clickButton() {
      this.$emit('click', true);
    }
  },
}
</script>
