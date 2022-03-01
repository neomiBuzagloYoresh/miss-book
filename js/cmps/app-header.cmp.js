export default {
    template: `
        <header class="app-header">
           
                <h3>app-books</h3>
            
            <nav class="nav-bar-header">
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/about">About</router-link>|
                <router-link to="/book-add">add-book</router-link>
            </nav>
        </header>
    
    `
}