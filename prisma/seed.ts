import { config as dotenvConfig } from "dotenv";
import path from "node:path";
import fs from "node:fs/promises";
import s3Client from "@/lib/minio";
import prisma from "@/lib/prisma";
import config from "@/lib/config";

// const nodeEnv = process.env.NODE_ENV || "development";

// // Logic matching Next.js environment variable priority
// if (nodeEnv === "production") {
//   dotenvConfig({ path: path.resolve(process.cwd(), ".env.production") });
//   dotenvConfig({ path: path.resolve(process.cwd(), ".env") });
// } else {
//   dotenvConfig({ path: path.resolve(process.cwd(), ".env.development.local") });
//   dotenvConfig({ path: path.resolve(process.cwd(), ".env.local") });
//   dotenvConfig({ path: path.resolve(process.cwd(), ".env.development") });
//   dotenvConfig({ path: path.resolve(process.cwd(), ".env") });
// }

async function insertPublicAssets(bucketName: string) {
  try {
    // const bucketExists = await s3Client.bucketExists(bucketName)
    // if (!bucketExists) {
    //   console.log(`Bucket ${bucketName} does not exist.`);
    //   return;
    // }
    // const assets_directory = path.join(process.cwd(), 'public', 'web')
    // const assets_files = await fs.readdir(assets_directory);
    // for (const file of assets_files) {
    //   const filePath = path.join(assets_directory, file)
    //   const fileBuffer = await fs.readFile(filePath)
    //   const objectName = `assets/${file}`

    //   await s3Client.putObject(bucketName, objectName, fileBuffer)
    //   console.log(`Uploaded ${file} to ${bucketName}/${objectName}`)
    // }
  } catch (error: any) {
    console.error("Error inserting default images:", error);
    throw error;
  }
}

async function insertPrivateDefaultImages(bucketName: string) {
  try {
    // const bucketExists = await s3Client.bucketExists(bucketName)
    // if (!bucketExists) {
    //   console.log(`Bucket ${bucketName} does not exist.`);
    //   return;
    // }
    // const profile_directory = path.join(process.cwd(), 'public', 'assets', 'default_profiles_imgs')
    // const profile_files = await fs.readdir(profile_directory);
    // for (const file of profile_files) {
    //   const filePath = path.join(profile_directory, file)
    //   const fileBuffer = await fs.readFile(filePath)
    //   const objectName = `default/profiles_imgs/${file}`

    //   await s3Client.putObject(bucketName, objectName, fileBuffer)
    //   console.log(`Uploaded ${file} to ${bucketName}/${objectName}`)
    // }
  } catch (error: any) {
    console.error("Error inserting default images:", error);
    throw error;
  }
}

const getPublicReadPolicy = (bucketName: string) => {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*', // Permite el acceso a cualquier persona
        Action: ['s3:GetObject'], // Solo permite leer/descargar, NO escribir ni borrar
        Resource: [`arn:aws:s3:::${bucketName}/*`], // Aplica a todos los objetos dentro del bucket
      },
    ],
  });
};

async function createBucket(bucketName: string, bucketRegion: string) {
  try {
    const bucketExists = await s3Client.bucketExists(bucketName)
    if (!bucketExists) {
      await s3Client.makeBucket(bucketName, bucketRegion)
      console.log(`Bucket ${bucketName} created.`);
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
    }
  } catch (error: any) {
    if (error.code === "BucketAlreadyOwnedByYou" || error.code === "BucketAlreadyExists") {
      console.log(`Bucket ${bucketName} already exists.`);
    } else {
      console.error("Error creating bucket:", error);
      throw error;
    }
  }
}

async function main() {
  await createBucket(config.minio.bucketName, config.minio.region)

  try {
    const policy = getPublicReadPolicy(config.minio.bucketName);
    await s3Client.setBucketPolicy(config.minio.bucketName, policy);
    console.log(`Bucket policy applied for ${config.minio.bucketName}.`);
  } catch (error: any) {
    console.error("Error setting bucket policy:", error);
  }

  await insertPrivateDefaultImages(config.minio.bucketName)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
