from flask import Flask, render_template
import connexion
from flask_cors import CORS

app = connexion.App(__name__, specification_dir='./')
CORS(app.app)

# Create the application instance
app.add_api('swagger.yml')

@app.route("/")
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)