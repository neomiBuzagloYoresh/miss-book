export default {
    template: `
        <section class="book-filter">
        <form action="" type="submit">
            <label>
            Find your book:
            <input type="text" v-model="filterBy.title" placeholder="Search..."> 
            </label>
            <label>
            From:
            <input  type="number" min="19" v-model="filterBy.minPrice" placeholder="minimum$"> 
            </label>
            <label>
            Up to:
            <input  type="number" max="186" v-model="filterBy.maxPrice" placeholder="maximum$"> 
            </label>
            <button @click.prevent="setFilter">Search</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: Infinity,
            },
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy);
        }
    }
}


/* <select v-model="all">
<option v-for="(book,key) in books" :value="key">{{book.title}}</option>
<option v-for="(book,key) in books" :value="key">{{book.pageCount}}</option>

</select> */


{/* <label>
Search
<input @input="setFilter" type="text" v-model="filterBy.title" placeholder="Search...">
</label>  */}
