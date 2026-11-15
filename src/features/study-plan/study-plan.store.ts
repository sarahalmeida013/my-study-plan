import { ref } from 'vue'
import { defineStore } from 'pinia'
import { validateSubjectTitle } from './study-plan.rules'
import { SubjectStatus, type CreateSubjectInput, type Subject } from './study-plan.types'

type CreateSubjectResult = { success: true } | { success: false; error: string }

export const useStudyPlanStore = defineStore('study-plan', () => {
  const subjects = ref<Subject[]>([])

  function addSubject(input: CreateSubjectInput): CreateSubjectResult {
    const error = validateSubjectTitle(input.title)

    if (error) {
      return { success: false, error }
    }

    subjects.value.push({
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description.trim(),
      status: SubjectStatus.Planned,
    })

    return { success: true }
  }

  return {
    subjects,
    addSubject,
  }
})
