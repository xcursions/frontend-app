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
  bio: string;
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
  profile: UserProfile;
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
type UserProfile = {
  id: string;
  userId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  middleName: string;
  avatarUrl: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  state: string;
  city: string;
  country: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};
