import { PineconeClient } from '@pinecone-database/pinecone';

console.log(process.env.PINECONE_ENVIRONMENT);
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

async function initPinecone() {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
      apiKey: process.env.PINECONE_API_KEY ?? '',
    });
    pinecone.projectName = "44e4bc2"; // see https://github.com/mayooear/gpt4-pdf-chatbot-langchain/issues/60#issuecomment-1484126115

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

export const pinecone = await initPinecone();
