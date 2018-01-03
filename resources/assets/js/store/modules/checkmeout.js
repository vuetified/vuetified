const state = {
    /* Check Me Out Authentication */
    access_token: null,
    api_key: '',
    secret_key: ''
}

const getters = {
    getToken: state => state.access_token
}

const actions = {
    // async checkmeout({ commit }, form){
    //     form.busy = true
    //     try {
    //         const payload = (await App.post('https://api.checkmeout.ph/v1/auth/login', form))
    //         form.busy = false
    //         commit('setToken', payload.token)
    //         vm.$popup({ message: 'Check Me Out Integrated', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
    //         vm.$router.push({ name: 'settings' })
    //     } catch ({errors, message}) {
    //         form.errors.set(errors)
    //         form.busy = false
    //         vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
    //     }
    // }
    async checkmeout({ commit }, form){

        let payload= (await App.post(route('api.cmo.login'),form))
        console.log(payload)
        commit('setToken', payload.checkmeout.token)
        // payload.checkmeout.api_key
        // payload.checkmeout.secret_key
        // payload.checkmeout.user_id
       
        
    }
}

const mutations = {
    setToken: (state, payload) => {
        state.access_token = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
