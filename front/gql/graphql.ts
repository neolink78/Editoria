/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
};

export type CodeSnippet = {
  __typename?: "CodeSnippet";
  code: Scalars["String"]["output"];
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["ID"]["output"];
  language: Language;
  project: Project;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  owner: User;
  project: Project;
};

export enum Language {
  C = "C",
  Cpp = "CPP",
  Csharp = "CSHARP",
  Css = "CSS",
  Html = "HTML",
  Java = "JAVA",
  Javascript = "JAVASCRIPT",
  Python = "PYTHON",
  Typescript = "TYPESCRIPT",
  Unknown = "UNKNOWN",
}

export type Like = {
  __typename?: "Like";
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["ID"]["output"];
  project: Project;
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  ResetPassword: User;
  ResetUser: User;
  createCodeSnippet: CodeSnippet;
  createComment: Comment;
  createProject: Project;
  deleteCodeSnippet: CodeSnippet;
  deleteComment: Comment;
  deleteProject: Project;
  deleteUser: User;
  signIn: User;
  signOut: Scalars["Boolean"]["output"];
  signUp: User;
  toggleLike: Scalars["Boolean"]["output"];
  updateCodeSnippet: CodeSnippet;
  updateComment: Comment;
  updateProject: Project;
  updateUser: User;
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars["String"]["input"];
};

export type MutationResetUserArgs = {
  email: Scalars["String"]["input"];
};

