<template>
  <q-page>
    <Container>
      <Titulo titulo="Clientes"
              subtitulo="Lista de Clientes integrados de Json Placeholder"/>
    </Container>

    <Container>
      
      <Button label="Importar"
              tooltip="Importar Usuário de Json Placeholder"
              icon="cloud_download"
              :loading="integrating"
              @click="integrar" />

      <Table  :columns="colunas"
              :data="lstCliente" 
              :actions="botoesAcao"
              :loading="loading"
              @reload="loadDados" />

    </Container>

  </q-page>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Table from 'components/Utils/Table'

export default {
  name: 'PageClienteIndex',
  components: { Table },
  data() {
    return {
      colunas: [
        { label: 'ID Json'     , field: 'id_jsonph' , align: 'center' },
        { label: 'Nome'        , field: 'name'      , align: 'left'   },
        { label: 'Usuário'     , field: 'username'  , align: 'left'   },
        { label: 'E-mail'      , field: 'email'     , align: 'left'   },
        { label: 'Fone'        , field: 'phone'     , align: 'left'   },
        { label: 'Web Site'    , field: 'website'   , align: 'left'   },
        { label: 'Ações'       , sort : false       , align: 'left'   },
      ],      
      botoesAcao: [
        { 
          icon         : 'delete',
          deleteAPI    :'/clientes/{field}',
          fieldToRoute : 'id',
          tooltip      : 'Deletar',
          permission   : true
        },
      ]
    }
  },
  mounted() {
    this.loadDados();
  },
  computed: {
    ...mapState ('Cliente', ['lstCliente', 'loading', 'integrating']),
  },
  methods: {
    ...mapActions ('Cliente', ['loadClientes', 'integrarClientes']),

    loadDados() {
      this.loadClientes();
    },

    integrar() {
      this.integrarClientes();
    }
  },
}
</script>
