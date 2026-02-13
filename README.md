# Personal Portfolio - Samuel Monsalve

This project is a modern and responsive personal portfolio designed to showcase skills, projects, and professional experience. It is built with a focus on performance, aesthetics, and a smooth user experience.

## 🚀 Technologies Used

The project uses a modern tech stack based on **React** and **TypeScript**:

- **[React](https://react.dev/)**: Main library for building the user interface.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript superset that adds static typing for more robust and maintainable code.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend development environment, fast and lightweight.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid and highly customizable design.
- **[Framer Motion](https://www.framer.com/motion/)**: Library for complex animations and gestures (used for card transitions, progress bars, and entrance effects).
- **[Lucide React](https://lucide.dev/)**: Collection of clean and consistent SVG icons.
- **Context API**: For global state management, specifically for language switching (English/Spanish).

## ✨ Key Features

- **Responsive Design**: Adapts perfectly to all screen sizes (mobile, tablet, desktop).
- **Multi-language Support**: Instant switching between English and Spanish with animation persistence.
- **Dark/Light Mode**: Automatic or manual adaptability to system theme (based on CSS/Tailwind configuration).
- **Smooth Animations**: Entrance effects (fade-in), animated progress bars, and stagger transitions for lists.
- **Sections**:
  - **Hero**: Main presentation with gradient text effect.
  - **About Me**: Personal characteristics cards.
  - **Technical Skills**: Skills visualization with progress bars.
  - **Projects**: Gallery of featured projects with demo and code links.
  - **Contact**: Contact information and form (simulation).

## 🛠️ Installation and Usage

To run this project locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Samnmy/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies**:
    Make sure you are in the `app` directory (where `package.json` is located):

    ```bash
    cd app
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or the port indicated by the console).

4.  **Build for production**:
    ```bash
    npm run build
    ```
    This will generate optimized static files in the `dist` folder.

## 📂 Project Structure

```text
/app
  ├── /public           # Static files
  ├── /src
  │   ├── /components   # Reusable components (UI, Layout, Animations)
  │   ├── /context      # React Contexts (LanguageContext)
  │   ├── /lib          # Utilities and animation definitions
  │   ├── /sections     # Main page sections (Hero, About, Skills, etc.)
  │   └── /utils        # Utility files like translations
  └── ...config files
```

---

Created by Samuel Monsalve.
