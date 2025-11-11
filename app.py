import os
from datetime import datetime
from flask import Flask, render_template, jsonify
#from flask_cors import CORS

# Libs Configurations
app = Flask(__name__)
# Enable CORS for all routes
#CORS(app)


@app.route("/", methods=["GET"])
def index():
  return render_template("index.html")

# Function to get the current time
# -> decouple the data and return structured data, tuple
"""
def get_time():
  # From the time library
  now = datetime.now();
  time_data = now.strftime("%I:%M:%S")

  #unpack the time_data string
  hours = int(time_data[0:2])
  minutes = int(time_data[3:5])
  seconds = int(time_data[6:8])

  return (hours, minutes, seconds)


# Function to convert time tuple from get_time to string
def convert_to_string(nums: tuple[int, int, int]) -> str:
  hrs = str(nums[0])
  mins = str(nums[1])
  secs = str(nums[2])
  #print(f"{hrs},{mins},{secs}")
  #time_nums = tuple(int(x) for x in get_time().split(", "))
  return (f"{hrs}, {mins}, {secs}")
"""

# Function to get the tuple time information
# -> decouples the data further and store in a dict
@app.route('/api/binary_time')
def bin_time_endpoint():
  current_time = datetime.now()
  hours = current_time.hour
  minutes = current_time

  # Function to convert time to binary in 4-bit binary format
  def convert_to_binary(num):
    return format(num, "04b")
    #print(f"\n Hours: {hours} \n Minutes: {minutes} \n Seconds: {seconds}")
    #binary_time = bin(time).replace("0b", "")

  # Split each time component into inividual digits formatted as decimals/padded with zeros
  h1, h2 = [x for x in str(hours).zfill(2)]
  m1, m2 =  [x for x in str(minutes).zfill(2)]
  s1, s2 = [x for x in str(seconds).zfill(2)]

  # Convert each digit to binary
  data = {
    "hours": [convert_to_binary(int(h1)), convert_to_binary(int(h2))],
    "minutes": [convert_to_binary(int(m1)), convert_to_binary(int(m2))],
    "seconds": [convert_to_binary(int(s1)), convert_to_binary(int(s2))]
  }

  # Prevent aggressive caching during development
  response = jsonify(data)
  response.headers["Cache-Control"] = "no-store"
  return response




# Run app in debug mode
if __name__ == "__main__":
  app.run(debug=True)