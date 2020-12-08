<template>

  <div style="width: 100%">

    <q-linear-progress indeterminate v-if="loading" />

    <q-scroll-area style="height: 250px;" v-if="!loading" >

      <span v-if="listaDividaToTable.length == 0">Não há dívidas para este cliente</span>

      <q-list style="width: 100%" v-else >
       
        <div v-for="divida in listaDividaToTable" :key="divida.id">
        
          <q-item>
            <q-item-section>
              <q-item-label>{{divida.data}}</q-item-label>
              <q-item-label caption lines="4">{{divida.motivo}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption lines="2">{{divida.valor}}</q-item-label>
            </q-item-section>

            <q-item-section side class="justify-between">
              <ButtonAction @click="editar(divida)"
                            icon="edit" round
                            tooltip="Editar Dívida"
                            :permission="true" />

              <ButtonAction @click="deletar(divida)"
                            icon="delete" round
                            tooltip="Deletar Dívida"
                            :permission="true" />
            </q-item-section>
          </q-item>

          <q-separator />
        </div>

      </q-list>
    </q-scroll-area>

    <DividaSalvar :show="showDialogEdit"
                  :divida_id="divida_id"
                  @close="closeSalvar" />

  </div>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import DividaSalvar     from 'components/Divida/Salvar'
import ButtonAction     from 'components/Utils/ButtonAction'

export default {
  name: 'ComponentListaDividas',
  props: {
    cliente_id : Number,
  },
  components: { ButtonAction, DividaSalvar } ,
  data () {
    return {
      showDialogEdit : false,
      divida_id      : null
    }
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
    ...mapGetters ('Divida' , ['listaDividaToTable']),
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
    },

    editar(divida) {
      this.divida_id = divida.id;
      this.showDialogEdit = true;
    },

    closeSalvar() {
      this.showDialogEdit = false;
      this.divida_id      = null;
    }

  },
}
</script>
