import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import {
  VApp,
  VAppBar,
  VAvatar,
  VMain,
  VContainer,
  VBtn,
  VIcon,
  VChip,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VDialog,
  VForm,
  VTextField,
  VTextarea,
  VAlert,
  VRow,
  VCol,
  VSpacer,
  VSnackbar,
} from 'vuetify/components'
import { Ripple } from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { pt } from 'vuetify/locale'

export const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VAvatar,
    VMain,
    VContainer,
    VBtn,
    VIcon,
    VChip,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VDialog,
    VForm,
    VTextField,
    VTextarea,
    VAlert,
    VRow,
    VCol,
    VSpacer,
    VSnackbar,
  },

  directives: {
    Ripple,
  },

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },

  locale: {
    locale: 'pt',
    messages: { pt },
  },

  theme: {
    defaultTheme: 'studyPlan',

    themes: {
      studyPlan: {
        dark: false,

        colors: {
          primary: '#185C45',
          background: '#FAF6ED',
          surface: '#FFFCF6',
          'on-background': '#18352D',
          'on-surface': '#18352D',
          error: '#B3261E',
        },
      },
    },
  },

  defaults: {
    VBtn: {
      rounded: 'lg',
      class: 'text-none',
    },

    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },

    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },

    VCard: {
      rounded: 'xl',
      elevation: 0,
    },
  },
})
