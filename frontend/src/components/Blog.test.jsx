import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component', () => {
    let container
    let blog
    let mockHandlerLikes
    beforeEach(() => {
        blog = {
            title: 'Test Blog Title',
            url: 'http://testblog.com',
            likes: 5,
            author: 'testuser'
        }
        const user = {
            username: 'testuser'
        }
        mockHandlerLikes = vi.fn()
        container = render(<Blog blog={blog} updateLikes={mockHandlerLikes} user={user}/>).container
    })

    test('renders title', () => {
        const title = screen.getByText('Test Blog Title', { exact: false })
        const details = container.querySelector('.details')
        expect(details).toHaveStyle('display: none')
        expect(title).toBeDefined()
    })

    test('shows url and likes when view button is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const details = container.querySelector('.details')
        expect(details).not.toHaveStyle('display: none')
        expect(details).toHaveTextContent(`URL: ${blog.url}`)
        expect(details).toHaveTextContent(`Likes: ${blog.likes}`)
    })

    test('calls updateLikes twice when like button is clicked twice', async () => {
        const user = userEvent.setup()

        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandlerLikes).toHaveBeenCalledTimes(2)
    })
})