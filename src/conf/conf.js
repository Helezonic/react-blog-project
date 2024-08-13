export const conf = {
  appwrite_url: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  appwrite_project: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_database: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwrite_collection: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwrite_bucket: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}


