import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

export default function useBlogs(setNotification){
    const [blogs, setBlogs] = useState([])
    const [notificationMessage, setNotificationMessage] = useState(null)

    const resetNotificationMessage = () => {
        setNotificationMessage(null)
    }

    const addNewBlog = async newBlog => {
        try {
            const createdBlog = await blogService.create(newBlog)
            setBlogs(prev => [...prev, createdBlog])
            if (setNotification) {
                setNotification({
                    content: `a new blog  You're NOT gonna need it! by ${createdBlog.author} added`,
                    type: 'success'
                })
            }else{
                console.error(`a new blog  You're NOT gonna need it! by ${createdBlog.author} added`)
            }
        } catch (error) {
            setNotification({
                content: error.response.data.error,
                type: 'error'
            })
        }
    }

    const deleteBlog = async blog => {
        try {
            const deleteBlog = window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
            if(!deleteBlog) return null

            await blogService.remove(blog.id)

            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(updatedBlogs)
            setNotification({
                content: `The blog ${blog.title} has been successfully deleted`,
                type: 'success'
            })
        } catch (error) {
            console.log(error)
            setNotification({
                content: error.response.data.error,
                type: 'error'
            })
        }
    }

    const updateLikes = async blog => {
        try {
            const currentBlog = {
                ...blog,
                likes: blog.likes + 1,
            }
            const  updatedBlog = await blogService.update(currentBlog)

            const updatedBlogs = blogs.map(blog => {
                if (blog.id === updatedBlog.id) {
                    return { ...updatedBlog }
                }
                return blog
            })
            setBlogs(updatedBlogs)
        } catch (e) {
            setNotification({
                content: e.response.data.error,
                type: 'error'
            })
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    return {
        blogs,
        notificationBlog:{ message: notificationMessage, resetMessage: resetNotificationMessage },
        addNewBlog,
        deleteBlog,
        updateLikes
    }
}