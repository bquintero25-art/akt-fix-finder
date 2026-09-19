import { useState } from "react";
import {
  Camera,
  Clock,
  FileText,
  Mail,
  MapPin,
  Package,
  RefreshCw,
  ShieldCheck,
  Store,
  Truck,
  Users,
  Ban,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CALIDAD_CC,
  CALIDAD_CC_2,
  CALIDAD_TO,
  FORMATO_AVERIAS_COLUMNS,
  PDV_CC,
  PDV_TO,
  ZONES,
  ZONE_CC,
} from "@/lib/averias-data";
import { Alert, Checklist, EmailList, ExampleCards, Section, Steps, SubTitle, toneBg } from "./ui-blocks";

const FIVE_PHOTOS = [
  "Chasis / canuto",
  "Parte averiada",
  "Estado general de la motocicleta",
  "Evidencia de la inconsistencia",
  "Fotografía adicional de soporte",
];

const VALIDATE_CC = (
  <Alert title="⚠️ Antes de enviar">
    Cada asesor debe revisar con la tienda a qué personas debe copiar. En el correo deben informar a{" "}
    <strong>inventarios</strong> para que la moto sea restringida.
  </Alert>
);

export function QueEsSection() {
  return (
    <Section id="que-es" title="¿Qué es una avería?" eyebrow="Información general">
      <p className="max-w-[60ch] text-pretty text-lg text-ink/80">
        Las averías son todas las novedades presentadas en la motocicleta{" "}
        <span className="font-semibold text-ink">antes de que esta sea entregada al cliente.</span>
      </p>
      <SubTitle>¿En qué procesos pueden presentarse?</SubTitle>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { id: "transporte", tone: "transport", label: "En la recepción de motocicletas", tag: "Transporte" },
          { id: "punto-de-venta", tone: "pdv", label: "En el punto de venta", tag: "PDV" },
          { id: "calidad", tone: "quality", label: "En el alistamiento", tag: "Calidad" },
        ].map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="flex items-center gap-3 rounded-xl bg-mist/70 p-3 ring-1 ring-black/5 hover:bg-mist"
          >
            <span className={cn("size-2.5 rounded-full", toneBg[p.tone as "transport"])} />
            <span className="text-sm">
              <span className="block font-semibold">{p.tag}</span>
              <span className="text-ink/70">{p.label}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="mt-5 text-sm text-ink/70">
        El primer paso para reportar una avería es <strong>identificar el tipo</strong>: Transporte, Punto de Venta o Calidad.
      </p>
    </Section>
  );
}

export function TransporteSection() {
  return (
    <Section id="transporte" title="Averías de Transporte" eyebrow="🔵 Transporte" tone="transport" icon={<Truck className="size-6" />}>
      <SubTitle>¿Cuándo es una avería de transporte?</SubTitle>
      <p className="max-w-[60ch] text-pretty text-ink/80">
        Son las novedades que se presentan durante el transporte y que pueden identificarse al momento de{" "}
        <span className="font-semibold text-ink">recibir la motocicleta.</span>
      </p>
      <div className="mt-4">
        <ExampleCards
          tone="transport"
          items={[
            { icon: "💢", label: "Rayones" },
            { icon: "🧩", label: "Faltantes de piezas o accesorios" },
            { icon: "💥", label: "Piezas reventadas" },
            { icon: "↩️", label: "Piezas dobladas" },
          ]}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SubTitle>¿Qué debe hacer el asesor?</SubTitle>
          <Steps
            tone="transport"
            items={[
              "Revisar la motocicleta con el conductor al momento de la recepción.",
              "Identificar cualquier inconsistencia.",
              "Reportarla inmediatamente al conductor.",
              <>
                Diligenciar el{" "}
                <a href="#formato" className="font-semibold text-transport underline-offset-2 hover:underline">
                  FORMATO DE REPORTE DE INCONSISTENCIAS
                </a>
                .
              </>,
              "Obtener la firma del asesor y del conductor.",
              <>
                Tomar las{" "}
                <a href="#evidencias" className="font-semibold text-transport underline-offset-2 hover:underline">
                  evidencias requeridas
                </a>
                .
              </>,
              "Enviar el reporte dentro del plazo establecido.",
            ]}
          />
        </div>
        <div className="space-y-4">
          <Alert title="⏱️ PLAZO PARA REPORTAR: 48 HORAS" icon={<Clock className="size-5" />}>
            Se tiene un plazo de 48 horas para reportar la novedad por correo.
          </Alert>
          <Alert title="⚠️ IMPORTANTE">
            El reporte debe diligenciarse de forma clara. No debe estar sobreescrito ni presentar enmendaduras. Los
            datos deben estar completos y legibles; se escanea y se envía con el resto de las evidencias.
          </Alert>
          <Alert title="Si no se diligencia el reporte o no lo firma el conductor" tone="alert">
            El transportador (que es un tercero) <strong>NO</strong> responderá por la avería y el valor lo tendrá que
            asumir el canal, generando pérdidas económicas. Se iniciará una investigación y el asesor será llamado a
            rendir descargos.
          </Alert>
          <Alert title="Para avería de transporte siempre se solicita por CAMBIO" tone="transport" icon={<RefreshCw className="size-5" />}>
            Ver{" "}
            <a href="#tipo-solicitud" className="font-semibold text-transport underline-offset-2 hover:underline">
              tipos de solicitud
            </a>
            .
          </Alert>
        </div>
      </div>
    </Section>
  );
}

