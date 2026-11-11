export enum SubjectStatus {
  Planned = 'planned',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export interface Subject {
  id: string
  title: string
  description: string
  status: SubjectStatus
}

export type CreateSubjectInput = Pick<Subject, 'title' | 'description'>
