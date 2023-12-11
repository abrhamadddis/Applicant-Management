// /**
//  * main.js
//  *
//  * Bootstraps Vuetify and other plugins then mounts the App`
//  */

// // Plugins
// import { registerPlugins } from '@/plugins'
// import VCalendar from 'v-calendar';
// import 'v-calendar/style.css';

// // Components
// import App from './App.vue'

// // Composables
// import { createApp } from 'vue'

// const app = createApp(App)

// registerPlugins(app)
// app.use(VCalendar, {})

// app.mount('#app')

// import { createApp } from 'vue';
// import App from './App.vue';
// import Vuetify from 'vuetify'; // Import Vuetify from its package

// // ... other imports or configurations

// const app = createApp(App);

// app.use(Vuetify); // Use Vuetify as a plugin

// app.mount('#app');

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')