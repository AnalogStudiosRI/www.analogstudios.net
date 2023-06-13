#!/usr/bin/env node

import fs from 'fs';
import glob from 'glob-promise';
import mime from 'mime-types';
import path from 'path';
import * as AWS from '@aws-sdk/client-cloudfront';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// import { ListBucketsCommand } from '@aws-sdk/client-s3';
// async function test () {
//   try {
//     const data = await s3Client.send(new ListBucketsCommand({}));
//     console.log('Success', data.Buckets);
//   } catch (err) {
//     console.log('Error', err);
//   }
// }
// test()

// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudfront/index.html
async function run() {
  try {
    const s3Client = new S3Client(CONFIG);
    const cfClient = new AWS.CloudFront(CONFIG);

    // upload public/ directory to S3
    const uploadDir = new URL('./public/', import.meta.url).pathname;
    const uploadFiles = (await glob(`${uploadDir}/**/**`))
      .filter(file => !fs.lstatSync(file).isDirectory());

    for (const file of uploadFiles) {
      const fileStream = fs.createReadStream(file);
      const uploadParams = {
        Bucket: 'www.analogstudios.net',
        Key: file.replace(`${process.cwd()}/public/`, ''),
        Body: fileStream,
        ContentType: mime.lookup(path.extname(file))
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      console.log(`Successfully uploaded object: ${uploadParams.Key}`);
    }

    // invalidate index.html in Cloudfront
    const params = {
      DistributionId: 'E3MKRY7663NB8F',
      InvalidationBatch: {
        CallerReference: new Date().getTime(),
        Paths: {
          Quantity: 1,
          Items: [
            '/index.html'
          ]
        }
      }
    };

    cfClient.createInvalidation(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  } catch (err) {
    console.log('Error', err);
  }
}

run();