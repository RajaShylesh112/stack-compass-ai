import { Client, Databases } from 'node-appwrite';

// Server-side Appwrite client with API key
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

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