export const SUBJECT_TITLE_MAX_LENGTH = 100

export function validateSubjectTitle(title: string): string | null {
  const normalizedTitle = title.trim()

  if (!normalizedTitle) {
    return 'Informe o título do assunto.'
  }

  if (normalizedTitle.length > SUBJECT_TITLE_MAX_LENGTH) {
    return `O título deve ter até ${SUBJECT_TITLE_MAX_LENGTH} caracteres.`
  }

  return null
}
