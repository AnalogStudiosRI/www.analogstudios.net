import { Post } from './post.model.ts';

const POSTS_API_URL = '/api/v2/posts';

function getPosts(): Promise<[Post]> {
  return fetch(POSTS_API_URL)
    .then(resp => resp.json());
}

export {
  getPosts
};