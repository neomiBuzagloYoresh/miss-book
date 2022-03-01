export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            
            <p>book name: {{book.title}}</p>
            <!-- <p>book price: {{formattedNumber}}</p>  -->
            <img :src="book.thumbnail">
           
        </section>
    `,
    data() {
        return {

        }
    },
    created() { },
    methods: {},

    computed: {
        formattedNumber() {

            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },

    }
}