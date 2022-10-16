import type {
  BulletOptions,
  Datum,
  DualAxesOptions,
  G2,
  GaugeOptions,
  Options as BaseOptions,
  Plot,
  SankeyOptions,
} from '@antv/g2plot';

export type AllBaseOptions = Partial<
  BaseOptions | DualAxesOptions | GaugeOptions | BulletOptions | SankeyOptions
>;

interface PlotEvents<O extends AllBaseOptions = AllBaseOptions, P extends Plot<O> = Plot<O>> {
  readonly onInit?: (plot: P, options: O) => void;
  readonly onReady?: (plot: P, event: { renderTime: number }) => void;
  readonly onEvent?: (plot: P, event: G2.Event, helpers) => void;
  readonly emitEvent?: (plot: P, data) => void;
}

export interface XPlotConfig<O extends AllBaseOptions = AllBaseOptions, P extends Plot<O> = Plot<O>>
  extends Partial<Omit<AllBaseOptions, 'data' | 'meta' | 'tooltip'>>,
    PlotEvents<O, P> {
  // 字段
  dimensions: string[];
  measures: string[];
  // 数据
  originData: Datum[];
  formattedData: Datum[];
  // 组件
  // 业务
}
