type BlogProps = {
  author: User;
  authorId: string;
  blogFeaturedImage: BlogGallery;
  categories: BlogCategories[];
  content: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  featured: boolean;
  id: string;
  readTimeInMinute: number;
  title: string;
};
export default BlogProps;
type User = {
  createdAt: string;
  deletedAt: string;
  email: string;
  emailVerified: boolean;
  id: string;
  role: string;
  suspended: boolean;
  updatedAt: string;
};
type BlogGallery = {
  createdAt: string;
  id: string;
  image: string;
  postId: string;
  updatedAt: string;
  deletedAt: string;
};
type BlogCategories = {
  id: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  blogPostCategory: BlogPostCategory;
};
type BlogPostCategory = {
  categoryId: string;
  id: string;
  postId: string;
  updatedAt: string;
  deletedAt: string;
  createdAt: string;
};
