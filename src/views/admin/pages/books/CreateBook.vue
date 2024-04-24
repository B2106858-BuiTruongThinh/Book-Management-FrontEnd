<template>
  <div>
    <AppHeader />
    <div class="container mt-3 mb-3">
      <div class="add-new">Thêm sách</div>
      <div class="form">
        <form @submit.prevent="add" action="" enctype="multipart/form-data" method="post">
          <div class="form-item">
            <label class="label" for="name">Tên sách:</label><br />
            <input class="input" type="text" id="name" v-model="formData.name" />
          </div>

          <div class="form-item">
            <label class="label" for="price">Giá:</label><br />
            <input class="input" type="number" id="price" v-model="formData.price" />
          </div>

          <div class="form-item">
            <label class="label" for="quantity">Số lượng:</label><br />
            <input class="input" type="number" id="quantity" v-model="formData.quantity" />
          </div>

          <div class="form-item">
            <label class="label" for="author">Tác giả:</label><br />
            <input class="input" type="text" id="author" v-model="formData.author" />
          </div>

          <div class="form-item">
            <label class="label" for="publisher">Tên nhà xuất bản:</label><br />
            <input class="input" type="text" id="publisher" v-model="formData.publisher" />
          </div>

          <div class="form-item">
            <label class="label" for="publishYear">Năm xuất bản:</label><br />
            <input class="input" type="text" id="publishYear" v-model="formData.publishYear" />
          </div>

          <div class="form-item">
            <label class="label" for="publisherAddress">Địa chỉ NXB:</label><br />
            <input class="input" type="text" id="publisherAddress" v-model="formData.publisherAddress" />
          </div>

          <button type="submit" class="btn btn-primary">Tạo</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import BookService from "@/services/admin/book.service";

export default {
  components: {
  },
  data() {
    return {
      formData: {
        id_publisher: "",
        name: "",
        price: 0,
        quantity: 0,
        publishYear: "",
        author: "",
      },
    };
  },

  computed: {},

  methods: {
    async add() {
      try {
        if (
          !this.formData.name ||
          !this.formData.price ||
          !this.formData.quantity ||
          !this.formData.author
        ) {
          toast.error("Please fill in all required fields.", {
            autoClose: 3000,
          });
          return;
        }

        const formData = new FormData();
        formData.append("name", this.formData.name);
        formData.append("price", this.formData.price);
        formData.append("quantity", this.formData.quantity);
        formData.append("publishYear", this.formData.publishYear); // Append the image file
        formData.append("publisher", this.formData.publisher);
        formData.append("publisherAddress", this.formData.publisherAddress);
        formData.append("author", this.formData.author);
        const response = await BookService.create(this.formData);
        console.log(response);
        toast.success("Added successfully!", {
          autoClose: 1200,
        });

        setTimeout(() => {
          this.$router.push({ name: "book" });
        }, 800);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Error!";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  width: 500px;
  height: 850px;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
  font-size: 30px;
  margin-bottom: 20px;
}

.form-item {
  text-align: left;
  padding: 10px;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>