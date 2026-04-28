export interface VideoEntry {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  category: 'filmmaker' | 'livestream' | 'editing';
  created_at: string;
}

export interface ProjectCardProps {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  image?: string;
  delay: number;
  key?: string | number;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}
