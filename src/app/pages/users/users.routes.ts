import { Routes } from "@angular/router";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserEditComponent } from './user-edit/user-edit.component';

export const UserRoutes: Routes = [
    {path: '', title: 'User list', component: UserListComponent},
    {path: 'add',title: 'User add', component: UserAddComponent},
    {path: 'edit', title: 'User edit', component: UserEditComponent},
]