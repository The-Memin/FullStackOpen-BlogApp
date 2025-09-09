import { useState } from 'react'

const useNotification = () => {
    const [notificationMessage, setNotificationMessage] = useState(null)

    const setNotification = notification => {
        setNotificationMessage({
            content: notification.content,
            type: notification.type
        })
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    return{
        notificationMessage,
        setNotification
    }
}

export default useNotification