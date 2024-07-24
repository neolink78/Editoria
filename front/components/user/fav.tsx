import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { GetFollowingsQuery, GetUsersQuery } from "../../gql/graphql";
import Tile from "../../lib/tile";
import indexMock from "../../mocks/indexMock";
import { GET_FAVORITE_CODERS } from "@/graphql/queries/followQueries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";


const GETUSERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
    }
  }
`;

const Fav = () => {
  const { data, refetch: refetchFollowers } = useQuery<GetFollowingsQuery>(GET_FAVORITE_CODERS);
  const [followedUsers, setFollowedUsers] = useState<GetFollowingsQuery>([])
  const router = useRouter();

 const getfollowedActivities = async () => {
  let allEntries = [];
    data && await data.getFollowings.forEach((following) => {
      const comments = following.following.comments || [];
      const likes = following.following.likes || [];
      const username = following.following.username;

      comments.forEach((comment) => {
        allEntries.push({
          ...comment,
          type: 'comment',
          username: username,
        });
      });

      likes.forEach((like) => {
        allEntries.push({
          ...like,
          type: 'like',
          username: username,
        });
      });
    });

    // Sort entries by createdAt in descending order
    allEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
   setFollowedUsers(allEntries)
}

useEffect(() => {
    data && getfollowedActivities()
  console.log("Merged and Sorted Entries:", followedUsers);
},[data])


  
  return (
    <>
    {followedUsers && followedUsers.map((followedUser, idx )=> {
      console.log(followedUser)
      return (
    <Box key={idx}>
    <Box
        fontSize="1.4vw"
        m="4vw 0 0 10vw"
        alignSelf="flex-start"
        display="flex"
        alignItems="baseline"
      >
       {followedUser.username} a {followedUser.type === 'like' ? "liké " : "commenté "} {formatDistanceToNow(parseISO(followedUser.createdAt), { addSuffix: true, locale: fr })}
      </Box>
  {followedUser.type === 'like' ? 
         <Tile
         key={idx}
         projectId={followedUser.project.id}
         ownerId={followedUser.project.owner.id}
         owner={followedUser.project.owner.username}
         icon={followedUser.project.codeSnippetsOwned[0]?.language}
         title={followedUser.project.title}
         description={followedUser.project.description}
         createdAt={followedUser.project.createdAt}
         onOpenProject={() =>
           router.push(`/editor?project=${followedUser.project.id}`)
         }
         
     
       /> : <Box>yo</Box>
          }
    
      </Box>
    )})}

      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        <Box>Novak a commenté ...</Box>
      </Box>
      <Box>
        {indexMock.slice(-1).map((e, idx) => (
          <Tile
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
          />
        ))}
      </Box>

      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        <Box>Novak a liké ...</Box>
      </Box>
      <Box mb={12}>
        {indexMock.slice(-3).map((e, idx) => (
          <Tile
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
          />
        ))}
      </Box> 
    </>
  );
};

export default Fav;
