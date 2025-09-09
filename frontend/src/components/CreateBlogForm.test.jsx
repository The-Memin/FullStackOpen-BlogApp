import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
import { test } from 'vitest'

describe('CreateBlogForm component', () => {

    test('calls addBlog with correct details when form is submitted', async () => {
        const mockAddBlog = vi.fn()
        const user = userEvent.setup()
        render(<CreateBlogForm addBlog={mockAddBlog}/>)

        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const createButton = screen.getByText('create')

        await user.type(titleInput, 'Test Blog Title')
        await user.type(authorInput, 'Test Author')
        await user.type(urlInput, 'http://testblog.com')
        await user.click(createButton)

        expect(mockAddBlog).toHaveBeenCalledTimes(1)
        expect(mockAddBlog).toHaveBeenCalledWith({
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://testblog.com'
        })
    })
})