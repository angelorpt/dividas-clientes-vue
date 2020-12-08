<template>
  <q-page>
    
    <Container size="90">

      <Titulo titulo="Dívidas"
              subtitulo="Dívidas dos Clientes"/>

      <div class="row justify-end q-ma-sm">
        <Button icon="add_circle"
                label="Nova"
                color="primary"
                @click="showDialogAdd=true" />
      </div>              

      <q-list class="rounded-borders">
        <div v-for="cliente in listaClientesToTable" :key="cliente.id">
          <q-item>

            <q-item-section>
              <q-item-label lines="1">{{cliente.name}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <span>{{cliente.total}}</span>
            </q-item-section>

            <q-item-section side top >
              <Button icon="list_alt" flat round 
                      textColor="primary"
                      @click="detalhes(cliente)" />
            </q-item-section>

          </q-item>
          <q-separator  />
        </div>
      </q-list>
    </Container>


    <DividaSalvar :show="showDialogAdd"
                  @close="closeDialog" />


    <DialogConfirmar :show="showDialogDividas"
                      titulo="Dívidas"
                      icon="payments"
                      class="q-pa-xm q-ma-xm col-12"
                      @close="showDialogDividas = false"
                      @click="closeDialog" >
      
      <ListaDividas :cliente_id="cliente_sel.id" />

    </DialogConfirmar>

  </q-page>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import ButtonAction     from 'components/Utils/ButtonAction'
import ButtonMenu       from 'components/Utils/Menu/ButtonMenu'
import DialogConfirmar  from 'components/Utils/DialogConfirmar'
import ListaDividas     from 'components/Divida/Lista'
import DividaSalvar     from 'components/Divida/Salvar'

export default {
  name: 'PageDividasIndex',
  components: { ButtonMenu, DialogConfirmar, ListaDividas, DividaSalvar },
  data() {
    return {
      listaMenu: [
        {
          icon  : 'add',
          label : 'Nova',
          emit  : 'novo',
        },
        {
          icon  : 'list_alt',
          label : 'Listar',
          emit  : 'detalhes',
        }
      ],

      divida: {
        cliente : null,
        motivo  : '',
        valor   : '',
        data    : null
      },

      cliente_sel: {},

      showDialogAdd     : false,
      showDialogDividas : false,

    }
  },
  mounted() {
    this.loadDados();
  },
  computed: {
    ...mapState   ('Cliente', ['lstCliente']),
    ...mapGetters ('Cliente', ['listaClientesToSelect', 'listaClientesToTable']),
  },
  methods: {
    ...mapActions   ('Cliente', ['loadClientes']),
    ...mapActions   ('Divida' , ['salvarDivida']),
    ...mapMutations ('Divida' , ['setCliente']),

    loadDados() {
      this.loadClientes();
    },

    detalhes(cliente) {
      this.setCliente(cliente);
      this.cliente_sel = cliente;
      this.showDialogDividas = true;
    },

    closeDialog() {
      this.showDialogAdd     = false
      this.showDialogDividas = false
      this.divida = {
        cliente : null,
        motivo  : '',
        valor   : '',
        data    : null
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
    display : flex;
    flex-direction : column;
  }
</style>