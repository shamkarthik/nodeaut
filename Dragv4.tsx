import React, { useState } from 'react';
import { Drawer, Checkbox, Table } from 'antd';
import { DndContext, useSortable, sortableKeyboardCoordinates } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

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
    <DndContext
      sensors={[sortableKeyboardCoordinates]}
      collisionDetection={rectSortingStrategy}
    >
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
  const [orderedColumns, setOrderedColumns] = useState(columns);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const newOrderedColumns = [...orderedColumns];
      const draggedColumnIndex = orderedColumns.findIndex((col) => col.dataIndex === active.id);
      const targetColumnIndex = orderedColumns.findIndex((col) => col.dataIndex === over.id);
      const [draggedColumn] = newOrderedColumns.splice(draggedColumnIndex, 1);
      newOrderedColumns.splice(targetColumnIndex, 0, draggedColumn);
      setOrderedColumns(newOrderedColumns);
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Table columns={orderedColumns} dataSource={data} />
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
  const data = [  const showDrawer = () => {
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

