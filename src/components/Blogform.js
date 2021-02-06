import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [ newBlog, setNewBlog ] = useState({ title: '', author: '', url: '' })
  const [ blogFormVisible, setBlogFormVisible ] = useState(false)
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  const loggedUser =  user === undefined ? user : { username: 'testuser', name: 'tester' }
  const addBlog = (event) => {
    event.preventDefault()
    let blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: {
        username: loggedUser.username,
        name: loggedUser.name
      }
    }
    createBlog(blog)
    setNewBlog({ title:'', author: '', url: '' })
    setBlogFormVisible(false)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id='new-blog-button' onClick={() => setBlogFormVisible(true)}>New blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create New</h2>
        <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        <form
          onSubmit = {addBlog}
          id = 'form'>
          <div>
            title
            <input
              id = 'title'
              value={newBlog.title}
              onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
            />
          </div>
          <div>
            author
            <input
              id = 'author'
              value = {newBlog.author}
              onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}/>
          </div>
          <div>
            url
            <input
              id = 'url'
              value = {newBlog.url}
              onChange={e => setNewBlog({ ...newBlog, url: e.target.value })}/>
          </div>
          <button id='save' type='submit'>save</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm