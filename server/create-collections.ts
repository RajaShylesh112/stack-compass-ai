import { Client, Databases } from 'node-appwrite';

// Server-side Appwrite client with API key
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || '6843c4b5001f4a0db778')
  .setKey(process.env.APPWRITE_API_KEY || 'standard_3d04a74de58c2d076a350a07098e1bd491c8d30c2cc996524b6e21156f157601d8c40d4babf6b3e10ebd36db4af20362cf1214e657d0ff7784f767d6d55846b42dd6e49d0924685f9825dbb4ed3e85d027427b114a09174dbbd074d2dabe4cdbdaa8a0acd04f1e7191efd512249386fabe4b347b483446e2623896d577a6a8ad');

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;

async function createCollections() {
  try {
    console.log('Creating Appwrite collections...');

    // Create Users collection
    try {
      const usersCollection = await databases.createCollection(
        DATABASE_ID,
        'users',
        'Users'
      );
      console.log('✓ Users collection created');

      // Add attributes to Users collection
      await databases.createStringAttribute(DATABASE_ID, 'users', 'username', 255, true);
      await databases.createStringAttribute(DATABASE_ID, 'users', 'email', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'users', 'firstName', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'users', 'lastName', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'users', 'profileImageUrl', 2048, false);
      await databases.createBooleanAttribute(DATABASE_ID, 'users', 'isPro', false);
      await databases.createIntegerAttribute(DATABASE_ID, 'users', 'savedStacksCount', false, 0);
      await databases.createStringAttribute(DATABASE_ID, 'users', 'stripeCustomerId', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'users', 'stripeSubscriptionId', 255, false);
      
      console.log('✓ Users attributes created');
    } catch (error: any) {
      if (error.code === 409) {
        console.log('⚠ Users collection already exists');
      } else {
        throw error;
      }
    }

    // Create SavedStacks collection
    try {
      const stacksCollection = await databases.createCollection(
        DATABASE_ID,
        'saved_stacks',
        'Saved Stacks'
      );
      console.log('✓ SavedStacks collection created');

      // Add attributes to SavedStacks collection
      await databases.createStringAttribute(DATABASE_ID, 'saved_stacks', 'userId', 255, true);
      await databases.createStringAttribute(DATABASE_ID, 'saved_stacks', 'name', 255, true);
      await databases.createStringAttribute(DATABASE_ID, 'saved_stacks', 'description', 1000, false);
      await databases.createStringAttribute(DATABASE_ID, 'saved_stacks', 'stackData', 65536, true);

      console.log('✓ SavedStacks attributes created');
    } catch (error: any) {
      if (error.code === 409) {
        console.log('⚠ SavedStacks collection already exists');
      } else {
        throw error;
      }
    }

    console.log('🎉 All collections created successfully!');
    console.log('Your Appwrite database is now ready to use.');
    
  } catch (error: any) {
    console.error('Failed to create collections:', error.message);
    console.error('Make sure your API key has the correct permissions.');
  }
}

createCollections();