import { bookService } from '../services/book-service.js';
// import bookSearch from '../cmps/search-book.cmp.js';

export default {
    template: `
    
        <section class="book-add app-main">
        <h3>This is a book add</h3>
        <form @submit.prevent="searchBooks">
        <input ref="input" type="text" v-model="bookName"  placeholder="Add-book?" class="add-book-input"/>
        <button>Search Books</button>
         </form>
          <ul class="book-add-list" v-for="book in books">
                    <li>{{book.volumeInfo.title}}</li><button @click="addBook(book)">ADD</button>
          </ul>
          
       
            
        </section>
    `,
    data() {
        return {
            bookName: '',
            books: []
        }
    },
    created() {

        console.log("got here");

    },
    methods: {

        searchBooks() {
            bookService.getBooksFromApi(this.bookName)
                .then((data) => {
                    console.log('search', data);
                    this.books = data.items
                })
                .catch()


        },

        addBook(book) {
            bookService.addGoogleBook(book)

            bookService.query()
                .then(updatedBooks => this.$emit('addedBook', updatedBooks));
        }


    },
    mounted() {
        this.$refs.input.focus()
    },
}