import express, { NextFunction, Request, Response } from 'express'
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const routes = (app: express.Application) => {

  app.post('/api/contact', async (req, res) => {
    // Send email to personal account based on req body
    const email = {
      // Don't get confused...
      // This is basically my personal email address for both as the API is handling sending on my behalf
      to: process.env.CONTACT_EMAIL as string,
      from: process.env.CONTACT_EMAIL as string,
      templateId: 'd-127d36b1c1e5415ab71893efe57fefa0',
      dynamic_template_data: {
        requester: req.body.name,
        message: req.body.message,
        requesterEmail: req.body.email,
        mobile: req.body.mobile || "N/A"
      }
    }

    sgMail
      .send(email)
      .then(() => {
        return res.status(201).json({ message: 'Email sent successfully' })
      })
      .catch(error =>{ 
        console.log(JSON.stringify(error))
        return res.status(500).json({ 
          errorCode: 'INTERNAL_SERVER_ERROR', 
          message:  'Error sending email to Shane Keney.  Please try again later.'
        })
      })
  })

  /**
   * Handle all unknown routes by sending back a little easter egg
  */
  app.get('/*', (req, res) => {
    res.json('🐣')
  })
}

export default routes