import { Client, Databases, Permission, Role } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;

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