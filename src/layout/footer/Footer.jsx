import React from "react"

const Footer = () => {
    return (
        <footer className="py-2">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Chlora. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer
