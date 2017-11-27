const state = {
    /* gloudemans/shoppingcart */
    items: App.cart.items,
    tax: App.cart.tax,
    subtotal: App.cart.subtotal,
    total: App.cart.total,
    form: new AppForm(App.forms.cartForm),
    count: App.cart.count
}

const getters = {
    getItems: state => state.items,
    getTax: state => state.tax,
    getSubTotal: state => state.subtotal,
    getTotal: state => state.total,
    getCount: state => state.count,
    getForm: state => state.form
}

const actions = {
    /* Tested Working */
    /* form : id, qty, options  */
    // ? Variations happens if there is an options
    async addItem ({ commit, state }, { id, qty, options }) {
        commit('newForm')
        state.form.busy = true
        state.form.qty = qty
        state.form.id = id
        state.form.options = options
        try {
            const payload = await App.post(route('api.cart.add'), state.form)
            commit('setItems', payload.cart.items)
            commit('setTax', payload.cart.tax)
            commit('setSubTotal', payload.cart.subtotal)
            commit('setTotal', payload.cart.total)
            commit('setCount', payload.cart.count)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            state.form.errors.set(errors)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },

    /* Tested Working */
    /* form : product.id */
    async removeItem ({commit, state}, id) {
        commit('newForm')
        state.form.busy = true
        let item = _.find(state.items, function (i) { return i.id === id })
        state.form.rowId = item.rowId
        try {
            const payload = await App.post(route('api.cart.delete'), state.form)
            commit('setItems', payload.cart.items)
            commit('setTax', payload.cart.tax)
            commit('setSubTotal', payload.cart.subtotal)
            commit('setTotal', payload.cart.total)
            commit('setCount', payload.cart.count)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            state.form.errors.set(errors)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    async destroyCart ({commit, state}) {
        commit('newForm')
        state.form.busy = true
        try {
            const payload = await App.post(route('api.cart.destroy'), state.form)
            commit('setItems', payload.cart.items)
            commit('setTax', payload.cart.tax)
            commit('setSubTotal', payload.cart.subtotal)
            commit('setTotal', payload.cart.total)
            commit('setCount', payload.cart.count)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            state.form.errors.set(errors)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    /* form: id and qty */
    async updateItem ({ commit, state }, { rowId, qty }) {
        commit('newForm')
        state.form.busy = true
        state.form.rowId = rowId
        state.form.qty = qty
        try {
            const payload = await App.post(route('api.cart.update'), state.form)
            commit('setItems', payload.cart.items)
            commit('setTax', payload.cart.tax)
            commit('setSubTotal', payload.cart.subtotal)
            commit('setTotal', payload.cart.total)
            commit('setCount', payload.cart.count)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            state.form.errors.set(errors)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
    },
    resetCart ({ commit }) {
        commit('setItems', [])
        commit('setTax', 0)
        commit('setSubTotal', 0)
        commit('setTotal', 0)
        commit('setCount', 0)
        commit('newForm')
    }

}

const mutations = {
    setItems: (state, payload) => {
        state.items = payload
    },
    setTax: (state, payload) => {
        state.tax = payload
    },
    setSubTotal: (state, payload) => {
        state.subtotal = payload
    },
    setTotal: (state, payload) => {
        state.total = payload
    },
    setCount: (state, payload) => {
        state.count = payload
    },
    newForm: (state) => {
        state.form = new AppForm(App.forms.cartForm)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
