export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Marketplace',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/styles/style.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "@/plugins/axios" },
        { src: "@/plugins/utils" },
        { src: "@/plugins/utils/filters" },
        { src: '@/plugins/elementUI' },
        { src: '@/plugins/vueCropper', mode: 'client' },
        { src: '@/plugins/vueTheMask', mode: 'client' },
        { src: '@/plugins/vueStarRating', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/i18n',
        '@nuxtjs/auth-next',
        'vue-scrollto/nuxt',
        'vue-social-sharing/nuxt'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // baseURL: process.env.API_BASE_URL
        baseURL: 'http://127.0.0.1:8000/api/v1',
    },

    // Auth module configuration
    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'token',
                    maxAge: 60 * 60 * 24 * 7,
                    global: true
                },
                refreshToken: {
                    property: 'token',
                    data: 'token',
                    maxAge: 60 * 60 * 24 * 7
                },
                user: {
                    property: 'data'
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    refresh: { url: '/auth/refresh', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/auth/me', method: 'get' }
                }
            },
            google: {
                scheme: 'oauth2',
                endpoints: {
                    authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
                    token: 'https://oauth2.googleapis.com/token',
                    userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
                },
                token: {
                    property: 'access_token',
                    type: 'Bearer',
                    maxAge: 1800
                },
                refreshToken: {
                    property: 'refresh_token',
                    maxAge: 60 * 60 * 24 * 30
                },
                responseType: 'code',
                grantType: 'authorization_code',
                accessType: 'offline',
                clientId: process.env.GOOGLE_CLIENT_ID,
                codeChallengeMethod: '',
                scope: ['openid', 'profile', 'email'],
                state: 'UNIQUE_AND_NON_GUESSABLE'
            }
        },
        redirect: {
            login: '/auth/login',
            logout: '/',
            callback: '/auth/login',
            home: '/'
        },
        plugins: [
            '@/plugins/auth'
        ]
    },

    // Nuxt module configuration: https://i18n.nuxtjs.org/options-reference/
    i18n: {
        locales: [
            { code: "az", iso: "az-AZ", file: "az/index.js" },
            { code: "ru", iso: "ru-RU", file: "ru/index.js" },
            { code: "en", iso: "en-EN", file: "en/index.js" }
        ],
        defaultLocale: "ru",
        strategy: "prefix_except_default",
        lazy: true,
        langDir: "assets/locales/",
        detectBrowserLanguage: false,
        vueI18n: {
            fallbackLocale: "ru"
        }
    },

    // Loading indicator
    loading: {
        color: '#77BDCA',
        height: '3px'
    },

    // Local dev server
    server: {
        host: '0.0.0.0',
        port: 8080,
    },

    publicRuntimeConfig: {
        // baseURL: process.env.API_BASE_URL
        baseURL: 'http://127.0.0.1:8000/api/v1'

    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        standalone: true,
        transpile: [/^element-ui/]
    }
}
