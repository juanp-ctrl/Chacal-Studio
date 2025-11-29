# Instrucciones para reemplazar la imagen con video

## Ubicación del componente
El componente VideoHeroSection se encuentra en `/components/VideoHeroSection.tsx`

## Cómo reemplazar la imagen por un video

### Opción 1: Video desde URL externa
En el archivo `/components/VideoHeroSection.tsx`, reemplaza el componente `ImageWithFallback` (líneas 23-27) con:

```tsx
<video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="https://tu-url-del-video.mp4" type="video/mp4" />
</video>
```

### Opción 2: Video local
1. Coloca tu video en la carpeta `/public` (si existe) o en alguna ubicación accesible
2. Reemplaza el componente con:

```tsx
<video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/tu-video.mp4" type="video/mp4" />
</video>
```

## Recomendaciones para el video

- **Formato**: MP4 (H.264) para mejor compatibilidad
- **Resolución**: 1920x1080 o superior
- **Duración**: 10-30 segundos (loop activado)
- **Tamaño**: Optimizado para web (menos de 10MB si es posible)
- **Contenido sugerido**: 
  - Paisajes de la Patagonia
  - Trabajo colaborativo del equipo
  - Elementos naturales relacionados con sostenibilidad
  - B-roll de proyectos de impacto social

## Notas adicionales

- El video tiene `autoPlay`, `muted` y `loop` para reproducción continua
- El atributo `playsInline` es importante para móviles (evita fullscreen automático)
- Si el autoplay no funciona en algunos navegadores, el video intentará reproducirse al hacer scroll
- La flecha hacia abajo permite al usuario hacer scroll manual al contenido principal
