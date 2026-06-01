
import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const categories = [
  { id:'AM', title:'Permiso AM', group:'Motos', desc:'Ciclomotores y circulación básica.' },
  { id:'A1', title:'Permiso A1', group:'Motos', desc:'Motocicletas ligeras y seguridad en dos ruedas.' },
  { id:'A2', title:'Permiso A2', group:'Motos', desc:'Motocicletas de potencia media.' },
  { id:'A', title:'Permiso A', group:'Motos', desc:'Motocicletas sin limitación.' },
  { id:'B', title:'Permiso B', group:'Turismos', desc:'Turismos, señales, cruces y seguridad vial.' },
  { id:'B96', title:'Autorización B96', group:'Remolques', desc:'Conjuntos con remolque.' },
  { id:'BE', title:'Permiso B+E', group:'Remolques', desc:'Turismos con remolque pesado.' },
  { id:'C1', title:'Permiso C1', group:'Mercancías', desc:'Camiones ligeros.' },
  { id:'C1E', title:'Permiso C1+E', group:'Mercancías', desc:'Camión ligero con remolque.' },
  { id:'C', title:'Permiso C', group:'Mercancías', desc:'Camiones.' },
  { id:'CE', title:'Permiso C+E', group:'Mercancías', desc:'Camiones con remolque.' },
  { id:'D1', title:'Permiso D1', group:'Viajeros', desc:'Microbuses.' },
  { id:'D1E', title:'Permiso D1+E', group:'Viajeros', desc:'Microbuses con remolque.' },
  { id:'D', title:'Permiso D', group:'Viajeros', desc:'Autobuses.' },
  { id:'DE', title:'Permiso D+E', group:'Viajeros', desc:'Autobuses con remolque.' },
  { id:'ADR', title:'ADR', group:'Profesionales', desc:'Mercancías peligrosas.' },
  { id:'CAP', title:'CAP', group:'Profesionales', desc:'Cualificación profesional.' },
]

function Car({x=40,y=140,color='#7aa38d',scale=1}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><rect width="70" height="34" rx="9" fill={color}/><rect x="15" y="-15" width="36" height="18" rx="6" fill="#d8e2e2"/><circle cx="16" cy="38" r="8" fill="#1f2826"/><circle cx="54" cy="38" r="8" fill="#1f2826"/></g>}
function Moto({x=120,y=145,scale=1}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><circle cx="0" cy="35" r="14" fill="#1f2826"/><circle cx="62" cy="35" r="14" fill="#1f2826"/><path d="M0 35 L28 7 L62 35 M25 8 L43 -15" stroke="#7aa38d" strokeWidth="9" fill="none" strokeLinecap="round"/><circle cx="50" cy="-28" r="11" fill="#d98d68"/><path d="M42 -18 L24 8" stroke="#24332f" strokeWidth="7" strokeLinecap="round"/></g>}
function Truck({x=65,y=125,trailer=false}){return <g transform={`translate(${x} ${y})`}>{trailer&&<rect x="-68" y="0" width="80" height="42" rx="6" fill="#a8bdb1"/>}<rect x="12" y="-7" width="120" height="55" rx="8" fill="#7aa38d"/><rect x="132" y="13" width="54" height="35" rx="8" fill="#d8e2e2"/><circle cx="36" cy="53" r="11" fill="#1f2826"/><circle cx="145" cy="53" r="11" fill="#1f2826"/></g>}
function Bus({x=42,y=125}){return <g transform={`translate(${x} ${y})`}><rect width="190" height="56" rx="12" fill="#7aa38d"/>{[18,58,98,138].map((n,i)=><rect key={i} x={n} y="12" width="30" height="18" rx="4" fill="#d8e2e2"/>)}<rect x="160" y="12" width="20" height="44" fill="#eef4ef"/><circle cx="35" cy="61" r="10" fill="#1f2826"/><circle cx="158" cy="61" r="10" fill="#1f2826"/></g>}
function Person({x=250,y=118}){return <g transform={`translate(${x} ${y})`}><circle r="9" fill="#24332f"/><path d="M0 10 v28 m0-13 l-16 12 m16-12 l16 12" stroke="#24332f" strokeWidth="5" strokeLinecap="round"/></g>}
const REAL_SIGN_IMAGES = {
  speed20:'/signs/speed20.svg',
  speed30:'/signs/speed30.svg',
  speed50:'/signs/speed50.svg',
  speed70:'/signs/speed70.svg',
  speed90:'/signs/speed90.svg',
  speed120:'/signs/speed120.svg',
  stop:'/signs/stop.svg',
  yield:'/signs/yield.svg',
  noEntry:'/signs/noEntry.svg',
  mandatoryRight:'/signs/mandatoryRight.svg',
  roundabout:'/signs/roundabout.svg',
  parking:'/signs/parking.svg',
  slippery:'/signs/slippery.svg',
  school:'/signs/school.svg',
  works:'/signs/works.svg',
  trafficLight:'/signs/trafficLight.svg',
  bike:'/signs/bike.svg',
  pedestrian:'/signs/pedestrian.svg'
}

