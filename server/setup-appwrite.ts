import { databases, DATABASE_ID, USERS_COLLECTION_ID, SAVED_STACKS_COLLECTION_ID, ID } from "@shared/appwrite";

async function testAppwriteConnection() {
  try {
    console.log('Testing Appwrite connection...');
    console.log('Database ID:', DATABASE_ID);
    console.log('Users Collection:', USERS_COLLECTION_ID);
    console.log('Stacks Collection:', SAVED_STACKS_COLLECTION_ID);
    
    // Test creating a simple document to verify collections exist
    try {
      const testUser = await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        ID.unique(),
        {
          username: 'test-user-' + Date.now(),
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          isPro: false,
          savedStacksCount: 0
        }
      );
      console.log('✓ Users collection is working');
      console.log('Created test user:', testUser.$id);
      
      // Clean up test document
      await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, testUser.$id);
      console.log('✓ Test user cleaned up');
      
    } catch (error: any) {
      console.log('Error testing collections:', error.message);
      if (error.code === 404) {
        console.log('Collections need to be created in Appwrite Console');
      }
    }
    
  } catch (error: any) {
    console.error('Appwrite connection failed:', error.message);
  }
}

// Run test
testAppwriteConnection();

export { testAppwriteConnection };