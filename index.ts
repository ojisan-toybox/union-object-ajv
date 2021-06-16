import { JSONSchemaType } from "ajv";

type User = { id: number; name: string };
type Post = { id: number; content: string };

type RequestType = {
  id: number;
  users: User[];
  post: Post | Record<string, never>;
};

const dummyRequest: RequestType = {
  id: 1,
  users: [{ id: 1, name: "hoge" }],
  post: {},
};

const schema: JSONSchemaType<RequestType> = {
  type: "object",
  properties: {
    id: "number",
    users: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: "number",
          name: "string",
        },
        required: ["id", "name"],
      },
    },
    post: {
      anyOf: [
        {
          type: "object",
          properties: {
            id: "number",
            content: "string",
          },
        },
      ],
    },
  },
};
