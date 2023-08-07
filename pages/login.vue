<template>
  <main>
    <!-- Title -->
    <h1>Login</h1>

    <!-- Login Form -->
    <form @submit.prevent="login()" class="notice">
      <!-- Email & Password Inputs-->
      <div>
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Enter your email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Enter a password" />
      </div>

      <!-- Errors -->
      <div v-if="errors">
        <code>{{ errors }}</code>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading">Login</button>
    </form>

    <!-- Link to Register-->
    <NuxtLink to="/register">Register</NuxtLink>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'not-auth' })

const email = ref('')
const password = ref('')
const errors = ref('')
const loading = ref(false)

async function login() {
  errors.value = ''
  loading.value = true
  try {
    await useAuthLogin(email.value, password.value)
    navigateTo('/dashboard')
  } catch (error: any) {
    errors.value = error.statusMessage
  }
  loading.value = false
}
</script>
