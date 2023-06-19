import React, { useState } from 'react';
import { Drawer, Checkbox, Table } from 'antd';
import { useSortable, SortableContext } from '@dnd-kit/sortable';
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
    <DndContext>
      <SortableContext items={options.map((option) => option.value)}>
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
  const [items, setItems] = useState<string[]>(columns.map((_, index) => index.toString()));

  const onDragEnd = () => {
    // Update the table columns with the new order
    const reorderedColumns = items.map((item) => columns[parseInt(item, 10)]);
    // You can use the reorderedColumns array in your table component
    console.log(reorderedColumns);
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={items}>
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
    { column1: 'Value 4', column2: 'Value 5', column3: 'Value
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckedValues((prevValues) => prevValues.filter((val) => val !== value));
    }
  };

  return (
    <div>
      <button onClick={showDrawer}>Open Drawer</button>
      <TableWithColumnReordering columns={columns} data={data} />

      <Drawer visible={drawerVisible} onClose={onClose}>
        <h2>Column Visibility</h2>
        <DraggableCheckboxGroup
          options={options}
          checkedValues={checkedValues}
          onChange={handleCheckboxChange}
        />
      </Drawer>
    </div>
  );
};

export default App;
