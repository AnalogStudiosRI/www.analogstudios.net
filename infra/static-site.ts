// TODO could this just be an S3 bucket?
// https://sst.dev/docs/component/aws/static-site
export const frontend = new sst.aws.StaticSite("AS-Website-Static", {
  path: "public",
});
