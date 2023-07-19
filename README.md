# Lexart Labs - Web Chatbot

## Overview

The goal of this tech test is to create a web chatbot with specific features using React, TypeScript, CSS modules, Zustand for global state management, and LocalStorage as a _"fake database"_.

The chatbot should interpret certain terms to initiate a conversation, require a username and password, provide options related to loans, store conversations in a database, and allow exporting conversations in CSV format.

### Features

The web chatbot should have the following features:

- Interpretation of terms: "Hello," "Goodbye," "Good," and "I want" to initiate a conversation thread with the user.

- Authentication: Require a username and password to continue the conversation.

- Parameterization of username and password strategies.

- Loan options: When encountering the term "loan," display three options: "Do you want to apply for a loan?," "Loan conditions," and "Help."

- Display relevant information and reference links when clicking on the loan
  options.

- Conversation termination: When the user uses the term "Goodbye," finish the
  conversation and store it in the database.

- Export historic conversations: Create a page to export conversations in CSV
  format ordered by date.

### Links

- Project URL: [Chatbot Web App](https://ll-chatbot-front.vercel.app)

## Process

### Built With

The web chatbot project was built using the following technologies and tools:

- React
- TypeScript
- CSS modules
- Zustand (for global state management)
- LocalStorage (as a "fake database")

### Useful Resources

Here are some useful resources related to the tech stack used in the project:

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Zustand GitHub Repository](https://github.com/pmndrs/zustand)
- [LocalStorage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Local Execution

To run the web chatbot locally, follow the instructions below:

#### Prerequisites

- Node.js v16.20 (or higher) should be installed on your machine.

#### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/gabrielh-silvestre/ll-chatbot-front
   ```

2. Navigate to the project directory:

   ```bash
   cd ll-chatbot-front
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and visit `http://localhost:5173` to access the web chatbot.

### Docker Image

Alternatively, you can use the Docker image to run the web chatbot. Follow the steps below:

#### Prerequisites

- Docker should be installed on your machine.

#### Steps

1. Pull the Docker image:

   ```bash
   docker image build -t ll-chatbot .
   ```

2. Run a container using the pulled image:

   ```bash
   docker run --rm -p 5173:5173 ll-chatbot
   ```

3. Open your web browser and visit `http://localhost:5173` to access the web chatbot.

## Author

- [GitHub](https://github.com/gabrielh-silvestre)
- [LinkedIn](https://www.linkedin.com/in/gabrielh-silvestre/?locale=en_US)
- [Dev.To](https://dev.to/gabrielhsilvestre)

Feel free to reach out if you have any questions or feedback regarding the project.