function Sign({kind='danger',x=180,y=62}) {
 if(['speed30','speed50','speed90'].includes(kind)) return <g transform={`translate(${x} ${y})`}><circle r="38" fill="white" stroke="#c43131" strokeWidth="10"/><text y="12" textAnchor="middle" fontSize="34" fontWeight="800">{kind.replace('speed','')}</text></g>
 if(kind==='yield') return <g transform={`translate(${x} ${y})`}><polygon points="0,42 42,-30 -42,-30" fill="white" stroke="#c43131" strokeWidth="9"/><text y="7" textAnchor="middle" fontSize="15" fontWeight="900">CEDA</text></g>
 if(kind==='stop') return <g transform={`translate(${x} ${y})`}><polygon points="-22,-38 22,-38 38,-22 38,22 22,38 -22,38 -38,22 -38,-22" fill="#c43131"/><text y="9" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">STOP</text></g>
 if(kind==='noRight') return <g transform={`translate(${x} ${y})`}><circle r="38" fill="white" stroke="#c43131" strokeWidth="10"/><path d="M-12 14 L13 -12 H-2" stroke="#111" strokeWidth="8" fill="none"/><path d="M-24 24 L24 -24" stroke="#c43131" strokeWidth="9"/></g>
 if(kind==='mandatoryRight') return <g transform={`translate(${x} ${y})`}><circle r="38" fill="#2457a6"/><path d="M-14 18 L15 0 L-14 -18" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/></g>
 if(kind==='noEntry') return <g transform={`translate(${x} ${y})`}><circle r="38" fill="#c43131"/><rect x="-26" y="-7" width="52" height="14" rx="4" fill="white"/></g>
 if(kind==='bus') return <g transform={`translate(${x} ${y})`}><rect x="-38" y="-28" width="76" height="56" rx="8" fill="#2457a6"/><text y="8" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">BUS</text></g>
 if(kind==='adr') return <g transform={`translate(${x} ${y})`}><rect x="-38" y="-24" width="76" height="48" fill="#f47b20" stroke="#111" strokeWidth="4"/><text y="-3" textAnchor="middle" fontSize="18" fontWeight="900">33</text><text y="17" textAnchor="middle" fontSize="16" fontWeight="900">1203</text></g>
 return <g transform={`translate(${x} ${y})`}><polygon points="0,-42 42,34 -42,34" fill="white" stroke="#c43131" strokeWidth="9"/><text y="25" textAnchor="middle" fontSize="42" fontWeight="900">!</text></g>
}
function Scene({scene='road',sign='danger'}) {
 return <svg viewBox="0 0 360 240" className="scene" role="img">
  {scene==='sign'&&<><rect width="360" height="240" rx="22" fill="#f6f1e7"/><rect y="150" width="360" height="90" fill="#b8c9bb"/><line x1="180" y1="64" x2="180" y2="155" stroke="#56615c" strokeWidth="8"/>{REAL_SIGN_IMAGES[sign]?<foreignObject x="130" y="15" width="100" height="100"><img src={REAL_SIGN_IMAGES[sign]} style={{width:'100%',height:'100%',objectFit:'contain'}}/></foreignObject>:<Sign kind={sign}/>}<Car x={55} y={166}/><Car x={230} y={166} color="#d98d68"/></>}
  {scene==='crossing'&&<><rect width="360" height="240" rx="22" fill="#eef4ef"/><rect y="105" width="360" height="82" fill="#5c6361"/>{[0,1,2,3,4,5].map(i=><rect key={i} x={132+i*18} y="98" width="9" height="96" fill="#fff"/>)}<Car x={35} y={122}/><Person x={245} y={108}/></>}
  {scene==='urban'&&<><rect width="360" height="240" rx="22" fill="#eef4ef"/><rect y="105" width="360" height="82" fill="#5c6361"/><line x1="0" y1="146" x2="360" y2="146" stroke="#e9dc86" strokeWidth="4" strokeDasharray="24 16"/><Car x={60} y={122}/><Car x={228} y={127} color="#d98d68"/></>}
  {scene==='road'&&<><rect width="360" height="240" rx="22" fill="#eaf2ee"/><path d="M130 240 L165 70 H195 L230 240" fill="#5c6361"/><path d="M180 88 L180 236" stroke="#e9dc86" strokeWidth="5" strokeDasharray="22 14"/><Car x={136} y={145}/></>}
  {scene==='rain'&&<><rect width="360" height="240" rx="22" fill="#dbe6e6"/><rect y="135" width="360" height="105" fill="#53605e"/><path d="M145 135 L100 240 M205 135 L258 240" stroke="#ece8cf" strokeWidth="5"/>{[35,80,130,190,250,315].map((x,i)=><line key={i} x1={x} y1="15" x2={x-18} y2="65" stroke="#8da1a2" strokeWidth="4"/>)}<Car x={134} y={158}/></>}
  {scene==='night'&&<><rect width="360" height="240" rx="22" fill="#17211f"/><path d="M130 240 L164 92 H196 L232 240" fill="#3d4543"/><path d="M180 106 L180 236" stroke="#e9dc86" strokeWidth="5" strokeDasharray="20 14"/><Car x={210} y={136} color="#6f8e83"/><polygon points="210,155 70,115 70,195" fill="#fff6b5" opacity=".38"/></>}
  {scene==='moto'&&<><rect width="360" height="240" rx="22" fill="#eef4ef"/><path d="M-25 220 C62 120 140 105 230 54 C280 25 325 20 380 18" fill="none" stroke="#5c6361" strokeWidth="78"/><path d="M-25 220 C62 120 140 105 230 54 C280 25 325 20 380 18" fill="none" stroke="#e9dc86" strokeWidth="4" strokeDasharray="22 16"/><Moto x={130} y={130}/></>}
  {scene==='truck'&&<><rect width="360" height="240" rx="22" fill="#f2efe7"/><rect y="158" width="360" height="82" fill="#5c6361"/><Truck x={50} y={105}/><Car x={236} y={132} color="#d98d68" scale=".75"/></>}
  {scene==='bus'&&<><rect width="360" height="240" rx="22" fill="#eef4ef"/><rect y="155" width="360" height="85" fill="#5c6361"/><Bus x={38} y={116}/><Person x={292} y={136}/></>}
  {scene==='adr'&&<><rect width="360" height="240" rx="22" fill="#f6f1e7"/><rect y="165" width="360" height="75" fill="#5c6361"/><Truck x={72} y={105}/><Sign kind="adr" x={180} y={124}/></>}
  {scene==='trailer'&&<><rect width="360" height="240" rx="22" fill="#e9f0ef"/><rect y="150" width="360" height="90" fill="#5c6361"/><Truck x={100} y={106} trailer/><path d="M40 70 C105 40 134 95 196 62" stroke="#6b909d" strokeWidth="8" fill="none" strokeLinecap="round"/></>}
 </svg>
}

