import express, { NextFunction, Request, Response } from 'express'
import sgMail from "@sendgrid/mail"
import { json } from 'body-parser'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const routes = (app: express.Application) => {

  app.post('/api/contact', async (req, res) => {
    // TODO: Send email to personal account based on req body
    console.log(req.body)
    const email = {
      to: process.env.CONTACT_EMAIL,
      from: req.body.email,
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail
      .send(email)
      .then(() => {
        return res.status(201).json({ message: 'Email sent successfully' })
      })
      .catch(error => res.status(500).json({ 
        errorCode: 'INTERNAL_SERVER_ERROR', 
        message:  'Error sending email to Shane Keney.  Please try again later.'
      }))
  })

  /**
   * Handle all unknown routes by sending back a little easter egg
  */
  app.get('/*', (req, res) => {
    res.json('🐣')
  })
}

export default routes