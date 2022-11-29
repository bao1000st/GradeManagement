<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">CẬP NHẬT ĐIỂM</h3>
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            class="form-control"
            v-model="grade.name"
            required
            disabled
          />
        </div>

        <div class="form-group">
          <label>Môn học</label>
          <input
            type="text"
            class="form-control"
            v-model="grade.course"
            required
          />
        </div>

        <div class="form-group">
          <label>Điểm số</label>
          <input
            type="number"
            class="form-control"
            v-model="grade.score"
            step="0.01"
            min="0"
            max="10"
            required
          />
        </div>
        <br>
        <div class="form-group">
          <button class="btn btn-danger btn-block">Cập Nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      grade: {},
    };
  },
  created() {
    let apiURL = `http://localhost:4000/gradeapi/edit-grade/${this.$route.params.id}`;
    axios.get(apiURL).then((res) => {
      this.grade = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:4000/gradeapi/update-grade/${this.$route.params.id}`;
      axios
        .put(apiURL, this.grade)
        .then((res) => {
          console.log(res);
          this.$router.push("/view_grades");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>