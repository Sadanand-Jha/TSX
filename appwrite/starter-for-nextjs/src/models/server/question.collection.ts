import { db, questionCollection } from '../name'
import { databases } from './config'
import { Permission } from 'appwrite'

export default async function createQuestionCollection() {
  try {
    // ✅ Check if collection already exists
    await databases.getCollection(db, questionCollection)
    console.log('Question collection already exists.')
  } catch (error: any) {
    // If it doesn't exist (error code 404), then create it
    if (error.code === 404) {
      await databases.createCollection(
        db,
        questionCollection, // Collection ID
        questionCollection, // Name
        [
          Permission.read('any'),
          Permission.read('users'),
          Permission.write('users'),
          Permission.delete('users'),
          Permission.update('users'),
        ]
      )
      console.log('✅ Question collection is created!')
    } else {
      console.error('❌ Failed to check or create collection:', error)
    }
  }
}
