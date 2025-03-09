# Merit App

Merit App is an open-source, web-based solution designed to simplify employee management for companies. The application provides a seamless experience for managing work schedules, employee data, and annual leave tracking. It ensures secure access control using authentication mechanisms and integrates with a dedicated backend API hosted on Deno Deploy.

With an intuitive user interface and real-time data synchronization, Merit App enhances workforce management, improving efficiency and transparency within organizations.

## Features

- **Employee Management**: Store and manage employee records in a structured and efficient way.
- **Work Schedule Tracking**: Assign and track employee work schedules.
- **Annual Leave Overview**: Monitor and manage employee leave requests with an easy-to-use interface.
- **Secure Authentication**: Uses Appwrite and OTP-based authentication for secure user access.
- **Cloud-Based API**: Connects with a dedicated API hosted on Deno Deploy to manage company data.
- **Modern UI**: Built with a clean and responsive design for an optimal user experience.

## Tech Stack

- **Frontend:** [Fresh Framework](https://fresh.deno.dev/), [Preact](https://preactjs.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Appwrite](https://appwrite.io/), 
- **OTP authentication**: [OTPAuth](https://github.com/hectorm/otpauth)
- **Backend API:** [HRitmiaAPI](https://github.com/PapaZouk?tab=repositories)
- **State Management:** Islands architecture for optimized interactivity

## Getting Started

### Prerequisites

- Install [Deno](https://deno.land/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PapaZouk/merit-app.git

2. Navigate to the project directory:
   ```sh
   cd merit-app
   
3. Development

    - Start the frontend development server:
      ```sh
      deno task start
    
    - Open the application in your browser:
      ```
      http://localhost:8000
      

4. Testing

   Unit tests are available in the `tests` directory.
   To run the tests, use the following command:

   ```sh
   deno task test:ci
   ```
   
   The coverage report will be generated in the `cov_profile` directory and displayed in the console after test finishes.

4. Contact

    - [LinkedIn](https://www.linkedin.com/in/rafal-papala/)
    - [GitHub](https://github.com/PapaZouk)