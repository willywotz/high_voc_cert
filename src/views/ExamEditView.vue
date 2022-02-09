<template lang="pug">
form.border.rounded.bg-white(@submit.prevent="updateExam($route.params.id)")
  .flex.flex-col.p-4.space-y-4
    .text-xl แก้ไขข้อสอบ
    .flex.items-baseline.border.rounded.divide-x.overflow-hidden
      label.block.py-1.px-3.bg-gray-50(for="exam-title") เรื่อง
      input.py-1.px-2.outline-none.flex-grow(type="text" name="title" id="exam-title" v-model="exam.title")
    .flex.flex-col.border.rounded.divide-y.overflow-hidden(v-for="(question, index) in exam.questions" :key="index")
      .flex.divide-x
        label.py-1.px-3.bg-gray-50(:for="`question-${index}-title`") คำถาม
        input.py-1.px-2.outline-none.flex-grow(type="text" :id="`question-${index}-title`" v-model="exam.questions[index].title")
      .flex.divide-x(v-for="(answer, answer_index) in question.answers" :key="answer_index")
        label.py-1.px-3.bg-gray-50(:for="`question-${index}-${answer_index}`") คำตอบที่ {{ answer_index + 1 }}
        input.py-1.px-2.outline-none.flex-grow(type="text" :id="`question-${index}-${answer_index}`" v-model="exam.questions[index].answers[answer_index]")
        button.py-1.px-3.bg-gray-50(@click.prevent="correctAnswer(index, answer_index)") {{ question.correctAnswer === answer_index ? 'ถูก' : 'ผิด' }}
        button.py-1.px-3.bg-gray-50(@click.prevent="delAnswer(index, answer_index)") ลบ
      .flex.divide-x
        .flex-grow
        button.py-1.px-3.bg-gray-50(@click.prevent="addAnswer(index)") เพิ่มคำตอบ
        button.py-1.px-3.bg-gray-50(@click.prevent="delQuestion(index)") ลบคำถาม
  .bg-gray-50.py-2.px-4.flex.space-x-2
    .flex-grow
    button.py-1.px-2.border.rounded.bg-white(@click.prevent="addQuestion") เพิ่มคำถาม
    button.py-1.px-2.border.rounded.bg-white(type="submit") แก้ไข
</template>

<script>
import { mapState } from 'vuex'
import { getFirestore, doc, setDoc, getDoc } from '@firebase/firestore'

export default {
  name: 'exam-new',
  data () {
    return {
      exam: {
        title: '',
        questions: [],
        meta: {
          owner: '',
          createdAt: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    addQuestion () {
      const data = { title: '', answers: [''], correctAnswer: 0 }
      this.exam.questions.push(data)
    },
    addAnswer (index) {
      this.exam.questions[index].answers.push('')
    },
    delAnswer (index, answer_index) {
      this.exam.questions[index].answers.splice(answer_index, 1)
    },
    delQuestion (index) {
      this.exam.questions.splice(index, 1)
    },
    correctAnswer (index, answer_index) {
      this.exam.questions[index].correctAnswer = answer_index
    },
    updateExam (id) {
      return setDoc(doc(getFirestore(), 'exams', id), this.exam)
        .then(() => this.$router.push('/my-exam'))
        .catch(e => alert(e))
    },
    fetchExam (id) {
      return getDoc(doc(getFirestore(), 'exams', id))
        .then(snapshot => snapshot.data())
        .catch(e => alert(e))
    }
  },
  mounted () {
    this.fetchExam(this.$route.params.id)
      .then(data => { this.exam = Object.assign({}, this.exam, data) })
  }
}
</script>
