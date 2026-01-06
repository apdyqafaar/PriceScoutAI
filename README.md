
![My Image](public/web.png)

# 🕵️‍♂️ Price Scout Agent

An AI-powered product price hunter that always looks for the cheapest deal first.

Price Scout Agent searches the web, analyzes product listings, compares prices across trusted stores, and ranks results so users can quickly find the lowest available price — without opening 20 tabs.

---

## ✨ Features

- 🔍 Search product listings across the web
- 🤖 Multi-agent AI workflow
- 💰 Lowest-price-first ranking
- 🏆 Ranked product results
- 🛡️ Moderator validation before completion
- 💾 MongoDB persistence
- 🧊 Modern light-theme UI

---

## 🧠 How It Works

1. **Product Searcher Agent**  
   Finds product links from trusted e-commerce platforms.

2. **Links Analyzer Agent**  
   Analyzes products and ranks them by **lowest price first**.

3. **Moderator Agent**  
   Validates ranking accuracy and data integrity.

4. **Supervisor Agent**  
   Orchestrates the workflow and finalizes the process.

Once approved, the project is marked as **Completed** ✅.

---

## 🏗️ Tech Stack

- Frontend: Next.js, React, Tailwind CSS, shadcn/ui
- Backend: Node.js, MongoDB, Mongoose
- AI: Multi-agent orchestration
- Validation: Zod

---

## 📦 Data Model

Each ranked product follows this structure:

```ts
{
  title: string
  link: string
  source?: string
  position: number
  price?: string
  imageUrl?: string
  rating?: number
  rankingReason: string
}

