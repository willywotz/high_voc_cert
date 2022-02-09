<template lang="pug">
.bg-white.overflow-hidden.divide-y(class="sm:border sm:rounded")
  .text-xl.py-2.px-4.bg-gray-50 ปรับปรุงโปรไฟล์
  form.p-4(@submit.prevent="updateProfile")
    .flex.border.rounded.divide-x
      label.py-1.px-2.bg-gray-100(for="profile-displayName") ชื่อผู้ใช้งาน
      input.py-1.px-2.flex-grow.outline-none(type="text" id="profile-displayName" v-model="displayName")
      button.py-1.px-2(class="hover:bg-gray-50" type="submit") ปรับปรุง
  form.p-4(@submit.prevent="updateAuthEmail")
    .flex.border.rounded.divide-x
      label.py-1.px-2.bg-gray-100(for="profile-email") อีเมล
      input.py-1.px-2.flex-grow.outline-none(type="email" id="profile-email" v-model="email")
      button.py-1.px-2(class="hover:bg-gray-50" type="submit") ปรับปรุง
  form.p-4(@submit.prevent="updateAuthPassword")
    .flex.border.rounded.divide-x
      label.py-1.px-2.bg-gray-100(for="profile-password") รหัสผ่าน
      input.py-1.px-2.flex-grow.outline-none(type="password" id="profile-password" v-model="password")
      button.py-1.px-2(class="hover:bg-gray-50" type="submit") ปรับปรุง
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { updateProfile, updateEmail, updatePassword, signOut, getAuth } from '@firebase/auth'
import { getFirestore, doc, setDoc } from '@firebase/firestore'

export default {
  name: 'user-me-view',
  data () {
    return { displayName: '', email: '', password: '' }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUserDisplayName']),

    updateProfile () {
      const userProfile = { displayName: this.displayName }
      const ref = doc(getFirestore(), 'users', this.user.uid)
      return updateProfile(getAuth().currentUser, userProfile)
        .then(() => setDoc(ref, userProfile))
        .then(() => this.setUserDisplayName(this.displayName))
        .then(() => alert('เรียบร้อย'))
        .catch(e => alert(e))
    },
    updateAuthEmail () {
      return updateEmail(getAuth().currentUser, this.email)
        .then(() => signOut(getAuth()))
        .catch(e => alert(e))
    },
    updateAuthPassword () {
      return updatePassword(getAuth().currentUser, this.password)
        .then(() => signOut(getAuth()))
        .catch(e => alert(e))
    }
  },
  beforeMount () {
    this.displayName = this.user?.displayName
    this.email = this.user?.email
  }
}
</script>
