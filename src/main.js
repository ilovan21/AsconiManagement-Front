import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import{faPhone} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleChevronRight)
library.add(faClock)
library.add(faPhone)

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    display: {
        mobileBreakpoint: 'sm'
    },
    components,
    directives
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
