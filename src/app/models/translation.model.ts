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
  footer: {
    imprint: string;
    dataPrivacy: string;
    wantPremium: string;
  };
  modal: {
    close: string;
    imprint: {
      title: string;
      content: string;
      contact: string;
      email: string;
    };
    privacy: {
      title: string;
      intro: string;
      dataCollection: {
        title: string;
        content: string;
      };
      localStorage: {
        title: string;
        content: string;
      };
      noTracking: {
        title: string;
        content: string;
      };
    };
    premium: {
      title: string;
      intro: string;
      themes: {
        title: string;
        description: string;
      };
      sync: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
      cta: string;
      form: {
        title: string;
        description: string;
        optional: string;
        email: {
          label: string;
          placeholder: string;
        };
        suggestions: {
          label: string;
          placeholder: string;
        };
        terms: {
          prefix: string;
          link: string;
          suffix: string;
          content: string;
        };
        submit: string;
        submitting: string;
        success: string;
        error: string;
      };
    };
  };
}

export type SupportedLanguage = 'en' | 'de';