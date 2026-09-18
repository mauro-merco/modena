# MODENA — Especificación integral para landing page comercial

## 0. Objetivo de este archivo

Construir una landing page comercial, visual y orientada a conversión para **MODENA — Instituto de Mecánica Automotriz**.

La landing debe comunicar con claridad el diferencial del instituto —**modalidad intensiva y formación práctica**—, presentar sus cursos y sedes, mostrar evidencia real de las clases y conducir al usuario hacia una consulta mediante **un único formulario embebido**.

Este documento debe tomarse como fuente de verdad para diseño, contenido e implementación. No crear una plantilla genérica ni una landing con estética reconocible de “sitio hecho por IA”. La página tiene que contar con dirección de arte propia, jerarquía tipográfica fuerte, composición editorial, microinteracciones cuidadas y una identidad vinculada al mundo técnico/automotor sin caer en clichés visuales.

---

## 1. Stack y criterios de implementación

- React.
- Tailwind CSS para estilos, utilizando variables CSS/tokens para el sistema visual.
- GSAP + ScrollTrigger para animaciones basadas en scroll.
- `@gsap/react` si está disponible, con limpieza correcta de contextos al desmontar componentes.
- Iconografía vectorial coherente. Puede utilizarse Lucide React como base, ajustando grosor y tamaño; no usar emojis ni mezclar familias de íconos.
- Mobile first.
- Accesibilidad AA como mínimo.
- HTML semántico.
- Componentes reutilizables, pero sin fragmentar en exceso.
- Evitar dependencias pesadas que no aporten valor.
- Respetar `prefers-reduced-motion`.

### Logos disponibles en la raíz

En la raíz del proyecto existen dos logos de **1416 × 729 px**:

- `logo-para-fondo-light` — usar sobre fondos claros.
- `logo-para-fondo-dark` — usar sobre fondos oscuros.

La extensión puede ser `.png`, `.webp`, `.svg` u otra; resolver el archivo existente sin duplicarlo. Mantener siempre la proporción, no estirar ni comprimir. La landing debe tener **light mode y dark mode**, usando automáticamente el logo correcto para cada modo.

---

## 2. Dirección de arte

### Concepto

**“Formación en movimiento.”** La identidad debe unir precisión técnica, velocidad de aprendizaje y práctica real. La página tiene que sentirse como un instituto serio y contemporáneo, no como un taller improvisado ni como una estética gamer.

Tomar de las piezas gráficas de referencia:

- Paleta verde, blanco, rojo y negro.
- Imágenes reales de alumnos trabajando.
- Sensación de energía, formación técnica y acción.
- Cortes diagonales y líneas finas como recurso secundario.
- Contraste alto y titulares contundentes.

No copiar literalmente la composición de los posteos. Llevar esos códigos a una interfaz web más limpia, editorial y premium. Evitar texturas excesivas, pinceladas, metal cepillado falso, carbono genérico, brillos 3D, neón y acumulación de marcos. El foco debe estar en tipografía, fotografía, ritmo y detalle.

### Sistema cromático sugerido

Definir todos los colores como variables. Ajustarlos al logo real al iniciar el proyecto.

#### Dark mode — modo principal recomendado

- Fondo principal: `#090B0A`
- Superficie: `#111513`
- Superficie elevada: `#171C19`
- Texto principal: `#F6F7F4`
- Texto secundario: `#B6BDB8`
- Verde MODENA: `#0B8F4D`
- Verde luminoso para estados: `#33C878`
- Rojo MODENA / CTA: `#E12821`
- Bordes: `rgba(255,255,255,.12)`

#### Light mode

- Fondo principal: `#F4F5F1`
- Superficie: `#FFFFFF`
- Superficie secundaria: `#E9ECE7`
- Texto principal: `#101310`
- Texto secundario: `#525A54`
- Verde MODENA: `#087A42`
- Rojo MODENA / CTA: `#D9231D`
- Bordes: `rgba(16,19,16,.14)`

