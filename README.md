# Umesh Prajapati - Senior Laravel Architect Portfolio

A modern, high-performance developer portfolio built with **React, TypeScript, and Tailwind CSS**. This application serves as a showcase for architectural skills, project case studies, and technical writing.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

## 🚀 Features

*   **Modern UI/UX**: Clean, minimal aesthetic with a focus on typography and whitespace.
*   **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.
*   **Dark Mode Support**: System-aware color themes using Tailwind CSS `dark:`.
*   **Dynamic Data**: Designed to work in **Static Mode** (default) or connect to a **Laravel API**.
*   **Interactive Elements**:
    *   3D-style perspective cards.
    *   Real-time Math CAPTCHA for contact forms.
    *   Live Medium RSS Feed integration.
*   **Performance**: Optimized with Vite for lightning-fast HMR and production builds.

## 🛠️ Tech Stack

*   **Frontend Framework**: React 18
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Build Tool**: Vite
*   **Icons**: Lucide React
*   **Animation**: Native CSS animations & transitions

## 📦 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/itsumeshp/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## ⚙️ Configuration

### Static vs. Dynamic Mode

This frontend is designed to work out-of-the-box without a backend.

*   **Static Mode (Default)**: If no API URL is configured, the app uses data from `src/constants.ts` and mocks form submissions.
*   **Dynamic Mode**: Connect to a Laravel backend by creating a `.env` file in the root directory:

    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

    *Refer to `LARAVEL_REBUILD_PLAN.md` for details on the backend architecture.*

## 📂 Project Structure

```
├── components/
│   ├── Layout/       # Navbar, Footer
│   └── Sections/     # Hero, Skills, Experience, Projects, Blog, Contact
├── services/
│   └── api.ts        # API abstraction layer with fallback logic
├── constants.ts      # Static content (Resume data, Projects, Skills)
├── types.ts          # TypeScript interfaces
└── App.tsx           # Main application entry
```

## 📬 Contact & Socials

*   **Website**: [imumesh.com](https://imumesh.com)
*   **GitHub**: [@itsumeshp](https://github.com/itsumeshp)
*   **LinkedIn**: [in/itsumeshp](https://linkedin.com/in/itsumeshp)
*   **Twitter**: [@itsumeshp](https://twitter.com/itsumeshp)
*   **Email**: [umeshprajapati1317@gmail.com](mailto:umeshprajapati1317@gmail.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).# umesh-prajapati-portfolio
