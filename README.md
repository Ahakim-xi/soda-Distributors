SODA DISTRIBUTORS LTD
Project Overview
Soda Distributors Ltd is a simple web application designed to facilitate the ordering of various soda beverages. Users can select their preferred soda, choose quantity, size, and delivery options, and calculate the total cost of their order.

This project demonstrates dynamic data fetching from a JSON server, interactive UI elements, and a clean, responsive design.

Features
Soda selection fetched from a JSON database (db.json).

Display of soda details including image, flavor, and price.

Selection of quantity, soda size, and delivery options.

Real-time total cost calculation based on selections.

Responsive design optimized for users.

Contact information fixed at the bottom right to facilitate easier communication.

Technologies Used
HTML for markup.

CSS for styling.

JavaScript for interactivity and data fetching.

JSON Server to simulate backend API for soda data.

Setup Instructions
Clone the repository:

bash
Copy
Edit
git clone git@github.com:Ahakim-xi/soda-Distributors.git
Navigate into the project directory:

bash
Copy
Edit
cd soda-distributors
Install JSON Server globally (if you haven't already):

bash
Copy
Edit
npm install -g json-server
Start the JSON Server:

bash
Copy
Edit
json-server --watch db.json
This will run the server on: http://localhost:3000/sodas

Open index.html in your web browser.

Usage
Select a soda from the dropdown menu.

Enter a valid quantity.

Choose soda size and delivery preference.

Click Calculate Total to see the final cost.

Contact info is visible at the bottom right corner of the page.

File Structure
bash
Copy
Edit
/soda-distributors
│
├── index.html       # Main HTML file
├── soda.css         # Stylesheet for the project
├── script.js        # JavaScript file handling logic and data fetching
├── db.json          # JSON database simulating backend data
└── README.md        # Project documentation
Author
Abdihakim Ali




