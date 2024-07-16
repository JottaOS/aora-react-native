/**
 * Appwrite config. The keys should be safely public, but i put them in a .env anyways
 */
import { Client } from 'react-native-appwrite';

export const config = {
  endpoint: process.env.APPWRITE_ENDPOINT,
  platform: process.env.APPWRITE_PLATFORM,
  projectId: process.env.APPWRITE_PROJECT_ID,
  databaseId: process.env.APPWRITE_DATABASE_ID,
  userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.APPWRITE_STORAGE_ID,
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint ?? "") // Your Appwrite Endpoint
    .setProject(config.projectId ?? "") // Your project ID
    .setPlatform(config.platform ?? "") // Your application ID or bundle ID.
;