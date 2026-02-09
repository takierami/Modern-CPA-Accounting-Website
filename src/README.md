# Sterling & Associates CPA - Professional Accounting Firm Website

A modern, premium CPA/accounting firm website built with React, TypeScript, Tailwind CSS, and Supabase. Features advanced multi-step consultation and client intake forms with real auto-save functionality.

## Features

- 🎨 **Premium Financial Aesthetic** - Deep blues, charcoals, and emerald accents
- 📋 **Advanced Multi-Step Forms** - Professional consultation and client intake systems
- 💾 **Real Auto-Save** - Forms automatically save progress with Supabase backend
- 📱 **Responsive Design** - Optimized for all devices
- 🔒 **Secure** - Built-in validation and data persistence
- ⚡ **Performance** - Optimized build with Vite

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4
- **Backend**: Supabase (Edge Functions, Database, KV Store)
- **Forms**: React Hook Form with validation
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account ([Sign up here](https://supabase.com))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd cpa-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Copy the example environment file:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update \`.env.local\` with your Supabase credentials:
   \`\`\`env
   VITE_SUPABASE_URL=your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to Netlify

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your Git provider and select your repository

3. **Configure build settings** (auto-detected from netlify.toml)
   - Build command: \`npm run build\`
   - Publish directory: \`dist\`

4. **Set environment variables**
   - Go to Site settings > Environment variables
   - Add the following variables:
     - \`VITE_SUPABASE_URL\`: Your Supabase project URL
     - \`VITE_SUPABASE_ANON_KEY\`: Your Supabase anon key

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

2. **Login to Netlify**
   \`\`\`bash
   netlify login
   \`\`\`

3. **Initialize site**
   \`\`\`bash
   netlify init
   \`\`\`

4. **Set environment variables**
   \`\`\`bash
   netlify env:set VITE_SUPABASE_URL "your-project-url.supabase.co"
   netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key"
   \`\`\`

5. **Deploy**
   \`\`\`bash
   netlify deploy --prod
   \`\`\`

### Option 3: Manual Deploy via Netlify Drop

1. **Build the project locally**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy to Netlify**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the \`dist\` folder
   - Configure environment variables in Site settings

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details and create

### 2. Deploy Edge Function

The backend server needs to be deployed as a Supabase Edge Function:

1. **Install Supabase CLI**
   \`\`\`bash
   npm install -g supabase
   \`\`\`

2. **Login to Supabase**
   \`\`\`bash
   supabase login
   \`\`\`

3. **Link your project**
   \`\`\`bash
   supabase link --project-ref your-project-ref
   \`\`\`

4. **Deploy the Edge Function**
   \`\`\`bash
   supabase functions deploy make-server-d900d137
   \`\`\`

### 3. Set Environment Variables

In Supabase Dashboard > Settings > Edge Functions, set:
- \`SUPABASE_URL\`
- \`SUPABASE_ANON_KEY\`
- \`SUPABASE_SERVICE_ROLE_KEY\`

## Project Structure

\`\`\`
/
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── figma/              # Figma-specific components
│   ├── Hero.tsx            # Hero section
│   ├── Services.tsx        # Services section
│   ├── Industries.tsx      # Industries section
│   ├── WhyChooseUs.tsx     # Why Choose Us section
│   ├── Team.tsx            # Team section
│   ├── Contact.tsx         # Contact section
│   ├── ConsultationForm.tsx # Multi-step consultation form
│   └── ClientIntakeForm.tsx # Multi-step client intake form
├── styles/
│   └── globals.css         # Global styles and Tailwind config
├── supabase/
│   └── functions/
│       └── server/         # Backend Edge Function
│           ├── index.tsx   # API routes
│           └── kv_store.tsx # KV store utilities
├── utils/
│   ├── supabase-client.ts  # Supabase client setup
│   └── supabase/
│       └── info.tsx        # Supabase configuration
├── App.tsx                 # Main application component
├── netlify.toml           # Netlify configuration
└── .env.example           # Environment variables template
\`\`\`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`VITE_SUPABASE_URL\` | Your Supabase project URL | Yes |
| \`VITE_SUPABASE_ANON_KEY\` | Your Supabase anon/public key | Yes |

## Features Overview

### Multi-Step Forms

Both consultation and client intake forms feature:
- ✅ Real-time auto-save to Supabase
- ✅ Progress indicators
- ✅ Form validation with React Hook Form
- ✅ Ability to resume where you left off
- ✅ Professional onboarding experience

### Sections

1. **Hero** - Impactful headline with call-to-action
2. **Services** - Tax, accounting, advisory, and payroll services
3. **Industries** - Specialized industry expertise
4. **Why Choose Us** - Key differentiators
5. **Team** - Professional team member profiles
6. **Contact** - Multi-step consultation and intake forms

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build locally
- \`npm run lint\` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved.

## Support

For issues or questions, please contact your development team.
