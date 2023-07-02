# AI Chat Streaming using Vercel AI SDK and Next.js

This is a project that demonstrates how to integrate and use the OpenAI API with Next.js via the Vercel AI SDK. This allows you to integrate a chatbot into your web applications, using the power of OpenAI to generate responses.
![image](https://github.com/Carolcol/chat-gpt-clone/assets/48607783/6d2fcaf7-8bb2-45d2-beda-1fd0d750466e)


## Getting Started

Here's how to get this project running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12.0.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes bundled with Node.js)
- OpenAI API Key

### Installing

1. **Clone the Repository**

    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY

2. **Install Dependencies**

    Run the following command in your terminal:
    
    npm install

3. **Setup Environment Variables**

    Create a `.env.local` file in the root directory of your project. Add the following line to your file:

    OPENAI_API_KEY=yourapikey
    
    Replace `yourapikey` with your actual OpenAI API key. This is necessary for the SDK to be able to interact with the OpenAI API.

4. **Start the Development Server**


    npm run dev


Now, open [http://localhost:3000/test](http://localhost:3000/test) in your browser to see the result.


## Acknowledgments

- [OpenAI](https://openai.com/)
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
