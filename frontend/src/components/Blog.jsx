import { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)
    const showWithVisible = { display: visible ? '':'none' }
    const textVisibilityButton = visible ? 'hide' : 'view'
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className='blog' style={blogStyle}>
            <div className='blogTitle'> {blog.title} <button onClick={toggleVisibility}>{textVisibilityButton}</button></div>
            <div className="details" style={showWithVisible}>
                <div> URL: {blog.url} </div>
                <div> Likes: {blog.likes} <button onClick={() => updateLikes(blog)}>like</button></div>
                <div> Author: {blog.author} </div>
                {
                    (user.username === blog.author) && <button onClick={() => deleteBlog(blog)} className="btn-delete">remove</button>
                }
            </div>
        </div>
    )
}

export default Blog