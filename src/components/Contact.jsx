import React from 'react'

const Contact = () => {
  return (
    <div className="container mx-auto max-w-4xl p-3 sm:p-4 md:p-6 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">
        Contact <span className="text-green-500">Us</span>
      </h1>
      <p className="text-center text-green-200 mb-6 sm:mb-8 text-sm sm:text-base">We'd love to hear from you!</p>

      <div className="flex justify-center">
        <form className="w-full max-w-lg bg-green-950/50 p-6 sm:p-8 rounded-xl border border-green-500 shadow-lg backdrop-blur-sm flex flex-col gap-4 sm:gap-6">

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-green-400 text-sm sm:text-base">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="border border-green-500 rounded-lg p-2.5 sm:p-3 bg-green-950 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all text-sm sm:text-base"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-green-400 text-sm sm:text-base">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border border-green-500 rounded-lg p-2.5 sm:p-3 bg-green-950 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all text-sm sm:text-base"
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-semibold text-green-400 text-sm sm:text-base">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Type your message here..."
              className="border border-green-500 rounded-lg p-2.5 sm:p-3 bg-green-950 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all resize-none text-sm sm:text-base"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className='flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-200 shadow-md shadow-green-900 w-full text-sm sm:text-base'>
            <lord-icon
              src="https://cdn.lordicon.com/rsvfbr66.json"
              trigger="hover"
              colors="primary:#000000"
              style={{ width: "25px", height: "25px" }}>
            </lord-icon>
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
