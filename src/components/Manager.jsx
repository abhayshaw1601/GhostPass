import React from 'react'

function Manager() {
    return (
        // Background gradient - fixed to cover entire viewport
        <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
            {/* Subtle linear gradient matching body background */}
            <div className="w-full h-full bg-gradient-to-br from-navy-950 to-navy-900"></div>
        </div>
    )
}

export default Manager
