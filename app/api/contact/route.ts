import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createContactSchema } from '@/lib/schemas/contact';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { turnstileToken, ...formData } = body;

    // 1. Verify Turnstile Token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      console.error('TURNSTILE_SECRET_KEY is not defined');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Turnstile token is required' },
        { status: 400 }
      );
    }

    const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    const ip = req.headers.get('x-forwarded-for');
    const turnstileFormData = new URLSearchParams();
    turnstileFormData.append('secret', turnstileSecret);
    turnstileFormData.append('response', turnstileToken);
    if (ip) {
      turnstileFormData.append('remoteip', ip);
    }

    const turnstileResponse = await fetch(turnstileVerifyUrl, {
      method: 'POST',
      body: turnstileFormData,
    });

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.error('Turnstile verification failed:', turnstileResult);
      return NextResponse.json(
        {
          success: false,
          error: 'Turnstile verification failed',
          details: turnstileResult,
        },
        { status: 400 }
      );
    }

    // 2. Validate Form Data
    // We use a simple identity function for translation keys as we just need the keys/codes
    // or English defaults if we wanted to provide them.
    const schema = createContactSchema((key) => key);

    try {
      schema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: error.issues,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 3. Send Email via Resend
    const { name, email, phone, organization, message } = formData;

    try {
      const emailResponse = await resend.emails.send({
        from: 'Chacal Studio Contact <info@contact.chacalestudio.ar>',
        to: 'hola@chacalestudio.ar',
        replyTo: email,
        subject: `¡Nuevo mensaje de contacto de ${name}!`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="width=device-width" name="viewport" />
    <link
      rel="preload"
      as="image"
      href="https://resend-attachments.s3.amazonaws.com/V4Y6K1gPwt1Z6cW" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      content="telephone=no,address=no,email=no,date=no,url=no"
      name="format-detection" />
  </head>
  <body>
    <!--$--><!--html--><!--head-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Contacto | ¡Nuevo mensaje de contacto de ${name}!
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <!--body-->
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%">
              <tbody>
                <tr>
                  <td>
                    <table
                      align="left"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="align:left;width:100%;padding-left:0px;padding-right:0px;line-height:155%;max-width:600px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif">
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    align="center"
                                    data-id="__react-email-column">
                                    <img
                                      alt="Stylized wolf or fox silhouette against a circular background with radiating lines."
                                      height="190"
                                      src="https://resend-attachments.s3.amazonaws.com/V4Y6K1gPwt1Z6cW"
                                      style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px"
                                      width="190" />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <br />
                            </p>
                            <h1
                              style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600;background-color:rgb(255, 255, 255);color:rgb(51, 51, 51);font-family:sans-serif;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;letter-spacing:normal;orphans:2;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;widows:2;word-spacing:0px">
                              <span>¡Hola Chacal Estudio!</span>
                            </h1>
                            <p
                              style="margin:0;padding:0;font-size:16px;padding-top:0.5em;padding-bottom:0.5em;background-color:rgb(255, 255, 255);color:rgb(85, 85, 85);font-family:sans-serif;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;widows:2;word-spacing:0px">
                              <span><strong>${name}</strong></span
                              ><span
                                > quiere ponerse en contacto con nosotros!</span
                              >
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <br />
                            </p>
                            <div
                              style="margin:0;padding:20px;color:rgb(34, 34, 34);font-family:sans-serif;font-size:small;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;background-color:rgb(245, 245, 245);border-radius:8px">
                              <h3
                                style="margin:0;padding:0;font-size:1.4em;line-height:1.08em;padding-top:0.389em;font-weight:600;color:rgb(51, 51, 51)">
                                <span>Detalles del contacto:</span>
                              </h3>
                              <p
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span><strong>Email:</strong></span
                                ><span> </span
                                ><span
                                  ><a
                                    href="mailto:${email}"
                                    rel="noopener noreferrer nofollow"
                                    style="color:#0670DB;text-decoration-line:none;text-decoration:underline"
                                    target="_blank"
                                    >${email}</a
                                  ></span
                                >
                              </p>
                              <p
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span><strong>Teléfono:</strong></span
                                ><span> ${phone || 'No especificado'}</span>
                              </p>
                              <p
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span><strong>Organización:</strong></span
                                ><span> ${organization || 'No especificada'}</span>
                              </p>
                            </div>
                            <div
                              style="margin:0;padding:0;color:rgb(34, 34, 34);font-family:sans-serif;font-size:small;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-indent:0px;text-transform:none;widows:2;word-spacing:0px;-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;border-left:4px solid rgb(51, 51, 51);padding-left:15px">
                              <p
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <br />
                              </p>
                              <h3
                                style="margin:0;padding:0;font-size:1.4em;line-height:1.08em;padding-top:0.389em;font-weight:600;color:rgb(51, 51, 51)">
                                <span>Mensaje:</span>
                              </h3>
                              <p
                                style="margin:0;padding:0;font-size:16px;padding-top:0.5em;padding-bottom:0.5em;color:rgb(68, 68, 68);line-height:1.6">
                                <span
                                  >${message.replace(/\n/g, '<br>')}</span
                                >
                              </p>
                            </div>
                            <p
                              style="margin:0;padding:0;font-size:12px;padding-top:10px;padding-bottom:0.5em;background-color:rgb(255, 255, 255);border-top:1px solid rgb(238, 238, 238);border-top-color:rgb(238, 238, 238);border-top-style:solid;border-top-width:1px;color:rgb(136, 136, 136);font-family:sans-serif;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;orphans:2;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;widows:2;word-spacing:0px">
                              <br />
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <span
                                >Este mensaje fue enviado desde el formulario de
                                contacto de </span
                              ><span
                                ><a
                                  href="http://chacalestudio.ar/"
                                  rel="noopener noreferrer nofollow"
                                  style="color:#0670DB;text-decoration-line:none;text-decoration:underline"
                                  target="_blank"
                                  >chacalestudio.ar</a
                                ></span
                              >
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;text-align:center">
                              <br />
                            </p>
                            <p
                              style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                              <br />
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>`,
      });

      if (emailResponse.error) {
        console.error('Resend error:', emailResponse.error);
        return NextResponse.json(
          {
            success: false,
            error: emailResponse.error.message || 'Failed to send email',
            details: emailResponse.error,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        {
          success: false,
          error: emailError instanceof Error ? emailError.message : 'Failed to send email',
          details: emailError,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
