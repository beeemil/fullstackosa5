import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginform'
import Notification from './components/notification'
import BlogForm from './components/Blogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      let newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Failed to create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async ( blog ) => {
    console.log('blog', blog)
    blog.likes += 1
    await blogService.update(blog.id, blog)
    let updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const updateBlog = (blogs) => {
    setBlogs(blogs)
  }

  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message = {errorMessage}/>
      {user === null ? LoginForm({ handleLogin, username, setUsername, password, setPassword }) :
        <div>
          {user.name} logged in <button onClick={logOut}> logout </button>
          <BlogForm createBlog = {addBlog} />
          {blogs.map(blog => <Blog key = {blog.id} blog = {blog} updateBlog = {updateBlog} handleLike = {handleLike} /> )}
        </div>
      }
    </div>
  )
}

export default App