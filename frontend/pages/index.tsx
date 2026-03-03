import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

async function requestGraphQL<T>(query: string, variables?: Record<string, unknown>) {
  let res: Response;

  try {
    res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new Error("Network error while contacting API");
  }

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status} while contacting API`);
  }

  let payload: GraphQLResponse<T>;

  try {
    payload = (await res.json()) as GraphQLResponse<T>;
  } catch {
    throw new Error("Invalid JSON response from API");
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || "GraphQL error");
  }

  if (!payload.data) {
    throw new Error("Missing GraphQL data in API response");
  }

  return payload.data;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const data = await requestGraphQL<{ tasks?: Task[] }>(
      "query { tasks { id title completed } }",
    );

    setTasks(data.tasks ?? []);
  };

  useEffect(() => {
    fetchTasks().catch((err) => {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    });
  }, []);

  const addTask = async () => {
    const title = prompt("Task?");
    if (title === null) {
      return;
    }

    try {
      await requestGraphQL<{ createTask: Task }>(
        "mutation CreateTask($title: String!) { createTask(title: $title) { id title completed } }",
        { title },
      );
      await fetchTasks();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    }
  };

  const toggleTask = async (id: string) => {
    try {
      await requestGraphQL<{ toggleTask: Task }>(
        "mutation ToggleTask($id: ID!) { toggleTask(id: $id) { id title completed } }",
        { id },
      );
      await fetchTasks();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <p>Click to complete the task</p>
      <button onClick={addTask}>Add</button>
      {error ? <p role="alert">Error: {error}</p> : null}

      {tasks.map((t) => (
        <div
          key={t.id}
          onClick={() => toggleTask(t.id)}
          style={{ cursor: "pointer" }}
        >
          {t.title} — {t.completed ? "Done" : "Pending"}
        </div>
      ))}
    </div>
  );
}
