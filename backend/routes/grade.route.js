const express = require('express')
const gradeRoute = express.Router()

// model
let GradeModel = require('../models/Grade')

gradeRoute.route('/create-grade').post((req, res, next) => {
  GradeModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

gradeRoute.route('/').get((req, res, next) => {
  GradeModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

gradeRoute.route('/edit-grade/:id').get((req, res, next) => {
  GradeModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
gradeRoute.route('/update-grade/:id').put((req, res, next) => {
  GradeModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Grade successfully updated!')
      }
    },
  )
})

// Delete
gradeRoute.route('/delete-grade/:id').delete((req, res, next) => {
  GradeModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

// Find grades of student
gradeRoute.route('/find-grades/:studentId').get((req, res, next) => {
  GradeModel.find({studentId: req.params.studentId}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
  })
})

// Delete grades of student
gradeRoute.route('/delete-grades/:studentId').delete((req, res, next) => {
  GradeModel.deleteMany({studentId: req.params.studentId}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = gradeRoute
