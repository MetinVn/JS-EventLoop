# JS Event Loop Visualizer

A modern React app built with TypeScript and Vite to help developers visualize and understand the JavaScript event loop through interactive learning.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure & Navigation](#project-structure--navigation)
- [Technology Stack](#technology-stack)
- [Features](#features)

---

## Project Overview

JS Event Loop Visualizer is an educational tool for exploring JavaScript’s concurrency model and event scheduling. Users can interactively arrange and execute various synchronous and asynchronous events to see how the event loop processes them in real time.

---

## Project Structure & Navigation

- **src/App.tsx**: Main app entry, sets up the visualizer and about sections.
- **src/components/**:
  - `EventLoop.tsx`: Core event loop visualizer logic and UI.
  - `SortableItem.tsx`: Draggable event item component.
  - `About.tsx`: Project info and usage guide.
- **src/types/types.ts**: TypeScript types for event items and props.
- **src/images/**: Contains event loop diagram image.
- **src/main.tsx**: React root rendering.
- **src/index.css**: Tailwind CSS import and global styles.

---

## Technology Stack

- **React 19**: UI library for building interactive interfaces.
- **TypeScript**: Type-safe JavaScript for maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **GSAP**: Animation library for smooth UI transitions.
- **@dnd-kit**: Drag-and-drop utilities for event reordering.
- **React Icons**: For iconography in the UI.

---

## Features

- **Educational Focus:** Helps users explore JavaScript’s concurrency model and event scheduling.
- **Event Loop Visualization:** Demonstrates execution flow of synchronous, microtask, and macrotask operations.
- **Interactive Learning:** Users can rearrange and execute events, observing real-time results.
- **Modern UI:** Responsive and animated interface for an engaging learning experience.

---
