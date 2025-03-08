import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Box, List, ListItem, ListItemText, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  link?: string;
  comment_count?: number;
}

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText
              primary={
                <Link component={RouterLink} to={`/posts/${post.id}`}>
                  {post.title}
                </Link>
              }
              secondary={post.body}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostsList;