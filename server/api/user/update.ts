import { requiresAuthSession, mongo } from '#nuxt-mongodb-auth'

export default defineEventHandler(async (event) => {
  const user = await requiresAuthSession(event)
  const { email, name } = await readBody(event)
  const db = mongo.db()

  try {
    // if email is different check if exists
    const emailNew = email.toLowerCase().replace(/\s/g, '')
    if (emailNew !== user.email) {
      if (await db.collection('Users').findOne({ email: emailNew })) {
        return createError({
          statusCode: 400,
          statusMessage: 'Error updating user (email already exists).',
        })
      }
    }

    // update the user
    await db.collection('Users').updateOne(
      { _id: user._id },
      {
        $set: {
          email: emailNew,
          name,
        },
      }
    )

    // return success
    return 'Updated.'
  } catch (error) {
    console.log('Error updating user:', error)
  }

  // return an error
  throw createError({
    statusCode: 400,
    statusMessage: 'Error updating user.',
  })
})
