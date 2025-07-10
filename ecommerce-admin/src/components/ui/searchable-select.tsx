'use client';

import { Check, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectTrigger, SelectValue } from './select';
import { normalizeString } from '@/utils/string';

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  onSearch?: (search: string) => Promise<Option[]> | void;
  minSearchLength?: number;
  pageSize?: number;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options: initialOptions = [],
  value,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Nhập để tìm kiếm',
  onSearch,
  minSearchLength = 3,
  pageSize = -1,
  multiple = false,
  className,
  disabled = false,
}: SearchableSelectProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(pageSize === -1 ? false : true);
  const [isOpen, setIsOpen] = useState(false);

  // Chỉ khởi tạo selectedValues khi multiple=true
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple ? (Array.isArray(value) ? value : value ? [value] : []) : [],
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // Cập nhật options khi initialOptions thay đổi
  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  // Cập nhật selectedValues khi value prop thay đổi
  useEffect(() => {
    if (multiple) {
      setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
    }
  }, [value, multiple]);

  // Xử lý tìm kiếm khi có onSearch prop
  useEffect(() => {
    const fetchOptions = async () => {
      // Nếu không có onSearch hoặc search chưa đủ độ dài, không làm gì cả
      if (!onSearch) {
        return;
      }

      setIsLoading(true);
      try {
        const results = await onSearch(debouncedSearch);
        if (results) {
          setOptions(results);
          setHasMore(results.length >= pageSize);
        }
      } catch (error) {
        console.error('Error searching options:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [debouncedSearch, minSearchLength, pageSize]);

  // Xử lý tìm kiếm local khi không có onSearch prop
  useEffect(() => {
    // Chỉ thực hiện khi không có onSearch và có search text
    if (onSearch) {
      return;
    }

    const normalizedSearch = normalizeString(debouncedSearch);
    const filteredOptions = initialOptions.filter((option) => {
      const normalizedLabel = normalizeString(option.label);
      return normalizedLabel.includes(normalizedSearch);
    });

    setOptions(filteredOptions);
  }, [debouncedSearch, initialOptions]);

  // Reset search khi đóng dropdown
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      if (!onSearch) {
        // Nếu không có onSearch, reset options về initialOptions khi đóng dropdown
        setOptions(initialOptions);
      }
    }
  }, [isOpen, initialOptions]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleShowMore = async () => {
    if (!onSearch || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const results = await onSearch(debouncedSearch);
      if (results) {
        setOptions((prev) => [...prev, ...results]);
        setHasMore(results.length >= pageSize);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more options:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (newValue: string) => {
    if (multiple) {
      let newValues: string[];
      if (selectedValues.includes(newValue)) {
        newValues = selectedValues.filter((v) => v !== newValue);
      } else {
        newValues = [...selectedValues, newValue];
      }
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      onChange?.(newValue);
      setIsOpen(false);
    }
  };

  const handleRemoveValue = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  // Tạo nội dung hiển thị cho SelectValue khi multiple=true
  const renderMultipleValues = () => {
    if (!multiple || selectedValues.length === 0) return null;

    // Nếu có nhiều giá trị, hiển thị dạng "X selected"
    if (selectedValues.length > 1) {
      // return (
      //   <div className="flex items-center">
      //     <span>{selectedValues.length} selected</span>
      //   </div>
      // );
      return (
        selectedValues
          .map(
            (item) => initialOptions.find((opt) => opt.value === item)?.label,
          )
          ?.join(', ') ?? ''
      );
    }

    // Nếu chỉ có 1 giá trị, hiển thị tên của giá trị đó
    const selectedOption = initialOptions.find(
      (opt) => opt.value === selectedValues[0],
    );
    return selectedOption?.label || selectedValues[0];
  };

  return (
    <div className={cn('relative', className)}>
      <Select
        value={multiple ? (value as string[])?.join(',') : (value as string)}
        onValueChange={handleValueChange}
        onOpenChange={setIsOpen}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {multiple ? renderMultipleValues() : value}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]"
          position="popper"
          sideOffset={4}
          align="start"
        >
          <div className="sticky top-0 z-10 bg-white p-2">
            {multiple && selectedValues.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {selectedValues.map((val) => {
                  const option = initialOptions.find(
                    (opt) => opt.value === val,
                  );
                  return (
                    <div
                      key={val}
                      className="bg-primary/10 text-primary flex items-center gap-1 rounded-md px-2 py-1 text-sm"
                    >
                      <span className="max-w-[150px] truncate">
                        {option?.label || val}
                      </span>
                      <X
                        className="shrink-0 cursor-pointer"
                        size={14}
                        onClick={(e) => handleRemoveValue(val, e)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
              <input
                ref={inputRef}
                className="focus:border-primary w-full rounded-md border border-gray-200 py-2 pl-8 pr-4 text-sm outline-none"
                placeholder={
                  onSearch
                    ? searchPlaceholder ||
                      `Nhập ít nhất ${minSearchLength} ký tự để tìm kiếm`
                    : 'Nhập để tìm kiếm'
                }
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {options.length === 0 && !isLoading && (
              <div className="p-2 text-center text-sm text-gray-500">
                {search.length > 0
                  ? 'Không tìm thấy kết quả'
                  : onSearch && minSearchLength > 0
                    ? `Nhập ít nhất ${minSearchLength} ký tự để tìm kiếm`
                    : 'Nhập để tìm kiếm'}
              </div>
            )}

            {options.map((option) => (
              <div
                key={option.value}
                className={`flex cursor-pointer items-center justify-between px-2 py-1.5 text-sm hover:bg-gray-100 ${
                  multiple && selectedValues.includes(option.value)
                    ? 'bg-primary/10'
                    : ''
                }`}
                onClick={() => handleValueChange(option.value)}
              >
                <span className="truncate">{option.label}</span>
                {multiple && selectedValues.includes(option.value) && (
                  <Check className="text-primary shrink-0" size={16} />
                )}
              </div>
            ))}

            {isLoading && (
              <div className="p-2 text-center text-sm text-gray-500">
                Đang tải...
              </div>
            )}

            {hasMore && !isLoading && options.length > 0 && onSearch && (
              <div
                className="text-primary w-full cursor-pointer p-2 text-center text-sm hover:bg-gray-100"
                onClick={handleShowMore}
              >
                Xem thêm
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
