import './App.css';
import EditableTable from './EditableTable';
import './EditableTable.css'

function App() {
  return (
    <>
      <EditableTable title="Khóa đào tạo" tableName="khoadaotao" listColumns={[['Mã khóa đào tạo', 'id'], ['Tên khóa đào tạo', 'ten_kdt']]} />
      <EditableTable title="Chuyên ngành" tableName="chuyennganh" listColumns={[['Mã chuyên ngành', 'id'], ['Tên chuyên ngành', 'ten_cn'], ['Mã khóa đào tạo', 'kdt_id']]} />
      <EditableTable title="Chương trình đào tạo" tableName="chuongtrinhdaotao" listColumns={[['Mã chương trình đào tạo', 'id'], ['Số thứ tự môn học', 'stt_monhoc'], ['Tên môn học', 'ten_mh'], ['Tín chỉ', 'tin_chi'], ['Mã khóa đào tạo', 'kdt_id']]} />
      <EditableTable title="Sinh viên" tableName="sinhvien" listColumns={[['Mã sinh viên', 'id'], ['Họ đệm sinh viên', 'ho_dem_sv'], ['Tên sinh viên', 'ten_sv'], ['Mã chuyên ngành', 'cn_id'], ['Mã khóa đào tạo', 'kdt_id']]} />
      <EditableTable title="Điểm sinh viên" tableName="diemsinhvien" listColumns={[['Mã điểm sinh viên', 'id'], ['Mã sinh viên', 'sv_id'], ['Mã chương trình đào tạo', 'mh_id'], ['Điểm', 'diem']]} />
      <EditableTable title="Chi tiết môn học theo chuyên ngành" tableName="chitietmonhoctheochuyennganh" listColumns={[['Mã chi tiết môn học theo chuyên ngành', 'id'], ['Số thứ tự môn học', 'stt_monhoc'], ['Điểm trung bình', 'diem_tb']]} />
      <EditableTable title="Điểm tư vấn" tableName="diemtuvan" listColumns={[['Mã điểm tư vấn', 'id'], ['Tên sinh viên', 'ten_sv'], ['Mã số sinh viên', 'ma_sv'], ['Mã chương trình đào tạo', 'mh_id'], ['Mã khóa đào tạo', 'kdt_id'], ['Điểm', 'diem']]} />
      <EditableTable title="Người dùng" tableName="nguoidung" listColumns={[['Mã người dùng', 'id'], ['Tên người dùng', 'ten_nd'], ['username', 'username'], ['password', 'password']]} />

    </>
  );
}

export default App;
