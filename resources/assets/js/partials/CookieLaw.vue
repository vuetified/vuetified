<template>
<cookie-law theme="dark-lime" buttonText="Yes, I Understand This Site Uses Cookie.">
        <div slot="message">
            <p>This website uses cookies to ensure you get the best experience on our website.
                <span>Read Our Cookie Terms and Usage For More Info:</span> <router-link to="/cookie-law-agreement">Click here</router-link>
            </p>
        </div>
</cookie-law>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
export default {
    components: { CookieLaw }
}
</script>
