# AI-Powered Behavioral Health Landing Page & Assessment

A production-ready Next.js application for behavioral health organizations featuring a conversion-optimized landing page and one-tap assessment flow.

## Features

- 🚀 **Modern Landing Page** - Hero, pain/outcome split, case studies, and conversion-focused CTAs
- 📋 **One-Tap Assessment** - Smart multi-step flow with autosave and state machine logic
- 🔒 **HIPAA-Aware** - No PHI collection, security-first design
- ♿ **Accessible** - WCAG 2.2 AA compliant with keyboard navigation
- 📱 **Responsive** - Mobile-first design with sticky CTAs
- ⚡ **Performance** - Optimized for Core Web Vitals (LCP ≤ 2.5s)
- 🔄 **Integrations Ready** - CRM, email, and scheduler webhook stubs

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript
- **State Management**: React hooks + custom state machine
- **Validation**: Zod
- **Forms**: React Hook Form
- **UI Components**: shadcn/ui (Radix UI primitives)

## Project Structure

```
behavioral-health-app/
├── app/
│   ├── (marketing)/          # Landing page
│   ├── assessment/            # Assessment standalone page
│   └── api/                   # API routes
├── components/
│   ├── assessment/            # Assessment flow components
│   ├── landing/               # Landing page sections
│   └── ui/                    # Shared UI components
├── lib/
│   ├── validation/            # Zod schemas
│   ├── scoring/               # Assessment scoring logic
│   ├── state-machine/         # Assessment flow state machine
│   └── copy.ts                # Centralized copy/content
├── hooks/                     # Custom React hooks
├── types/                     # TypeScript types
└── data/                      # Static data (EHR list)
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Atiwari330/website_9_27_25.git
cd behavioral-health-app
```

2. Install dependencies
```bash
npm install
```

3. Copy environment variables
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
# API Keys
CRM_API_KEY=your_crm_api_key_here
EMAIL_API_KEY=your_email_api_key_here

# Scheduler
SCHEDULER_EMBED_URL=https://cal.com/your-org/assessment
SCHEDULER_WEBHOOK_SECRET=your_webhook_secret_here

# Bot Protection
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here

# App Configuration
APP_BASE_URL=http://localhost:3000
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
```

## Key Features

### Landing Page
- Hero section with value proposition
- Pain points → Outcomes comparison
- 3-step process explanation
- Case studies with metrics
- Integration ecosystem display
- Security & compliance section
- Transparent pricing
- Testimonials carousel
- FAQ accordion
- Final CTA with contact options

### Assessment Flow
- **Step 1**: Notes method selection (Paper/EHR/Both/Unsure)
- **Step 1a**: EHR picker (conditional, searchable)
- **Step 2**: Compliance requirements (multi-select)
- **Step 3**: Primary pain point
- **Contact**: Name, email, organization, role
- **Schedule**: Optional scheduling integration
- **Confirmation**: Summary and next steps

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assessment-drafts` | Create new draft |
| PATCH | `/api/assessment-drafts/[id]` | Update draft (autosave) |
| POST | `/api/assessments/submit` | Submit assessment |
| GET | `/api/meta/ehr-list` | Get EHR list |
| POST | `/api/crm` | CRM integration (stub) |
| POST | `/api/email/confirm` | Send confirmation email (stub) |
| POST | `/api/schedule/webhook` | Handle scheduler webhooks |

## Security & Compliance

- **No PHI Collection**: Explicit warnings and validation
- **HIPAA/42 CFR Part 2 Aware**: Appropriate disclaimers and BAA references
- **Data Validation**: Server-side Zod validation
- **Rate Limiting**: Basic rate limiting on public endpoints
- **Bot Protection**: Turnstile/hCaptcha integration ready
- **CSP Headers**: Security headers configured

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The app is configured to work with any Node.js hosting platform that supports Next.js.

## Development Notes

### State Machine
The assessment flow uses a custom state machine (`lib/state-machine/assessment-machine.ts`) with:
- Guards for progression validation
- Autosave on state changes
- Resume capability via draftId
- Analytics event triggers

### Scoring System
Assessment responses are scored (0-10) based on:
- EHR usage (+2 points)
- Compliance requirements (+2 points)
- Pain point severity (+2 points)
- Enrichment data (+1-3 points, future)

Bands: Nurture (0-2), Standard (3-5), Priority (6+)

### Copy Management
All UI text is centralized in `lib/copy.ts` for easy updates and consistency.

## Testing

```bash
# Run unit tests (to be implemented)
npm test

# Run E2E tests (to be implemented)
npm run test:e2e
```

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit PR with description

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

## Roadmap

- [ ] Complete Turnstile/hCaptcha integration
- [ ] Implement actual CRM integration (HubSpot/Salesforce)
- [ ] Add email service (Resend/Postmark)
- [ ] Integrate Cal.com/Calendly embed
- [ ] Add analytics (Vercel/Segment)
- [ ] Implement E2E tests with Playwright
- [ ] Add unit tests for critical paths
- [ ] Performance monitoring
- [ ] A/B testing framework
