export interface SectionTemplate {
  id: string;
  label: string;
  blocks: { id: string; component: string }[];
}
