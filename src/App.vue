<script setup lang="ts">
import SubjectsView from './features/study-plan/views/SubjectsView.vue'
</script>

<template>
  <v-app>
    <v-app-bar flat border color="background">
      <v-container class="header-container d-flex align-center">
        <v-avatar color="primary" rounded="lg" size="34" class="mr-3">
          <v-icon icon="mdi-book-open-page-variant-outline" />
        </v-avatar>

        <span class="brand"> Meu Plano de Estudos </span>

        <v-spacer />

        <v-chip color="primary" variant="tonal"> Assuntos </v-chip>
      </v-container>
    </v-app-bar>

    <v-main class="app-background">
      <SubjectsView />
    </v-main>
  </v-app>
</template>
