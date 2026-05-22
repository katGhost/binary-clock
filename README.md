# Binary Clock

A real-time **Binary Clock** built with **Flask**, **Python**, **JavaScript**, HTML, and CSS.

Instead of displaying time traditionally, this project represents each digit of the current time (`HH:MM:SS`) as a **4-bit binary column** using glowing light-bulb styled elements inspired by CS50’s “light bulb” lectures.

---

## Features

* Real-time binary clock updates
* Flask-powered backend API
* JavaScript-driven DOM rendering
* Dynamic light bulb activation using binary data
* Minimalist UI with centered layout
* Clean separation between backend logic and frontend rendering

---

## How It Works

### Backend (Flask + Python)

Flask handles all computational logic:

1. Retrieves the current system time
2. Splits time into individual digits
3. Converts each digit into a 4-bit binary string
4. Sends structured JSON to the frontend through an API endpoint

Example response from `/binary_time`:

```json
{
  "hours": ["0001", "0010"],
  "minutes": ["0011", "0100"],
  "seconds": ["0101", "0110"]
}
```

---

### Frontend (JavaScript)

JavaScript fetches binary time data from Flask every second and:

* Maps binary values to bulb elements
* Turns bulbs on/off dynamically
* Keeps the interface synchronized in real time

Each bulb visually represents a binary bit:

* `1` → bulb ON
* `0` → bulb OFF

---

## Tech Stack

* **Backend:** Flask, Python
* **Frontend:** JavaScript, HTML, CSS
* **API Communication:** Axios / Fetch API
* **Styling:** Flexbox + CSS transitions

---

## Project Structure

```bash
binary-clock/
│
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── scripts.js
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/katGhost/binary-clock.git
cd binary-clock
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install flask
```

Run the Flask application:

```bash
python app.py
```

Open your browser and visit:

```bash
http://127.0.0.1:5000
```

---

## Design Notes

The clock uses a **column-based binary layout**:

* Each digit is represented by a vertical stack of 4 bulbs
* Groups are separated into Hours, Minutes, and Seconds
* Flexbox is used for alignment and spacing
* CSS transitions provide smooth visual updates

---

## What I Learned

This project became a great exercise in:

* Backend/frontend communication
* API design with Flask
* Data structure planning
* Binary representation of data
* DOM manipulation with JavaScript
* Real-time UI updates
* Flexbox layout systems

---

## Inspiration

Inspired by the CS50 lectures and their use of light bulbs to visually represent binary data and hidden messages.

---

## Preview

*Add screenshots or GIFs here*

---

## Future Improvements

* Add date display in binary
* Toggle between 12-hour and 24-hour format properly
* Add animations and sound effects
* Improve bulb realism and glow effects
* Mobile responsiveness
* IoT

---

## License

This project is open-source and available under the MIT License.
