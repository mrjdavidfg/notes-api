const express = require('express')
const router = express.Router()
const note = require('../controller/note')
const requireUser = require('../middlewares').requireUser

router.use('/', requireUser)

router
  .route('/')
  .get(note.findAll)
  .post(note.create)

router
  .route('/:id')
  .get(note.findById)
  .patch(note.update)
  .delete(note.delete)

module.exports = router