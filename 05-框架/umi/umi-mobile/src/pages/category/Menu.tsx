import React, { useImperativeHandle, useRef } from 'react';

type MenuProps = {
  rootId: number;
  changeRootId: (rootId: number) => void;
  data: { id: number; name: number }[];
};

export type MenuRef = {
  changeRoot: (index: number) => void;
};

const Menu: React.ForwardRefRenderFunction<MenuRef, MenuProps> = (
  { rootId, changeRootId, data },
  ref,
) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      changeRoot: (index: number) => {
        const target = menuRef.current?.children[index] as HTMLDivElement;
        target?.click();
      },
    }),
    [],
  );

  const onClickMenuItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    changeRootId(parseInt(item.dataset['id']!));
    const parent = item.offsetParent;
    if (!parent) {
      return;
    }
    const itemRect = item.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const itemCenter = item.offsetTop + itemRect.height / 2;
    const top = itemCenter - parentRect.height / 2;
    menuRef.current?.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      ref={menuRef}
      style={{
        flexBasis: 100,
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {data.map(v => {
        return (
          <div
            key={v.id}
            style={{ height: 200, flexShrink: 0, background: v.id === rootId ? 'white' : 'gray' }}
            onClick={onClickMenuItem}
            data-id={v.id}
          >
            {v.name}
          </div>
        );
      })}
    </div>
  );
};

export default React.forwardRef(Menu);
