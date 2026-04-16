import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

// cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

// configuracion de handlebars
app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "handlebars");
app.set("views", "src/views");

// rutas api
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// rutas vistas
app.use("/", viewsRouter);

// ruta principal
app.get("/", (req, res) => {
    res.redirect("/products");
});

// conexion a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Conectado a MongoDB Atlas ✅");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
        });
    })
    .catch((error) => {
        console.error("Error conectando a MongoDB:", error);
    });

export default app;