Usar el rojo principalmente para conversión y énfasis. Usar el verde para identificación, navegación, estados, datos y detalles técnicos. No convertir toda la página en una bandera italiana; la combinación debe verse sofisticada.

### Tipografía

La landing debe ser marcadamente tipográfica.

- Display/titulares: **Barlow Condensed** o **Roboto Condensed**, peso 700–900.
- Texto/interfaz: **Inter** o **Manrope**, peso 400–700.
- Usar mayúsculas en titulares cortos, etiquetas y datos; no en párrafos largos.
- Titulares con `clamp()` y buen control de saltos de línea.
- Evitar tipografías sci-fi o ilegibles.
- Evitar texto inclinado en bloques completos. La inclinación puede aparecer apenas en una palabra destacada o etiqueta.

### Recursos gráficos propios

- Una línea vertical o “ruta formativa” que conecte secciones en desktop.
- Marcadores técnicos: coordenadas visuales, numeración `01 / 02 / 03`, pequeñas reglas y líneas.
- Máscaras diagonales sutiles para fotos.
- Motivo tricolor muy controlado: tres líneas finas verde/blanco/rojo, nunca una franja dominante.
- Íconos lineales personalizados o consistentes: herramienta, electricidad, motocicleta, diagnóstico, reloj, ubicación, práctica.
- Estados hover con desplazamiento de 2–4 px, cambios de borde y flechas animadas; no usar efectos de glow.

---

## 3. Experiencia general y layout

- Desktop: grilla editorial de 12 columnas, ancho máximo aproximado de 1440 px.
- Tablet: 8 columnas.
- Mobile: **una sola columna**, sin grids horizontales comprimidos.
- Mantener CTAs accesibles sin saturar.
- Usar anclas: `#cursos`, `#modalidad`, `#sedes`, `#experiencia`, `#preguntas`, `#inscripcion`.
- El formulario es el destino principal de conversión.
- CTA primario sugerido: **“Quiero recibir información”**.
- CTA secundario sugerido: **“Ver cursos”**.
- CTAs intermedios pueden variar el texto según contexto, pero todos deben llevar a `#inscripcion` salvo “Ver cursos”.

### Menú original

No usar una barra estándar con links centrados sin personalidad.

Propuesta:

- Header flotante, compacto, con fondo translúcido y borde sutil.
- Logo a la izquierda.
- En desktop, botón central o lateral llamado **“Explorar”** que despliega una navegación tipo panel técnico: numeración, nombre de sección y una línea indicadora de progreso de scroll.
- Mostrar siempre un CTA rojo **“Inscribirme”** y el switch dark/light.
- Al hacer scroll, el header reduce altura y mejora opacidad del fondo.
- En mobile, usar botón de menú con icono propio de tres líneas asimétricas. Abrir un panel full-screen, vertical, con los enlaces en gran tamaño, CTA visible y bloqueo de scroll del body.
- El menú debe ser totalmente navegable por teclado y cerrar con `Escape`.

### CTA flotante en mobile

Después de superar el hero, mostrar una barra inferior compacta con el texto **“Consultá por tu curso”** y un botón **“Quiero información”**. Debe respetar `safe-area-inset-bottom`, no tapar el formulario y ocultarse cuando `#inscripcion` esté visible.

---

## 4. Arquitectura de la landing

### 4.1 Header

Contenido:

- Logo correspondiente al tema.
- Menú Explorar.
- Selector light/dark con etiqueta accesible.
- CTA: **Inscribirme**.

El tema debe:

- Detectar inicialmente `prefers-color-scheme`.
- Permitir selección manual.
- Persistir la selección en `localStorage`.
- Evitar flash del tema incorrecto al cargar.

### 4.2 Hero — diferencial claro

Objetivo: en menos de cinco segundos, dejar claro qué ofrece MODENA y por qué es diferente.

#### Copy principal recomendado

Eyebrow:

> INSTITUTO DE MECÁNICA AUTOMOTRIZ

H1:

