import React from 'react'

const MessageToast = ({ message, messageType }: { message: string, messageType: string }) => {
    return (
        <>
            {message && (
                <small
                    className={`
                     px-5 py-2 rounded text-sm font-medium inline-block mb-4
             ${messageType === "success" &&
                        "bg-green-100 text-green-700 border border-green-200"}
             ${messageType === "error" &&
                        "bg-red-100 text-red-700 border border-red-200"}
                `}
                >
                    {message}
                </small>
            )}

        </>
    )
}

export default MessageToast