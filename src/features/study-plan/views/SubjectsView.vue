<script setup lang="ts">
import { computed, ref } from 'vue'
import SubjectForm from '../components/SubjectForm.vue'
import SubjectList from '../components/SubjectList.vue'
import { useStudyPlanStore } from '../study-plan.store'
import type { CreateSubjectInput, SubjectStatus } from '../study-plan.types'

type SubjectFilter = 'all' | SubjectStatus

const store = useStudyPlanStore()

const selectedFilter = ref<SubjectFilter>('all')
const isDialogOpen = ref(false)
const submissionError = ref<string | null>(null)

const formKey = ref(0)

const isSnackbarOpen = ref(false)
const successMessage = ref('')

const filters: { value: SubjectFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'planned', label: 'Planejado' },
  { value: 'in-progress', label: 'Em andamento' },
  { value: 'completed', label: 'Concluído' },
]

const counts = computed<Record<SubjectFilter, number>>(() => {
  const result: Record<SubjectFilter, number> = {
    all: store.subjects.length,
    planned: 0,
    'in-progress': 0,
    completed: 0,
  }

  for (const subject of store.subjects) {
    result[subject.status] += 1
  }

  return result
})

const filteredSubjects = computed(() => {
  if (selectedFilter.value === 'all') {
    return store.subjects
  }

  return store.subjects.filter((subject) => subject.status === selectedFilter.value)
})

function prepareForm() {
  submissionError.value = null
  formKey.value += 1
}

function closeDialog() {
  isDialogOpen.value = false
}

function handleCreateSubject(input: CreateSubjectInput) {
  const result = store.addSubject(input)

  if (!result.success) {
    submissionError.value = result.error
    return
  }

  selectedFilter.value = 'all'
  closeDialog()

  successMessage.value = `Assunto “${input.title}” cadastrado.`
  isSnackbarOpen.value = true
}
</script>

<template>
  <v-container class="py-6 py-sm-10">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-row align="center" class="mb-6">
          <v-col cols="12" sm="8">
            <h1 class="text-h4 font-weight-bold">Assuntos</h1>

            <p class="text-body-1 text-medium-emphasis mt-2">
              {{
                store.subjects.length === 0
                  ? 'Comece cadastrando o primeiro assunto.'
                  : 'Organize os assuntos que você quer estudar.'
              }}
            </p>
          </v-col>

          <v-col cols="12" sm="4" class="d-flex justify-sm-end">
            <v-dialog
              v-model="isDialogOpen"
              max-width="512"
              aria-labelledby="new-subject-title"
              aria-describedby="new-subject-description"
            >
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  color="primary"
                  variant="flat"
                  prepend-icon="mdi-plus"
                  size="large"
                  class="flex-grow-1 flex-sm-grow-0"
                  @click="prepareForm"
                >
                  Novo assunto
                </v-btn>
              </template>

              <v-card rounded="lg">
                <v-card-title class="d-flex align-center px-6 pt-5">
                  <h2 id="new-subject-title" class="text-h5 font-weight-bold">Novo assunto</h2>

                  <v-spacer />

                  <v-btn
                    icon="mdi-close"
                    variant="text"
                    size="small"
                    aria-label="Fechar cadastro de assunto"
                    @click="closeDialog"
                  />
                </v-card-title>

                <v-card-text class="px-6 pt-0 pb-4">
                  <p id="new-subject-description" class="text-body-2 text-medium-emphasis">
                    Dê um nome ao assunto e, se quiser, descreva o que estudar.
                  </p>
                </v-card-text>

                <SubjectForm
                  :key="formKey"
                  :submission-error="submissionError"
                  @submit="handleCreateSubject"
                  @cancel="closeDialog"
                />
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <div
          class="d-flex flex-wrap ga-2 mb-8"
          role="group"
          aria-label="Filtrar assuntos por status"
        >
          <v-btn
            v-for="filter in filters"
            :key="filter.value"
            :variant="selectedFilter === filter.value ? 'flat' : 'outlined'"
            :color="selectedFilter === filter.value ? 'primary' : undefined"
            :aria-pressed="selectedFilter === filter.value"
            rounded="pill"
            size="small"
            @click="selectedFilter = filter.value"
          >
            {{ filter.label }}

            <span class="ml-2">
              {{ counts[filter.value] }}
            </span>
          </v-btn>
        </div>

        <SubjectList :subjects="filteredSubjects" :has-subjects="store.subjects.length > 0" />
      </v-col>
    </v-row>

    <v-snackbar v-model="isSnackbarOpen" color="primary" :timeout="3000">
      <span role="status">
        {{ successMessage }}
      </span>

      <template #actions>
        <v-btn variant="text" @click="isSnackbarOpen = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
