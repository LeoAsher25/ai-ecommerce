'use client'

import React, { useState } from 'react'

import clsx from 'clsx'

import IcEye from '@/components/Icons/IcEye'
import IcEyeSlash from '@/components/Icons/IcEyeSlash'

// interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
//   label?: string
//   name: string
//   errorMessage?: string
//   inputClassname?: string
//   textarea?: boolean
//   required?: boolean
// }

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  name: string
  errorMessage?: string
  inputClassname?: string
  textarea?: boolean
  required?: boolean
}

const TextInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    // Thêm forwardRef
    {
      label,
      name,
      errorMessage,
      className,
      inputClassname,
      textarea = false,
      placeholder = 'Nhập dữ liệu',
      required = false,
      ...rest
    },
    ref // Nhận ref từ forwardRef
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const uniqueId = `text-field-${name}`

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={uniqueId} className="block mb-1">
            {label} {required && <span className="text-red">*</span>}
          </label>
        )}

        {textarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            placeholder="Nhập vào"
            name={name}
            id={uniqueId}
            rows={3}
            className={clsx(
              'rounded-md border border-gray-3 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input',
              rest.disabled ? 'bg-gray-1' : 'bg-white',
              inputClassname
            )}
            {...rest}
          />
        ) : (
          <div className="relative ">
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              name={name}
              id={uniqueId}
              placeholder={placeholder}
              className={clsx(
                'rounded-md border border-gray-3 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input',
                rest.disabled ? 'bg-gray-1' : 'bg-white',
                rest.type === 'password' && 'pr-[40px]',
                inputClassname
              )}
              {...rest}
              type={rest.type === 'password' && showPassword ? 'text' : rest.type}
            />

            {rest.type === 'password' && (
              <div className="absolute select-none cursor-pointer top-[50%] right-[16px] transform -translate-y-1/2">
                {!showPassword ? (
                  <IcEye className="inline-block" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <IcEyeSlash
                    className="inline-block"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {errorMessage && <div className="text-primary">{errorMessage}</div>}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput
