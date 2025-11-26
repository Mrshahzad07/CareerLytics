# Running CareerLytics Backend in Eclipse

Since you are facing issues with the command line, running the project in Eclipse is a great alternative. Eclipse has built-in Maven support.

## Prerequisites
- **Eclipse IDE** (Enterprise Java and Web Developer edition recommended)
- **Java Development Kit (JDK) 17** or higher installed.

## Steps to Import and Run

### 1. Import the Project
1.  Open Eclipse.
2.  Go to **File** > **Import...**
3.  Select **Maven** > **Existing Maven Projects** and click **Next**.
4.  Click **Browse...** and navigate to your backend folder:
    `C:\Users\91834\careerLytics\backend`
5.  You should see the `pom.xml` file selected. Click **Finish**.
6.  Wait for Eclipse to download dependencies (you will see a progress bar at the bottom right).

### 2. Update Project (Optional but Recommended)
1.  Right-click on the project folder (`backend`) in the **Project Explorer** on the left.
2.  Go to **Maven** > **Update Project...**
3.  Select the project and click **OK**.

### 3. Run the Application
1.  In the **Project Explorer**, navigate to:
    `src/main/java` > `com.careerlytics.backend`
2.  Right-click on **`CareerLyticsApplication.java`**.
3.  Select **Run As** > **Java Application** (or **Spring Boot App** if you have the Spring tools installed).

### 4. Verify It's Running
- Check the **Console** tab at the bottom.
- You should see logs starting to appear.
- Look for the message: `Started CareerLyticsApplication in ... seconds`.
- Ensure there are no error messages about the database connection.

## Troubleshooting
- **Database Error**: If you see `Connection refused`, make sure your MySQL server is running.
- **Port Error**: If you see `Port 8080 was already in use`, stop any other running instances of the backend (or check your other terminals).
