export default {
    methods: {
        hasRole (payload) {
            let me = this.$store.getters['auth/getMe']
            return me.roles.includes(r => r === payload)
        },
        hasPermission (permission) {
            let me = this.$store.getters['auth/getMe']
            return me.permissions.includes(p => p === permission)
        },
        hasAnyPermission (permissions) {
            let me = this.$store.getters['auth/getMe']
            return permissions.some(p => me.permissions.includes(p))
        },
        hasAnyRole (roles) {
            let me = this.$store.getters['auth/getMe']
            return roles.some(r => me.roles.includes(r))
        },
        hasAllRoles (roles) {
            let me = this.$store.getters['auth/getMe']
            return _.difference(roles, me.roles).length === 0
        },
        hasAllPermissions (permissions) {
            let me = this.$store.getters['auth/getMe']
            return _.difference(permissions, me.permissions).length === 0
        }
    }
}
