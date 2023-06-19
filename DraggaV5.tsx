import React, { useState } from 'react';
import { Drawer, Checkbox, Table } from 'antd';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
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
  const sensors = useSensors(useSensor(KeyboardSensor), useSensor(PointerSensor));

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
    <DndContext sensors={sensors} collisionDetection={rectSortingStrategy}>
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
    <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
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
    { title: 'Column 1', dataIndex: 'column1', key: 'column1' },
    { title: 'Column 2', dataIndex: 'column2', key: 'column2' },
