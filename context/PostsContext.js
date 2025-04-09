import React, { createContext, useState, useEffect, useContext } from 'react';
import { postsAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsAPI.getPosts(page);
      setPosts(page === 1 ? response.data.posts : [...posts, ...response.data.posts]);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsAPI.createPost(postData);
      setPosts([response.data, ...posts]);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await postsAPI.likePost(postId);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to like post');
      throw error;
    }
  };

  const unlikePost = async (postId) => {
    try {
      const response = await postsAPI.unlikePost(postId);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to unlike post');
      throw error;
    }
  };

  const addComment = async (postId, text) => {
    try {
      const response = await postsAPI.addComment(postId, text);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add comment');
      throw error;
    }
  };

  const removeComment = async (postId, commentId) => {
    try {
      const response = await postsAPI.removeComment(postId, commentId);
      setPosts(posts.map(post => 
        post._id === postId ? response.data : post
      ));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to remove comment');
      throw error;
    }
  };

  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      fetchPosts(currentPage + 1);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        createPost,
        likePost,
        unlikePost,
        addComment,
        removeComment,
        loadMore,
        hasMore: currentPage < totalPages,
        refresh: () => fetchPosts(1),
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export default PostsContext; 