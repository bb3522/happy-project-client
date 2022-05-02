import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import GAuth from 'vue3-google-oauth2'

const app = createApp(App)
const gAuthOptions = { clientId: '780258900131-3kntd84hkol8rc1dmfqs69l42a41g2ve.apps.googleusercontent.com', scope: 'email', prompt: 'consent', fetch_basic_profile: true }
app.use(GAuth, gAuthOptions)

app.use(createPinia())
app.use(router)
app.mount('#app')
