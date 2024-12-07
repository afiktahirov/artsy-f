<template>
    <div class="auth-callback">
        <p>Authenticating...</p>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'GoogleCallback',
    layout: 'auth',

    async mounted() {
        try {
            // Google auth callback'ten sonra cookie'yi al
            const googleToken = Cookies.get('google_auth_token');

            if (googleToken) {
                // Token'ı auth modülüne kaydet
                this.$auth.setToken('local', 'Bearer ' + googleToken);

                // Kullanıcı bilgilerini al
                await this.$auth.fetchUser();

                // Ana sayfaya yönlendir
                this.$router.push('/');
            } else {
                // Token bulunamazsa login sayfasına yönlendir
                this.$router.push('/auth/login');
            }
        } catch (error) {
            console.error('Google callback error:', error);
            this.$router.push('/auth/login');
        }
    }
}
</script>

<style scoped>
.auth-callback {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>