import { PrismaClient } from "../src/generated/prisma";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient()

async function main() {
    try {
        // Crear categorías primero
        console.log("Creando categorías...")
        for (const category of categories) {
            await prisma.category.create({
                data: category
            })
        }
        
        console.log("Creando productos...")
        await prisma.product.createMany({
            data: products
        })

        console.log("Base de datos poblada exitosamente");
    } catch (error) {
        console.error("Error al poblar la base de datos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });