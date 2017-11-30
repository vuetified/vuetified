const state = {
    /* Laravel Passport Authentication */
    me: null,
    access_token: null,
    refresh_token: null,
    expires_in: null
}

const getters = {
    getAuth: state => !!state.access_token,
    getToken: state => state.access_token,
    getMe: state => state.me
}

const actions = {
    /* Tested Working */
    /* form : name, email ,password, password_confirmation */
    async register ({ commit, dispatch }, form) {
        form.busy = true
        try {
            const payload = (await App.post(route('api.auth.register'), form))
            commit('setToken', payload.access_token)
            commit('setRefreshToken', payload.refresh_token)
            commit('setExpiration', payload.expires_in)
            vm.$cookie.set('access_token', payload.access_token, { expires: 365 })
            await dispatch('fetchMe')
            form.busy = false
            vm.$popup({ message: 'Account Registered!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            vm.$router.push({ name: 'dashboard' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    /* Tested Working */
    /* form : username ,password */
    async login ({ commit, dispatch }, form) {
        form.busy = true
        try {
            const payload = (await App.post(route('api.auth.login'), form))
            commit('setToken', payload.access_token)
            commit('setRefreshToken', payload.refresh_token)
            commit('setExpiration', payload.expires_in)
            vm.$cookie.set('access_token', payload.access_token, { expires: 365 })
            await dispatch('fetchMe')
            form.busy = false
            vm.$popup({ message: 'Successfully Logged In!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            vm.$router.push({ name: 'dashboard' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    /* form : name,email ,provider(fb),provider_user_id(fb_id) */
    async socialauth ({ commit, dispatch }, form) {
        form.busy = true
        try {
            const payload = (await App.post(route('api.auth.social'), form))
            commit('setToken', payload.access_token)
            commit('setRefreshToken', payload.refresh_token)
            commit('setExpiration', payload.expires_in)
            vm.$cookie.set('access_token', payload.access_token, { expires: 365 })
            await dispatch('fetchMe')
            form.busy = false
            vm.$popup({ message: 'Successfully Logged In!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            vm.$router.push({ name: 'dashboard' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    /* Tested Working */
    /* Remove Access Token Cookie */
    async logout ({ commit }, form) {
        form.busy = true
        try {
            await axios.post(route('api.auth.logout'))
            commit('setToken', null)
            commit('setRefreshToken', null)
            commit('setExpiration', null)
            commit('setMe', null)
            form.busy = false
            vm.$router.push({ name: 'home' })
            vm.$popup({ message: 'Successfully Logged Out!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            if (errors) {
                console.log(errors)
            }
            form.busy = false
            if (message === 'Request failed with status code 401') {
                vm.$store.commit('auth/setToken', null)
                vm.$store.commit('auth/setRefreshToken', null)
                vm.$store.commit('auth/setExpiration', null)
                vm.$store.commit('auth/setMe', null)
                vm.$router.push({ name: 'login' })
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        }
    },
    async refreshtoken ({ commit, dispatch }, form) {
        form.busy = true
        try {
            const payload = (await App.post(route('api.auth.refresh'), state.refresh_token))
            commit('setToken', payload.access_token)
            commit('setRefreshToken', payload.refresh_token)
            commit('setExpiration', payload.expires_in)
            vm.$cookie.set('access_token', payload.access_token, { expires: 365 })
            await dispatch('fetchMe')
            form.busy = false
            vm.$router.push({ name: 'dashboard' })
            vm.$popup({ message: 'Successfully Logged In!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    /* Tested Working */
    /* Get User Profile , Roles and Permissions */
    async fetchMe ({ commit }) {
        try {
            const payload = await axios.post(route('api.@me'))
            commit('setMe', payload.data.data)
        } catch ({errors, message}) {
            if (errors) {
                console.log(errors)
            }
            if (message) {
                console.log(message)
            }
        }
    },
    /* Tested Working */
    /* form : username ,password, password_confirmation, token */
    async passwordreset ({ commit, dispatch }, form) {
        form.busy = true
        try {
            const payload = (await App.post(route('api.auth.reset-password'), form))
            commit('setToken', payload.access_token)
            commit('setRefreshToken', payload.refresh_token)
            commit('setExpiration', payload.expires_in)
            vm.$cookie.set('access_token', payload.access_token, { expires: 365 })
            await dispatch('fetchMe')
            form.busy = false
            vm.$popup({ message: 'Password Reset Successfully!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            vm.$router.push({ name: 'dashboard' })
        } catch ({errors, message}) {
            form.errors.set(errors)
            form.busy = false
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    }

}

const mutations = {
    setToken: (state, payload) => {
        state.access_token = payload
    },
    setRefreshToken: (state, payload) => {
        state.refresh_token = payload
    },
    setExpiration: (state, payload) => {
        state.expires_in = payload
    },
    setMe: (state, payload) => {
        state.me = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
