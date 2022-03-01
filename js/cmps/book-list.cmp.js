import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        
            <ul class="book-list">
                <li v-for="book in books" :key="book.id" >
                    <div class="actions">
                       <book-preview :book="book" />
                       <button @click="remove(book.id)">X</button>
                       <button @click="select(book)">Details</button>

                   </div>
                </li>
            </ul>
     
    `,
    components: {
        bookPreview
    },
    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        select(book) {
            this.$router.push(`/book/${book.id}`)
            // this.$emit('selected', book);
        }
    },
    computed: {}
}