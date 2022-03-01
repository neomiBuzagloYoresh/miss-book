import { bookService } from '../services/book-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
// import bookReview from './review-add.cmp.js';
import { eventBook } from '../services/eventBook-service.js';


export default {
    template: `
        <section class="book-app">
            
            <book-filter @filtered="setFilter" v-if="!selectedBook"/>
            <!-- <book-review  @saved="saveReview" /> -->
            <book-list :books="booksToShow" @remove="removeBook"  @selected="selectBook"></book-list>
            <book-details v-if="selectedBook" :book="selectedBook"  @close="selectedBook = null" />
   
           
 
        </section>
    `,
    components: {
        bookFilter,
        bookList,
        bookDetails,
        // bookReview
        eventBook
    },
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        };
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;

        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    const idx = this.books.findIndex((book) => book.id === id);
                    this.books.splice(idx, 1);
                    eventBook.emit('show-msg', { txt: 'Deleted succesfully', type: 'success' });
                })
                .catch(err => {
                    console.error(err);
                    eventBook.emit('show-msg', { txt: 'Error - please try again later', type: 'error' });
                });
        },
        saveReview(book) {
            this.books.push(book);
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            let filterdByNames = this.books;
            if (this.filterBy.title) {
                const regex = new RegExp(this.filterBy.title, 'i')
                filterdByNames = this.books.filter((book) => regex.test(book.title))
            }
            return filterdByNames.filter((book) => +book.listPrice.amount >= +this.filterBy.minPrice && +book.listPrice.amount <= +this.filterBy.maxPrice)

        },
    },
}

// else {
//     return this.books.filter((book) => +book.listPrice.amount >= +this.filterBy.minPrice && +book.listPrice.amount <= +this.filterBy.maxPrice)
// }
