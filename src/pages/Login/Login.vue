<template>
  <q-page>
    <Container>

      <div>User: admin@email.com</div>
      <div>Pass: admin</div>

      <div class="row" id="inputGroup">
        <div class="col-sm-12 col-xs-12 col-lg-3 col-md-3 offset-lg-1">
          
          <q-form @submit.prevent="logar" class="q-gutter-md" >

            <q-input square filled v-model="login.email"    label="E-mail" />
            <q-input square filled v-model="login.password" label="Senha"  :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>  
            
            <q-btn  type="submit"
                    :loading="loading"
                    @click.prevent="logar"
                    text-color="white" label="Acessar" class="col-sm-12 btnAcessar" />
            
          </q-form>

        </div>
      </div>

    </Container>

  </q-page>
</template>

<script>

import { mapState, mapMutations, mapGetters, mapActions, commit } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      isPwd : true,
      login : {
        email    : null,
        password : null
      },
    }
  },
  beforeMount() {
    this.actLogout();
  },
  watch: {
    async token() {
      if (this.token) {
        this.nofificar('Bem-vindo(a)', 'primary', 'center');
        setTimeout(() => {
          this.$router.push('/');
        }, 500);
      }
    },
  },
  computed: {
    ...mapState ('Login', ['loading', 'token']),
  },
  methods: {

    ...mapActions   ('Login', ['changeToken', 'actLogout', 'goLogin']),
    ...mapMutations ('Login', ['setLogado']),

    async logar() {

      let result = await this.goLogin(this.login);

      if (result.status) {
        console.log(result.status);
      } else {
        let error = result.error;
        if (error.response.status = 401) {
          this.nofificar('Usuário ou Senha Inválidos', 'orange-8', 'center')
        }
      }
    },

    nofificar (msg, color, position) {
      this.$q.notify({
        message  : msg,
        color    : color,
        position : position
      })
    },

    setLoading (status) {
      this.loading = status
    }
  }
}
</script>


<style lang="scss">
  .btnAcessar {
    width: 96%;
    background-color: var(--primary);
  }
  #inputGroup {
    margin-top: 7rem;
  }
  #titulo {
    text-align: center;
    font: Bold 70px/60px Roboto;
    opacity: 1;
  }
</style>
