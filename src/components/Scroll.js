import React from 'react'

const Scroll = (props) => {
    const { height } = props;

    return (
        <div style={{ overflow: 'scroll', height: height ?? 700, border: '1px solid black' }}>
            {props.children}
        </div>
    )
}

export default Scroll
