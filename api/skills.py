from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = {
            "Programming Languages": [
                "Python",
                "PHP",
                "ViewJs",
                "React"
            ],
            "Web Technologies": [
                "HTML",
                "CSS",
                "JavaScript",
                "React"
            ],
            "Databases & Tools": [
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "Git",
                "Redis"
            ],
            "Frameworks & Libraries": [
                "FastAPI",
                "Django",
                "Celery",
                "Microservices"
            ],
            "Core Concepts": [
                "Data Structures & Algorithms",
                "System Design",
                "API Design",
                "Scalable Backend Systems"
            ],
            "Soft Skills": [
                "Teamwork",
                "Problem Solving",
                "Communication",
                "Adaptability"
            ]
        }
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return
