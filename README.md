# Portfolio Website v2

A modern, responsive portfolio website showcasing professional experience, skills, projects, and blog posts. Built with React.js frontend and Python backend, deployed on Vercel.

## 🌟 Features

- **Responsive Design**: Fully responsive layout for both mobile and desktop devices
- **Modern UI**: Dark theme with smooth animations and hover effects
- **Dynamic Content**: All data fetched from backend API
- **Multiple Pages**:
  - Home: Professional profile with background effects
  - Skills: Technical skills organized by category
  - Blog: LinkedIn blog posts integration
  - Resume: PDF resume viewer with download option
  - About Me: Professional summary
  - Contact: Contact information display
- **Fast Performance**: Optimized with Vite build tool
- **Serverless Backend**: Deployed as Vercel serverless functions

## 🛠️ Tech Stack

### Frontend
- **React.js 18.2.0** - UI library
- **Vite 5.0.0** - Build tool and dev server
- **Axios 1.6.0** - HTTP client for API calls
- **CSS-in-JS** - Inline styles for component styling

### Backend
- **FastAPI** - Local development backend
- **Python HTTP Server** - Production serverless functions (Vercel)
- **Python 3.9+** - Runtime environment

### Deployment
- **Vercel** - Hosting platform for frontend and serverless functions

## 📁 Project Structure

```
portfolio_v2_clean/
├── backend/                 # Local FastAPI backend (development)
│   ├── main.py             # FastAPI application with all endpoints
│   └── requirements.txt     # Python dependencies
│
├── api/                     # Vercel serverless functions (production)
│   ├── profile.py          # Profile endpoint
│   ├── skills.py           # Skills endpoint
│   ├── blog.py             # Blog endpoint
│   ├── resume.py           # Resume endpoint
│   └── projects.py         # Projects endpoint
│
├── frontend/                # React.js frontend application
│   ├── src/
│   │   ├── App.jsx         # Main app component (routing, navigation)
│   │   ├── main.jsx        # React entry point
│   │   ├── api/
│   │   │   └── client.js   # Axios API client configuration
│   │   └── pages/
│   │       ├── Home.jsx   # Homepage with profile
│   │       ├── Skills.jsx  # Skills display page
│   │       ├── Blog.jsx    # Blog posts page
│   │       ├── Resume.jsx  # Resume viewer page
│   │       ├── AboutMe.jsx # About me page
│   │       └── Contact.jsx  # Contact information page
│   ├── public/
│   │   ├── images/         # Static images
│   │   └── resume/         # Resume PDF file
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
├── vercel.json              # Vercel deployment configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.9 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaileshmalkar/portfolio_v2_clean.git
   cd portfolio_v2_clean
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

## 💻 Running Locally

### Development Mode

You need to run both backend and frontend servers simultaneously.

#### Terminal 1: Start Backend Server
```bash
cd backend
uvicorn main:app --reload
```
Backend will run on: `http://127.0.0.1:8000`

#### Terminal 2: Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173` (or similar Vite port)

### Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://127.0.0.1:8000`
- **API Docs**: `http://127.0.0.1:8000/docs` (FastAPI Swagger UI)

## 📡 API Endpoints

### Local Development (FastAPI)

All endpoints are prefixed with `/api`:

- `GET /api/profile` - Get profile information
- `GET /api/skills` - Get skills by category
- `GET /api/blog` - Get blog posts
- `GET /api/resume` - Get resume information
- `GET /api/projects` - Get projects list
- `GET /api/gallery` - Get gallery images

### Production (Vercel Serverless)

Same endpoints, but served as serverless functions:
- `/api/profile` → `api/profile.py`
- `/api/skills` → `api/skills.py`
- `/api/blog` → `api/blog.py`
- `/api/resume` → `api/resume.py`
- `/api/projects` → `api/projects.py`

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Automatic Deployment**
   - Vercel will automatically:
     - Build the frontend (`cd frontend && npm install && npm run build`)
     - Deploy serverless functions from `api/` directory
     - Configure routing based on `vercel.json`

### Vercel Configuration

The `vercel.json` file handles:
- Frontend build configuration
- API route rewrites
- SPA routing (all routes → `index.html`)

## 🔧 Configuration

### Frontend API Configuration

The API base URL is automatically configured based on environment:

- **Development**: `http://127.0.0.1:8000/api`
- **Production**: `/api` (relative path)

This is handled in `frontend/src/api/client.js`.

### Updating Content

To update portfolio content:

1. **For Local Development**: Edit `backend/main.py`
2. **For Production**: Edit corresponding files in `api/` directory
   - Profile: `api/profile.py`
   - Skills: `api/skills.py`
   - Blog: `api/blog.py`
   - Resume: `api/resume.py`
   - Projects: `api/projects.py`

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile**: Hamburger menu, stacked layouts, optimized font sizes
- **Desktop**: Full navigation bar, grid layouts, larger fonts
- **Breakpoint**: 768px (tablets and below = mobile)

## 🎨 Customization

### Changing Colors

The primary accent color is `#00ff88` (green). To change it:
1. Search for `#00ff88` in all frontend files
2. Replace with your desired color

### Adding New Pages

1. Create a new component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`:
   ```javascript
   const pages = {
     'Home': <Home />,
     'NewPage': <NewPage />,  // Add here
     ...
   };
   ```
3. Add navigation link in the `navLinksStyle` section

### Adding New API Endpoints

**For Local Development:**
1. Add endpoint in `backend/main.py`:
   ```python
   @app.get("/api/newendpoint")
   def new_endpoint():
       return {"data": "value"}
   ```

**For Production:**
1. Create `api/newendpoint.py`:
   ```python
   from http.server import BaseHTTPRequestHandler
   import json
   
   class handler(BaseHTTPRequestHandler):
       def do_GET(self):
           data = {"data": "value"}
           self.send_response(200)
           self.send_header('Content-Type', 'application/json')
           self.send_header('Access-Control-Allow-Origin', '*')
           self.end_headers()
           self.wfile.write(json.dumps(data).encode('utf-8'))
   ```
2. Add rewrite in `vercel.json`:
   ```json
   {
     "source": "/api/newendpoint",
     "destination": "/api/newendpoint.py"
   }
   ```

## 🐛 Troubleshooting

### Backend Not Starting
- Check if port 8000 is already in use
- Verify Python version: `python --version` (should be 3.9+)
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Not Loading Data
- Ensure backend is running on `http://127.0.0.1:8000`
- Check browser console for errors
- Verify API calls in Network tab

### Vercel Deployment Issues
- Check Vercel function logs in dashboard
- Verify `vercel.json` syntax
- Ensure all Python files in `api/` have `handler` class

## 📝 License

This project is open source and available for personal use.

## 👤 Author

**Shailesh S Malkar**
- Email: shaileshmalkar557@gmail.com
- LinkedIn: [shailesh-malkar](https://www.linkedin.com/in/shailesh-malkar)
- Phone: +91-9372805789

## 🙏 Acknowledgments

- Built with React.js and FastAPI
- Deployed on Vercel
- Icons and images from Unsplash

---

**Note**: This portfolio is actively maintained. For any issues or suggestions, please contact the author.

