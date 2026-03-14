<script setup lang="ts">
import { createHttpClient } from '@alvis/http'

const test = createHttpClient({
  baseURL: 'http://httpbin.org/',
  timeout: 1000
})

test.get('get').then(
  res => console.log(res, 'res'),
  err => console.log(err, 'err')
)
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit
    <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a>
    to read the documentation
  </p>
</template>

<style scoped></style>
