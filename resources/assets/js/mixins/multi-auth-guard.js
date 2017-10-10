/* Useful for Multi Auth */
export default {
    props: ['guard'],
    data () {
        return {
            endpoints: {
                /* Add All Your Guards Here */
                web: null,
                team: null,
                customer: null,
                api: null
            }
        }
    },
    methods: {
        guardAllowed (guards = ['web', 'team', 'customer', 'api'], callback) {
            let self = this
            if (_.includes(guards, self.guard)) {
                callback
                self.resetEndpoints()
            } else {
                self.$popup({ message: 'You Are Not Authorized To Do That Action!' })
            }
        },
        resetEndpoints () {
            this.endpoints = {
                /* Add All Your Guards Here */
                web: null,
                team: null,
                customer: null,
                api: null
            }
        },
        /* Configure This if You Add or Remove Guards */
        guardedLocation ({web, team, customer, api} = this.endpoints) {
            let self = this
            if (self.guard === 'customer') {
                return customer
            } else if (self.guard === 'team') {
                return team
            } else if (self.guard === 'api') {
                return api
            } else {
                return web
            }
        }
    }
}
