type HeadingProps<C extends React.ElementType> = {
  type?: C;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

export default HeadingProps;
