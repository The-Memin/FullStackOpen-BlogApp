import { useState } from 'react'
const CreateBlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const setters = { title: setTitle, author: setAuthor, url: setUrl }
    const handleChangeText = (field) => (e) => {
        setters[field]?.(e.target.value)
    }

    const onCreateNewBlog = async (e) => {
        e.preventDefault()
        try{
            const newBlog = {
                'title': title,
                'author': author,
                'url': url
            }
            addBlog(newBlog)
            setTitle('')
            setAuthor('')
            setUrl('')
        }catch{
            console.log('ha ocurrido un error')
        }
    }
    return(
        <div>
            <h3>create new blog</h3>
            <form onSubmit={onCreateNewBlog}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input id='title' type="text" value={title} placeholder='title' onChange={handleChangeText('title')} name="text"/>
                </div>
                <div>
                    <label htmlFor="author">author:</label>
                    <input id='author' type="text" value={author} placeholder='author' onChange={handleChangeText('author')} name="author"/>
                </div>
                <div>
                    <label htmlFor="url">url:</label>
                    <input id='url' type="text" value={url} placeholder='url' onChange={handleChangeText('url')} name="url"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm