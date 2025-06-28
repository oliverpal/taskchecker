import { Translations } from '../models/translation.model';

export const enTranslations: Translations = {
  app: {
    title: 'Task Checker',
    subtitle: 'Stay motivated and track your progress'
  },
  progress: {
    tasksCompleted: 'tasks completed'
  },
  completion: {
    title: 'Well done, you completed all your tasks!',
    message: 'You\'re crushing it today! Time to celebrate your success.'
  },
  addTask: {
    placeholder: 'What do you want to accomplish today?',
    button: 'Add Task'
  },
  emptyState: {
    title: 'No tasks yet!',
    message: 'Add your first task above to get started on your productive day.'
  },
  actions: {
    clearAll: 'Clear All Tasks',
    clearAllConfirm: 'Are you sure you want to clear all tasks? This will empty your localStorage.',
    deleteTask: 'Delete task',
    editTask: 'Click to edit task'
  },
  language: {
    switch: 'Language',
    english: 'English',
    german: 'Deutsch'
  }
};