const questionBank = [
{scene:'sign',sign:'speed30',tags:['B','AM','A1','A2','A'],q:'En una calle de un solo carril por sentido ves una señal de 30 y, unos metros después, niños cerca de la acera. ¿Cuál es la actuación más correcta?',o:['Circular como máximo a 30 y aumentar la vigilancia lateral','Mantener 50 porque la señal solo afecta a la zona escolar si hay niños cruzando','Circular a 30 solo si hay un paso de peatones pintado'],c:0,e:'La limitación se aplica desde la señal y la presencia de niños exige anticipación.'},
{scene:'sign',sign:'speed50',tags:['B','AM','A1','A2','A','C','D'],q:'Tras una señal de velocidad máxima de 50, la vía parece despejada y ancha. ¿Puedes superar ese límite para adaptarte al ritmo del tráfico?',o:['No, la señal fija una velocidad máxima aunque la vía parezca despejada','Sí, si no hay peatones ni cruces próximos','Sí, pero solo para adelantar'],c:0,e:'La velocidad máxima señalizada no se puede superar salvo supuestos legalmente previstos.'},
{scene:'sign',sign:'yield',tags:['B','AM','A1','A2','A','C','D'],q:'Llegas a un ceda el paso con buena visibilidad. Se aproxima un vehículo por la vía preferente, pero aún está lejos. ¿Qué debes hacer?',o:['No obligarle a frenar ni cambiar trayectoria; si puedes incorporarte sin afectarle, puedes continuar','Detenerte siempre durante varios segundos','Entrar siempre porque el ceda no obliga a detenerse'],c:0,e:'El ceda no exige parar siempre, pero sí ceder si puedes interferir.'},
{scene:'sign',sign:'stop',tags:['B','AM','A1','A2','A','C','D'],q:'En un STOP tienes visibilidad completa antes de la línea de detención. ¿Cómo debes actuar?',o:['Detener el vehículo obligatoriamente y después reanudar si es seguro','Reducir mucho la velocidad sin llegar a detenerme si no viene nadie','Detenerme solo si hay vehículos en la vía transversal'],c:0,e:'El STOP obliga a detenerse, aunque exista visibilidad.'},
{scene:'sign',sign:'noRight',tags:['B','AM','A1','A2','A'],q:'Tu navegador te indica girar a la derecha, pero una señal vertical lo prohíbe. ¿Qué prevalece?',o:['La señal de tráfico; debo buscar otro itinerario','El navegador si la ruta es más corta','Mi intención si señalizo con antelación'],c:0,e:'Las instrucciones del navegador no prevalecen sobre la señalización.'},
{scene:'sign',sign:'mandatoryRight',tags:['B','AM','A1','A2','A'],q:'Una señal circular azul obliga a seguir una dirección, pero hay una calle alternativa sin señal. ¿Qué debes hacer?',o:['Seguir la dirección obligatoria indicada por la señal','Elegir cualquiera de las dos calles si no hay tráfico','Seguir recto si voy hacia una emergencia personal'],c:0,e:'La señal de obligación determina la dirección permitida.'},
{scene:'sign',sign:'noEntry',tags:['B','AM','A1','A2','A','C','D'],q:'Ves una señal de entrada prohibida en una calle aparentemente vacía. ¿Puedes entrar marcha atrás unos metros para estacionar?',o:['No, la señal prohíbe la entrada por ese acceso','Sí, porque no circulo hacia delante','Sí, si solo son unos metros'],c:0,e:'La prohibición afecta a entrar en la vía por ese punto.'},
{scene:'sign',sign:'danger',tags:['B','AM','A1','A2','A','C','D'],q:'Una señal de peligro aparece antes de un tramo donde no ves aún el obstáculo. ¿Qué debes hacer?',o:['Adaptar la velocidad antes de llegar al peligro','Esperar a ver el peligro para frenar','Mantener velocidad porque solo informa'],c:0,e:'La señal advierte con antelación para poder adaptar la conducción.'},

{scene:'crossing',tags:['B','AM','A1','A2','A','D'],q:'Te acercas a un paso de peatones. Un turismo estacionado tapa parte de la acera y ves una sombra moverse detrás. ¿Qué es más seguro?',o:['Reducir y prepararme para detenerme aunque todavía no vea al peatón completo','Mantener velocidad hasta confirmar que el peatón pisa la calzada','Cambiar de carril sin reducir'],c:0,e:'La falta de visibilidad obliga a anticipar la posible aparición de peatones.'},
{scene:'crossing',tags:['B','D','CAP'],q:'Giras a la derecha y un peatón cruza la calle a la que vas a entrar. El semáforo para vehículos está verde. ¿Qué debes hacer?',o:['Ceder el paso al peatón si cruza correctamente','Pasar porque mi semáforo está verde','Acelerar para terminar el giro antes'],c:0,e:'Al girar debe respetarse la prioridad de los peatones que cruzan.'},
{scene:'urban',tags:['B','AM','A1','A2','A'],q:'Circulas por ciudad junto a una fila de coches aparcados. Una persona se sienta en el asiento del conductor de uno de ellos. ¿Qué riesgo debes prever?',o:['Que abra la puerta o inicie la marcha sin verte','Ninguno si aún no ha arrancado','Que siempre esperará a que pase todo el tráfico'],c:0,e:'La conducción preventiva exige interpretar indicios y dejar margen.'},
{scene:'urban',tags:['B'],q:'Un ciclista circula por delante, la calle se estrecha y no puedes dejar separación lateral suficiente. ¿Qué debes hacer?',o:['Esperar detrás hasta poder adelantar con seguridad','Adelantar despacio aunque pases muy cerca','Tocar el claxon para que se suba a la acera'],c:0,e:'No debe adelantarse a usuarios vulnerables sin distancia suficiente.'},
{scene:'urban',tags:['B'],q:'Un balón rueda hacia la calzada desde entre dos coches estacionados. ¿Qué interpretación es más prudente?',o:['Puede salir un niño detrás y debo reducir de inmediato','No hay peligro si todavía no veo a nadie','Solo debo esquivar el balón'],c:0,e:'Los indicios permiten anticipar situaciones de riesgo.'},

{scene:'road',tags:['B','A1','A2','A','C','D','CAP'],q:'Circulas detrás de un vehículo pesado que tapa la visibilidad. Quieres adelantar y la línea es discontinua. ¿Qué falta para iniciar la maniobra?',o:['Visibilidad suficiente del sentido contrario y seguridad para completar el adelantamiento','Que el vehículo pesado circule lento','Que no venga nadie justo pegado detrás de mí'],c:0,e:'La línea discontinua no basta; la maniobra debe poder hacerse con seguridad.'},
{scene:'road',tags:['B','A1','A2','A','C','D'],q:'Un vehículo mantiene velocidad baja en una carretera convencional, pero se aproxima una curva sin visibilidad. ¿Qué debes hacer?',o:['Esperar; no iniciar el adelantamiento si no ves suficiente','Adelantar rápido aprovechando que va lento','Pegarme mucho para salir antes'],c:0,e:'La falta de visibilidad impide adelantar con seguridad.'},
{scene:'road',tags:['B','C','D','CAP'],q:'En una bajada prolongada notas olor a freno después de frenar mucho. ¿Qué actuación preventiva era la adecuada?',o:['Usar una marcha apropiada y freno motor o auxiliar para no sobrecalentar frenos','Bajar en punto muerto para no forzar el motor','Frenar de forma continua pero suave todo el tiempo'],c:0,e:'El freno continuo puede provocar pérdida de eficacia.'},
{scene:'road',tags:['B','AM','A1','A2','A','C','D'],q:'Vas a cambiar de carril en una vía con varios carriles. Miras el espejo y ves un vehículo acercándose rápido por el carril destino. ¿Qué debes hacer?',o:['No iniciar el cambio hasta que no obligue a modificar su velocidad o trayectoria','Señalizar y cambiar porque ya he avisado','Cambiar si el otro vehículo supera el límite'],c:0,e:'Señalizar no concede prioridad para realizar la maniobra.'},
{scene:'road',tags:['B','C','D'],q:'Llevas carga en el maletero y parte sobresale o puede desplazarse en una frenada. ¿Qué debes comprobar?',o:['Que la carga esté sujeta y no comprometa estabilidad, visibilidad ni seguridad','Solo que el portón pueda cerrar parcialmente','Que el peso no moleste al acompañante'],c:0,e:'La carga debe ir colocada y sujeta para no generar peligro.'},

{scene:'rain',tags:['B','AM','A1','A2','A','C','D','CAP'],q:'Comienza a llover después de muchos días secos. ¿Por qué puede ser especialmente peligrosa la calzada?',o:['Porque el agua se mezcla con polvo y grasa y reduce la adherencia','Porque los neumáticos se enfrían y frenan mejor','Porque las marcas viales dejan de existir legalmente'],c:0,e:'Las primeras gotas pueden formar una película resbaladiza.'},
{scene:'rain',tags:['B','AM','A1','A2','A'],q:'Al pasar por una zona encharcada notas que el volante pierde respuesta. ¿Qué debes evitar?',o:['Frenar o girar bruscamente','Levantar el pie suavemente del acelerador','Sujetar el volante con firmeza pero sin brusquedad'],c:0,e:'En aquaplaning las maniobras bruscas agravan la pérdida de control.'},
{scene:'rain',tags:['B','C','D','CAP'],q:'Con niebla densa, otro vehículo te sigue muy cerca. ¿Qué combinación es más segura?',o:['Aumentar suavemente la distancia con el de delante y evitar frenazos bruscos','Acelerar para alejarte del que va detrás','Encender las luces largas permanentemente'],c:0,e:'Hay que compensar la falta de visibilidad y evitar maniobras inesperadas.'},
{scene:'night',tags:['B','A1','A2','A','C','D','CAP'],q:'De noche un vehículo de frente te deslumbra. ¿Qué debes hacer?',o:['Evitar mirar directamente a sus luces, guiarte por el borde derecho y reducir si es necesario','Responder con luces largas hasta que las quite','Cerrar los ojos un instante para no deslumbrarte'],c:0,e:'Mirar al borde derecho ayuda a mantener la trayectoria.'},

{scene:'moto',tags:['AM','A1','A2','A'],q:'En moto entras en una curva y ves gravilla en la trayectoria. ¿Qué combinación es más segura?',o:['Reducir suavemente, evitar inclinación excesiva y no frenar bruscamente','Frenar fuerte dentro de la curva','Acelerar para pasar la zona cuanto antes'],c:0,e:'La moto es muy sensible a pérdidas de adherencia.'},
{scene:'moto',tags:['AM','A1','A2','A'],q:'Tu pasajero en motocicleta lleva casco sin abrochar. ¿Puedes iniciar la marcha?',o:['No, el casco debe ir correctamente abrochado','Sí, si el trayecto es urbano','Sí, porque la responsabilidad es del pasajero'],c:0,e:'El casco mal abrochado puede no proteger.'},
{scene:'moto',tags:['AM','A1','A2','A'],q:'Circulas en moto por ciudad entre vehículos. ¿Qué situación debes evitar especialmente?',o:['Permanecer en ángulos muertos o junto a puertas de vehículos estacionados','Circular visible y con distancia','Mantener una trayectoria previsible'],c:0,e:'La visibilidad de la moto es menor y el motorista es vulnerable.'},
{scene:'moto',tags:['AM','A1','A2','A'],q:'En una frenada de emergencia con motocicleta, lo más adecuado es...',o:['Frenar de forma progresiva y controlada, evitando bloquear ruedas','Usar solo el freno delantero siempre al máximo','Soltar el manillar para no caer'],c:0,e:'La frenada debe mantener estabilidad y adherencia.'},

{scene:'trailer',tags:['B96','BE','C1E','CE','D1E','DE'],q:'Llevas remolque y al adelantar a un camión notas balanceo por viento lateral. ¿Qué debes hacer?',o:['Reducir suavemente la velocidad y evitar volantazos','Acelerar para tensar el conjunto','Frenar bruscamente para detener el balanceo'],c:0,e:'Con remolque las correcciones deben ser suaves.'},
{scene:'trailer',tags:['B96','BE','C1E','CE','D1E','DE'],q:'Antes de circular con remolque, el enganche está correcto pero una luz trasera del remolque no funciona. ¿Qué debes hacer?',o:['No iniciar el viaje hasta corregir la iluminación','Circular de día porque no se usan luces','Poner las luces de emergencia todo el trayecto'],c:0,e:'El remolque debe estar correctamente señalizado e iluminado.'},
{scene:'trailer',tags:['B96','BE','C1E','CE','D1E','DE'],q:'Una carga muy atrasada en el remolque puede provocar...',o:['Oscilaciones e inestabilidad del conjunto','Más adherencia en el eje delantero del turismo','Mejor capacidad de frenado'],c:0,e:'La distribución de carga influye en la estabilidad.'},

{scene:'truck',tags:['C1','C1E','C','CE','CAP'],q:'Conduces un camión y vas a girar a la derecha en ciudad. ¿Qué riesgo es especialmente importante?',o:['Ángulos muertos con ciclistas o peatones junto al lateral','Que el camión siempre tiene prioridad por tamaño','Que no es necesario abrirse para girar'],c:0,e:'Los vehículos grandes tienen ángulos muertos laterales importantes.'},
{scene:'truck',tags:['C1','C1E','C','CE','CAP'],q:'Una carga líquida parcialmente llena puede afectar al vehículo porque...',o:['El movimiento del líquido puede desestabilizar en frenadas y curvas','Siempre mejora la estabilidad','El líquido no afecta a la conducción'],c:0,e:'El desplazamiento de masas altera la estabilidad.'},
{scene:'truck',tags:['C1','C1E','C','CE','CAP'],q:'En un vehículo pesado, aproximarse demasiado al vehículo anterior es especialmente peligroso porque...',o:['La distancia de frenado puede ser mayor y la masa aumenta las consecuencias','El camión frena siempre antes que un turismo','Los frenos eliminan la necesidad de distancia'],c:0,e:'La masa aumenta la energía a disipar.'},

{scene:'bus',tags:['D1','D1E','D','DE','CAP'],q:'Un pasajero está de pie cerca de la puerta mientras el autobús se aproxima a una parada. ¿Qué conducción es más adecuada?',o:['Anticipar, frenar suavemente y evitar maniobras bruscas','Frenar tarde para llegar antes','Abrir la puerta antes de detenerse'],c:0,e:'La comodidad y seguridad de los pasajeros son prioritarias.'},
{scene:'bus',tags:['D1','D1E','D','DE','CAP'],q:'Al salir de una parada, has señalizado pero un turismo ya circula por el carril. ¿Qué debes hacer?',o:['Comprobar que la incorporación puede hacerse sin peligro','Incorporarte porque señalizar siempre da prioridad','Cerrar la trayectoria al turismo'],c:0,e:'La señalización no autoriza a crear peligro.'},
{scene:'bus',tags:['D1','D1E','D','DE','CAP'],q:'En transporte de viajeros, una distracción breve del conductor es especialmente grave porque...',o:['Afecta a muchas personas y aumenta el riesgo colectivo','Solo afecta al conductor','Se compensa con el tamaño del vehículo'],c:0,e:'El transporte colectivo exige máxima atención.'},

{scene:'adr',tags:['ADR'],q:'Transportas mercancías peligrosas y detectas olor extraño al detenerte. ¿Qué debe primar?',o:['Autoprotección, alejar personas y avisar según procedimiento','Abrir el recipiente para comprobar el contenido','Continuar si queda poco trayecto'],c:0,e:'En ADR la prioridad es proteger y avisar.'},
{scene:'adr',tags:['ADR'],q:'El panel naranja está sucio y no se lee bien. ¿Qué problema genera?',o:['Dificulta la identificación del riesgo en caso de emergencia','No importa si el conductor conoce la carga','Solo afecta de noche'],c:0,e:'La señalización visible es esencial para emergencias.'},
{scene:'adr',tags:['ADR'],q:'Durante una operación con mercancías peligrosas, fumar cerca del vehículo...',o:['Puede estar prohibido y generar riesgo grave','Es útil para detectar fugas','Solo está prohibido si hay lluvia'],c:0,e:'Puede existir riesgo de incendio, explosión o intoxicación.'},

{scene:'urban',tags:['B','C','D','CAP'],q:'Se aproxima una ambulancia con señales luminosas y acústicas. Estás en un cruce congestionado. ¿Qué debes hacer?',o:['Facilitar el paso en cuanto puedas sin crear otro peligro','Subirte al bordillo aunque haya peatones','Frenar en seco en mitad del cruce siempre'],c:0,e:'Hay que facilitar el paso, pero sin generar nuevos riesgos.'},
{scene:'road',tags:['B','AM','A1','A2','A','C','D'],q:'Has dormido poco y empiezas a parpadear mucho y cambiar de postura. ¿Qué indica?',o:['Síntomas de fatiga o sueño; debes parar a descansar','Que debes subir la música y continuar','Que basta con abrir la ventanilla todo el viaje'],c:0,e:'La fatiga reduce atención y reacción.'},
{scene:'road',tags:['B','AM','A1','A2','A','C','D'],q:'Después de tomar un medicamento nuevo que puede producir somnolencia, ¿qué debes hacer antes de conducir?',o:['Comprobar sus efectos y evitar conducir si afecta a la capacidad','Conducir más despacio y ya está','Tomar café para anular cualquier efecto'],c:0,e:'Algunos medicamentos alteran la conducción.'},
{scene:'road',tags:['B','AM','A1','A2','A','C','D'],q:'Tras una discusión intensa, te notas nervioso antes de conducir. ¿Qué es más prudente?',o:['Esperar a recuperar la calma antes de iniciar la marcha','Conducir rápido para despejarte','Usar el claxon más para liberar tensión'],c:0,e:'El estado emocional afecta a la atención y decisiones.'},

{scene:'road',tags:['B'],q:'Tu turismo tiene cinco plazas autorizadas incluido el conductor. ¿Puedes transportar cinco adultos además del conductor?',o:['No, se superaría el número de plazas autorizadas','Sí, si todos llevan cinturón','Sí, si el trayecto es corto'],c:0,e:'No se puede superar el número de plazas autorizadas.'},
{scene:'urban',tags:['B'],q:'Un menor viaja en un turismo. ¿Qué criterio general debe cumplirse?',o:['Debe usar el sistema de retención adecuado cuando sea obligatorio','Puede ir en brazos si va detrás','Puede usar solo cinturón adulto siempre'],c:0,e:'Los menores deben viajar protegidos según talla y normativa aplicable.'},
{scene:'road',tags:['B','C','D'],q:'Los neumáticos tienen dibujo muy desgastado y va a llover. ¿Qué riesgo aumenta?',o:['Pérdida de adherencia y mayor distancia de frenado','Menor consumo sin riesgo','Mejor evacuación de agua'],c:0,e:'El estado del neumático es clave en mojado.'},
{scene:'road',tags:['B'],q:'Tu permiso B está caducado. ¿Qué debes hacer?',o:['No conducir hasta renovarlo','Conducir si llevas el DNI','Conducir solo por vías urbanas'],c:0,e:'El permiso debe estar vigente para conducir.'},
{scene:'road',tags:['B'],q:'El vehículo no tiene seguro obligatorio. ¿Puede circular si solo vas al taller?',o:['No debe circular sin seguro obligatorio','Sí, si el trayecto es corto','Sí, si conduces despacio'],c:0,e:'El seguro obligatorio es requisito para circular.'},
{scene:'road',tags:['B'],q:'La ITV resulta desfavorable por un defecto grave. ¿Qué implica?',o:['Debes reparar el defecto y someter el vehículo a nueva inspección según proceda','Puedes circular indefinidamente con cuidado','Solo debes llevar el informe en la guantera'],c:0,e:'Un defecto grave limita la circulación y exige reparación.'},
{scene:'urban',tags:['B','CAP'],q:'Quieres ahorrar combustible sin perder seguridad. ¿Qué conducta es más adecuada?',o:['Anticipar, mantener velocidad uniforme y evitar acelerones','Apurar frenadas y acelerar fuerte','Circular siempre en marchas cortas'],c:0,e:'La conducción eficiente se basa en anticipación y suavidad.'}
]

