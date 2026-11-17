import { useState } from "react"

const ReadMore = ({ children, maxLength = 150, className }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if (children.length <= maxLength) {
        return <p className={className}>{children}</p>
    }

    return (
        <p className={className}>
            {isExpanded ? children : `${children.slice(0, maxLength)}...`}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className=" text-purple-600 hover:bg-purple-700 rounded font-mono text-sm transition-colors duration-200"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                }}
            >
                {isExpanded ? ' read less' : ' read more'}
            </button>
        </p>
    )
}

export default ReadMore;