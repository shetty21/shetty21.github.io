import ollama
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("knowledge_base.txt", "r", encoding="utf-8") as f:
    raw_kb = f.read()

SECTION_HEADINGS = {
    "education": "Abhidith's Education",
    "experience": "Abhidith's Professional Experience",
    "project": "Abhidith's Academic Projects",
    "projects": "Abhidith's Academic Projects",
    "academic projects": "Abhidith's Academic Projects",
}

def extract_section(section_heading):
    # Updated pattern to capture content until the next known section heading or end of string.
    # The original pattern `(?=\nAbhidith's |\Z)` was specific to "Abhidith's " prefix
    # We should make it more general to handle any next SECTION_HEADINGS value.
    all_headings_pattern = "|".join(re.escape(h) for h in SECTION_HEADINGS.values())
    pattern = rf"{re.escape(section_heading)}(.*?)(?=\n(?:{all_headings_pattern})|\Z)"
    match = re.search(pattern, raw_kb, re.DOTALL | re.IGNORECASE)
    if match:
        # Return only the content after the heading, stripped of leading/trailing whitespace
        return match.group(2).strip()
    return ""

def get_section_from_query(query):
    q = query.lower()
    if any(word in q for word in ["education", "degree", "university", "college", "study", "undergraduate", "postgraduate"]):
        return SECTION_HEADINGS["education"]
    if any(word in q for word in ["experience", "work", "intern", "employment", "professional"]):
        return SECTION_HEADINGS["experience"]
    if any(word in q for word in ["project", "projects", "academic", "case study", "research"]):
        return SECTION_HEADINGS["projects"]
    return None

def is_greeting(text):
    greetings_pattern = re.compile(r"\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b", re.I)
    return bool(greetings_pattern.search(text))

def is_current_job_question(question):
    q = question.lower()
    return any(
        phrase in q
        for phrase in [
            "where is he working now",
            "current job",
            "current role",
            "current position",
            "currently working",
            "present job",
            "present employer",
            "who is he working for now",
            "who does he work for for now",
            "what is his job now",
            "who is his employer now",
            "who is he with now",
            "where does he work now",
        ]
    )

def extract_current_job(experience_section):
    # Re-adjusted regex to match the observed format: "Company, now a part of MGT Data Analyst Sep 2023 – Present USA - Remote"
    # Or "Tambellini Group, now a part of MGT Data Analyst Sep 2023 – Present USA - Remote"
    # The previous regex expected "Role: ... Location: ... Duration: ..." which isn't in the provided text.
    job_pattern = re.compile(
        r"^(?P<company>.+?) Data Analyst(?P<role_suffix>.*?) Sep (?P<start_year>\d{4}) – Present (?P<location>.+)$",
        re.MULTILINE
    )
    match = job_pattern.search(experience_section)
    if match:
        company = match.group("company").replace(", now a part of MGT", "").strip()
        role = "Data Analyst" + match.group("role_suffix").strip()
        start_year = match.group("start_year").strip()
        location = match.group("location").strip()
        return f"Abhidith Shetty is currently working as a {role} at {company}, {location} (since September {start_year})."
    return "I don't know his current job based on the available information."


def is_college_names_question(question):
    q = question.lower()
    return (
        "college name" in q
        or "colleges" in q
        or "university name" in q
        or "universities" in q
        or "just college" in q
        or q.strip() in ["college?", "colleges?", "universities?"]
    )

def extract_college_name_filter(question):
    match = re.search(
        r"(rv college(?: of engineering)?|fordham university|gabelli school of business)",
        question,
        re.I,
    )
    return match.group(1) if match else None

def is_degree_completion_question(question):
    q = question.lower()
    return (
        ("when" in q or "year" in q or "complete" in q or "finish" in q or "completed" in q or "graduat" in q)
        and ("biotechnology" in q or "rv college" in q or "bachelor" in q or "undergraduate" in q)
    )

