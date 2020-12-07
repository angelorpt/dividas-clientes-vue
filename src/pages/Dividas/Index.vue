<template>
  <q-page>
    
    <Container size="90">

      <Titulo titulo="Dívidas"
              subtitulo="Dívidas dos Clientes"/>

      <q-list class="rounded-borders">

        <div v-for="cliente in lstCliente" :key="cliente.id">
          <q-item>
            <q-item-section>
              <q-item-label lines="1">{{cliente.name}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <span>R$ {{cliente.total}}</span>
            </q-item-section>
            <q-item-section side>
              <ButtonMenu  icon="more_vert"
                          :listaMenu="listaMenu"
                          @novo="showDialogAdd = true"
                          @detalhes="detalhes" />
            </q-item-section>
          </q-item>

          <q-separator  />
        </div>

      </q-list>
    </Container>

    <DialogConfirmar  :show="showDialogAdd"
                      titulo="Nova Despesa"
                      icon="add"
                      class="row"
                      @close="showDialogAdd = false"
                      @click="confirmar" >

      <Row class="q-gutter-sm">

        <q-select v-model="cliente_sel"
                  :options="options"
                  class="col-12"
                  label="Cliente" />

        <q-input  type="text"
                  class="col-12"
                  label="Motivo" 
                  maxlength="100" />  

        <div class="k-flex-column">
          <q-input v-model="text" type="text" label="Valor" class="col-6" />

          <q-input label="Data" v-model="variavel" class="col-6 q-mt-sm" mask="##/##/####" :rules="['date:DD/MM/YYYY', val => !!val || '* Obrigatório']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-indigo">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="variavel" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()"  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

      </Row>

    </DialogConfirmar>

  </q-page>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import ButtonAction     from 'components/Utils/ButtonAction'
import ButtonMenu       from 'components/Utils/Menu/ButtonMenu'
import DialogConfirmar  from 'components/Utils/DialogConfirmar'

export default {
  name: 'PageDividasIndex',
  components: {
    ButtonMenu,
    DialogConfirmar
  },
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

      options: [
        {
          label : 'asdf',
          value : 1
        },
        {
          label : '4564',
          value : 2
        },
      ],

      cliente_sel : null,

      showDialogAdd    : false,
      showDialogDelete : false,
      showDialogEdit   : false,

    }
  },
  mounted() {
    this.loadDados();
  },
  computed: {
    ...mapState ('Cliente', ['lstCliente']),
  },
  methods: {
    ...mapActions ('Cliente', ['loadClientes']),

    loadDados() {
      this.loadClientes();
    },

    teste() {
      alert('testes');
    },

    detalhes() {
      alert('detalhes');
    },

    confirmar() {
      alert('asdf');
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