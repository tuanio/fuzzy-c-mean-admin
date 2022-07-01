import React from 'react';
import 'antd/dist/antd.css';
import './EditableTable.css';
import { Form, InputNumber, Popconfirm, Table, Typography, Input } from 'antd';
import { useState } from 'react';
import { getAll, updateRow, deleteRow } from './api'
import { makeColumns } from './utils';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({title, tableName, listColumns, ...res}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState('');
  const columns = makeColumns(listColumns);
  columns.push({
    title: 'Operation',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <span style={{ padding: "2px" }}></span>
          <Typography.Link disabled={editingKey !== ''} onClick={() => deleteARow(record)}>
            Delete
          </Typography.Link>
        </>
        
      );
    },
  });

  React.useState(() => {
    (async () => {
      let res = await getAll(tableName);
      let datum = res.data.data;
      for (let i = 0; i < datum.length; i++) {
        datum[i].key = i;
      }
      setData(datum);
    })();
  }, [data])

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);

  };

  const deleteARow = (record) => {
    (async () => {
      let res = await deleteRow(tableName, record.id);
      let datum = res.data.data;
      for (let i = 0; i < datum.length; i++) {
        datum[i].key = i;
      }
      setData(datum);
    })();
  }

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        delete item.key;
        (async () => {
          let res = await updateRow(tableName, item);
          let datum = res.data.data;
          datum.key = datum.id;
          newData.splice(index, 1, { ...datum, ...row });
          setData(newData);
          setEditingKey('');
        })();
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <h2>{title}</h2>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default EditableTable;