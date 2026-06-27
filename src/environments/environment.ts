export const environment = {
  production: false,
  // Apunta al backend local. /api/v1 = endpoints de negocio versionados.
  // El backend permite CORS, asi que el frontend (puerto 4200) puede llamarlo directo.
  apiUrl: 'http://localhost:4000/api/v1'
};
