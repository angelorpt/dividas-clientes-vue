<template>
  <div>
    <!-- Dialog -->
    <q-dialog v-model="internal_show">
      <q-card style="width:470px">

        <!-- Título -->
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-avatar :icon="icon" text-color="white" />{{titulo}}
          </div>
        </q-card-section>
      
        <!-- Conteúdo -->
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <q-date
              v-model="data_sel"
              landscape
            />            
          </span>
        </q-card-section>
      
        <!-- Botões de Ação -->
        <q-card-actions align="right">
          <q-btn flat label="Cancelar"  color="grey"    v-close-popup />
          <q-btn flat label="Confirmar" color="primary" v-close-popup @click="confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'ComponentDialogResetPassword',
    props: ['show', 'titulo', 'icon'],
    data() {
      return {
        internal_show : false,
        data_sel      : null
      }
    },
    watch: {
      show() {
        this.internal_show = this.show;
        this.data_sel = this.$moment().format('YYYY/MM/DD')
      },
      internal_show() {
        if (!this.internal_show) {
          this.$emit('close', false)
        }
      },
    },
    methods: {
      confirmar() {
        // check data
        if (this.data_sel == null) { return }

        this.$emit('click', this.data_sel);
      }
    },
  }

</script>