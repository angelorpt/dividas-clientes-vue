<template>
  <div style="width: 100%">

      <q-scroll-area style="height: 200px;">
        <q-list style="width: 100%">
       
        <div v-for="divida in listaDivividaToTable" :key="divida.id">
        
          <q-item >
            <q-item-section>
              <q-item-label>{{divida.data}}</q-item-label>
              <q-item-label caption lines="2">{{divida.motivo}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>{{divida.valor}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <ButtonAction @click="deletar"
                            icon="delete" 
                            tooltip="Deletar Dívida"
                            :permission="true" />
            </q-item-section>
          </q-item>

          <q-separator />
        </div>

        </q-list>
      </q-scroll-area>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import ButtonAction     from 'components/Utils/ButtonAction'

export default {
  name: 'ComponentListaDividas',
  props: {
    cliente_id : Number,
  },
  components: { ButtonAction } ,
  data () {
    return {}
  },
  mounted() {
    this.loadDados();
  },
  watch: {
    cliente_id() {
      this.loadDados();
    }
  },
  computed: {
    ...mapGetters ('Divida' , ['listaDivividaToTable']),
    
  },
  methods: {
    ...mapActions ('Divida' , ['loadDividas']),

    loadDados() {
      if (this.cliente_id != undefined) {
        console.log('asdf')
        this.loadDividas(this.cliente_id);
      }      
    },

    deletar() {

    }
  },
}
</script>
