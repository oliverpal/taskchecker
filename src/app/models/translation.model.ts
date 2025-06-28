export interface Translations {
  app: {
    title: string;
    subtitle: string;
  };
  progress: {
    tasksCompleted: string;
  };
  completion: {
    title: string;
    message: string;
  };
  addTask: {
    placeholder: string;
    button: string;
  };
  emptyState: {
    title: string;
    message: string;
  };
  actions: {
    clearAll: string;
    clearAllConfirm: string;
    deleteTask: string;
    editTask: string;
  };
  language: {
    switch: string;
    english: string;
    german: string;
  };
}

export type SupportedLanguage = 'en' | 'de';