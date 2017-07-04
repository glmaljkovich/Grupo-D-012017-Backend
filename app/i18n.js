import VueI18n from 'vue-i18n';

const messages = {
  en: {
    message: {
      hello: 'Welcome!',
      dashboard: 'Dashboard',
      mylists: 'My Shopping Lists',
      uploadfile: 'Upload Products File',
      profile: 'Profile',
      history: 'History',
      trylogin: 'Try logging in or registering to start using the app.',
      nolists: 'Yo have no lists yet. Make a new one!',
      uploadButton: 'Upload',
      page: 'Page',
      ofM: 'of',
      addNewSL: 'Add New Shopping List',
      products: 'products',
      save: 'Save',
      recommended: 'Recommended',
      delivery: 'Delivery',
      personalInformation: 'Personal Information',
      name: 'Name',
      lastname: 'Last Name',
      address: 'Address',
      logout: 'Logout'
    }
  },
  es: {
    message: {
      hello: 'Bienvenido!',
      dashboard: 'Tablero',
      mylists: 'Mis Listas de Compras',
      uploadfile: 'Subir Archivo de Productos',
      profile: 'Perfil',
      history: 'Historial',
      trylogin: 'Trata de iniciar sesion o registrarte para comenzar a usar la app.',
      nolists: 'No tienes listas aun. Crea una nueva!',
      uploadButton: 'Subir',
      page: 'Página',
      ofM: 'de',
      addNewSL: 'Agregar Nueva Lista de Compras',
      products: 'productos',
      save: 'Guardar',
      recommended: 'Recomendados',
      delivery: 'Envio a domicilio',
      personalInformation: 'Informacion Personal',
      name: 'Nombre',
      lastname: 'Apellido',
      address: 'Direccion',
      logout: 'Cerrar Sesion'
    }
  }
};

const i18n = new VueI18n({
  locale: 'es', // set locale
  messages, // set locale messages
});

module.exports = i18n;
