import React from 'react'

function Manager() {
    return (
        // Background-only element should not intercept pointer events
        <div className="absolute inset-0 -z-10 pointer-events-none">
    {/* I replaced #63e with #22c55e (a brighter standard green) */}
    <div className="h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#22c55e_100%)]"></div>
</div>
    )
}

export default Manager