export function FormatoSection() {
  return (
    <Section id="formato" title="Formato de reporte de inconsistencias" eyebrow="📋 Formato" tone="transport" icon={<FileText className="size-6" />}>
      <p className="max-w-[60ch] text-pretty text-ink/80">
        <strong>REPORTE DE INCONSISTENCIAS EN LA RECEPCIÓN DE MOTOCICLETAS AKT.</strong> Se llena con las
        inconsistencias presentadas al momento de la recepción y lo firman quien recibe y el conductor.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <SubTitle>Revisar en presencia del conductor</SubTitle>
          <Checklist
            items={[
              "Cantidad de motocicletas vs. facturas.",
              "Estado físico de la motocicleta.",
              "Numeración de chasis vs. factura, empadronamientos y manuales de garantía.",
              "Cantidad de accesorios y obsequios.",
              "Estado de los accesorios.",
            ]}
          />
          <p className="mt-3 text-sm text-ink/70">
            <strong>NOTA:</strong> Antes de revisar las motocicletas tener en cuenta el estándar de calidad; en caso de
            no tenerlo, solicitarlo al coordinador comercial.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-mist/70 p-4 ring-1 ring-black/5">
            <SubTitle>Datos que se diligencian por cada moto</SubTitle>
            <div className="flex flex-wrap gap-2">
              {["Ref.", "Color", "# de Chasis", "# de Motor", "Inconsistencia (daño, faltó, etc.)"].map((c) => (
                <span key={c} className="rounded-lg bg-surface px-2.5 py-1 text-sm ring-1 ring-black/5">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-ink/70">
              Aplica para inconsistencias con motocicletas, empadronamientos, manuales de garantía, manuales de usuario
              y accesorios (daños, faltantes, sobrantes y documentación errónea).
            </p>
          </div>
          <div className="rounded-2xl bg-mist/70 p-4 ring-1 ring-black/5">
            <SubTitle>Firmas</SubTitle>
            <ul className="space-y-1 text-sm text-ink/80">
              <li>• Encargado de recepción: nombre, firma, fecha y contacto.</li>
              <li>• Transportadora: nombre y firma del conductor, empresa y placa.</li>
            </ul>
          </div>
          <Alert tone="alert" title="Si firmas sin reportar inconsistencias">
            Al firmar sin novedades, se entiende que no se presentó ninguna inconsistencia y{" "}
            <strong>no se aceptará ningún tipo de reclamo.</strong>
          </Alert>
        </div>
      </div>
    </Section>
  );
}

export function EvidenciasSection() {
  return (
    <Section id="evidencias" title="📸 Checklist de evidencias" eyebrow="Evidencias" icon={<Camera className="size-6" />}>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="max-w-[60ch] text-pretty text-ink/80">
            Fotografías del chasis, la inconsistencia / parte averiada y el estado de la motocicleta.
          </p>
          <div className="mt-4">
            <Checklist items={FIVE_PHOTOS} />
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-ink p-6 text-on-color lg:w-56">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-color/60">Mínimo</p>
          <p className="font-display text-6xl font-bold leading-none">5</p>
          <p className="mt-1 font-display text-lg font-semibold">fotografías</p>
          <p className="mt-2 text-sm text-on-color/70">Toda solicitud debe contenerlas.</p>
        </div>
      </div>
    </Section>
  );
}

export function CorreoSection() {
  return (
    <Section id="correo" title="📧 ¿Qué debo adjuntar al correo?" eyebrow="Correo" icon={<Mail className="size-6" />}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <SubTitle>Componentes para el envío correcto</SubTitle>
          <Checklist
            checked
            items={[
              "5 fotografías en el cuerpo del correo y adjuntas",
              "Formato de Excel (Formato de averías)",
              "Formato de inconsistencias",
              "Copia del cuadro en el correo",
              "Copiar a las personas correspondientes",
            ]}
          />
          <p className="mt-3 text-sm text-ink/70">
            Ejemplo de asunto: <span className="font-mono text-xs">REPORTE AVERIA CR4125 EIII CHASIS 9F2D21252VB005371</span>
          </p>
        </div>
        <div className="space-y-4">
          {VALIDATE_CC}
          <Alert tone="pdv" title="Informar a inventarios" icon={<Package className="size-5" />}>
            En el correo se debe informar al área de inventarios para que la motocicleta sea{" "}
            <a href="#rest" className="font-semibold text-pdv underline-offset-2 hover:underline">
              restringida (REST)
            </a>
            .
          </Alert>
          <div className="rounded-2xl bg-mist/70 p-4 ring-1 ring-black/5">
            <SubTitle>Columnas del Formato de averías (Excel)</SubTitle>
            <div className="flex flex-wrap gap-1.5">
              {FORMATO_AVERIAS_COLUMNS.map((c) => (
                <span key={c} className="rounded-md bg-surface px-2 py-1 text-xs ring-1 ring-black/5">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function DestinatariosSection() {
  const [active, setActive] = useState(0);
  const zone = ZONES[active];
  return (
    <Section id="destinatarios" title="📍 ¿A quién envío el reporte?" eyebrow="Destinatarios por zona" tone="transport" icon={<MapPin className="size-6" />}>
      <p className="text-sm text-ink/70">Selecciona tu zona para ver los destinatarios exactos.</p>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Zonas">
        {ZONES.map((z, i) => (
          <button
            key={z.name}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              i === active
                ? "bg-transport text-on-color shadow-md shadow-transport/25"
                : "bg-surface text-ink/70 ring-1 ring-black/10 hover:bg-mist",
            )}
          >
            {z.name}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-transport/5 p-4 ring-1 ring-transport/20">
          <p className="mb-2 font-display text-lg font-semibold text-transport">{zone.name}</p>
          <EmailList label="Para" items={zone.to} />
        </div>
        <div className="rounded-2xl bg-mist/70 p-4 ring-1 ring-black/5">
          <EmailList label="En copia" items={ZONE_CC} />
        </div>
      </div>
      <div className="mt-4">{VALIDATE_CC}</div>
    </Section>
  );
}

export function PuntoDeVentaSection() {
  return (
    <Section id="punto-de-venta" title="Averías de Punto de Venta" eyebrow="🟠 Punto de venta" tone="pdv" icon={<Store className="size-6" />}>
      <p className="max-w-[60ch] text-pretty text-ink/80">
        Son las novedades que se presentan en el punto de venta (PDV), ya sea por manipulación, errores en la recepción,
        faltantes de accesorios, daños en ausencia del asesor, eventos comerciales, entre otros.
      </p>
      <div className="mt-4">
        <ExampleCards
          tone="pdv"
          items={[
            { icon: "🙋", label: "Daños ocasionados por el cliente" },
            { icon: "🧩", label: "Faltantes de partes o accesorios en el PDV" },
            { icon: "🤲", label: "Daños por manipulación" },
            { icon: "📦", label: "Errores en la recepción" },
            { icon: "🕒", label: "Situaciones en ausencia del asesor" },
            { icon: "🎪", label: "Eventos comerciales" },
          ]}
        />
      </div>
      <div className="mt-6">
        <Alert title="IMPORTANTE">
          Todas las inconsistencias que no tengan un soporte y no sean por defectos de calidad, deben ser asumidas por
          el PDV o aprobadas por el coordinador comercial de cada zona.
        </Alert>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SubTitle>Qué debe llevar el correo</SubTitle>
          <Checklist
            checked
            items={[
              "Las 5 fotografías adjuntas",
              "Formato de averías (Excel) adjunto",
              "Cuadro con la novedad: fecha, PDV, centro de servicio, referencia, chasis, responsable (PDV), pieza solicitada, novedad, tipo de solicitud",
            ]}
          />
          <p className="mt-3 text-sm text-ink/70">
            Ver{" "}
            <a href="#evidencias" className="font-semibold text-pdv underline-offset-2 hover:underline">
              checklist de evidencias
            </a>{" "}
            y{" "}
            <a href="#correo" className="font-semibold text-pdv underline-offset-2 hover:underline">
              qué adjuntar al correo
            </a>
            .
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-pdv/5 p-4 ring-1 ring-pdv/20">
            <SubTitle>Se debe enviar correo a</SubTitle>
            <ul className="space-y-1.5">
              {PDV_TO.map((p) => (
                <li key={p.email} className="rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-black/5">
                  <span className="block font-medium">{p.name}</span>
                  <a href={`mailto:${p.email}`} className="break-all text-transport underline-offset-2 hover:underline">
                    {p.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-mist/70 p-4 ring-1 ring-black/5">
            <EmailList label="Copia a" items={PDV_CC} />
          </div>
          {VALIDATE_CC}
        </div>
      </div>
    </Section>
  );
}

export function CalidadSection() {
  return (
    <Section id="calidad" title="Averías de Calidad" eyebrow="🟢 Calidad" tone="quality" icon={<ShieldCheck className="size-6" />}>
      <p className="max-w-[60ch] text-pretty text-ink/80">
        Son las novedades presentadas durante el proceso de <strong>alistamiento</strong> que afectan el funcionamiento
        mecánico de la motocicleta o temas referentes a calidad.
      </p>
      <div className="mt-4">
        <ExampleCards
          tone="quality"
          items={[
            { icon: "⛽", label: "Fallas en la carburación" },
            { icon: "💧", label: "Fugas" },
            { icon: "🔧", label: "Fallas mecánicas del motor" },
            { icon: "⚡", label: "Fallas eléctricas" },
            { icon: "🟤", label: "Presencia de óxido en las piezas" },
            { icon: "🔩", label: "Incorrecto ensamble de piezas" },
          ]}
        />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SubTitle>Procedimiento</SubTitle>
          <Steps
            tone="quality"
            items={[
              "Identificar la falla durante el alistamiento.",
              "Tomar las 5 fotografías y diligenciar el formato de Excel.",
              "Enviar el correo con las 5 fotos, el formato de Excel y el cuadro de la novedad.",
              "Informar a inventarios para que la moto quede en REST.",
            ]}
          />
          <p className="mt-3 text-sm text-ink/70">
            Ejemplo de cuadro: fecha, punto de venta, centro de servicio, referencia, color, chasis, responsabilidad
            (CALIDAD), pieza solicitada, novedad, cambio / compra / reparación, costo y domicilio.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-quality/5 p-4 ring-1 ring-quality/20">
            <p className="mb-2 font-display text-lg font-semibold text-quality">Nivel nacional (menos Bogotá)</p>
            <EmailList label="Enviar correo a" items={[CALIDAD_TO]} />
            <div className="mt-3">
              <EmailList label="Con copia a" items={CALIDAD_CC} />
            </div>
          </div>
          <div className="rounded-2xl bg-mist/70 p-4 ring-1 ring-black/5">
            <EmailList label="En copia" items={CALIDAD_CC_2} />
          </div>
          {VALIDATE_CC}
        </div>
      </div>
    </Section>
  );
}

export function TipoSolicitudSection() {
  const cards = [
    {
      title: "CAMBIO",
      tone: "transport" as const,
      text: "Se solicita cuando el CST de servicio no cuenta con el repuesto y este es enviado directamente desde la ensambladora.",
      note: "Para avería de transporte siempre se solicita por CAMBIO.",
    },
    {
      title: "COMPRA",
      tone: "pdv" as const,
      text: "Cuando el CST cuenta con la pieza y tiene buen inventario del repuesto. Siempre se deben validar los precios para establecer los costos en el formato de inconsistencias.",
    },
    {
      title: "REPARACIÓN",
      tone: "quality" as const,
      text: "Solicitud de domicilios e instalación de maleteros.",
    },
  ];
  return (
    <Section id="tipo-solicitud" title="🔄 ¿Qué tipo de solicitud debo hacer?" eyebrow="Cambio · Compra · Reparación" icon={<RefreshCw className="size-6" />}>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="overflow-hidden rounded-2xl bg-surface ring-1 ring-black/5">
            <div className={cn("h-2", toneBg[c.tone])} />
            <div className="p-5">
              <p className="font-display text-xl font-bold tracking-tight">{c.title}</p>
              <p className="mt-2 text-sm text-ink/75">{c.text}</p>
              {c.note && <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-transport">{c.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ResponsablesSection() {
  return (
    <Section id="responsables" title="👥 Responsables" eyebrow="¿Quién monta y quién hace seguimiento?" icon={<Users className="size-6" />}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-ink p-5 text-on-color lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-color/60">¿Quién monta la avería?</p>
          <p className="mt-2 font-display text-2xl font-bold leading-tight">La tienda donde la moto está física.</p>
        </div>
        <div className="lg:col-span-2">
          <Steps
            tone="neutral"
            items={[
              "El asesor vendedor registrado en SIGA debe solicitar a su compañero el número de la avería y hacer seguimiento.",
              "Los dos asesores son responsables del seguimiento y gestión de la avería.",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

const REST_FLOW = [
  "AVERÍA DETECTADA",
  "REPORTAR",
  "SOLICITAR RESTRICCIÓN",
  "INFORMAR A INVENTARIOS",
  "VALIDAR ESTADO REST",
  "HACER SEGUIMIENTO HASTA SOLUCIÓN",
];

export function RestSection() {
  return (
    <Section id="rest" title="🚫 Motos restringidas – REST" eyebrow="🔴 Crítico" tone="alert" icon={<Ban className="size-6" />}>
      <p className="max-w-[60ch] text-pretty text-ink/80">
        Todas las motocicletas que presenten algún tipo de avería, <strong>sin importar su naturaleza</strong>, deben
        ser enviadas a restricción (REST). La solicitud se comunica a los coordinadores de inventario de la tienda
        donde la moto se encuentre física.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ol className="flex flex-col items-stretch">
          {REST_FLOW.map((step, i) => (
            <li key={step} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-full rounded-xl px-4 py-3 text-center font-display text-sm font-bold tracking-wide ring-1",
                  i === 2 || i === 4 ? "bg-alert text-on-color ring-alert" : "bg-surface text-ink ring-black/5",
                )}
              >
                {step}
              </div>
              {i < REST_FLOW.length - 1 && <ArrowDown className="my-1 size-4 text-ink/40" />}
            </li>
          ))}
        </ol>
        <div className="space-y-4">
          <Alert title="Objetivo">
            Evitar que una motocicleta con avería sea solicitada por otra tienda o que, por error, se venda a un
            cliente cuando no se encuentra en condiciones óptimas.
          </Alert>
          <Alert tone="neutral" title="Responsabilidad del asesor" icon={<Users className="size-5" />}>
            El asesor es responsable de hacer el seguimiento y verificar que la moto quede correctamente ubicada en el
            inventario con estado <strong>REST</strong>.
          </Alert>
        </div>
      </div>
    </Section>
  );
}
