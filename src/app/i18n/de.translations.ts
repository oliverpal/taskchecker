import { Translations } from '../models/translation.model';

export const deTranslations: Translations = {
  app: {
    title: 'Task Checker - Schöne Todo-Liste & Aufgaben-Manager',
    subtitle: 'Bleiben Sie produktiv und organisiert mit unserer kostenlosen mehrsprachigen Todo-App. Verfolgen Sie Ihren Fortschritt, verwalten Sie Aufgaben effizient und steigern Sie Ihre Produktivität.',
  },
  progress: {
    tasksCompleted: 'Aufgaben erledigt',
  },
  completion: {
    title: 'Gut gemacht, du hast alle Aufgaben erledigt!',
    message: 'Du rockst es heute! Zeit, deinen Erfolg zu feiern.',
  },
  addTask: {
    placeholder: 'Was möchtest du heute erreichen?',
    button: 'Aufgabe hinzufügen',
  },
  emptyState: {
    title: 'Noch keine Aufgaben!',
    message:
      'Füge deine erste Aufgabe hinzu, um mit deinem produktiven Tag zu beginnen.',
  },
  actions: {
    clearAll: 'Alle Aufgaben löschen',
    clearAllConfirm:
      'Bist du sicher, dass du alle Aufgaben löschen möchtest? Dies leert deinen localStorage.',
    deleteTask: 'Aufgabe löschen',
    editTask: 'Klicken zum Bearbeiten',
  },
  language: {
    switch: 'Sprache',
    english: 'English',
    german: 'Deutsch',
  },
  footer: {
    imprint: 'Impressum',
    dataPrivacy: 'Datenschutz',
    wantPremium: 'Premium gewünscht?',
  },
  modal: {
    close: 'Schließen',
    imprint: {
      title: 'Impressum',
      content: 'Task Checker ist eine einfache, datenschutzfreundliche Todo-Anwendung für Produktivitäts-Enthusiasten. Diese App läuft vollständig in Ihrem Browser und speichert Daten lokal.',
      contact: 'Kontaktinformationen:',
      email: 'E-Mail: hello@taskchecker.app',
    },
    privacy: {
      title: 'Datenschutz',
      intro: 'Ihr Datenschutz ist uns wichtig. Diese Richtlinie erklärt, wie Task Checker mit Ihren Daten umgeht.',
      dataCollection: {
        title: 'Datenerfassung',
        content: 'Wir sammeln, speichern oder übertragen keine persönlichen Daten an externe Server. Alle Ihre Aufgabendaten bleiben auf Ihrem Gerät.',
      },
      localStorage: {
        title: 'Lokale Speicherung',
        content: 'Ihre Aufgaben und Einstellungen werden lokal in Ihrem Browser mit localStorage gespeichert. Diese Daten verlassen niemals Ihr Gerät, es sei denn, Sie exportieren sie explizit.',
      },
      noTracking: {
        title: 'Kein Tracking',
        content: 'Wir verwenden keine Cookies, Analytics oder Tracking-Technologien. Ihre Nutzung dieser App ist vollständig privat.',
      },
    },
    premium: {
      title: 'Auf Premium upgraden',
      intro: 'Schalten Sie erweiterte Funktionen frei, um Ihre Produktivität mit Task Checker Premium zu steigern.',
      themes: {
        title: 'Eigene Themes',
        description: 'Personalisieren Sie Ihr Erlebnis mit schönen Dark Mode, hellen Themes und saisonalen Designs.',
      },
      sync: {
        title: 'Cloud-Synchronisation',
        description: 'Greifen Sie auf Ihre Aufgaben auf allen Geräten mit sicherer Cloud-Synchronisation und Backup zu.',
      },
      analytics: {
        title: 'Produktivitäts-Analytics',
        description: 'Verfolgen Sie Ihre Produktivitätsmuster mit detaillierten Einblicken und Abschlussstatistiken.',
      },
      cta: 'Premium holen - 2,99€/Monat',
      form: {
        title: 'Teilen Sie Ihr Feedback',
        description: 'Helfen Sie uns dabei, die Funktionen zu entwickeln, die Sie am meisten wünschen. Ihr Input prägt unsere Roadmap!',
        optional: 'optional',
        email: {
          label: 'E-Mail-Adresse',
          placeholder: 'ihre@email.de'
        },
        suggestions: {
          label: 'Funktionsvorschläge & Wünsche',
          placeholder: 'Sagen Sie uns, welche Funktionen Task Checker perfekt für Sie machen würden...'
        },
        terms: {
          prefix: 'Ich stimme den',
          link: 'Allgemeinen Geschäftsbedingungen',
          suffix: 'und der Datenschutzerklärung zu',
          content: 'Durch das Absenden dieses Formulars stimmen Sie unseren Allgemeinen Geschäftsbedingungen und der Datenschutzerklärung zu. Wir verwenden Ihre E-Mail nur, um auf Ihre Vorschläge zu antworten und Sie über Premium-Funktionen zu informieren.'
        },
        submit: 'Feedback teilen & benachrichtigt werden',
        submitting: 'Wird gesendet...',
        success: 'Vielen Dank! Wir werden Ihr Feedback prüfen und uns bald bei Ihnen melden.',
        error: 'Etwas ist schief gelaufen. Bitte versuchen Sie es später erneut.'
      }
    },
  },
};
