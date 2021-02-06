import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Newblog',
    author: 'Eemil',
    user: {
      username: 'testuser',
      name: 'tester'
    }
  }
  const component = render(
    <Blog blog = {blog}/>
  )
  expect(component.container).toHaveTextContent(
    'Newblog'
  )
  expect(component.container).toHaveTextContent(
    'Eemil'
  )
  component.debug()
})

test('clicking button', async () => {
  const blog = {
    title: 'Newblog',
    author: 'Eemil',
    url: 'blog.com',
    likes: 2,
    user: {
      username: 'testeruser',
      name: 'tester'
    }
  }
  const component = render(
    <Blog blog = {blog}/>
  )
  const button = component.getByText('View')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(
    'blog.com'
  )
  expect(component.container).toHaveTextContent(
    'likes'
  )
})

test('clicking button check amount of likes', async () => {
  const blog = {
    title: 'Newblog',
    author: 'Eemil',
    url: 'blog.com',
    likes: 2,
    user: {
      username: 'testeruser',
      name: 'tester'
    }
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog = {blog} handleLike = {mockHandler}/>
  )
  const viewButton = component.getByText('View')
  const likeButton = component.getByText('Like')
  fireEvent.click(viewButton)
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})