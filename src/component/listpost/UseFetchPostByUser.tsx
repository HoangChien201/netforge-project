import { useState, useCallback } from 'react';
import { getPostByUser } from '../../http/PhuHTTP';

interface MediaItem {
  resource_type: string;
  url: string;
}

interface Media {
  type: number;
  id: number;
  create_at: string;
  media: MediaItem[];
}

interface Post {
  id: number;
  create_at: string;
  media: MediaItem[];
}

interface UseFetchPostsReturn {
  medias: Media[];
  post: Post[];
  fetchPosts: (userId: any) => Promise<void>;
  loading: boolean;
}

export const UseFetchPostByUser = (): UseFetchPostsReturn => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [post, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async (userId: any) => {
    try {
      // setLoading(true);
      const response: any = await getPostByUser(userId);
      const getByTypeOne = response.filter(post => post.type === 1)
      setPosts([...getByTypeOne]);
      if (response && Array.isArray(response)) {
        const filteredPosts = response.filter((media: Media) => media.media && media.media.length > 0 && media.type ===1);
        const sortedPosts = filteredPosts.sort((a: Media, b: Media) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime());
        setMedias([...sortedPosts]);
      }
      // setLoading(false);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
  }, []);

  return { medias, post, fetchPosts, loading };
};
