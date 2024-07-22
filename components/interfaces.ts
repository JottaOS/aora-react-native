export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  username: string;
}

export interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
}

export type SearchInputProps = Omit<
  FormFieldProps,
  "title" | "keyboardType" | "otherStyles"
>;

export interface TrendingProps {
  posts: { id: number }[];
}

export interface EmptyStateProps {
  title: string;
  subtitle: string;
}
