import { bookService } from '../services/book-service.js';
import bookDescription from '../cmps/book-description.cmp.js'
import bookReview from './review-add.cmp.js'
import { utilService } from '../services/util-service.js';

export default {
    // props: ['book'],
    template: `
        <section v-if="book" class="book-details">
            <div class="book-details-container">
                <h4>book details</h4> 
                <img :src="book.thumbnail">
                <p >page count: {{pageCounts}}</p>
                <p> published Date: {{publishedDate}}</p>
                <p >book price: <span class="book-price" v-bind:class="bgRed">{{formattedNumber}}</span></p>
                <span>Sale:<img v-if="book.listPrice.isOnSale" src="./img/sale.png" class="sale"></span>
                <book-description :description="book.description" />
                <button @click="back">X</button>
            </div>
            <!-- <book-review @save="setReview"/> -->
            <book-review  :bookId="book.id"/>
          
            <router-link :to="'/book/'+book.prevbookId">Prev book</router-link> | 
             <router-link :to="'/book/'+book.nextbookId">Next book</router-link> |
        </section>
    `,


    components: {
        bookDescription,
        bookReview,
    },

    data() {
        return {
            sale: false,
            book: null,
            bookId: null
        }
    },
    created() {
        const id = this.$route.params.bookId;
        // console.log(id)
        bookService.get(id)

            .then(book => this.book = book);
    },

    methods: {

        back() {
            this.$router.push(`/book`)
            // this.$emit('selected', book);
        },
        setReview(newReview) {
            newReview.id = utilService.makeId();
            this.book.reviews.push(newReview);
            bookService.save(this.book);
        },
        // loadBook() {
        //     bookService.get(this.bookId)
        //         .then(book => this.book = book);
        // }

    },


    computed: {
        bookId() {
            return this.$route.params.bookId
        },
        pageCounts() {
            if (this.book.pageCount >= 500) return `${this.book.pageCount} Long reading`
            if (this.book.pageCount > 200 && this.book.pageCount <= 100) return `${this.book.pageCount} Decent Reading`
            if (this.book.pageCount <= 100) return `${this.book.pageCount} Light Reading`

            return this.book.pageCount;
        },
        publishedDate() {
            // var time =Date.now()
            var publishDiff = new Date().getFullYear() - (+this.book.publishedDate)
            if (publishDiff >= 10) return `${this.book.publishedDate} Veteran Book`
            else if (publishDiff <= 1) return `${this.book.publishedDate} New!`
        },
        formattedNumber() {
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },

        bgRed() {
            if (this.book.listPrice.amount >= 150) return 'red'

            else return 'green'
        },


    },
    watch: {
        '$route.params.bookId': {
            handler() {
                this.bookId = this.$route.params.bookId;
                bookService.get(this.bookId)
                    .then(book => this.book = book);
            },
            immediate: true,
        }
    }

}



