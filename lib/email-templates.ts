export const otpEmailTemplate = (otp: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificação de email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
        <h1 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
          Verificação de email
        </h1>
        
        <p style="margin: 0 0 30px 0; color: #525252; font-size: 16px; line-height: 1.5;">
          Use o código abaixo para verificar seu email no Learn Lab:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; background: #f3f4f6; border-radius: 8px; padding: 20px 30px; font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; color: #1a1a1a; letter-spacing: 4px;">
            ${otp}
          </div>
        </div>
        
        <p style="margin: 30px 0 0 0; color: #737373; font-size: 14px; line-height: 1.5;">
          Este código expira em 10 minutos. Se você não solicitou esta verificação, ignore este email.
        </p>
      </div>
    </div>
  </body>
</html>
`;