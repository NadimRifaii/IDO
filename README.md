###  IDO is built using the following technologies:

- This project uses the [React Library](https://react.dev/). React is a JavaScript library for building user interfaces. It makes it easy to create reusable components and manage complex UIs, and [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that adds static typing to the language.

- This project uses [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) For the backend side of the application .

### Installation

1. Clone the repo
   git clone [github](https://github.com/NadimRifaii/CampVerse.git)
   <br>
2. Setup the frontend
   ```sh
   cd client
   npm install
   ```
3. Setup the  backend <br>
   Open the `server-ido.sln` file using microsoft visual studio , then using the `package manager console` run the following commands
   ```sh
   Add-Migration auth -c AuthContext

   Add-Migration task -c TaskContext

   Update-Database -Context AuthContext

   Update-Database -Context TaskContext
   ```
   Then go to `appsettings.json` file and put the corresponding server name in the IDO connection string , it's gonna be something like `DESKTOP-LVDV1FL\SQLEXPRESS`
   ```sh
   "IDO": "server=; database=idoDB;Integrated Security=True;MultipleActiveResultSets=True;TrustServerCertificate=True"
   ```
   Now run the frontend application and the backend , signup with your personal information and explore the features of the IDO application
