# Employee Registration Activity

This Employee Registration Activity web application allows users to manage employee records, including features for creating, reading, updating, and deleting (CRUD) employee information. The application also supports searching, filtering, and data persistence.

## Features

### 1. **Employee Management**
   - **CRUD Operations:**
     - **Create**: Users can add new employees by entering their name, email, phone number, position, and uploading an image. A unique employee ID is also generated.
     - **Read**: Users can view a list of all registered employees.
     - **Update**: Users can edit details of existing employees.
     - **Delete**: Users can delete employees from the list.

   - **Search Functionality**:
     - Users can search for employees by their unique ID.

   - **Employee Status**:
     - The application allows users to filter employees based on their status (active or left the organization).

### 2. **Data Persistence**
   - Employee data is saved in the browser's local storage, ensuring that employee information persists across page refreshes.

### 3. **Responsiveness**
   - The application is designed to be responsive and adapts to different screen sizes such as desktop, mobile, and tablet. The layout adjusts accordingly to provide an optimal user experience on all devices.

## Design and Mockup

The application consists of the following sections:

### 1. **Search Bar**
   - A text input field where users can enter an employee ID to search for specific employees.

### 2. **Employee List**
   - A table that displays the following information for each employee:
     - Employee Image
     - ID
     - Name
     - Email
     - Phone Number
     - Position
     - Status (Active or Left)
   - The table is responsive and adjusts the layout for smaller screens.

### 3. **Employee Status Filter**
   - Options (such as buttons or dropdowns) allow users to filter the employee list based on their current status (Active or Left the organization).

### 4. **Add Employee Form**
   - A form where users can input new employee details:
     - Name
     - Email
     - Phone Number
     - Image Upload
     - Position
     - A unique employee ID is generated automatically.

### 5. **Actions for Each Employee**
   - Each employee entry in the list has buttons for editing or deleting the employee.

## Login Details

To access the application, use the following credentials:

- **Email**: `john.doe@example.com`
- **Password**: `password123`

## Installation & Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/sphllzulu/EmployeeReg.git

2. Install dependencies
   ```bash
   npm install

3. Install dependencies
   ```bash
   npm run dev  
   

