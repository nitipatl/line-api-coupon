<template>
  <div class="container text-center">
      <img src="https://vos.line-scdn.net/strapi-cluster-instance-bucket-83/image_e72b33b56d.svg" class="img-fluid">
      <div v-if="!isLoading">
        <input type="couponcode" class="form-control text-center mb-2" placeholder="Coupon Code" v-model="coupon">
        <button type="submit" class="btn btn-success w-100" @click="redeem">Redeem</button>
      </div>
      <div v-else>
        <div class="spinner-grow text-success">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'redaxios'
export default {
  data() {
    return {
      coupon: '',
      isLoading: false,
    }
  },
  methods: {
    redeem() {
      if (this.coupon == '') {
        this.$swal({
          icon: 'warning',
          text: 'Please input coupon!',
        })
        return
      }
      this.isLoading = true
      axios.post(import.meta.env.VITE_API_ENDPOINT_URL, {
        coupon: this.coupon
      }).then(result => {
        this.isLoading = false
        if (result.data.result === 'pass') {
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            text: `Quota: ${result.data.quota}, Available: ${result.data.available}`,
          })
        } else {
          this.$swal({
            icon: 'error',
            text: 'Coupon is invalid!',
          })
        }
      }).catch(() => {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          text: 'Something went wrong!',
        })
      })
      this.coupon = ''
    }
  }
}
</script>
