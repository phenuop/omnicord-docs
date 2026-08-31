export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname.startsWith('/command/')) {
      return fetch(new URL('/index.html', request.url));
    }
    
    return fetch(request);
  }
}
