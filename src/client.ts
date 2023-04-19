import weaviate, { WeaviateClass, WeaviateClient } from "weaviate-ts-client";

const client: WeaviateClient = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const schemaConf: WeaviateClass = {
  class: "Meme",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};

export const createSchema = async () => {
  const schemaRes = await client.schema.getter().do();
  const memeClass = schemaRes.classes?.find(
    (c) => c.class?.toLowerCase() === "meme"
  );
  if (!memeClass) await client.schema.classCreator().withClass(schemaConf).do();
  return schemaRes;
};

export default client;
