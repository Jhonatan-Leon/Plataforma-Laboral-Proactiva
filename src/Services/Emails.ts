// src/services/mail.service.ts
import { EmailClient, EmailMessage } from '@azure/communication-email';


export class MailService {
  private static client = new EmailClient(
    process.env.ACS_EMAIL_CONNECTION_STRING!
  );
  private static sender = process.env.ACS_EMAIL_SENDER!;

  private static async dispatch(message: EmailMessage) {
    const poller = await this.client.beginSend(message);
    const result = await poller.pollUntilDone();
    if (result.status !== 'Succeeded') throw new Error(JSON.stringify(result));
  }

  static async sendWelcomeEmail(to: string, name: string) {
    await this.dispatch({
      senderAddress: this.sender,
      recipients: { to: [{ address: to, displayName: name }] },
      content: {
        subject: '<h1>¡Bienvenido(a) a Plataforma Laboral Proactiva!</h1>',
        html: `
          <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#DFF8F0;padding:0;margin:0">
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden">
                    <tr>
                      <td style="padding:32px 40px;color:#284E6F;font-size:16px;line-height:1.55">
                        <p style="margin:0 0 18px">
                          Hola <span style="font-weight:700;color:#284E6F">${name}</span>, <span style="color:#4D6B87">¡gracias por unirte a</span>
                          <span style="font-weight:700;color:#284E6F">Plataforma Laboral Proactiva</span> 🎉
                        </p>

                        <p style="margin:0 0 14px;color:#4D6B87">
                          A partir de ahora podrás <strong style="color:#284E6F">crear tu perfil</strong>,
                          <strong style="color:#284E6F">explorar vacantes</strong> y
                          <strong style="color:#284E6F">conectar con empleadores</strong> en cuestión de minutos.
                        </p>

                        <p style="margin:0;color:#4D6B87">
                          ¡Te deseamos mucho éxito en tu búsqueda!
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>`,
      },
    });
  }

  static async sendVacancyApplicationNotification(
    employerEmail: string,
    employerName: string,
    vacancyTitle: string,
    applicantName: string
  ) {
    await this.dispatch({
      senderAddress: this.sender,
      recipients: { to: [{ address: employerEmail, displayName: employerName }] },
      content: {
        subject: `📥 Nueva postulación a “${vacancyTitle}”`,
        html: `<p>${applicantName} acaba de postular a tu vacante <b>${vacancyTitle}</b>.</p>`,
      },
    });
  }

  static async sendPasswordChangeEmail(to: string, name: string, date = new Date()) {
    await this.dispatch({
      senderAddress: this.sender,
      recipients: { to: [{ address: to, displayName: name }] },
      content: {
        subject: 'Tu contraseña ha sido actualizada',
        html: `<p>Hola ${name}, confirmamos que tu contraseña cambió el ${date.toLocaleString(
          'es-CO'
        )}.</p>`,
      },
    });
  }

  static async sendContactFormEmail(
    fromEmail: string,
    fromName: string,
    comment: string
  ) {
    const destination = process.env.CONTACT_EMAIL_RECIPIENT!; 

    await this.dispatch({
      senderAddress: this.sender,
      recipients: {
        to: [{ address: destination, displayName: 'Equipo JobConnect' }],
      },
      
      replyTo: [{ address: fromEmail, displayName: fromName }],

      content: {
        subject: `💬 Nuevo mensaje support de ${fromName}`,
        plainText:  `Nuevo mensaje de soporte
              De: ${fromName} email: ${fromEmail}
              —————————–  
              ${comment}
              Contacto: ${fromEmail} `,
        html: `
            <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#DFF8F0;padding:0;margin:0">
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden">
                    <tr>
                      <td style="background:#284E6F;color:#ffffff;padding:24px 32px;text-align:center">
                        <h1 style="margin:0;font-size:22px;font-weight:600;line-height:1.4">
                          Plataforma Laboral Proactiva
                        </h1>
                        <p style="margin:4px 0 0;font-size:14px;opacity:.9">Nuevo mensaje de soporte</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:32px">
                        <p style="margin:0 0 16px;font-size:16px;line-height:1.5">
                          <strong>De:</strong> ${(fromName)}
                          <br> 
                          <strong>Email: </strong>${fromEmail}
                        </p>
                        <p style="margin:0 0 8px;font-size:16px"><strong>Comentario:</strong></p>

                        <div style="background:#F8FDFB;border:1px solid #B6DAD4;border-radius:6px;padding:16px;font-size:15px;line-height:1.55">
                          ${comment}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#DFF8F0;color:#4D6B87;padding:20px 32px;font-size:12px;text-align:center">
                        Este correo se generó automáticamente desde el formulario de soporte.<br/>
                        © ${new Date().getFullYear()} Laboral Proactiva
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>`.trim(),
        },
    });
  }
}