> APRENDÉ HACIENDO. FORMATE EN MODO INTENSIVO.

Texto:

> Capacitación práctica para aprender mecánica automotriz, electrónica y motos en menos tiempo, con clases presenciales y trabajo real sobre vehículos y componentes.

CTAs:

- **Quiero recibir información** → `#inscripcion`
- **Conocer los cursos** → `#cursos`

Datos rápidos:

- `4` cursos principales
- `6 meses` de duración
- `3` sedes
- `Certificación UTN` — mostrar únicamente si la certificación aplica oficialmente a todos los cursos; si no, parametrizar por curso y no hacer una afirmación general.

#### Diseño del hero

- Desktop: composición asimétrica. Titular a la izquierda; collage o secuencia de imágenes reales a la derecha.
- Mobile: una columna. Titular, texto, CTAs, datos y luego imagen.
- Usar foto o video real de una clase práctica como elemento principal. Nunca usar fotos stock si existen activos reales.
- Agregar una etiqueta dinámica sutil: `PRÁCTICA REAL / FORMACIÓN INTENSIVA`.
- Evitar carrusel automático en el hero.

### 4.3 Franja de prueba visual

Una banda horizontal inmediatamente después del hero con clips/fotos reales de alumnos, herramientas, motores, mediciones y docentes acompañando prácticas.

- En desktop puede comportarse como un reel horizontal controlado por scroll.
- En mobile debe ser una secuencia vertical o un scroll horizontal manual con `scroll-snap`, sin secuestrar el desplazamiento de la página.
- Cada imagen debe tener `alt` descriptivo y opcionalmente una leyenda corta.

### 4.4 Cursos principales

Título:

> ELEGÍ TU ESPECIALIDAD

Introducción:

> Cuatro recorridos prácticos para formarte con herramientas, sistemas y situaciones reales de taller.

Mostrar los siguientes cursos:

| Curso | Frecuencia | Duración | Inicio | Sedes |
|---|---:|---:|---|---|
| Mecánica Automotriz | 3 veces por semana | 6 meses | Confirmar próxima fecha; las piezas mencionan octubre | CABA/Constitución, Ezeiza y La Plata |
| Electricidad y Electrónica del Automóvil | 2 veces por semana | 6 meses | Confirmar próxima fecha; las piezas mencionan octubre | CABA/Constitución, Ezeiza y La Plata |
| Mecánica y Electricidad de Motos | 1 vez por semana | 6 meses | Confirmar próxima fecha; las piezas mencionan octubre | CABA/Constitución, Ezeiza y La Plata |
| Inyección Electrónica Automotriz | 2 veces por semana | 6 meses | Confirmar próxima fecha; las piezas mencionan octubre | CABA/Constitución, Ezeiza y La Plata |

No publicar “inicia en octubre” como dato fijo si la campaña ya no está vigente. Centralizar fechas e información variable en un objeto/archivo de datos editable.

#### Contenidos visibles por curso

**Mecánica Automotriz**

- Tren delantero.
- Distribución.
- Frenos.
- Armado y desarmado de motor.
- Diagnóstico de fallas.
- Reparaciones habituales de taller.

**Electricidad y Electrónica del Automóvil**

- Diagnóstico eléctrico del automóvil.
- Medición y análisis de sensores y actuadores.
- Señales PWM y electrónica aplicada.
- Comunicación entre módulos.
- Diagnóstico con escáner, luces, arranque y carga.

**Mecánica y Electricidad de Motos**

- Motores 2T y 4T.
- Desarme, armado y puesta a punto.
- Carburación y sistema de combustible.
- Electricidad, encendido y sistema de carga.
- Diagnóstico y detección de fallas.

**Inyección Electrónica Automotriz**

- Funcionamiento del sistema de inyección electrónica.
- Sensores, actuadores y sonda lambda.
- Diagnóstico y localización de fallas.
- Escáner, osciloscopio y lectura de señales.
- Inyectores y encendido.

#### Interacción

