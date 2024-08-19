import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import envs from "../src/config/envs.config.js"
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  is_logged_in: false,
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", routes);


app.use("/", viewsRoutes)

const httpServer = app.listen(8080, () => {
  console.log(`Server on port 8080 `);
});


export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});
