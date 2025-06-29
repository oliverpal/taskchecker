import { Translations } from '../models/translation.model';

export const enTranslations: Translations = {
  app: {
    title: 'Yet another Todo List',
    subtitle:
      'This app is free, open source, and runs entirely in your browser. No data is sent to servers. All tasks are stored locally.',
  },
  progress: {
    tasksCompleted: 'tasks completed',
  },
  completion: {
    title: 'Well done, you completed all your tasks!',
    message: "You're crushing it today! Time to celebrate your success.",
  },
  addTask: {
    placeholder: 'What do you want to accomplish today?',
    button: 'Add Task',
  },
  emptyState: {
    title: 'No tasks yet!',
    message: 'Add your first task above to get started on your productive day.',
  },
  actions: {
    clearAll: 'Clear All Tasks',
    clearAllConfirm:
      'Are you sure you want to clear all tasks? This will empty your localStorage.',
    deleteTask: 'Delete task',
    editTask: 'Click to edit task',
  },
  language: {
    switch: 'Language',
    english: 'English',
    german: 'Deutsch',
  },
  footer: {
    imprint: 'Imprint',
    dataPrivacy: 'Data Privacy',
    wantPremium: 'Want Premium?',
  },
  modal: {
    close: 'Close',
    imprint: {
      title: 'Imprint',
      content:
        'Task Checker is a simple, privacy-focused todo application built for productivity enthusiasts. This app runs entirely in your browser and stores data locally.',
      contact: 'Contact Information:',
      email: 'Email: hello@taskchecker.app',
    },
    privacy: {
      title: 'Data Privacy',
      intro:
        'Your privacy is important to us. This policy explains how Task Checker handles your data.',
      dataCollection: {
        title: 'Data Collection',
        content:
          'We do not collect, store, or transmit any personal data to external servers. All your task data remains on your device.',
      },
      localStorage: {
        title: 'Local Storage',
        content:
          'Your tasks and preferences are stored locally in your browser using localStorage. This data never leaves your device unless you explicitly export it.',
      },
      noTracking: {
        title: 'No Tracking',
        content:
          'We do not use cookies, analytics, or any tracking technologies. Your usage of this app is completely private.',
      },
    },
    premium: {
      title: 'Upgrade to Premium',
      intro:
        'Unlock advanced features to supercharge your productivity with Task Checker Premium.',
      themes: {
        title: 'Custom Themes',
        description:
          'Personalize your experience with beautiful dark mode, light themes, and seasonal designs.',
      },
      sync: {
        title: 'Cloud Sync',
        description:
          'Access your tasks across all devices with secure cloud synchronization and backup.',
      },
      analytics: {
        title: 'Productivity Analytics',
        description:
          'Track your productivity patterns with detailed insights and completion statistics.',
      },
      cta: 'Get Premium - $2.99/month',
      form: {
        title: 'Share Your Feedback',
        description:
          'Help us build the features you want most. Your input shapes our roadmap!',
        optional: 'optional',
        email: {
          label: 'Email Address',
          placeholder: 'your@email.com',
        },
        suggestions: {
          label: 'Feature Suggestions & Wishes',
          placeholder:
            'Tell us what features would make Task Checker perfect for you...',
        },
        terms: {
          prefix: 'I agree to the',
          link: 'Terms and Conditions',
          suffix: 'and Privacy Policy',
          content:
            'By submitting this form, you agree to our Terms and Conditions and Privacy Policy. We will only use your email to follow up on your suggestions and notify you about premium features.',
        },
        submit: 'Share Feedback & Get Notified',
        submitting: 'Submitting...',
        success:
          "Thank you! We'll review your feedback and get back to you soon.",
        error: 'Something went wrong. Please try again later.',
      },
    },
  },
};
