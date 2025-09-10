# Thrive Tribe

Thrive Tribe is a mental health and wellness application that helps users self-assess their stress levels and provides personalized coping strategies. The app follows a freemium model, offering basic features for free while providing premium features via subscription.

![Thrive Tribe Logo](./images/logo.png)

## Features

### Core Features (Free Tier)
- **User Authentication**: Email/password and Google sign-in options
- **Onboarding Process**: User profile setup with preferences
- **Mental Health Assessment**: Interactive stress evaluation questionnaire
- **Personalized Recommendations**: Basic content tailored to assessment results
- **Limited Content Access**: Videos, articles, and self-care strategies

### Premium Features
- **Unlimited Content Access**: Full library of wellness resources
- **Progress Tracking Dashboard**: Monitor wellness journey over time
- **Professional Chat Support**: Connect with mental health professionals
- **Advanced Analytics**: Detailed insights into mental wellbeing progress

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: TailwindCSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payment Processing**: Stripe integration
- **Email Service**: Nodemailer (configured to work with any provider)
- **Animation**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- PostgreSQL 12.x or higher

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/thrive-tribe.git
   cd thrive-tribe
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Google OAuth (for social login)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Database Connection
   DATABASE_URL=postgres://username:password@localhost:5432/thrive_tribe

   # Email Service
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_password
   EMAIL_FROM=Thrive Tribe <support@thrivetribe.com>

   # Stripe (for payment processing)
   STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   ```

4. Set up the database
   
   First, make sure PostgreSQL is installed and running on your system. Then initialize the database and run migrations:
   
   ```
   npm run db:init
   ```
   
   This script will create the database if it doesn't exist and run the necessary migrations to set up all tables.

5. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Building for Production

```
npm run build
# or
yarn build
```

To start the production server:
```
npm start
# or
yarn start
```

## Project Structure

```
thrive-tribe/
├── images/               # Image assets
├── public/               # Public assets (create this directory)
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   ├── assessment/   # Assessment feature
│   │   ├── login/        # Authentication pages
│   │   ├── onboarding/   # User onboarding
│   │   ├── premium/      # Premium features
│   │   ├── recommendations/ # Content recommendations
│   ├── components/       # Shared React components (create as needed)
│   ├── contexts/         # React context providers
│   ├── lib/              # Utility functions and libraries
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Key User Flows

1. **Onboarding Flow**:
   - Sign up → Profile setup → Assessment → Recommendations

2. **Free User Flow**:
   - Login → Dashboard → Limited content → Premium upsell

3. **Premium User Flow**:
   - Login → Dashboard → Full content access → Progress tracking

4. **Admin Flow**:
   - Admin login → Dashboard → Manage users/content/analytics

## Deployment

This application can be deployed on various platforms:

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Good alternative with similar features
- **AWS, Google Cloud, or Azure**: For more control and scalability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-username/thrive-tribe](https://github.com/your-username/thrive-tribe)
