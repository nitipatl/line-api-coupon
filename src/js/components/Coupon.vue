<template>
  <div class="container text-center mobile">
      <img src="/assets/line-dev-logo.png" class="img-fluid">
      <img src="/assets/logo.png" class="img-fluid">
      
      <div class="card p-2">
        <div class="card-body">
          <p>
          <b><span style="color:green">ยินดีต้อนรับสู่บูธ</span> <span style="color:blue">LINE SHOPPING API</span></b>
          <br />
          ทีมงานได้เตรียมตัวอย่างการประยุกต์ใช้
          ในการสร้างระบบขาย digital code
          </p>
          <p>
            โดยใช้หน้าร้านของ LINE SHOPPING เป็นช่องทางในการให้ลูกค้าของร้านมาสั่งซื้อ ชำระเงิน และได้รับ code จากหน้าแช้ทกับ Official Account ของร้าน และสามารถนํา code ไปใช้ที่ website ของร้านได้
          </p>
          <p>
            <b>ลองใช้ของจริงกัน ลองเสร็จ แลกคะแนนกิจกรรมประจำบูธไปเลย!</b>
          </p>
        </div>
      </div>
      <div class="card mt-2 p-2">
        <img src="/assets/step-01.png" class="card-img-top">
        <div class="card-body">
          <p class="card-text">
            เข้าไปซื้อ Digital code ที่ร้านของ LINE SHOPPING API บน LINE SHOPPING<br />
<a href="https://shop.line.me/@655kwkxg/product/1002648355" target="_blank">https://shop.line.me/@655kwkxg/product/1002648355</a><br /><br />

ไม่ต้องจ่ายเงินจริง<br />
แนบสลิปโอนเงินด้วยรูปอะไรก็ได้<br />
เมื่อทีมงานยืนยันคำสั่งซื้อ คุณจะได้โค้ดผ่านห้องแช้ทกับ LINE Official Account
          </p>
        </div>
      </div>
      <div class="card mt-2 p-2">
        <img src="/assets/step-02.png" class="card-img-top">
        <div class="card-body">
          <p class="card-text">
            copy code ของคุณ แล้วนำมา paste ที่นี่<br />
แล้วกด Redeem เพื่อแลกคะแนนกิจกรรม<br />
ไปได้เลย!<br />
          </p>
        </div>
      </div>
      <div v-if="!isLoading" class="mt-2">
        <input type="couponcode" class="form-control text-center mb-2" placeholder="paste code ที่นี่" v-model="coupon">
        <button type="submit" class="btn btn-success w-100" @click="redeem">Redeem</button>
      </div>
      <div v-else class="mt-2">
        <div class="spinner-grow text-success">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="card mt-2 p-2">
        <a href="https://feedback.line.me/enquete/public/16977-STbvntks" target="blank">ลงทะเบียนเพื่อเปิดใช้งาน API กับร้านของคุณได้ที่นี่</a> หรือ <a href="https://oaplus.line.biz/information/api-doc">ศึกษา API Document ได้ที่นี่ครับ</a>
<br /><b>ขอบคุณที่มาเยี่ยมชมครับ</b>
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
        code: this.coupon
      }).then(result => {
        this.isLoading = false
        if (result.data.result === 'pass') {
          this.$swal({
            icon: 'success',
            title: 'Successful!',
            html: `
            Quota: ${result.data.quota}, Available: ${result.data.available}<br />
            <span style="color:green;font-weight:bold;">ยื่นจอนี้ให้ทีมงานที่บูธเพื่อรับคะแนนได้เลย</span>
            `,
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
<style scoped>
.mobile {
  max-width:720px;
}
</style>