- Desktop: tarjetas grandes tipo ficha técnica, no cuatro tarjetas pequeñas idénticas. Alternar imagen y contenido para producir ritmo.
- Cada ficha debe incluir nombre, frecuencia, duración, sedes, contenidos y CTA **“Consultar por este curso”**.
- El CTA debe desplazar al formulario y, si la integración lo permite sin modificar el formulario, conservar el nombre del curso seleccionado en estado/localStorage o enviarlo por query/UTM. No agregar campos externos ni crear otro formulario.
- Mobile: una tarjeta por fila; contenido extensible con acordeón accesible.

### 4.5 Modalidad intensiva

Título:

> MENOS VUELTAS. MÁS TALLER.

Texto base:

> La modalidad intensiva concentra el aprendizaje en un recorrido de seis meses, combinando conceptos esenciales con práctica presencial. Cada clase está orientada a comprender, probar, diagnosticar y resolver.

Estructura en cuatro pasos:

1. **Entendés** — conceptos y funcionamiento de cada sistema.
2. **Practicás** — trabajo con motores, herramientas y componentes reales.
3. **Diagnosticás** — medición, análisis y detección de fallas.
4. **Resolvé́s** — aplicación práctica con acompañamiento docente.

Importante: este texto explica la propuesta sin inventar porcentajes de práctica, salida laboral garantizada, homologaciones ni promesas de ingresos. Cualquier afirmación institucional adicional debe contar con validación del cliente.

### 4.6 Experiencia real — fotos y videos

Título:

> ASÍ SE APRENDE EN MODENA

Crear una galería editorial con material real:

- Clases prácticas.
- Alumnos trabajando sobre vehículos y motores.
- Uso de escáner, osciloscopio y herramientas.
- Prácticas de motos.
- Interacción con docentes.
- Espacios y equipamiento de las sedes.

Requisitos:

- No usar stock ni imágenes generadas por IA cuando haya material real.
- Usar `picture`/`srcset`, formatos WebP/AVIF y dimensiones declaradas.
- Videos con `poster`, `preload="metadata"`, controles accesibles y sin autoplay con audio.
- Si hay clips cortos decorativos, pueden reproducirse muted/loop únicamente al entrar en viewport y deben pausarse fuera de pantalla.
- Incluir botón de pausa si el movimiento es continuo.
- Abrir videos en modal accesible con foco controlado y cierre con `Escape`.

### 4.7 Sedes

Título:

> TRES SEDES. LA MISMA EXPERIENCIA PRÁCTICA.

Sedes obligatorias:

- **Ezeiza**
- **La Plata**
- **CABA — Constitución**

Las piezas visuales usan “Constitución”; en la web presentar **CABA — Constitución** para coincidir con el pedido comercial y mantener precisión geográfica.

No inventar domicilios, teléfonos, horarios ni enlaces de mapa. Preparar campos de contenido para completarlos cuando estén validados.

Diseño:

- Evitar un mapa pesado como protagonista.
- Usar tres bloques de ubicación con fotografía real, etiqueta de sede y CTA **“Consultar disponibilidad”**.
- En desktop, una línea/ruta animada puede conectar las tres sedes.
- En mobile, apilar los bloques en una sola columna.

### 4.8 Certificación y confianza

Crear una sección breve para despejar objeciones y aportar respaldo.

- La gráfica recibida menciona **Certificación UTN**.
- Confirmar alcance, denominación legal y cursos incluidos antes de publicar.
- Una vez validado, mostrar el texto institucional exacto y, si corresponde, el logo oficial autorizado.
- No inventar testimonios, cantidad de egresados, años de trayectoria, tasa de empleabilidad ni sellos.

Si todavía no hay información validada, mantener esta sección en configuración pero no renderizarla en producción.

### 4.9 Preguntas frecuentes

Título:

> ANTES DE EMPEZAR

Implementar acordeón accesible, con una sola respuesta abierta a la vez en mobile y posibilidad de múltiples en desktop si no perjudica la lectura.

