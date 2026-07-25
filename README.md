# Bible Quiz Dashboard

A modern, responsive web application for displaying and analyzing Bible quiz results. Built with React, TypeScript, and designed for AWS hosting.

## Features

- 📊 **Dashboard Overview**: View overall statistics and performance metrics
- 📚 **Book Results**: Detailed results for each Bible book quiz
- 👥 **Participant Profiles**: Individual participant performance analysis
- 📈 **Performance Analytics**: Score distribution and completion time analysis
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- 📱 **Mobile Friendly**: Optimized for all device sizes

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern gradients and animations
- **Data**: JSON files (easily replaceable with API calls)
- **Hosting**: Designed for AWS S3 + CloudFront

## Project Structure

```
bible-quiz-dashboard/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── data/
│   │   ├── participants.json
│   │   ├── genesis-results.json
│   │   └── exodus-results.json
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── BookResults.tsx
│   │   └── ParticipantDetails.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Data Structure

### Participants
```typescript
interface Participant {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalQuizzesTaken: number;
  averageScore: number;
}
```

### Quiz Results
```typescript
interface QuizResult {
  participantId: string;
  bookName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completionTime: number;
  date: string;
  percentage: number;
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Node.js** (if not already installed):
   ```bash
   # On macOS with Homebrew
   brew install node
   
   # Or download from https://nodejs.org/
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized static files ready for deployment.

## AWS Deployment

### Option 1: S3 + CloudFront (Recommended)

1. **Create an S3 bucket** for your website
2. **Enable static website hosting** on the bucket
3. **Upload the build folder** contents to S3
4. **Set up CloudFront** for CDN and HTTPS
5. **Configure Route 53** for custom domain (optional)

### Option 2: AWS Amplify

1. **Connect your GitHub repository** to AWS Amplify
2. **Configure build settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: build
       files:
         - '**/*'
   ```

## Customization

### Adding New Bible Books

1. Create a new JSON file in `src/data/` (e.g., `leviticus-results.json`)
2. Follow the same structure as existing book files
3. Update the routing logic in `BookResults.tsx`
4. Add navigation links in `Header.tsx`

### Connecting to Real Data

Replace the JSON imports with API calls:

```typescript
// Instead of importing JSON files
const fetchBookResults = async (bookName: string) => {
  const response = await fetch(`/api/books/${bookName}/results`);
  return response.json();
};
```

### Styling Customization

The app uses CSS custom properties for easy theming. Modify colors in `src/App.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
}
```

## Features to Add

- [ ] **Charts and Graphs**: Add Recharts for data visualization
- [ ] **Export Functionality**: Download results as CSV/PDF
- [ ] **Search and Filter**: Advanced filtering options
- [ ] **Real-time Updates**: WebSocket integration for live results
- [ ] **Authentication**: User login and role-based access
- [ ] **Admin Panel**: Manage participants and quizzes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue on GitHub. 