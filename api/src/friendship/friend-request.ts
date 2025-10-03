export const FRIEND_REQUEST_HTML_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; }
.container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
.header { background-color: #f8f8f8; padding: 15px; text-align: center; border-bottom: 1px solid #eee; }
.content { padding: 20px 0; text-align: center; }
.requester { font-size: 20px; font-weight: bold; color: #007bff; margin: 20px 0; padding: 15px; background-color: #e9ecef; border-radius: 4px; display: inline-block; }
.message { font-size: 16px; color: #333; margin: 15px 0; }
.button { display: inline-block; margin-top: 20px; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; }
.footer { font-size: 12px; color: #777; text-align: center; padding-top: 20px; border-top: 1px solid #eee; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎉 Yeni Arkadaşlık İsteği</h2>
    </div>
    <div class="content">
      <p>Merhaba,</p>
      <div class="requester">{{REQUESTER_EMAIL}}</div>
      <p class="message">sizinle arkadaş olmak istiyor!</p>
      <p>Uygulamaya giriş yaparak isteği kabul edebilir veya reddedebilirsiniz.</p>
    </div>
    <div class="footer">
      <p>&copy; {{CURRENT_YEAR}} RedisIRLChat. Tüm hakları saklıdır.</p>
    </div>
  </div>
</body>
</html>
`;
