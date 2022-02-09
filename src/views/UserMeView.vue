<template lang="pug">
form.border.rounded.bg-white.overflow-hidden(@submit.prevent="updateProfile")
  .flex.flex-col.max-w-xs.mx-auto
    .text-xl.py-4 Update Profile
    label.mb-2(for="profile-displayName") Display Name :
    input.mb-4.border.rounded.py-1.px-2(type="text" name="username" id="profile-displayName" v-model="displayName")
  .bg-gray-50.py-2.px-4
    .flex.items-baseline.max-w-xs.mx-auto
      .flex-grow
      button.py-1.px-2.border.rounded.bg-white(type="submit") Update
form.border.rounded.bg-white.overflow-hidden(@submit.prevent="updateAuthEmail")
  .flex.flex-col.max-w-xs.mx-auto
    .text-xl.py-4 Update Email
    label.mb-2(for="auth-email") Email :
    input.mb-4.border.rounded.py-1.px-2(type="email" name="email" id="auth-email" v-model="email")
  .bg-gray-50.py-2.px-4
    .flex.items-baseline.max-w-xs.mx-auto
      .flex-grow
      button.py-1.px-2.border.rounded.bg-white(type="submit") Update
form.border.rounded.bg-white.overflow-hidden(@submit.prevent="updateAuthPassword")
  .flex.flex-col.max-w-xs.mx-auto
    .text-xl.py-4 Update Password
    label.mb-2(for="auth-password") Password :
    input.mb-4.border.rounded.py-1.px-2(type="password" name="password" id="auth-password" v-model="password")
  .bg-gray-50.py-2.px-4
    .flex.items-baseline.max-w-xs.mx-auto
      .flex-grow
      button.py-1.px-2.border.rounded.bg-white(type="submit") Update
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
