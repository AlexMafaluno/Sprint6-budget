
# Sprint 6 App-Budget

## Introduction

El objetivo principal de esta aplicación es calcular el presupuesto de una página web de manera interactiva y dinámica, permitiendo al usuario seleccionar distintos servicios y ajustar parámetros como el número de páginas y el número de idiomas.


**Ojetivos:**

- Practicar el uso de Angular 19 con Bootstrap 5.
  
- Implementar la comunicación entre servicios y componentes en Angular.
  
- Crear validaciones personalizadas en formularios reactivos.
 
- Utilizar Signals para mejorar la gestión del estado y la reactividad en la aplicación.

## Tecnologías utilizadas

*Angular 19* – Framework para la construcción de aplicaciones web.

*Bootstrap 5*– Para el diseño responsivo y estilización.

*Vercel*– Para el despliegue de la aplicación.

*HTML, SCSS*– Para la estructura y estilos de la interfaz.

*Karma y Jasmine* – Para la implementación de pruebas unitarias.




## Instalación y Configuración

**Clona el repositorio en tu máquina local**

```bash
Copiar código
https://github.com/AlexMafaluno/Sprint6-budget.git
```


## Ejecutar servidor

Para Iniciar el servidor de desarrollo, corre:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a http://localhost:4200/. La aplicación se recargará automáticamente cada vez que modifiques cualquiera de los archivos fuente.

## Features principales

**Componentes:**

*Checkbox:* Permite al usuario seleccionar qué servicios incluir en el presupuesto.

*Panel:* Componente hijo del Checkbox, recibe eventos emitidos por el componente padre.

*Modals:* Mejora la comprensión de los parámetros de páginas e idiomas mediante ventanas emergentes.

*Formulario Reactivo:* Permite generar presupuestos y almacenarlos en un array.

*Lista de presupuestos:* Permite ordenar y filtrar presupuestos por nombre, fecha e importe utilizando Signals.

**Servicios:**

BudgetService: Gestiona el cálculo del presupuesto total y administra los datos de los presupuestos creados.

*Gestión de la URL y Reactividad:* La aplicación sincroniza los parámetros seleccionados mediante Signals, permitiendo compartir la URL con la configuración actual del presupuesto.

## despliegue en Vercel(demo)

La aplicación está desplegada en Vercel y accesible en el enlace visible en el repositorio.

## Capturas de pantalla

![image](https://github.com/user-attachments/assets/566c040c-df33-4e7b-8254-e1f72d6a69f0)
![image](https://github.com/user-attachments/assets/0599a1a8-2bdb-4b3d-af09-e6d1cc71d122)
![image](https://github.com/user-attachments/assets/86fa9aef-736f-4c4f-94f9-28dcaf474dd1)




