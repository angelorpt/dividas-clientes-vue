import Vue from 'vue'

export default {
    namespaced: true,

    state: () => {
        return {
            token   : null,
            logado  : false,
            usuario : {
                name  : '',
                email : ''
            },
        }
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLogado(state, status) {
            state.logado = status;
        },
        setUsuario({ usuario }, payload) {
            usuario.name  = payload.name,
            usuario.email = payload.email
        }
    },

    actions: {


        // Verifica se o token está válido
        async checkTokenApi({ dispatch }) {
            const config = {
                headers: { Authorization: `Bearer ${this.state.Login.token}` }
            };

            try {
                const response = await Vue.prototype.$axios.get('/token/check', config);
                return true;
            } catch (error) {
                if (error.response.status == 401) {
                    return false;
                }
                return false;
            }
        },

        async goLogin({ commit, dispatch }, loginData) {

            try {
                const response = await Vue.prototype.$axios.post('/login', loginData);
                if (response.status == 200) {
                    dispatch('changeToken', response.data.token)
                    return {
                        status: true
                    };
                }
            } catch (error) {
                dispatch('changeToken', null)
                return {
                    status: false,
                    error: error
                };
            }


        },

        async changeToken({ commit, dispatch }, token) {
            if (token) {
                commit('setToken', token);
                commit('setLogado', true);
                dispatch('changeLoggedIn', true);
            } else {
                commit('setToken', null);
                commit('setLogado', false);
                dispatch('changeLoggedIn', false);
            }
        },

        removeVuex() {
            localStorage.removeItem('vuex');
        },

        async actLogout({ commit, dispatch }) {
            await dispatch('cancelToken');
            dispatch('changeToken', null);
            dispatch('removeVuex');
            dispatch('removeLoggedIn');
        },

        async cancelToken({ commit, dispatch, rootGetters, state }) {

            const token  = state.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const data   = { token: token },            

            try {
                const response = await Vue.prototype.$axios.post('/logout', data, config);
                if (response.status == 200) {
                    return true;
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status == 401) {
                        return true;
                    };
                }
            }
        },

        /**
         * Carrega dados do usuário logado
         */
        async loadUser({ commit, dispatch }) {
            const config = {  headers: { Authorization: `Bearer ${this.state.Login.token}` } };
            try {
                const response = await Vue.prototype.$axios.get('/me', config);
                commit('setUsuario', response.data);
            } catch (error) {
                if (error.response.status == 401) {
                    dispatch('changeToken', null);
                }
            }
        }

    },

    getters: {
        getToken(state) {
            return state.token;
        },
        getLogado(state) {
            return state.logado;
        },
        usuario({ usuario }) {
            let array = usuario.nome.split(' ');
            let first_name = array[0];
            return {
                id    : usuario.id,
                nome  : first_name.toLowerCase(),
                email : usuario.email,
                nome_completo : usuario.nome.toLowerCase(),
            }
        }
    }

}