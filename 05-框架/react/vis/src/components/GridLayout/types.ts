import React from 'react';
import { type CoreProps, type Layout } from 'react-grid-layout';

type Grid = Pick<Layout, 'x' | 'y' | 'w' | 'h'>;

export type Panel = {
  id: string;
  grid: Grid;
  [key: string]: any;
};

export interface GridLayoutProps extends Omit<CoreProps, 'compactType'> {
  panels: Panel[];
  panelRender: (width: number, height: number, panel: Panel) => React.ReactNode;
  onPanelsChange?: (changedPanels: Panel[]) => void;
  compactType?: 'vertical' | 'horizontal' | 'both';
  minGridSpan?: number;
  margin?: [number, number];
  containerPadding?: [number, number];
  dragRowAlign?: boolean;
}
