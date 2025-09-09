import Blog from '../components/Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { useRef, useState } from 'react'
import useBlogs from '../hooks/useBlogs'

const SORT = {
    ASC: 'asc',
    DESC: 'desc'
}

function sortByLikes(arr, order) {
    if(order === SORT.ASC) return [...arr].sort((a,b) => a.likes-b.likes)
    if(order === SORT.DESC) return [...arr].sort((a,b) => b.likes-a.likes)
    return arr
}

const Blogs = ({ user, onLogOut, setNotification }) => {
    const blogRef = useRef()
    const [order, setOrder] = useState(SORT.DESC)

    const {
        blogs,
        addNewBlog,
        deleteBlog,
        updateLikes
    } = useBlogs(setNotification)
    const addBlog = (newBlog) => {
        blogRef.current.toggleVisibility()
        addNewBlog(newBlog)
    }

    const sortBlogsByLikes = (orderType) => {
        setOrder(orderType)
    }

    const blogsToShow = sortByLikes(blogs, order)

    return(
        <div>
            <div>
                <span>{user.name} logged in</span><button onClick={onLogOut}>log out</button>
            </div>
            <Togglable buttonLabel='create a new blog' ref={blogRef}>
                <CreateBlogForm addBlog={ addBlog }/>
            </Togglable>
            <div style={ { marginTop: '1em' } }>
                <button onClick={() => sortBlogsByLikes(SORT.DESC)}>sort by most likes</button>
                <button onClick={() => sortBlogsByLikes(SORT.ASC)}>sort by few likes</button>
                {blogsToShow.map(blog =>
                    <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
                )}
            </div>
        </div>
    )
}

export default Blogs