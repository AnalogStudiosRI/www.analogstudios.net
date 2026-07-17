interface Post {
  id: number;
  title: string;
  summary: string;
  createdTime: number;
}

const POSTS_API_URL = "/api/posts";

async function getPosts(): Promise<Post[]> {
  return fetch(POSTS_API_URL).then((resp) => resp.json());
}

export type { Post };
export { getPosts };
