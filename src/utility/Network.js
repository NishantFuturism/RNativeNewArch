// const url = 'https://gorest.co.in/public/v2/';
const url = 'http://192.168.4.93:4242/';

export default {
  users : url + 'users',
  searchUsersByName : url + 'users?name=',
  products : url + 'product/products',
  getProductById : 'product',
  baseUrl : url
}