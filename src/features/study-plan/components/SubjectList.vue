<script setup lang="ts">
import type { Subject, SubjectStatus } from '../study-plan.types'

defineProps<{
  subjects: Subject[]
  hasSubjects: boolean
}>()

const statusLabels: Record<SubjectStatus, string> = {
  planned: 'Planejado',
  'in-progress': 'Em andamento',
  completed: 'Concluído',
}

const statusColors: Record<SubjectStatus, string> = {
  planned: 'warning',
  'in-progress': 'info',
  completed: 'primary',
}
</script>

<template>
  <v-card v-if="subjects.length === 0" class="empty-state pa-8 text-center">
    <v-icon icon="mdi-book-outline" size="36" color="primary" aria-hidden="true" />

    <h2 class="section-title mt-4">
      {{ hasSubjects ? 'Nenhum assunto neste filtro' : 'Nenhum assunto ainda' }}
    </h2>

    <p class="text-body-2 text-medium-emphasis mt-2">
      {{
        hasSubjects
          ? 'Selecione outro status para ver seus assuntos.'
          : 'Use o botão “Novo assunto” para começar.'
      }}
    </p>
  </v-card>

  <v-row v-else tag="ul" class="subject-list" aria-label="Assuntos cadastrados">
    <v-col v-for="subject in subjects" :key="subject.id" tag="li" cols="12" sm="6" md="4">
      <v-card border class="h-100">
        <v-card-text>
          <v-chip :color="statusColors[subject.status]" size="small" variant="tonal">
            {{ statusLabels[subject.status] }}
          </v-chip>

          <h2 class="section-title subject-title mt-4">
            {{ subject.title }}
          </h2>

          <p
            v-if="subject.description"
            class="subject-description text-body-2 text-medium-emphasis mt-3"
          >
            {{ subject.description }}
          </p>

          <p v-else class="text-body-2 text-medium-emphasis mt-3">Sem descrição.</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
