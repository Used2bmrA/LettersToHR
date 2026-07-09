import hrRoutes from "./router.js";

app.use(express.json());

app.use("/api", hrRoutes);