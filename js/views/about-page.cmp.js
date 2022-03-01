import { eventBook } from '../services/eventBook-service.js'

export default {
    template: `
        <section class="about-page app-main">
            <h3>This is a book list</h3>
            <!-- <button @click="callBus">Call the bus</button> -->
        </section>
    `,
    methods: {
        callBus() {
            console.log('Calling bus!');
            eventBook.emit('test', 'test data')
        }
    }
}