import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto max-w-4xl p-3 sm:p-4 md:p-6 text-[var(--slate-100)] mt-8 animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
        About <span className="text-emerald-400">&lt;GhostPass/&gt;</span>
      </h1>

      <div className="glass-card p-6 sm:p-8 rounded-2xl">
        <p className="text-base sm:text-lg mb-4 sm:mb-6 text-[var(--slate-200)]">
          <span className="text-emerald-400 font-bold">GhostPass</span> is a secure, MongoDB-based password manager designed to keep your credentials safe and accessible with a beautiful, modern interface.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-3 sm:mb-4">Why use GhostPass?</h2>
        <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base text-[var(--slate-300)]">
          <li>
            <strong className="text-[var(--slate-100)]">Secure Database Storage:</strong> Your passwords are safely stored in MongoDB with secure API communication.
          </li>
          <li>
            <strong className="text-[var(--slate-100)]">Clean Interface:</strong> A distraction-free, dark-mode UI designed for developers and tech enthusiasts.
          </li>
          <li>
            <strong className="text-[var(--slate-100)]">Fully Responsive:</strong> Works seamlessly across desktop, tablet, and mobile devices.
          </li>
          <li>
            <strong className="text-[var(--slate-100)]">Open Source:</strong> Transparent code structure allowing you to see exactly how your data is handled.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
