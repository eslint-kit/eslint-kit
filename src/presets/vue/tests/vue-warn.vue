<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.info(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button ref="meow" id="hello" @click="increment">Count is: {{ count }}</button>
</template>