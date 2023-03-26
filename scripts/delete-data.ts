import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { pinecone } from '@/utils/pinecone-client';

/* If you need to delete a namespace in order to re-ingest it you can set the target index and 
namespace here and run this script with `pnpm run delete-namespace` */

export const run = async () => {
  const targetIndex = PINECONE_INDEX_NAME;
  const targetNamespace = PINECONE_NAME_SPACE;

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
    throw new Error('Failed to delete your namespace');
  }
};

(async () => {
  await run();
  console.log('delete complete');
})();