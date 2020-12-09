import Vue from 'vue'

export default {
    namespaced: true,

    state: () => {
        return {
            token   : null,
            logado  : false,
            loading : false,
        }
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLogado(state, status) {
            state.logado = status;
        },
        setLoading(state, value) {
            state.loading = value;
        },
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

        async goLogin({ commit, dispatch }, login) {

            try {
                commit('setLoading', true)
                const response = await Vue.prototype.$axios.post('/login', login);
                if (response.status == 200) {
                    dispatch('changeToken', response.data.token)
                    commit('setLoading', false)
                    return { status: true };
                }
            } catch (error) {
                dispatch('changeToken', null)
                commit('setLoading', false)
                return { status: false, error: error };
            }
        },

        async changeToken({ commit, dispatch }, token) {
            if (token) {
                commit('setToken', token);
                commit('setLogado', true);
                // dispatch('changeLoggedIn', true);
            } else {
                commit('setToken', null);
                commit('setLogado', false);
                // dispatch('changeLoggedIn', false);
            }
        },

        async actLogout({ commit, dispatch }) {
            await dispatch('cancelToken');
            dispatch('changeToken', null);
        },

        async cancelToken({ commit, dispatch, rootGetters, state }) {

            const token  = state.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const data   = { token: token }; 

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
        }
    }

}