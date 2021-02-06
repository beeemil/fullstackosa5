import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, handleLike }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const buttonText = blogVisible ? 'Hide' : 'View'
  const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  const loggedUser =  user === undefined ? { username: 'testuser', name: 'tester' } : user
  const removeButton = { display: loggedUser.username === blog.user.username ? '' : 'none' }
  console.log('Logged', loggedUser)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log('Logeed user', loggedUser.username)
  const removeBlog = async () => {
    if (window.confirm(`Do you really want to delete ${blog.title}`)) {
      await blogService.remove(blog.id)
      let updatedBlogs = await blogService.getAll()
      updateBlog(updatedBlogs)
    }
  }
  // const handleLike = async (event) => {
  //   event.preventDefault()
  //   blog.likes += 1
  //   await blogService.update(blog.id, blog)
  //   let updatedBlogs = await blogService.getAll()
  //   updateBlog(updatedBlogs)
  // }

  return (
    <div style = { blogStyle } id = 'blog-main'>
      <div>
        {blog.title}, {blog.author} <button id='vis' onClick={() => setBlogVisible(!blogVisible)}>{buttonText}</button>
      </div>
      <div style = {showWhenVisible}>
        url: {blog.url}<br/>
        likes: {blog.likes} <button id='like' onClick={() => handleLike(blog)}>Like</button> <br/>
        <button id='remove' style={removeButton} onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}
export default Blog
