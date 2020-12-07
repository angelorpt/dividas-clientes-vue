<template>
  <div style="width: 100%">

    <q-linear-progress indeterminate v-if="loading" />

    <q-scroll-area style="height: 200px;" v-if="!loading" >

      <span v-if="listaDivividaToTable.length == 0">Não há dívidas para este cliente</span>

      <q-list style="width: 100%" v-else >
       
        <div v-for="divida in listaDivividaToTable" :key="divida.id">
        
          <q-item class="q-gutter-xm">
            <q-item-section>
              <q-item-label>{{divida.data}}</q-item-label>
              <q-item-label caption lines="4">{{divida.motivo}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption lines="2">{{divida.valor}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <ButtonAction @click="deletar(divida)"
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
    ...mapState   ('Divida' , ['loading']),
    ...mapGetters ('Divida' , ['listaDivividaToTable']),
  },
  methods: {
    ...mapActions ('Divida' , ['loadDividas', 'deletarDivida']),

    loadDados() {
      if (this.cliente_id != undefined) {
        this.loadDividas(this.cliente_id);
      }      
    },

    deletar(divida) {
      this.deletarDivida(divida);
    }
  },
}
</script>
