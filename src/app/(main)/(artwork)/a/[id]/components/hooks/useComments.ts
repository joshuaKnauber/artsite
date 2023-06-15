import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/db/schema";

const useComments = (artworkId: string) => {
  const fetchComments = async () => {
    const res = await fetch(`/api/artworks/${artworkId}/comments`);
    return res.json();
  };

  const {
    data: comments,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery<Comment[]>(["comments", artworkId], fetchComments);

  return {
    comments: comments || [],
    commentsLoading,
    refetchComments,
  };
};

export default useComments;
