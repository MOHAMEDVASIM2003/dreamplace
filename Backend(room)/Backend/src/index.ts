import express , { Request, Response } from "express";
import { connectDB } from "./utils/mongodb";
import { seedDatabase } from "./utils/seed";
import contactRouter from "./api/routers/Contactrouters";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3002;
const MONGO_URI = process.env.MONGO_URI || '';
app.use(cors());
app.use(express.json());
app.use("/api", contactRouter);

// Serve Stripe public key
app.get("/api/stripe-public-key", (req: Request, res: Response) => {
  res.json({ publicKey: "pk_test_51RfEDxJTih1LB7RLUL2weq50H6zlrL5Qkipa8mri8WIeve2oOZRtlCK9WAk5Ce48ClMlxnjgxUeI9p6NJOKOwLB500QqVqoQHJ" });
});

const startServer = async () => {
  const connected = await connectDB(MONGO_URI);
  if (connected) {
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();


export default app;