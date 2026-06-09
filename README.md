# job-tracker
A job application tracking dashboard with automated  email reminders built using HTML, Bootstrap, PHP, MySQL and n8n

A web-based job application tracker with automated follow-up email reminders powered by n8n.

## Features
- Add and track job applications
- Update application status (Applied, Interview, Offer, Rejected)
- Automated daily email reminders for applications older than 7 days
- MySQL database for data storage

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: PHP
- Database: MySQL (XAMPP)
- Automation: n8n workflow
- Email: Gmail API

## How It Works
1. Add job applications through the web interface
2. n8n workflow runs every day at 9 AM automatically
3. Checks MySQL for applications older than 7 days with no reminder sent
4. Sends personalized Gmail reminder email
5. Marks reminder as sent to avoid duplicates

## n8n Workflow
Schedule Trigger → MySQL (fetch jobs) → Gmail (send reminder) → MySQL (update flag)

## Setup Instructions
1. Install XAMPP and start Apache + MySQL
2. Import database from phpMyAdmin
3. Install n8n globally: npm install -g n8n
4. Run: n8n start
5. Import the workflow JSON file into n8n
6. Configure MySQL and Gmail credentials

