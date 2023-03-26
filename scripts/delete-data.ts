import { PINECONE_INDEX_NAME } from '@/config/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import path from 'path';
import { loadDocDirectories } from './utils';

export const run = async () => {
  const directories = await loadDocDirectories()
  const namespaces = directories.map((directory) => path.basename(directory))
  await Promise.all(namespaces.map((deleteAll)))
}

(async () => {
  await run();
  console.log('delete complete');
})();

async function deleteAll(targetNamespace: string) {
  const targetIndex = PINECONE_INDEX_NAME;
  try {
    const index = pinecone.Index(targetIndex);
    await index._delete({
      deleteRequest: {
        namespace: targetNamespace,
        deleteAll: true,
      },
    });
  } catch (error) {
    console.log('error', error);
    throw new Error(`Failed to delete your namespace: ${targetNamespace}`);
  }
}