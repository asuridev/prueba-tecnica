import { environment } from "../environments/environment";

export const endpoints = {
  users: `${environment.tasks_micro}/users`,
  tasks: `${environment.tasks_micro}/tasks`,
  assign: `${environment.tasks_micro}/assign`
}