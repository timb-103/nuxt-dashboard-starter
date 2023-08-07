<template>
  <main>
    <header>
      <nav>
        <!-- Nav Links -->
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/dashboard/profile">Profile</NuxtLink>
        |
        <!-- Logout Button -->
        <NuxtLink @click.prevent="useAuthLogout()">Logout</NuxtLink>
      </nav>
    </header>
    <slot></slot>
  </main>
</template>
