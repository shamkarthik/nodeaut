import React, { useState } from 'react';
import { Drawer, Checkbox, Space, Table } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, useSortableContext } from '@dnd-kit/sortable';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndContext } from '@dnd-kit/core';

interface Option {
  label: string;
  value: string;
}

const DraggableCheckboxGroup: React.FC<{
  options: Option[];
  checkedValues: string[];
  onChange: (value: string, checked: boolean) => void;
}> = ({ options, checkedValues, onChange }) => {
  const SortableItem: React.FC<{ id: string }> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style: React.CSSProperties = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };

  return (
    <DndContext backend={HTML5Backend}>
      <SortableContext>
        {options.map((option) => (
          <SortableItem key={option.value} id={option.value}>
            <Checkbox
              value={option.value}
              checked={checkedValues.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
            >
              {option.label}
            </Checkbox>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

const TableWithColumnReordering: React.FC<{
  columns: any[];
  data: any[];
}> = ({ columns, data }) => {
  const { items, setItems } = useSortableContext();

  const onDragEnd = () => {
    const reorderedColumns = items.map((item) => columns[parseInt(item.id, 10)]);
    setItems(reorderedColumns.map((_, index) => ({ id: index.toString() })));
    // Update the table columns with the new order
    // You can use the reorderedColumns array in your table component
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={columns.map((_, index) => index.toString())}>
        <Table columns={columns} dataSource={data} />
      </SortableContext>
    </DndContext>
  );
};

const App: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const options: Option[] = [
    { label: 'Column 1', value: 'column1' },
    { label: 'Column 2', value: 'column2' },
    { label: 'Column 3', value: 'column3' },
  ];
  const columns = [
    { title: 'Column 1', dataIndex: 'column1' },
    { title: 'Column 2', dataIndex: 'column2' },
    { title: 'Column 3', dataIndex: 'column3' },
  ];
  const data = [
    { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
    { column1: 'Value 4', column2: 'Value 5', column3: 'Value 6' },
    { column1: 'Value 7', column2: 'Value 8', column3: 'Value 9' },
  ];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    }
  };

  return (
    <div>
      <button onClick={() => setDrawerVisible(true)}>Open Drawer</button>
      <Drawer
        title="Column Selector"
        placement="right"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <DraggableCheckboxGroup
          options={options}
          checkedValues={checkedValues}
          onChange={handleCheckboxChange}
        />
      </Drawer>
      <TableWithColumnReordering columns={columns} data={data} />
    </div>
  );
};

export default App;