def is_contact_question(question):
    q = question.lower()
    return any(word in q for word in [
        "contact", "email", "reach", "get in touch", "connect", "how do i contact", "how can i contact"
    ])

def extract_company_filter(question):
    # Added MGT for Tambellini Group if it's separate in KB.
    companies = ["G2", "Tambellini Group", "MGT", "Sunergi", "CrossTower", "Apptio", "Molecular Connections"]
    for company in companies:
        if company.lower() in question.lower():
            return company
    return None

def extract_location_filter(question):
    match = re.search(r"\b(india|bengaluru|bangalore|usa|new york|new jersey)\b", question, re.I)
    return match.group(1) if match else None

def get_project_from_query(query):
    # More specific project name matching
    projects = [
        "Web Scraping and Exploratory Data Analysis of Glassdoor Job Postings",
        "Flight Status Prediction Using Machine Learning Models",
        "Exploring the Association between ICT and Quality of Life: An Empirical Study",
        "Stellar Classification Using Machine Learning: Classifying Stars, Galaxies, and Quasars"
    ]
    q = query.lower()
    for project in projects:
        if project.lower() in q:
            # Return the exact project title for precise prompting
            return project
    return None

def wants_more_details(question):
    q = question.lower()
    return any(word in q for word in ["more", "details", "full", "expand", "show all", "tell me more", "in depth", "yes"])

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    question = data.get("message", "").strip()

    if not question:
        def stream_empty():
            yield "Please enter a question."
        return StreamingResponse(stream_empty(), media_type="text/plain")

    if is_greeting(question):
        def stream_greeting():
            yield (
                "Hello! 😊 I'm Abhidith's AI assistant. "
                "What would you like to know about Abhidith? "
                "Feel free to ask about his education, professional experience, projects, or anything else!"
            )
        return StreamingResponse(stream_greeting(), media_type="text/plain")

    elif is_contact_question(question):
        def stream_contact():
            yield (
                "You can contact Abhidith Shetty via email at ab.shetty38@gmail.com "
                "or connect with him on LinkedIn: https://www.linkedin.com/in/abhidith-shetty-a5b341114/"
            )
        return StreamingResponse(stream_contact(), media_type="text/plain")

    elif is_current_job_question(question):
        experience_section = extract_section(SECTION_HEADINGS["experience"])
        answer = extract_current_job(experience_section)
        def stream_current_job():
            yield answer
        return StreamingResponse(stream_current_job(), media_type="text/plain")

    elif is_college_names_question(question):
        context = extract_section(SECTION_HEADINGS["education"])
        prompt = (
            "Extract ONLY the names of the colleges or universities where Abhidith Shetty studied, "
            "from the following context. List them as a simple, comma-separated list. "
            "If information is missing, say 'I don't know.'\n\n"
            f"Context:\n{context}"
        )
    elif (college := extract_college_name_filter(question)):
        context = extract_section(SECTION_HEADINGS["education"])
        prompt = (
            f"Extract ONLY the information about {college} from the following context. "
            "Summarize Abhidith Shetty's degree, major, years, and focus areas at this institution. "
            "If information is missing, say 'I don't know.'\n\n"
            f"Context:\n{context}"
        )
    elif is_degree_completion_question(question):
        context = extract_section(SECTION_HEADINGS["education"])
        prompt = (
            "From the following context, extract ONLY the graduation or completion date for Abhidith Shetty's Bachelor of Engineering in Biotechnology (or his undergraduate studies at RV College of Engineering). "
            "If a month and year are given, return them. If only a year, return the year. "
            "If information is missing, say 'I don't know.'\n\n"
            f"Context:\n{context}"
        )
    elif (company := extract_company_filter(question)):
        context = extract_section(SECTION_HEADINGS["experience"])
        # More precise prompt for company details
        prompt = (
            f"From the following context, describe Abhidith Shetty's experience at {company}. "
            "Include his role, duration, location, and a concise summary of his key responsibilities and achievements there. "
            "If information is missing for a specific detail, state that you don't know only for that detail. "
            "If no information is found for the company, state 'I don't know about his experience at {company} based on the available information.'\n\n"
            f"Context:\n{context}"
        )
    elif (location := extract_location_filter(question)):
        context = extract_section(SECTION_HEADINGS["experience"])
        prompt = (
            f"From the following context, extract ONLY the roles and companies where Abhidith Shetty worked in {location}. "
            "For each, include the company name, role, location, and duration. If information is missing, say 'I don't know.'\n\n"
            f"Context:\n{context}"
        )
    elif (project_name := get_project_from_query(question)): # Specific project asked
        context = extract_section(SECTION_HEADINGS["projects"])
        prompt = (
            f"Provide detailed information about Abhidith Shetty's project titled '{project_name}' from the following context. "
            "Include its objectives, the tools/technologies used, the methods employed, and the key results or achievements. "
            "If information is missing, state 'I don't know about that specific detail for this project.' "
            "If the project is not found or has no details, state 'I don't have detailed information for the project titled '{project_name}' based on the available data.'\n\n"
            f"Context:\n{context}"
        )
    elif "project" in question.lower() or wants_more_details(question): # General project question or follow-up 'yes' for details
        context = extract_section(SECTION_HEADINGS["projects"])
        prompt = (
            "Summarize all of Abhidith Shetty's academic projects. For each project, briefly mention its title, main objective, and a key tool or result. "
            "Conclude by asking if the user would like more detailed information about any specific project (e.g., 'Tell me about the Glassdoor project.'). "
            "If information is missing, say 'I don't know.'\n\n"
            f"Context:\n{context}"
        )
    else:
        # Section-aware summarization logic
        section_heading = get_section_from_query(question)
        if section_heading:
            context = extract_section(section_heading)
            if not context.strip():
                context = "No relevant information found in the knowledge base."
            # Summarization prompt for sections
            if "education" in section_heading.lower():
                prompt = (
                    "Summarize Abhidith Shetty's education based on the following context. "
                    "Present the information in a natural, flowing paragraph, highlighting degrees, institutions, locations, durations, and key focus areas. "
                    "Do not copy the text; summarize and paraphrase. If information is missing, say 'I don't know.'\n\n"
                    f"Context:\n{context}"
                )
            elif "experience" in section_heading.lower():
                prompt = (
                    "Summarize Abhidith Shetty's professional experience based on the following context. "
                    "List the roles, companies, locations, and durations, and briefly mention the main responsibilities or achievements for each. "
                    "Write in a natural, flowing style. If information is missing, say 'I don't know.'\n\n"
                    f"Context:\n{context}"
                )
            elif "project" in section_heading.lower():
                prompt = (
                    "Summarize Abhidith Shetty's academic projects based on the following context. "
                    "List the main projects, their objectives, tools/technologies used, and key findings or outcomes. "
                    "Write in a concise, engaging summary. If information is missing, say 'I don't know.'\n\n"
                    f"Context:\n{context}"
                )
            else:
                prompt = (
                    "Summarize the following information about Abhidith Shetty in a clear, friendly paragraph. "
                    "If information is missing, say 'I don't know.'\n\n"
                    f"Context:\n{context}"
                )
        else:
            # Fallback: general prompt with the whole KB (truncated)
            context = raw_kb[:2500] # Ensure context size is manageable for LLM
            prompt = (
                "You are Abhidith Shetty’s AI assistant. Answer the question using only the context provided, "
                "in a friendly but concise third-person style. If info is missing, say 'I don't know.'\n\n"
                f"Context:\n{context}\n\nQuestion: {question}"
            )

    def llm_stream():
        try:
            stream = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}], stream=True)
            for chunk in stream:
                content = chunk.get('message', {}).get('content', '')
                if content:
                    yield content
        except Exception as e:
            # Print the actual exception for debugging locally
            print(f"Error calling Ollama: {e}")
            yield "Sorry, something went wrong. Please try again later."

    return StreamingResponse(llm_stream(), media_type="text/plain")