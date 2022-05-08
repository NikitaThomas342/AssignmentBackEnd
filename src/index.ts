import { createConnection, getRepository } from 'typeorm'
import { Blogs } from './model/blog'
import express from 'express'
import { urlencoded, json } from 'body-parser'
import crypto from 'crypto'

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1q2w3e',
  database: 'dockertest',
  entities: [Blogs],
})

const blogRepository = getRepository(Blogs)

const app = express()

app.set('trust proxy', true)

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/blogs', async (req, res) => {
  const blogs = await blogRepository.find()
  res.status(200).send(blogs)
})

app.post('/blogs', async (req, res) => {
  const newBlog = new Blogs()
  newBlog.id = crypto.randomUUID()
  newBlog.title = req.body.title
  newBlog.content = req.body.content
  await blogRepository.save(newBlog)
  res.status(200).send()
})

app.listen(4000, () => {
  console.log('Server is running at localhost:4000')
})
