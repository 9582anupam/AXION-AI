# Axion-AI: AI-Powered Learning & Assessment Platform

## Overview
Axion-AI is an advanced learning platform that leverages artificial intelligence to transform how users engage with educational content. The platform enables users to upload various types of content (videos, documents, audio) and transforms them into interactive learning experiences with AI-generated summaries, notes, flashcards, and assessments.

## Features

### Content Learning
- **Multi-format Support**: Learn from various content formats including:
  - YouTube videos
  - PDF documents
  - PowerPoint presentations
  - MP4 videos/Url
  - MP3 audio files/Url
- **Interactive Interface**: Clean, intuitive UI for distraction-free learning
- **Content Organization**: Efficiently organize and access your learning materials

### AI-Enhanced Learning Tools
- **Smart Summaries**: AI-generated key points from any content
- **Detailed Study Notes**: Comprehensive notes extraction to reinforce learning
- **Interactive Flashcards**: Automatically generated question-answer pairs for effective memorization
- **AI Assistant**: Ask questions about the content and receive intelligent responses

### Assessment Generation
- **Customizable Assessments**: Create assessments tailored to your needs
  - Multiple difficulty levels (Easy, Medium, Hard)
  - Various question types (Multiple Choice, True/False, Short Answer, etc.)
  - Language options for multilingual support
- **Assessment Export**: Download assessments as PDF for offline use
- **Interactive Quizzes**: Take assessments online with immediate feedback

### Advanced Technology
- **Natural Language Processing**: Advanced NLP for understanding content context
- **Content Analysis**: Deep analysis of learning materials for accurate assessment generation
- **Continuous Improvement**: AI enhancement based on user performance and feedback
- **Secure & Private**: Enterprise-grade security with customizable privacy settings

## Getting Started

### Prerequisites
- Node.js and npm
- Modern web browser

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/Axion-AI.git
cd Axion-AI
```

<<<<<<< HEAD
2. Install dependencies for both frontend and backend
```bash
# Install Backend dependencies
cd Backend
npm install

# Install Frontend dependencies
cd ../Frontend
npm install
```

3. Set up environment variables (refer to .env.example files)

4. Start the development servers
```bash
# Start Backend
cd Backend
npm run dev

# Start Frontend
cd ../Frontend
npm start
```

## Usage
1. **Upload Content**: Select from various content types and upload your learning materials
2. **Learn**: Explore AI-generated summaries, notes, and flashcards based on your content
3. **Practice**: Generate and take assessments to test your understanding
4. **Ask**: Use the AI assistant to ask questions about the content

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI/ML**: Natural Language Processing, Audio/Video Processing

## License
[Include your license information here]

## Acknowledgments
- [Include any acknowledgments here]
=======
2. Frontend Setup
```bash
cd Frontend
npm install
```

3. Backend Setup
```bash
cd Backend
npm install
```

4. Environment Variables
Create .env file in Backend directory with:
```
PORT=5000
MONGODB_URL=your_mongodb_uri
NODE_ENV=development
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
GEMINI_API_KEY=your_gemini_api_key
ASSEMBLY_API_KEY=your_assembly_api_key
OCR_API_KEY=your_ocr_api_key
```

5. Start Backend Server
```bash
cd Backend
npm start
```

6. Start Frontend
```bash
cd Frontend
npm start
```

### Chrome Extension Setup
1. Navigate to the extension directory
```bash
cd filter
```

2. Build the extension (if needed)
```bash
npm install
npm run build
```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `/filter` directory
   - The Axion-AI extension icon should appear in your browser toolbar

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login and get tokens
- `POST /api/v1/users/refresh-token` - Refresh access token
- `GET /api/v1/users/profile` - Get user profile

### Assessment Generation
- `POST /api/v1/assessmentGenerate/youtube` - Generate Assessment from YouTube video
- `POST /api/v1/assessmentGenerate/media` - Generate Assessment from audio/video file
- `POST /api/v1/assessmentGenerate/document` - Generate Assessment from PDF/PPT

### Assessment Management
- `GET /api/v1/exploreAssessment/all` - Get all assessments
- `GET /api/v1/exploreAssessment/search` - Search assessments
- `POST /api/v1/assessmentResult/:assessmentId/submit` - Submit assessment answers
- `GET /api/v1/assessmentResult/user` - Get user's assessment results

### Chatbot
- `POST /api/v1/chatbot/ask-assessment/:assessmentId` - Ask questions about an assessment

## Using the Chrome Extension

1. **Installation**: After loading the extension, click the Axion-AI icon in your browser toolbar
2. **Open Youtube Video**: There will be a panel on right side of video with quick features.

## Features in Development
- Educator Login
- Progressive Web App
- Multilingual Support
- Real-time collaborative Assessment taking
- Enhanced analytics dashboard
- Mobile application
- Mix Assessment templates
- More assessment types (coding exercises, etc.)
- LMS integration
- Extension support for more browsers (Firefox, Edge, Safari)

## Contributing

To contribute to Axion-AI:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
>>>>>>> 84f6d69cd7acc67212b8dba62d4565c63e245ac0
