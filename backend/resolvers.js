const db = require("./db");

module.exports = {
  Query: {
    tasks: async () => {
      return db("tasks").orderBy("id", "asc");
    },
  },

  Mutation: {
    createTask: async (_, { title }) => {
      const [task] = await db("tasks")
        .insert({ title, completed: false })
        .returning(["id", "title", "completed"]);

      return task;
    },

    toggleTask: async (_, { id }) => {
      const task = await db("tasks").where("id", id).first();

      await db("tasks").where("id", id).update({ completed: !task.completed });

      return task;
    },
  },
};
