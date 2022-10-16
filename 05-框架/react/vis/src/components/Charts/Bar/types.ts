import type { Bar as G2PlotBar, BarOptions } from '@antv/g2plot';
export type { XPlotConfig } from '@/common/PlotAdaptor/types';

export interface BarConfig extends XPlotConfig<BarOptions, G2PlotBar> {
  scrollbar?: BarOptions['scrollbar'];
  barStyle?: BarOptions['barStyle'];
}
