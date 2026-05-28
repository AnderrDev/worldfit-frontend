# WorldFit - Frontend (Angular)

App de rutinas de ejercicio para gente que va al gimnasio.
Frontend construido con **Angular 17** y **Clean Architecture modular**.

---

## Arquitectura

Clean Architecture **por modulo**, con 3 capas: `domain`, `data` y `presentation`.

```
modules/<feature>/
  domain/                 <- Nucleo, sin framework ni HTTP
    entities/             <- Entidades de dominio puras
    repositories/         <- Contratos de repositorio (abstract class)
    usecases/             <- Casos de uso (logica de aplicacion)
  data/                   <- Acceso a datos (implementa el dominio)
    datasources/          <- Fuentes de datos (HTTP). Devuelven DTOs
    repositories/         <- Implementaciones (RepositoryImpl): mapean DTO -> Entidad
  presentation/           <- UI
    pages/                <- Componentes y paginas Angular
```

Reglas de dependencia (Clean Architecture):

```
presentation -> domain (usecases -> repositories)
data         -> domain (RepositoryImpl implementa el contrato del repo)
domain       -> no depende de nadie
```

Flujo de una peticion:

```
Page -> UseCase -> Repository (contrato) -> RepositoryImpl -> DataSource -> HTTP
                                              (mapea DTO -> Entidad)
```

El `core/` contiene servicios singleton (interceptors, guards) que solo se importan en `AppModule`.
El `shared/` contiene componentes/pipes/directivas reutilizables, importable en cualquier feature.

### Modulos incluidos

| Modulo      | Ruta         | Casos de uso de ejemplo            |
|-------------|--------------|------------------------------------|
| `auth`      | `/auth`      | `LoginUseCase`                     |
| `routines`  | `/routines`  | `GetAllRoutinesUseCase`            |
| `exercises` | `/exercises` | `GetAllExercisesUseCase`           |

---

## Setup local

```bash
npm install
npm start              # ng serve en http://localhost:4200
npm test               # Karma + Jasmine
npm run lint           # ESLint con reglas de Angular
npm run build:prod     # Build optimizado a dist/
```

> **Nota:** la maqueta se incluye sin `node_modules`. Despues de clonar el repo necesitas `npm install`.
> Si quieres que el CLI de Angular regenere el `package-lock.json`, ejecuta `npm install` una vez antes del primer push.

---

## SonarCloud

El archivo `sonar-project.properties` esta listo. Antes de usarlo, edita los placeholders:

- `sonar.projectKey=<TU_ORG>_worldfit-frontend`
- `sonar.organization=<TU_ORG>`

Y configura el secret `SONAR_TOKEN` en GitHub (ver `docs/SETUP_GITHUB.md` en la raiz).

---

## CI/CD

Los workflows estan en `.github/workflows/`:

- `ci.yml` - corre lint + test + build + SonarCloud en cada PR a `dev`, `test` o `main`.

---

## Estructura del directorio

```
worldfit-frontend/
├── angular.json
├── package.json
├── tsconfig*.json
├── .eslintrc.json
├── sonar-project.properties
├── karma.conf.js
├── .github/workflows/ci.yml
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss
    ├── environments/
    └── app/
        ├── app.module.ts
        ├── app-routing.module.ts
        ├── app.component.*
        ├── core/
        │   ├── core.module.ts
        │   ├── interceptors/auth.interceptor.ts
        │   └── guards/auth.guard.ts
        ├── shared/shared.module.ts
        └── modules/
            ├── auth/
            ├── routines/
            └── exercises/
```
