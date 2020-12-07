<template>
  <div>
    <q-btn :icon="icon" round flat >
      <q-menu>
        <q-list style="min-width: 150px">

          <q-item clickable
                  v-close-popup
                  v-for="(item, index) in listaMenu"
                  :color="item.color ? item.color : ''"
                  :key="index"
                  @click="$emit(item.emit, item.emit)" >

            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section clickable>
              {{item.label}}
            </q-item-section>

          </q-item>
        </q-list>
      </q-menu>
    </q-btn>    
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    listaMenu: {
      type: Array
    }
  },
  data() {
    return {
      listaMenu_inner: [
        {
          color   : 'primary',
          icon    : 'send',
          label   : 'titulo fds',
          emit    : 'click',
          tooltip : 'tooltip'
        }
      ]
    }
  },
}
</script>

<style lang="scss">

</style>