import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, MapPin, Phone, Loader, X, Check, ArrowLeft
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import addressService from '../../services/addressService';
import nationService from '../../services/nationService';
import styles from './AddressManagement.module.css';

// Khai báo giá trị mặc định của form bên ngoài component
const initialFormState = {
  recipientName: '',
  phone: '',
  addressLine: '',
  provinceId: '',
  districtId: '',
  wardId: '',
  isDefault: false,
};

export default function AddressManagementPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // States chính
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // States dữ liệu hành chính
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState(initialFormState);

  // 1. Khởi tạo dữ liệu
  useEffect(() => {
    fetchAddresses();
    fetchProvinces();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const accountId = user?.data?.id || user?.id;
      if (!accountId) return;
      
      const res = await addressService.getAddressList({ accountId });
      if (res.result) setAddresses(res.data.content || []);
    } catch (err) {
      setError('Không thể tải danh sách địa chỉ');
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    const data = await nationService.getProvinces();
    setProvinces(data || []);
  };

  // 2. Logic Mở Form Thêm Mới (Quan trọng để reset dữ liệu)
  const handleAddNew = () => {
    setFormData(initialFormState); // Xóa dữ liệu cũ trong form
    setDistricts([]);              // Xóa danh sách quận cũ
    setWards([]);                  // Xóa danh sách phường cũ
    setEditingId(null);            // Đặt về chế độ thêm mới
    setShowForm(true);             // Hiện form
    setError(null);
  };

  // 3. Logic thay đổi cấp hành chính (Cascading Select)
  const handleProvinceChange = async (e) => {
    const id = e.target.value;
    setFormData(prev => ({ ...prev, provinceId: id, districtId: '', wardId: '' }));
    setWards([]);
    if (id) {
      const data = await nationService.getDistricts(id);
      setDistricts(data || []);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = async (e) => {
    const id = e.target.value;
    setFormData(prev => ({ ...prev, districtId: id, wardId: '' }));
    if (id) {
      const data = await nationService.getWards(id);
      setWards(data || []);
    } else {
      setWards([]);
    }
  };

  // 4. Xử lý Sửa địa chỉ
  const handleEdit = async (address) => {
    try {
      setFormLoading(true);
      setEditingId(address.id);
      setShowForm(true);

      // Load dữ liệu phụ thuộc đồng thời
      const [distData, wardData] = await Promise.all([
        nationService.getDistricts(address.province?.id),
        nationService.getWards(address.district?.id)
      ]);

      setDistricts(distData || []);
      setWards(wardData || []);

      setFormData({
        recipientName: address.recipientName || '',
        phone: address.phone || '',
        addressLine: address.addressLine || '',
        provinceId: address.province?.id || '',
        districtId: address.district?.id || '',
        wardId: address.ward?.id || '',
        isDefault: address.isDefault || false,
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError("Lỗi khi tải thông tin chi tiết địa chỉ");
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recipientName || !formData.phone || !formData.provinceId) {
      setError('Vui lòng nhập đầy đủ các trường bắt buộc');
      return;
    }

    try {
      setFormLoading(true);
      const accountId = user?.data?.id || user?.id;
      const payload = { ...formData, accountId };

      const res = editingId 
        ? await addressService.updateAddress({ id: editingId, ...payload })
        : await addressService.createAddress(payload);

      if (res.result) {
        setShowForm(false);
        setEditingId(null);
        setFormData(initialFormState); // Reset sau khi lưu thành công
        await fetchAddresses();
      } else {
        setError(res.message || 'Thao tác thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa địa chỉ này?')) return;
    try {
      const res = await addressService.deleteAddress(id);
      if (res.result) fetchAddresses();
    } catch (err) {
      setError('Không thể xóa');
    }
  };

  if (loading) return <div className={styles.loaderContainer}><Loader className={styles.spin} /></div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={20} /> Quay lại
        </button>
        <h1>Địa chỉ của tôi</h1>
      </header>

      {error && (
        <div className={styles.errorAlert}>
          <span>{error}</span>
          <X size={18} onClick={() => setError(null)} style={{cursor: 'pointer'}} />
        </div>
      )}

      <div className={styles.layout}>
        {/* DANH SÁCH ĐỊA CHỈ */}
        <section className={styles.listSection}>
          <div className={styles.sectionHeader}>
            <h2>{addresses.length} Địa chỉ đã lưu</h2>
            {!showForm && (
              <button onClick={handleAddNew} className={styles.addBtn}>
                <Plus size={18} /> Thêm mới
              </button>
            )}
          </div>

          <div className={styles.grid}>
            {addresses.map(addr => (
              <div key={addr.id} className={`${styles.card} ${addr.isDefault ? styles.activeCard : ''}`}>
                {addr.isDefault && <span className={styles.badge}><Check size={12}/> Mặc định</span>}
                <div className={styles.cardInfo}>
                  <h3>{addr.recipientName}</h3>
                  <p className={styles.phoneText}><Phone size={14}/> {addr.phone}</p>
                  <p className={styles.addressText}><MapPin size={14}/> {addr.addressLine}</p>
                  <p className={styles.subText}>
                    {addr.ward?.name}, {addr.district?.name}, {addr.province?.name}
                  </p>
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => handleEdit(addr)} title="Sửa"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(addr.id)} title="Xóa" className={styles.delBtn}><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FORM NHẬP LIỆU */}
        {showForm && (
          <aside className={styles.formSidebar}>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                 <h2>{editingId ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}</h2>
                 <button className={styles.closeBtn} onClick={() => setShowForm(false)}><X size={20}/></button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label>Người nhận *</label>
                  <input name="recipientName" value={formData.recipientName} onChange={handleInputChange} placeholder="Tên đầy đủ" required />
                </div>

                <div className={styles.field}>
                  <label>Số điện thoại *</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Số điện thoại liên hệ" required />
                </div>

                <div className={styles.field}>
                  <label>Tỉnh/Thành phố *</label>
                  <select name="provinceId" value={formData.provinceId} onChange={handleProvinceChange} required>
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Quận/Huyện</label>
                    <select name="districtId" value={formData.districtId} onChange={handleDistrictChange} disabled={!districts.length}>
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Phường/Xã</label>
                    <select name="wardId" value={formData.wardId} onChange={handleInputChange} disabled={!wards.length}>
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Địa chỉ cụ thể</label>
                  <textarea name="addressLine" value={formData.addressLine} onChange={handleInputChange} placeholder="Số nhà, tên đường..." rows="2" />
                </div>

                <label className={styles.checkbox}>
                  <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
                  <span>Đặt làm địa chỉ mặc định</span>
                </label>

                <div className={styles.formBtns}>
                  <button type="submit" disabled={formLoading} className={styles.primaryBtn}>
                    {formLoading ? <Loader className={styles.spin} size={16}/> : 'Lưu địa chỉ'}
                  </button>
                  <button type="button" onClick={() => {setShowForm(false); setEditingId(null);}} className={styles.secondaryBtn}>Hủy</button>
                </div>
              </form>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}