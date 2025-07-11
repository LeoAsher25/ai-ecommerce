'use client';
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  CustomPicker,
  CustomPickerInjectedProps,
  HSLColor,
  HSVColor,
} from 'react-color';
import { Saturation, Hue } from 'react-color/lib/components/common';
import tinycolor from 'tinycolor2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Input } from './input';
import { useDebouncedCallback } from 'use-debounce';

type Props = CustomPickerInjectedProps & {
  mode: 'hsl' | 'rgb' | 'hex';
  setMode: (mode: 'hsl' | 'rgb' | 'hex') => void;
};
const CustomColorPicker: FC<Props> = ({
  onChange,
  mode,
  setMode,
  hsl,
  hsv,
}) => {
  const [_hsl, _setHsl] = useState(hsl);
  const [inputedValue, setInputedValue] = useState(() =>
    tinycolor(hsl).toString(mode),
  );

  useEffect(() => {
    const tinyColor = tinycolor(hsl);
    setInputedValue(tinyColor.toString(mode));
  }, [hsl, mode]);

  const debouncedUpdateColor = useDebouncedCallback((value: string) => {
    const parsedColor = tinycolor(value);
    if (parsedColor.isValid()) {
      onChange(parsedColor.toHsl());
    }
  }, 300);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputedValue(e.target.value);
      debouncedUpdateColor(e.target.value);
    },
    [debouncedUpdateColor],
  );

  const handleHueChange = useCallback(
    (color: HSLColor) => {
      _setHsl(color);
      onChange(color);
    },
    [onChange],
  );

  const handleSaturationChange = useCallback(
    (color: HSVColor) => {
      onChange(color);
      _setHsl(tinycolor(color).toHsl());
    },
    [onChange],
  );

  return (
    <div className="relative flex w-full flex-col gap-4">
      <div className="flex w-full gap-2">
        <div className="relative h-40 w-full flex-1 overflow-hidden rounded-sm">
          <Saturation
            hsv={hsv}
            hsl={_hsl}
            onChange={handleSaturationChange}
            pointer={() => (
              <div className="size-[18px] translate-x-[-9px] translate-y-[-9px] rounded-full border-[3px] border-white" />
            )}
          />
        </div>
        <div className="relative w-6 shrink-0 overflow-hidden rounded-2xl">
          <Hue
            hsl={_hsl}
            onChange={handleHueChange}
            direction={'vertical'}
            pointer={() => (
              <div className="m-[3px] size-[18px] translate-y-[-9px] rounded-full border-[3px] border-white bg-transparent" />
            )}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Input
          value={inputedValue}
          onChange={handleInputChange}
          onClick={(e) => e.currentTarget.focus()}
        />
        <Select onValueChange={setMode} value={mode}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[
              { value: 'hex', name: 'HEX' },
              { value: 'rgb', name: 'RGB' },
              { value: 'hsl', name: 'HSL' },
            ].map(({ value, name }, idx) => (
              <SelectItem key={idx} value={value}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const ColorPicker = CustomPicker(CustomColorPicker);
