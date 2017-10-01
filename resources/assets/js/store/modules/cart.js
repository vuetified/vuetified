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
    /* form : sku */
    async addItem ({ commit, state }, sku) {
        commit('newForm')
        state.form.busy = true
        state.form.qty = 1
        state.form.sku = sku
        try {
            const payload = await App.post(route('api.cart.add'), state.form)
            commit('setItems', payload.cart.items)
            commit('setTax', payload.cart.tax)
            commit('setSubTotal', payload.cart.subtotal)
            commit('setTotal', payload.cart.total)
            commit('setCount', payload.cart.count)
            let newpayload = {item: payload.cart.item, inCart: !_.isEmpty(payload.cart.item), qty: payload.cart.item.qty}
            vm.$emit('inCart', newpayload)
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
            let newpayload = {item: item, inCart: !_.isEmpty(payload.cart.item), qty: 0}
            vm.$emit('inCart', newpayload)
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
            let newpayload = {items: payload.cart.items}
            vm.$emit('inCart', newpayload)
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
    async updateItem ({ commit, state }, id, qty) {
        commit('newForm')
        state.form.busy = true
        state.form.qty = qty
        let item = _.find(state.items, function (i) { return i.id === id })
        state.form.rowId = item.rowId
        try {
            const payload = await App.post(route('api.cart.add'), state.form)
            commit('setItems', payload.cart.items)
            commit('setTax', payload.cart.tax)
            commit('setSubTotal', payload.cart.subtotal)
            commit('setTotal', payload.cart.total)
            commit('setCount', payload.cart.count)
            let newpayload = {item: payload.cart.item, inCart: !_.isEmpty(payload.cart.item), qty: payload.cart.item.qty}
            vm.$emit('inCart', newpayload)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        } catch ({errors, message}) {
            state.form.errors.set(errors)
            state.form.busy = false
            commit('newForm')
            vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
        }
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
