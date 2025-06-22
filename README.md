#  Hello AI (Content Generator)

An AI-powered content generation web app built with **Next.js** — allowing users to generate social media content (Twitter Threads, Instagram Captions, LinkedIn Posts), manage history, and handle authentication, payments, and email notifications.

---

##  Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)

- **Database**: [PostgreSQL](https://www.postgresql.org/)  
  with [Neon](https://neon.tech/) (serverless PostgreSQL) + [Drizzle ORM](https://orm.drizzle.team/)

- **Authentication**: [Clerk](https://clerk.dev/)

- **Payments**: [Stripe](https://stripe.com/)

- **Emails**: [Mailtrap](https://mailtrap.io/)  
  _(used temporarily since I don't have a custom domain yet)_

---

##  Features

1.AI content generation using Google Generative AI (Gemini)  

2. Twitter, Instagram, and LinkedIn content formats  

3. User authentication (Sign in / Sign up) via Clerk  

4. Points-based system (users use points to generate content)  

5. Stripe payments to buy more points  

6. Content history and management  

7. Email notifications via Mailtrap

---

##  Project Setup

### 1️. Clone the repo

```bash
git clone https://github.com/biswajit-sarkar-007/hello_ai_01.git
cd hello_ai_01
```
### 2️. Install dependencies

```
npm install

```
### 3️. Configure Environment Variables
Create a .env.local file:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
DATABASE_URL=your_postgres_neon_db_url
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password

```

### 4. Run locally
npm run dev

### 5. used ngrok for temporarey deployment
usd the  *********3e08.ngrok.free.app/  link in clerk endpoins and clerk endponits also with at the  end ******ngrok.free.app/api/webhooks/clerk or *****ngrok.free.app/api/webhooks/stripe

---

### 6. Deployment

The project is deployed on Vercel, with the following services connected:

1.Neon (PostgreSQL)

2.Stripe (for payments)

3.Clerk (auth)

4.Mailtrap (email sandbox for testing)


### 7.  Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

Author: 
Biswajit Sarkar


