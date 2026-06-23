import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    console.log(`Database connected succesfully`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database connection failed ${error}`);
    console.log(`Server not statred beacause database connection failed`);
    process.exit(1);
  });
