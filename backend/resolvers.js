const db = require("./db");

module.exports = {
  Query: {
    tasks: async () => {
      return db("tasks").orderBy("id", "asc");
    },
  },

  Mutation: {
    createTask: async (_, { title }) => {
      const inserted = await db("tasks").insert({ title, completed: false });
      return inserted[0];
    },

    toggleTask: async (_, { id }) => {
      const task = await db("tasks").where("id", id).first();

      await db("tasks").where("id", id).update({ completed: !task.completed });

      return task;
    },
  },
};
