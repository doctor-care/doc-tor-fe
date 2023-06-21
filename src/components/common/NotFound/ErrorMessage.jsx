import React from 'react'

export default function ErrorMessage(props) {
    const { messageId } = props;
    const danger = { color: "red" };
    return (
        <span style={danger}>{messageId}</span>
    )
}
