import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Loader,
  X,
  Check,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import addressService from '../../services/addressService';
import nationService from '../../services/nationService';
import styles from './AddressManagement.module.css';

export default function AddressManagementPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Nation data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingNations, setLoadingNations] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: '',
    phone: '',
    addressLine: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    isDefault: false,
  });

  // Fetch addresses and provinces on mount
  useEffect(() => {
    fetchAddresses();
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (formData.provinceId) {
      fetchDistricts(formData.provinceId);
      // Reset district and ward when province changes
      setFormData((prev) => ({
        ...prev,
        districtId: '',
        wardId: '',
      }));
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [formData.provinceId]);

  // Fetch wards when district changes
  useEffect(() => {
    if (formData.districtId) {
      fetchWards(formData.districtId);
      // Reset ward when district changes
      setFormData((prev) => ({
        ...prev,
        wardId: '',
      }));
    } else {
      setWards([]);
    }
  }, [formData.districtId]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await addressService.getAddressList({
        accountId: user?.id,
      });
      if (res.result && Array.isArray(res.data)) {
        setAddresses(res.data);
      }
    } catch (err) {
      setError('Không thể tải danh sách địa chỉ');
      console.error('Fetch addresses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    try {
      setLoadingNations(true);
      const result = await nationService.getProvinces();
      setProvinces(result || []);
    } catch (err) {
      console.error('Fetch provinces error:', err);
      setProvinces([]);
    } finally {
      setLoadingNations(false);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const result = await nationService.getDistricts(provinceId);
      setDistricts(result || []);
    } catch (err) {
      console.error('Fetch districts error:', err);
      setDistricts([]);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const result = await nationService.getWards(districtId);
      setWards(result || []);
    } catch (err) {
      console.error('Fetch wards error:', err);
      setWards([]);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      recipientName: '',
      phone: '',
      addressLine: '',
      provinceId: '',
      districtId: '',
      wardId: '',
      isDefault: false,
    });
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData({
      recipientName: address.recipientName || '',
      phone: address.phone || '',
      addressLine: address.addressLine || '',
      provinceId: address.province?.id || '',
      districtId: address.district?.id || '',
      wardId: address.ward?.id || '',
      isDefault: address.isDefault || false,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.recipientName ||
      !formData.phone ||
      !formData.addressLine
    ) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      setFormLoading(true);
      const payload = {
        ...formData,
        accountId: user?.id,
      };

      let res;
      if (editingId) {
        res = await addressService.updateAddress({
          id: editingId,
          ...payload,
        });
      } else {
        res = await addressService.createAddress(payload);
      }

      if (res.result) {
        setShowForm(false);
        await fetchAddresses();
      } else {
        setError(res.message || 'Không thể lưu địa chỉ');
      }
    } catch (err) {
      setError('Lỗi khi lưu địa chỉ');
      console.error('Submit error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
      return;
    }

    try {
      const res = await addressService.deleteAddress(id);
      if (res.result) {
        await fetchAddresses();
      } else {
        setError('Không thể xóa địa chỉ');
      }
    } catch (err) {
      setError('Lỗi khi xóa địa chỉ');
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader size={32} />
          <p>Đang tải danh sách địa chỉ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          ← Quay lại
        </button>
        <h1>Quản lý địa chỉ giao hàng</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorAlert}>
          <p>{error}</p>
          <button onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Column - Address List */}
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <h2>Danh sách địa chỉ ({addresses.length})</h2>
            {!showForm && (
              <button
                onClick={handleAddNew}
                className={styles.addButton}
              >
                <Plus size={18} /> Thêm địa chỉ mới
              </button>
            )}
          </div>

          {addresses.length > 0 ? (
            <div className={styles.addressesList}>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`${styles.addressCard} ${
                    address.isDefault ? styles.default : ''
                  }`}
                >
                  {address.isDefault && (
                    <div className={styles.defaultBadge}>
                      <Check size={14} /> Mặc định
                    </div>
                  )}

                  <div className={styles.cardContent}>
                    <h3>{address.recipientName}</h3>
                    <div className={styles.addressInfo}>
                      <p>
                        <MapPin size={14} />
                        {address.addressLine}
                      </p>
                      <p className={styles.area}>
                        {address.ward?.name}, {address.district?.name},{' '}
                        {address.province?.name}
                      </p>
                      <p>
                        <Phone size={14} />
                        {address.phone}
                      </p>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => handleEdit(address)}
                      className={styles.editBtn}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className={styles.deleteBtn}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <MapPin size={48} />
              <h3>Chưa có địa chỉ nào</h3>
              <p>Thêm địa chỉ giao hàng để bắt đầu đặt hàng</p>
              {!showForm && (
                <button
                  onClick={handleAddNew}
                  className={styles.primaryButton}
                >
                  <Plus size={18} /> Thêm địa chỉ mới
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Form */}
        {showForm && (
          <div className={styles.formSection}>
            <h2>
              {editingId ? 'Chỉnh sửa' : 'Thêm'} địa chỉ giao hàng
            </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="recipientName">
                  Tên người nhận <span>*</span>
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  placeholder="VD: Nguyễn Văn A"
                  disabled={formLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">
                  Số điện thoại <span>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="VD: 0123456789"
                  disabled={formLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="addressLine">
                  Địa chỉ chi tiết <span>*</span>
                </label>
                <textarea
                  id="addressLine"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleInputChange}
                  placeholder="VD: 123 Đường Hoa, Phường 1"
                  rows="3"
                  disabled={formLoading}
                ></textarea>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="provinceId">Tỉnh/Thành phố</label>
                  <select
                    id="provinceId"
                    name="provinceId"
                    value={formData.provinceId}
                    onChange={handleInputChange}
                    disabled={formLoading || loadingNations}
                  >
                    <option value="">-- Chọn tỉnh/thành phố --</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="districtId">Quận/Huyện</label>
                  <select
                    id="districtId"
                    name="districtId"
                    value={formData.districtId}
                    onChange={handleInputChange}
                    disabled={formLoading || !formData.provinceId || districts.length === 0}
                  >
                    <option value="">-- Chọn quận/huyện --</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="wardId">Phường/Xã</label>
                <select
                  id="wardId"
                  name="wardId"
                  value={formData.wardId}
                  onChange={handleInputChange}
                  disabled={formLoading || !formData.districtId || wards.length === 0}
                >
                  <option value="">-- Chọn phường/xã --</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    disabled={formLoading}
                  />
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <Loader size={16} />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Check size={16} /> Lưu địa chỉ
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                  disabled={formLoading}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
