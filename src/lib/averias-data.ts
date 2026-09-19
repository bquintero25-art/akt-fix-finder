export type Tone = "transport" | "pdv" | "quality" | "alert" | "neutral";

export interface SectionMeta {
  id: string;
  title: string;
  short: string;
  tone: Tone;
  keywords: string[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "que-es",
    title: "¿Qué es una avería?",
    short: "Definición y en qué procesos se presenta",
    tone: "neutral",
    keywords: ["averia", "averías", "que es", "definicion", "novedad", "cliente", "entrega"],
  },
  {
    id: "transporte",
    title: "Averías de Transporte",
    short: "Recepción, pasos del asesor, plazo de 48 horas",
    tone: "transport",
    keywords: [
      "transporte", "rayon", "rayones", "faltante", "faltantes", "reventada", "reventadas",
      "doblada", "dobladas", "conductor", "recepcion", "transportador", "transportadora",
      "48 horas", "48", "plazo", "firma", "descargos", "camion", "recibir",
    ],
  },
  {
    id: "formato",
    title: "Formato de reporte de inconsistencias",
    short: "Qué revisar con el conductor y cómo diligenciarlo",
    tone: "transport",
    keywords: [
      "formato", "reporte", "inconsistencias", "inconsistencia", "empadronamiento",
      "empadronamientos", "manuales", "garantia", "chasis", "factura", "facturas",
      "obsequios", "estandar de calidad", "enmendado", "sobreescrito", "legible",
    ],
  },
  {
    id: "evidencias",
    title: "Checklist de evidencias",
    short: "Mínimo 5 fotografías",
    tone: "neutral",
    keywords: ["foto", "fotos", "fotografias", "fotografia", "evidencia", "evidencias", "chasis", "canuto", "5 fotos", "imagenes"],
  },
  {
    id: "correo",
    title: "¿Qué debo adjuntar al correo?",
    short: "Fotos, Excel, formato, cuadro y copias",
    tone: "neutral",
    keywords: ["correo", "email", "adjuntar", "adjunto", "excel", "cuadro", "copiar", "copia", "enviar", "asunto", "inventarios", "formato de averias"],
  },
  {
    id: "destinatarios",
    title: "¿A quién envío el reporte?",
    short: "Destinatarios por ciudad / zona",
    tone: "transport",
    keywords: [
      "correo", "destinatario", "destinatarios", "a quien", "zona", "ciudad", "bogota", "periferia",
      "cali", "llanos", "barranquilla", "sincelejo", "floridablanca", "florida", "manizales", "pereira",
      "medellin", "cst", "inventarios",
    ],
  },
  {
    id: "punto-de-venta",
    title: "Averías de Punto de Venta",
    short: "Daños en el PDV, soportes y correo",
    tone: "pdv",
    keywords: [
      "punto de venta", "pdv", "tienda", "cliente", "accesorio", "accesorios", "manipulacion",
      "eventos", "evento comercial", "ausencia", "coordinador", "soporte", "asumir", "post venta", "postventa",
    ],
  },
  {
    id: "calidad",
    title: "Averías de Calidad",
    short: "Fallas en alistamiento, correo de calidad",
    tone: "quality",
    keywords: [
      "calidad", "alistamiento", "carburacion", "fuga", "fugas", "motor", "electrica", "electricas",
      "oxido", "ensamble", "mecanica", "bateria", "falla", "fallas", "averiascalidad",
    ],
  },
  {
    id: "tipo-solicitud",
    title: "¿Qué tipo de solicitud debo hacer?",
    short: "Cambio, Compra o Reparación",
    tone: "neutral",
    keywords: ["cambio", "compra", "reparacion", "cst", "repuesto", "pieza", "ensambladora", "domicilio", "domicilios", "maletero", "maleteros", "precio", "costo", "tipo de solicitud"],
  },
  {
    id: "responsables",
    title: "Responsables",
    short: "Quién monta la avería y quién hace seguimiento",
    tone: "neutral",
    keywords: ["responsable", "responsables", "seguimiento", "siga", "quien monta", "numero de averia", "asesor", "vendedor", "gestion"],
  },
  {
    id: "rest",
    title: "Motos restringidas – REST",
    short: "Toda moto con avería va a restricción",
    tone: "alert",
    keywords: ["rest", "restringida", "restringidas", "restriccion", "restringir", "inventario", "inventarios", "bloquear", "venta", "otra tienda"],
  },
];

