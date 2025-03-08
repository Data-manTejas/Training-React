import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  link?: string;
  comment_count?: number;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        setError('Failed to fetch post details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!post) {
    return <Typography>Post not found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {post.body}
      </Typography>
      {post.link && (
        <Typography>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </Typography>
      )}

      <Typography variant="h5" gutterBottom>
        Comments ({comments.length})
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={comment.name}
              secondary={comment.body}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostDetails;