import cors from "cors"
import express, { json } from "express"
import "express-async-errors";

import router from "../src/routers/index.js"
import handleErrors from "./middlewares/handleErrosMiddleware.js";

const app = express();
app.use(cors())
app.use(json())

app.use(router)
app.use(handleErrors)

export default app;