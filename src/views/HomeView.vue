<template lang="pug">
.bg-white.divide-y(class="sm:border sm:rounded")
  .py-3.px-4.bg-gray-50.text-xl ข้อสอบแนะนำ
  router-link.block.py-2.px-4(
    class="hover:bg-gray-50"
    v-for="exam in exams"
    :key="exam.id"
    :to="`/exam/${exam.id}/do`"
  ) {{ exam.title }}
  .p-4(v-if="!exams") ไม่มีข้อสอบในระบบ
  .py-2.px-4.bg-gray-50.flex
    .flex-grow
    router-link.py-1.px-2.bg-white.border.rounded(to="/exam") ข้อสอบทั้งหมด
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  limit,
  getDocs
} from '@firebase/firestore'

export default {
  name: 'home-view',
  data () {
    return { exams: [] }
  },
  created () {
    const examsRef = collection(getFirestore(), 'exams')
    return getDocs(query(examsRef, limit(10)))
      .then(snap => snap.forEach(doc => {
        this.exams.push({ id: doc.id, ...doc.data() })
      }))
      .catch(e => alert(e))
  }
}
</script>
