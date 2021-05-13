/* eslint-disable no-undef */
const mongoose = require('mongoose')
const { server } = require('../index')
const Article = require('../models/Article')
const {
  initialArticles,
  api,
  getAllContentFromArticles
} = require('./helpers/helpers')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWJhNmZkYzlmODA5M2VjODkwNDg5NyIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTYyMDg4Njc2NiwiZXhwIjoxNjIxNDkxNTY2fQ.87ek3uJtA4P6fkbGI9NsVD_yhbFg1moeYUcBjwJ_W7s'

beforeEach(async () => {
  await Article.deleteMany({})

  // sequential
  for (const article of initialArticles) {
    const articleObject = new Article(article)
    await articleObject.save()
  }
})

describe('GET articles', () => {
  test(' are returned as json', async () => {
    await api
      .get('/api/articles')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all articles are returned', async () => {
    const response = await api.get('/api/articles')
    expect(response.body).toHaveLength(initialArticles.length)
  })
})

describe('POST article', () => {
  test(' a valid article can be added', async () => {
    const newArticle = {
      title: 'Article test',
      description: 'Description article test',
      price: 15,
      stock: 2
    }
    await api
      .post('/api/articles')
      .set('authorization', 'Bearer ' + token)
      .send(newArticle)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { title, response } = await getAllContentFromArticles()

    expect(response.body).toHaveLength(initialArticles.length + 1)
    expect(title).toContain('Article test')
  })

  test(' note without title is not added', async () => {
    const newArticle = {
      description: 'Description article test',
      price: 15,
      stock: 2
    }
    await api
      .post('/api/articles')
      .set('authorization', 'Bearer ' + token)
      .send(newArticle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/articles')

    expect(response.body).toHaveLength(initialArticles.length)
  })
})

describe('DELETE article', () => {
  test.skip(' a article can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromArticles()
    const { body } = firstResponse
    const { articleToDelete } = body[0]

    await api.delete(`/api/articles/${articleToDelete.id}`)
      .set('authorization', 'Bearer ' + token)
      .expect(200)

    const {
      title,
      response: secondResponse
    } = await getAllContentFromArticles()

    expect(secondResponse.body).toHaveLength(initialArticles.length - 1)
    expect(title).not.toContain(articleToDelete.title)
  })

  test(' a note that do not exist can not be deleted', async () => {
    await api.delete('/api/articles/1234')
      .set('authorization', 'Bearer ' + token)
      .expect(400)

    const { response } = await getAllContentFromArticles()

    expect(response.body).toHaveLength(initialArticles.length)
  })
})

describe('Protected routes', () => {
  test(' POST Unauthorized Access', async () => {
    const newArticle = {
      title: 'Article test',
      description: 'Description article test',
      price: 15,
      stock: 2
    }
    await api
      .post('/api/articles')
      .send(newArticle)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test(' DELETE Unauthorized Access', async () => {
    await api.delete('/api/articles/1234')
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
