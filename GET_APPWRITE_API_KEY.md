# How to Get Your Appwrite API Key

## Step-by-Step Instructions

1. **Go to your Appwrite Console**
   - Visit: https://cloud.appwrite.io
   - Log in to your account

2. **Select Your Project**
   - Click on your project (the one with ID: `6843c4b5001f4a0db778`)

3. **Navigate to Settings**
   - Look for "Settings" in the left sidebar
   - Click on it

4. **Go to API Keys**
   - In the Settings section, find "API Keys"
   - Click on "API Keys"

5. **Create a New API Key**
   - Click the "Create API Key" button
   - Give it a name like: "StackBuilder Server"

6. **Set Permissions**
   - Make sure to enable these scopes:
     - `databases.read`
     - `databases.write` 
     - `collections.read`
     - `collections.write`
     - `documents.read`
     - `documents.write`

7. **Copy the Key**
   - After creating, copy the generated API key
   - It will look something like: `standard_abc123def456...`

8. **Add to Environment**
   - Replace `your_api_key_here` in your .env file with the actual key

## Alternative: Using Project Settings

If you can't find "API Keys" in Settings:

1. Go to your project dashboard
2. Look for "Overview" or "Settings" tab
3. Scroll down to find "API Keys" section
4. Follow steps 5-8 above

The API key is essential for server-side authentication with Appwrite.