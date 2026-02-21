# CodeCast - Collaborative Code Editor

## 🚀 Overview

**CodeCast** is a real-time collaborative code editor that enables multiple developers to work together on the same codebase simultaneously. Built with modern JavaScript technologies, CodeCast provides a seamless experience for pair programming, code reviews, and distributed team collaboration.

Whether you're teaching coding concepts, conducting code reviews, or simply working with remote teammates, CodeCast brings developers together in a shared coding environment with instant synchronization.

## ✨ Features

✅ **Real-time Collaboration** - Multiple users can edit the same code simultaneously with instant synchronization
✅ **Live Cursor Tracking** - See where other participants are working in the code
✅ **User Presence Indicators** - Visual feedback showing who's currently active
✅ **Code Mirror Integration** - Powerful syntax highlighting and editor features
✅ **Socket.io Powered** - Robust real-time communication for seamless collaboration
✅ **React-Based UI** - Modern, responsive interface for optimal developer experience
✅ **Bootstrap 5** - Professional, mobile-friendly design components
✅ **Cross-Browser Support** - Works in all modern browsers
✅ **Easy Deployment** - Simple setup with Heroku or Node.js server

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Bootstrap 5, CodeMirror, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Build Tools**: React Scripts
- **Testing**: Jest, React Testing Library
- **Package Manager**: npm
- **Version Control**: Git

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A modern web browser (Chrome, Firefox, Edge, or Safari)

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/codecast-latest-full.git
   cd codecast-latest-full
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run start
   ```

4. **Open in browser**:
   - Frontend: Open `http://localhost:3000` in your browser
   - Backend: The server will run on `http://localhost:5000`

### Alternative Installation Methods

**Using Docker** (if available in future versions):
```bash
docker-compose up --build
```

## 🎯 Usage

### Basic Usage

1. **Create a room**:
   - Enter a room name when prompted
   - Choose a username to identify yourself

2. **Start coding**:
   - The editor will load with an empty file
   - Begin typing - your changes will be instantly visible to all participants

3. **Invite collaborators**:
   - Share the room URL with your team members
   - They can join using the same room name

### Advanced Features

**Code Sharing**:
```javascript
// Example of how to programmatically join a room
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');
socket.emit('join', {
  roomId: 'collaboration-room',
  username: 'developer1'
});
```

**Custom Editor Configuration**:
```javascript
// Configure CodeMirror options in your app
<CodeMirror
  value={code}
  onChange={handleCodeChange}
  options={{
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true
  }}
/>
```

## 📁 Project Structure

```
codecast-latest-full/
├── client/                  # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/       # React components
│   │   ├── App.js           # Main application component
│   │   ├── index.js         # React entry point
│   │   └── ...              # Other source files
│   ├── package.json         # Client dependencies
│   └── README.md            # Client-specific documentation
├── server/                  # Node.js backend server
│   ├── index.js             # Server entry point
│   └── ...                  # Other server files
├── .gitignore               # Git ignore rules
├── package.json             # Root dependencies
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```
REACT_APP_API_URL=http://localhost:5000
PORT=3000
```

### Customization Options

1. **Change the default port**:
   ```bash
   npm run start:front -- --port 3001
   ```

2. **Customize the editor theme**:
   ```javascript
   // In your CodeMirror configuration
   theme: 'solarized', // or 'dracula', 'monokai', etc.
   ```

3. **Add new languages**:
   ```javascript
   // In your CodeMirror configuration
   mode: 'javascript', // or 'python', 'htmlmixed', etc.
   ```

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/codecast-latest-full.git
   cd codecast-latest-full
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development servers**:
   ```bash
   # Start the backend server
   cd server
   node index.js

   # In another terminal, start the frontend
   cd client
   npm start
   ```

## 👥 Author

- [Krishnendu De](https://github.com/krishnendude2005)

## 🗺️ Roadmap

### Planned Features

- **Mobile Application**: iOS and Android apps for CodeCast
- **Version Control Integration**: GitHub/GitLab/Bitbucket integration
- **Advanced Collaboration Tools**: Commenting system, code annotations
- **Theming System**: Customizable UI themes
- **Plugin Architecture**: Extend CodeCast with custom plugins
- **AI Assistant**: Built-in code suggestions and explanations

### Future Improvements

- **Performance**: Optimize real-time synchronization for large teams
- **Security**: Add more robust authentication and authorization
- **Accessibility**: Improve keyboard navigation and screen reader support
- **Localization**: Add support for multiple languages

```bash
# Quick start command
git clone https://github.com/yourusername/codecast-latest-full.git && cd codecast-latest-full && npm install && npm run start
```
