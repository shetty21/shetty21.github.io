// projectsData.js
export const projectsData = [
  {
    slug: "glassdoor-job-analysis",
    title: "Web Scraping and Exploratory Data Analysis of Glassdoor Job Postings",
    image: "/assets/glass.png",
    tools: "Python (BeautifulSoup, Selenium, pandas, regex), Excel, Tableau, Power BI, NLTK",
    bullets: [
      "Scraped and analyzed over 10,000 job postings and company reviews from Glassdoor, focusing on analytics roles (Data Analyst, Business Analyst, Data Scientist, ML Engineer).",
      "Identified top skills in demand (Excel, SQL, Tableau, Power BI, Python) and mapped their prevalence by location, highlighting hubs like NYC and San Francisco.",
      "Performed sentiment analysis on company reviews, revealing generally positive employee sentiment across 56 large and medium-sized companies.",
      "Created visualizations (word clouds, heatmaps) to present trends and provided actionable insights for job seekers in analytics."
    ]
  },
  {
    slug: "flight-status-prediction",
    title: "Flight Status Prediction Using Machine Learning Models",
    image: "/assets/flight.png",
    tools: "Python (pandas, scikit-learn, NumPy, Jupyter Notebook, Matplotlib, Seaborn)",
    bullets: [
      "Analyzed 4 million flight records from 2022 to classify flights as on-time, delayed, or canceled.",
      "Benchmarked four machine learning models: Random Forest (92% accuracy), Decision Trees (88%), Neural Networks (27%), and Multinomial Naive Bayes (58%).",
      "Uncovered operational insights: American and Southwest Airlines had the most cancellations; model performance was affected by data size and class imbalance.",
      "Recommended infrastructure improvements such as cloud-based scaling and historical data integration for better trend analysis."
    ]
  },
  { 
    slug: "ict-quality-of-life",
    title: "Exploring the Association between ICT and Quality of Life: An Empirical Study",
    image: "/assets/ict.png",
    tools: "R (tidyverse, ggplot2), Excel, Tableau, GIS mapping tools",
    bullets: [
      "Investigated the impact of Information and Communication Technology (ICT) on socioeconomic indicators (income, employment, life expectancy) across European regions.",
      "Found positive correlations between ICT employment, broadband coverage, and higher incomes/life expectancy, especially in Western Europe.",
      "Analyzed digital divides: Noted disparities in broadband and education/training participation; suggested targeted investments in digital infrastructure and education.",
      "Explored environmental impacts: Mixed findings on the relationship between ICT growth, high-tech trade, and sustainability; highlighted the need for balanced development policies."
    ]
  },
  {
  slug: "stellar-classification-ml",
  title: "Stellar Classification Using Machine Learning: Classifying Stars, Galaxies, and Quasars",
  image: "/assets/star.png",
  tools: "Python (Random Forest, Decision Tree, Neural Network), Kaggle & SDSS dataset",
  bullets: [
    "Developed machine learning models to classify astronomical objects as stars, galaxies, or quasars using spectral data.",
    "Used a clean dataset of 100,000 observations and 9 key features (e.g., right ascension, declination, photometric filters, redshift).",
    "Identified redshift as the most important feature for accurate classification.",
    "Achieved high accuracy with multiple models: Decision Tree (97.54%), Neural Network (96.35%), Random Forest (97.59%).",
    "Tested Random Forest without redshift, resulting in a drop to 86.69% accuracy, confirming redshift's importance.",
    "Validated results with multiple train-test splits (60/40, 70/30, 80/20) and a sanity test.",
    "Recommended further feature engineering, applying models to new data releases, and deeper redshift analysis."
  ]
}
];

