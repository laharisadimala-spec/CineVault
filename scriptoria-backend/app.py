from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from google import genai

# -------------------------------
# APP SETUP
# -------------------------------

app = Flask(__name__)
CORS(app)

# -------------------------------
# DATABASE CONFIGURATION
# -------------------------------

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scriptoria.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# -------------------------------
# GEMINI AI CONFIG
# -------------------------------

# 🔐 Replace with your real API key
client = genai.Client(api_key="AIzaSyD0MgKalsd-uvkM0FL58EclVkq5Aoqsdwk")

# -------------------------------
# DATABASE MODEL
# -------------------------------

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    script = db.Column(db.Text)
    characters = db.Column(db.Text)
    breakdown = db.Column(db.Text)
    sound = db.Column(db.Text)

# -------------------------------
# HOME ROUTE
# -------------------------------

@app.route("/")
def home():
    return {"message": "🎬 Scriptoria Backend Running 🚀"}

# -------------------------------
# GENERATE SCREENPLAY
# -------------------------------

@app.route("/api/generate-screenplay", methods=["POST"])
def generate_screenplay():
    data = request.get_json()
    script_text = data.get("script_text")

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Write a cinematic screenplay opening scene based on:\n\n{script_text}"
        )

        screenplay_text = response.text

        # Save to DB
        new_project = Project(
            title="Untitled Project",
            script=screenplay_text
        )
        db.session.add(new_project)
        db.session.commit()

        return jsonify({"screenplay": screenplay_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# GENERATE CHARACTERS
# -------------------------------

@app.route("/api/generate-characters", methods=["POST"])
def generate_characters():
    data = request.get_json()
    script_text = data.get("script_text")

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Create detailed character profiles based on:\n\n{script_text}"
        )

        return jsonify({"characters": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# GENERATE BREAKDOWN
# -------------------------------

@app.route("/api/generate-breakdown", methods=["POST"])
def generate_breakdown():
    data = request.get_json()
    script_text = data.get("script_text")

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Create a professional film scene breakdown based on:\n\n{script_text}"
        )

        return jsonify({"breakdown": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# GENERATE SOUND DESIGN
# -------------------------------

@app.route("/api/generate-sound", methods=["POST"])
def generate_sound():
    data = request.get_json()
    script_text = data.get("script_text")

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Suggest cinematic sound design ideas based on:\n\n{script_text}"
        )

        return jsonify({"sound_design": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# GET ALL PROJECTS
# -------------------------------

@app.route("/api/projects", methods=["GET"])
def get_projects():
    projects = Project.query.all()

    output = []
    for project in projects:
        output.append({
            "id": project.id,
            "title": project.title,
            "script": project.script,
            "characters": project.characters,
            "breakdown": project.breakdown,
            "sound": project.sound
        })

    return jsonify(output)


# -------------------------------
# APP START
# -------------------------------

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("🚀 Scriptoria AI Backend Running...")
    app.run(debug=True)