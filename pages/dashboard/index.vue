<template>
  <!-- Title -->
  <h1>Dashboard</h1>

  <!-- Loading Text -->
  <p v-if="loading">loading...</p>

  <!-- User Data -->
  <p v-else>
    Welcome <strong>{{ user?.name || user?.email }}</strong> - how is it in <em>{{ user?.timezone }}</em> today?
  </p>

  <!-- Logout Button -->
  <button @click="useAuthLogout()">Logout</button>
</template>

<script setup lang="ts">
import { User } from '@/types/user'

definePageMeta({ middleware: 'auth', layout: 'dashboard' })

const user = ref<User | null>(null)
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  user.value = await useAuthUser()
  loading.value = false
})
</script>
