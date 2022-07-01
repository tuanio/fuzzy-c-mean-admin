export function makeColumns(columns) {
    let list_value = []
    for (let i = 0; i < columns.length; i++) {
        list_value.push({
            title: columns[i][0],
            dataIndex: columns[i][1],
            editable: true
        });
    }
    return list_value;
}