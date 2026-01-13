# Vercel serverless function handler - includes all backend code
import json

try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from mangum import Mangum
except ImportError as e:
    # If imports fail, create a minimal error handler
    def handler(event, context):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'error': 'Import failed',
                'message': str(e)
            })
        }

# Create FastAPI app
app = FastAPI(title="Portfolio API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API is running", "endpoints": ["/api/profile", "/api/projects", "/api/skills"]}

@app.get("/api/profile")
def profile():
    return {
        "name": "Shailesh S Malkar",
        "initials": "SSM",
        "phone": "+91-9372805789",
        "email": "shaileshmalkar557@gmail.com",
        "location": "Mumbai, India",
        "role": "Senior Software Developer",
        "roleTags": "Python • FastAPI • Backend Systems • Logistics Tech",
        "expertise": "Backend Development & API Integration",
        "skillTags": [
            "Senior Python Developer",
            "FastAPI Expert",
            "Backend Systems",
            "API Integration",
            "Microservices"
        ],
        "socialLinks": {
            "github": "https://github.com/yourusername",
            "linkedin": "https://www.linkedin.com/in/shailesh-malkar",
            "email": "shaileshmalkar557@gmail.com",
            "whatsapp": "+91-9372805789"
        },
        "professionalSummary": "Dynamic Senior Software Developer with proven expertise at Shipdelight Logistics Technology, specializing in Python and FastAPI. Successfully optimized analytics dashboard load time to near real-time using Redis, while enhancing customer experience through seamless API integrations. Adept at collaborating with cross-functional teams, ensuring efficient operations and robust order management solutions.",
        "experience": [
            {
                "title": "Senior Software Developer",
                "company": "Shipdelight Logistics Technology",
                "location": "Mumbai, India",
                "period": "December 2022 - Current",
                "responsibilities": [
                    "Led a team of 2-3 developers in designing, developing, and maintaining multiple e-commerce brand tracking portals for renowned brands like Neeman's and Perfora, enabling seamless order tracking, returns, and exchanges across Shopify, WooCommerce, and Magento.",
                    "Mentored and trained interns, guiding them in Python, FastAPI, React.js, best coding practices, API integrations, and scalable e-commerce system design.",
                    "Designed and implemented a robust wallet system, integrated with e-commerce platforms to facilitate secure online transactions and order management.",
                    "Optimized analytics dashboard performance by implementing Redis caching, reducing query execution time from 5 minutes to near real-time and improving database performance through indexing and query optimization.",
                    "Engineered real-time order synchronization for Shopify, WooCommerce, and Magento, leveraging FastAPI, Django, and webhooks for automatic order status updates, inventory tracking, and seamless fulfillment.",
                    "Integrated courier booking and tracking APIs (Smarter, BlueDart, Ecom) to automate shipment assignment, tracking, and real-time status updates, ensuring efficient last-mile delivery.",
                    "Implemented communication APIs (Gupshup, Fyno) for WhatsApp, email, and SMS, ensuring automated customer notifications, proactive support, and improved user engagement.",
                    "Developed scalable microservices for e-commerce platforms, ensuring high availability, fault tolerance, and seamless API interactions.",
                    "Demonstrated expertise in integrating diverse third-party APIs, including authentication providers, payment gateways, logistics solutions, and e-commerce platforms (Shopify, WooCommerce, Magento)."
                ]
            },
            {
                "title": "Transaction Analyst",
                "company": "Accenture Pvt Ltd",
                "location": "",
                "period": "Mar 2021 – Sep 2022",
                "responsibilities": [
                    "Performed data processing, quality checks, and workflow analysis.",
                    "Helped improve data accuracy and process efficiency."
                ]
            },
            {
                "title": "Python Developer Intern",
                "company": "Quastech",
                "location": "",
                "period": "Jun 2022 – Aug 2022",
                "responsibilities": [
                    "Learned Python fundamentals and built small applications."
                ]
            }
        ],
        "achievements": [
            "Converted an existing PHP module into Python to improve performance.",
            "Key contributor to the Smart Reports analytics system.",
            "Awarded \"Emerging Developer\" at ShipDelight within 6 months."
        ],
        "education": [
            "MSC IT – Model College, Dombivli",
            "BSC IT – Model College, Dombivli",
            "HSC – KV Pendharkar College, Dombivli"
        ]
    }

@app.get("/api/projects")
def projects():
    return [
        {
            "title": "Portfolio Website",
            "description": "Developed a responsive, SEO-optimized portfolio using React.js, showcasing skills, projects, and experience with an interactive UI"
        }
    ]

@app.get("/api/skills")
def skills():
    return {
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

@app.get("/api/resume")
def resume():
    return {
        "filename": "resume.pdf",
        "downloadUrl": "/resume/resume.pdf",
        "title": "Shailesh S Malkar - Resume",
        "lastUpdated": "2024-12-01"
    }

@app.get("/api/blog")
def blog():
    return {
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

@app.get("/api/gallery")
def gallery():
    return [
        {
            "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
            "title": "FastAPI Code",
            "description": "FastAPI backend development and API endpoints"
        },
        {
            "url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
            "title": "Python Development",
            "description": "Python programming and FastAPI framework"
        },
        {
            "url": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
            "title": "Code Editor",
            "description": "VS Code with Python and FastAPI projects"
        },
        {
            "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
            "title": "API Integration",
            "description": "RESTful API development and integration"
        },
        {
            "url": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
            "title": "Microservices Architecture",
            "description": "Scalable microservices with FastAPI"
        },
        {
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            "title": "Database Systems",
            "description": "MongoDB, PostgreSQL, and Redis integration"
        },
        {
            "url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
            "title": "Backend Development",
            "description": "Server-side development with Python"
        },
        {
            "url": "https://images.unsplash.com/photo-1555066931-bb19c3b3c5c7?w=800&q=80",
            "title": "Code Review",
            "description": "Code quality and best practices"
        },
        {
            "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            "title": "Analytics Dashboard",
            "description": "Real-time analytics with Redis caching"
        },
        {
            "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
            "title": "E-commerce Integration",
            "description": "Shopify, WooCommerce, and Magento APIs"
        },
        {
            "url": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
            "title": "System Architecture",
            "description": "Designing scalable backend systems"
        },
        {
            "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            "title": "Developer Workspace",
            "description": "Modern development environment"
        }
    ]

# Create ASGI handler for Vercel
# Use lifespan="off" to avoid async context manager issues
try:
    handler = Mangum(app, lifespan="off")
except Exception as e:
    # Fallback handler if Mangum fails
    def handler(event, context):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'error': 'Handler initialization failed',
                'message': str(e)
            })
        }