function poolFor(catId) {
 let pool = questionBank.filter(q => q.tags.includes(catId))
 if(['B96','BE'].includes(catId)) pool = [...pool, ...questionBank.filter(q=>q.tags.includes('B'))]
 if(['C1','C1E','C','CE'].includes(catId)) pool = [...pool, ...questionBank.filter(q=>q.tags.includes('B')||q.tags.includes('CAP'))]
 if(['D1','D1E','D','DE'].includes(catId)) pool = [...pool, ...questionBank.filter(q=>q.tags.includes('B')||q.tags.includes('CAP'))]
 if(catId==='CAP') pool = [...pool, ...questionBank.filter(q=>q.tags.includes('C')||q.tags.includes('D'))]
 return [...new Map(pool.map((q,i)=>[q.q+i,q])).values()]
}
function makeTest(catId,testNumber){
 const pool=poolFor(catId)
 const total=catId==='B'?30:['ADR','CAP'].includes(catId)?25:20

 // Versión optimizada: evita bucles si el salto cae siempre en los mismos índices.
 // Mantiene exactamente el mismo banco de preguntas, solo cambia cómo se seleccionan.
 const indexed = pool.map((q, i) => ({ q, i }))

 indexed.sort((a, b) => {
   const va = ((a.i + 1) * 9301 + testNumber * 49297 + catId.length * 233280) % 9973
   const vb = ((b.i + 1) * 9301 + testNumber * 49297 + catId.length * 233280) % 9973
   return va - vb
 })

 const result = []
 for (let i = 0; i < total; i++) {
   const base = indexed[i % indexed.length].q
   result.push({...base,id:`${catId}-${testNumber}-${i}`})
 }
 return result
}


