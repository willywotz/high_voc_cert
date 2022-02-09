<template lang="pug">
form.border.rounded.bg-white.overflow-hidden(@submit.prevent="signIn")
  .flex.flex-col.max-w-xs.mx-auto
    .text-xl.py-4 เข้าระบบสู่เว็บไซต์
    label.mb-2(for="signIn-email") อีเมล :
    input.mb-4.border.rounded.py-1.px-2(type="email" name="email" id="signIn-email" v-model="email" required)
    label.mb-2(for="signIn-password") รหัสผ่าน :
    input.mb-4.border.rounded.py-1.px-2(type="password" name="password" id="signIn-password" v-model="password" required)
  .bg-gray-50.py-2.px-4
    .flex.items-baseline.max-w-xs.mx-auto
      router-link(to="/auth/register") สมัครสมาชิก
      .flex-grow
      button.py-1.px-2.border.rounded.bg-white(type="submit") เข้าระบบสู่ระบบ
</template>

<script>
import { mapState } from 'vuex'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'

export default {
  name: 'auth-login',
  data () {
    return { email: '', password: '' }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    signIn () {
      return signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .catch(e => alert(e))
    }
  },
  beforeMount () {
    this.user && this.$router.push('/')
  }
}
</script>
