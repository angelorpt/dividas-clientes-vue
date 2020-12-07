<template>
  <div>
    <div v-for="(item, index) in lista" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label lines="1">{{item.name}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <span>R$ {{item.total}}</span>
        </q-item-section>
        <q-item-section side>
          
        </q-item-section>
      </q-item>

      <q-separator  />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentListaDivida',
  props: {
    lista : Object
  },
  data () {
    return {}
  },
  methods: {

  },
}
</script>