function buildExplanation(q){
 const correct = q.o[q.c]
 const wrongOptions = q.o.filter((_,idx)=>idx!==q.c)
 return {
   correct,
   wrongOptions,
   intro: q.e,
   whyCorrect: `La opción correcta es “${correct}” porque responde a la conducta más segura y conforme a la norma en esta situación.`,
   whyWrong1: `“${wrongOptions[0]}” no es adecuada porque puede hacerte actuar sin suficiente seguridad o ignorar una obligación de circulación.`,
   whyWrong2: `“${wrongOptions[1]}” tampoco es correcta porque simplifica demasiado la situación y puede aumentar el riesgo para ti o para otros usuarios.`
 }
}

function App(){
 const [selectedCat,setSelectedCat]=useState(null)
 const [selectedTest,setSelectedTest]=useState(null)
 const [answers,setAnswers]=useState({})
 const [finished,setFinished]=useState(false)
 const groups=useMemo(()=>[...new Set(categories.map(c=>c.group))],[])
 const questions=selectedCat&&selectedTest?makeTest(selectedCat.id,selectedTest):[]
 const score=questions.reduce((n,q,i)=>n+(answers[i]===q.c?1:0),0)
 const mistakes=questions.length-score
 const passed=mistakes<=3
 const openTest=n=>{setSelectedTest(n);setAnswers({});setFinished(false);window.scrollTo(0,0)}
 return <main>
  <header className="hero"><nav><button className="brand" onClick={()=>{setSelectedCat(null);setSelectedTest(null)}}>AutoTest Vial</button><span>Tests visuales no oficiales</span></nav><section><p className="eyebrow">Práctica visual</p><h1>Tests del carnet con señales y situaciones</h1><p className="lead">Preguntas originales más complejas, inspiradas en el temario del examen teórico.</p></section></header>
  {!selectedCat&&<div className="page">{groups.map(group=><section key={group} className="group"><h2>{group}</h2><div className="cards">{categories.filter(c=>c.group===group).map(cat=><button className="card" key={cat.id} onClick={()=>setSelectedCat(cat)}><span className="pill">{cat.id}</span><h3>{cat.title}</h3><p>{cat.desc}</p></button>)}</div></section>)}</div>}
  {selectedCat&&!selectedTest&&<div className="page"><button className="back" onClick={()=>setSelectedCat(null)}>← Volver</button><section className="panel"><div><p className="eyebrow">{selectedCat.group}</p><h2>{selectedCat.title}</h2></div><div className="counter">50 tests</div></section><div className="testGrid">{Array.from({length:50},(_,i)=>i+1).map(n=><button className="testButton" key={n} onClick={()=>openTest(n)}>Test {n}</button>)}</div></div>}
  {selectedCat&&selectedTest&&<div className="page testPage"><button className="back" onClick={()=>setSelectedTest(null)}>← Volver</button><section className="panel sticky"><div><p className="eyebrow">{selectedCat.title}</p><h2>Test {selectedTest}</h2><p>{Object.keys(answers).length}/{questions.length} respondidas</p></div><button className="primary" onClick={()=>setFinished(true)}>Corregir</button></section>{questions.map((q,i)=>{const exp=buildExplanation(q);return <article className="question" key={q.id}><div className="visual"><Scene scene={q.scene} sign={q.sign}/></div><div className="questionContent"><h3>{i+1}. {q.q}</h3><div className="options">{q.o.map((option,idx)=><button key={idx} className={`option ${answers[i]===idx?'chosen':''} ${finished&&idx===q.c?'ok':''} ${finished&&answers[i]===idx&&idx!==q.c?'bad':''}`} onClick={()=>setAnswers({...answers,[i]:idx})}>{option}</button>)}</div>{finished&&<div className={`explanation ${answers[i]===q.c ? 'correctExplanation' : 'wrongExplanation'}`}><strong>{answers[i]===q.c ? 'Correcta' : 'Fallada'}</strong><p>{exp.intro}</p><p>{exp.whyCorrect}</p><p>{exp.whyWrong1}</p><p>{exp.whyWrong2}</p></div>}</div></article>})}{finished&&<section className={`result ${passed ? 'passed' : 'failed'}`}><h2>{passed ? 'APROBADO' : 'SUSPENSO'}</h2><p>Resultado: {score}/{questions.length} · Fallos: {mistakes}</p><p>{passed ? 'Has cometido 3 fallos o menos.' : 'Has cometido más de 3 fallos. Revisa las explicaciones y repite otro test.'}</p><button className="primary light" onClick={()=>openTest(selectedTest===50?1:selectedTest+1)}>Siguiente test</button></section>}</div>}
  <footer><strong>Aviso:</strong> web no oficial. Las preguntas son orientativas y originales.</footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>)
