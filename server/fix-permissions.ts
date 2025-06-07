import { Client, Databases, Permission, Role } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || '6843c4b5001f4a0db778')
  .setKey(process.env.APPWRITE_API_KEY || 'standard_3d04a74de58c2d076a350a07098e1bd491c8d30c2cc996524b6e21156f157601d8c40d4babf6b3e10ebd36db4af20362cf1214e657d0ff7784f767d6d55846b42dd6e49d0924685f9825dbb4ed3e85d027427b114a09174dbbd074d2dabe4cdbdaa8a0acd04f1e7191efd512249386fabe4b347b483446e2623896d577a6a8ad');

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '6843c9bc00393fb3ff24';

async function updatePermissions() {
  try {
    console.log('Updating collection permissions...');

    // Update Users collection permissions
    await databases.updateCollection(
      DATABASE_ID,
      'users',
      'Users',
      [
        Permission.read(Role.any()),
        Permission.create(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any())
      ]
    );
    console.log('✓ Users collection permissions updated');

    // Update SavedStacks collection permissions
    await databases.updateCollection(
      DATABASE_ID,
      'saved_stacks',
      'Saved Stacks',
      [
        Permission.read(Role.any()),
        Permission.create(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any())
      ]
    );
    console.log('✓ SavedStacks collection permissions updated');

    // Test creating a document
    const testUser = await databases.createDocument(
      DATABASE_ID,
      'users',
      'test-' + Date.now(),
      {
        username: 'test-user-' + Date.now(),
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        isPro: false,
        savedStacksCount: 0
      }
    );
    console.log('✓ Test user created successfully:', testUser.$id);

    // Clean up test document
    await databases.deleteDocument(DATABASE_ID, 'users', testUser.$id);
    console.log('✓ Test user cleaned up');

    console.log('🎉 Appwrite integration completed successfully!');
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

updatePermissions();