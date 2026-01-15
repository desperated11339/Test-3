# Kristian Transfers - Página Web de Reservas

Página web moderna para reservas de traslados privados en Mallorca, con diseño elegante y funcionalidades completas.

## Características

### Diseño
- Esquema de colores: Azul oscuro, blanco y dorado
- Diseño responsive que se adapta a diferentes dispositivos
- Animaciones suaves y transiciones elegantes
- Interfaz intuitiva y fácil de usar

### Funcionalidades

#### Formulario de Reserva Completo
- **Tipo de servicio**: Standard o Nocturno
- **Pasajeros**: Selección de 1 a 8+ pasajeros
- **Equipaje**: Selección de cantidad de maletas
- **Tipo de viaje**: Ida o Ida y vuelta
- **Origen y Destino**: 
  - Búsqueda integrada con autocompletado
  - Lista completa de más de 100 destinos en Mallorca
  - Botón para intercambiar origen y destino
- **Fecha y Hora**:
  - Selector de fecha con validación (no fechas pasadas)
  - Selector de hora y minutos
  - Campos condicionales para viaje de ida y vuelta
- **Datos de contacto**:
  - Nombre
  - Email con validación
  - Teléfono con selector de código de país internacional
- **Validación completa** del formulario antes del envío

#### Secciones de la Página
1. **Header**: Navegación sticky con logo y menú
2. **Hero Section**: Imagen de fondo impactante con call-to-action
3. **Cómo Funciona**: Proceso en 3 pasos con iconos
4. **Testimonios**: Opiniones de clientes con calificaciones
5. **Formulario de Reserva**: Formulario completo y funcional
6. **Zonas de Servicio**: Información sobre áreas de servicio
7. **Footer**: Enlaces y contacto

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome (iconos)
- Google Fonts (tipografía)

## Estructura de Archivos

```
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS completos
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## Cómo Usar

1. Abre el archivo `index.html` en tu navegador
2. Navega por las diferentes secciones usando el menú
3. Completa el formulario de reserva con tus datos
4. El formulario valida automáticamente los campos antes del envío

## Personalización

### Colores
Los colores principales están definidos como variables CSS en `styles.css`:
- `--primary-blue`: #1a56db
- `--dark-blue`: #0f3460
- `--gold`: #f59e0b

### Destinos
La lista de destinos se encuentra en `script.js` en el array `destinations`. Puedes agregar o modificar destinos según sea necesario.

### Integración Backend
Para conectar el formulario con un backend, modifica la función `handleFormSubmit()` en `script.js` para enviar los datos a tu API.

## Compatibilidad

- Chrome (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Edge (últimas versiones)
- Navegadores móviles

## Notas

- El formulario actualmente muestra una alerta al enviarse. Para producción, reemplaza esto con una llamada a tu API.
- Las imágenes de fondo son de Unsplash. En producción, reemplázalas con tus propias imágenes.
- Asegúrate de tener una conexión a internet para cargar Font Awesome y las imágenes.

## Licencia

© KristianTransfers - All rights reserved
