# Proyecto Final React + Firebase + Cordova + Github + Netlify

**Alumno / Autor:** Matias Castro (usuario GitHub: `matiascastro32`)
**Proyecto:** mi-tienda-react-completo
**Objetivo:** Entrega educativa que cumple Ejercicio 1, 2 y 3: aplicación React con carrito, formulario validado y guardado en Firestore, Bootstrap, Firebase Auth/Storage preparado, y configuración para generar APK con Cordova.

---
## Contenido del repositorio
Estructura principal (resumen):
```
proyecto-final/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ ProductList.jsx
│  │  ├─ ProductItem.jsx
│  │  ├─ Cart.jsx
│  │  └─ ContactForm.jsx
│  ├─ firebase/
│  │  └─ firebaseConfig.js
│  ├─ styles/
│  │  └─ main.css
│  ├─ App.jsx
│  └─ index.js
├─ cordova-app/
│  ├─ config.xml
│  └─ www/    <-- aquí irá la carpeta build de React antes de compilar con Cordova
├─ package.json
├─ README.md
└─ .gitignore
```

---
## 1) Requisitos previos (instalar antes)
- Node.js (recomendado v18+). Verificar con `node -v`.
- npm (incluido con Node). Verificar con `npm -v`.
- Git.
- Cuenta en Firebase y proyecto creado (ya incluí la configuración que diste).
- Para APK (Android):
  - Java JDK (OpenJDK 11 o mayor recomendado).
  - Android Studio (con SDK & herramientas de plataforma) — incluida la herramienta `adb`.
  - Gradle (Android Studio instala uno localmente; no requiere instalación global).
  - Cordova CLI: `npm install -g cordova`

---
## 2) Instalación y ejecución local (web)
1. Abre la carpeta del proyecto en tu computador (la que contiene `package.json`).
2. Abre Visual Studio Code y selecciona **File → Open Folder** → la carpeta del proyecto.
3. Abre la terminal integrada (Terminal → New Terminal) y ejecuta:
```bash
npm install
```
4. Ejecuta la app en modo desarrollo:
```bash
npm start
```
5. Abre el navegador en `http://localhost:3000` (o URL que muestre la consola).

### Qué probar en local
- Ir a la página principal y verificar la lista de productos.
- Agregar productos al carrito (el padre usa `this.setState` para actualizar).
- Ir a /contact (o al componente de contacto) y enviar el formulario con datos válidos para verificar que se guarde en Firestore (si las reglas lo permiten).

---
## 3) Configurar Firebase (ya incluida pero revisa)
Archivo: `src/firebase/firebaseConfig.js` contiene la configuración que proporcionaste.
- Si necesitas cambiar de proyecto, reemplaza las variables por las de tu proyecto Firebase.
- **No** subas claves privadas a repositorios públicos en producción; para la entrega académica tu config puede permanecer temporalmente.

### Reglas mínimas temporales (Firestore & Storage) para pruebas
En Firebase Console → Firestore → Rules (usar solo para pruebas de entrega, no en producción):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Storage (temporal):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
> **Importante:** Cambia estas reglas después de la evaluación por seguridad.

---
## 4) Rutas (React Router)
El proyecto incluye rutas básicas en `src/App.jsx`:
- `/` → Productos
- `/contact` → Formulario de contacto

---
## 5) Validaciones de formulario
El formulario usa `simple-react-validator` con reglas:
- `name`: required, solo letras y espacios (`alpha_space`)
- `email`: required, formato email
- `message`: required, mínimo 10 caracteres
- `phone`: numeric (opcional)
- `file`: opcional, se sube a Storage y se guarda la URL en Firestore junto al documento

---
## 6) Guardar en Firestore y subir a Storage
El componente `ContactForm.jsx` realiza:
1. Si hay archivo adjunto, lo sube a Storage (`uploads/` + timestamp + nombre).
2. Recupera la URL (`getDownloadURL`) y guarda en Firestore junto al resto de campos.
3. Guarda campo `createdAt` con `serverTimestamp()`.

---
## 7) Despliegue en Netlify (paso a paso)
1. Asegúrate de haber subido el repositorio a GitHub (`https://github.com/matiascastro32/mi-proyecto-react.git`).
2. En Netlify → New site → Import from Git → conecta con GitHub → selecciona `mi-proyecto-react`.
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy site. Netlify construirá y publicará el sitio. Copia la URL pública y pégala en la entrega del curso.

Si usas variables de entorno (por ejemplo para keys públicas) añádelas en Netlify → Site settings → Build & deploy → Environment → Edit variables.

---
## 8) Subir el proyecto a GitHub (comandos listos)
En la carpeta del proyecto (si aún no añadiste remote):
```bash
git init
git add .
git commit -m "Versión final - entrega"
git remote add origin https://github.com/matiascastro32/mi-proyecto-react.git
git branch -M main
git push -u origin main
```

