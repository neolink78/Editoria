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
    "\n  mutation AddComment($content: String!, $projectId: String!) {\n    createComment(content: $content, projectId: $projectId) {\n      content\n    }\n  }\n": types.AddCommentDocument,
    "\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      id\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  query GetCommentsbyProjectId($projectId: String!) {\n    getCommentsbyProjectId(projectId: $projectId) {\n      content\n      id\n      createdAt\n      updatedAt\n      owner {\n        id\n        username\n      }\n    }\n  }\n": types.GetCommentsbyProjectIdDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      username\n      email\n    }\n  }\n": types.GetUsersDocument,
    "\n  query MyProfile {\n    myProfile {\n      description\n      email\n      id\n      username\n      image\n    }\n  }\n": types.MyProfileDocument,
    "\n  mutation SignOUt {\n    signOut\n  }\n": types.SignOUtDocument,
    "\n  mutation FollowUser($followingId: String!) {\n    followUser(followingId: $followingId)\n  }\n": types.FollowUserDocument,
    "\n  mutation ToggleLike($projectId: String!) {\n    toggleLike(projectId: $projectId)\n  }\n": types.ToggleLikeDocument,
    "\n  mutation DeleteProject($deleteProjectId: ID!) {\n    deleteProject(id: $deleteProjectId) {\n      id\n    }\n  }\n": types.DeleteProjectDocument,
    "\n  query GetOwnComments {\n    getOwnComments {\n      id\n      content\n      project {\n        id\n        title\n      }\n      owner {\n        id\n        username\n      }\n    }\n  }\n": types.GetOwnCommentsDocument,
    "\n  query getFollowers($followingId: String!) {\n    getFollowers(followingId: $followingId) {\n      follower {\n        email\n        id\n        username\n      }\n      following {\n        id\n        email\n        username\n      }\n    }\n  }\n": types.GetFollowersDocument,
    "\n  query LikedProjects {\n    likedProjects {\n      id\n      title\n      description\n      owner {\n        id\n        username\n      }\n      likes {\n        id\n      }\n      codeSnippetsOwned {\n        id\n        language\n      }\n      createdAt\n      comments {\n        id\n      }\n    }\n  }\n": types.LikedProjectsDocument,
    "\n  query GetOwnProject($offset: Int!, $limit: Int!) {\n    getOwnProject(offset: $offset, limit: $limit) {\n      projects {\n        id\n        title\n        description\n        createdAt\n        codeSnippetsOwned {\n          id\n          language\n        }\n        comments {\n          id\n          content\n        }\n        owner {\n          id\n          username\n        }\n        likes {\n          id\n        }\n      }\n      totalCount\n    }\n  }\n": types.GetOwnProjectDocument,
    "\n  query GetProjects($limit: Int!, $offset: Int!, $sortBy: String!) {\n    getProjects(offset: $offset, limit: $limit, sortBy: $sortBy) {\n      projects {\n        id\n        title\n        description\n        owner {\n          id\n          username\n        }\n        likes {\n          id\n        }\n        codeSnippetsOwned {\n          id\n          language\n        }\n        createdAt\n        comments {\n          id\n        }\n      }\n      totalCount\n    }\n  }\n": types.GetProjectsDocument,
    "\n  query GetUser($ownerId: ID!) {\n    getUser(id: $ownerId) {\n      id\n      description\n      username\n      image\n      projects {\n        id\n        codeSnippetsOwned {\n          language\n        }\n        title\n        id\n        description\n        createdAt\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation SignUp($email: String!, $username: String!, $password: String!) {\n    signUp(email: $email, username: $username, password: $password) {\n      email\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      description\n      email\n      id\n      username\n    }\n  }\n": types.SignInDocument,
    "\n  mutation ResetUser($email: String!) {\n    ResetUser(email: $email) {\n      email\n      username\n      id\n    }\n  }\n": types.ResetUserDocument,
    "\n  mutation ResetPassword($newPassword: String!) {\n    ResetPassword(newPassword: $newPassword) {\n      email\n      id\n      username\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation UpdateUser(\n    $email: String!\n    $username: String!\n    $description: String!\n    $updateUserId: ID!\n    $image: String\n  ) {\n    updateUser(\n      email: $email\n      username: $username\n      description: $description\n      id: $updateUserId\n      image: $image\n    ) {\n      description\n      email\n      username\n      id\n      image\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteCodeSnippet($deleteCodeSnippetId: ID!) {\n    deleteCodeSnippet(id: $deleteCodeSnippetId) {\n      id\n    }\n  }\n": types.DeleteCodeSnippetDocument,
    "\n  mutation CreateProject(\n    $title: String!\n    $isPublic: Boolean!\n    $description: String\n  ) {\n    createProject(\n      title: $title\n      is_public: $isPublic\n      description: $description\n    ) {\n      id\n      owner {\n        email\n        id\n        username\n        image\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation AddFile(\n    $title: String!\n    $code: String!\n    $language: Language!\n    $projectId: String!\n  ) {\n    createCodeSnippet(\n      title: $title\n      code: $code\n      language: $language\n      projectId: $projectId\n    ) {\n      id\n    }\n  }\n": types.AddFileDocument,
    "\n  mutation UpdateFile(\n    $updateCodeSnippetId: ID!\n    $code: String!\n    $title: String!\n    $language: Language!\n    $projectId: String!\n  ) {\n    updateCodeSnippet(\n      id: $updateCodeSnippetId\n      code: $code\n      title: $title\n      language: $language\n      projectId: $projectId\n    ) {\n      code\n      id\n    }\n  }\n": types.UpdateFileDocument,
    "\n  query GetProject($getProjectByIdId: ID!) {\n    getProjectById(id: $getProjectByIdId) {\n      codeSnippetsOwned {\n        code\n        id\n        language\n        title\n      }\n      description\n      is_public\n      title\n      likes {\n        id\n      }\n      owner {\n        username\n        id\n        email\n        image\n      }\n    }\n  }\n": types.GetProjectDocument,
    "\n  mutation UpdateProject(\n    $title: String!\n    $isPublic: Boolean!\n    $updateProjectId: ID!\n    $description: String\n  ) {\n    updateProject(\n      title: $title\n      is_public: $isPublic\n      id: $updateProjectId\n      description: $description\n    ) {\n      id\n    }\n  }\n": types.UpdateProjectDocument,
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
export function graphql(source: "\n  mutation AddComment($content: String!, $projectId: String!) {\n    createComment(content: $content, projectId: $projectId) {\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation AddComment($content: String!, $projectId: String!) {\n    createComment(content: $content, projectId: $projectId) {\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCommentsbyProjectId($projectId: String!) {\n    getCommentsbyProjectId(projectId: $projectId) {\n      content\n      id\n      createdAt\n      updatedAt\n      owner {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCommentsbyProjectId($projectId: String!) {\n    getCommentsbyProjectId(projectId: $projectId) {\n      content\n      id\n      createdAt\n      updatedAt\n      owner {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      username\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyProfile {\n    myProfile {\n      description\n      email\n      id\n      username\n      image\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      description\n      email\n      id\n      username\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignOUt {\n    signOut\n  }\n"): (typeof documents)["\n  mutation SignOUt {\n    signOut\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FollowUser($followingId: String!) {\n    followUser(followingId: $followingId)\n  }\n"): (typeof documents)["\n  mutation FollowUser($followingId: String!) {\n    followUser(followingId: $followingId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleLike($projectId: String!) {\n    toggleLike(projectId: $projectId)\n  }\n"): (typeof documents)["\n  mutation ToggleLike($projectId: String!) {\n    toggleLike(projectId: $projectId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProject($deleteProjectId: ID!) {\n    deleteProject(id: $deleteProjectId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProject($deleteProjectId: ID!) {\n    deleteProject(id: $deleteProjectId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOwnComments {\n    getOwnComments {\n      id\n      content\n      project {\n        id\n        title\n      }\n      owner {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOwnComments {\n    getOwnComments {\n      id\n      content\n      project {\n        id\n        title\n      }\n      owner {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFollowers($followingId: String!) {\n    getFollowers(followingId: $followingId) {\n      follower {\n        email\n        id\n        username\n      }\n      following {\n        id\n        email\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFollowers($followingId: String!) {\n    getFollowers(followingId: $followingId) {\n      follower {\n        email\n        id\n        username\n      }\n      following {\n        id\n        email\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LikedProjects {\n    likedProjects {\n      id\n      title\n      description\n      owner {\n        id\n        username\n      }\n      likes {\n        id\n      }\n      codeSnippetsOwned {\n        id\n        language\n      }\n      createdAt\n      comments {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query LikedProjects {\n    likedProjects {\n      id\n      title\n      description\n      owner {\n        id\n        username\n      }\n      likes {\n        id\n      }\n      codeSnippetsOwned {\n        id\n        language\n      }\n      createdAt\n      comments {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOwnProject($offset: Int!, $limit: Int!) {\n    getOwnProject(offset: $offset, limit: $limit) {\n      projects {\n        id\n        title\n        description\n        createdAt\n        codeSnippetsOwned {\n          id\n          language\n        }\n        comments {\n          id\n          content\n        }\n        owner {\n          id\n          username\n        }\n        likes {\n          id\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetOwnProject($offset: Int!, $limit: Int!) {\n    getOwnProject(offset: $offset, limit: $limit) {\n      projects {\n        id\n        title\n        description\n        createdAt\n        codeSnippetsOwned {\n          id\n          language\n        }\n        comments {\n          id\n          content\n        }\n        owner {\n          id\n          username\n        }\n        likes {\n          id\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjects($limit: Int!, $offset: Int!, $sortBy: String!) {\n    getProjects(offset: $offset, limit: $limit, sortBy: $sortBy) {\n      projects {\n        id\n        title\n        description\n        owner {\n          id\n          username\n        }\n        likes {\n          id\n        }\n        codeSnippetsOwned {\n          id\n          language\n        }\n        createdAt\n        comments {\n          id\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetProjects($limit: Int!, $offset: Int!, $sortBy: String!) {\n    getProjects(offset: $offset, limit: $limit, sortBy: $sortBy) {\n      projects {\n        id\n        title\n        description\n        owner {\n          id\n          username\n        }\n        likes {\n          id\n        }\n        codeSnippetsOwned {\n          id\n          language\n        }\n        createdAt\n        comments {\n          id\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($ownerId: ID!) {\n    getUser(id: $ownerId) {\n      id\n      description\n      username\n      image\n      projects {\n        id\n        codeSnippetsOwned {\n          language\n        }\n        title\n        id\n        description\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUser($ownerId: ID!) {\n    getUser(id: $ownerId) {\n      id\n      description\n      username\n      image\n      projects {\n        id\n        codeSnippetsOwned {\n          language\n        }\n        title\n        id\n        description\n        createdAt\n      }\n    }\n  }\n"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser(\n    $email: String!\n    $username: String!\n    $description: String!\n    $updateUserId: ID!\n    $image: String\n  ) {\n    updateUser(\n      email: $email\n      username: $username\n      description: $description\n      id: $updateUserId\n      image: $image\n    ) {\n      description\n      email\n      username\n      id\n      image\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser(\n    $email: String!\n    $username: String!\n    $description: String!\n    $updateUserId: ID!\n    $image: String\n  ) {\n    updateUser(\n      email: $email\n      username: $username\n      description: $description\n      id: $updateUserId\n      image: $image\n    ) {\n      description\n      email\n      username\n      id\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCodeSnippet($deleteCodeSnippetId: ID!) {\n    deleteCodeSnippet(id: $deleteCodeSnippetId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCodeSnippet($deleteCodeSnippetId: ID!) {\n    deleteCodeSnippet(id: $deleteCodeSnippetId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject(\n    $title: String!\n    $isPublic: Boolean!\n    $description: String\n  ) {\n    createProject(\n      title: $title\n      is_public: $isPublic\n      description: $description\n    ) {\n      id\n      owner {\n        email\n        id\n        username\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject(\n    $title: String!\n    $isPublic: Boolean!\n    $description: String\n  ) {\n    createProject(\n      title: $title\n      is_public: $isPublic\n      description: $description\n    ) {\n      id\n      owner {\n        email\n        id\n        username\n        image\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFile(\n    $title: String!\n    $code: String!\n    $language: Language!\n    $projectId: String!\n  ) {\n    createCodeSnippet(\n      title: $title\n      code: $code\n      language: $language\n      projectId: $projectId\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddFile(\n    $title: String!\n    $code: String!\n    $language: Language!\n    $projectId: String!\n  ) {\n    createCodeSnippet(\n      title: $title\n      code: $code\n      language: $language\n      projectId: $projectId\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFile(\n    $updateCodeSnippetId: ID!\n    $code: String!\n    $title: String!\n    $language: Language!\n    $projectId: String!\n  ) {\n    updateCodeSnippet(\n      id: $updateCodeSnippetId\n      code: $code\n      title: $title\n      language: $language\n      projectId: $projectId\n    ) {\n      code\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFile(\n    $updateCodeSnippetId: ID!\n    $code: String!\n    $title: String!\n    $language: Language!\n    $projectId: String!\n  ) {\n    updateCodeSnippet(\n      id: $updateCodeSnippetId\n      code: $code\n      title: $title\n      language: $language\n      projectId: $projectId\n    ) {\n      code\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProject($getProjectByIdId: ID!) {\n    getProjectById(id: $getProjectByIdId) {\n      codeSnippetsOwned {\n        code\n        id\n        language\n        title\n      }\n      description\n      is_public\n      title\n      likes {\n        id\n      }\n      owner {\n        username\n        id\n        email\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProject($getProjectByIdId: ID!) {\n    getProjectById(id: $getProjectByIdId) {\n      codeSnippetsOwned {\n        code\n        id\n        language\n        title\n      }\n      description\n      is_public\n      title\n      likes {\n        id\n      }\n      owner {\n        username\n        id\n        email\n        image\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProject(\n    $title: String!\n    $isPublic: Boolean!\n    $updateProjectId: ID!\n    $description: String\n  ) {\n    updateProject(\n      title: $title\n      is_public: $isPublic\n      id: $updateProjectId\n      description: $description\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject(\n    $title: String!\n    $isPublic: Boolean!\n    $updateProjectId: ID!\n    $description: String\n  ) {\n    updateProject(\n      title: $title\n      is_public: $isPublic\n      id: $updateProjectId\n      description: $description\n    ) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;