Preguntas propuestas:

1. **¿Necesito conocimientos previos?**  
   Respuesta a validar con MODENA. Evitar afirmar requisitos que no fueron confirmados.

2. **¿Cuánto duran los cursos?**  
   Los cursos principales presentados tienen una duración de seis meses.

3. **¿Cuántas veces por semana se cursa?**  
   Depende del curso: entre una y tres veces por semana. Ver el detalle en cada especialidad.

4. **¿Las clases son prácticas?**  
   La formación combina los conceptos esenciales con práctica presencial sobre sistemas, componentes y situaciones reales de diagnóstico.

5. **¿En qué sedes se puede cursar?**  
   MODENA cuenta con sedes en Ezeiza, La Plata y CABA — Constitución. La disponibilidad de cada curso debe confirmarse al consultar.

6. **¿Entregan certificación?**  
   Respuesta final pendiente de validación sobre alcance y condiciones de la certificación UTN.

7. **¿Cuándo comienzan las próximas cursadas?**  
   Las fechas varían según curso y sede. Invitación a completar el formulario para recibir la próxima disponibilidad.

8. **¿Cómo me inscribo?**  
   Completar el formulario de la sección de inscripción. El equipo se pondrá en contacto para informar disponibilidad y próximos pasos.

Usar marcado `FAQPage` únicamente si las preguntas y respuestas aparecen completas, visibles para el usuario y cumplen las directrices vigentes del buscador. No agregar schema con contenido oculto o no validado.

### 4.10 Conversión — formulario

ID de sección: `inscripcion`

Título:

> EMPEZÁ TU FORMACIÓN EN MODENA

Texto:

> Dejanos tus datos y te contamos cuál es el curso, la sede y la modalidad que mejor se adapta a vos.

Al lado o arriba del formulario mostrar tres mensajes breves:

- Información de cursos y horarios.
- Disponibilidad por sede.
- Acompañamiento para elegir tu especialidad.

#### Formulario obligatorio

Insertar **exactamente este formulario**. No crear, duplicar, reemplazar ni complementar con otro formulario. No usar un formulario visual falso como placeholder.

```html
<iframe
    src="https://api.leadconnectorhq.com/widget/form/eHQ7OT4wu03SkCZoT7Pk"
    style="width:100%;height:100%;border:none;border-radius:8px"
    id="inline-eHQ7OT4wu03SkCZoT7Pk" 
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Formulario Landing Page"
    data-height="undefined"
    data-layout-iframe-id="inline-eHQ7OT4wu03SkCZoT7Pk"
    data-form-id="eHQ7OT4wu03SkCZoT7Pk"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Formulario Landing Page"
>
</iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```

En React, cargar el script una sola vez, evitar duplicados durante re-renders y limpiar correctamente si el ciclo de vida lo requiere. Dar al contenedor una altura mínima razonable para evitar saltos de layout, pero permitir que el script controle la altura final del iframe. En mobile, el formulario debe ocupar el 100 % del ancho y no tener scroll horizontal.

No añadir formulario de newsletter, modal de captura, formulario en el hero ni formulario propio en el footer.

### 4.11 Footer

- Logo correspondiente al tema.
- Navegación abreviada.
- Sedes: Ezeiza, La Plata y CABA — Constitución.
- Datos legales/contacto solo si están validados.
- Texto de copyright dinámico.
- Enlace a política de privacidad, requerido por tratarse de captación de datos. Si no existe, crear la ruta/placeholder claramente marcada como pendiente; no inventar contenido legal definitivo.
- Cierre visual con las tres líneas verde/blanco/rojo.

---

## 5. Movimiento y GSAP

El movimiento debe reforzar el relato, no decorar por decorar.

### Animaciones sugeridas

