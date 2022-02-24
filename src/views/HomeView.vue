<template lang="pug">
.space-y-4
  div ข้อสอบแนะนำ

  .divide-y.border.rounded
    router-link.block.py-2.px-4(
      v-for="(exam, index) in exams"
      :key="index"
      class="hover:bg-gray-50"
      :to="`/exam/${exam.id}/do`"
    ) {{ exam.title }}
    .py-2.px-4(v-if="!exams.length") ไม่มีข้อสอบในระบบ

  .flex
    .flex-grow
    router-link.py-1.px-2.border.rounded(class="hover:bg-blue-50" to="/exam") ข้อสอบทั้งหมด
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
