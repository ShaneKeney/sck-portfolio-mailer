import express, { NextFunction, Request, Response } from 'express'

const routes = (app: express.Application) => {

  app.post('/api/contact', (req, res) => {
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