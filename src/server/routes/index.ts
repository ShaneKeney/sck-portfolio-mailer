import express, { NextFunction, Request, Response } from 'express'

const routes = (app: express.Application) => {

  app.post('/api/contact', (req, res) => {
    // TODO: Send email to personal account based on req body
    console.log(req.body)
    return "hello"
  })

  /**
   * Handle all unknown routes by sending back a little easter egg
  */
  app.get('/*', (req, res) => {
    res.json('🐣')
  })
}

export default routes