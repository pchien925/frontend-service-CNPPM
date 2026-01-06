// src/components/ui/ComboGroupSection.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { getComboGroups } from '../../services/comboGroupService';
import { getOptionValues } from '../../services/optionService';
import styles from './ComboGroupSection.module.css';

export default function ComboGroupSection({ comboId, onSelectionsChange, formatPrice }) {
  const [comboGroups, setComboGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupSelections, setGroupSelections] = useState({});
  const [optionValuesMap, setOptionValuesMap] = useState({});
  const [errors, setErrors] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});

  // Fetch combo groups when component mounts
  useEffect(() => {
    const fetchComboGroups = async () => {
      setLoading(true);
      try {
        const response = await getComboGroups(comboId);
        const groups = response.data?.content || [];
        setComboGroups(groups);

        // Initialize selections
        const initialSelections = {};
        groups.forEach((group) => {
          initialSelections[group.id] = [];
        });
        setGroupSelections(initialSelections);

        // Expand first group by default
        if (groups.length > 0) {
          setExpandedGroups({ [groups[0].id]: true });
        }

        // Fetch option values for all foods in groups
        const optionMap = {};
        for (const group of groups) {
          for (const item of group.items) {
            for (const foodOption of item.food.options || []) {
              const key = foodOption.id;
              if (!optionMap[key]) {
                try {
                  const optionResponse = await getOptionValues(foodOption.option.id);
                  optionMap[key] = optionResponse.data?.content || [];
                } catch (error) {
                  console.error(`Failed to fetch option values for ${foodOption.id}:`, error);
                  optionMap[key] = [];
                }
              }
            }
          }
        }
        setOptionValuesMap(optionMap);
      } catch (error) {
        console.error('Failed to fetch combo groups:', error);
        setComboGroups([]);
      } finally {
        setLoading(false);
      }
    };

    if (comboId) {
      fetchComboGroups();
    }
  }, [comboId]);

  // Validate selections and notify parent
  useEffect(() => {
    const newErrors = {};
    let totalExtraPrice = 0;

    comboGroups.forEach((group) => {
      const selected = groupSelections[group.id] || [];

      if (selected.length < group.minSelect) {
        newErrors[group.id] = `Vui lòng chọn ít nhất ${group.minSelect} mục`;
      } else if (selected.length > group.maxSelect) {
        newErrors[group.id] = `Tối đa chọn ${group.maxSelect} mục`;
      }

      // Calculate extra price from selected items
      selected.forEach((itemId) => {
        const item = group.items.find((i) => i.id === itemId);
        if (item) {
          totalExtraPrice += Number(item.extraPrice) || 0;
        }
      });
    });

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    
    // Send selections to parent
    onSelectionsChange({
      selections: groupSelections,
      isValid,
      extraPrice: totalExtraPrice,
    });
  }, [groupSelections, comboGroups, onSelectionsChange]);

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleItemSelect = (groupId, itemId) => {
    setGroupSelections((prev) => {
      const group = comboGroups.find((g) => g.id === groupId);
      const current = prev[groupId] || [];
      const isMultiple = group.maxSelect > 1;

      if (current.includes(itemId)) {
        // Unselect
        return {
          ...prev,
          [groupId]: current.filter((id) => id !== itemId),
        };
      } else {
        // Select
        if (isMultiple) {
          // Multiple select - add if not exceeding max
          if (current.length < group.maxSelect) {
            return {
              ...prev,
              [groupId]: [...current, itemId],
            };
          }
          return prev;
        } else {
          // Single select - replace
          return {
            ...prev,
            [groupId]: [itemId],
          };
        }
      }
    });
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Đang tải tùy chọn combo...</div>;
  }

  if (comboGroups.length === 0) {
    return null;
  }

  return (
    <div className={styles.comboGroupSection}>
      <h3 className={styles.title}>Chọn Combo Group</h3>

      {comboGroups.map((group) => {
        const isExpanded = expandedGroups[group.id];
        const selected = groupSelections[group.id] || [];
        const groupError = errors[group.id];
        const canSelect = selected.length < group.maxSelect;

        return (
          <div key={group.id} className={styles.groupContainer}>
            {/* Group Header */}
            <div
              className={`${styles.groupHeader} ${groupError ? styles.error : ''}`}
              onClick={() => toggleGroup(group.id)}
            >
              <div className={styles.groupInfo}>
                <h4 className={styles.groupName}>{group.name}</h4>
                <p className={styles.groupDescription}>{group.description}</p>
                <span className={styles.selectCount}>
                  {group.minSelect} - {group.maxSelect} mục
                  {selected.length > 0 && ` (Đã chọn: ${selected.length})`}
                </span>
              </div>
              <ChevronDown
                size={20}
                className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
              />
            </div>

            {/* Group Error */}
            {groupError && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{groupError}</span>
              </div>
            )}

            {/* Group Items */}
            {isExpanded && (
              <div className={styles.itemsContainer}>
                {group.items.length === 0 ? (
                  <p className={styles.noItems}>Không có mục nào trong nhóm này</p>
                ) : (
                  group.items.map((item) => {
                    const isSelected = selected.includes(item.id);
                    const inputType = group.maxSelect > 1 ? 'checkbox' : 'radio';

                    return (
                      <div
                        key={item.id}
                        className={`${styles.itemCard} ${isSelected ? styles.selected : ''}`}
                      >
                        {/* Item Checkbox/Radio */}
                        <label className={styles.itemLabel}>
                          <input
                            type={inputType}
                            name={`combo-group-${group.id}`}
                            checked={isSelected}
                            onChange={() => handleItemSelect(group.id, item.id)}
                            disabled={!canSelect && !isSelected}
                            className={styles.itemInput}
                          />
                          <div className={styles.itemContent}>
                            <h5 className={styles.itemName}>
                              {item.food.name}
                              {item.extraPrice > 0 && (
                                <span className={styles.extraPrice}>
                                  (+{formatPrice(item.extraPrice)})
                                </span>
                              )}
                            </h5>
                            <p className={styles.itemDescription}>
                              {item.food.description}
                            </p>
                            {item.food.basePrice && (
                              <p className={styles.itemPrice}>
                                Giá: {formatPrice(item.food.basePrice)}
                              </p>
                            )}
                          </div>
                        </label>

                        {/* Show options if selected */}
                        {isSelected && item.food.options && item.food.options.length > 0 && (
                          <div className={styles.itemOptions}>
                            {item.food.options.map((foodOption) => (
                              <div key={foodOption.id} className={styles.option}>
                                <label className={styles.optionName}>
                                  {foodOption.option.name}
                                  {foodOption.requirementType === 1 && (
                                    <span className={styles.required}>*</span>
                                  )}
                                </label>
                                <p className={styles.optionDescription}>
                                  {foodOption.option.description}
                                </p>

                                <div className={styles.optionValues}>
                                  {(optionValuesMap[foodOption.id] || []).map((value) => (
                                    <label key={value.id} className={styles.valueItem}>
                                      <input
                                        type={foodOption.maxSelect > 1 ? 'checkbox' : 'radio'}
                                        name={`option-${foodOption.id}`}
                                        value={value.id}
                                      />
                                      <span className={styles.valueName}>
                                        {value.name}
                                        {value.extraPrice > 0 && (
                                          <span className={styles.extraPrice}>
                                            (+{formatPrice(value.extraPrice)})
                                          </span>
                                        )}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
