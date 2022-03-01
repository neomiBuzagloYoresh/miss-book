import { bookService } from '../services/book-service.js';
import { eventBook } from '../services/eventBook-service.js';

export default {
    props: ['bookId'],
    template: `
    
        <section  class="Book-review ">
           
            <form @submit.prevent="save" class="Book-add-rev">
            <p class="review-title">Book Reviews:</p>
            <div v-if="book" v-for="review in showReviews" class="review">
                <span>Comment By: {{BookReview.fullName}}</span>
                <span>Date: {{BookReview.date}} Rate: {{BookReview.rate}}</span>
                <span>Description: {{BookReview.textarea}}</span>
                <button @click="removeComment(BookReview.id)">Delete Comment</button>
                </div>
                name: <input ref="fullName" v-model="BookReview.fullName"  @input="displayReview" type="name" placeholder="full name...">
                date: <input type="date" v-model=" BookReview.date">
                rate:  <input type="number" v-model.number="BookReview.rate" min="0" max="5">
                free text: <textarea name="review" rows="4" cols="30" v-model="BookReview.textarea" placeholder="Your comment here">
                </textarea>
            <!-- ref="fullNameInput" -->
                <button>Submit</button>
            </form>
        </section>
    `,
    data() {
        return {
            BookReview: {
                fullName: '',
                rate: null,
                date: new Date().toISOString().slice(0, 10),
                textarea: '',
            },
            book: null,
        };
    },
    created() {
        bookService.get(this.bookId).then(book => this.book = book)
    },
    mounted() {
        this.$refs.fullName.focus()
        // console.log(this.$refs);

    },
    methods: {
        displayReview() {
            // console.log(this.review)
            return this.review
        },
        save() {
            bookService.addReview(this.bookId, { ...this.review })
                .then(book => this.book = book)
                .then(this.review = {
                    name: '',
                    rate: null,
                    date: new Date().toISOString().slice(0, 10),
                    desc: '',
                }).then(book => {
                    eventBook.emit('show-msg', { txt: 'Review Added', type: 'success' })
                    // this.$router.push('/book')
                });

        },
        removeComment(reviewId) {
            console.log(reviewId)
            let currRevIdx = this.book.reviews.findIndex(review => review.id === reviewId)
            bookService.removeReview(this.book, reviewId)
                .then(book => console.log(book))
                .then(book => {
                    eventBook.emit('show-msg', { txt: 'Review Removed', type: 'failure' })
                })
            this.book.reviews.splice(currRevIdx, 1)

        }

    },
    computed: {
        showReviews() {
            if (Array.isArray(this.book.reviews)) return this.book.reviews
        },

    }
};



