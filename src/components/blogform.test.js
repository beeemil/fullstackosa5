import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogform from './Blogform'

test('<BlogForm />updates parent satate and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <Blogform createBlog={createBlog} />
  )
  const form = component.container.querySelector('#form')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const author = component.container.querySelector('#author')

  fireEvent.change(title, {
    target: { value: 'Testing testing' }
  })
  fireEvent.change(url, {
    target: { value: 'test.com' }
  })
  fireEvent.change(author, {
    target: { value: 'Tester Testerman' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing testing')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester Testerman')
})