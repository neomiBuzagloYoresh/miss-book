export default {
    props: ['description'],
    template: `
        <section class="book-description">
            <div>description: {{showDescription}} </div>
            <button v-on:click="toggleMode">Show {{btnTxt}}</button>

        </section>
    `,
    data() {
        return {
            isMore: false,
        }
    },

    methods: {
        toggleMode() {
            this.isMore = !this.isMore
        },
    },
    computed: {

        showDescription() {
            if (this.isMore || this.description.length < 100) return this.description
            else return this.description.slice(0, 100) + '...'

        },
        btnTxt() {

            return this.isMore ? 'less' : 'more'

        }
    }
}