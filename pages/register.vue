<template>
  <main>
    <!-- Title -->
    <h1>Register</h1>

    <!-- Register Form -->
    <form @submit.prevent="register()" class="notice">
      <!-- Email & Password Inputs -->
      <div>
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Enter your email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Enter your password" />
      </div>

      <!-- Errors -->
      <div v-if="errors">
        <code>{{ errors }}</code>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading">Register</button>
    </form>

    <!-- Link to Login -->
    <NuxtLink to="/login">Login</NuxtLink>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'not-auth' })

const email = ref('')
const password = ref('')
const errors = ref('')
const loading = ref(false)

async function register() {
  loading.value = true
  errors.value = ''
  try {
    await useAuthRegister(email.value, password.value)
    navigateTo('/dashboard')
  } catch (error: any) {
    errors.value = error.statusMessage
  }
  loading.value = false
}
</script>
