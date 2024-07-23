/**
 * Appwrite config. The keys should be safely public, but i put them in a .env anyways
 */
import { CreateFormData } from "@/app/(tabs)/interfaces";
import { Login, Register } from "@/components/interfaces";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM ?? "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? "",
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID ?? "",
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID ?? "",
};

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async ({ email, password, username }: Register) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarURL,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async ({ email, password }: Login) => {
  try {
    const newSession = await account.createEmailPasswordSession(
      email,
      password
    );
    return newSession;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (query: any) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId), Query.orderDesc('$createdAt')]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (file: any, type: "image" | "video") => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw error;
  }
};

export const getFilePreview = async (
  fileId: string,
  type: "image" | "video"
) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Bottom,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw error;
  }
};

export const createVideoPost = async (
  form: CreateFormData & { userId: string | undefined }
) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw error;
  }
};
