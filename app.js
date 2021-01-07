require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const publicPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(publicPath));
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)

app.use(cors({ origin: "*" }));
require("./config/db.config")();
require("./config/passport.config")(app);

app.get("*", (req, res, next) => {
  const hostUrl = req.originalUrl;
  if (!hostUrl.includes("/api")) {
    return res.sendFile(path.join(publicPath, "index.html"));
  }
  return next();
});

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const pageRouter = require("./routes/page.routes");
app.use("/api", pageRouter);

const quotesRouter = require("./routes/quote.routes");
app.use("/api", quotesRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
