<template>
    <div>
      <ClientAppHeader />
      <div class="container mt-3">
        <div class="page row">
          <div class="col-md-10">
            <ClientInputSearch v-model="searchText" />
          </div>
          <div class="mt-3 col-8">
            <h4>
              Danh Sách Sách
              <i class="fa-solid fa-book"></i>
            </h4>
  
            <div class="">
              <button class="btn btn-sm btn-primary custom-margin" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
              </button>
            </div>
  
            <ClientBookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
            <p v-else>Không có sách trong kho.</p>
          </div>
  
          <div class="mt-3 col-4">
            <div v-if="activeBook">
              <h4>
                Chi tiết đầu sách
                <i class="fa-solid fa-book"></i>
              </h4>
              <ClientBookDetail :book="activeBook" />
              <router-link :to="{
                name: 'borrow-book',
                params: { id: activeBook._id },
              }">
                <span class="mt-2 badge badge-warning" style="color: blue">
                  <i class="fas fa-edit"></i> Mượn
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </template>
  
  <script>
  import ClientBookDetail from "@/components/client/ClientBookDetail.vue";
  import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
  import ClientInputSearch from "@/components/client/ClientInputSearch.vue";
  import ClientBookList from "@/components/client/ClientBookList.vue";
  import BookService from "@/services/client/book.service";
  
  export default {
    components: {
      ClientBookDetail,
      ClientInputSearch,
      ClientBookList,
      ClientAppHeader,
    },
    
    data() {
      return {
        books: [],
        activeIndex: -1,
        searchText: "",
      };
    },
    watch: {
      
      searchText() {
        this.activeIndex = -1;
      },
    },
    computed: {
      
      booksStrings() {
        return this.books.map((book) => {
          const {
            name,
            price,
            quantity,
            publishYear,
            author,
            thumbnail,
          } = book;
          return [
            name,
            price,
            quantity,
            publishYear,
            author,
            thumbnail,
          ].join("");
        });
      },
      
      filteredBooks() {
        if (!this.searchText) return this.books;
  
        return this.books.filter((_book, index) =>
          this.booksStrings[index].includes(this.searchText)
        );
      },
      activeBook() {
        if (this.activeIndex < 0) return null;
        return this.filteredBooks[this.activeIndex];
      },
      filteredBooksCount() {
        return this.filteredBooks.length;
      },
    },
    methods: {
      async retrieveBooks() {
        try {
          this.books = await BookService.getAll();
        } catch (error) {
          console.log(error);
        }
      },
      refreshList() {
        this.retrieveBooks();
        this.searchText = "";
        this.activeIndex = -1;
      },
    },
    mounted() {
      this.refreshList();
    },
  };
  </script>
  
  <style scoped>
  .page {
    text-align: left;
  }
  
  .custom-margin {
    margin-right: 10px;

  }
  </style>