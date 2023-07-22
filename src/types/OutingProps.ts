type OutingProps = {
  name: string;
  description: string;
  id: string;
  deadlineGap: number;
  deletedAt: string;
  createdAt: string;
  price: string;
  status: string;
  subType: string;
  type: string;
  updatedAt: string;
  outingDestination: OutingDestination;
  outingGallery: OutingGallery[];
  outingDate: OutingDate[];
  outingPickup: OutingPickup[];
};
export default OutingProps;

type OutingDestination = {
  city: string;
  continent: string;
  country: string;
  createdAt: string;
  id: string;
  location: string;
  deletedAt: string;
  outingId: string;
  updatedAt: string;
};
type OutingDate = {
  availability: boolean;
  createdAt: string;
  id: string;
  deletedAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
};

type OutingGallery = {
  createdAt: string;
  featured: boolean;
  id: string;
  image: string;
  outingId: string;
  updatedAt: string;
  deletedAt: string;
  video: any;
};
type OutingPickup = {
  city: string;
  continent: string;
  country: string;
  createdAt: string;
  id: string;
  location: string;
  deletedAt: string;
  outingId: string;
  updatedAt: string;
};
