# Project Structure

The project has been reorganized with a modular folder structure where each component and page has its own directory containing all related files.

## Directory Structure

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   └── index.js
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   └── index.js
│   ├── FlowerMenu/
│   │   ├── FlowerMenu.jsx
│   │   └── index.js
│   ├── MusicToggleButton/
│   │   ├── MusicToggleButton.jsx
│   │   └── index.js
│   ├── AnimatedDock/
│   │   ├── AnimatedDock.jsx
│   │   └── index.js
│   ├── HackathonDetailModal/
│   │   ├── HackathonDetailModal.jsx
│   │   ├── HackathonDetailModal.css
│   │   └── index.js
│   └── TextRoll/
│       ├── TextRoll.jsx
│       └── index.js
│
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── index.js
│   ├── About/
│   │   ├── About.jsx
│   │   ├── About.css
│   │   └── index.js
│   ├── Achievements/
│   │   ├── Achievements.jsx
│   │   ├── Achievements.css
│   │   └── index.js
│   ├── Projects/
│   │   ├── Projects.jsx
│   │   ├── Projects.css
│   │   └── index.js
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   └── index.js
│   └── Loading/
│       ├── Loading.jsx
│       ├── Loading.css
│       └── index.js
│
├── utils/
│   └── themeToggle.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Benefits

- **Better Organization**: Each component/page is self-contained with its own folder
- **Easier Maintenance**: Related files (JSX, CSS) are grouped together
- **Scalability**: Easy to add new files to a component without cluttering the directory
- **Cleaner Imports**: Using index.js files allows for simpler import statements

## Import Examples

### Before
```javascript
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
```

### After
```javascript
import Home from './pages/Home';
import Navbar from './components/Navbar';
```

All imports have been updated throughout the project to work with the new structure.
