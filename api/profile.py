from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = {
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
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return
