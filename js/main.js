
import { router } from './router.js';
import appFooter from './cmps/app-footer.cmp.js';
import appHeader from './cmps/app-header.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

const options = {
    template: `

         <app-header />
            <!-- <book-app/> -->
            <user-msg />
            <router-view />
            <app-footer />
    `,
    components: {
        // bookApp,

        appHeader,
        appFooter,
        userMsg
    }
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');

