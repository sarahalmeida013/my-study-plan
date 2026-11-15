<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/components'
import { SUBJECT_TITLE_MAX_LENGTH, validateSubjectTitle } from '../study-plan.rules'
import type { CreateSubjectInput } from '../study-plan.types'

defineProps<{
  submissionError: string | null
}>()

const emit = defineEmits<{
  submit: [input: CreateSubjectInput]
  cancel: []
}>()

const form = ref<InstanceType<typeof VForm> | null>(null)

const title = ref('')
const description = ref('')

const titleRules = [(value: string) => validateSubjectTitle(value) ?? true]

async function handleSubmit() {
  if (!form.value) {
    return
  }

  const { valid } = await form.value.validate()

  if (!valid) {
    return
  }

  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
  })
}
</script>

<template>
  <v-form ref="form" validate-on="submit" @submit.prevent="handleSubmit">
    <v-card-text class="pt-2">
      <v-text-field
        v-model="title"
        label="Título"
        placeholder="Ex.: Álgebra linear"
        :rules="titleRules"
        :maxlength="SUBJECT_TITLE_MAX_LENGTH"
        :counter="SUBJECT_TITLE_MAX_LENGTH"
        autofocus
        required
      />

      <v-textarea
        v-model="description"
        label="Descrição (opcional)"
        placeholder="Tópicos, materiais, objetivos..."
        rows="3"
        auto-grow
        hide-details
        class="mt-3"
      />

      <v-alert v-if="submissionError" type="error" variant="tonal" class="mt-4" role="alert">
        {{ submissionError }}
      </v-alert>
    </v-card-text>

    <v-card-actions class="px-6 pb-6">
      <v-spacer />

      <v-btn type="button" variant="text" @click="emit('cancel')"> Cancelar </v-btn>

      <v-btn type="submit" color="primary" variant="flat"> Cadastrar </v-btn>
    </v-card-actions>
  </v-form>
</template>
