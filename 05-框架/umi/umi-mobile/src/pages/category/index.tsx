import { useDrag } from '@use-gesture/react';
import { useInViewport } from 'ahooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import Menu, { MenuRef } from './Menu';

const arr = [
  {
    name: 1,
    id: 1,
  },
  {
    name: 2,
    id: 2,
  },
  {
    name: 3,
    id: 3,
  },
  {
    name: 4,
    id: 4,
  },
  {
    name: 5,
    id: 5,
  },
  {
    name: 6,
    id: 6,
  },
  {
    name: 7,
    id: 7,
  },
  {
    name: 8,
    id: 8,
  },
  {
    name: 9,
    id: 9,
  },
];

const Category: React.FC = () => {
  const [rootId, setRootId] = useState(arr[0].id);
  const menuRef = useRef<MenuRef>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const pullingRef = useRef(false);

  const [inViewport] = useInViewport(bottomRef, { threshold: [1] });

  const nextIndex = useMemo(() => arr.findIndex(x => x.id === rootId) + 1, [rootId]);

  // 防抖动
  useEffect(() => {
    contentRef.current?.addEventListener('touchmove', () => {});
  }, []);

  useDrag(
    state => {
      const { event } = state;

      if (state.last) {
        if (pullingRef.current && inViewport) {
          menuRef.current?.changeRoot(nextIndex);
        }
        pullingRef.current = false;
      }

      const [, y] = state.movement;
      if (state.first && y < 0) {
        pullingRef.current = true;
      }

      if (!pullingRef.current) return;

      if (event.cancelable) {
        event.preventDefault();
      }
      event.stopPropagation();
    },
    {
      pointer: { touch: true },
      target: contentRef,
      axis: 'y',
    },
  );

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Menu data={arr} rootId={rootId} changeRootId={setRootId} ref={menuRef} />
      <div
        style={{
          flex: 'auto',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          height: '100%',
        }}
        ref={contentRef}
      >
        <div style={{ overflow: 'hidden', position: 'relative', height: 0 }}>
          <div
            style={{
              height: 40,
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            下拉刷新
          </div>
        </div>
        {nextIndex !== arr.length && (
          <div ref={bottomRef} style={{ marginTop: 'auto', height: '40px', textAlign: 'center' }}>
            继续上拉切换 {arr[nextIndex]?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
