import VueI18n from 'vue-i18n';

const messages = {
  en: {
    message: {
      hello: 'hello world',
      dashboard: 'Dashboard'
    }
  },
  es: {
    message: {
      hello: 'hola',
      dashboard: 'Tablero'
    }
  }
};

const i18n = new VueI18n({
  locale: 'es', // set locale
  messages, // set locale messages
});

module.exports = i18n;
