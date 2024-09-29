from bs4 import BeautifulSoup
import pandas as pd
import json
import random

companies = ['ciena.csv', 'rossvideos.csv']
jobs = []
for company in companies:
    with open(company, 'r') as company_file:
        company_data = company_file.read()

    # company_soup = BeautifulSoup(company_data, 'csv')
    # print(company_soup)

    # Parse the CSV file using pandas
    df = pd.read_csv(company)

    # Extract the desired columns
    job_title = df['job_title']
    posted_date = df['posted_date']
    job_location = df['job_location']
    job_description = df['job_description']
    company_name = df['company_name']
    company_description = df['company_description']

    # Create a dictionary for each job
    for i in range(len(job_title)):
        if (company == 'ciena.csv'):
            icon = 'https://logowik.com/content/uploads/images/ciena2160.jpg'
        elif (company == 'rossvideos.csv'):
            icon = 'https://www.mixdexhq.com/wp-content/uploads/ross-logo.jpg'

        job = {
            'icon': icon,
            'job_title': job_title[i],
            'posted_date': posted_date[i],
            'job_location': job_location[i],
            'job_description': job_description[i],
            'company_name': company_name[i],
            'company_description': company_description[i]
        }
        jobs.append(job)

with open('jobs.jsx', 'w') as jobs_file:
    random.shuffle(jobs)
    jobs_file.write("export const jobs = " + json.dumps(jobs, indent=4))