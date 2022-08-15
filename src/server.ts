import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({ path: ".env "});

const PORT:Number = +process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
})