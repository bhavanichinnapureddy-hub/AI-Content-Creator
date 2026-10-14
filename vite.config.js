import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1_000_000) {
        reject(new Error('Payload too large'))
      }
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

function passwordResetEmailPlugin(env) {
  const handle = async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/send-reset-email') {
      return next()
    }
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ delivered: false, error: 'Method not allowed' }))
      return
    }

    try {
      const payload = await readJsonBody(req)
      const to = String(payload.to || '').trim()
      const resetLink = String(payload.resetLink || '').trim()
      const subject = payload.subject || 'Password Reset Request – CreatorSphere AI'

      if (!to || !resetLink) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ delivered: false, error: 'Missing recipient or reset link' }))
        return
      }

      const host = env.SMTP_HOST
      const user = env.SMTP_USER
      const pass = env.SMTP_PASS

      if (!host || !user || !pass) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          delivered: false,
          configured: false,
          error: 'SMTP is not configured on the server. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.'
        }))
        return
      }

      let nodemailerModule;
      try {
        nodemailerModule = await import('nodemailer');
      } catch {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          delivered: false,
          configured: false,
          error: 'Nodemailer is not installed in the application. Please run npm install nodemailer to enable SMTP delivery.'
        }));
        return;
      }
      const nodemailer = nodemailerModule.default || nodemailerModule;

      const transporter = nodemailer.createTransport({
        host,
        port: Number(env.SMTP_PORT || 587),
        secure: String(env.SMTP_SECURE || 'false') === 'true',
        auth: { user, pass }
      })

      await transporter.sendMail({
        from: env.EMAIL_FROM || user,
        to,
        subject,
        text: `Use this secure link to reset your CreatorSphere AI password. It expires in 15 minutes.\n\n${resetLink}\n\nIf you did not request this, ignore this email.`,
        html: `<p>Use this secure link to reset your CreatorSphere AI password. It expires in 15 minutes.</p><p><a href="${resetLink}">${resetLink}</a></p><p>If you did not request this, ignore this email.</p>`
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ delivered: true }))
    } catch (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        delivered: false,
        error: err.message || 'Failed to send email'
      }))
    }
  }

  return {
    name: 'password-reset-email',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      passwordResetEmailPlugin(env),
    ],
  }
})