- Hero: entrada escalonada de eyebrow, título, texto, CTAs y datos. Duración contenida; sin esperar para acceder al contenido.
- Imágenes del hero: reveal mediante máscara diagonal muy sutil.
- Scroll progress: línea técnica vertical que avanza con el recorrido en desktop.
- Cursos: tarjetas que entran con desplazamiento corto y leve `clip-path`; stagger moderado.
- Modalidad: los cuatro pasos se activan uno a uno al avanzar.
- Galería: parallax mínimo en algunas imágenes, nunca en todas.
- Sedes: trazo de una ruta con SVG y `stroke-dashoffset`.
- FAQ: altura animada con accesibilidad; el contenido debe seguir disponible sin JavaScript.
- Números/datos: conteo breve solo si aporta; no contar desde cero cada vez que vuelven al viewport.

### Restricciones

- No bloquear el scroll nativo.
- No usar smooth scrolling global agresivo.
- No animar párrafos línea por línea durante varios segundos.
- No aplicar parallax en mobile si afecta rendimiento.
- No usar cursor personalizado en dispositivos táctiles; en desktop solo si aporta y no compromete accesibilidad.
- Con `prefers-reduced-motion: reduce`, desactivar transforms complejos, parallax y scrubbing, dejando transiciones simples o contenido estático.
- Evitar animaciones de layout costosas; priorizar `transform` y `opacity`.

---

## 6. Mobile

La versión mobile no debe ser una reducción del desktop.

- Todo el contenido en una sola columna.
- Header compacto y menú full-screen.
- Hero sin superposiciones que dificulten la lectura.
- CTAs a ancho completo o en dos filas cuando sea necesario.
- Tarjetas de cursos apiladas.
- Acordeones accesibles para contenidos extensos.
- Galería con `scroll-snap` manual o apilada.
- Sin texto vertical.
- Tamaño táctil mínimo de 44 × 44 px.
- Tipografía base de al menos 16 px.
- Respeto por áreas seguras.
- Optimizar especialmente LCP y peso de video/imágenes.
- Probar en anchos 320, 360, 390, 430, 768 px.

---

## 7. Contenido y tono

### Voz

- Directa.
- Concreta.
- Cercana, sin informalidad excesiva.
- Orientada a hacer y aprender.
- Argentina: usar voseo de forma consistente (`aprendé`, `elegí`, `consultá`).

### Evitar

- “Transformá tu futuro” y otras frases genéricas.
- Promesas laborales o económicas no demostrables.
- “La mejor institución” sin respaldo.
- Exceso de signos de exclamación.
- Párrafos largos.
- Contenido de relleno o lorem ipsum.
- Emojis.

### Variables que deben poder editarse fácilmente

- Próxima fecha de inicio por curso.
- Frecuencia y duración.
- Sedes disponibles por curso.
- Dirección y horarios de cada sede.
- Vigencia de descuentos o beneficios por charlas informativas.
- Alcance de la certificación UTN.
- Galería de fotos y videos.
- Datos de contacto y enlaces legales.

Guardar estos datos en un objeto/archivo de configuración separado de los componentes visuales.

---

## 8. SEO técnico y on-page

### Objetivo de búsqueda

Posicionar la página para búsquedas transaccionales/locales relacionadas con cursos de mecánica automotriz, electricidad del automóvil, inyección electrónica y mecánica de motos en CABA, Ezeiza y La Plata.

### Keyword clusters

Usarlas naturalmente; no repetirlas de forma artificial.

- curso de mecánica automotriz
- curso de mecánica automotriz intensivo
- estudiar mecánica automotriz
- curso de electricidad del automóvil
- curso de electricidad y electrónica automotriz
- curso de inyección electrónica automotriz
- curso de mecánica de motos
- curso de mecánica automotriz en CABA
- curso de mecánica automotriz en Ezeiza
- curso de mecánica automotriz en La Plata
- instituto de mecánica automotriz

### Metadata propuesta

**Title:**

> Cursos de Mecánica Automotriz Intensivos | MODENA

**Meta description:**

> Formate en mecánica automotriz, electricidad, inyección electrónica y motos con modalidad intensiva y práctica presencial. Sedes en CABA, Ezeiza y La Plata.

**H1 único:**

