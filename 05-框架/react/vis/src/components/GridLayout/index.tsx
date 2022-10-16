import React, { useCallback, useMemo, useRef, useState } from 'react';
import { default as GridLayout, Layout, WidthProvider } from 'react-grid-layout';
import { SizeMe } from 'react-sizeme';
import type { GridLayoutProps } from './types';

const ResponsiveGridLayout = WidthProvider(GridLayout);

const CurGridLayout: React.FC<GridLayoutProps> = ({
  panels = [],
  onPanelsChange,
  panelRender,
  compactType = 'vertical',
  isResizable = true,
  style = {},
  rowHeight = 30,
  margin = [8, 8],
  containerPadding = [0, 0],
  dragRowAlign = false,
  ...rest
}) => {
  const prePanelsRef = useRef(panels);
  const [id, setId] = useState('');

  const renderPanels = useMemo(
    () =>
      panels.map(panel => (
        <div key={panel.id}>
          {/* @ts-expect-error SizeMe 不能作为jsx */}
          <SizeMe monitorWidth monitorHeight>
            {({ size }) => (
              <div className="panel-container">
                {panelRender?.(size.width, size.height || rowHeight, panel)}
              </div>
            )}
          </SizeMe>
        </div>
      )),
    [panels, rowHeight],
  );

  const onLayoutChange = useCallback((changedLayouts: Layout[]) => {}, []);

  return (
    <ResponsiveGridLayout
      {...rest}
      style={style}
      isResizable={isResizable}
      isDraggable
      rowHeight={rowHeight}
      margin={margin}
      containerPadding={containerPadding}
      onLayoutChange={onLayoutChange}
    >
      {renderPanels}
    </ResponsiveGridLayout>
  );
};

export default React.memo(CurGridLayout);
