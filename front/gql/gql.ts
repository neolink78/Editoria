/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetProjects {\n  getProjects {\n    id\n    title\n    updatedAt\n    createdAt\n    codeSnippetsOwned {\n      language\n    }\n    owner {\n      username\n    }\n  }\n}\n": types.GetProjectsDocument,
    "\nmutation DeleteProject($deleteProjectId: ID!) {\n  deleteProject(id: $deleteProjectId) {\n    id\n  }\n}\n": types.DeleteProjectDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      username\n      email\n    }\n  }\n": types.GetUsersDocument,
    "\n  query MyProfile {\n    myProfile {\n      description\n      email\n      id\n      username\n    }\n  }\n": types.MyProfileDocument,
    "\n  mutation SignUp($email: String!, $username: String!, $password: String!) {\n    signUp(email: $email, username: $username, password: $password) {\n      email\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      description\n      email\n      id\n      username\n    }\n  }\n": types.SignInDocument,
    "\n  mutation ResetUser($email: String!) {\n    ResetUser(email: $email) {\n      email\n      username\n      id\n    }\n  }\n": types.ResetUserDocument,
    "\n  mutation ResetPassword($newPassword: String!) {\n    ResetPassword(newPassword: $newPassword) {\n      email\n      id\n      username\n    }\n  }\n": types.ResetPasswordDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetProjects {\n  getProjects {\n    id\n    title\n    updatedAt\n    createdAt\n    codeSnippetsOwned {\n      language\n    }\n    owner {\n      username\n    }\n  }\n}\n"): (typeof documents)["\nquery GetProjects {\n  getProjects {\n    id\n    title\n    updatedAt\n    createdAt\n    codeSnippetsOwned {\n      language\n    }\n    owner {\n      username\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteProject($deleteProjectId: ID!) {\n  deleteProject(id: $deleteProjectId) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteProject($deleteProjectId: ID!) {\n  deleteProject(id: $deleteProjectId) {\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      username\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyProfile {\n    myProfile {\n      description\n      email\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      description\n      email\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp($email: String!, $username: String!, $password: String!) {\n    signUp(email: $email, username: $username, password: $password) {\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($email: String!, $username: String!, $password: String!) {\n    signUp(email: $email, username: $username, password: $password) {\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      description\n      email\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      description\n      email\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetUser($email: String!) {\n    ResetUser(email: $email) {\n      email\n      username\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ResetUser($email: String!) {\n    ResetUser(email: $email) {\n      email\n      username\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($newPassword: String!) {\n    ResetPassword(newPassword: $newPassword) {\n      email\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($newPassword: String!) {\n    ResetPassword(newPassword: $newPassword) {\n      email\n      id\n      username\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;