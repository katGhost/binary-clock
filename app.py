import os
import time
from datetime import datetime
from flask import Flask, render_template, jsonify

# Libs Configurations
app = Flask(__name__)
# From the time library
now = datetime.now();


@app.route("/")
def index():
  return render_template("index.html")


# Function to convert time to binary in 4-bit binary format
def convert_to_binary(num):
  return format(num, "04b")
  #print(f"\n Hours: {hours} \n Minutes: {minutes} \n Seconds: {seconds}")
  #binary_time = bin(time).replace("0b", "")

# Function to get the current time
# -> decouple the data and return structured data, tuple
def get_time():
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


@app.route("/time")
def time_endpoint():
  hours, minutes, seconds = get_time()

  time_info = {
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds
  }

  return jsonify(time_info)

# Function to get the tuple time information
# -> decouples the data further and store in a dict
@app.route("/binary_time")
def bin_time_endpoint():
  hours, minutes, seconds = get_time()

  # Split each time component into inividual digits formatted as decimals/padded with zeros
  h1, h2 = [x for x in str(hours).zfill(2)]
  m1, m2 =  [x for x in str(minutes).zfill(2)]
  s1, s2 = [x for x in str(seconds).zfill(2)]

  # Convert each digit to binary
  binary_time_info = {
    "hours": [convert_to_binary(int(h1)), convert_to_binary(int(h2))],
    "minutes": [convert_to_binary(int(m1)), convert_to_binary(int(m2))],
    "seconds": [convert_to_binary(int(s1)), convert_to_binary(int(s2))]
  }

  return jsonify(binary_time_info)





if __name__ == "__main__":
  app.run(debug=True)