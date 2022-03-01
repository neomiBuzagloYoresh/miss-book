import { bookService } from '../services/book-service.js';
// import bookSearch from '../cmps/search-book.cmp.js';

export default {
    template: `
    
        <section class="book-add app-main">
        <h3>This is a book add</h3>
        <form @submit.prevent="searchBooks">
        <input type="text" v-model="bookName"  :list="listId" />
        <button>Search Books</button>
         </form>
          <ul>
                    <li></li>
          </ul>

            <!-- <pre>{{answers}}</pre> -->

        </section>
    `,
    data() {
        return {
            bookName: '',
            answers: []
        }
    },
    created() {
        console.log("got here");

    },
    methods: {

        searchBooks() {
            bookService.getBooksFromApi(this.bookName)
                .then((data) => {
                    console.log('data', data);
                    this.answers = data
                })
            // console.log('search', this.bookName);

        }
    },
    computed: {
        // bookSearch
    },
    watch: {

    }
}