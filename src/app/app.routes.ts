import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent)
    },
    {
        path: "tareas",
        loadComponent: () => import("./modules/tareas/tareas.component").then((m) => m.TareasComponent)
    }
];
