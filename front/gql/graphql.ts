/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type CodeSnippet = {
  __typename?: 'CodeSnippet';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  language: Language;
  project: Project;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum Language {
  C = 'C',
  Cpp = 'CPP',
  Csharp = 'CSHARP',
  Java = 'JAVA',
  Javascript = 'JAVASCRIPT',
  Python = 'PYTHON',
  Typescript = 'TYPESCRIPT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCodeSnippet: CodeSnippet;
  createProject: Project;
  deleteCodeSnippet: CodeSnippet;
  deleteProject: Project;
  deleteUser: User;
  signIn: User;
  signOut: Scalars['Boolean']['output'];
  signUp: User;
  updateCodeSnippet: CodeSnippet;
  updateProject: Project;
  updateUser: User;
};


export type MutationCreateCodeSnippetArgs = {
  code: Scalars['String']['input'];
  language: Language;
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateProjectArgs = {
  collaboratorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  is_public: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteCodeSnippetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCodeSnippetArgs = {
  code: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  language: Language;
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  collaboratorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  is_public: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  is_public: Scalars['Boolean']['output'];
  owner: User;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Query = {
  __typename?: 'Query';
  codeSnippet: CodeSnippet;
  codeSnippets: Array<CodeSnippet>;
  getProjectById: Project;
  getProjects: Array<Project>;
  getUser: User;
  getUsers: Array<User>;
  myProfile: User;
};


export type QueryCodeSnippetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPremium: Scalars['Boolean']['output'];
  projects: Array<Project>;
  role: Role;
  username: Scalars['String']['output'];
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', getProjects: Array<{ __typename?: 'Project', id: string, title: string, updatedAt: any, createdAt: any }> };


export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;