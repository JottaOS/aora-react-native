import { ViewToken } from "react-native";

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
  posts: Video[];
}

export interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export interface Video {
  $collectionId: string;
  $createdAt:    Date;
  $databaseId:   string;
  $id:           string;
  $permissions:  any[];
  $tenant:       string;
  $updatedAt:    Date;
  creator:       Creator;
  prompt:        string;
  thumbnail:     string;
  title:         string;
  video:         string;
}

export interface Creator {
  $collectionId: string;
  $createdAt:    Date;
  $databaseId:   string;
  $id:           string;
  $permissions:  string[];
  $tenant:       string;
  $updatedAt:    Date;
  accountId:     string;
  avatar:        string;
  email:         string;
  username:      string;
}

export interface VideoCardProps {
  video: Video;
}

export interface TrendingProps {
  posts: Video[];
}

export type ViewableItemsChangedCallback = (info: { changed: ViewToken[], viewableItems: ViewToken[] }) => void;
