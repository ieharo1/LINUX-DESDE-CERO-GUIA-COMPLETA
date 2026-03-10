#!/bin/bash
# Guia basica de comandos Linux en un entorno seguro.

set -e

WORKDIR="$(pwd)/demo_workspace"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo "Directorio de practica: $WORKDIR"
echo "1) Crear archivos y carpetas"
mkdir -p proyectos/demo
touch proyectos/demo/nota.txt
echo "Hola Linux" > proyectos/demo/nota.txt

echo "2) Listar contenido"
ls -la proyectos/demo

echo "3) Mostrar ruta actual"
pwd

echo "4) Copiar y mover"
cp proyectos/demo/nota.txt proyectos/demo/nota_copia.txt
mv proyectos/demo/nota_copia.txt proyectos/demo/nota_movida.txt

echo "5) Ver contenido"
cat proyectos/demo/nota_movida.txt

echo "6) Permisos"
chmod 644 proyectos/demo/nota_movida.txt
ls -l proyectos/demo/nota_movida.txt

echo "7) Limpieza controlada"
rm -f proyectos/demo/nota_movida.txt

echo "Listo. Puedes eliminar demo_workspace cuando termines."
