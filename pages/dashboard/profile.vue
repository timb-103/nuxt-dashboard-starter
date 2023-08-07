<template>
  <!-- Title -->
  <h1>Profile</h1>

  <!-- Update Profile Form -->
  <form class="notice" @submit.prevent="save()">
    <div>
      <label>Email</label>
      <input type="text" v-model="email" placeholder="Enter your email" />
    </div>
    <div>
      <label>Name</label>
      <input type="text" v-model="name" placeholder="Enter your name" />
    </div>

    <!-- Errors -->
    <div v-if="errors">
      <code>{{ errors }}</code>
    </div>

    <!-- Submit Button -->
    <button type="submit" :disabled="loading">Save Changes</button>
  </form>
</template>

<script setup lang="ts">
import { User } from '@/types/user'

definePageMeta({ middleware: 'auth', layout: 'dashboard' })

const errors = ref('')
const loading = ref(true)
const name = ref('')
const email = ref('')

async function save() {
  loading.value = true
  errors.value = ''
  try {
    await $fetch('/api/user/update', {
      method: 'POST',
      body: {
        email: email.value,
        name: name.value,
      },
    })
  } catch (error: any) {
    errors.value = error.statusMessage || error.message
  }
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  const user: User = await useAuthUser()
  email.value = user?.email || ''
  name.value = user?.name || ''
  loading.value = false
})
</script>
