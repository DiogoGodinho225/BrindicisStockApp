# 📦 Warehouse Management System

A web application developed during my internship to manage and organize warehouse operations.

The application provides a centralized platform for managing products, stock, warehouse operations and related information, helping improve the efficiency and organization of day-to-day warehouse management.

## 🚀 Features

* Product management
* Stock management
* Warehouse management
* Stock movements
* Product search and filtering
* Create and update records
* Delete records
* Data management through a responsive web interface
* REST API for communication between frontend and backend

## 🛠️ Tech Stack

### Frontend

* **React**
* **JavaScript**
* **HTML5**
* **CSS3**

### Backend

* **Laravel**
* **PHP**
* **REST API**

## 🏗️ Architecture

The application follows a frontend/backend architecture:

```text
React
  │
  │ HTTP Requests
  ▼
Laravel REST API
  │
  ▼
Database
```

The **React** frontend is responsible for the user interface and interaction, while **Laravel** handles the business logic, API endpoints and communication with the database.

## ⚙️ Installation

### Frontend

Navigate to the frontend directory:

```bash
cd stock.brindicis
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Backend

Navigate to the Laravel directory:

```bash
cd stock.brindicis
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure the database connection in the `.env` file and run the migrations:

```bash
php artisan migrate
```

Start the Laravel development server:

```bash
php artisan serve
```

## 🎯 Project Goals

This project was developed during my internship to gain practical experience in professional software development and to work with a real-world business application.

The project allowed me to improve my knowledge of:

* React development
* Laravel
* PHP
* REST API development
* Frontend/backend integration
* CRUD operations
* Database management
* Component-based development
* Business logic implementation
* Developing software for real-world requirements

## 📚 Internship Project

This application was developed as part of my **software development internship**, providing hands-on experience with the development and maintenance of a real-world warehouse management system.

## 👨‍💻 Author

**Diogo Godinho**

Developed during my internship using **React, Laravel and PHP**.
