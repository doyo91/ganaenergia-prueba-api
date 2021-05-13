const { app } = require('../../index')
const supertest = require('supertest')
const User = require('../../models/User')

const api = supertest(app)

const initialArticles = [
  {
    title: 'Article 1',
    description: 'Description article 1',
    price: 55,
    stock: 5
  },
  {
    title: 'Article 2',
    description: 'Description article 2',
    price: 15,
    stock: 2
  },
  {
    title: 'Article 3',
    price: 35,
    stock: 0
  }
]

const getAllContentFromArticles = async () => {
  const response = await api.get('/api/articles')
  console.log(response)
  return {
    title: response.body.map((article) => article.title),
    id: response.body.map(article => article.id),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map((user) => user.toJSON())
}

module.exports = { initialArticles, api, getAllContentFromArticles, getUsers }
