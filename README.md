# Artapp

Deployed at [https://duetart.vercel.app/](https://duetart.vercel.app/)

This project is mean to be a platform for artists to share their work and receive feedback. It lets you upload artworks with some details and share your portfolio with others. You can leave comments and feedback directly on images and see a canvas view of the uploaded art.

Here are some use cases for the app:

- Upload your artwork with metadata like tags and description
- View recently uploaded artworks by others
- Leave comments and feedback on artworks, including on specific spots within images
- View a users artwork on their portfolio page

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

The project requires the following services:

- Postgres managed with Neon DB (can be changed for another postgres instance fairly easily by switching the drizzle adapter in src/db/index.ts, see [here](https://orm.drizzle.team/docs/quick-postgresql))
- Clerk for authentication
- Uploadthing for image uploads
- TwicPic for image optimization

To set these services up, copy the env.template, rename it to .env and enter the keys.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the running website.

## ER Model
![ERD](assets/er_model.png "ER Model")