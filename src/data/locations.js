/**
 * Sedes MODENA. Direcciones y horarios quedan en null hasta validar:
 * no se inventan domicilios ni enlaces de mapa.
 */

export const LOCATIONS = [
  {
    id: 'ezeiza',
    num: '01',
    name: 'Ezeiza',
    wait: 'Consultar disponibilidad',
    address: null,
    addressNote: null,
    mapsUrl: null,
    /** Descripción corta validada · la disponibilidad por curso se confirma al consultar. */
    note: 'Disponibilidad por curso y horarios a confirmar al consultar.',
    photo: 'clase-05',
  },
  {
    id: 'la-plata',
    num: '02',
    name: 'La Plata',
    wait: 'Consultar disponibilidad',
    address: null,
    addressNote: null,
    mapsUrl: null,
    note: 'Disponibilidad por curso y horarios a confirmar al consultar.',
    photo: 'clase-07',
  },
  {
    id: 'caba-constitucion',
    num: '03',
    name: 'CABA — Constitución',
    wait: 'Consultar disponibilidad',
    address: null,
    addressNote: null,
    mapsUrl: null,
    note: 'Disponibilidad por curso y horarios a confirmar al consultar.',
    photo: 'clase-04',
  },
]

export const LOCATIONS_TITLE = 'Tres sedes. La misma experiencia práctica.'
export const LOCATIONS_INTRO =
  'Elegí la sede que te quede más cómoda. La modalidad y los recorridos de práctica son los mismos en las tres.'