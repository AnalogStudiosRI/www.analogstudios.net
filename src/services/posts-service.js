const POSTS_API_URL = '/api/posts';

function getPosts() {
  return fetch(POSTS_API_URL)
    .then(resp => resp.json());
}

export { getPosts };