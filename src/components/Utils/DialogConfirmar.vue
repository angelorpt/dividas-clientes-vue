<template>
  <div>
    <!-- Dialog Deletar -->
    <q-dialog v-model="internal_show">
      <q-card style="width:30%">

        <!-- Título -->
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
          <q-avatar :icon="icon" text-color="white" />{{titulo}}
          </div>
        </q-card-section>
      
        <!-- Conteúdo -->
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <slot></slot>
          </span>
        </q-card-section>
      
        <!-- Botões de Ação -->
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey"    v-close-popup />
          <q-btn flat label="Ok"       color="primary" v-close-popup @click="clickButton"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'ComponentDialogConfirmar',
    props: ['show', 'titulo', 'icon'],
    data() {
      return {
        internal_show: false
      }
    },
    watch: {
      show() {
        this.internal_show = this.show;        
      },
      internal_show() {
        if (!this.internal_show) {
          this.$emit('close', false)
        }
      },
    },
    methods: {
      clickButton() {
        this.$emit('click', true)
      }
    },
  }

</script>