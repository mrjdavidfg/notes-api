const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'Email is required!']
  },
  password: {
    type: String,
    required: [true, 'Password is required!']
  }
}, { collection: 'user', versionKey: false })

UserSchema.statics.authenticate = async function (email, password) {
  // buscamos el usuario utilizando el email
  let user = await this.findOne({ email })

  if (user) {
    // si existe comparamos la contraseña
    let check = await bcrypt.compare(password, user.password)

    return (check) ? user : null
  }

  return null
}

UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 8)
  } catch (err) {
    console.log('err')
    return next(err)
  }

  next()
})

module.exports = mongoose.model("User", UserSchema)
