<template>
  <div>

    <DialogConfirmar  :show="internal_show"
                      titulo="Nova Dívida"
                      icon="add_circle"
                      class="row"
                      @close="closeDialog"
                      @click="salvar" >

      <Row class="q-gutter-sm">

        <q-select v-model="divida.cliente"
                  :options="listaClientesToSelect"
                  class="col-12"
                  label="Cliente" />

        <q-input  type="text"
                  class="col-12"
                  label="Motivo"
                  maxlength="100"
                  v-model="divida.motivo" />

        <div class="k-flex-column">

          <q-input v-model="divida.valor" type="text" label="Valor" class="col-6" />

          <q-input  label="Data"
                    v-model="divida.data"
                    class="col-6 q-mt-sm"
                    mask="##/##/####"
                    :rules="['date:DD/MM/YYYY', val => !!val || '* Obrigatório']">

            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-indigo">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="divida.data" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>

          </q-input>

        </div>

      </Row>

    </DialogConfirmar>
  </div>
</template>

<script>

  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

  import ButtonAction     from  'components/Utils/ButtonAction'
  import ButtonMenu       from  'components/Utils/Menu/ButtonMenu'
  import DialogConfirmar  from  'components/Utils/DialogConfirmar'
  import ListaDividas     from  'components/Divida/Lista'

  export default {
    name  : 'PageDividasIndex',
    props : ['divida_id', 'show'],
    components : { ButtonMenu, DialogConfirmar, ListaDividas },
    data() {
      return {

        divida: {
          cliente : null,
          motivo  : '',
          valor   : '',
          data    : null
        },

        internal_show : false,

        showDialogAdd : false,

      }
    },
    mounted() {
      this.loadDados();
      this.internal_show = this.show;
    },
    watch: {
      show() {
        this.internal_show = this.show;        
      },
      internal_show() {
        if (!this.internal_show) {
          this.$emit('close', true)
        }
      },
    },    
    computed: {
      ...mapState   ('Cliente', ['lstCliente']),
      ...mapGetters ('Cliente', ['listaClientesToSelect', 'listaClientesToTable']),
    },
    methods: {
      ...mapActions ('Cliente' , ['loadClientes']),
      ...mapActions ('Divida'  , ['salvarDivida', 'loadDivida']),

      loadDados() {
        this.loadClientes();
        if (this.divida_id != undefined) {
          this.divida = this.loadDivida(this.divida_id);
        }
      },

      detalhes(cliente) {
        this.cliente_sel = cliente;
      },

      closeDialog() {
        this.internal_show = false
        this.divida = {
          cliente: null,
          motivo: '',
          valor: '',
          data: null
        }
      },

      salvar() {
        this.salvarDivida(this.divida);
      }

    },

  }

</script>


<style lang="scss">
  .k-flex-column {
    display: flex;
    flex-direction: column;
  }

</style>
