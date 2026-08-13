# Influencer-Authenticity-Checker

A front-end web app that checks whether a social media influencer's following and engagement look genuine or inflated. A user enters a profile handle or selects one from a sample dataset and gets a readable authenticity signal, backed by the metrics that produced it.

## Data Layer Contribution

The data layer provides the influencer information and scoring functionality used by the Influencer Authenticity Checker.

### Contributions

- Created and organized the influencer dataset in `src/data/influencers.json`.
- Added influencer profile data including followers, following, engagement metrics, follower growth, posting frequency, and account age.
- Added X/Twitter as an additional supported social media platform.
- Extended the dataset from 50 to 60 influencer profiles, including 10 X/Twitter profiles.
- Implemented scoring utilities in `src/utils/scoring.js` for calculating engagement rate, growth rate, and overall authenticity score.
- Connected the data and scoring functionality to the application interface.

### Files

- `src/App.jsx` — platform selection and application interface.
- `src/data/influencers.json` — influencer profile dataset, including X/Twitter profiles.
- `src/utils/scoring.js` — engagement, growth, and authenticity scoring functions.
- `src/index.css` — application styling.
- `src/main.jsx` — React application entry point.

### Branch

`feature/data-layer`
