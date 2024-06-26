# Slidely Desktop Application

Slidely is a Windows Desktop application designed to manage submissions efficiently. This application allows users to create and view submissions, with a built-in stopwatch feature and keyboard shortcuts for ease of use.

## Desktop Application

### Prerequisites

- Visual Studio (not Visual Studio Code)
- .NET Framework

### Installation

1. Clone the frontend repository:


   git clone https://github.com/mariyakj/slidely-desktopapp.git

2. Open the project in Visual Studio.

3. Build and run the project from Visual Studio.

### Features

- **View Submissions**: Navigate through submitted forms using "Previous" and "Next" buttons.
- **Create New Submission**: Fill in Name, Email, Phone Number, GitHub repo link, and use a stopwatch. Submit the form to save the details.
- **Keyboard Shortcuts**:
  - **Ctrl + S**: Submit the form on Create New Submission page.
  - **Ctrl + P**: Pause/resume the stopwatch.
  - **Ctrl + V**: Open View Submissions form.
  - **Ctrl + N**: Open Create New Submission form.

### Additional Features

- Edit submitted forms.
- Delete submitted forms.
- Styling of the forms.

## Backend Server

### Prerequisites

- Node.js (version X.X.X)
- npm (version X.X.X)

### Installation

1. Clone the backend repository:

   
   git clone https://github.com/mariyakj/slidely-desktopapp-backend.git
   cd slidely-desktopapp-backend
   

2. Install dependencies:

   
   npm install
   

### Configuration

1. Ensure that the `db.json` file exists in the `src` directory. This file will store your submissions. Here is an example structure for `db.json`:

   
   {
     "submissions": []
   }


### Running the Server

Start the server in development mode:


npm run dev

The server will run on `http://localhost:3000`.

### API Endpoints

- **GET /ping**: Always returns `true`.
- **POST /submit**: Create a new submission. Parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`.
- **GET /read?index={index}**: Read submission details at a specific index.
- **PUT /edit/{id}**: Edit an existing submission.
- **DELETE /delete/{id}**: Delete a submission.
- **GET /search?email={email}**: Search for a submission by email.







