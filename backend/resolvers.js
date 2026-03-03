const { GraphQLError } = require("graphql");
const db = require("./db");

const MAX_TITLE_LENGTH = 255;

function validateAndNormalizeTitle(title) {
  if (typeof title !== "string") {
    throw new GraphQLError("Task title must be a string", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new GraphQLError("Task title is required", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  if (normalizedTitle.length > MAX_TITLE_LENGTH) {
    throw new GraphQLError(
      `Task title must be ${MAX_TITLE_LENGTH} characters or fewer`,
      {
        extensions: { code: "BAD_USER_INPUT" },
      },
    );
  }

  return normalizedTitle;
}

function validateTaskId(id) {
  const normalizedId = String(id).trim();

  if (!/^\d+$/.test(normalizedId)) {
    throw new GraphQLError("Task id must be a positive integer", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const numericId = Number(normalizedId);

  if (!Number.isSafeInteger(numericId) || numericId <= 0) {
    throw new GraphQLError("Task id must be a positive integer", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  return numericId;
}

function handleResolverError(error) {
  if (error instanceof GraphQLError) {
    throw error;
  }

  throw new GraphQLError("Unexpected server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}

module.exports = {
  Query: {
    tasks: async () => {
      try {
        return await db("tasks").orderBy("id", "asc");
      } catch (error) {
        handleResolverError(error);
      }
    },
  },

  Mutation: {
    createTask: async (_, { title }) => {
      try {
        const normalizedTitle = validateAndNormalizeTitle(title);
        const [task] = await db("tasks")
          .insert({ title: normalizedTitle, completed: false })
          .returning(["id", "title", "completed"]);

        return task;
      } catch (error) {
        handleResolverError(error);
      }
    },

    toggleTask: async (_, { id }) => {
      try {
        const normalizedId = validateTaskId(id);
        const task = await db("tasks").where("id", normalizedId).first();

        if (!task) {
          throw new GraphQLError(`Task with id ${normalizedId} was not found`, {
            extensions: { code: "NOT_FOUND" },
          });
        }

        const updatedTask = {
          ...task,
          completed: !task.completed,
        };

        await db("tasks").where("id", normalizedId).update({
          completed: updatedTask.completed,
        });

        return updatedTask;
      } catch (error) {
        handleResolverError(error);
      }
    },
  },
};
