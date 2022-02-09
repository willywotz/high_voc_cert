<template lang="pug">
form.border.rounded.bg-white.overflow-hidden(@submit.prevent="signUp")
  .flex.flex-col.max-w-xs.mx-auto
    .text-xl.py-4 สมัครสมาชิกเข้าเว็บไซต์
    label.mb-2(for="signUp-email") อีเมล :
    input.mb-4.border.rounded.py-1.px-2(type="email" name="email" id="signUp-email" v-model="email" required)
    label.mb-2(for="signUp-password") รหัสผ่าน :
    input.mb-4.border.rounded.py-1.px-2(type="password" name="password" id="signUp-password" v-model="password" required)
  .bg-gray-50.py-2.px-4
    .flex.items-baseline.max-w-xs.mx-auto
      router-link(to="/auth/login") เข้าสู่ระบบ
      .flex-grow
      button.py-1.px-2.border.rounded.bg-white(type="submit") สมัครสมาชิก
</template>

<script>
import { mapState } from 'vuex'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth'
import { getFirestore, collection, doc, setDoc, getDocs } from '@firebase/firestore'

export default {
  name: 'auth-register',
  data () {
    return { email: '', password: '' }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    signUp () {
      const userProfile = { displayName: this.email.split('@')[0] }
      return getDocs(collection(getFirestore(), 'users'))
        .then(snap => snap.empty && (userProfile.isAdmin = true))
        .then(() => createUserWithEmailAndPassword(getAuth(), this.email, this.password))
        .then(({ user }) => updateProfile(user, userProfile).then(() => ({ user })))
        .then(({ user }) => setDoc(doc(getFirestore(), 'users', user.uid), userProfile))
        .catch(e => alert(e))
    }
  },
  beforeMount () {
    this.user && this.$router.push('/')
  }
}
</script>
