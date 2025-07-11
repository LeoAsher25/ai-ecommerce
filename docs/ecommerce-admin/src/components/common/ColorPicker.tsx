'use client';

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ColorPicker, Input, InputProps } from '../ui';
import tinycolor from 'tinycolor2';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ColorPickerInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'onChange' | 'onBlur'> & ColorPickerProps
>(({ disabled, value, onChange, className, ...props }, ref) => {
  const innerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'hex' | 'hsl' | 'rgb'>('hex');

  const parsedColorString = useMemo(() => {
    const color = tinycolor(value);
    if (!color.isValid()) return 'invalid';
    return color.toString(mode);
  }, [mode, value]);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  useEffect(() => {
    if (!open) {
      window.document.body.style.pointerEvents = 'auto';
    }
  }, [open]);

  return (
    <div className="flex gap-4">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled}>
          <Input
            {...props}
            prefixIcon={
              <svg width={24} height={24} viewBox="0 0 24 24">
                <rect
                  rx="2"
                  width="24"
                  height="24"
                  style={{ fill: parsedColorString, stroke: parsedColorString }}
                />
              </svg>
            }
            type="text"
            className={cn('cursor-pointer', className)}
            onClick={() => {
              setOpen(true);
            }}
            value={parsedColorString}
            readOnly
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-full "
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          modal
        >
          <ColorPicker
            mode={mode}
            setMode={setMode}
            color={value}
            onChange={(color) => onChange(color.hex)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});
ColorPickerInput.displayName = 'ColorPicker';
