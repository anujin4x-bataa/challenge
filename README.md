# 🔒 LOCK-IN 45

### 45-Day Self-Improvement Challenge Tracker

A polished, mobile-first personal discipline app for completing a 45-day transformation challenge.

![Version](https://img.shields.io/badge/version-6.0-c8ff00)
![License](https://img.shields.io/badge/license-Personal-333)

---

## ✨ Features

### Core
- **Dashboard** — Dual-ring hero (challenge progress + daily score), AI coach, habit checklist
- **6 Daily Habits** — Steps, workout, water, sleep, no sugar, no noodles
- **Streaks & Scoring** — Current/longest streak, 0-100 daily score based on all activities
- **Dopamine Detox Mode** — Extra habits: no social media, no junk food, no YouTube
- **Rest Day Toggle** — 1 per week, still counts for streak

### Tracking
- **Sleep Tracking** — Score, duration, quality, deep/REM/light stages, notes
- **Workout Logging** — Type, duration, intensity, exercises
- **Body Transformation** — Weight, waist, body fat charts + progress photos
- **AI Food Scanner** — Photo → Claude API → calories & macros auto-detected
- **Nutrition Dashboard** — Calorie ring, macro bars, auto-calculated TDEE goal

### Insights
- **Daily Reflection** — 3 questions + energy rating (1 min)
- **Weekly Reports** — Auto-generated every 7 days with stats summary
- **Progress Charts** — Weekly success, habit breakdown, daily timeline, sleep score history
- **45-Day Heatmap** — GitHub-style green/yellow/red calendar
- **12 Achievements** — Streak badges, perfect week, challenge milestones

### UX
- **Morning Greeting** — Personalized welcome screen each day
- **Zone-based Dashboard** — Status → Coach → Toggles → Habits → Insights
- **Collapsible Sections** — Journal, heatmap, achievements expand on tap
- **Dark/Light Theme** — Full theme support
- **Mobile-first** — Designed for phone, responsive on desktop
- **Browser Notifications** — 8 PM and 10 PM habit reminders
- **CSV Export** — Download all data

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Charts**: Chart.js 4.x
- **Fonts**: Outfit + JetBrains Mono
- **Storage**: localStorage (default) + Supabase-ready
- **AI**: Claude API (Anthropic) for food scanning

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/lockin45.git
cd lockin45

# Open directly (no build needed)
open index.html

# Or use a local server
python3 -m http.server 8080
# → http://localhost:8080
```

1. Enter your name and start date
2. Start completing habits daily
3. Track your transformation

---

## 📁 File Structure

```
lockin45/
├── index.html          # Main app (single page, tab-based navigation)
├── css/
│   └── style.css       # All styles (299 lines)
├── js/
│   └── app.js          # All logic (250 lines)
├── data/
│   └── coach.json      # AI coach message bank
└── README.md           # This file
```

---

## 🌐 Deploy on GitHub Pages

1. Create a new GitHub repository
2. Push all files:
   ```bash
   git init
   git add .
   git commit -m "LOCK-IN 45 v6"
   git branch -M main
   git remote add origin https://github.com/you/lockin45.git
   git push -u origin main
   ```
3. Go to **Settings → Pages**
4. Source: **Deploy from branch** → `main` → `/ (root)`
5. Save — live at `https://you.github.io/lockin45/`

---

## 🗄 Connect Supabase (Optional)

### 1. Create Project

Go to [supabase.com](https://supabase.com) → New Project

### 2. Run SQL Schema

Open **SQL Editor** and run:

```sql
-- ============================================
-- LOCK-IN 45 — Supabase Schema v6
-- ============================================

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT 'user_1',
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily habits
CREATE TABLE IF NOT EXISTS daily_habits (
  id TEXT PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  steps BOOLEAN DEFAULT FALSE,
  workout BOOLEAN DEFAULT FALSE,
  water BOOLEAN DEFAULT FALSE,
  sleep BOOLEAN DEFAULT FALSE,
  no_sugar BOOLEAN DEFAULT FALSE,
  no_noodles BOOLEAN DEFAULT FALSE,
  completion_score REAL DEFAULT 0,
  is_rest_day BOOLEAN DEFAULT FALSE,
  detox_mode BOOLEAN DEFAULT FALSE,
  journal TEXT DEFAULT '',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Sleep tracking
CREATE TABLE IF NOT EXISTS sleep_data (
  date DATE PRIMARY KEY,
  score INTEGER,
  duration TEXT,
  quality TEXT,
  deep TEXT,
  rem TEXT,
  light TEXT,
  notes TEXT
);

-- Workout tracking
CREATE TABLE IF NOT EXISTS workout_data (
  date DATE PRIMARY KEY,
  type TEXT,
  duration INTEGER,
  intensity TEXT,
  notes TEXT
);

-- Body progress
CREATE TABLE IF NOT EXISTS body_progress (
  id TEXT PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  weight REAL,
  waist REAL,
  body_fat REAL,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nutrition meals
CREATE TABLE IF NOT EXISTS meals (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  name TEXT,
  type TEXT,
  calories INTEGER DEFAULT 0,
  protein INTEGER DEFAULT 0,
  carbs INTEGER DEFAULT 0,
  fat INTEGER DEFAULT 0,
  notes TEXT,
  photo_url TEXT,
  time TEXT
);

-- Nutrition settings
CREATE TABLE IF NOT EXISTS nutrition_settings (
  id TEXT PRIMARY KEY DEFAULT 'settings',
  weight REAL,
  height REAL,
  age INTEGER,
  activity_multiplier REAL,
  goal_adjustment INTEGER,
  daily_calories INTEGER,
  protein_goal INTEGER,
  carbs_goal INTEGER,
  fat_goal INTEGER
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  requirement TEXT,
  value INTEGER,
  date_unlocked DATE
);

-- Daily reflections
CREATE TABLE IF NOT EXISTS reflections (
  date DATE PRIMARY KEY,
  good TEXT,
  improve TEXT,
  energy INTEGER
);

-- Dopamine detox habits
CREATE TABLE IF NOT EXISTS detox_habits (
  date DATE PRIMARY KEY,
  no_social BOOLEAN DEFAULT FALSE,
  no_junk BOOLEAN DEFAULT FALSE,
  no_youtube BOOLEAN DEFAULT FALSE
);

-- Daily scores
CREATE TABLE IF NOT EXISTS daily_scores (
  date DATE PRIMARY KEY,
  score INTEGER
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_habits_date ON daily_habits(date);
CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date);
CREATE INDEX IF NOT EXISTS idx_body_date ON body_progress(date);

-- Row Level Security (enable for multi-user later)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE detox_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_scores ENABLE ROW LEVEL SECURITY;

-- Permissive policies (single-user, no auth)
CREATE POLICY "allow_all" ON users FOR ALL USING (true);
CREATE POLICY "allow_all" ON daily_habits FOR ALL USING (true);
CREATE POLICY "allow_all" ON sleep_data FOR ALL USING (true);
CREATE POLICY "allow_all" ON workout_data FOR ALL USING (true);
CREATE POLICY "allow_all" ON body_progress FOR ALL USING (true);
CREATE POLICY "allow_all" ON meals FOR ALL USING (true);
CREATE POLICY "allow_all" ON achievements FOR ALL USING (true);
CREATE POLICY "allow_all" ON reflections FOR ALL USING (true);
CREATE POLICY "allow_all" ON detox_habits FOR ALL USING (true);
CREATE POLICY "allow_all" ON daily_scores FOR ALL USING (true);
```

### 3. Configure the App

To switch from localStorage to Supabase, you'll need to:

1. Add Supabase JS client to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
   ```

2. Replace the `L` (localStorage) object in `js/app.js` with Supabase calls
3. Add your project URL and anon key

### 4. Multi-User Expansion

1. Enable Supabase Auth
2. Add `user_id` column to all tables
3. Update RLS policies to `auth.uid()`
4. Add login/register flow

---

## 🏗 Architecture

### Storage Abstraction

All data flows through the `L` object:
```
L.g(key) → get from localStorage
L.s(key, value) → save to localStorage
L.r(key) → remove from localStorage
```

Replace this single object to switch backends.

### Dashboard Zone System

```
Zone 1: STATUS    → Dual ring (challenge day + score) + stats
Zone 2: COACH     → Compact inline AI quote
Zone 3: TOGGLES   → Rest day + Detox side by side
Zone 4: HABITS    → Core habit checklist (primary action)
Zone 5: INSIGHTS  → Collapsible: journal, heatmap, achievements
```

### AI Food Scanner

Uses Claude API (Sonnet) for image analysis:
```
Photo → base64 → Claude API → JSON response → editable form → save
```

Runs client-side. Works in Claude.ai artifacts natively. For standalone deployment, you'll need to proxy through a backend to avoid exposing API keys.

---

## 📱 Screenshots

The app features:
- True black background with lime accent (#c8ff00)
- Circular progress rings for challenge day and daily score
- Compact coach quotes
- Side-by-side toggle cards
- Collapsible insight sections
- Bottom tab navigation (5 tabs)

---

## License

Personal use. Built with discipline. 🔒