export type MutationCreateCodeSnippetArgs = {
  code: Scalars["String"]["input"];
  language: Language;
  projectId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCreateCommentArgs = {
  content: Scalars["String"]["input"];
  projectId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationCreateProjectArgs = {
  collaboratorIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  is_public: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeleteCodeSnippetArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteCommentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationSignInArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationToggleLikeArgs = {
  projectId: Scalars["String"]["input"];
};

export type MutationUpdateCodeSnippetArgs = {
  code: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
  language: Language;
  projectId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationUpdateCommentArgs = {
  content: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationUpdateProjectArgs = {
  collaboratorIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  is_public: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Project = {
  __typename?: "Project";
  codeSnippetsOwned: Array<CodeSnippet>;
  comments: Array<Comment>;
  createdAt: Scalars["DateTimeISO"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  is_public: Scalars["Boolean"]["output"];
  likes: Array<Like>;
  owner: User;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type Query = {
  __typename?: "Query";
  codeSnippet: CodeSnippet;
  codeSnippets: Array<CodeSnippet>;
  getCommentById: Comment;
  getCommentsByUserId: Array<Comment>;
  getCommentsbyProjectId: Array<Comment>;
  getOwnComments: Array<Comment>;
  getOwnProject: Array<Project>;
  getProjectById: Project;
  getProjects: Array<Project>;
  getUser: User;
  getUserByEmail: User;
  getUsers: Array<User>;
  likedProjects: Array<Project>;
  myProfile: User;
  projectLikes: Array<User>;
};

export type QueryCodeSnippetArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetCommentByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetCommentsByUserIdArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryGetCommentsbyProjectIdArgs = {
  projectId: Scalars["String"]["input"];
};

export type QueryGetProjectByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetUserByEmailArgs = {
  email: Scalars["String"]["input"];
};

export type QueryProjectLikesArgs = {
  projectId: Scalars["ID"]["input"];
};

export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type User = {
  __typename?: "User";
  description: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isPremium: Scalars["Boolean"]["output"];
  likes: Array<Like>;
  projects: Array<Project>;
  role: Role;
  username: Scalars["String"]["output"];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: Array<{
    __typename?: "User";
    id: string;
    username: string;
    email: string;
  }>;
};

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyProfileQuery = {
  __typename?: "Query";
  myProfile: {
    __typename?: "User";
    description: string;
    email: string;
    id: string;
    username: string;
  };
};

export type SignOUtMutationVariables = Exact<{ [key: string]: never }>;

export type SignOUtMutation = { __typename?: "Mutation"; signOut: boolean };

export type ToggleLikeMutationVariables = Exact<{
  projectId: Scalars["String"]["input"];
}>;

export type ToggleLikeMutation = {
  __typename?: "Mutation";
  toggleLike: boolean;
};

export type DeleteProjectMutationVariables = Exact<{
  deleteProjectId: Scalars["ID"]["input"];
}>;

export type DeleteProjectMutation = {
  __typename?: "Mutation";
  deleteProject: { __typename?: "Project"; id: string };
};

export type GetOwnCommentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetOwnCommentsQuery = {
  __typename?: "Query";
  getOwnComments: Array<{
    __typename?: "Comment";
    id: string;
    content: string;
    project: { __typename?: "Project"; id: string; title: string };
    owner: { __typename?: "User"; id: string; username: string };
  }>;
};

export type LikedProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type LikedProjectsQuery = {
  __typename?: "Query";
  likedProjects: Array<{
    __typename?: "Project";
    id: string;
    title: string;
    description: string;
    owner: { __typename?: "User"; id: string; username: string };
    likes: Array<{ __typename?: "Like"; id: string }>;
    codeSnippetsOwned: Array<{
      __typename?: "CodeSnippet";
      id: string;
      language: Language;
    }>;
  }>;
};

export type GetProjectsByUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsByUserQuery = {
  __typename?: "Query";
  getOwnProject: Array<{
    __typename?: "Project";
    id: string;
    title: string;
    description: string;
    is_public: boolean;
    createdAt: any;
    updatedAt: any;
    codeSnippetsOwned: Array<{
      __typename?: "CodeSnippet";
      id: string;
      title: string;
      code: string;
      language: Language;
    }>;
    comments: Array<{
      __typename?: "Comment";
      id: string;
      content: string;
      owner: { __typename?: "User"; id: string };
      project: { __typename?: "Project"; id: string };
    }>;
    owner: { __typename?: "User"; id: string; email: string; username: string };
    likes: Array<{ __typename?: "Like"; id: string }>;
  }>;
};

export type SignUpMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: { __typename?: "User"; email: string };
};

export type SignInMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "User";
    description: string;
    email: string;
    id: string;
    username: string;
  };
};

export type ResetUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ResetUserMutation = {
  __typename?: "Mutation";
  ResetUser: {
    __typename?: "User";
    email: string;
    username: string;
    id: string;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars["String"]["input"];
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  ResetPassword: {
    __typename?: "User";
    email: string;
    id: string;
    username: string;
  };
};

export type CreateProjectMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  isPublic: Scalars["Boolean"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CreateProjectMutation = {
  __typename?: "Mutation";
  createProject: { __typename?: "Project"; id: string };
};

export type AddFileMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  code: Scalars["String"]["input"];
  language: Language;
  projectId: Scalars["String"]["input"];
}>;

export type AddFileMutation = {
  __typename?: "Mutation";
  createCodeSnippet: { __typename?: "CodeSnippet"; id: string };
};

export type GetprojectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetprojectsQuery = {
  __typename?: "Query";
  getProjects: Array<{
    __typename?: "Project";
    createdAt: any;
    description: string;
    title: string;
    codeSnippetsOwned: Array<{
      __typename?: "CodeSnippet";
      language: Language;
    }>;
    owner: { __typename?: "User"; username: string };
  }>;
};

export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const MyProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const SignOUtDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignOUt" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "signOut" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignOUtMutation, SignOUtMutationVariables>;
export const ToggleLikeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ToggleLike" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "projectId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "toggleLike" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "projectId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const DeleteProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "deleteProjectId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "deleteProjectId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;
export const GetOwnCommentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetOwnComments" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getOwnComments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "project" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetOwnCommentsQuery, GetOwnCommentsQueryVariables>;
export const LikedProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LikedProjects" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "likedProjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "likes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "codeSnippetsOwned" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "language" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LikedProjectsQuery, LikedProjectsQueryVariables>;
export const GetProjectsByUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetProjectsByUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getOwnProject" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "is_public" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "codeSnippetsOwned" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "language" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "comments" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "owner" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "project" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "likes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProjectsByUserQuery,
  GetProjectsByUserQueryVariables
>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const ResetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ResetUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResetUserMutation, ResetUserMutationVariables>;
export const ResetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newPassword" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ResetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "newPassword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newPassword" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const CreateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isPublic" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "is_public" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isPublic" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const AddFileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddFile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "language" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Language" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "projectId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCodeSnippet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "language" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "projectId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddFileMutation, AddFileMutationVariables>;
export const GetprojectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GETPROJECTS" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getProjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "codeSnippetsOwned" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "language" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetprojectsQuery, GetprojectsQueryVariables>;