> Aprendé haciendo. Formate en modo intensivo.

La frase “curso de mecánica automotriz” debe aparecer de manera natural en el hero o en el primer bloque textual, aunque no sea el H1 exacto.

### Requisitos técnicos

- URL canónica.
- `lang="es-AR"`.
- Open Graph y Twitter Card con imagen real de clase.
- `robots` correcto según entorno: `noindex` en staging, indexable en producción.
- Sitemap y `robots.txt` si la app controla estas rutas.
- Favicons y web manifest basados en la marca.
- Jerarquía H1 → H2 → H3 coherente.
- URLs/anclas descriptivas.
- Enlaces internos a páginas institucionales existentes si las hubiera.
- `alt` descriptivo para imágenes informativas; `alt=""` para decoración.
- Lazy loading bajo el primer viewport; precargar solo el recurso LCP.
- Imágenes responsivas en AVIF/WebP con fallback.
- Evitar CLS: declarar tamaños y reservar espacio para media e iframe.
- Si el proyecto es SPA pura, implementar prerender/SSR/SSG o generación estática de esta ruta para que el contenido principal y metadata estén disponibles sin depender del render del cliente.
- No ocultar texto SEO fuera de pantalla.

### Datos estructurados

Implementar JSON-LD con información validada:

- `EducationalOrganization` para MODENA.
- `Course` para cada curso, únicamente con fechas, modalidad, sede y proveedor confirmados.
- `FAQPage` solo para las preguntas visibles y validadas.
- `BreadcrumbList` si existe una jerarquía real de navegación.

No inventar dirección, teléfono, precio, rating, reseñas, fechas ni acreditaciones. No usar `LocalBusiness` o `AggregateRating` sin datos reales y verificables.

### Medición SEO y conversión

- Preparar integración con GA4/GTM sin insertar IDs inventados.
- Eventos recomendados:
  - `cta_click` con ubicación y texto.
  - `course_select` con nombre del curso.
  - `form_view` al alcanzar 50 % de visibilidad.
  - `form_start` y `generate_lead` solo si el iframe/formulario permite eventos confiables o redirección confirmada.
  - `video_play` con identificador del video.
  - `faq_open` con pregunta.
- Preservar UTMs y parámetros publicitarios cuando el formulario los admita.
- No disparar `generate_lead` por un simple clic ni por cargar el iframe.

---

## 9. Performance y accesibilidad

### Objetivos

- Lighthouse Performance: objetivo 90+ en mobile en condiciones razonables.
- Accessibility: 95+.
- SEO: 95+.
- Core Web Vitals: LCP < 2,5 s; CLS < 0,1; INP < 200 ms como objetivo.

### Checklist

- Navegación completa por teclado.
- Foco visible y con buen contraste.
- Skip link al contenido principal.
- Labels y nombres accesibles en todos los controles.
- Contraste AA mínimo.
- No comunicar información únicamente mediante color.
- Estados hover, focus y active.
- `aria-expanded` y relaciones correctas en menú/FAQ.
- Modales con focus trap y restauración de foco.
- Optimizar y diferir scripts de terceros cuando sea compatible con el formulario.
- Evitar cargar GSAP y video innecesario antes de necesitarlos.
- Limitar fuentes a familias/pesos efectivamente usados.
- No bloquear render con recursos secundarios.

---

## 10. Estructura sugerida de componentes

```text
src/
  components/
    Header.jsx
    ThemeToggle.jsx
    MobileMenu.jsx
    Hero.jsx
    MediaStrip.jsx
    CoursesSection.jsx
    CourseCard.jsx
    IntensiveMethod.jsx
    RealExperienceGallery.jsx
    LocationsSection.jsx
    TrustSection.jsx
    FAQSection.jsx
    LeadFormSection.jsx
    MobileStickyCTA.jsx
    Footer.jsx
  data/
    courses.js
    locations.js
    faq.js
    media.js
  hooks/
    useTheme.js
    useReducedMotion.js
    useScrollToSection.js
  styles/
    globals.css
    tokens.css
```

