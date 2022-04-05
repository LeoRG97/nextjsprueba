import React from 'react';
// import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const Privacy = () => {
  return (
    <Row>
      <Col xl="3" md="12" />
      <Col xl="6" md="12">
        <div
          className="text--theme-light title-xl policies-title-m"
          align="center"
        >
          AVISO DE PRIVACIDAD
        </div>
        <div>
          <p className="text--theme-light text-md">
            Este aviso le informa sobre los tratamientos de datos que se realizan a
            través de este sitio web (en adelante, la “Web” o el “Sitio web”), aunque
            es posible que ésta enlace o redirija a otros sitios web y/o plataformas
            titularidad de NTT DATA o de terceros de contenido especializado
            (como por ejemplo servicios sectoriales), con secciones o formularios que
            regulan de forma específica el tratamiento de información obtenida a través
            de los mismos. Puedes encontrar información sobre los tratamientos de datos
            de dichas webs y/o plataformas en sus respectivas páginas de privacidad.
            <br />
            De conformidad con lo dispuesto en la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares y a los requisitos que dicha
            legislación establece, NTT DATA México, da a conocer el presente documento:
          </p>
        </div>
        <div className="text--theme-light subtitle policies-subtitle-m">
          1. ¿Quién es el Responsable del Tratamiento de sus datos?
          <p className="text--theme-light text-md">
            <span className="text--theme-light subtitle policies-subtitle-m">Identidad:</span> NTT DATA México S. de R.L. de C.V. (“NTT DATA México”)
            <br />
            <span className="text--theme-light subtitle policies-subtitle-m">Dirección Postal:</span> Avenida Paseo de la Reforma 296, piso 28, colonia Juárez, Delegación Cuauhtémoc, C.P. 06600 en la Ciudad de México, México.
            <br />
            <span className="text--theme-light subtitle policies-subtitle-m">Dirección de Correo electrónico y contacto con el Delegado de Protección de Datos:</span> data.protection.office@nttdata.com
            <br />
          </p>
        </div>
        <div className="text--theme-light subtitle policies-subtitle-m">
          2. ¿Qué datos tratamos?
          <p className="text--theme-light text-md">
            Los datos personales que tratamos proceden de la información que como Usuario
            (“Usuario”) nos facilite al rellenar los formularios que encontrará en la Web.
            <br />
            Solo recabamos los datos necesarios para cada finalidad. Ten en cuenta que
            si no facilita la información obligatoria, es posible que no podamos atender
            su consulta o petición o gestionar el tratamiento.
            <br />
            Se informa que no se recaban datos personales sensibles.
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          3. ¿Con qué finalidades tratamos sus datos personales?
          <p className="text--theme-light text-md">
            Sus datos personales serán tratados para:
          </p>
          <p className="text--theme-light text-md">
            Finalidad principal:
          </p>
          <p className="ps-5 text--theme-light text-md">
            Gestionar y habilitar su acceso a la plataforma y al contenido de la misma.
          </p>
          <p className="text--theme-light text-md">
            Finalidades secundarias:
          </p>
          <p className="ps-5 text--theme-light text-md">
            Gestionar el envío de comunicaciones comerciales o newsletters a
            través de cualquier canal, incluyendo medios electrónicos
            (correo electrónico y notificaciones web) sobre noticias,
            cursos, actividades, eventos propios o de terceros, productos,
            servicios, ofertas y promociones relacionados con las actividades
            desarrolladas por NTT Data México.
            <br />
            Comunicar sus datos personales a las sociedades pertenecientes al
            Grupo NTT DATA ubicadas en LATAM según el país al que pertenezca,
            conforme se informa en el epígrafe 6 del presente aviso.
          </p>
          <p className="text--theme-light text-md">
            En caso de que no desee que sus datos personales sean tratados para
            estos fines adicionales, desde este momento usted nos puede
            comunicar lo anterior marcando la casilla habilitada al efecto.
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          4. ¿Cuál es la legitimación para el tratamiento de sus datos?
          <p className="text--theme-light text-md">
            La base legal del tratamiento de sus datos es la existencia de una
            relación jurídica entre el titular y el responsable, así como el
            consentimiento tácito por parte del Titular.
            <br />
            Recuerda que puede revocar su consentimiento en cualquier momento.
            También podrá oponerse a seguir recibiendo comunicaciones
            comerciales en la forma indicada en el pie de página de cada comunicación.
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          5. ¿Por cuánto tiempo conservaremos sus datos?
          <p className="text--theme-light text-md">
            Sus datos personales se conservarán durante el plazo necesario para
            la finalidad para la que se recabaron, y concretamente:
          </p>
          <div className="text--theme-light text-md">
            <ol type="a">
              <li className="ps-3">
                En relación con el acceso a la plataforma, se conservarán
                mientras usted sea usuario de la misma.
              </li>
              <li className="ps-3">
                En relación con el envío de comunicaciones, los datos serán
                tratados hasta que se oponga al tratamiento o solicite la
                supresión de sus datos personales.
              </li>
            </ol>
          </div>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          6. ¿A qué destinatarios se comunicarán sus datos?
          <p className="text--theme-light text-md">
            En caso de que otorgue su consentimiento, sos datos personales que
            nos facilite podrán ser transferidos a las siguientes empresas del
            Grupo NTT DATA ubicadas en Latinoamérica:
          </p>
          <p className="text--theme-light text-md">
            NTT DATA Panamá, INC <br />
            NTT DATA Argentina, S.A. <br />
            NTT DATA Perú, S.A.C. <br />
            NTT DATA Colombia, S.A.S. <br />
            NTT DATA Chile, S.A. <br />
            NTT DATA Chile Centers, Ltda. <br />
            NTT DATA Latam Centers, Ltda. <br />
            NTT DATA Perú BPO, S.A.C. <br />
            NTT DATA Colombia BPO, S.A.S. <br />
            NTT DATA Chile BPO Servicios Profesionales, Técnicos y Tecnológicos, Ltda. <br />
            NTT DATA Chile Training, Ltda. <br />
          </p>
          <p className="text--theme-light text-md">
            La comunicación de sus datos tendrá lugar con la finalidad de
            enviarle comunicaciones comerciales relativas a la empresa del Grupo
            NTT DATA del país en el que usted reside.
          </p>
          <p className="text--theme-light text-md">
            Al acceder al presente sitio web y crear la cuenta de usuario, usted
            en su carácter de “Usuario” otorga expresamente a NTT DATA México su
            consentimiento para la transferencia internacional de sus datos
            personales. Le aseguramos que el receptor de los datos asumirá las
            mismas obligaciones asumidas por NTT DATA México. Asimismo, NTT DATA
            México se compromete a transferir solo aquella información que sea
            necesaria para las finalidades con las que se emite el presente aviso.
          </p>
          <p className="text--theme-light text-md">
            También podemos compartir su información:
          </p>
          <div className="text--theme-light text-md">
            <ol type="I">
              <li className="ps-3">
                Cuando alguna autoridad gubernamental o diverso funcionario
                gubernamental responsable de hacer cumplir la ley solicite o
                requiera razonablemente dicha información;
              </li>
              <li className="ps-3">
                Cuando lo exija la ley o en respuesta a algún proceso legal;
              </li>
              <li className="ps-3">
                Cuando sea razonablemente necesario para llevar a cabo una
                investigación de carácter legal.
              </li>
            </ol>
          </div>
          <p className="text--theme-light text-md">
            Por último, le informamos que utilizamos conectores sociales, esto
            es, plugins (aplicaciones) de terceros que permiten conectar este
            Sitio web con redes sociales y otros servicios análogos (Twitter,
            Facebook u otras) para acceder a los perfiles de NTT DATA México y
            entidades vinculadas al Grupo NTT DATA Spain en dichas redes sociales.
          </p>
          <p className="text--theme-light text-md">
            El uso de dichos conectores es voluntario. En caso de optar por
            utilizarlos, estará autorizando la comunicación de sus datos
            personales (dirección IP, datos de navegación) a las referidas redes
            sociales y NTT DATA México no será responsable del ulterior
            tratamiento que las mismas puedan realizar con sus datos. Le
            recomendamos que visite los términos y condiciones de uso de dichas
            plataformas con carácter previo a su interacción en redes sociales.
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          7. ¿Cómo se protegen sus datos personales?
          <p className="text--theme-light text-md">
            Nos comprometemos a mantener seguros sus datos personales, adoptando
            todas las precauciones razonables para hacerlo. Implementamos todas
            las medidas organizativas y técnicas necesarias de acuerdo con la
            normativa vigente contra cualquier acceso no autorizado y
            modificación, divulgación, pérdida o destrucción. Exigimos e
            imponemos contractualmente a los proveedores de servicios que
            manejan sus datos personales que hagan lo mismo.
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          8. ¿Cómo tratamos sus datos en relación con las cookies y otras
          herramientas de seguimiento?
          <p className="text--theme-light text-md">
            Utilizamos cookies (dispositivos de almacenamiento y recuperación de
            datos en equipos terminales de los Usuarios) para el análisis del
            tráfico y rendimiento de la web y para hacer que ésta funcione mejor
            y sea más fácil de utilizar.
          </p>
          <p className="text--theme-light text-md">
            De igual modo, este sitio web utiliza pixeles con objetivos de
            re-marketing. Un píxel es un código o imagen de 1x1 no visible para
            el usuario cuya función es detonar una cookie. A diferencia de las
            cookies, los píxeles no se almacenan en el navegador del usuario,
            sino directamente en el sitio web.
          </p>
          <p className="text--theme-light text-md">
            Nuestra instalación y uso de las cookies depende de la configuración
            que realices tanto en el banner de cookies como a través de su
            navegador. Toda la información sobre qué son las cookies y cómo las
            utilizamos está disponible en nuestra <Link href="/policies/cookies"><a className="text-md text--theme-light" target="_blank"><u>Política de Cookies.</u></a></Link>
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          9. ¿Cuáles son sus derechos?
          <p className="text--theme-light text-md">
            Usted tiene derecho a conocer qué datos personales tenemos de usted,
            para qué los utilizamos y las condiciones del uso que les damos
            (Acceso). Asimismo, es su derecho solicitar la corrección de su
            información personal en caso de que esté desactualizada, sea
            inexacta o incompleta (Rectificación); que la eliminemos de nuestros
            registros o bases de datos cuando considere que la misma no está
            siendo utilizada conforme a los principios, deberes y obligaciones
            previstas en la normativa (Cancelación); así como oponerse al uso de
            sus datos personales para fines específicos (Oposición). Estos
            derechos se conocen como derechos ARCO.
          </p>
          <p className="text--theme-light text-md">
            Puedes revocar en cualquier momento los consentimientos prestados.
            Ejercida la revocación, que no tendrá carácter retroactivo salvo
            disposición legal que imponga dicho carácter, sus datos podrán
            conservarse bloqueados durante los plazos de prescripción
            establecidos por las normas aplicables.
          </p>
          <p className="text--theme-light text-md">
            Para ejercitar los citados derechos, escribe al Delegado de
            Protección de Datos, adjuntando copia de documento acreditativo de
            su identidad, dirigido a  <u>data.protection.office@nttdata.com</u>
          </p>
          <p className="text--theme-light text-md">
            Para ayudarnos a tramitar su solicitud, se rogamos que indiques en
            el asunto “Protección de Datos LATAM”
          </p>
          <p className="text--theme-light text-md">
            Le informamos de su derecho a acudir a la autoridad de protección de datos.
          </p>
        </div>

        <div className="text--theme-light subtitle policies-subtitle-m">
          10. ¿Cómo puede conocer los cambios a este aviso de privacidad?
          <p className="text--theme-light text-md">
            El presente aviso de privacidad puede sufrir modificaciones, cambios
            o actualizaciones derivadas de nuevos requerimientos legales; de
            nuestras propias necesidades por los productos o servicios que
            ofrecemos; de nuestras prácticas de privacidad; de cambios en
            nuestro modelo de negocio, o por otras causas.
          </p>
          <p className="text--theme-light text-md">
            Nos comprometemos a mantenerlo informado sobre los cambios que pueda
            sufrir el presente aviso de privacidad, a través de este sitio web.
          </p>
          <p className="text--theme-light text-md">
            Última actualización 10/Diciembre/2021
          </p>
        </div>
      </Col>
      <Col xl="3" md="12" />
    </Row>
  );
};

export default Privacy;
