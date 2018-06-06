type Status = "completed" | "active";


interface Todo {
  id: string;
  status: Status;
  title: string;
}