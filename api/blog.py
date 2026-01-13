from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = {
            "linkedinProfile": "https://www.linkedin.com/in/shailesh-malkar",
            "posts": [
                {
                    "title": "FastAPI Best Practices for Backend Development",
                    "description": "Sharing insights on building scalable APIs with FastAPI, including async operations, dependency injection, and performance optimization techniques.",
                    "date": "2024-01-15",
                    "linkedinUrl": "https://www.linkedin.com/posts/shailesh-malkar_fastapi-python-backend-activity-1234567890",
                    "type": "article"
                },
                {
                    "title": "Optimizing Database Queries with Redis Caching",
                    "description": "How I reduced query execution time from 5 minutes to near real-time using Redis caching strategies in production systems.",
                    "date": "2024-02-20",
                    "linkedinUrl": "https://www.linkedin.com/posts/shailesh-malkar_redis-caching-performance-activity-1234567891",
                    "type": "post"
                },
                {
                    "title": "Microservices Architecture: Lessons Learned",
                    "description": "Key takeaways from building scalable microservices for e-commerce platforms, including API design patterns and service communication.",
                    "date": "2024-03-10",
                    "linkedinUrl": "https://www.linkedin.com/posts/shailesh-malkar_microservices-architecture-api-activity-1234567892",
                    "type": "article"
                },
                {
                    "title": "Mentoring Junior Developers: My Experience",
                    "description": "Reflecting on the journey of mentoring interns and junior developers in Python, FastAPI, and best coding practices.",
                    "date": "2024-04-05",
                    "linkedinUrl": "https://www.linkedin.com/posts/shailesh-malkar_mentoring-python-development-activity-1234567893",
                    "type": "post"
                }
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

