import { eventBook } from '../services/eventBook-service.js'




export default {
    // name: 'about-page',
    template: `
        <section class="about-page app-main">
            <h3>About-Page</h3>
            <!-- <button @click="callBus">Call the bus</button> -->
            <nav>
                <!-- <router-link to="/about/team">Team</router-link> |
                <router-link to="/about/services">Services</router-link> -->
            </nav>
            <router-view></router-view>
        </section>
    `,
    methods: {
        callBus() {
            console.log('Calling bus!');
            eventBook.emit('test', 'test data')
        }
    },
    components: {
        // aboutTeam
    }
}