<template>
    <div class="auth-callback">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  
  export default {
    name: 'GoogleCallback',
    layout: 'auth',
    
    data() {
      return {
        message: 'Authenticating...'
      }
    },
  
    created() {
      console.log('Callback page created');
      console.log('All cookies:', document.cookie);
      const googleToken = Cookies.get('google_auth_token');
      console.log('Google token in created:', googleToken);
    },
    
    async mounted() {
      console.log('Callback page mounted');
      try {
        // Google auth callback'ten sonra cookie'yi al
        const googleToken = Cookies.get('google_auth_token');
        console.log('Google token in mounted:', googleToken);
        console.log('All cookies in mounted:', document.cookie);
        
        if (googleToken) {
          this.message = 'Token found, authenticating...';
          console.log('Setting token:', googleToken);
          // Token'ı auth modülüne kaydet
          this.$auth.setToken('local', 'Bearer ' + googleToken);
          
          // Kullanıcı bilgilerini al
          this.message = 'Getting user info...';
          await this.$auth.fetchUser();
          
          // Ana sayfaya yönlendir
          this.message = 'Redirecting to home...';
          this.$router.push('/');
        } else {
          console.log('No token found in cookies');
          this.message = 'No token found, redirecting to login...';
          // Token bulunamazsa login sayfasına yönlendir
          this.$router.push('/auth/login');
        }
      } catch (error) {
        console.error('Google callback error:', error);
        this.message = 'Error occurred, redirecting to login...';
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
  