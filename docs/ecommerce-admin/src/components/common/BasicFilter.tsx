'use client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
  HTMLAttributes,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { PopoverClose } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import SearchIcon from '@/public/search.svg';
import FilterIcon from '@/public/filter.svg';
import { revalidate } from '@/actions';
import { GlobalLoading } from './GlobalLoading';

type Props = HTMLAttributes<HTMLDivElement> & {
  options?: FilterOption[];
};

export type FilterOption = {
  label?: string;
  name: string;
  multiple?: boolean;
  options: { value: number | string | boolean; name: ReactNode }[];
  value: (number | boolean)[] | null;
};

export const BasicFilter = ({ options, className, ...props }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { refresh } = useRouter();

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
    await revalidate({ path: pathname, type: 'page' });
    refresh();
  }, 300);

  return (
    <div {...props} className={cn('flex w-max gap-4', className)}>
      <Input
        className="w-[280px]"
        size="lg"
        placeholder="Tìm kiếm"
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        prefixIcon={<SearchIcon />}
      />
      {options?.length ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="border-border hover:border-border shrink-0 bg-white hover:brightness-95"
              size="icon"
              variant="outline"
              color="gray"
              disabled={options.length === 0}
            >
              <FilterIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="gap-4 rounded-lg p-4"
            align="start"
            hideWhenDetached
          >
            <Content options={options} />
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
};

const Content = memo(({ options }: { options: FilterOption[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { refresh } = useRouter();

  const [values, setValues] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      Array.from(searchParams.entries()).map(([key, value]) => [
        key,
        value.split(','),
      ]),
    ),
  );

  const mergedOptions = useMemo(
    () =>
      options.map((option) => {
        const value = searchParams.get(option.name);
        return {
          ...option,
          value: value
            ? option.multiple
              ? value.split(',')
              : value
            : option.multiple
              ? (option.value as number[]).map((v) => v.toString())
              : option.value?.toString(),
        };
      }),
    [options, searchParams],
  );

  const handleSelect = useCallback(
    (name: string, value: string, multiple?: boolean) => {
      if (!values[name]) return setValues((f) => ({ ...f, [name]: [value] }));
      if (values[name].includes(value))
        return setValues((f) => ({
          ...f,
          [name]: f[name].filter((v) => v !== value),
        }));
      if (!multiple) return setValues((f) => ({ ...f, [name]: [value] }));
      return setValues((f) => ({ ...f, [name]: [...f[name], value] }));
    },
    [values],
  );

  const handleSubmit = useCallback(async () => {
    GlobalLoading.show();
    const params = new URLSearchParams(searchParams);
    Object.entries(values).forEach(([key, value]) => {
      if (value.length) params.set(key, value.join(','));
      else params.delete(key);
    });

    params.set('page', '1');
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
    await revalidate({ path: pathname, type: 'page' });
    refresh();
    GlobalLoading.hide();
  }, [pathname, refresh, searchParams, values]);

  return (
    <>
      {mergedOptions.map((option, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4 [&:not(:first-child)]:mt-4"
        >
          <span className="text-lg">{option.label}</span>
          <div className="flex flex-col gap-4">
            {option.multiple &&
              option.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox
                    checked={(values[option.name] || []).includes(
                      opt.value.toString(),
                    )}
                    onCheckedChange={() =>
                      handleSelect(option.name, opt.value?.toString(), true)
                    }
                  />
                  <Label className="text-base">{opt.name}</Label>
                </div>
              ))}
            {!option.multiple && (
              <RadioGroup
                value={
                  values[option.name]?.length
                    ? values[option.name][0].toString()
                    : ''
                }
                onValueChange={(v) => handleSelect(option.name, v)}
                className="flex flex-col gap-4"
              >
                {option.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value.toString()} />
                    <Label>{opt.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </div>
      ))}
      <div className="mt-4 flex w-full justify-end">
        <PopoverClose asChild>
          <Button className="ml-auto" onClick={handleSubmit}>
            Lưu
          </Button>
        </PopoverClose>
      </div>
    </>
  );
});

Content.displayName = 'FilterContent';
