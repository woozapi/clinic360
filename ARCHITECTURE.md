# CLINIC 360 AI - Architecture & Database Modeling

## 1. System Architecture

Clinic 360 AI is built as a modern full-stack SaaS application using a serverless architecture for scalability and real-time capabilities.

### Tech Stack
- **Frontend**: React 19 with TypeScript.
- **Styling**: Tailwind CSS 4.0 for a premium, modern UI.
- **Animations**: Motion (framer-motion) for smooth transitions and interactive feedback.
- **Database & Auth**: Firebase (Firestore + Authentication) for real-time data syncing and secure user management.
- **AI Engine**: Google Gemini API for predictive analytics, no-show forecasting, and automated recommendations.
- **Charts**: Recharts for data visualization.
- **Icons**: Lucide React.

### Core Components
- **Real-time Agenda**: Synchronized across all devices using Firestore snapshots.
- **AI Insights Engine**: Analyzes patient history and financial data to provide growth suggestions.
- **Automated Communication**: Integration hooks for WhatsApp/SMS (simulated or via API).
- **Financial Dashboard**: Real-time tracking of LTV, CAC, and Cash Flow.

---

## 2. Database Modeling (Firestore)

### Collections Structure

#### `clinics` (Root Collection)
- `id`: string
- `name`: string
- `ownerId`: string (UID)
- `settings`: { timezone, currency, businessHours }
- `subscription`: { plan, status, expiresAt }

#### `patients` (Sub-collection of clinic)
- `id`: string
- `name`: string
- `email`: string
- `phone`: string
- `cpf`: string
- `birthDate`: timestamp
- `history`: text
- `score`: number (0-100)
- `status`: enum (active, inactive, lead)
- `createdAt`: timestamp
- `lastVisit`: timestamp

#### `appointments` (Sub-collection of clinic)
- `id`: string
- `patientId`: string (ref)
- `professionalId`: string (ref)
- `roomId`: string (ref)
- `start`: timestamp
- `end`: timestamp
- `status`: enum (scheduled, confirmed, arrived, in-progress, completed, cancelled, no-show)
- `procedureId`: string (ref)
- `notes`: text
- `noShowProbability`: number (AI generated)

#### `professionals` (Sub-collection of clinic)
- `id`: string
- `name`: string
- `specialty`: string
- `color`: string (for agenda)
- `active`: boolean

#### `procedures` (Sub-collection of clinic)
- `id`: string
- `name`: string
- `price`: number
- `duration`: number (minutes)
- `category`: string

#### `financial_transactions` (Sub-collection of clinic)
- `id`: string
- `type`: enum (income, expense)
- `amount`: number
- `category`: string
- `patientId`: string (optional)
- `appointmentId`: string (optional)
- `date`: timestamp
- `status`: enum (pending, paid, cancelled)

#### `inventory` (Sub-collection of clinic)
- `id`: string
- `name`: string
- `quantity`: number
- `minQuantity`: number
- `unit`: string

---

## 3. Main Flows

### Patient Journey
1. **Lead Capture**: WhatsApp/Landing Page -> Firestore `patients` (status: lead).
2. **Scheduling**: Agenda -> `appointments` created -> WhatsApp confirmation sent.
3. **Check-in**: Patient arrives -> Status updated to `arrived` -> Real-time dashboard update.
4. **Procedure**: Professional records notes/photos in `appointments`.
5. **Checkout**: Financial transaction recorded -> NPS survey triggered.
6. **Retention**: AI predicts next visit (e.g., Botox in 6 months) -> Automated reminder.

### Financial Flow
1. **Transaction Entry**: Automatic from checkout or manual for expenses.
2. **KPI Calculation**: Dashboard aggregates data for LTV and CAC.
3. **AI Forecasting**: Gemini analyzes trends to predict next month's revenue.

---

## 4. UX/UI Design Strategy

- **Dashboard**: "Mission Control" style with high-level KPIs and a real-time activity feed.
- **Agenda**: Multi-view (Day/Week) with drag-and-drop capabilities.
- **Patient Profile**: 360° view with tabs for History, Photos, Financials, and AI Insights.
- **Mobile-First**: Fully responsive navigation and simplified forms for quick entries on the go.
- **Visual Style**: "SaaS Premium" - Clean white backgrounds, subtle borders, high-quality typography (Inter), and purposeful use of color for status indicators.
