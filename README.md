# distribuidas-app-servidor
repo app distribuidas prespuestos server


## Despliegue
Para poder levantar el servidor, realice lo siguientes pasos:
### Clonar repositorio
- Clonar este repositorio a tu maquina local usando: 
`https://github.com/juancrossetto/distribuidas-app-servidor.git`

### Configuración
- En el destino donde se clono el repositorio, abrir una consola con permisos de administrador y ejecutar el siguiente comando:
```bash
npm install
```
- Luego una vez instaladas las dependencias de node, ejecutar el siguiente comando:
```bash
npm run dev
```

La aplicación se ejecutará en el puerto 4000

### Importar Tests
1. [Descargar Postman](https://www.postman.com/)
2. Abrir Postman
3. Click en Importar, elegir archivo y especificar la ruta al archivo `TESTS.postman_collection.json`