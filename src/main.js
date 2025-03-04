import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    display: {
        mobileBreakpoint: 'sm'
    },
    theme: {
        defaultTheme: 'dark'
    },
    components,
    directives
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