Adaptar la estructura al proyecto existente; no reescribir la arquitectura si ya hay convenciones claras.

---

## 11. Estados, seguridad y robustez

- La landing debe seguir siendo navegable si falla GSAP.
- Si no carga un video, mostrar su poster y una alternativa textual.
- Si el iframe demora, reservar espacio y mostrar un estado de carga discreto; nunca colocar otro formulario.
- Si el formulario no carga, mostrar un mensaje de error con una opción de reintento. No inventar WhatsApp, teléfono o email.
- Sanitizar contenido dinámico.
- Abrir enlaces externos con atributos seguros cuando corresponda.
- No exponer secretos ni claves en el cliente.
- Incluir consentimiento/cookies según la implementación y legislación aplicable; el iframe ya declara configuración de consentimiento, pero esto no reemplaza la revisión legal general del sitio.

---

## 12. QA y criterios de aceptación

La implementación estará terminada cuando:

- El diferencial “modalidad intensiva + formación práctica” sea visible en el primer viewport.
- Aparezcan los cuatro cursos con duración, frecuencia y sedes.
- Aparezcan Ezeiza, La Plata y CABA — Constitución.
- Se utilicen fotos/videos reales disponibles.
- Exista una explicación breve y clara de la modalidad intensiva.
- Las preguntas frecuentes funcionen y sean accesibles.
- El único formulario de captación sea el iframe indicado, sin modificaciones ni formularios adicionales.
- Todos los CTAs de consulta lleven correctamente a `#inscripcion`.
- Dark y light mode funcionen, persistan y usen el logo correcto.
- La experiencia mobile sea de una sola columna y no tenga overflow horizontal.
- GSAP/ScrollTrigger funcione sin romper navegación ni rendimiento.
- `prefers-reduced-motion` tenga una experiencia válida.
- No haya texto inventado, lorem ipsum, testimonios ficticios o datos sin validar.
- Metadata, canonical, OG, jerarquía de headings y JSON-LD estén implementados.
- El sitio sea verificable con teclado, lectores de pantalla básicos y Lighthouse.
- No existan errores de consola ni listeners/ScrollTriggers huérfanos.
- La landing se vea diseñada específicamente para MODENA y no como una plantilla genérica.

### Pruebas mínimas

- Chrome, Edge, Firefox y Safari actuales.
- iOS Safari y Chrome Android.
- Navegación con teclado.
- Tema claro/oscuro y preferencia del sistema.
- Con y sin `prefers-reduced-motion`.
- Red lenta/3G para media e iframe.
- Formulario real en staging controlado.
- Validación de eventos analíticos.
- Revisión de textos y datos por MODENA antes de producción.

---

## 13. Información pendiente de validar antes de publicar

No completar estos datos por suposición:

- Direcciones exactas de las tres sedes.
- Teléfono, WhatsApp, email y redes oficiales.
- Fecha real de próxima cursada por curso y sede.
- Disponibilidad exacta de cada curso en cada sede.
- Alcance y texto legal de la certificación UTN.
- Precio, matrícula, cuotas y medios de pago.
- Condiciones y vigencia del descuento por asistir a charlas informativas.
- Requisitos de ingreso y edad mínima.
- Horarios y cupos.
- Años de trayectoria, cantidad de alumnos/egresados y estadísticas.
- Política de privacidad y datos legales.

Hasta contar con validación, usar estados de configuración que permitan ocultar secciones o mostrar mensajes neutrales como **“Consultá próximas fechas y disponibilidad”**, sin inventar información.

---

## 14. Resultado esperado

Una landing de alto impacto, rápida y clara, con estética automotriz contemporánea, fotografía real y un recorrido de conversión directo:

**Diferencial → cursos → cómo se aprende → evidencia real → sedes → respuestas → formulario.**

La sensación final debe ser: **“Acá se aprende de verdad, de manera intensa y práctica, y sé exactamente cómo consultar.”**
