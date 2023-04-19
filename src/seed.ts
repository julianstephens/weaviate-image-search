import { readFileSync, readdirSync } from "fs";
import client from "./client";

/**
 * Converts an image to base64
 * @param imgLoc - path to image to convert
 * @returns string representation of image
 */
const imgToBase64 = (imgLoc: string) => {
  const img = readFileSync(imgLoc);
  return Buffer.from(img).toString("base64");
};

/** Seed db with images in ./img/ */
const uploadImages = async () => {
  const imgs = readdirSync("./src/img");

  const commandList = imgs.map(async (img) => {
    const b64 = imgToBase64(`./img/${img}`);
    await client.data
      .creator()
      .withClassName("Meme")
      .withProperties({
        image: b64,
        text: img.split(".")[0].split("_").join(" "),
      })
      .do();
  });

  await Promise.all(commandList);
};

export default uploadImages;
