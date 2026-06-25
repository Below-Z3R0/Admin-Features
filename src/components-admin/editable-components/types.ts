import type { ReactNode } from 'react';

export interface EditableTextProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: 'text' | 'url' | 'email';
  className?: string;
  ariaLabel?: string;
  maxLength?: number;
}

export interface EditableArrayItem<T> {
  id: string;
  value: T;
}

export interface EditableArrayProps<T> {
  items: EditableArrayItem<T>[];
  onReorder: (next: T[]) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel?: string;
  emptyHint?: string;
}

export interface BaseSectionEditableProps<TContent = Record<string, unknown>> {
  content: TContent;
  blockId: string;
  lang: string;
}
