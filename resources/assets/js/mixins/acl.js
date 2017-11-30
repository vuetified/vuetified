export default {
    methods: {
        isLoggedIn () {
            return !!this.$store.getters['auth/getMe']
        },
        /* string */
        hasRole (payload) {
            let me = this.$store.getters['auth/getMe']
            return _.includes(me.roles, payload)
        },
        /* string */
        hasPermission (payload) {
            let me = this.$store.getters['auth/getMe']
            return _.includes(me.permissions, payload)
        },
        /* array */
        hasAnyPermission (permissions) {
            let me = this.$store.getters['auth/getMe']
            return permissions.some(p => me.permissions.includes(p))
        },
        /* array */
        hasAnyRole (roles) {
            let me = this.$store.getters['auth/getMe']
            return roles.some(r => me.roles.includes(r))
        },
        /* array */
        hasAllRoles (roles) {
            let me = this.$store.getters['auth/getMe']
            return _.difference(roles, me.roles).length === 0
        },
        /* array */
        hasAllPermissions (permissions) {
            let me = this.$store.getters['auth/getMe']
            return _.difference(permissions, me.permissions).length === 0
        },
        /* string */
        can (permission) {
            return this.$store.getters['auth/getMe'].can[permission]
        }
    }
}