export const NORMALIZE = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function searchSections(query: string): SectionMeta[] {
  const q = NORMALIZE(query);
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return SECTIONS.map((s) => {
    const hay = [s.title, s.short, ...s.keywords].map(NORMALIZE);
    let score = 0;
    for (const t of terms) {
      if (hay.some((h) => h === t)) score += 3;
      else if (hay.some((h) => h.includes(t))) score += 1;
    }
    return { s, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.s);
}

export const QUICK_LINKS = [
  { id: "evidencias", icon: "📸", label: "Evidencias", question: "¿Qué evidencias necesito?", tone: "transport" as Tone },
  { id: "destinatarios", icon: "📧", label: "Correo", question: "¿A quién envío el correo?", tone: "transport" as Tone },
  { id: "formato", icon: "📋", label: "Formato", question: "¿Qué formato debo diligenciar?", tone: "transport" as Tone },
  { id: "rest", icon: "🚫", label: "Restringir moto", question: "¿Cuándo debo restringir una moto?", tone: "alert" as Tone },
  { id: "tipo-solicitud", icon: "🔄", label: "Cambio / Compra", question: "¿Es Cambio, Compra o Reparación?", tone: "pdv" as Tone },
  { id: "responsables", icon: "👤", label: "Seguimiento", question: "¿Quién debe hacer seguimiento?", tone: "quality" as Tone },
];

export interface Zone {
  name: string;
  to: string[];
}

export const ZONES: Zone[] = [
  {
    name: "Bogotá y periferia",
    to: [
      "AKT.AveriasBogota@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "Johanna.Mendez@corbeta.com.co",
      "Jeisson.Cardenas@colcomercio.com.co",
    ],
  },
  {
    name: "Cali",
    to: [
      "AKT.AveriasCali@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "angelica.ahumada@colcomercio.com.co",
      "Orlando.Kerguelen@colcomercio.com.co",
    ],
  },
  {
    name: "Llanos",
    to: [
      "AKT.AveriasBogota@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "hans.valderrama@colcomercio.com.co",
      "alfredoe.ortiz@colcomercio.com.co",
    ],
  },
  {
    name: "Barranquilla",
    to: [
      "AKT.AveriasBarranquilla@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "Melissa.Villa@colcomercio.com.co",
      "saul.herrera@colcomercio.com.co",
    ],
  },
  {
    name: "Sincelejo",
    to: [
      "AKT.AveriasMedellin@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "angelica.ahumada@colcomercio.com.co",
      "Orlando.Kerguelen@colcomercio.com.co",
    ],
  },
  {
    name: "FloridaBlanca",
    to: [
      "AKT.AveriasMedellin@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "juliana.correap@colcomercio.com.co",
      "Javier.Pineres@corbeta.com.co",
    ],
  },
  {
    name: "Manizales y Pereira",
    to: [
      "AKT.AveriasMedellin@colcomercio.com.co",
      "CST correspondiente a cada tienda",
      "Juan.Vasquez@colcomercio.com.co",
      "julian.marin@colcomercio.com.co",
    ],
  },
];

export const ZONE_CC = [
  "Edward.Bejarano@corbeta.com.co",
  "Tienda (coordinador, supervisor, líder, administrador)",
  "Área de inventarios correspondiente a cada tienda",
];

export const PDV_TO = [
  { name: "Angela Giovanna Diaz Bautista", email: "Angela.Diaz@colcomercio.com.co" },
  { name: "Leidy Liliana Bohorquez Cruz", email: "leidy.bohorquez@colcomercio.com.co" },
  { name: "Brigitte Paola Quintero Castro", email: "brigitte.quintero@colcomercio.com.co" },
  { name: "Edward Harbey Bejarano Gomez", email: "Edward.Bejarano@corbeta.com.co" },
];

export const PDV_CC = [
  "Coordinador zonal",
  "CST que apoya a cada PDV",
  "Coordinadora Post Venta",
  "Encargados de la tienda",
];

export const CALIDAD_TO = "akt.averiascalidad@colcomercio.com.co";
export const CALIDAD_CC = [
  "Coordinador comercial zonal",
  "CST que los apoya",
  "Coordinador POST VENTA",
  "Tienda (encargado)",
];
export const CALIDAD_CC_2 = [
  "Edward.Bejarano@corbeta.com.co",
  "Tienda (coordinador, supervisor, líder, administrador)",
  "Área de inventarios correspondiente a cada tienda",
];

export const FORMATO_AVERIAS_COLUMNS = [
  "Fecha",
  "Punto de venta",
  "Centro de servicio",
  "Referencia de la motocicleta y color",
  "Número de chasis",
  "Responsable (Transporte / PDV / Calidad)",
  "Transportadora",
  "Placa",
  "Nº de reporte de inconsistencia",
  "Pieza solicitada",
  "Especifique la novedad (avería)",
  "Cambio, Compra o Reparación",
  "Costo reparación o compra",
  "Domicilios realizados por el CST",
];
