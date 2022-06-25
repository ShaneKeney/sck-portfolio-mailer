import express, { NextFunction, Request, Response } from 'express'

const routes = (app: express.Application) => {

  /**
   * Handle all unknown routes by sending back a little easter egg
  */
  app.get('/*', (req, res) => {
    res.json('🐣')
  })
}

export default routes