---
## 9) Preparar Cordova y generar APK (guía completa)
> Sigue estos pasos desde un ambiente donde tengas instalado Java JDK y Android Studio.

### 9.1 Instalar Cordova (si no lo tienes)
```bash
npm install -g cordova
```
Verifica: `cordova -v`

### 9.2 Crear proyecto Cordova (opcional si ya existe)
Si prefieres crear desde cero fuera del repo:
```bash
cordova create cordova-app com.matias.tienda MatiasTienda
cd cordova-app
cordova platform add android
```
> En este repo se incluye una carpeta `cordova-app/` con `config.xml` y `www/` (vacío).

### 9.3 Generar `build` de React y copiar a Cordova
Desde la raíz del proyecto React:
```bash
npm run build
# copia el contenido de build/ a cordova-app/www/
# Linux / mac:
cp -r build/* cordova-app/www/
# Windows (PowerShell):
xcopy build\* cordova-app\www\ /E /I /Y
```
(Opcional: usar el script incluido `scripts/copy-build-to-cordova.sh` si está presente).

### 9.4 Añadir la plataforma Android (si no lo hiciste)
```bash
cd cordova-app
cordova platform add android
```
### 9.5 Compilar (debug)
```bash
cordova build android
```
Después de esto, el APK de debug estará en: `cordova-app/platforms/android/app/build/outputs/apk/` (rutas pueden variar según versión Cordova/Gradle).

### 9.6 Firmar APK para release (pasos principales)
1. Generar keystore (ejemplo):
```bash
keytool -genkeypair -v -keystore my-release-key.jks -alias myalias -keyalg RSA -keysize 2048 -validity 10000
```
2. Construir release unsigned (desde cordova):
```bash
cordova build android --release
```
3. Firmar con `apksigner` (parte del Android SDK build-tools) o `jarsigner` y luego `zipalign` (ambas herramientas vienen con Android SDK):
```bash
# ejemplo usando apksigner (Android SDK build-tools must be in PATH)
apksigner sign --ks my-release-key.jks platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```
4. Verifica:
```bash
apksigner verify platforms/android/app/build/outputs/apk/release/app-release.apk
```
5. Instala en dispositivo (usb debugging enabled):
```bash
adb install -r platforms/android/app/build/outputs/apk/release/app-release.apk
```

> **Notas importantes:**
- Android Studio facilita el proceso (importar el proyecto `cordova-app/platforms/android` y usar su interfaz para firmar y generar APK). Recomiendo usar Android Studio para la firma final.
- Guarda tu `my-release-key.jks` en un lugar seguro; lo necesitarás para futuras actualizaciones.

---
## 10) Scripts útiles incluidos (si están presentes)
Puedes añadir (o ejecutar) un script `scripts/copy-build-to-cordova.sh` en la raíz para automatizar copiar `build/` a `cordova-app/www/`.

Ejemplo de script (bash):
```bash
#!/bin/bash
set -e
npm run build
rm -rf cordova-app/www/*
cp -r build/* cordova-app/www/
echo "Copiado build/ a cordova-app/www/"
```

Hazlo ejecutable: `chmod +x scripts/copy-build-to-cordova.sh`

---
## 11) Pruebas y evidencia para la entrega
Recomiendo capturar las siguientes pruebas para adjuntar en la plataforma de evaluación:
- Pantalla de Netlify con la URL desplegada.
- Pantalla de Firestore mostrando documentos guardados (después de enviar formulario).
- Video demo corto (3-5 min) mostrando: listar productos, agregar al carrito, enviar formulario, abrir Firestore y ver el documento, instalar APK en dispositivo (si aplica).
- Archivo ZIP final entregado (sin node_modules).

---
## 12) Checklist final de entrega
- [ ] ZIP del proyecto (sin node_modules) subido a la plataforma
- [ ] Repositorio en GitHub: `https://github.com/matiascastro32/mi-proyecto-react`
- [ ] URL Netlify funcionando
- [ ] Video de presentación subido (link)
- [ ] APK firmado (si aplica) o evidencia de build/instalación (si aplica)

---
## 13) Problemas comunes & soluciones rápidas
- **Errores de Firebase:** revisa reglas de Firestore/Storage y permisos. Revisar consola del navegador para errores CORS o claves inválidas.
- **Cordova/Gradle issues:** abre el proyecto en Android Studio y deja que descargue dependencias; si falla, actualiza Android SDK / build-tools.
- **apksigner no encontrado:** agrega ruta del build-tools al PATH o usa Android Studio para firmar.

---
## 14) Cómo abrir el proyecto en Visual Studio Code (paso a paso)
1. Descarga y descomprime el ZIP `proyecto-final.zip`.
2. Abre VSCode → File → Open Folder → selecciona la carpeta `proyecto-final`.
3. Abre terminal integrada (Terminal → New Terminal).
4. Ejecuta:
```bash
npm install
npm start
```
5. Para crear build y preparar APK:
```bash
npm run build

