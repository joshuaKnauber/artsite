import { PostComment } from "@/app/api/artworks/[artwork]/comments/route";
import { Comment } from "@/db/schema";
import { ClerkUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

export type CommentWithAuthor = {
  comment: Comment;
  author?: ClerkUser;
};

const useComments = (artworkId: string) => {
  const fetchComments = async () => {
    const res = await fetch(`/api/artworks/${artworkId}/comments`);
    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to fetch comments");
    }
    const data = (await res.json()) as {
      comments: Comment[];
      authors: (ClerkUser | undefined)[];
    };
    const comments: CommentWithAuthor[] = data.comments.map((comment) => {
      const author = data.authors.find((a) => a?.id === comment.user_id);
      return { comment, author: author! };
    });
    return comments;
  };

  const {
    data: comments,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery(["comments", artworkId], fetchComments, {
    enabled: !!artworkId,
    staleTime: 1000 * 60 * 5,
  });

  const sendComment = async (text: string) => {
    const data: PostComment = {
      text,
    };
    const res = await fetch(`/api/artworks/${artworkId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to send feedback");
    }
    await refetchComments();
  };

  const commentsWithoutFeedback = (comments || []).filter(
    (comment) => !comment.comment.is_feedback
  );

  const commentsWithFeedback = (comments || []).filter(
    (comment) => comment.comment.is_feedback
  );

  return {
    comments: comments || [],
    commentsWithoutFeedback,
    commentsWithFeedback,
    commentsLoading,
    refetchComments,
    sendComment,
  };
};

export default useComments;
