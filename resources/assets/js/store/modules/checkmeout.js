const state = {
    /* Check Me Out Authentication */
    settings: {
        id: null,
        user_id: null,
        access_token: null,
        api_key: null,
        secret_key: null
    },
    receptacles:[]
}

const getters = {
    getToken: state => state.settings.access_token,
    getID: state => state.settings.id,
    getUserID: state => state.settings.user_id,
    getApiKey: state => state.settings.api_key,
    getSecretKey: state => state.settings.secret_key,
    getReceptacles: state => state.receptacles
}

const actions = {

    async login({ commit }, form){
        try {
            form.busy = true
            let payload= (await App.post(route('api.cmo.login'),form))
            console.log(payload)
            commit('setToken', payload.checkmeout.token)
            commit('setID', payload.checkmeout.id)
            commit('setUserID', payload.checkmeout.user_id)
            
            form.busy = false
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            vm.$router.push({ name: 'settings' })
        }catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    async fetchKeys({ commit }){
        try{
            let payload = (await axios.post(route('api.cmo.fetchkeys')))
            console.log(payload.data)
            commit('setToken', payload.data.token)
            commit('setID', payload.data.id)
            commit('setUserID', payload.data.user_id)
            commit('setApiKey', payload.data.api_key)
            commit('setSecretKey', payload.data.secret_key)
        }catch ({errors, message}) {
            if(errors) console.log(errors)
            if(message) console.log(message)
        }
    },
    async addKeys({commit}, form){
        try {
            form.busy = true
            let payload= (await App.post(route('api.cmo.addKeys'),form))
            console.log(payload)
            commit('setApiKey', payload.api_key)
            commit('setSecretKey', payload.secret_key)
            form.busy = false
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        }catch ({errors, message}) {
            if(errors) form.errors.set(errors)
            if(message) vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            form.busy = false
        }
    },
    async fetchReceptacles({commit}){
        try{
            let payload = (await axios.get(route('api.cmo.getReceptacles')))
            console.log(payload.data)
            commit('setReceptacles', payload.data)
        }catch ({errors, message}) {
            if(errors) console.log(errors)
            if(message) console.log(message)
        }
    }
}

const mutations = {
    setToken: (state, payload) => {
        state.settings.access_token = payload
    },
    setID: (state, payload) => {
        state.settings.id = payload
    },
    setUserID: (state, payload) => {
        state.settings.user_id = payload
    },
    setApiKey: (state, payload) => {
        state.settings.api_key = payload
    },
    setSecretKey: (state, payload) => {
        state.settings.secret_key = payload
    },
    setReceptacles: (state, payload) => {
        state.receptacles = []
        state.receptacles = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
