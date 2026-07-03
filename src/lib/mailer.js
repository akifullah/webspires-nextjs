import 'server-only';
import nodemailer from 'nodemailer';

/**
 * SMTP mailer. Env is read lazily so a missing value never breaks
 * `next build` it only fails when an email is actually sent.
 */

let cachedTransporter = null;

function getConfig() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    // SMTP_SECURE=true for port 465 (implicit TLS); false for 587 (STARTTLS).
    const secure =
        String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' ||
        port === 465;
    const from =
        process.env.MAIL_FROM || 'Webspires Website <no-reply@webspires.co.uk>';
    const to = process.env.CONTACT_TO;

    const missing = [];
    if (!host) missing.push('SMTP_HOST');
    if (!user) missing.push('SMTP_USER');
    if (!pass) missing.push('SMTP_PASS');
    if (!to) missing.push('CONTACT_TO');

    return { host, port, user, pass, secure, from, to, missing };
}

function getTransporter(cfg) {
    if (cachedTransporter) return cachedTransporter;
    cachedTransporter = nodemailer.createTransport({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        auth: { user: cfg.user, pass: cfg.pass },
    });
    return cachedTransporter;
}

function esc(s = '') {
    return String(s).replace(
        /[&<>"]/g,
        (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
    );
}

/* ------------------------------------------------------------------ */
/* Email template                                                      */
/* ------------------------------------------------------------------ */

const BRAND = {
    primary: '#EE314F',
    dark: '#141426',
    text: '#1f2937',
    muted: '#6b7280',
    faint: '#9ca3af',
    border: '#e5e7eb',
    bg: '#f3f4f6',
    card: '#ffffff',
    soft: '#faf9f7',
};

/**
 * Shared email shell — table-based, inline-styled HTML that renders
 * consistently in Gmail, Outlook and Apple Mail.
 */
function renderShell({ preheader, badge, heading, subheading, bodyHtml, cta }) {
    const ctaHtml = cta
        ? `<tr><td align="center" style="padding:28px 40px 4px">
             <a href="${esc(cta.href)}"
                style="display:inline-block;background:${BRAND.primary};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 34px;border-radius:999px">
               ${esc(cta.label)}
             </a>
           </td></tr>`
        : '';

    return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:${BRAND.bg}">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${esc(
      preheader
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
               style="width:600px;max-width:100%;background:${BRAND.card};border-radius:16px;overflow:hidden;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND.dark};padding:28px 40px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px">
                    Webspires<span style="color:${BRAND.primary}">.</span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(238,49,79,0.15);border:1px solid rgba(238,49,79,0.45);color:#ff8fa2;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 12px;border-radius:999px">
                      ${esc(badge)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent line -->
          <tr><td style="height:4px;background:${BRAND.primary};font-size:0;line-height:0">&nbsp;</td></tr>

          <!-- Heading -->
          <tr>
            <td style="padding:36px 40px 8px">
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:${BRAND.text};letter-spacing:-0.3px">${esc(
                  heading
              )}</h1>
              ${
                  subheading
                      ? `<p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:${BRAND.muted}">${esc(
                            subheading
                        )}</p>`
                      : ''
              }
            </td>
          </tr>

          <!-- Body -->
          <tr><td style="padding:20px 40px 0">${bodyHtml}</td></tr>

          ${ctaHtml}

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 30px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="border-top:1px solid ${BRAND.border};font-size:0;line-height:0">&nbsp;</td></tr>
                <tr>
                  <td style="padding-top:14px;font-size:12px;line-height:1.6;color:${BRAND.faint}">
                    This notification was sent automatically from
                    <a href="https://webspires.co.uk" style="color:${BRAND.muted};text-decoration:none;font-weight:600">webspires.co.uk</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** A labelled details card (rows of key/value pairs). */
function renderDetailRows(rows) {
    const cells = rows
        .filter(([, v]) => String(v || '').trim() !== '')
        .map(
            ([k, v], i) => `
            <tr>
              <td style="padding:11px 18px;width:120px;font-size:12px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${
                  BRAND.faint
              };vertical-align:top;${
                i > 0 ? `border-top:1px solid ${BRAND.border};` : ''
            }">${esc(k)}</td>
              <td style="padding:11px 18px 11px 0;font-size:14px;color:${
                  BRAND.text
              };font-weight:500;vertical-align:top;word-break:break-word;${
                i > 0 ? `border-top:1px solid ${BRAND.border};` : ''
            }">${esc(v)}</td>
            </tr>`
        )
        .join('');
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                   style="background:${BRAND.soft};border:1px solid ${BRAND.border};border-radius:12px">${cells}</table>`;
}

/* ------------------------------------------------------------------ */
/* Senders                                                             */
/* ------------------------------------------------------------------ */

/**
 * Sends a contact enquiry to the admin inbox (CONTACT_TO).
 * @returns {Promise<{ok:true}>}
 */
export async function sendContactEmail({
    name,
    email,
    phone = '',
    service = '',
    message,
    attachment = null,
    source = 'Website',
}) {
    const cfg = getConfig();
    if (cfg.missing.length) {
        throw new Error(
            `Email is not configured. Missing env: ${cfg.missing.join(', ')}`
        );
    }

    const bodyHtml = `
        ${renderDetailRows([
            ['Name', name],
            ['Email', email],
            ['Phone', phone],
            ['Service', service],
            ['Source', source],
        ])}
        <h3 style="margin:26px 0 10px;font-size:12px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${BRAND.faint}">Message</h3>
        <div style="background:${BRAND.card};border:1px solid ${BRAND.border};border-left:4px solid ${BRAND.primary};border-radius:0 12px 12px 0;padding:18px 20px;font-size:14px;line-height:1.7;color:${BRAND.text};white-space:pre-wrap">${esc(
            message
        )}</div>
        ${
            attachment?.buffer?.length
                ? `<p style="margin:14px 0 0;font-size:13px;color:${BRAND.muted}">&#128206; Attachment included: <strong>${esc(
                      attachment.filename || 'attachment'
                  )}</strong></p>`
                : ''
        }`;

    const html = renderShell({
        preheader: `${name} sent an enquiry via ${source}: ${String(
            message
        ).slice(0, 90)}`,
        badge: 'New Enquiry',
        heading: `${name} just got in touch`,
        subheading: `A new enquiry arrived through the ${source} form.`,
        bodyHtml,
        cta: {
            label: `Reply to ${name}`,
            href: `mailto:${email}?subject=${encodeURIComponent(
                `Re: your enquiry to Webspires`
            )}`,
        },
    });

    const text =
        `New enquiry (${source})\n\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n` +
        `Service: ${service || '-'}\n\nMessage:\n${message}\n`;

    const mail = {
        from: cfg.from,
        to: cfg.to,
        replyTo: email ? `${name} <${email}>` : undefined,
        subject: `New ${source} enquiry — ${name}`,
        text,
        html,
    };

    if (attachment?.buffer?.length) {
        mail.attachments = [
            {
                filename: attachment.filename || 'attachment',
                content: attachment.buffer,
                contentType: attachment.contentType || undefined,
            },
        ];
    }

    const transporter = getTransporter(cfg);
    await transporter.sendMail(mail);
    return { ok: true };
}

/**
 * Notifies the admin inbox (CONTACT_TO) about a new newsletter subscriber.
 * @returns {Promise<{ok:true}>}
 */
export async function sendNewsletterNotification({
    email,
    source = 'Footer',
}) {
    const cfg = getConfig();
    if (cfg.missing.length) {
        throw new Error(
            `Email is not configured. Missing env: ${cfg.missing.join(', ')}`
        );
    }

    const html = renderShell({
        preheader: `${email} subscribed to the newsletter via ${source}.`,
        badge: 'New Subscriber',
        heading: 'Your newsletter list just grew',
        subheading: `Someone subscribed through the ${source} form.`,
        bodyHtml: renderDetailRows([
            ['Email', email],
            ['Source', source],
        ]),
    });

    const transporter = getTransporter(cfg);
    await transporter.sendMail({
        from: cfg.from,
        to: cfg.to,
        subject: `New newsletter subscriber — ${email}`,
        text: `New newsletter subscriber (${source})\n\nEmail: ${email}\n`,
        html,
    });
    return { ok: true };
}
