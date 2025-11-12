# **Employee Management System (EMS)**

The **Employee Management System (EMS)** is a **role-based web application** that enables organizations to efficiently manage employee details, departmental structures, project management, and user permissions.

It ensures **secure access control**, allowing only authorized users (like HR or Admin) to modify sensitive information such as employee records, department configurations, and project assignments.

---

##  **Features**

### **1. User Login & Profile Management**
Enables secure authentication using **JWT (JSON Web Tokens)** and allows users to view and update their personal profiles.

### **2. Employee Management**
Admin and HR can add, update, or deactivate employee records with **role-based access permissions**.

### **3. Department Management**
Supports creation and assignment of employees under specific departments for maintaining a **structured hierarchy**.

### **4. Project Management**
Allows creation, tracking, and assignment of projects to employees, including **project status monitoring**.

### **5. Role-Based Access Control (RBAC)**
Restricts and manages user actions based on their roles such as **Admin**, **HR**, or **Employee**.

---

##  **Backend Stack**

| Component | Technology |
|------------|-------------|
| **Framework** | Node.js with Express *(REST API)* |
| **Authentication** | JWT *(JSON Web Tokens)* |
| **Database** | PostgreSQL *(Relational data model)* |
| **Encryption** | bcrypt *(Password hashing)* |
| **ORM** | Sequelize
---



