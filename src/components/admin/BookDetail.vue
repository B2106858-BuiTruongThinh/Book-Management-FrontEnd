<template>
    <div>
      <hr>
      <div class="p-1">
        <strong>Tên sách:</strong>
        {{ book.name }}
      </div>
      <div class="p-1">
        <strong>Giá: </strong>
        {{ book.price }}
      </div>
      <div class="p-1">
        <strong>Số lượng: </strong>
        {{ book.quantity }}
      </div>
      <div class="p-1">
        <strong>Tác giả:</strong>
        {{ book.author }}
      </div>
      <hr>
      <div class="p-1">
        <strong>Tên nhà xuất bản:</strong>
        {{ book.publisher }}
      </div>
      <div class="p-1">
        <strong>Năm xuất bản:</strong>
        {{ book.publishYear }}
      </div>
      <div class="p-1">
        <strong>Địa chỉ NXB:</strong>
        {{ book.publisherAddress }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      book: { type: Object, required: true },
    },
  };
  </script>

<style>
.center-image {
  display: block;
  margin: 0 auto;
}
</style>