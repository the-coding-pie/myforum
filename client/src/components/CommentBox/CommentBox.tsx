import React from 'react'
import { CommentBoxWrapper } from './CommentBox.style'

const CommentBox = () => {
    return (
        <CommentBoxWrapper>
            <form>
                <textarea placeholder="What are your thoughts?">
                    
                </textarea>
            </form>
        </CommentBoxWrapper>
    )
}

export default CommentBox
