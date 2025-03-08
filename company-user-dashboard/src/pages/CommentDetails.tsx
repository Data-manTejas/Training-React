import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Box } from '@mui/material';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentDetails = () => {
  const { commentId } = useParams<{ commentId: string }>();
  const [comment, setComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
        setComment(response.data);
      } catch (err) {
        setError('Failed to fetch comment.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [commentId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!comment) {
    return <Typography>Comment not found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Comment by {comment.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {comment.body}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Email: {comment.email}
      </Typography>
    </Container>
  );
};

export default CommentDetails;