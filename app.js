const express = require("express");
const cors = require("cors");

const PORT = 1234;

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
