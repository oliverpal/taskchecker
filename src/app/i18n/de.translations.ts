import { Translations } from '../models/translation.model';

export const deTranslations: Translations = {
  app: {
    title: 'Aufgaben Checker',
    subtitle: 'Bleib motiviert und verfolge deinen Fortschritt'
  },
  progress: {
    tasksCompleted: 'Aufgaben erledigt'
  },
  completion: {
    title: 'Gut gemacht, du hast alle Aufgaben erledigt!',
    message: 'Du rockst es heute! Zeit, deinen Erfolg zu feiern.'
  },
  addTask: {
    placeholder: 'Was möchtest du heute erreichen?',
    button: 'Aufgabe hinzufügen'
  },
  emptyState: {
    title: 'Noch keine Aufgaben!',
    message: 'Füge deine erste Aufgabe hinzu, um mit deinem produktiven Tag zu beginnen.'
  },
  actions: {
    clearAll: 'Alle Aufgaben löschen',
    clearAllConfirm: 'Bist du sicher, dass du alle Aufgaben löschen möchtest? Dies leert deinen localStorage.',
    deleteTask: 'Aufgabe löschen',
    editTask: 'Klicken zum Bearbeiten'
  },
  language: {
    switch: 'Sprache',
    english: 'English',
    german: 'Deutsch'
  }
};